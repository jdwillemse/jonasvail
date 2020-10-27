import React from 'react'
import classNames from 'classnames'

import css from './styles.module.scss'
import { renderer } from '../../utils/prismic'

// component
// ==========================================================================================
const RichText = ({ content, className }) => {
  if (!content) {
    return null
  }

  let rendered = renderer(content)

  return <div className={classNames(className, css.wrap)}>{rendered}</div>
}

export default RichText
