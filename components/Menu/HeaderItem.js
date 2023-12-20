'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import classNames from 'classnames'

import css from './styles.module.scss'

// component
// ========================================================================
const HeaderItem = () => {
  const query = useSearchParams()
  const pathname = usePathname()

  return (
    <Link
      href="/"
      className={classNames(css.link, {
        [css.active]: pathname === '/' && !query,
      })}
    >
      <span className={css.linkInner}>Clients</span>
    </Link>
  )
}

export default HeaderItem
