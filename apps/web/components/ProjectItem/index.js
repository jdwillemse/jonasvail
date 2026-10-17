'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import css from './styles.module.scss'

const ProjectItem = ({ title, listviewImage = {}, client = {}, uid }) => {
  return (
    <article className={css.wrap}>
      <Link href={`/${client.uid}/${uid}`} className={css.link}>
        <div className={css.imageWrap}>
          {listviewImage.url && (
            <Image
              src={listviewImage.url}
              width={listviewImage.width}
              height={listviewImage.height}
              alt=""
              placeholder={listviewImage.lqip ? 'blur' : 'empty'}
              blurDataURL={listviewImage.lqip}
              sizes="50vw"
              style={{ width: '100%', height: 'auto' }}
            />
          )}
        </div>
        <h1 className={css.title}>{title}</h1>
        <div className={css.client}>{client.name}</div>
      </Link>
    </article>
  )
}

export default ProjectItem
