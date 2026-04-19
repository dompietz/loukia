import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'
import LazyImage from '../components/LazyImage'
import { urlFor } from '../lib/sanity'
import { getSiteSettings, getAllGalleries } from '../lib/queries'
import type { SiteSettings, Gallery } from '../types'
import '../components/Gallery.css'
import './Pages.css'

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [galleries, setGalleries] = useState<Gallery[]>([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    async function fetchData() {
      try {
        const [s, g] = await Promise.all([
          getSiteSettings(), 
          getAllGalleries(),
          new Promise(resolve => setTimeout(resolve, 800))
        ])
        setSettings(s)
        setGalleries(g)
      } catch (error) {
        console.error('Failed to fetch home data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (!settings?.heroImages || settings.heroImages.length <= 1) return
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % settings.heroImages.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [settings?.heroImages])

  useEffect(() => {
    document.title = settings?.seoHomeTitle || 
      (settings?.photographerName 
        ? `${settings.photographerName} — Fine-Art Wedding Photography`
        : 'Loukia Hadjiyianni — Fine-Art Wedding Photography')
  }, [settings])

  if (loading) {
    return <Loading />
  }
  return (
    <main id="main-content">
      {/* ── Hero ────────────────────────────────── */}
      <section className="hero" aria-label="Hero slider">
        {settings?.heroImages && settings.heroImages.length > 0 ? (
          settings.heroImages.map((img, idx) => (
            <img
              key={img._key || idx}
              src={urlFor(img).width(2000).url()}
              alt={img.alt || "Collection Hero"}
              className={`hero__image ${activeIndex === idx ? 'active' : ''}`}
              fetchPriority={idx === 0 ? "high" : "auto"}
              loading={idx === 0 ? "eager" : "lazy"}
            />
          ))
        ) : (
          <img
            src="/images/hero.png"
            alt="Collection Hero"
            className="hero__image active"
            fetchPriority="high"
          />
        )}
      </section>

      {/* ── Statement ───────────────────────────── */}
      <section className="home-statement" aria-label="Photographer's philosophy">
        <div className="home-statement__inner">
          <blockquote className="home-statement__quote">
            {settings?.tagline || '"I don\'t photograph weddings. I document the light between two people."'}
          </blockquote>
          <span className="home-statement__attr">— {settings?.photographerName || 'Loukia Hadjiyianni'}</span>
        </div>
      </section>

      {/* ── Featured Work ───────────────────────── */}
      <section className="home-featured">
        <div className="container">
          <div className="home-featured__header">
            <div>
              <p className="label">Selected Work</p>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, marginTop: '0.5rem' }}>
                Recent Collections
              </h2>
            </div>
            {galleries.length > 0 && (
              <Link to="/galleries" className="home-featured__link">
                View All Work
              </Link>
            )}
          </div>

          <div className="gallery-grid">
            {galleries.length > 0 ? (
              galleries.slice(0, 3).map(g => (
                <Link
                  key={g._id}
                  id={`featured-${g.slug.current}`}
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
                      <p className="gallery-card__sub">{g.location}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="muted">Your collections will appear here once published in Sanity.</p>
            )}
          </div>
        </div>
      </section>


    </main>
  )
}
