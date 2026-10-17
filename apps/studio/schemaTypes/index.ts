import { about } from './about'
import { client } from './client'
import {
  mediaImage,
  mediaRow,
  projectBody,
  richText,
  seo,
  youtube,
} from './objects'
import { page } from './page'
import { project } from './project'
import { settings } from './settings'

export const schemaTypes = [
  page,
  project,
  client,
  about,
  settings,
  richText,
  projectBody,
  mediaRow,
  mediaImage,
  youtube,
  seo,
]
