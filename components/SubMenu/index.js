import React, { useState } from 'react'
import Link from 'next/link'

import css from './styles.module.scss'

// component
// ========================================================================
const SubMenu = () => {
  return (
    <nav className={css.wrap}>
      <Link href="/about" className={css.secondary}>
        About
      </Link>
      <a
        href="mailto:jonasvail@gmail.com?Subject=Hoi%20Hoi%20Hello!"
        className={css.secondary}
      >
        Contact
      </a>
    </nav>
  )
}

export default SubMenu
