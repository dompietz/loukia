import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'global', title: 'Global' },
    { name: 'home', title: 'Home' },
    { name: 'work', title: 'Work' },
    { name: 'about', title: 'About' },
    { name: 'seo', title: 'SEO / Meta' },
  ],
  fields: [
    /* ─────────────────────────────────────────────
       GLOBAL / BRAND
       ───────────────────────────────────────────── */
    defineField({
      name: 'photographerName',
      title: 'Photographer Name',
      type: 'string',
      group: 'global',
      description: 'Displayed in the header logo and footer.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Copyright Text',
      type: 'string',
      group: 'global',
      description: 'The text shown next to the copyright year, e.g. "Fine-Art Wedding Photography".',
      placeholder: 'Fine-Art Wedding Photography',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      group: 'global',
      validation: Rule => Rule.email(),
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
      group: 'global',
    }),
    defineField({
      name: 'location',
      title: 'Based In (Location)',
      type: 'string',
      group: 'global',
      description: 'e.g. "London & Rome"',
    }),
    defineField({
      name: 'phone',
      title: 'Phone (optional)',
      type: 'string',
      group: 'global',
    }),

    /* ─────────────────────────────────────────────
       HOME PAGE
       ───────────────────────────────────────────── */
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'home',
      description: 'One-line descriptor shown in the homepage statement.',
    }),
    defineField({
      name: 'heroImages',
      title: 'Hero Images',
      type: 'array',
      group: 'home',
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

    /* ─────────────────────────────────────────────
       WORK / GALLERIES PAGE
       ───────────────────────────────────────────── */
    defineField({
      name: 'galleriesLabel',
      title: 'Galleries — Label (Eyebrow)',
      type: 'string',
      group: 'work',
      description: 'The small text above the heading, e.g. "Selected Work".',
    }),
    defineField({
      name: 'galleriesHeading',
      title: 'Galleries — Heading',
      type: 'string',
      group: 'work',
      description: 'The large heading on the Work/Galleries page.',
    }),
    defineField({
      name: 'galleriesSubtitle',
      title: 'Galleries — Subtitle',
      type: 'text',
      group: 'work',
      rows: 3,
      description: 'The description text below the galleries heading.',
    }),
    defineField({
      name: 'galleriesGridTitle',
      title: 'Galleries — Grid Title',
      type: 'string',
      group: 'work',
      description: 'The title of the galleries grid, e.g. "Galleries".',
    }),
    defineField({
      name: 'momentsGridTitle',
      title: 'Galleries — Moments Title',
      type: 'string',
      group: 'work',
      description: 'The title of the individual photos grid, e.g. "Moments".',
    }),
    defineField({
      name: 'featuredPhotos',
      title: 'Featured Photos (Moments)',
      type: 'array',
      group: 'work',
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

    /* ─────────────────────────────────────────────
       ABOUT PAGE
       ───────────────────────────────────────────── */
    defineField({
      name: 'aboutHeading',
      title: 'About — Heading',
      type: 'string',
      group: 'about',
      description: 'Short heading on the About page, e.g. "Loukia Hadjiyianni".',
    }),
    defineField({
      name: 'aboutBio',
      title: 'About — Biography',
      type: 'text',
      group: 'about',
      rows: 8,
      description: 'Plain text only — formatting is controlled by the design system.',
    }),
    defineField({
      name: 'portraitImage',
      title: 'About — Portrait Image',
      type: 'image',
      group: 'about',
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
      name: 'signatureImage',
      title: 'About — Signature Image',
      type: 'image',
      group: 'about',
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
    defineField({
      name: 'availability',
      title: 'About / Contact — Availability Status',
      type: 'text',
      group: 'global',
      rows: 2,
      description: 'Shown on the contact page, e.g. "2025 — limited dates remaining"',
    }),

    /* ─────────────────────────────────────────────
       SEO / META
       ───────────────────────────────────────────── */
    defineField({
      name: 'seoHomeTitle',
      title: 'Home — Browser Title',
      type: 'string',
      group: 'seo',
      placeholder: 'Loukia Hadjiyianni — Fine-Art Wedding Photography',
    }),
    defineField({
      name: 'seoWorkTitle',
      title: 'Work — Browser Title',
      type: 'string',
      group: 'seo',
      placeholder: 'Selected Work — Loukia Hadjiyianni',
    }),
    defineField({
      name: 'seoAboutTitle',
      title: 'About — Browser Title',
      type: 'string',
      group: 'seo',
      placeholder: 'About Loukia Hadjiyianni',
    }),
    defineField({
      name: 'seoContactTitle',
      title: 'Contact — Browser Title',
      type: 'string',
      group: 'seo',
      placeholder: 'Get in Touch — Loukia Hadjiyianni',
    }),
    defineField({
      name: 'seoGlobalDesc',
      title: 'Global Meta Description',
      type: 'text',
      group: 'seo',
      rows: 3,
      description: 'The description shown in search results if a specific page description is missing.',
    }),
    defineField({
      name: 'seoHomeDesc',
      title: 'Home — Meta Description',
      type: 'text',
      group: 'seo',
      rows: 3,
    }),
    defineField({
      name: 'seoWorkDesc',
      title: 'Work — Meta Description',
      type: 'text',
      group: 'seo',
      rows: 3,
    }),
    defineField({
      name: 'seoAboutDesc',
      title: 'About — Meta Description',
      type: 'text',
      group: 'seo',
      rows: 3,
    }),
    defineField({
      name: 'seoContactDesc',
      title: 'Contact — Meta Description',
      type: 'text',
      group: 'seo',
      rows: 3,
    }),
  ],
  preview: {
    select: { title: 'photographerName' },
    prepare: ({ title }) => ({ title: title || 'Loukia Hadjiyianni' }),
  },
})
