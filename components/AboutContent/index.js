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
    <div className="row">
      <div className="col-sm-12 col-md-6">
        <h3 className={css.title}>{experienceTitle}</h3>
        {experienceList.items.map((item) => (
          <ExperienceItem {...item} key={item.sys.id} />
        ))}
      </div>
      <div className="col-sm-12 col-md-6">
        <h3 className={css.title}>{accoladesTitle}</h3>
        {accoladesList.items.map((item) => (
          <AwardItem {...item} key={item.sys.id} />
        ))}
      </div>
    </div>
  )
}

export default AboutContent
