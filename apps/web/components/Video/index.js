'use client'

import { useState, useSyncExternalStore } from 'react'
import Image from 'next/image'
import getYouTubeID from 'get-youtube-id'

import css from './styles.module.css'

// consent
// ==========================================================================================
// Clicking one video consents to all of them, and localStorage remembers it.
// `consented` stands in where localStorage throws, such as blocked storage.
const KEY = 'youtube-consent'
let consented = false

const readConsent = () => {
  try {
    return localStorage.getItem(KEY) === 'yes'
  } catch {
    return consented
  }
}

const giveConsent = () => {
  try {
    localStorage.setItem(KEY, 'yes')
  } catch {
    consented = true
  }
  window.dispatchEvent(new Event(KEY))
}

// `storage` fires for other tabs, `KEY` for this one.
const subscribe = (callback) => {
  window.addEventListener('storage', callback)
  window.addEventListener(KEY, callback)
  return () => {
    window.removeEventListener('storage', callback)
    window.removeEventListener(KEY, callback)
  }
}

// component
// ==========================================================================================
// Nothing loads from YouTube until the visitor consents (GDPR): even the
// nocookie domain sends their IP address to Google.
const Video = ({ url }) => {
  const load = useSyncExternalStore(subscribe, readConsent, () => false)
  const [clicked, setClicked] = useState(false)

  if (!url) {
    return null
  }

  const id = getYouTubeID(url)

  return (
    <div className={css.wrap}>
      {load ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}${clicked ? '?autoplay=1' : ''}`}
          title="YouTube video"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      ) : (
        <button
          type="button"
          className={css.consent}
          onClick={() => {
            setClicked(true)
            giveConsent()
          }}
        >
          <Image
            className={css.thumbnail}
            src={`/api/youtube-thumbnail/${id}`}
            alt=""
            fill
            unoptimized
          />
          <span className={css.notice}>
            <strong>Play video</strong>
            <span>
              This loads all videos from YouTube, which sends your data to
              Google.
            </span>
          </span>
        </button>
      )}
    </div>
  )
}

export default Video
