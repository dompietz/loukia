import { sanityClient } from './sanity'
import type { Gallery, SiteSettings } from '../types'

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return sanityClient.fetch(`
    *[_type == "siteSettings"][0] {
      ...,
      featuredPhotos[] {
        ...
      }
    }
  `)
}

export async function getAllGalleries(): Promise<Gallery[]> {
  return sanityClient.fetch(`
    *[_type == "gallery"] | order(_createdAt desc) {
      _id,
      _type,
      title,
      slug,
      coverImage,
      location,
      season,
      description
    }
  `)
}

export async function getGalleryBySlug(slug: string): Promise<Gallery | null> {
  return sanityClient.fetch(
    `*[_type == "gallery" && slug.current == $slug][0] {
      _id,
      _type,
      title,
      slug,
      coverImage,
      images,
      location,
      season,
      description
    }`,
    { slug }
  )
}
