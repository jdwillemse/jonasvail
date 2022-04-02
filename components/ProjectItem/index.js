import React from 'react'
import Image from 'next/image'

import css from './styles.module.scss'
import { asText } from '../../utils/prismic'
import Link from '../Link'

const ProjectItem = ({ node }) => {
  const { title, client, listImage } = node

  return (
    <article className={css.wrap}>
      <Link link={node} className={css.link}>
        <div className={css.imageWrap}>
          <Image
            src={listImage.url}
            {...listImage.dimensions}
            alt=""
            placeholder="blur"
            blurDataURL={`/_next/image?url=${listImage.url}&w=16&q=1`}
            layout="responsive"
            sizes="50vw"
          />
        </div>
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
