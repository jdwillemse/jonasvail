'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import css from './styles.module.scss'

// component
// ========================================================================
const HeaderItem = () => {
  const pathname = usePathname()

  return (
    <Link href="/" className={css.link}>
      <span className={css.linkInner}>Clients</span>
    </Link>
  )
}

export default HeaderItem
