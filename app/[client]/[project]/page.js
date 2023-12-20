import { getProject } from '../../../lib/api'
import PageSection from './pageSection'

export default async function ProjectPage({ params }) {
  const project = await getProject(params.project)

  return (
    <PageSection project={project}>
      <h1>project</h1>
    </PageSection>
  )
}
