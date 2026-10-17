import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2026-10-01',
  // The API, not the CDN, so a rebuild straight after publishing gets the change
  useCdn: false,
  perspective: 'published',
})

export function sanityFetch(query, params = {}) {
  return client.fetch(query, params)
}
