import React from 'react'
import classnames from 'classnames'

import css from './styles.module.scss'
import RichText from '../RichText'
import Image from '../Image'
import Video from '../Video'

const MediaRow = ({ primary, fields }) => {
  // console.log({ primary, fields })
  const mediaBlocks = []

  for (let i = 0; i < fields.length; i++) {
    const { image, video } = fields[i]
    if (image || video) {
      mediaBlocks.push(
        <div className="col" key={video?.uri || image.url}>
          {video && <Video {...video} />}
          {/* if there is both video and image only show video */}
          {image && !video && <Image image={image} className={css.image} />}
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
