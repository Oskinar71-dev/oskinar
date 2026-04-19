export default {
  name: 'project',
  title: 'Proyecto',
  type: 'document',
  orderings: [{ title: 'Orden manual', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  fields: [
    {
      name: 'name',
      title: 'Nombre del proyecto',
      type: 'string',
      validation: R => R.required(),
    },
    {
      name: 'slug',
      title: 'Slug / ID único',
      type: 'slug',
      options: { source: 'name', maxLength: 64 },
      validation: R => R.required(),
    },
    {
      name: 'order',
      title: 'Orden (1 = primero)',
      type: 'number',
      initialValue: 99,
    },
    {
      name: 'num',
      title: 'Número visible (ej. 01)',
      type: 'string',
    },
    {
      name: 'year',
      title: 'Año',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Descripción corta',
      type: 'string',
      validation: R => R.required(),
    },
    {
      name: 'role',
      title: 'Rol',
      type: 'string',
    },
    {
      name: 'tags',
      title: 'Tags / Stack',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    {
      name: 'bgColor',
      title: 'Color de fondo (hex)',
      type: 'string',
      initialValue: '#111826',
    },
    {
      name: 'accentColor',
      title: 'Color de acento (hex)',
      type: 'string',
      initialValue: '#4a90e2',
    },
    {
      name: 'challenge',
      title: 'El reto',
      type: 'text',
      rows: 4,
    },
    {
      name: 'solution',
      title: 'La solución',
      type: 'text',
      rows: 4,
    },
    {
      name: 'liveUrl',
      title: 'URL del proyecto en vivo',
      type: 'url',
    },
    {
      name: 'screenshots',
      title: 'Capturas de pantalla (máx. 4)',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [{ name: 'alt', title: 'Texto alternativo', type: 'string' }],
      }],
      validation: R => R.max(4),
      options: { layout: 'grid' },
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'description', media: 'screenshots.0' },
  },
}
