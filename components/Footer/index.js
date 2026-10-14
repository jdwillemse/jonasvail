import css from './styles.module.css'

export default function Footer() {
  return (
    <footer className={css.footer}>
      <p className={css.name}>Jonas Vail</p>
      <p className={css.contact}>
        <a href="mailto:hello@jonasvail.com">hello@jonasvail.com</a>
      </p>
      <p className={css.address}>
        Neukölln,
        <br />
        12047 Berlin
      </p>
    </footer>
  )
}
