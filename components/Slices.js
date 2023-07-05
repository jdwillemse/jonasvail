import React from 'react'

import MediaRow from './MediaRow'

// component
// ==========================================================================================
const Slices = ({ data: { slices } }) => {
  if (!Array.isArray(slices)) return null

  const mappedSlices = slices.map((slice) => {
    switch (slice.slice_type) {
      case 'mediaRow':
        return <MediaRow {...slice} key={slice.id} />

      default:
        return null
    }
  })

  return mappedSlices
}

export default Slices
