import { getAbout, getAllClients } from '../lib/api'
import Layout from '../components/Layout'
import PageDetail from '../components/PageDetail'
import AboutContent from '../components/AboutContent'

// eslint-disable-next-line react/jsx-props-no-spreading
export default function PageContainer(props) {
  return (
    <Layout {...props}>
      <PageDetail {...props.data}>
        <AboutContent {...props.data} />
      </PageDetail>
    </Layout>
  )
}

export async function getStaticProps({ preview = false, previewData }) {
  const { node } = await getAbout(previewData)
  const allClients = await getAllClients(previewData)

  return {
    props: { preview, allClients, data: node },
  }
}
