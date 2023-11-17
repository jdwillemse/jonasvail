import { getProject } from '../../../lib/api'
import Content from './content'

export default async function ProjectPage({ params }) {
  const project = await getProject(params.project)

  return <Content project={project} />
}
