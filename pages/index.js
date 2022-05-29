import { getPlaiceholder } from 'plaiceholder'

import { getAllProjects, getAllClients, getSettings } from '../lib/api'
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
  const settings = await getSettings(previewData)

  const previewImages = await Promise.all(
    allProjects.map(({ node }) => fetch(node.listImage.url))
  )
    .then((images) => Promise.all(images.map((image) => image.arrayBuffer())))
    .then((imageBuffers) =>
      Promise.all(
        imageBuffers.map((buffer) => getPlaiceholder(Buffer.from(buffer)))
      )
    )

  return {
    props: {
      preview,
      allProjects: allProjects.map((item, i) => ({
        node: {
          ...item.node,
          previewImage: previewImages[i].base64,
        },
      })),
      allClients,
      settings,
    },
  }
}
