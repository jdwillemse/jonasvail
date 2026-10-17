import { defineField, defineType } from 'sanity'

export const client = defineType({
  name: 'client',
  title: 'Client',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      description:
        'The first part of each project’s URL. Changing it breaks existing links.',
      options: { source: 'name' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      type: 'image',
      description: 'An SVG works best.',
    }),
  ],
  orderings: [
    { title: 'Name', name: 'name', by: [{ field: 'name', direction: 'asc' }] },
  ],
  preview: { select: { title: 'name', media: 'logo' } },
})
