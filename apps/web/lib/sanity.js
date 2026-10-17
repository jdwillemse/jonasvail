import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2026-10-01',
  // The API, not the CDN, so a revalidated page gets the change right away
  useCdn: false,
  perspective: 'published',
})

// Cached until the Sanity webhook revalidates one of `tags`, the document
// types the query reads.
export function sanityFetch(query, params = {}, tags = []) {
  return client.fetch(query, params, {
    cache: 'force-cache',
    next: { tags },
  })
}
