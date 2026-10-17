// Imports the markdown content in apps/web/content, and the client logos, into
// Sanity. Each document ID comes from its slug, so running it again replaces
// the same documents. Sanity stores identical files once, so images aren't
// duplicated either.
//
//   pnpm import             writes to the dataset in sanity.cli.ts
//   pnpm import --dry-run   prints NDJSON instead, with stand-in image assets

import { createHash } from 'node:crypto'
import { readFile, readdir } from 'node:fs/promises'
import { basename } from 'node:path'
import matter from 'gray-matter'
import sharp from 'sharp'

const CONTENT = new URL('../../web/content/', import.meta.url)
const LOGOS = new URL('../../web/public/assets/logos/', import.meta.url)
const DRY_RUN = process.argv.includes('--dry-run')
const PROJECT_ID = '3hjgtb6q'
const DATASET = 'production'

// Logo files whose name isn't the client's slug
const LOGO_FILES: Record<string, string> = {
  'ea-sports': 'ea',
  'ketel-one-vodka': 'ketel-one',
}

// Contact details were hardcoded in the Header, Footer and Get in touch.
const CONTACT = {
  email: 'hello@jonasvail.com',
  address: 'Neukölln,\n12047 Berlin',
}

const CATEGORIES = ['brand-strategy', 'campaign-strategy']

const ROW = /^::: *row *([\w-]*) *\n([\s\S]*?)\n:::[ \t]*$/m
const ITEM = /^!\[(.*?)\]\((\S+?)\)(?:\{(.*?)\})?$/
const VIDEO = /youtube\.com|youtu\.be/
const INLINE = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/

type Doc = { _id: string; _type: string; [key: string]: unknown }

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_-]+/g, '-')

// IDs with a dot are private in Sanity, so use hyphens.
const ref = (type: string, slug: string) => ({
  _type: 'reference',
  _ref: `${type}-${slug}`,
})

let keys = 0
const key = () => `k${(keys++).toString(36)}`

async function read(path: string) {
  const { data, content } = matter(
    await readFile(new URL(path, CONTENT), 'utf-8')
  )
  return { data, body: content.trim() }
}

// Markdown here is only paragraphs, `## ` headings, **bold** and links.
function blocks(markdown: string) {
  return markdown
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => {
      const heading = p.match(/^## +(.+)$/)
      const text = (heading ? heading[1] : p).replace(/\s*\n\s*/g, ' ')
      const markDefs: object[] = []
      const children = text
        .split(INLINE)
        .filter(Boolean)
        .map((part) => {
          const bold = part.match(/^\*\*(.+)\*\*$/)
          const link = part.match(/^\[(.+)\]\((.+)\)$/)
          let marks: string[] = []
          if (bold) marks = ['strong']
          if (link) {
            const _key = key()
            markDefs.push({ _key, _type: 'link', href: link[2] })
            marks = [_key]
          }
          return {
            _key: key(),
            _type: 'span',
            text: bold?.[1] ?? link?.[1] ?? part,
            marks,
          }
        })
      return {
        _key: key(),
        _type: 'block',
        style: heading ? 'h2' : 'normal',
        markDefs,
        children,
      }
    })
}

// --- Assets ----------------------------------------------------------------

const assetDocs: Doc[] = []
const assets = new Map<string, Promise<string>>()
let client: Awaited<ReturnType<typeof cliClient>> | undefined

async function cliClient() {
  const { getCliClient } = await import('sanity/cli')
  return getCliClient({ apiVersion: '2026-10-01' })
}

async function load(src: string) {
  if (!src.startsWith('http')) return readFile(src)
  const res = await fetch(src)
  if (!res.ok) throw new Error(`${src}: ${res.status} ${res.statusText}`)
  return Buffer.from(await res.arrayBuffer())
}

