import { defineArrayMember, defineField, defineType } from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'body', type: 'richText' }),
    defineField({ name: 'experienceTitle', type: 'string' }),
    defineField({
      name: 'experience',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'job',
          fields: [
            defineField({ name: 'dates', type: 'string' }),
            defineField({ name: 'jobTitle', type: 'string' }),
            defineField({ name: 'employer', type: 'string' }),
            defineField({ name: 'description', type: 'text', rows: 4 }),
          ],
          preview: {
            select: { title: 'jobTitle', subtitle: 'employer' },
          },
        }),
      ],
    }),
    defineField({ name: 'accoladesTitle', type: 'string' }),
    defineField({
      name: 'accolades',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'accolade',
          fields: [
            defineField({
              name: 'year',
              type: 'string',
              description: 'For example 2013 or 2014/15.',
            }),
            defineField({ name: 'title', type: 'string' }),
            defineField({
              name: 'project',
              type: 'reference',
              to: [{ type: 'project' }],
            }),
          ],
          preview: { select: { title: 'title', subtitle: 'year' } },
        }),
      ],
    }),
  ],
})
