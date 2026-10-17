import { PortableText } from '@portabletext/react'

import css from './styles.module.css'

// A small label beside large body copy. `aside` replaces the label, such as
// with a portrait. `copy` is rich text. `video` is a decorative cropped circle
// between the two; `videoHevc` is its transparent version for Safari, which
// can't show WebM transparency. `reveal` is the build-up class.
export default function TextSection({
  title,
  copy,
  aside,
  video,
  videoHevc,
  reveal,
}) {
  return (
    <section className={reveal ? `${css.section} ${reveal}` : css.section}>
      <div className={`${css.label} text-label`}>{aside ?? <p>{title}</p>}</div>
      {video && (
        <div className={css.media} aria-hidden="true">
          <video autoPlay muted loop playsInline>
            {/* Only Safari accepts QuickTime, so the others skip to `video`. */}
            {videoHevc && <source src={videoHevc} type="video/quicktime" />}
            <source src={video} />
          </video>
        </div>
      )}
      <div className={`${css.body} text-large`}>
        <PortableText value={copy ?? []} />
      </div>
    </section>
  )
}
