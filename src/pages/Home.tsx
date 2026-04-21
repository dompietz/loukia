import { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { urlFor } from '../lib/sanity'
import { getSiteSettings } from '../lib/queries'
import type { SiteSettings } from '../types'
import './Pages.css'

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    async function fetchData() {
      try {
        const [s] = await Promise.all([
          getSiteSettings(), 
          new Promise(resolve => setTimeout(resolve, 800))
        ])
        setSettings(s)
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
              src={urlFor(img).width(2000).auto('format').url()}
              srcSet={`
                ${urlFor(img).width(800).auto('format').url()} 800w,
                ${urlFor(img).width(1200).auto('format').url()} 1200w,
                ${urlFor(img).width(2000).auto('format').url()} 2000w
              `}
              sizes="100vw"
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
    </main>
  )
}
