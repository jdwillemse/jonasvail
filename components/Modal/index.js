import React, { useCallback, useContext, useEffect } from 'react'
import Modal from 'react-modal'

import css from './styles.module.scss'
import { ModalContext } from '../../context/ModalProvider'

const ModalComponent = () => {
  const { image, setImage } = useContext(ModalContext)

  const closeModal = useCallback(() => {
    setImage(null)
  }, [setImage])

  useEffect(() => {
    Modal.setAppElement('#app-root')
  }, [])

  return (
    <Modal
      isOpen={!!image}
      onRequestClose={closeModal}
      contentLabel="Zoomed image"
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <button className={css.closeButton} onClick={closeModal}>
        <span className={css.closeIcon} aria-hidden>
          ✖
        </span>
        <span className={css.closeLabel}>close</span>
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt="" />
    </Modal>
  )
}

export default ModalComponent
