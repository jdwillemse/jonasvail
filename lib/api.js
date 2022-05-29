import './fetch-polyfill'
import * as prismic from '@prismicio/client'

import {
  allProjectsQuery,
  clientsQuery,
  projectQuery,
  aboutQuery,
  settingsQuery,
} from './queries.js'

const REPOSITORY = process.env.PRISMIC_REPOSITORY_NAME
const GRAPHQL_API_URL = `https://${REPOSITORY}.prismic.io/graphql`
export const API_TOKEN = process.env.PRISMIC_API_TOKEN
export const API_LOCALE = process.env.PRISMIC_REPOSITORY_LOCALE

const endpoint = prismic.getEndpoint(REPOSITORY)
const client = prismic.createClient(endpoint, {
  accessToken: API_TOKEN,
})

async function fetchAPI(query, { previewData, variables } = {}) {
  const refs = await client.getRefs()
  const res = await fetch(
    `${GRAPHQL_API_URL}?query=${query}&variables=${JSON.stringify(variables)}`,
    {
      headers: {
        'Prismic-Ref': JSON.stringify(refs[0]),
        'Content-Type': 'application/json',
        'Accept-Language': API_LOCALE,
        Authorization: `Token ${API_TOKEN}`,
      },
    }
  )

  if (res.status !== 200) {
    console.log(await res.text())
    throw new Error('Failed to fetch API')
  }

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

// Fetch all projects data for home list
// -----------------------------------------------------------------
export async function getAllProjects(previewData) {
  const fetchData = (previewData) => {
    let edges = []
    const fetcher = (cursor, previewData) =>
      fetchAPI(allProjectsQuery, {
        previewData,
        variables: {
          cursor,
        },
      }).then((response) => {
        // add this batch of edges to holding var
        edges = edges.concat(response.allProjects.edges)
        // if there are more pages to fetch then do so
        if (response.allProjects.pageInfo.hasNextPage) {
          return fetcher(response.allProjects.pageInfo.endCursor, previewData)
        }
        return edges
      })
    return fetcher('', previewData)
  }

  const edges = await fetchData(previewData)

  return edges
}

// Fetch all clients data
// -----------------------------------------------------------------
export async function getAllClients(previewData) {
  const data = await fetchAPI(clientsQuery, { previewData })

  return data.allClients.edges
}

// Fetch all project pages data
// -----------------------------------------------------------------
export async function getProjectAndMoreProjects(uid, previewData) {
  const data = await fetchAPI(projectQuery, {
    previewData,
    variables: {
      uid,
    },
  })

  return data.allProjects?.edges[0] || {}
}

// Fetch about page data
// -----------------------------------------------------------------
export async function getAbout(previewData) {
  const data = await fetchAPI(aboutQuery, {
    previewData,
  })

  return data.allAbouts?.edges[0] || {}
}

// Fetch settings
// -----------------------------------------------------------------
export async function getSettings(previewData) {
  const data = await fetchAPI(settingsQuery, {
    previewData,
  })

  return data.allConfigs?.edges[0].node || {}
}
