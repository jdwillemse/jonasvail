import css from './styles.module.css'

const links = [
  { href: '/brand-development-and-strategy', label: 'Brand Development' },
  { href: '/creative-and-campaign-strategy', label: 'Creative & Campaign' },
  { href: '/about', label: 'About' },
]

// The burger opens and closes the menu through ./client.js.
export default function Header({ email }) {
  return (
    <header className={css.header}>
      <a href="/" className={css.title}>
        Jonas Vail
      </a>
      <button
        type="button"
        className={`${css.burger} reveal-fade`}
        aria-expanded="false"
        aria-controls="site-nav"
      >
        <span className="visually-hidden">Open menu</span>
      </button>
      <nav id="site-nav" className={css.nav} data-open="false">
        {links.map(({ href, label }, i) => (
          <a key={href} href={href} style={{ '--i': i }}>
            {label}
          </a>
        ))}
        {email && (
          <a href={`mailto:${email}`} style={{ '--i': links.length }}>
            Contact
          </a>
        )}
      </nav>
    </header>
  )
}
