import { getProjectsByClient, getClient } from '../../lib/api'
import ProjectList from '../../components/ProjectList'

export default async function ClientPage({ params }) {
  const clientID = await getClient(params?.client)
  const projects = await getProjectsByClient(clientID?.id)

  // if no ID redirect to 404
  if (projects.length === 0) {
    throw new Error('Client not found')
  }

  return <ProjectList projects={projects} />
}
