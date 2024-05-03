'use client'
import React from 'react'
import Image from 'next/legacy/image'

import css from './styles.module.scss'
import Link from '../Link'

const ProjectItem = ({ title, listviewImage = {}, client = {}, uid }) => {
  return (
    <article className={css.wrap}>
      <Link link={{ client, uid, type: 'project' }} className={css.link}>
        <div className={css.imageWrap}>
          <Image
            src={listviewImage.url}
            width={listviewImage.width}
            height={listviewImage.height}
            alt=""
            placeholder="blur"
            blurDataURL={`${listviewImage.url}&w=10&q=1`}
            layout="responsive"
            sizes="50vw"
          />
        </div>
        <h1 className={css.title}>{title}</h1>
        <div className={css.client}>{client.name}</div>
      </Link>
    </article>
  )
}

export default ProjectItem
