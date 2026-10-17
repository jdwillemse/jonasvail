import css from './styles.module.css'

export default function GetInTouch({ email }) {
  if (!email) return null
  return (
    <section className={css.wrap}>
      <h1 className={css.heading}>
        <a href={`mailto:${email}`}>Get in Touch</a>
      </h1>
    </section>
  )
}
