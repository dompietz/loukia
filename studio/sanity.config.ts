import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'loukia-portfolio-studio',
  title: 'Loukia Hadjiyianni — Studio',

  // ⚠️  Replace these with your real project values from sanity.io/manage
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'ayyaiy0f',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singleton: Site Settings
            S.listItem()
              .title('Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            // Galleries
            S.documentTypeListItem('gallery').title('Galleries'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