// A dry run makes the asset document Sanity would: its ID is the file's SHA-1
// plus its size and format.
async function standIn(file: Buffer) {
  const meta = await sharp(file).metadata()
  const width = meta.width!
  const height = meta.pageHeight ?? meta.height!
  const ext = meta.format === 'jpeg' ? 'jpg' : meta.format
  const sha1 = createHash('sha1').update(file).digest('hex')
  const lqip = await sharp(file).resize(20).jpeg({ quality: 40 }).toBuffer()
  const _id = `image-${sha1}-${width}x${height}-${ext}`
  assetDocs.push({
    _id,
    _type: 'sanity.imageAsset',
    url: `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${sha1}-${width}x${height}.${ext}`,
    metadata: {
      dimensions: { width, height, aspectRatio: width / height },
      lqip: `data:image/jpeg;base64,${lqip.toString('base64')}`,
    },
  })
  return _id
}

async function upload(src: string) {
  const file = await load(src)
  if (DRY_RUN) return standIn(file)
  client ??= await cliClient()
  const asset = await client.assets.upload('image', file, {
    filename: basename(src),
  })
  return asset._id
}

async function image(src: string, alt?: string) {
  if (!assets.has(src)) assets.set(src, upload(src))
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: await assets.get(src)! },
    ...(alt && { alt }),
  }
}

// --- Projects --------------------------------------------------------------

async function row(layout: string, lines: string, file: string) {
  const items = await Promise.all(
    lines
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
      .map(async (line) => {
        const match = line.match(ITEM)
        if (!match) throw new Error(`${file}: not an image or video: ${line}`)
        const [, alt, src, attrs = ''] = match
        const { align, from, to } = Object.fromEntries(
          attrs
            .split(/\s+/)
            .filter(Boolean)
            .map((a) => a.split('='))
        )
        const placement = {
          _key: key(),
          ...(align && { align }),
          ...(from && { from: Number(from) }),
          ...(to && { to: Number(to) }),
        }
        return VIDEO.test(src)
          ? { _type: 'youtube', url: src, ...placement }
          : { ...(await image(src, alt)), _type: 'mediaImage', ...placement }
      })
  )
  return { _key: key(), _type: 'mediaRow', ...(layout && { layout }), items }
}

