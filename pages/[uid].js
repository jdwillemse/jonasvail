import React from 'react'

import {
  getAllProjects,
  getProjectAndMoreProjects,
  getAllClients,
} from '../lib/api'
import Layout from '../components/Layout'
import PageDetail from '../components/PageDetail'
import Slices from '../components/Slices'

export default function ProjectTemplate(props) {
  return (
    <Layout {...props}>
      <PageDetail {...props.project}>
        <Slices {...props.project} />
      </PageDetail>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const data = await getProjectAndMoreProjects(params.uid, previewData)
  const allClients = await getAllClients(previewData)

  return {
    props: {
      preview,
      project: data.node,
      allClients,
      // morePosts: data?.morePosts ?? [],
    },
  }
}

export async function getStaticPaths() {
  const allProjects = await getAllProjects()
  return {
    paths: (allProjects || []).map(({ node }) => `/${node._meta.uid}`),
    fallback: true,
  }
}
