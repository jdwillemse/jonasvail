import React from 'react'
import classNames from 'classnames'
import { cloneDeep } from 'lodash'

import css from './styles.module.scss'
import { renderer } from '../../utils/prismic'

// component
// ==========================================================================================
const Wysiwyg = ({ content, className, hasAnchors }) => {
  if (!content) {
    return null
  }
  // take prismic content and make anchors with links
  const makeAnchorLinks = (item) => {
    const span = cloneDeep(item)
    if (span.type === 'hyperlink' && span.data.link_type === 'Web') {
      span.data.url = span.data.url.replace('https://', '#')
    }
    return span
  }

  let rendered = renderer(content)

  if (hasAnchors) {
    const modifiedContent = content.map((item) => ({
      ...item,
      spans: item.spans.map(makeAnchorLinks),
    }))
    rendered = renderer(modifiedContent)
  }

  return <div className={classNames(className, css.wrap)}>{rendered}</div>
}

export default Wysiwyg
