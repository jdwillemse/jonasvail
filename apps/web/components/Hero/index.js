import css from './styles.module.css'

// ./client.js wobbles the copy on scroll.
export default function Hero({ heroCopy }) {
  return (
    <section className={css.hero}>
      <h1 className={css.copy} data-hero>
        {heroCopy}
      </h1>
    </section>
  )
}
