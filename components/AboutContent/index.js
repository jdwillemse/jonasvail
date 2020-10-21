import React from 'react'
// import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'

import css from './styles.module.scss'
import Wysiwyg from '../Wysiwyg'

const AboutContent = ({ experience, awards }) => {
  return (
    <Row>
      <Col>
        <Wysiwyg content={experience} className={css.content} />
      </Col>
      <Col>
        <Wysiwyg content={awards} className={css.content} />
      </Col>
    </Row>
  )
}

AboutContent.propTypes = {
  // children: PropTypes.node.isRequired,
}

export default AboutContent
