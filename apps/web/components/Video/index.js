'use client'

import { useState } from 'react'
import getYouTubeID from 'get-youtube-id'

import css from './styles.module.scss'

// component
// ==========================================================================================
// Nothing loads from YouTube until the visitor clicks (GDPR consent): even the
// nocookie domain sends their IP address to Google.
const Video = ({ url }) => {
  const [load, setLoad] = useState(false)

  if (!url) {
    return null
  }

  return (
    <div className={css.wrap}>
      {load ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${getYouTubeID(url)}?autoplay=1`}
          title="YouTube video"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      ) : (
        <button
          type="button"
          className={css.consent}
          onClick={() => setLoad(true)}
        >
          <strong>Play video</strong>
          <span>
            This loads the video from YouTube, which sends your data to Google.
          </span>
        </button>
      )}
    </div>
  )
}

export default Video
