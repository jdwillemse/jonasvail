'use server'
import React from 'react'

import css from './styles.module.scss'

const ExperienceItem = ({ dates, jobTitle, employer, description }) => {
  return (
    <div className={css.experienceWrap}>
      {dates && <div className={css.awardDate}>{dates}</div>}
      {jobTitle && (
        <div className={!employer && css.experienceEmployer}>{jobTitle}</div>
      )}
      {employer && <div className={css.experienceEmployer}>{employer}</div>}
      {description && (
        <div className={css.experienceDescription}>{description}</div>
      )}
    </div>
  )
}

export default ExperienceItem
