import css from './styles.module.css'

export default function GetInTouch() {
  return (
    <section className={css.wrap}>
      <h1 className={css.heading}>
        <a href="mailto:hello@jonasvail.com">Get in Touch</a>
      </h1>
    </section>
  )
}
