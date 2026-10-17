import css from './styles.module.css'

export default function Footer({ companyName, email, address }) {
  return (
    <footer className={css.footer}>
      <p className={css.name}>{companyName}</p>
      {email && (
        <p className={css.contact}>
          <a href={`mailto:${email}`}>{email}</a>
        </p>
      )}
      {address && (
        <p className={css.address}>
          {address.split('\n').map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </p>
      )}
    </footer>
  )
}
