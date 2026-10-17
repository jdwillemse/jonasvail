import { writeFileSync, mkdirSync, createWriteStream, existsSync } from 'fs'
import { join, basename } from 'path'
import { pipeline } from 'stream/promises'
import { Readable } from 'stream'

const SPACE_ID = 'jnzxx8eydhfs'
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN
const ENVIRONMENT = 'master'

const BASE_URL = `https://cdn.contentful.com/spaces/${SPACE_ID}`
const MANAGEMENT_URL = `https://api.contentful.com/spaces/${SPACE_ID}`

async function downloadFile(url, destPath) {
  if (existsSync(destPath)) {
    return false // Skip if already exists
  }

  const response = await fetch(url.startsWith('//') ? `https:${url}` : url)
  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.statusText}`)
  }

  const fileStream = createWriteStream(destPath)
  await pipeline(Readable.fromWeb(response.body), fileStream)
  return true
}

async function fetchFromManagementAPI(endpoint) {
  const url = `${MANAGEMENT_URL}${endpoint}`
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${MANAGEMENT_TOKEN}`,
      'Content-Type': 'application/json',
    },
  })
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `Failed to fetch ${endpoint}: ${response.status} ${response.statusText} - ${errorText}`
    )
  }
  return response.json()
}

async function fetchTags() {
  return fetchFromManagementAPI(`/environments/${ENVIRONMENT}/tags`)
}

async function fetchRoles() {
  return fetchFromManagementAPI('/roles')
}

async function fetchLocales() {
  return fetchFromManagementAPI(`/environments/${ENVIRONMENT}/locales`)
}

async function fetchEditorInterfaces(contentTypeId) {
  return fetchFromManagementAPI(
    `/environments/${ENVIRONMENT}/content_types/${contentTypeId}/editor_interface`
  )
}

async function fetchContentTypes() {
  const response = await fetch(
    `${BASE_URL}/content_types?access_token=${ACCESS_TOKEN}`
  )
  if (!response.ok) {
    throw new Error(`Failed to fetch content types: ${response.statusText}`)
  }
  return response.json()
}

