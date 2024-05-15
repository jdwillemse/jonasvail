import React from 'react'
import Link from 'next/link'

import css from './styles.module.scss'

const Header = (data) => (
  <header className={css.wrap}>
    <Link href="/" className={css.logo}>
      {data?.companyName}
    </Link>
    <div className={css.subtitle}>{data?.subtitle}</div>
  </header>
)

export default Header
