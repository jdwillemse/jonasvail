import { notFound } from 'next/navigation'
import { getProject } from '@/lib/api'

import Hero from '@/components/Hero'
import TextSection from '@/components/TextSection'
import MediaBlock from '@/components/MediaBlock'

export default async function ProjectPage({ params }) {
  const project = await getProject(params.project)
  if (!project) notFound()

  return (
    <article>
      <Hero heroCopy={project.title} />
      <TextSection title={project.client?.name} copy={project.body} />
      <MediaBlock blocks={project.mediaBlockList ?? []} />
    </article>
  )
}
