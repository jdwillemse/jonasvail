import React from 'react'
import Link from 'next/link'

import css from './styles.module.scss'

// component
// ========================================================================
const Menu = ({ allClients = [] }) => {
  return (
    <nav>
      <Link href="/">
        <a className={css.link}>
          <span className={css.linkInner}>Clients</span>
        </a>
      </Link>
      <div className={css.clientWrap}>
        {allClients.map(({ node: { name, _meta } }) => (
          <Link href={`/?client=${name}`} key={_meta.id}>
            <a className={css.link}>
              <span className={css.linkInner}>{name}</span>
            </a>
          </Link>
        ))}
      </div>
      <Link href="/about">
        <a className={css.link}>
          <span className={css.linkInner}>About</span>
        </a>
      </Link>
      <a
        href="mailto:jonasvail@gmail.com?Subject=Hoi%20Hoi%20Hello!"
        className={css.link}
      >
        <span className={css.linkInner}>Contact</span>
      </a>
    </nav>
  )
}

export default Menu
