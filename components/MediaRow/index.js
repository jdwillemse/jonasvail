import React, { useCallback, useContext } from 'react'
import classnames from 'classnames'
import Image from 'next/image'

import css from './styles.module.scss'
import RichText from '../RichText'
import Video from '../Video'
import { ModalContext } from '../../context/ModalProvider'

const MediaRow = ({ primary, fields = [] }) => {
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
        <div
          className={
            fields.length > 1
              ? classnames(css.col, 'col-sm-12 col-md-6 col-lg')
              : 'col'
          }
          key={video?.uri || image.url}
        >
          {video && (
            <div className={css.mediaWrap}>
              <Video {...video} />
            </div>
          )}
          {/* if there is both video and image only show video */}
          {image && !video && (
            <button
              className={classnames(css.button, css.mediaWrap)}
              onClick={handleClick}
              data-src={image.url}
              type="button"
            >
              <Image
                src={image.url}
                {...image.dimensions}
                alt=""
                placeholder="blur"
                blurDataURL={`/_next/image?url=${image.url}&w=16&q=1`}
                layout="responsive"
                sizes="50vw"
              />
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
