import { defineField, defineType } from 'sanity'

import { imageWithAlt } from './objects'

export const CATEGORIES = [
  { title: 'Brand strategy', value: 'brand-strategy' },
  { title: 'Campaign strategy', value: 'campaign-strategy' },
]

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'Search and social' },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'content',
      description: 'The last part of the URL. Changing it breaks existing links.',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'client',
      type: 'reference',
      group: 'content',
      to: [{ type: 'client' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      type: 'date',
      group: 'content',
      description: 'Projects are listed newest first.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'categories',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      options: { list: CATEGORIES },
    }),
    {
      ...imageWithAlt('listImage', 'List image'),
      group: 'content',
      description: 'Shown where projects are listed.',
    },
    defineField({ name: 'intro', type: 'richText', group: 'content' }),
    defineField({ name: 'body', type: 'projectBody', group: 'content' }),
    defineField({ name: 'seo', type: 'seo', group: 'seo' }),
  ],
  orderings: [
    {
      title: 'Date, newest first',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'client.name', media: 'listImage' },
  },
})
