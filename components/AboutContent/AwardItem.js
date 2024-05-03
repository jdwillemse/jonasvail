'use server'
import React from 'react'
import Link from 'next/link'

import linkResolver from '../../utils/linkResolver'
import css from './styles.module.scss'

const AwardItem = ({ year, title, project }) => {
  return (
    <div className={css.awardWrap}>
      <div className={css.awardDate}>{year}</div>
      <div className={css.awardTitle}>{title}</div>
      {project && (
        <Link
          href={linkResolver({ ...project, type: 'project' })}
          key={project.uid}
        >
          <span className={css.linkInner}>{project.title}</span>
        </Link>
      )}
    </div>
  )
}

export default AwardItem
