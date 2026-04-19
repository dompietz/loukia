import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import Loading from '../components/Loading'
import LazyImage from '../components/LazyImage'
import { getGalleryBySlug } from '../lib/queries'
import { urlFor } from '../lib/sanity'
import type { Gallery } from '../types'
import '../components/Gallery.css'
import './Pages.css'

export default function GalleryPage() {
  const { slug } = useParams<{ slug: string }>()
  const [gallery, setGallery] = useState<Gallery | null>(null)
  const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState(-1)

  useEffect(() => {
    async function fetchGallery() {
      if (!slug) return
      try {
        const [data] = await Promise.all([
          getGalleryBySlug(slug),
          new Promise(resolve => setTimeout(resolve, 800))
        ])
        setGallery(data)
        if (data) document.title = `${data.title} — Loukia Hadjiyianni`
      } catch (error) {
        console.error('Failed to fetch gallery:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchGallery()
  }, [slug])

  if (loading) {
    return <Loading />
  }

  if (!gallery) {
    return (
      <div className="container" style={{ padding: '10rem 0', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}>Gallery Not Found</h1>
        <Link to="/galleries" className="label" style={{ marginTop: '2rem', display: 'inline-block' }}>
          Back to all collections
        </Link>
      </div>
    )
  }

  const slides = (gallery.images || []).map(img => ({
    src: urlFor(img).width(2000).auto('format').url(),
    alt: img.alt || gallery.title
  }))

  return (
    <main id="main-content" className="gallery-page">
      <div className="container">
        <header className="gallery-page__header">
          <Link to="/galleries" className="gallery-page__back label">
            ← Back to collections
          </Link>
          <div className="gallery-page__title-group">
            <h1 className="gallery-page__title">{gallery.title}</h1>
            <p className="gallery-page__meta">
              {gallery.location}{gallery.season ? ` · ${gallery.season}` : ''}
            </p>
          </div>
          {gallery.description && (
            <p className="gallery-page__description">{gallery.description}</p>
          )}
        </header>

        <div className="simple-photo-grid" style={{ marginBottom: 'var(--space-12)' }}>
          {(gallery.images || []).map((img, i) => (
            <div
              key={img._key}
              className="simple-photo-card"
              style={{ cursor: 'pointer' }}
              onClick={() => setIndex(i)}
            >
              <div className="simple-photo-card__image-wrapper">
                <LazyImage
                  sanityImage={img}
                  alt={img.alt || `${gallery.title} image ${i + 1}`}
                  className="simple-photo-card__image"
                />
              </div>
            </div>
          ))}
        </div>

        <Lightbox
          index={index}
          slides={slides}
          open={index >= 0}
          close={() => setIndex(-1)}
        />

        <footer className="gallery-page__footer">
          <Link to="/galleries" className="label">
            View more collections
          </Link>
        </footer>
      </div>
    </main>
  )
}
