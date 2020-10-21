import React from 'react'
import { Row, Col } from 'react-bootstrap'

import css from './styles.module.scss'
import Wysiwyg from '../Wysiwyg'
import Image from '../Image'
import Video from '../Video'

const MediaRow = ({ primary, fields }) => {
  // console.log({ primary, fields })
  const mediaBlocks = []

  for (let i = 0; i < fields.length; i++) {
    const { image, video } = fields[i]
    if (image || video) {
      mediaBlocks.push(
        <Col key={video?.uri || image.url}>
          {video && <Video {...video} />}
          {/* if there is both video and image only show video */}
          {image && !video && <Image image={image} className={css.image} />}
        </Col>
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
          <Wysiwyg content={primary.description} />
        </div>
      )}
      <Row>{mediaBlocks}</Row>
    </div>
  )
}

MediaRow.propTypes = {
  // children: PropTypes.node.isRequired,
}

export default MediaRow
