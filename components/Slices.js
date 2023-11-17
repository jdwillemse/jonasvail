import MediaRow from './MediaRow'

// component
// ==========================================================================================
const Slices = ({ project }) => {
  const { slices } = project?.data

  if (!Array.isArray(slices)) {
    return null
  }

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
