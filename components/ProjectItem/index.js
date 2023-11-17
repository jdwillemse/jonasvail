'use client'
import React from 'react'
import Image from 'next/legacy/image'

import css from './styles.module.scss'
import { asText } from '../../utils/prismic'
import Link from '../Link'

const ProjectItem = ({ data, ..._meta }) => {
  const { title, client, list_image } = data

  return (
    <article className={css.wrap}>
      <Link link={_meta} className={css.link}>
        <div className={css.imageWrap}>
          <Image
            src={list_image.url}
            {...list_image.dimensions}
            alt=""
            placeholder="blur"
            blurDataURL={`${list_image.url}&w=10&q=1`}
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

export default ProjectItem
