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

  return (
    <Link
      href={linkResolver(link)}
      key={link.id}
      // activeClassName="active"
      className={className}
    >
      {children}
    </Link>
  )
}

export default LinkComponent
