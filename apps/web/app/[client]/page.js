import { getAllProjects, getProjectsByClient } from '../../lib/api'
import ProjectList from '../../components/ProjectList'

// Only clients with projects, since this page throws for a client without any.
export async function generateStaticParams() {
  const projects = (await getAllProjects()) ?? []
  const uids = new Set(projects.map((p) => p.client?.uid).filter(Boolean))
  return [...uids].map((client) => ({ client }))
}

export async function generateMetadata({ params }) {
  const projects = await getProjectsByClient((await params).client)
  return { title: projects?.[0]?.client.name }
}

export default async function ClientPage({ params }) {
  const projects = await getProjectsByClient((await params).client)

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
