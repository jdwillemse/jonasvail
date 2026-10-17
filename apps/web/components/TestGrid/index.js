import React from 'react'
import classnames from 'classnames'

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
      <div className="col" key={i}>
        <div className={css.inner}></div>
      </div>
    )
  }

  return (
    <div className={classnames('container-fluid', css.wrap)}>
      <div className={classnames('row', css.testRow)}>{columns}</div>
    </div>
  )
}

export default TestGrid
