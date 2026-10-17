import { defineArrayMember, defineField, defineType } from 'sanity'

// Most migrated images have no alt text, so a missing one warns instead of
// blocking publish.
export const altField = defineField({
  name: 'alt',
  title: 'Alt text',
  type: 'string',
  description: 'Describe the image for people who can’t see it.',
  validation: (rule) => rule.warning().required(),
})

export const imageWithAlt = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'image',
    options: { hotspot: true },
    fields: [altField],
  })

// Paragraphs with bold and links: intros, page sections, the About page.
export const richText = defineType({
  name: 'richText',
  title: 'Rich text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [{ title: 'Normal', value: 'normal' }],
      lists: [],
      marks: { decorators: [{ title: 'Bold', value: 'strong' }] },
    }),
  ],
})

// Where an item sits in its row. Content columns run 1 to 24; negative
// numbers count from the right edge, so -1 is the last column.
const placementFields = [
  defineField({
    name: 'align',
    title: 'Vertical alignment',
    type: 'string',
    options: {
      list: ['top', 'center', 'bottom'],
      layout: 'radio',
      direction: 'horizontal',
    },
  }),
  defineField({
    name: 'from',
    title: 'From column',
    type: 'number',
    fieldset: 'advanced',
    description:
      'Overrides the row layout. 1 to 24, or -1 for the last column.',
    validation: (rule) => rule.integer().min(-24).max(24),
  }),
  defineField({
    name: 'to',
    title: 'To column',
    type: 'number',
    fieldset: 'advanced',
    validation: (rule) => rule.integer().min(-24).max(24),
  }),
]

const advanced = {
  name: 'advanced',
  title: 'Advanced',
  options: { collapsible: true, collapsed: true },
}

export const mediaImage = defineType({
  name: 'mediaImage',
  title: 'Image',
  type: 'image',
  options: { hotspot: true },
  fieldsets: [advanced],
  fields: [altField, ...placementFields],
})

const YOUTUBE = /^https:\/\/(www\.)?(youtube\.com\/watch\?|youtu\.be\/)/

export const youtube = defineType({
  name: 'youtube',
  title: 'YouTube video',
  type: 'object',
  fieldsets: [advanced],
  fields: [
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (rule) =>
        rule
          .required()
          .custom((url) =>
            !url || YOUTUBE.test(url) ? true : 'Use a YouTube link'
          ),
    }),
    ...placementFields,
  ],
  preview: { select: { title: 'url' } },
})

// Row layouts: how many items a row holds and where each one sits.
export const ROW_LAYOUTS = [
  { title: 'Full width', value: 'full' },
  { title: 'Centred', value: 'center' },
  { title: 'Left', value: 'left' },
  { title: 'Right', value: 'right' },
  { title: 'Pair', value: 'pair' },
  { title: 'Big left, small right', value: 'big-left' },
  { title: 'Small left, big right', value: 'big-right' },
  { title: 'Trio', value: 'trio' },
]

export const mediaRow = defineType({
  name: 'mediaRow',
  title: 'Media row',
  type: 'object',
  fields: [
    defineField({
      name: 'layout',
      type: 'string',
      description: 'Leave empty to pick one from the number of items.',
      options: { list: ROW_LAYOUTS },
    }),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        defineArrayMember({ type: 'mediaImage' }),
        defineArrayMember({ type: 'youtube' }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { layout: 'layout', items: 'items', media: 'items.0.asset' },
    prepare: ({ layout, items, media }) => ({
      title: `Media row: ${layout ?? 'automatic'}`,
      subtitle: `${items?.length ?? 0} item(s)`,
      media,
    }),
  },
})

// Project body: paragraphs, headings, bold, links, and media rows between
// them.
export const projectBody = defineType({
  name: 'projectBody',
  title: 'Body',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading', value: 'h2' },
      ],
      lists: [],
      marks: { decorators: [{ title: 'Bold', value: 'strong' }] },
    }),
    defineArrayMember({ type: 'mediaRow' }),
  ],
})

export const seo = defineType({
  name: 'seo',
  title: 'Search and social',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  description:
    'Leave empty to use the title, and the description and image from Settings.',
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'description', type: 'text', rows: 3 }),
    defineField({ name: 'image', type: 'image' }),
  ],
})
