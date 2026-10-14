'use client'

import { useState } from 'react'
import Link from 'next/link'

import css from './styles.module.css'

const links = [
  { href: '/brand-development-and-strategy', label: 'Brand Development' },
  { href: '/creative-and-campaign-strategy', label: 'Creative & Campaign' },
  { href: 'mailto:hello@jonasvail.com', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className={css.header}>
      <a href="#main" className={css.skip}>
        Skip to content
      </a>
      <Link href="/home" className={css.title}>
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
        {links.map(({ href, label }) => (
          <Link key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
