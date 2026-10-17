import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'

import css from './styles.module.scss'
import linkResolver from '../../utils/linkResolver'

// component
// ========================================================================
const ClientItem = ({ name, uid, isActive }) => {
  return (
    <Link
      href={linkResolver({ uid, type: 'client' })}
      key={uid}
      className={classNames(css.link, { [css.active]: isActive })}
    >
      <span className={css.linkInner}>{name}</span>
    </Link>
  )
}

export default ClientItem
