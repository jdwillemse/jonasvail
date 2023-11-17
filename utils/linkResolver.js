export default function linkResolver({ type, uid, slugs, tags } = {}) {
  switch (type) {
    case 'project':
      return `/${tags[0]}/${uid}`

    case 'client':
      return `/${uid}`

    default:
      return `/${slugs[0]}`
  }
}
