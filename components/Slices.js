import MediaRow from './MediaRow'

// component
// ==========================================================================================
const Slices = ({ project }) => {
  if (!Array.isArray(project?.data?.slices)) {
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
