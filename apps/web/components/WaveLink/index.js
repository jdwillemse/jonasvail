import css from './styles.module.css'

// ./client.js warps the text on hover, and stamps `logo` around the row.
export default function WaveLink({ href, logo, children }) {
  return (
    <a
      href={href}
      className={css.link}
      data-no-squiggle
      data-wave
      data-logo={logo}
    >
      {children}
    </a>
  )
}
