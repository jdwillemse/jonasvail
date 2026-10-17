import { defineArrayMember, defineField, defineType } from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Page',
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
      description: 'Also the link text when other pages link here.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'content',
      description: '“home” is the homepage.',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'hero',
      type: 'text',
      group: 'content',
      rows: 2,
    }),
    defineField({
      name: 'sections',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          name: 'textSection',
          title: 'Text',
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string' }),
            defineField({ name: 'copy', type: 'richText' }),
            defineField({
              name: 'video',
              type: 'file',
              description:
                'Optional. Plays muted on a loop in a cropped circle beside the copy. For a transparent background, use WebM with transparency.',
              options: { accept: 'video/*' },
            }),
            defineField({
              name: 'videoHevc',
              title: 'Video for Safari',
              type: 'file',
              description:
                'Only for a transparent video: the same clip as HEVC with transparency (.mov), since Safari can’t show WebM transparency.',
              options: { accept: 'video/quicktime' },
              hidden: ({ parent }) => !parent?.video,
            }),
          ],
        }),
        defineArrayMember({
          name: 'projectList',
          title: 'Project list',
          type: 'object',
          fields: [
            defineField({
              name: 'projects',
              type: 'array',
              description: 'Drag to set the order.',
              of: [{ type: 'reference', to: [{ type: 'project' }] }],
              validation: (rule) => rule.unique(),
            }),
          ],
          preview: {
            select: { projects: 'projects' },
            prepare: ({ projects }) => ({
              title: 'Project list',
              subtitle: `${projects?.length ?? 0} project(s)`,
            }),
          },
        }),
        defineArrayMember({
          name: 'pageLinks',
          title: 'Page links',
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string' }),
            defineField({
              name: 'stacked',
              title: 'Label above the links',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'pages',
              type: 'array',
              of: [{ type: 'reference', to: [{ type: 'page' }] }],
              validation: (rule) => rule.unique(),
            }),
          ],
          preview: {
            select: { title: 'label' },
            prepare: ({ title }) => ({
              title: title ?? 'Page links',
              subtitle: 'Page links',
            }),
          },
        }),
      ],
    }),
    defineField({ name: 'seo', type: 'seo', group: 'seo' }),
  ],
  preview: { select: { title: 'title', subtitle: 'slug.current' } },
})
