import React from 'react'

import css from './styles.module.scss'
import { asText } from '../../utils/prismic'
import RichText from '../RichText'

const PageDetail = ({ content, children }) => {
  if (typeof content.data === 'undefined') {
    return null
  }

  const { title, body, client } = content.data

  return (
    <article className={css.wrap}>
      {client && <div className={css.chapeau}>{client.name}</div>}
      <h1 className={css.title}>{asText(title)}</h1>
      <RichText content={body} className={css.content} />
      {children}
    </article>
  )
}

export default PageDetail
