export default function linkResolver({ type, client, uid, slugs } = {}) {
  switch (type) {
    case 'project':
      return `/${client.uid}/${uid}`

    case 'client':
      return `/${uid}`

    default:
      return `/${slugs[0]}`
  }
}
