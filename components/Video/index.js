import React from 'react'

import css from './styles.module.scss'

// component
// ==========================================================================================
const Video = ({ type, html }) => {
  if (!html || type !== 'video') {
    return null
  }

  const optimisedHtml = html
    .split('></iframe>')
    .join(' loading="lazy"></iframe>')

  console.log(optimisedHtml)

  return (
    <div
      className={css.wrap}
      dangerouslySetInnerHTML={{ __html: optimisedHtml }}
    ></div>
  )
}

export default Video
