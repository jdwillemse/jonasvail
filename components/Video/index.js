import React, { useState, useEffect } from 'react'

import css from './styles.module.scss'

// component
// ==========================================================================================
const Video = ({ type, html }) => {
  const [load, setLoad] = useState(false)

  useEffect(() => {
    setLoad(true)
  }, [setLoad])

  if (!html || type !== 'video') {
    return null
  }

  const optimisedHtml = html
    .split('></iframe>')
    .join(' loading="lazy"></iframe>')

  return load ? (
    <div
      className={css.wrap}
      dangerouslySetInnerHTML={{ __html: optimisedHtml }}
    ></div>
  ) : null
}

export default Video
