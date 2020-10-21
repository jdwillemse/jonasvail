import Prismic from 'prismic-javascript'

const REPOSITORY = process.env.PRISMIC_REPOSITORY_NAME
const REF_API_URL = `https://${REPOSITORY}.prismic.io/api/v2`
const GRAPHQL_API_URL = `https://${REPOSITORY}.prismic.io/graphql`
// export const API_URL = 'https://your-repo-name.cdn.prismic.io/api/v2'
export const API_TOKEN = process.env.PRISMIC_API_TOKEN
export const API_LOCALE = process.env.PRISMIC_REPOSITORY_LOCALE

export const PrismicClient = Prismic.client(REF_API_URL, {
  accessToken: API_TOKEN,
})

async function fetchAPI(query, { previewData, variables } = {}) {
  const prismicAPI = await PrismicClient.getApi()
  const res = await fetch(
    `${GRAPHQL_API_URL}?query=${query}&variables=${JSON.stringify(variables)}`,
    {
      headers: {
        'Prismic-Ref': previewData?.ref || prismicAPI.masterRef.ref,
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

export async function getAllProjects(previewData) {
  const fetchData = (previewData) => {
    let edges = []
    const fetcher = (cursor, previewData) =>
      fetchAPI(
        `
      query HomeQuery($cursor: String) {
        allProjects(after: $cursor, sortBy:date_DESC) {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              _meta {
                id
                uid
                type
              }
              title
              body
              listImage: list_image
              date
              client {
                ... on Client {
                  _meta {
                    id
                    uid
                    type
                  }
                  name
                }
              }
            }
          }
        }
      }
    `,
        {
          previewData,
          variables: {
            cursor,
          },
        }
      ).then((response) => {
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

export async function getAllClients(previewData) {
  const data = await fetchAPI(
    `
    query {
      allClients(sortBy:meta_firstPublicationDate_DESC) {
        edges {
          node {
            _meta {
              id
              uid
              type
            }
            name
          }
        }
      }
    }
  `,
    { previewData }
  )

  return data.allClients.edges
}

export async function getProjectAndMoreProjects(uid, previewData) {
  const data = await fetchAPI(
    `
    query($uid: String!) {
      allProjects(uid: $uid) {
        edges {
          node {
            _meta {
              id
              uid
              type
              firstPublicationDate
            }
            title
            body
            client {
              ... on Client {
                _meta {
                  id
                  uid
                  type
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
          }
        }
      }
    }
  `,
    {
      previewData,
      variables: {
        uid,
      },
    }
  )

  return data.allProjects?.edges[0] || {}
}

export async function getAbout(previewData) {
  const data = await fetchAPI(
    `
    query {
      allAbouts {
        edges {
          node {
            meta: _meta {
              id
              uid
              type
            }
            title
            body
            experience
            awards
          }
        }
      }
    }
  `,
    {
      previewData,
    }
  )

  return data.allAbouts?.edges[0] || {}
}
