import { notFound } from 'next/navigation'

import { getPage } from '@/lib/api'
import { seoMetadata } from '@/lib/metadata'
import PageView from '@/components/PageView'

const SLUG = 'creative-and-campaign-strategy'

export async function generateMetadata() {
  return seoMetadata(await getPage(SLUG))
}

export default async function Page() {
  const page = await getPage(SLUG)
  if (!page) notFound()
  return <PageView page={page} />
}
