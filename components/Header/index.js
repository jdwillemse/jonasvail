import React from 'react'
import Link from 'next/link'


import css from './styles.module.scss'

const Grid = () => (
  <div className={css.wrap}>
    <Link href="/">
        <a className={css.logo}>Jonas Vail</a>
      </Link>
    <div>Brand and Advertising Strategy Consultant</div>
  </div>
)

export default Grid
