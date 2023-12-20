import React from 'react'

import css from './styles.module.scss'
import { getAllClients, getAllProjects } from '../../lib/api'
import ClientItem from './ClientItem'
import HeaderItem from './HeaderItem'
import SecondaryItem from './SecondaryItem'

// component
// ========================================================================
const Menu = async () => {
  const allClients = (await getAllClients()) || []
  const allProjects = (await getAllProjects()) || []

  return (
    <nav>
      <HeaderItem />
      <div className={css.clientWrap}>
        {(allClients || []).map((client) => (
          <ClientItem {...client} key={client.id} />
        ))}
      </div>
      <SecondaryItem label="About" />
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
