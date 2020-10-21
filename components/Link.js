import React from 'react'
import Link from 'next/link'

import linkResolver from '../utils/linkResolver'

// component
// ==========================================================================================
const LinkComponent = ({ link, children, className }) => {
  if (!link) {
    return null
  }

  // external links
  if (link.url) {
    return (
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    )
  }

  return link._meta ? (
    <Link
      href={linkResolver(link._meta)}
      key={link._meta.id}
      activeClassName="active"
    >
      <a className={className}>{children}</a>
    </Link>
  ) : null
}

export default LinkComponent
