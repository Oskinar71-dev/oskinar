import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'oskinar-studio',
  title: 'Oskinar Studio',

  projectId: 'YOUR_PROJECT_ID', // ← reemplaza con el tuyo de sanity.io/manage
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),   // permite probar queries GROQ directamente en el Studio
  ],

  schema: { types: schemaTypes },
})
