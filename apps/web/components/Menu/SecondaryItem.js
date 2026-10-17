'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'

import css from './styles.module.scss'

// component
// ========================================================================
const MenuItem = ({ label }) => {
  const pathname = usePathname()
  const endpoint = label.toLowerCase()

  return (
    <Link
      href={`/${endpoint}`}
      className={classNames(css.link, {
        [css.active]: pathname === `/${endpoint}`,
      })}
    >
      <span className={css.linkInner}>{label}</span>
    </Link>
  )
}

export default MenuItem
