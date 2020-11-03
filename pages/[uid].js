import React, { useState } from 'react'

import { ModalContext } from '../context/ModalProvider'
import {
  getAllProjects,
  getProjectAndMoreProjects,
  getAllClients,
  getSettings,
} from '../lib/api'
import Layout from '../components/Layout'
import PageDetail from '../components/PageDetail'
import Slices from '../components/Slices'
import Modal from '../components/Modal'

export default function ProjectTemplate(props) {
  const [image, setImage] = useState(null)

  return (
    <ModalContext.Provider value={{ image, setImage }}>
      <Layout {...props}>
        <Modal />
        <PageDetail {...props.project}>
          <Slices {...props.project} />
        </PageDetail>
      </Layout>
    </ModalContext.Provider>
  )
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const data = await getProjectAndMoreProjects(params.uid, previewData)
  const allProjects = await getAllProjects(previewData)
  const allClients = await getAllClients(previewData)
  const settings = await getSettings(previewData)

  return {
    props: {
      preview,
      project: data.node,
      allClients,
      allProjects,
      settings,
    },
  }
}

export async function getStaticPaths() {
  const allProjects = await getAllProjects()

  return {
    paths: (allProjects || []).map(({ node }) => `/${node._meta.uid}`),
    fallback: false,
  }
}
