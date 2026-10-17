import { notFound } from 'next/navigation'
import { getProject } from '@/lib/api'
import { seoMetadata } from '@/lib/metadata'

import Hero from '@/components/Hero'
import TextSection from '@/components/TextSection'
import MediaBlock from '@/components/MediaBlock'

export async function generateMetadata({ params }) {
  const project = await getProject((await params).project)
  return seoMetadata({ ...project, image: project?.listviewImage })
}

export default async function ProjectPage({ params }) {
  const project = await getProject((await params).project)
  if (!project) notFound()

  return (
    <article>
      <Hero heroCopy={project.title} />
      <TextSection title={project.client?.name} copy={project.intro} />
      <MediaBlock blocks={project.mediaBlockList} />
    </article>
  )
}
