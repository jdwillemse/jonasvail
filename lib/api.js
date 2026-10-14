import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import sharp from 'sharp'

const CONTENT_DIR = join(process.cwd(), 'content')
const PUBLIC_DIR = join(process.cwd(), 'public')

// Where each image in a `::: row <preset>` sits. Columns are numbered 1 to 24
// (negative counts from the end). An image's {from=… to=…} overrides this.
const PRESETS = {
  full: [[1, -1]],
  center: [[3, -3]],
  left: [[1, -5]],
  right: [[5, -1]],
  pair: [
    [1, 12],
    [14, -1],
  ],
  'big-left': [
    [1, 16],
    [18, -1],
  ],
  'big-right': [
    [1, 10],
    [12, -1],
  ],
  trio: [
    [1, 9],
    [10, 18],
    [19, -1],
  ],
}
// A row without a preset picks one by how many items it has.
const DEFAULT_PRESET = ['full', 'full', 'pair', 'trio']

const ROW = /^::: *row *([\w-]*) *\n([\s\S]*?)\n:::[ \t]*$/m
const ITEM = /^!\[(.*?)\]\((\S+?)\)(?:\{(.*?)\})?$/
const VIDEO = /youtube\.com|youtu\.be/

const slugify = (s) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_-]+/g, '-')

function readFile(path) {
  const { data, content } = matter(readFileSync(path, 'utf-8'))
  return { ...data, body: content.trim() }
}

// Remote images are measured from a small, low-quality copy: Contentful's
// image API keeps the aspect ratio and never scales up.
async function measure(src) {
  if (src.startsWith('/')) return sharp(join(PUBLIC_DIR, src)).metadata()
  const res = await fetch(`${src}?w=1000&fm=jpg&q=1`)
  if (!res.ok) throw new Error(`${src}: ${res.status} ${res.statusText}`)
  return sharp(Buffer.from(await res.arrayBuffer())).metadata()
}

const sizes = new Map()
async function image(src, alt = '') {
  if (!sizes.has(src)) sizes.set(src, measure(src))
  const { width, height } = await sizes.get(src)
  return { sys: { id: src }, url: src, width, height, description: alt }
}

function parseRow(preset, lines, file) {
  const items = lines
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const match = l.match(ITEM)
      if (!match) throw new Error(`${file}: not an image or video: ${l}`)
      const [, alt, src, attrs = ''] = match
      return {
        alt,
        src,
        ...Object.fromEntries(
          attrs
            .split(/\s+/)
            .filter(Boolean)
            .map((a) => a.split('='))
        ),
      }
    })
  const name = preset || DEFAULT_PRESET[items.length] || 'full'
  const spots = PRESETS[name]
  if (!spots) throw new Error(`${file}: unknown row preset "${name}"`)

  return Promise.all(
    items.map(async ({ alt, src, from, to, align }, i) => {
      const [presetFrom, presetTo] = spots[i] ?? spots[spots.length - 1]
      const item = {
        from: Number(from ?? presetFrom),
        to: Number(to ?? presetTo),
        align,
      }
      return VIDEO.test(src)
        ? { ...item, video: src }
        : { ...item, image: await image(src, alt) }
    })
  )
}

// The body is text and `::: row` blocks. Text before the first heading or row
// is the intro; after that, each run of text starts a new media block.
async function parseBody(body, file) {
  const parts = body.split(new RegExp(ROW.source, 'gm'))
  const [first, ...rest] = parts
  const heading = first.search(/^## /m)
  const intro = heading === -1 ? first : first.slice(0, heading)
  parts.splice(0, 1, heading === -1 ? '' : first.slice(heading))

  const blocks = []
  for (let i = 0; i < parts.length; i += 3) {
    const text = parts[i].trim()
    if (text || !blocks.length) blocks.push({ text: text || null, rows: [] })
    if (i + 2 < parts.length) {
      blocks.at(-1).rows.push(await parseRow(parts[i + 1], parts[i + 2], file))
    }
  }
  return {
    intro: intro.trim(),
    blocks: blocks
      .filter((b) => b.text || b.rows.length)
      .map((b, n) => ({ sys: { id: `${file}-${n}` }, ...b })),
  }
}

async function readProject(file) {
  const uid = file.replace(/\.md$/, '')
  const {
    title,
    client,
    date,
    tags = [],
    listImage,
    body,
  } = readFile(join(CONTENT_DIR, 'projects', file))
  const { intro, blocks } = await parseBody(body, file)

  return {
    sys: { id: uid },
    uid,
    title,
    // YAML reads an unquoted date as a Date
    date: date instanceof Date ? date.toISOString().slice(0, 10) : String(date),
    tags,
    body: intro,
    client: {
      sys: { id: slugify(client) },
      name: client,
      uid: slugify(client),
    },
    listviewImage: listImage ? await image(listImage) : null,
    mediaBlockList: blocks,
  }
}

async function readProjects() {
  const list = await Promise.all(
    readdirSync(join(CONTENT_DIR, 'projects'))
      .filter((f) => f.endsWith('.md'))
      .map(readProject)
  )
  return list.sort((a, b) => b.date.localeCompare(a.date))
}

// Newest first
export async function getAllProjects() {
  return readProjects()
}

export async function getProjectsByTag(tag = '') {
  return (await readProjects()).filter((p) => p.tags.includes(tag))
}

export async function getProjectsByClient(uid = '') {
  return (await readProjects()).filter((p) => p.client.uid === uid)
}

export async function getProject(uid) {
  return (await readProjects()).find((p) => p.uid === uid) ?? null
}

// Clients come from the projects, ordered by their newest project.
export async function getAllClients() {
  const clients = new Map()
  for (const { client } of await readProjects()) {
    if (!clients.has(client.uid)) clients.set(client.uid, client)
  }
  return [...clients.values()]
}

export async function getAbout() {
  const about = readFile(join(CONTENT_DIR, 'about.md'))
  const all = await readProjects()

  return {
    ...about,
    experienceList: {
      items: (about.experience ?? []).map((item, i) => ({
        sys: { id: `experience-${i}` },
        ...item,
      })),
    },
    accoladesList: {
      items: (about.accolades ?? []).map(({ project, ...item }, i) => ({
        sys: { id: `accolade-${i}` },
        ...item,
        project: all.find((p) => p.uid === project) ?? null,
      })),
    },
  }
}

export async function getSettings() {
  const { body, ...settings } = readFile(join(CONTENT_DIR, 'settings.md'))
  return settings
}

// A page's `## Heading`s split its body into sections of { title, copy }.
export async function getPage(slug) {
  const { body, ...page } = readFile(join(CONTENT_DIR, 'pages', `${slug}.md`))
  const [, ...parts] = body.split(/^## +(.+)$/m)
  const sections = []
  for (let i = 0; i < parts.length; i += 2) {
    sections.push({ title: parts[i].trim(), copy: parts[i + 1].trim() })
  }
  return { ...page, sections }
}
