import { getProjectsByClient } from '../../lib/api'
import ProjectList from '../../components/ProjectList'

export default async function ClientPage({ params }) {
  const projects = await getProjectsByClient(params?.client)

  // if no ID redirect to 404
  if (!projects || projects.length === 0) {
    throw new Error('Client not found')
  }

  return (
    <>
      <h1 style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
        {projects[0].client.name}
      </h1>
      <ProjectList projects={projects} />
    </>
  )
}
