import React, { useState, useEffect } from 'react'
import getYouTubeID from 'get-youtube-id'

import css from './styles.module.scss'

// component
// ==========================================================================================
const Video = ({ url }) => {
  const [load, setLoad] = useState(false)

  useEffect(() => {
    setLoad(true)
  }, [setLoad])

  if (!url) {
    return null
  }

  return (
    <div className={css.wrap}>
      {load && (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${getYouTubeID(url)}`}
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
        ></iframe>
      )}
    </div>
  )
}

export default Video
