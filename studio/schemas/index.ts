import type { SchemaTypeDefinition } from 'sanity'
import gallery from './gallery'
import siteSettings from './siteSettings'

export const schemaTypes: SchemaTypeDefinition[] = [siteSettings, gallery]
