import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import classNames from 'classnames'

import css from './styles.module.scss'
import linkResolver from '../../utils/linkResolver'

// component
// ========================================================================
const Menu = ({ allClients = [], allProjects }) => {
  const router = useRouter()
  const query = router.query.client
  const pathname = router.asPath

  return (
    <nav>
      <Link href="/">
        <a
          className={classNames(css.link, {
            [css.active]: pathname === '/' && !query,
          })}
        >
          <span className={css.linkInner}>Clients</span>
        </a>
      </Link>
      <div className={css.clientWrap}>
        {allClients.map(({ node: { name, _meta } }) => {
          const filteredProjects = allProjects.filter(
            ({ node }) => node.client.name === name
          )
          const href =
            filteredProjects.length > 1
              ? `/?client=${name}`
              : linkResolver(filteredProjects[0].node._meta)

          return (
            <Link href={href} key={_meta.id}>
              <a
                className={classNames(css.link, {
                  [css.active]: query === name,
                })}
              >
                <span className={css.linkInner}>{name}</span>
              </a>
            </Link>
          )
        })}
      </div>
      <Link href="/about">
        <a
          className={classNames(css.link, {
            [css.active]: pathname === '/about',
          })}
        >
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
