import { defineField, defineType } from 'sanity'

export const portfolioCase = defineType({
  name: 'portfolio',
  title: 'Caso de Portfolio',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título del proyecto',
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
      title: 'Descripción corta',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required().max(200),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Imagen de portada',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Texto alternativo', validation: Rule => Rule.required() },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tecnologías',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'metric',
      title: 'Métrica principal',
      type: 'object',
      fields: [
        { name: 'value', type: 'string', title: 'Valor (ej: 80%)' },
        { name: 'label', type: 'string', title: 'Descripción (ej: Reducción de tiempo)' },
      ],
    }),
    defineField({
      name: 'challenge',
      title: 'El problema',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'solution',
      title: 'La solución',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'code', options: { language: 'typescript', withFilename: true } },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha',
      type: 'datetime',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'draft',
      title: 'Borrador',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'description', media: 'thumbnail' },
  },
})
