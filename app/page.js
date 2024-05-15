import { getAllProjects } from '../lib/api'
import ProjectList from '../components/ProjectList'

export default async function HomePage() {
  const projects = await getAllProjects()
  // if no ID redirect to 404
  if (!projects || projects.length === 0) {
    throw new Error('Projects not found')
  }

  return <ProjectList projects={projects} />
}
