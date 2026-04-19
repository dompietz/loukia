export interface SanityImage {
  _type: 'image'
  _key?: string
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

export interface GalleryImage extends SanityImage {
  _key: string
  caption?: string
}

export interface Gallery {
  _id: string
  _type: 'gallery'
  title: string
  slug: { current: string }
  coverImage: SanityImage
  images: GalleryImage[]
  location?: string
  season?: string
  description?: string
}

export interface SiteSettings {
  _id: string
  _type: 'siteSettings'
  photographerName: string
  tagline: string
  footerText?: string
  heroImages: SanityImage[]
  galleriesLabel?: string
  galleriesHeading?: string
  galleriesSubtitle?: string
  galleriesGridTitle?: string
  momentsGridTitle?: string
  aboutHeading: string
  aboutBio: string
  portraitImage: SanityImage
  instagramUrl?: string
  email?: string
  phone?: string
  location?: string
  availability?: string
  featuredPhotos?: GalleryImage[]
  signatureImage?: SanityImage
  /* SEO Fields */
  seoHomeTitle?: string
  seoWorkTitle?: string
  seoAboutTitle?: string
  seoContactTitle?: string
  seoGlobalDesc?: string
  seoHomeDesc?: string
  seoWorkDesc?: string
  seoAboutDesc?: string
  seoContactDesc?: string
}
