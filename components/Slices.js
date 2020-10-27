import React from 'react'

import MediaRow from './MediaRow'

// component
// ==========================================================================================
const Slices = ({ slices }) => {
  if (!Array.isArray(slices)) return null

  const mappedSlices = slices.map((slice, i) => {
    const key = `${slice.type}${i}`

    switch (slice.type) {
      case 'mediaRow':
        return <MediaRow {...slice} key={key} />

      default:
        return null
    }
  })

  return mappedSlices
}

export default Slices
