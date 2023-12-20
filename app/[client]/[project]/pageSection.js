'use client'
// import { getAbout } from '../../lib/api'
// import PageDetail from '../../components/PageDetail'
import { ModalContext } from '../../../context/ModalProvider'
import PageDetail from '../../../components/PageDetail'
import Slices from '../../../components/Slices'
import Modal from '../../../components/Modal'
import { useState } from 'react'
import isEmpty from 'lodash.isempty'

export default function ProjectPage({ project }) {
  const [image, setImage] = useState(null)

  // if no ID redirect to 404
  if (isEmpty(project)) {
    throw new Error('Project not found')
  }

  console.log(project)
  return (
    <ModalContext.Provider value={{ image, setImage }}>
      <Modal />
      <PageDetail project={project}>
        <Slices project={project} />
      </PageDetail>
    </ModalContext.Provider>
  )
}
