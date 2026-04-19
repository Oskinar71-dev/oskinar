import { defineField, defineType } from 'sanity'

export const blogPost = defineType({
  name: 'post',
  title: 'Artículo de Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL (slug)',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción SEO',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required().max(160),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'image',
      title: 'Imagen de portada',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'body',
      title: 'Contenido',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Texto alternativo', validation: Rule => Rule.required() },
          ],
        },
        { type: 'code', options: { language: 'typescript', withFilename: true } },
      ],
    }),
    defineField({
      name: 'draft',
      title: 'Borrador',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'publishedAt', media: 'image' },
  },
  orderings: [
    { title: 'Fecha (nuevo primero)', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
})
