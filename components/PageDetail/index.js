import React from 'react'
import Markdown from 'react-markdown'

import css from './styles.module.scss'

const PageDetail = ({ content, children }) => {
  if (typeof content === 'undefined') {
    return null
  }

  return (
    <article className={css.wrap}>
      {content.client && (
        <div className={css.chapeau}>{content.client?.name}</div>
      )}
      <h1 className={css.title}>{content.title}</h1>
      <div className={css.body}>
        <Markdown>{content.body}</Markdown>
      </div>
      {/* only relevant on project pages */}
      {content.awards?.items.length > 0 && (
        <div className={css.awardsWrap}>
          <h2 className={css.title2}>Awards</h2>
          {content.awards.items.map((award) => (
            <div key={award.sys.id}>
              {award.year} {award.title}
            </div>
          ))}
        </div>
      )}
      {children}
    </article>
  )
}

export default PageDetail
