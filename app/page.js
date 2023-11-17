import { getAllProjects } from '../lib/api'
import ProjectList from '../components/ProjectList'

export default async function ClientPage() {
  const projects = await getAllProjects()

  // if no ID redirect to 404
  if (projects.length === 0) {
    throw new Error('Client not found')
  }

  return <ProjectList projects={projects} />
}
