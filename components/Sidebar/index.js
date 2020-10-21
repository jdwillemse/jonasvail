import React, { useState } from 'react'
// import PropTypes from "prop-types"

import css from './styles.module.scss'

// component
// ========================================================================
const Sidebar = ({children}) => {

  return (
    <div className={css.wrap}>
      <div className={css.scroller}>
        {children}</div>
    </div>
  )
}

export default Sidebar
