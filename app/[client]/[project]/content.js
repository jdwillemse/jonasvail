'use client'

import { ModalContext } from '../../../context/ModalProvider'
import PageDetail from '../../../components/PageDetail'
import Modal from '../../../components/Modal'
import { useState } from 'react'
import isEmpty from 'lodash.isempty'
import MediaBlock from '../../../components/MediaBlock'

export default function ProjectPage({ project }) {
  const [image, setImage] = useState(null)

  // if no ID redirect to 404
  if (isEmpty(project)) {
    throw new Error('Project not found')
  }

  return (
    <ModalContext.Provider value={{ image, setImage }}>
      <Modal />
      <PageDetail content={project}>
        <MediaBlock {...project} />
      </PageDetail>
    </ModalContext.Provider>
  )
}
