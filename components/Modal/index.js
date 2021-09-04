import React, { useCallback, useContext } from 'react'
import Modal from 'react-modal'

import css from './styles.module.scss'
import { ModalContext } from '../../context/ModalProvider'

Modal.setAppElement('#__next')

const ModalComponent = () => {
  const { image, setImage } = useContext(ModalContext)

  const closeModal = useCallback(() => {
    setImage(null)
  }, [setImage])

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
      <img src={image} alt="" />
    </Modal>
  )
}

export default ModalComponent
