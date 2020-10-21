import { getAllProjects, getAllClients } from '../lib/api'
import Layout from '../components/Layout'
import ProjectList from '../components/ProjectList'

export default function Index(props) {
  return (
    <Layout {...props}>
      <ProjectList {...props} />
    </Layout>
  )
}

export async function getStaticProps({ preview = false, previewData }) {
  const allProjects = await getAllProjects(previewData)
  const allClients = await getAllClients(previewData)

  return {
    props: { preview, allProjects, allClients },
  }
}
