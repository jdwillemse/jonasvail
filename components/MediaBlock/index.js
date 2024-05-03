import React, { useCallback, useContext } from 'react'
import classnames from 'classnames'
import Image from 'next/image'
import _ from 'lodash'
import Markdown from 'react-markdown'

import css from './styles.module.scss'
import Video from '../Video'
import { ModalContext } from '../../context/ModalProvider'

const MediaBlock = ({ mediaBlockList, description }) => {
  const { setImage } = useContext(ModalContext)
  const handleClick = useCallback(
    (event) => {
      const image = event.target.dataset.src
      setImage(image)
    },
    [setImage]
  )

  if (mediaBlockList.items.length === 0) {
    return null
  }

  return (
    <div className={css.wrap}>
      {mediaBlockList.items.map((item) => (
        <>
          {item.text && (
            <div className={css.copy}>
              <Markdown>{item.text}</Markdown>
            </div>
          )}
          {item.mediaCollection.items && (
            <div className={css.gallery} key={item.sys.id}>
              {item.mediaCollection.items.map(
                (image) =>
                  image.url && (
                    <button
                      className={classnames(css.button, css.imageWrap)}
                      onClick={handleClick}
                      data-src={image.url}
                      type="button"
                      key={image.url}
                      style={{
                        flexBasis: `${(100 * image.width) / image.height}%`,
                      }}
                    >
                      <Image
                        src={image.url}
                        width={image.width}
                        height={image.height}
                        alt={image.description || ''}
                        placeholder="blur"
                        blurDataURL={`${image.url}&w=10&q=1`}
                        sizes="50vw"
                      />
                    </button>
                  )
              )}
            </div>
          )}

          {item.video && (
            <div className="col">
              <div className={css.mediaWrap}>
                <Video url={item.video} />
              </div>
            </div>
          )}
        </>
      ))}
    </div>
  )
}

export default MediaBlock
