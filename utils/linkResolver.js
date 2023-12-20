export default function linkResolver({ type, uid, slugs, client } = {}) {
  switch (type) {
    case 'project':
      return `${client.uid}/${uid}`

    case 'client':
      return `/${uid}`

    default:
      return `/${slugs[0]}`
  }
}
