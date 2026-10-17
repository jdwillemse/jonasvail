import getYouTubeID from 'get-youtube-id'

import Picture from '@/components/Picture'

import css from './styles.module.css'

// Nothing loads from YouTube until the visitor consents (GDPR): even the
// nocookie domain sends their IP address to Google. `thumbnail` comes from
// lib/images.js, so it's served from this site. ./client.js swaps in the
// player.
const Video = ({ url, thumbnail }) => {
  if (!url) {
    return null
  }

  return (
    <div className={css.wrap} data-youtube={getYouTubeID(url)}>
      <button type="button" className={css.consent}>
        {thumbnail && (
          <Picture
            image={thumbnail}
            className={css.thumbnail}
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        )}
        <span className={css.notice}>
          <strong>Play video</strong>
          <span>
            This loads all videos from YouTube, which sends your data to Google.
          </span>
        </span>
      </button>
    </div>
  )
}

export default Video
