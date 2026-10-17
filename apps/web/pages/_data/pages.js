import { getPage } from '@/lib/api'

const SLUGS = [
  'home',
  'brand-development-and-strategy',
  'creative-and-campaign-strategy',
]

// Sanity pages with a route of their own. One that's missing gets no page,
// so its URL is a 404.
export default async function pages() {
  const pages = await Promise.all(
    SLUGS.map(async (slug) => ({ slug, ...(await getPage(slug)) }))
  )
  return pages.filter((page) => page.title !== undefined)
}
