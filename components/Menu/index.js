import React from 'react'
import Link from 'next/link'

import css from './styles.module.scss'
import linkResolver from '../../utils/linkResolver'

// component
// ========================================================================
const Menu = ({ allClients = [], allProjects }) => {
  return (
    <nav>
      <Link href="/">
        <a className={css.link}>
          <span className={css.linkInner}>Clients</span>
        </a>
      </Link>
      <div className={css.clientWrap}>
        {allClients.map(({ node: { name, _meta } }) => {
          const filteredProjects = allProjects.filter(
            ({ node }) => node.client.name === name
          )
          const link =
            filteredProjects.length > 1
              ? { href: `/?client=${name}` }
              : { href: linkResolver(filteredProjects[0].node._meta) }

          return (
            <Link {...link} key={_meta.id}>
              <a className={css.link}>
                <span className={css.linkInner}>{name}</span>
              </a>
            </Link>
          )
        })}
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
