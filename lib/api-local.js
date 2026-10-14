import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'

const CONTENT_DIR = join(process.cwd(), 'content', 'entries')

// Helper to read all entries from a content type folder
function readAllEntries(contentType) {
  const dir = join(CONTENT_DIR, contentType)
  try {
    const files = readdirSync(dir).filter((f) => f.endsWith('.json'))
    return files.map((file) => {
      const content = readFileSync(join(dir, file), 'utf-8')
      return JSON.parse(content)
    })
  } catch (err) {
    console.error(`Error reading ${contentType}:`, err.message)
    return []
  }
}

// Helper to read a single entry by matching a field value
function readEntryByField(contentType, fieldName, fieldValue) {
  const entries = readAllEntries(contentType)
  return entries.find((entry) => entry.fields?.[fieldName] === fieldValue)
}

// Helper to read entry by sys.id
function readEntryById(contentType, id) {
  const entries = readAllEntries(contentType)
  return entries.find((entry) => entry.sys?.id === id)
}

// Resolve linked entries (e.g., client references in projects)
function resolveLink(link, allData = {}) {
  if (!link?.sys?.linkType || !link?.sys?.id) return null

  const { linkType, id } = link.sys

  if (linkType === 'Entry') {
    // Check all content types for this entry ID
    for (const contentType of [
      'client',
      'mediaBlock',
      'workExperience',
      'award',
      'project',
    ]) {
      const entry = readEntryById(contentType, id)
      if (entry) {
        return transformEntry(entry, contentType)
      }
    }
  }

  if (linkType === 'Asset') {
    // Read from assets.json
    try {
      const assetsPath = join(process.cwd(), 'content', 'assets.json')
      const assetsData = JSON.parse(readFileSync(assetsPath, 'utf-8'))
      const asset = assetsData.items.find((a) => a.sys.id === id)
      if (asset) {
        let url = asset.fields?.file?.url
        // Convert protocol-relative URLs to https
        if (url && url.startsWith('//')) {
          url = `https:${url}`
        }
        return {
          sys: { id: asset.sys.id },
          url,
          title: asset.fields?.title,
          description: asset.fields?.description,
          width: asset.fields?.file?.details?.image?.width,
          height: asset.fields?.file?.details?.image?.height,
        }
      }
    } catch (err) {
      console.error('Error reading assets:', err.message)
    }
  }

  return null
}

// Transform raw Contentful entry to match expected GraphQL-like structure
function transformEntry(entry, contentType) {
  if (!entry) return null

  const fields = entry.fields || {}

  switch (contentType) {
    case 'project':
      return {
        sys: { id: entry.sys.id },
        title: fields.title,
        uid: fields.uid,
        date: fields.date,
        body: fields.body,
        client: fields.client ? resolveLink(fields.client) : null,
        listviewImage: fields.listviewImage
          ? resolveLink(fields.listviewImage)
          : null,
        mediaBlockList: fields.mediaBlockList
          ? fields.mediaBlockList
              .map((link) => resolveLink(link))
              .filter(Boolean)
          : null,
      }

    case 'client':
      return {
        sys: { id: entry.sys.id },
        name: fields.name,
        uid: fields.uid,
      }

    case 'about':
      return {
        sys: { id: entry.sys.id },
        title: fields.title,
        body: fields.body,
        experienceTitle: fields.experienceTitle,
        experienceList: fields.experienceList
          ? fields.experienceList
              .map((link) => resolveLink(link))
              .filter(Boolean)
          : null,
        accoladesTitle: fields.accoladesTitle,
        accolades: fields.accolades
          ? fields.accolades.map((link) => resolveLink(link)).filter(Boolean)
          : null,
      }

    case 'config':
      return {
        sys: { id: entry.sys.id },
        companyName: fields.companyName,
        title: fields.title,
        subtitle: fields.subtitle,
        description: fields.description,
      }

    case 'workExperience':
      return {
        sys: { id: entry.sys.id },
        title: fields.title,
        company: fields.company,
        location: fields.location,
        startDate: fields.startDate,
        endDate: fields.endDate,
        description: fields.description,
      }

    case 'award':
      return {
        sys: { id: entry.sys.id },
        title: fields.title,
        year: fields.year,
        description: fields.description,
      }

    // Each row is a list of images and videos placed on the 24-column grid.
    case 'mediaBlock':
      return {
        sys: { id: entry.sys.id },
        text: fields.text,
        rows: (fields.rows || []).map((row) =>
          row.map(({ image, ...item }) =>
            image
              ? {
                  ...item,
                  image: resolveLink({
                    sys: { type: 'Link', linkType: 'Asset', id: image },
                  }),
                }
              : item
          )
        ),
      }

    default:
      return { sys: { id: entry.sys.id }, ...fields }
  }
}

// Fetch all projects data for home list
export async function getAllProjects() {
  const entries = readAllEntries('project')
  const projects = entries
    .map((entry) => transformEntry(entry, 'project'))
    .filter(Boolean)
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  return projects
}

// Fetch all projects matching a specific metadata tag
export async function getProjectsByTag(tagId = '') {
  const entries = readAllEntries('project')
  const filtered = entries.filter((entry) =>
    entry.metadata?.tags?.some((tag) => tag.sys?.id === tagId)
  )
  const projects = filtered
    .map((entry) => transformEntry(entry, 'project'))
    .filter(Boolean)
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  return projects
}

// Fetch all projects for a specific client
export async function getProjectsByClient(uid = '') {
  const projects = await getAllProjects()
  return projects.filter((p) => p.client?.uid === uid)
}

// Fetch all clients data
export async function getAllClients() {
  const entries = readAllEntries('client')
  const clients = entries
    .map((entry) => transformEntry(entry, 'client'))
    .filter(Boolean)
    .sort(
      (a, b) =>
        new Date(b.sys?.createdAt || 0) - new Date(a.sys?.createdAt || 0)
    )

  return clients
}

// Fetch project page by UID
export async function getProject(uid) {
  const entry = readEntryByField('project', 'uid', uid)
  return transformEntry(entry, 'project')
}

// Fetch about page data
export async function getAbout() {
  const entries = readAllEntries('about')
  if (entries.length > 0) {
    return transformEntry(entries[0], 'about')
  }
  return null
}

// Fetch settings
export async function getSettings() {
  const entries = readAllEntries('config')
  if (entries.length > 0) {
    return transformEntry(entries[0], 'config')
  }
  return null
}
