import './fetch-polyfill'
import * as prismic from '@prismicio/client'
import _ from 'lodash'

import { allProjectsQuery } from './queries'

const REPOSITORY = process.env.PRISMIC_REPOSITORY_NAME
export const API_TOKEN = process.env.PRISMIC_API_TOKEN
export const API_LOCALE = process.env.PRISMIC_REPOSITORY_LOCALE

const endpoint = prismic.getRepositoryEndpoint(REPOSITORY)
const client = prismic.createClient(endpoint, {})

// Fetch all projects data for home list
// -----------------------------------------------------------------
export async function getAllProjects(previewData) {
  const projects = await client.getAllByType('project', {
    graphQuery: allProjectsQuery,
    orderings: {
      field: 'document.first_publication_date',
      direction: 'desc',
    },
    lang: API_LOCALE,
  })

  return projects
}

// Fetch all clients data
// -----------------------------------------------------------------
export async function getAllClients(previewData) {
  const clients = await client.getAllByType('client', {
    orderings: {
      field: 'document.first_publication_date',
      direction: 'desc',
    },
    lang: API_LOCALE,
  })

  return clients
}

// Fetch all project pages data
// -----------------------------------------------------------------
export async function getProjectAndMoreProjects(uid, previewData) {
  const project = await client.get({
    filters: [prismic.filter.at('my.project.uid', uid)],
  })
  return project.results?.[0] || {}
}

// Fetch about page data
// -----------------------------------------------------------------
export async function getAbout(previewData) {
  const about = await client.getAllByType('about', {
    orderings: {
      field: 'document.first_publication_date',
      direction: 'desc',
    },
    lang: API_LOCALE,
  })

  return about[0] || {}
}

// Fetch settings
// -----------------------------------------------------------------
export async function getSettings(previewData) {
  const config = await client.getAllByType('config', {
    orderings: {
      field: 'document.first_publication_date',
      direction: 'desc',
    },
    lang: API_LOCALE,
  })

  return config[0] || {}
}
