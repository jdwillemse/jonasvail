import React from 'react'

import css from './styles.module.scss'

// component
// ==========================================================================================
const Video = ({ type, html }) => {
  if (!html || type !== 'video') {
    return null
  }

  return (
    <div className={css.wrap} dangerouslySetInnerHTML={{ __html: html }}></div>
  )
}

export default Video
