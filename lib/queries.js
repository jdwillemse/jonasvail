export const allProjectsQuery = `
{
  project {
    title
    list_image
    date
    client {
      ... on client {
        name
      }
    }
  }
}
`

export const clientsQuery = `
  {
    client {
      name
    }
  }
`

export const projectQuery = `
  {
    project {
      title
      body
      client {
        ... on client {
          name
        }
      }
      slices {
        ... on projectSlicesMediarow {
          type
          primary {
            description
          }
          fields {
            video
            image
          }
        }
      }
      meta_title
      meta_description
      meta_image
    }
  }
`

export const aboutQuery = `
  {
    about {
      title
      body
      experience
      awards
      meta_title
      meta_description
      meta_image
    }
  }
`

export const settingsQuery = `
  {
    config {
      company_name
      title
      description
      keywords
      image
    }
  }
`
