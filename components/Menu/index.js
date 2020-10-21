import React from 'react'
import Link from 'next/link'

import css from './styles.module.scss'

// component
// ========================================================================
const Menu = ({ allClients = [] }) => {
  return (
    <nav>
      <div className={css.primaryLink}>
        <Link href="/">Clients</Link>
      </div>
      {allClients.map(({ node: { name, _meta } }) => (
        <div className={css.clientLink} key={_meta.id}>
          <Link href={`/?client=${name}`}>{name}</Link>
        </div>
      ))}
    </nav>
  )
}

export default Menu
