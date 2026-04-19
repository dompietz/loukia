import { useEffect, useState } from 'react'
import { getSiteSettings } from '../lib/queries'
import { urlFor } from '../lib/sanity'
import type { SiteSettings } from '../types'
import './Pages.css'

export default function AboutPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const s = await getSiteSettings()
        setSettings(s)
      } catch (error) {
        console.error('Failed to fetch about data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    document.title = settings?.photographerName 
      ? `About — ${settings.photographerName}`
      : 'About — Loukia Hadjiyianni'
  }, [settings])

  if (loading) {
    return <div className="loading-state container">Loading...</div>
  }

  const portraitUrl = settings?.portraitImage 
    ? urlFor(settings.portraitImage).width(1200).url() 
    : '/images/portrait.png'

  return (
    <main id="main-content" className="about-page">
      <section className="about-split">
        <div className="about-split__image-col">
          <img
            src={portraitUrl}
            alt={settings?.portraitImage?.alt || settings?.photographerName || "Portrait"}
            className={`about-split__portrait${imageLoaded ? ' loaded' : ''}`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
        </div>

        <div className="about-split__content">
          <div>
            <span className="label about-split__eyebrow">About the photographer</span>
            <h1 className="about-split__heading">
              {settings?.photographerName || 'Loukia Hadjiyianni'}
            </h1>
          </div>

          <div className="about-split__bio">
            <h2 className="about-split__subheading" style={{ fontFamily: 'var(--font-serif)', marginBottom: '1.5rem', fontWeight: 300 }}>
              {settings?.aboutHeading || 'Documenting light and emotion.'}
            </h2>
            <div style={{ whiteSpace: 'pre-line' }}>
              {settings?.aboutBio || (
                <>
                  <p>I am a fine-art wedding photographer based between London and Rome...</p>
                  <p>My work is shaped by a decade of shooting on film across Europe...</p>
                </>
              )}
            </div>
            
            {settings?.instagramUrl && (
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="contact-info__value"
                id="contact-instagram-link"
                style={{ marginTop: '1rem', display: 'inline-block' }}
              >
                @{settings.photographerName?.toLowerCase().replace(/\s+/g, '') || 'loukia'}
              </a>
            )}
          </div>

          {settings?.signatureImage && (
            <div className="about-signature">
              <img 
                src={urlFor(settings.signatureImage).width(400).url()} 
                alt={settings.signatureImage.alt || "Signature"} 
                className="about-signature__img"
              />
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
