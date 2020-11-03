const meta = `
  id
  uid
  type
`

export const allProjectsQuery = `
  query allProjectsQuery($cursor: String) {
    allProjects(after: $cursor, sortBy:date_DESC) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          _meta {
            ${meta}
          }
          title
          listImage: list_image
          date
          client {
            ... on Client {
              name
            }
          }
        }
      }
    }
  }
`

export const clientsQuery = `
  query {
    allClients(sortBy:meta_firstPublicationDate_DESC) {
      edges {
        node {
          _meta {
            ${meta}
          }
          name
        }
      }
    }
  }
`

export const projectQuery = `
  query ($uid: String!) {
    allProjects(uid: $uid) {
      edges {
        node {
          _meta {
            ${meta}
            firstPublicationDate
          }
          title
          body
          client {
            ... on Client {
              _meta {
                ${meta}
              }
              name
            }
          }
          slices {
            ... on ProjectSlicesMediarow {
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
          metaTitle: meta_title
          metaDescription: meta_description
          metaImage: meta_image
        }
      }
    }
  }
`

export const aboutQuery = `
  query {
    allAbouts {
      edges {
        node {
          title
          body
          experience
          awards
          metaTitle: meta_title
          metaDescription: meta_description
          metaImage: meta_image
        }
      }
    }
  }
`

export const settingsQuery = `
  query {
    allConfigs {
      edges {
        node {
          companyName :company_name
          title
          description
          keywords
          image
        }
      }
    }
  }
`
