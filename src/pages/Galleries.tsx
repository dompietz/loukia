import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'
import LazyImage from '../components/LazyImage'
import { getAllGalleries, getSiteSettings } from '../lib/queries'
import type { Gallery, SiteSettings } from '../types'
import './Pages.css'
import '../components/Gallery.css'

export default function GalleriesPage() {
  const [galleries, setGalleries] = useState<Gallery[]>([])
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    async function fetchData() {
      try {
        const [galleriesData, settingsData] = await Promise.all([
          getAllGalleries(),
          getSiteSettings(),
          new Promise(resolve => setTimeout(resolve, 800))
        ])
        setGalleries(galleriesData)
        setSettings(settingsData)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    document.title = settings?.seoWorkTitle || 'Work — Loukia Hadjiyianni'
  }, [settings])

  if (loading) {
    return <Loading />
  }

  const featuredPhotos = settings?.featuredPhotos || []

  return (
    <main id="main-content" className="galleries-index">
      <div className="container">
        <header className="galleries-index__header">
          <p className="label">{settings?.galleriesLabel || "Selected Work"}</p>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 1.05 }}>
            {settings?.galleriesHeading ? (
              settings.galleriesHeading.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < settings.galleriesHeading.split('\n').length - 1 && <br />}
                </span>
              ))
            ) : (
              <>Every love story, <br />carefully documented.</>
            )}
          </h1>
          <p className="galleries-index__subtitle">
            {settings?.galleriesSubtitle || 
              "A curated selection of weddings photographed across Europe. Each collection is a quiet document of emotion and light."}
          </p>
        </header>

        {/* Existing Galleries Grid */}
        <section className="galleries-section">
          <h2 className="section-title">{settings?.galleriesGridTitle || "Galleries"}</h2>
          <div className="gallery-grid">
            {galleries.length > 0 ? (
              galleries.map((g) => (
                <Link
                  key={g._id}
                  id={`gallery-${g.slug.current}`}
                  to={`/galleries/${g.slug.current}`}
                  className="gallery-card"
                  aria-label={`View gallery: ${g.title}`}
                >
                  <LazyImage
                    sanityImage={g.coverImage}
                    alt={`${g.title} wedding`}
                    className="gallery-card__image"
                  />
                  <div className="gallery-card__overlay">
                    <div className="gallery-card__meta">
                      <p className="gallery-card__title">{g.title}</p>
                      <p className="gallery-card__sub">
                        {g.location}{g.season ? ` · ${g.season}` : ''}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="empty-state">
                <p className="muted">Upload your first gallery in Sanity to see it here.</p>
              </div>
            )}
          </div>
        </section>

        {/* New Simple Photo Grid — Now Dynamic from Sanity */}
        {featuredPhotos.length > 0 && (
          <section className="simple-photos-section">
            <h2 className="section-title">{settings?.momentsGridTitle || "Moments"}</h2>
            <div className="simple-photo-grid">
              {featuredPhotos.map((photo, index) => {
                // Safeguard against malformed or pending uploads from Sanity
                if (!photo || !photo.asset) return null

                return (
                  <div key={photo._key || index} className="simple-photo-card">
                    <div className="simple-photo-card__image-wrapper">
                      <LazyImage
                        sanityImage={photo}
                        alt={photo.alt || 'Featured moment'}
                        className="simple-photo-card__image"
                      />
                    </div>
                    {photo.caption && (
                      <div className="simple-photo-card__info">
                        <p className="simple-photo-card__caption">{photo.caption}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
