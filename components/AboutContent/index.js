import React from 'react'

import css from './styles.module.scss'
import AwardItem from './AwardItem'
import ExperienceItem from './ExperienceItem'

const AboutContent = ({
  experienceTitle,
  experienceList,
  accoladesTitle,
  accoladesList,
} = {}) => {
  return (
    <div className={css.wrap}>
      <div className={css.col}>
        <h3 className={css.title}>{experienceTitle}</h3>
        {experienceList && (
          <ul className={css.list}>
            {experienceList?.items.map((item) => (
              <ExperienceItem {...item} key={item.sys.id} />
            ))}
          </ul>
        )}
      </div>
      <div className={css.col}>
        <h3 className={css.title}>{accoladesTitle}</h3>
        {accoladesList && (
          <ul className={css.list}>
            {accoladesList?.items.map((item) => (
              <AwardItem {...item} key={item.sys.id} />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default AboutContent
