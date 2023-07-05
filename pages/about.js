import {
  getAbout,
  getAllClients,
  getAllProjects,
  getSettings,
} from '../lib/api'
import Layout from '../components/Layout'
import PageDetail from '../components/PageDetail'
import AboutContent from '../components/AboutContent'

// eslint-disable-next-line react/jsx-props-no-spreading
export default function PageContainer(props) {
  return (
    <Layout {...props}>
      <PageDetail {...props.aboutPage}>
        <AboutContent {...props.aboutPage} />
      </PageDetail>
    </Layout>
  )
}

export async function getStaticProps({ preview = false, previewData }) {
  const aboutPage = await getAbout(previewData)
  const allProjects = await getAllProjects(previewData)
  const allClients = await getAllClients(previewData)
  const settings = await getSettings(previewData)

  return {
    props: { preview, allClients, allProjects, settings, aboutPage },
  }
}
