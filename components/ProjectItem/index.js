import React from 'react'
import Image from 'next/image'

import css from './styles.module.scss'
import { asText } from '../../utils/prismic'
import Link from '../Link'

const ProjectItem = ({ data, ...document }) => {
  const { title, client, list_image, previewImage } = data

  return (
    <article className={css.wrap}>
      <Link link={document} className={css.link}>
        <div className={css.imageWrap}>
          <Image
            src={list_image.url}
            {...list_image.dimensions}
            alt=""
            placeholder="blur"
            blurDataURL={previewImage}
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
