import React from 'react'

import css from './styles.module.scss'
import RichText from '../RichText'

const AboutContent = ({ data: { experience, awards } }) => {
  return (
    <div className="row">
      <div className="col-sm-12 col-md-6">
        <RichText content={experience} className={css.content} />
      </div>
      <div className="col-sm-12 col-md-6">
        <RichText content={awards} className={css.content} />
      </div>
    </div>
  )
}

export default AboutContent
