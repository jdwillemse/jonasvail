import React from 'react'
import PropTypes from 'prop-types'

import css from './styles.module.scss'
import { asText } from '../../utils/prismic'
import Image from '../Image'
import Link from '../Link'

const ProjectItem = ({ node }) => {
  const { title, client, listImage, listImageSharp } = node

  return (
    <article className={css.wrap}>
      <Link link={node} className={css.link}>
        <Image className={css.image} image={listImage} {...listImageSharp} />
        <h1 className={css.title}>{asText(title)}</h1>
        {client?.name && <div className={css.client}>{client.name}</div>}
      </Link>
    </article>
  )
}

ProjectItem.propTypes = {
  // children: PropTypes.node.isRequired,
}

export default ProjectItem
