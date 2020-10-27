import React from 'react'
// import PropTypes from 'prop-types'

import css from './styles.module.scss'
import { asText } from '../../utils/prismic'
import RichText from '../RichText'

const PageDetail = ({ title, body, client, children }) => {
  return (
    <article className={css.wrap}>
      {client && <div className={css.chapeau}>{client.name}</div>}
      <h1 className={css.title}>{asText(title)}</h1>
      <RichText content={body} className={css.content} />
      {children}
    </article>
  )
}

PageDetail.propTypes = {
  // children: PropTypes.node.isRequired,
}

export default PageDetail