async function fetchEntries(contentTypeId, skip = 0, limit = 100) {
  const url = `${BASE_URL}/entries?access_token=${ACCESS_TOKEN}&content_type=${contentTypeId}&skip=${skip}&limit=${limit}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(
      `Failed to fetch entries for ${contentTypeId}: ${response.statusText}`
    )
  }
  return response.json()
}

async function fetchAllEntries(contentTypeId) {
  let allEntries = []
  let skip = 0
  const limit = 100
  let total = 0

  do {
    const data = await fetchEntries(contentTypeId, skip, limit)
    allEntries = allEntries.concat(data.items)
    total = data.total
    skip += limit
  } while (skip < total)

  return allEntries
}

async function fetchAssets(skip = 0, limit = 100) {
  const url = `${BASE_URL}/assets?access_token=${ACCESS_TOKEN}&skip=${skip}&limit=${limit}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch assets: ${response.statusText}`)
  }
  return response.json()
}

async function fetchAllAssets() {
  let allAssets = []
  let skip = 0
  const limit = 100
  let total = 0

  do {
    const data = await fetchAssets(skip, limit)
    allAssets = allAssets.concat(data.items)
    total = data.total
    skip += limit
  } while (skip < total)

  return allAssets
}

async function main() {
  const contentDir = join(process.cwd(), 'content')

  try {
    const missingVariables = [
      ['CONTENTFUL_ACCESS_TOKEN', ACCESS_TOKEN],
      ['CONTENTFUL_MANAGEMENT_TOKEN', MANAGEMENT_TOKEN],
    ]
      .filter(([, value]) => !value?.trim())
      .map(([name]) => name)
    if (missingVariables.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missingVariables.join(', ')}`
      )
    }

    mkdirSync(contentDir, { recursive: true })
    console.log('📁 Created content directory')

    // Fetch content types
    console.log('📥 Fetching content types...')
    const contentTypes = await fetchContentTypes()

    // Create content-types directory (entries grouped by type)
    const contentTypesDir = join(contentDir, 'content-types')
    mkdirSync(contentTypesDir, { recursive: true })

    // Save each content type schema
    for (const contentType of contentTypes.items) {
      writeFileSync(
        join(contentTypesDir, `${contentType.sys.id}.json`),
        JSON.stringify(contentType, null, 2)
      )
    }
    console.log(`✅ Saved ${contentTypes.items.length} content type schemas`)

    // Create entries directory for individual content entries
    const entriesDir = join(contentDir, 'entries')
    mkdirSync(entriesDir, { recursive: true })

    // Fetch entries for each content type and save individually
    let totalEntries = 0
    for (const contentType of contentTypes.items) {
      const id = contentType.sys.id
      const name = contentType.name
      console.log(`📥 Fetching entries for "${name}" (${id})...`)

      const entries = await fetchAllEntries(id)
      if (entries.length > 0) {
        // Create subfolder for this content type
        const typeEntriesDir = join(entriesDir, id)
        mkdirSync(typeEntriesDir, { recursive: true })

        // Save each entry as individual file
        for (const entry of entries) {
          const entryId = entry.sys.id
          // Use slug or title if available for filename
          const slug =
            entry.fields?.slug ||
            entry.fields?.title ||
            entry.fields?.name ||
            entryId
          const safeSlug = String(slug)
            .replace(/[^a-zA-Z0-9-_]/g, '_')
            .substring(0, 100)
          writeFileSync(
            join(typeEntriesDir, `${safeSlug}.json`),
            JSON.stringify(entry, null, 2)
          )
        }
        console.log(`   ✅ Saved ${entries.length} entries`)
        totalEntries += entries.length
      } else {
        console.log(`   ⏭️  No entries found`)
      }
    }
    console.log(`✅ Total: ${totalEntries} content entries saved`)

    // Fetch all assets
    console.log('📥 Fetching assets...')
    const assets = await fetchAllAssets()
    writeFileSync(
      join(contentDir, 'assets.json'),
      JSON.stringify({ items: assets, total: assets.length }, null, 2)
    )
    console.log(`✅ Saved ${assets.length} assets metadata`)

    // Download actual asset files
    const assetsDir = join(contentDir, 'assets')
    mkdirSync(assetsDir, { recursive: true })

    console.log('📥 Downloading asset files...')
    let downloaded = 0
    let skipped = 0
    let failed = 0

    for (const asset of assets) {
      const file = asset.fields?.file
      if (!file?.url) continue

      const fileName = file.fileName || basename(file.url)
      const destPath = join(assetsDir, `${asset.sys.id}-${fileName}`)

      try {
        const wasDownloaded = await downloadFile(file.url, destPath)
        if (wasDownloaded) {
          downloaded++
          process.stdout.write(
            `\r   📦 Downloaded: ${downloaded} | Skipped: ${skipped} | Failed: ${failed}`
          )
        } else {
          skipped++
          process.stdout.write(
            `\r   📦 Downloaded: ${downloaded} | Skipped: ${skipped} | Failed: ${failed}`
          )
        }
      } catch (err) {
        failed++
        console.error(`\n   ⚠️  Failed to download ${fileName}: ${err.message}`)
      }
    }
    console.log(
      `\n   ✅ Asset files: ${downloaded} downloaded, ${skipped} skipped, ${failed} failed`
    )

    // Fetch tags, roles, and locales (requires Management API)
    console.log('\n📥 Fetching CMS configuration (tags, roles, locales)...')

    try {
      const tags = await fetchTags()
      writeFileSync(
        join(contentDir, 'tags.json'),
        JSON.stringify(tags, null, 2)
      )
      console.log(`✅ Saved ${tags.items?.length || 0} tags`)
    } catch (err) {
      console.log(`⚠️  Could not fetch tags: ${err.message}`)
    }

    try {
      const roles = await fetchRoles()
      writeFileSync(
        join(contentDir, 'roles.json'),
        JSON.stringify(roles, null, 2)
      )
      console.log(`✅ Saved ${roles.items?.length || 0} roles`)
    } catch (err) {
      console.log(`⚠️  Could not fetch roles: ${err.message}`)
    }

    try {
      const locales = await fetchLocales()
      writeFileSync(
        join(contentDir, 'locales.json'),
        JSON.stringify(locales, null, 2)
      )
      console.log(`✅ Saved ${locales.items?.length || 0} locales`)
    } catch (err) {
      console.log(`⚠️  Could not fetch locales: ${err.message}`)
    }

    // Fetch editor interfaces for each content type
    const editorInterfacesDir = join(contentDir, 'editor-interfaces')
    mkdirSync(editorInterfacesDir, { recursive: true })

    console.log('📥 Fetching editor interfaces...')
    let editorInterfaceCount = 0
    for (const contentType of contentTypes.items) {
      try {
        const editorInterface = await fetchEditorInterfaces(contentType.sys.id)
        writeFileSync(
          join(editorInterfacesDir, `${contentType.sys.id}.json`),
          JSON.stringify(editorInterface, null, 2)
        )
        editorInterfaceCount++
      } catch (err) {
        // Skip silently if not accessible
      }
    }
    if (editorInterfaceCount > 0) {
      console.log(`✅ Saved ${editorInterfaceCount} editor interfaces`)
    } else {
      console.log(
        `⚠️  Could not fetch editor interfaces (requires Management API token)`
      )
    }

    console.log('\n🎉 Export complete!')
    console.log(`📂 Content saved to: ${contentDir}`)
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

main()
