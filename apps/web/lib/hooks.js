import { readFileSync } from 'node:fs'
import { registerHooks } from 'node:module'
import { dirname, relative, resolve as resolvePath } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { transformSync } from 'esbuild'
import { transform } from 'lightningcss'

// Lets Node import the components as they're written for the browser: JSX in
// .js files, `@/` paths, extensionless and directory imports, and CSS. Each
// CSS file imported becomes part of `stylesheet()`, in import order; a CSS
// module also exports its class names. Runs in-thread, so the build shares
// this module's state. `refresh()` before each build makes later imports load
// the site's files afresh, so `--serve` picks up edits.

const ROOT = fileURLToPath(new URL('..', import.meta.url))

// The browsers Next.js targeted by default, which the site was built for.
const TARGETS = {
  chrome: 111 << 16,
  edge: 111 << 16,
  firefox: 111 << 16,
  safari: (16 << 16) | (4 << 8),
}

const sheets = new Map()
let generation = 0

export function refresh() {
  generation++
  sheets.clear()
}

export function stylesheet() {
  return [...sheets.values()].map((sheet) => sheet.code).join('')
}

const own = (path) => path.startsWith(ROOT) && !path.includes('/node_modules/')

// Modules holding build state stay single instances.
const SHARED = ['lib/hooks.js', 'lib/assets.js'].map((file) =>
  resolvePath(ROOT, file)
)

function fresh(result) {
  if (!result.url.startsWith('file:')) return result
  const path = fileURLToPath(result.url)
  if (!own(path) || SHARED.includes(path)) return result
  return { ...result, url: `${result.url}?v=${generation}` }
}

function compile(path) {
  if (sheets.has(path)) return sheets.get(path)
  const isModule = path.endsWith('.module.css')
  const { code, exports } = transform({
    filename: relative(ROOT, path),
    code: readFileSync(path),
    cssModules: isModule,
    targets: TARGETS,
    minify: true,
  })

  // `composes: x from "file"` needs that file's class, and its CSS first.
  const classes = {}
  for (const [local, { name, composes }] of Object.entries(exports ?? {})) {
    const names = [name]
    for (const c of composes) {
      if (c.type !== 'dependency') names.push(c.name)
      else {
        const from = c.specifier.startsWith('@/')
          ? resolvePath(ROOT, c.specifier.slice(2))
          : resolvePath(dirname(path), c.specifier)
        names.push(compile(from).classes[c.name])
      }
    }
    classes[local] = names.join(' ')
  }

  const sheet = { code: code.toString(), classes }
  sheets.set(path, sheet)
  return sheet
}

const CANDIDATES = ['', '.js', '/index.js']

registerHooks({
  resolve(specifier, context, nextResolve) {
    const local = specifier.startsWith('@/')
      ? pathToFileURL(resolvePath(ROOT, specifier.slice(2))).href
      : specifier.startsWith('.') && context.parentURL?.startsWith('file:')
        ? new URL(specifier, context.parentURL).href
        : null
    if (!local) return fresh(nextResolve(specifier, context))
    for (const ext of CANDIDATES) {
      try {
        return fresh(nextResolve(local + ext, context))
      } catch (error) {
        if (!/NOT_FOUND|DIR_IMPORT/.test(error.code)) throw error
      }
    }
    return nextResolve(specifier, context)
  },

  load(url, context, nextLoad) {
    if (!url.startsWith('file:')) return nextLoad(url, context)
    const path = fileURLToPath(url.split('?')[0])

    if (path.endsWith('.css')) {
      const { classes } = compile(path)
      return {
        format: 'module',
        source: `export default ${JSON.stringify(classes)}`,
        shortCircuit: true,
      }
    }

    if (path.endsWith('.js') && own(path)) {
      const { code } = transformSync(readFileSync(path, 'utf8'), {
        loader: 'jsx',
        jsx: 'automatic',
        format: 'esm',
        sourcefile: path,
      })
      return { format: 'module', source: code, shortCircuit: true }
    }

    return nextLoad(url, context)
  },
})
