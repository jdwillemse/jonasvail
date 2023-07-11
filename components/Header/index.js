import React from 'react'
import Link from 'next/link'

import css from './styles.module.scss'

const Header = ({ data }) => (
  <header className={css.wrap}>
    <Link href="/">
      <a className={css.logo}>{data.company_name}</a>
    </Link>
    <div>{data.subtitle}</div>
  </header>
)

export default Header
