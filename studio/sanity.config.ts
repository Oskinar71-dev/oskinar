import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { codeInput } from '@sanity/code-input'
import { schemaTypes } from './schemas'

const projectId = 'lhbckojg'
const dataset   = 'production'

export default defineConfig({
  name:    'oskinar-studio',
  title:   'Oskinar CMS',
  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenido')
          .items([
            S.listItem()
              .title('Blog')
              .child(S.documentTypeList('post').title('Artículos')),
            S.listItem()
              .title('Portfolio')
              .child(S.documentTypeList('portfolio').title('Casos de éxito')),
          ]),
    }),
    codeInput(),
  ],

  schema: { types: schemaTypes },
})
