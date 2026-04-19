import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'photographerName',
      title: 'Photographer Name',
      type: 'string',
      description: 'Displayed in the header logo and footer.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'One-line descriptor shown in SEO and the homepage statement.',
    }),
    defineField({
      name: 'heroImages',
      title: 'Hero Images',
      type: 'array',
      description: 'Add multiple high-res landscape or portrait shots here. The homepage will crossfade between them as a slideshow.',
      options: {
        layout: 'grid',
      },
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
          ],
        },
      ],
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'galleriesLabel',
      title: 'Galleries — Label (Eyebrow)',
      type: 'string',
      description: 'The small text above the heading, e.g. "Selected Work".',
    }),
    defineField({
      name: 'galleriesHeading',
      title: 'Galleries — Heading',
      type: 'string',
      description: 'The large heading on the Work/Galleries page.',
    }),
    defineField({
      name: 'galleriesSubtitle',
      title: 'Galleries — Subtitle',
      type: 'text',
      rows: 3,
      description: 'The description text below the galleries heading.',
    }),
    defineField({
      name: 'galleriesGridTitle',
      title: 'Galleries — Grid Title',
      type: 'string',
      description: 'The title of the galleries grid, e.g. "Galleries".',
    }),
    defineField({
      name: 'momentsGridTitle',
      title: 'Galleries — Moments Title',
      type: 'string',
      description: 'The title of the individual photos grid, e.g. "Moments".',
    }),
    defineField({
      name: 'aboutHeading',
      title: 'About — Heading',
      type: 'string',
      description: 'Short heading on the About page, e.g. "Loukia Hadjiyianni".',
    }),
    defineField({
      name: 'aboutBio',
      title: 'About — Biography',
      type: 'text',
      rows: 8,
      description: 'Plain text only — formatting is controlled by the design system.',
    }),
    defineField({
      name: 'portraitImage',
      title: 'About — Portrait Image',
      type: 'image',
      description: 'High-contrast portrait for the 50/50 About layout. Tall/portrait crop works best.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      validation: Rule => Rule.email(),
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'location',
      title: 'Based In (Location)',
      type: 'string',
      description: 'e.g. "London & Rome"',
    }),
    defineField({
      name: 'availability',
      title: 'Availability Status',
      type: 'text',
      rows: 2,
      description: 'Shown on the contact page, e.g. "2025 — limited dates remaining"',
    }),
    defineField({
      name: 'phone',
      title: 'Phone (optional)',
      type: 'string',
    }),
    defineField({
      name: 'featuredPhotos',
      title: 'Featured Photos (Moments)',
      type: 'array',
      description: 'The grid of individual photos shown on the work page.',
      options: {
        layout: 'grid',
      },
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'signatureImage',
      title: 'About — Signature Image',
      type: 'image',
      description: 'Handwritten signature or sign-off for the About page. PNG with transparency strongly recommended.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'photographerName' },
    prepare: ({ title }) => ({ title: title || 'Loukia Hadjiyianni' }),
  },
})
