export default {
  name: 'post',
  title: 'Entrada de blog',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: R => R.required(),
    },
    {
      name: 'tag',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Performance',    value: 'Performance'    },
          { title: 'Mobile',         value: 'Mobile'         },
          { title: 'Design & Code',  value: 'Design & Code'  },
          { title: 'TypeScript',     value: 'TypeScript'     },
          { title: 'Backend',        value: 'Backend'        },
          { title: 'DevOps',         value: 'DevOps'         },
        ],
      },
    },
    {
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' },
      validation: R => R.required(),
    },
    {
      name: 'readTime',
      title: 'Tiempo de lectura (ej. 5 min)',
      type: 'string',
    },
    {
      name: 'thumbnail',
      title: 'Miniatura',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'excerpt',
      title: 'Extracto / Resumen',
      type: 'text',
      rows: 3,
      validation: R => R.required(),
    },
    {
      name: 'content',
      title: 'Contenido completo',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Texto alternativo', type: 'string' }],
        },
      ],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'tag', media: 'thumbnail' },
  },
  orderings: [
    { title: 'Más recientes', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
}
