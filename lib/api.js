import {
  aboutQuery,
  settingsQuery,
  projectQuery,
  projectCollectionQuery,
  clientCollectionQuery,
} from './queries'

// Contentful fetcher

async function fetchGraphQL(query, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      next: { tags: ['posts'] },
      cache: 'no-store',
    }
  ).then((response) => response.json())
}

function extractPost(response) {
  if (response.errors) {
    const errors = response.errors.map(({ message }) => message).join('\n\n')
    throw new Error(errors)
  }
  return response?.data?.collection?.items?.[0]
}

function extractCollection(response) {
  if (response.errors) {
    const errors = response.errors.map(({ message }) => message).join('\n\n')
    throw new Error(errors)
  }
  return response?.data?.collection.items
}

// Fetch all projects data for home list
// -----------------------------------------------------------------
// query {
//   projectCollection(preview: false) {
//     items {
//       title
//       uid
//       client {
//         ... on Client {
//           uid
//         }
//       }
//       body
//     }
//   }
// }

export async function getAllProjects(preview) {
  const response = await fetchGraphQL(
    `query {
      collection: projectCollection(order: date_DESC) {
        ${projectCollectionQuery}
      }
    }`,
    preview
  )

  return extractCollection(response)
}

// Fetch all projects for a specific client
// -----------------------------------------------------------------
export async function getProjectsByClient(uid = '', preview) {
  const response = await fetchGraphQL(
    `query {
      collection: projectCollection(where: { client: { uid: "${uid}" } }, order: date_DESC) {
        ${projectCollectionQuery}
      }
    }`,
    preview
  )

  return extractCollection(response)
}

// Fetch all clients data
// -----------------------------------------------------------------
export async function getAllClients(preview = false) {
  const response = await fetchGraphQL(
    `query {
      collection: clientCollection(order: sys_firstPublishedAt_DESC) {
        ${clientCollectionQuery}
      }
    }`,
    preview
  )

  return extractCollection(response)
}

// Fetch project page by UID
// -----------------------------------------------------------------
export async function getProject(uid, preview = false) {
  const entry = await fetchGraphQL(
    `query {
      collection: projectCollection(where: { uid: "${uid}" }, limit: 1) 
        ${projectQuery}
    }`,
    preview
  )

  return extractPost(entry)
}

// Fetch about page data
// -----------------------------------------------------------------
export async function getAbout(preview = false) {
  const entry = await fetchGraphQL(
    `query {
      collection: aboutCollection(preview: ${preview}, limit: 1, order: sys_publishedAt_ASC) {
        ${aboutQuery}
      }
    }`,
    preview
  )
  return extractPost(entry)
}

// Fetch settings
// -----------------------------------------------------------------
export async function getSettings(preview = false) {
  const entry = await fetchGraphQL(
    `query {
      collection: configCollection(preview: ${preview}, limit: 1) 
        ${settingsQuery}
    }`,
    preview
  )
  return extractPost(entry)
}
