import React, { useCallback, useContext } from 'react'
import classnames from 'classnames'

import css from './styles.module.scss'
import RichText from '../RichText'
import Image from '../Image'
import Video from '../Video'
import { ModalContext } from '../../context/ModalProvider'

const MediaRow = ({ primary, fields }) => {
  const { setImage } = useContext(ModalContext)
  const mediaBlocks = []
  const handleClick = useCallback(
    (event) => {
      const image = event.target.dataset.src
      setImage(image)
    },
    [setImage]
  )

  for (let i = 0; i < fields.length; i++) {
    const { image, video } = fields[i]

    if (image || video) {
      mediaBlocks.push(
        <div className="col" key={video?.uri || image.url}>
          {video && <Video {...video} />}
          {/* if there is both video and image only show video */}
          {image && !video && (
            <button
              className={css.button}
              onClick={handleClick}
              data-src={image.url}
              type="button"
            >
              <Image image={image} className={css.image} />
            </button>
          )}
        </div>
      )
    }
  }

  if (mediaBlocks.length === 0) {
    return null
  }

  return (
    <div className={css.wrap}>
      {primary.description && (
        <div className={css.copy}>
          <RichText content={primary.description} />
        </div>
      )}
      <div className={classnames('row', css.row)}>{mediaBlocks}</div>
    </div>
  )
}

MediaRow.propTypes = {
  // children: PropTypes.node.isRequired,
}

export default MediaRow
