import { notFound } from 'next/navigation'

import { getPage } from '@/lib/api'
import { seoMetadata } from '@/lib/metadata'
import PageView from '@/components/PageView'

export async function generateMetadata() {
  const page = await getPage('home')
  // The homepage keeps the site title from Settings.
  return seoMetadata({ seo: page?.seo })
}

export default async function HomePage() {
  const page = await getPage('home')
  if (!page) notFound()
  return <PageView page={page} />
}
