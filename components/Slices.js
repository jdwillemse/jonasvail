import React from 'react'

import { asText } from '../utils/prismic'
import MediaRow from './MediaRow'

// component
// ==========================================================================================
const Slices = ({ slices }) => {
  if (!Array.isArray(slices)) return null

  const mapedSlices = slices.map((slice, i) => {
    const key = `${slice.type}${i}`
    
    switch (slice.type) {
      case 'mediaRow':
        return <MediaRow {...slice} key={key} />


      default:
        return null
    }
  })

  return mapedSlices
}

export default Slices
