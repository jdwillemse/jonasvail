// Before anything imports a component: lets Node load JSX and CSS modules.
import { refresh } from './lib/hooks.js'

import { relative } from 'node:path'
import { build } from 'esbuild'

import { assets } from './lib/assets.js'

try {
  process.loadEnvFile('.env.local')
} catch {
  // Vercel sets the environment itself.
}

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ public: '/', '.cache/img': '/img' })

  // The browser JavaScript, hashed so it can be cached for good (vercel.json).
  eleventyConfig.on('eleventy.before', async ({ directories }) => {
    refresh()
    const { metafile } = await build({
      entryPoints: ['client.js'],
      outdir: `${directories.output}js`,
      entryNames: '[name]-[hash]',
      bundle: true,
      minify: true,
      format: 'esm',
      target: ['chrome111', 'edge111', 'firefox111', 'safari16.4'],
      metafile: true,
    })
    const [file] = Object.keys(metafile.outputs)
    assets.script = `/${relative(directories.output, file)}`
  })

  // Its dependency scan can't read JSX. lib/hooks.js reloads every module on
  // each build instead, so any change under these rebuilds the lot.
  eleventyConfig.setWatchJavaScriptDependencies(false)
  eleventyConfig.addWatchTarget('client.js')
  eleventyConfig.addWatchTarget('components/')
  eleventyConfig.addWatchTarget('lib/')
  eleventyConfig.addWatchTarget('styles/')
}

export const config = {
  dir: { input: 'pages', output: '_site' },
}
