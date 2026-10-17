'use client'

import { useState } from 'react'
import Link from 'next/link'

import css from './styles.module.css'

const links = [
  { href: '/brand-development-and-strategy', label: 'Brand Development' },
  { href: '/creative-and-campaign-strategy', label: 'Creative & Campaign' },
]

export default function Header({ email }) {
  const [open, setOpen] = useState(false)

  return (
    <header className={`${css.header} reveal-fade`}>
      <Link href="/" className={css.title}>
        Jonas Vail
      </Link>
      <button
        type="button"
        className={css.burger}
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => setOpen(!open)}
      >
        <span className="visually-hidden">{open ? 'Close' : 'Open'} menu</span>
      </button>
      <nav id="site-nav" className={css.nav} data-open={open}>
        {links.map(({ href, label }, i) => (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            style={{ '--i': i }}
          >
            {label}
          </Link>
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
