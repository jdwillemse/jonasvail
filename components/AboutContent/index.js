import React from 'react'
// import PropTypes from 'prop-types'

import css from './styles.module.scss'
import Wysiwyg from '../Wysiwyg'

const AboutContent = ({ experience, awards }) => {
  return (
    <div className="row">
      <div className="col">
        <Wysiwyg content={experience} className={css.content} />
      </div>
      <div className="col">
        <Wysiwyg content={awards} className={css.content} />
      </div>
    </div>
  )
}

AboutContent.propTypes = {
  // children: PropTypes.node.isRequired,
}

export default AboutContent
