import { defineField, defineType } from 'sanity'

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      description: 'Shown after each page title in search results.',
    }),
    defineField({ name: 'subtitle', type: 'string' }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
      description: 'Used when a page has no description of its own.',
    }),
    defineField({
      name: 'ogImage',
      title: 'Share image',
      type: 'image',
      description: 'Used when a page has no image of its own.',
    }),
    defineField({
      name: 'email',
      type: 'email',
      description: 'The contact links on every page.',
    }),
    defineField({
      name: 'address',
      type: 'text',
      rows: 3,
      description: 'Shown in the footer, one line per line.',
    }),
  ],
  preview: { prepare: () => ({ title: 'Settings' }) },
})
