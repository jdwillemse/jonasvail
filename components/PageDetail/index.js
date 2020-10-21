import React from 'react'
// import PropTypes from 'prop-types'

import css from './styles.module.scss'
import { asText } from '../../utils/prismic'
import Wysiwyg from '../Wysiwyg'

const PageDetail = ({ title, body, children }) => {
  return (
    <article className={css.wrap}>
      <h1 className={css.title}>{asText(title)}</h1>
      <Wysiwyg content={body} className={css.content} />
      {children}
    </article>
  )
}

PageDetail.propTypes = {
  // children: PropTypes.node.isRequired,
}

export default PageDetail
