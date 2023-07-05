export default function linkResolver({ type, uid, slugs } = {}) {
  switch (type) {
    case 'project':
      return `/${uid}`

    default:
      return `/${slugs[0]}`
  }
}
