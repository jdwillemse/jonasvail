import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'

import css from './styles.module.scss'
import linkResolver from '../../utils/linkResolver'

// component
// ========================================================================
const ClientItem = ({ data, isActive, ..._meta }) => {
  return (
    <Link
      href={linkResolver(_meta)}
      key={_meta.id}
      className={classNames(css.link, { [css.active]: isActive })}
    >
      <span className={css.linkInner}>{data.name}</span>
    </Link>
  )
}

export default ClientItem
