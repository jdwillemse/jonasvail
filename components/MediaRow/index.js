import React, { useCallback, useContext } from 'react'
import classnames from 'classnames'
import Image from 'next/legacy/image'
import isEmpty from 'lodash/isEmpty'

import css from './styles.module.scss'
import RichText from '../RichText'
import Video from '../Video'
import { ModalContext } from '../../context/ModalProvider'

const MediaRow = ({ primary, items = [] }) => {
  const { setImage } = useContext(ModalContext)
  const mediaBlocks = []
  const handleClick = useCallback(
    (event) => {
      const image = event.target.dataset.src
      setImage(image)
    },
    [setImage]
  )

  for (let i = 0; i < items.length; i++) {
    const { image, video } = items[i]
    if (!isEmpty(image) || !isEmpty(video)) {
      mediaBlocks.push(
        <div
          className={
            items.length > 1
              ? classnames(css.col, 'col-sm-12 col-md-6 col-lg')
              : 'col'
          }
          key={video?.uri || image.url}
        >
          {!isEmpty(video) && (
            <div className={css.mediaWrap}>
              <Video {...video} />
            </div>
          )}
          {/* if there is both video and image only show video */}
          {!isEmpty(image) && isEmpty(video) && (
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
                blurDataURL={`${image.url}&w=10&q=1`}
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

export default MediaRow
