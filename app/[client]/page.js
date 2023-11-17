import { getProjectsByClient, getClient } from '../../lib/api'
import ProjectList from '../../components/ProjectList'

export default async function ClientPage({ params }) {
  const client = await getClient(params?.client)
  const projects = await getProjectsByClient(client?.id)

  // if no ID redirect to 404
  if (projects.length === 0) {
    throw new Error('Client not found')
  }

  return (
    <>
      <h1 style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
        {client.data.name}
      </h1>
      <ProjectList projects={projects} />
    </>
  )
}
