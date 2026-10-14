import css from './styles.module.css'

export default function Hero({ heroCopy }) {
  return (
    <section className={css.hero}>
      <h1 className={css.copy}>{heroCopy}</h1>
    </section>
  )
}
