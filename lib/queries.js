export const projectCollectionQuery = `
  items {
    sys {
      id
    }
    uid
    title
    listviewTitle
    listviewImage {
      url
      width
      height
    }
    client {
      uid
      name
    }
  }
`

export const clientCollectionQuery = `
  items {
    name
    uid
  }
`

export const projectQuery = `
{
  items {
    title
    uid
    date
    body
    mediaBlockList: mediaBlockListCollection(limit:10) {
      items {
        sys {
          id
        }
        text
        mediaCollection(limit:8) {
          items {
            sys {
              id
            }
            url
            width
            height
            description
          }
        }
        video
      }
    }
    awards: awardsCollection(limit: 5) {
      items {
        sys {
          id
        }
        title
        year
      }
    }
    client {
      uid
      name
    }
  }
}
`

export const aboutQuery = `
  items {
    title
    body
    experienceTitle
    experienceList: experienceListCollection {
      items {
        sys {
          id
        }
        dates
        jobTitle
        employer
        description
      }
    }
    accoladesTitle
    accoladesList: accoladesCollection {
      items {
        sys {
          id
        }
        year
        title
        project {
          title
          uid
          client {
            uid
          }
        }
      }
    }
  }
`

export const settingsQuery = `
  {
    items {
      companyName
      description
      title
      subtitle
      image {
        url
      }
    }
  }
`