// Text before the first heading or row is the intro. The rest is the body:
// text, then a row, then text, and so on.
async function body(markdown: string, file: string) {
  const parts = markdown.split(new RegExp(ROW.source, 'gm'))
  const heading = parts[0].search(/^## /m)
  const intro = heading === -1 ? parts[0] : parts[0].slice(0, heading)
  parts[0] = heading === -1 ? '' : parts[0].slice(heading)

  const out: object[] = []
  for (let i = 0; i < parts.length; i += 3) {
    out.push(...blocks(parts[i]))
    if (i + 2 < parts.length)
      out.push(await row(parts[i + 1], parts[i + 2], file))
  }
  return { intro: blocks(intro), body: out }
}

async function projects() {
  const files = (await readdir(new URL('projects/', CONTENT))).filter((f) =>
    f.endsWith('.md')
  )
  const list = []
  for (const file of files) {
    const slug = file.replace(/\.md$/, '')
    const { data, body: markdown } = await read(`projects/${file}`)
    const date =
      data.date instanceof Date
        ? data.date.toISOString().slice(0, 10)
        : String(data.date)
    list.push({
      _id: `project-${slug}`,
      _type: 'project',
      title: data.title,
      slug: { _type: 'slug', current: slug },
      client: ref('client', slugify(data.client)),
      clientName: data.client as string,
      date,
      categories: (data.tags ?? []).filter((t: string) =>
        CATEGORIES.includes(t)
      ),
      ...(data.listImage && { listImage: await image(data.listImage) }),
      ...(await body(markdown, file)),
    })
  }
  return list.sort((a, b) => b.date.localeCompare(a.date))
}

async function clients(names: string[]) {
  const logos = new Set(await readdir(LOGOS))
  return Promise.all(
    [...new Set(names)].map(async (name) => {
      const slug = slugify(name)
      const logo = `${LOGO_FILES[slug] ?? slug}.svg`
      return {
        _id: `client-${slug}`,
        _type: 'client',
        name,
        slug: { _type: 'slug', current: slug },
        ...(logos.has(logo) && {
          logo: await image(new URL(logo, LOGOS).pathname),
        }),
      }
    })
  )
}

// --- Pages, About and Settings ---------------------------------------------

// A page's `## Heading`s split its body into text sections.
function textSections(markdown: string) {
  const [, ...parts] = markdown.split(/^## +(.+)$/m)
  const sections = []
  for (let i = 0; i < parts.length; i += 2) {
    sections.push({
      _key: key(),
      _type: 'textSection',
      title: parts[i].trim(),
      copy: blocks(parts[i + 1]),
    })
  }
  return sections
}

const pageLinks = (label: string, stacked: boolean, slugs: string[]) => ({
  _key: key(),
  _type: 'pageLinks',
  label,
  stacked,
  pages: slugs.map((slug) => ({ _key: key(), ...ref('page', slug) })),
})

const projectList = (slugs: string[]) => ({
  _key: key(),
  _type: 'projectList',
  projects: slugs.map((slug) => ({ _key: key(), ...ref('project', slug) })),
})

const BRAND = 'brand-development-and-strategy'
const CAMPAIGN = 'creative-and-campaign-strategy'

async function pages(all: Awaited<ReturnType<typeof projects>>) {
  const page = async (
    slug: string,
    title: string,
    sections: (text: object[], data: Record<string, any>) => object[]
  ) => {
    const { data, body: markdown } = await read(`pages/${slug}.md`)
    return {
      _id: `page-${slug}`,
      _type: 'page',
      title,
      slug: { _type: 'slug', current: slug },
      hero: data.hero,
      sections: sections(textSections(markdown), data),
    }
  }
  const inCategory = (category: string) =>
    all
      .filter((p) => p.categories.includes(category))
      .map((p) => p.slug.current)

  return Promise.all([
    // Home had the case-study links hardcoded between About and Side Hustle.
    page('home', 'Home', ([work, about, sideHustle]) => [
      work,
      about,
      pageLinks('Case Studies', false, [BRAND, CAMPAIGN]),
      sideHustle,
    ]),
    page(BRAND, 'Brand Development and Strategy', (text, data) => [
      ...text,
      projectList(data.projects ?? inCategory('brand-strategy')),
      pageLinks('See what else I do', true, [CAMPAIGN]),
    ]),
    page(CAMPAIGN, 'Creative and Campaign Strategy', (text) => [
      ...text,
      projectList(inCategory('campaign-strategy')),
      pageLinks('See what else I do', true, [BRAND]),
    ]),
  ])
}

async function about() {
  const { data, body: markdown } = await read('about.md')
  return {
    _id: 'about',
    _type: 'about',
    title: data.title,
    body: blocks(markdown),
    experienceTitle: data.experienceTitle,
    experience: (data.experience ?? []).map((job: object) => ({
      _key: key(),
      _type: 'job',
      ...job,
    })),
    accoladesTitle: data.accoladesTitle,
    accolades: (data.accolades ?? []).map(
      ({ project, year, ...rest }: Record<string, string>) => ({
        _key: key(),
        _type: 'accolade',
        year: String(year),
        ...rest,
        ...(project && { project: ref('project', project) }),
      })
    ),
  }
}

async function settings() {
  const { data } = await read('settings.md')
  return { _id: 'settings', _type: 'settings', ...data, ...CONTACT }
}

// --- Run -------------------------------------------------------------------

const projectDocs = await projects()
const docs: Doc[] = [
  ...(await clients(projectDocs.map((p) => p.clientName))),
  ...projectDocs.map(({ clientName, ...p }) => p),
  ...(await pages(projectDocs)),
  await about(),
  await settings(),
]

// Every reference must point at a document this import creates.
const ids = new Set(docs.map((d) => d._id))
const missing = JSON.stringify(docs)
  .match(/"_ref":"(?!image-)[^"]+"/g)
  ?.map((m) => m.slice(8, -1))
  .filter((id) => !ids.has(id))
if (missing?.length) throw new Error(`Missing documents: ${missing.join(', ')}`)

if (DRY_RUN) {
  for (const doc of [...assetDocs, ...docs]) console.log(JSON.stringify(doc))
} else {
  client ??= await cliClient()
  const tx = client.transaction()
  for (const doc of docs) tx.createOrReplace(doc)
  await tx.commit()
  console.log(`Imported ${docs.length} documents and ${assets.size} images.`)
}
