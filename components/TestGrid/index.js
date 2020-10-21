import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import css from './styles.module.scss'

const COLUMN_COUNT = 12

const TestGrid = () => {
  const columns = []
  // console.log('process.env.NODE_ENV: ', process?.env.NODE_ENV)
  // if (process?.env.NODE_ENV !== 'development') {
  //   return null
  // }

  for (let i = 0; i < COLUMN_COUNT; i++) {
    columns.push(
      <Col key={i}>
        <div className={css.inner}></div>
      </Col>
    )
  }

  return (
    <Container className={css.wrap}>
      <Row className={css.testRow}>
        <h1>xxxx</h1>
        {columns}
      </Row>
    </Container>
  )
}

export default TestGrid
