import Hero from '@/components/Hero'
import MediaBlock from '@/components/MediaBlock'
import TextSection from '@/components/TextSection'
import { pageMeta } from '@/lib/metadata'
import renderPage from '@/lib/render'

export const data = {
  pagination: {
    data: 'projects',
    size: 1,
    alias: 'project',
    addAllPagesToCollections: true,
  },
  permalink: ({ project }) => `/${project.client.uid}/${project.uid}/`,
}

export function render({ project, ...data }) {
  return renderPage(
    data,
    <article>
      <Hero heroCopy={project.title} />
      <TextSection title={project.client?.name} copy={project.intro} />
      <MediaBlock blocks={project.mediaBlockList} />
    </article>,
    pageMeta(data.settings, { ...project, image: project.listviewImage })
  )
}
