export default function linkResolver ({ type, uid } = {}) {
  switch (type) {

    case 'project':
      return `/${uid}`

    default:
      return `/${uid}`
  }
}
