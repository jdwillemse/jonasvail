import { defineQuery } from 'groq'

import { sanityFetch } from './sanity'

// Where each item in a media row sits. Columns are numbered 1 to 24
// (negative counts from the end). An item's own from and to override this.
const LAYOUTS = {
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
// A row without a layout picks one by how many items it has.
const DEFAULT_LAYOUT = ['full', 'full', 'pair', 'trio']

const IMAGE = `{
  "sys": { "id": asset._ref },
  "url": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "description": alt
}`

const CLIENT = `{ "sys": { "id": _id }, name, "uid": slug.current, "logo": logo.asset->url }`

const PROJECT_CARD = `
  "sys": { "id": _id },
  "uid": slug.current,
  title,
  "client": client->${CLIENT},
  "listviewImage": listImage${IMAGE}
`

const SEO = `seo{ title, description, "image": image${IMAGE} }`

const allProjectsQuery = defineQuery(`
  *[_type == "project"] | order(date desc) { ${PROJECT_CARD} }
`)

const projectQuery = defineQuery(`
  *[_type == "project" && slug.current == $uid][0] {
    ${PROJECT_CARD},
    intro,
    body[] {
      ...,
      _type == "mediaRow" => {
        items[] {
          ...,
          _type == "mediaImage" => { "image": ${IMAGE} }
        }
      }
    },
    ${SEO}
  }
`)

const aboutQuery = defineQuery(`
  *[_id == "about"][0] {
    title,
    body,
    experienceTitle,
    experience,
    accoladesTitle,
    accolades[] { ..., "project": project->{ ${PROJECT_CARD} } }
  }
`)

const settingsQuery = defineQuery(`
  *[_id == "settings"][0] {
    companyName,
    title,
    subtitle,
    description,
    email,
    address,
    "ogImage": ogImage${IMAGE}
  }
`)

const pageQuery = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    title,
    hero,
    sections[] {
      ...,
      _type == "textSection" => {
        "video": video.asset->url,
        "videoHevc": videoHevc.asset->url
      },
      _type == "projectList" => { "projects": projects[]->{ ${PROJECT_CARD} } },
      _type == "pageLinks" => {
        "pages": pages[]->{ title, "slug": slug.current }
      }
    },
    ${SEO}
  }
`)

function placeRow({ layout, items = [] }) {
  const spots = LAYOUTS[layout || DEFAULT_LAYOUT[items.length] || 'full']
  return items.map(({ _type, url, image, align, from, to }, i) => {
    const [layoutFrom, layoutTo] = spots[i] ?? spots[spots.length - 1]
    const place = { from: from ?? layoutFrom, to: to ?? layoutTo, align }
    return _type === 'youtube' ? { ...place, video: url } : { ...place, image }
  })
}

// Splits the body into blocks of text followed by the media rows after it.
function mediaBlocks(body = []) {
  const blocks = []
  for (const part of body) {
    const last = blocks.at(-1)
    if (part._type === 'mediaRow') {
      if (last) last.rows.push(placeRow(part))
      else
        blocks.push({
          sys: { id: part._key },
          text: null,
          rows: [placeRow(part)],
        })
    } else if (last && !last.rows.length) {
      last.text.push(part)
    } else {
      blocks.push({ sys: { id: part._key }, text: [part], rows: [] })
    }
  }
  return blocks
}

// Newest first
export function getAllProjects() {
  return sanityFetch(allProjectsQuery, {}, ['project', 'client'])
}

export async function getProject(uid) {
  const project = await sanityFetch(projectQuery, { uid }, [
    'project',
    'client',
  ])
  return project && { ...project, mediaBlockList: mediaBlocks(project.body) }
}

export function getAbout() {
  return sanityFetch(aboutQuery, {}, ['about', 'project', 'client'])
}

export function getSettings() {
  return sanityFetch(settingsQuery, {}, ['settings'])
}

export function getPage(slug) {
  return sanityFetch(pageQuery, { slug }, ['page', 'project', 'client'])
}
