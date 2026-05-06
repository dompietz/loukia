import { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { getSiteSettings } from '../lib/queries'
import { urlFor } from '../lib/sanity'
import type { SiteSettings } from '../types'
import './Pages.css'

export default function PricingPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const [s] = await Promise.all([
          getSiteSettings(),
          new Promise(resolve => setTimeout(resolve, 800))
        ])
        setSettings(s)
      } catch (error) {
        console.error('Failed to fetch pricing data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    document.title = settings?.seoPricingTitle || 
      (settings?.photographerName 
        ? `Pricing — ${settings.photographerName}`
        : 'Pricing — Loukia Hadjiyianni')
  }, [settings])

  if (loading) {
    return <Loading />
  }

  if (!settings) return null

  // Priority: Pricing image -> About Portrait image -> Fallback
  const pricingImageUrl = settings.pricingImage 
    ? urlFor(settings.pricingImage).width(1200).url() 
    : settings.portraitImage 
      ? urlFor(settings.portraitImage).width(1200).url() 
      : '/images/portrait.png'

  return (
    <main id="main-content" className="about-page">
      <section className="about-split">
        <div className="about-split__content">
          <div>
            <h1 className="about-split__heading">
              {settings.pricingHeading || 'Investment & Collections'}
            </h1>
          </div>

          <div className="about-split__bio">
            <div className="about-split__bio-text">
              {settings.pricingText ? (
                <p style={{ whiteSpace: 'pre-line' }}>{settings.pricingText}</p>
              ) : (
                <p>
                  Every wedding is a unique tapestry of moments, and my approach is to capture them with the same elegance and timelessness they deserve.
                </p>
              )}

              {settings.pricingCollections?.length ? (
                settings.pricingCollections.map((collection, idx) => (
                  <div key={idx} style={{ marginTop: idx === 0 ? '2rem' : '1.5rem' }}>
                    <strong>{collection.title}</strong><br/>
                    {collection.description && <span style={{ display: 'block', fontSize: '0.9em', opacity: 0.8 }}>{collection.description}</span>}
                    {collection.price && <span style={{ display: 'block', marginTop: '0.25rem' }}>{collection.price}</span>}
                  </div>
                ))
              ) : (
                <>
                  <p style={{ marginTop: '2rem' }}>
                    <strong>Essential Collection</strong><br/>
                    8 hours of coverage, digital gallery, and fine-art prints.<br/>
                    Starting at €3,500
                  </p>
                  <p style={{ marginTop: '1.5rem' }}>
                    <strong>Heritage Collection</strong><br/>
                    Full day coverage, engagement session, and a handcrafted heirloom album.<br/>
                    Starting at €5,200
                  </p>
                </>
              )}
              
              <p style={{ marginTop: '2rem' }}>
                <em>All collections include a pre-wedding consultation and high-resolution digital files.</em>
              </p>
            </div>
          </div>
        </div>

        <div className="about-split__image-col">
          <img
            src={pricingImageUrl}
            srcSet={settings.pricingImage ? `
              ${urlFor(settings.pricingImage).width(600).auto('format').url()} 600w,
              ${urlFor(settings.pricingImage).width(1200).auto('format').url()} 1200w
            ` : settings.portraitImage ? `
              ${urlFor(settings.portraitImage).width(600).auto('format').url()} 600w,
              ${urlFor(settings.portraitImage).width(1200).auto('format').url()} 1200w
            ` : undefined}
            sizes="(max-width: 900px) 100vw, 50vw"
            alt={settings.pricingImage?.alt || settings.portraitImage?.alt || "Pricing"}
            className={`about-split__portrait${imageLoaded ? ' loaded' : ''}`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
        </div>
      </section>
    </main>
  )
}
