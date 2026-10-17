import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'

import { schemaTypes } from './schemaTypes'
import { structure, SINGLETONS } from './structure'

export default defineConfig({
  name: 'default',
  title: 'Jonas Vail',
  projectId: '3hjgtb6q',
  dataset: 'production',
  plugins: [structureTool({ structure }), media(), visionTool()],
  schema: {
    types: schemaTypes,
    // Singletons can't be created from the "new document" menu
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETONS.includes(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      SINGLETONS.includes(schemaType)
        ? actions.filter(
            ({ action }) =>
              action && ['publish', 'discardChanges', 'restore'].includes(action)
          )
        : actions,
  },
})
