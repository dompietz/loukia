import Loading from '../components/Loading'
import { useEffect, useState, type FormEvent } from 'react'
import { getSiteSettings } from '../lib/queries'
import type { SiteSettings } from '../types'
import './Pages.css'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSettings() {
      try {
        const [data] = await Promise.all([
          getSiteSettings(),
          new Promise(resolve => setTimeout(resolve, 800))
        ])
        setSettings(data)
      } catch (error) {
        console.error('Failed to fetch contact settings:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchSettings()
  }, [])

  useEffect(() => {
    document.title = settings?.seoContactTitle || 'Contact — Loukia Hadjiyianni'
  }, [settings])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: wire up Resend / Formspree when ready
    setSubmitted(true)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <main id="main-content" className="contact-page">
      <div className="container">
        {/* Header */}
        <header className="contact-page__header">
          <p className="label">Get in Touch</p>
          <h1 className="contact-page__title">
            Begin your <br />inquiry.
          </h1>
          <p className="contact-page__subtitle">
            I take on a very limited number of weddings each year. If your date is open,
            I would love to hear from you.
          </p>
        </header>

        {/* Layout */}
        <div className="contact-layout">
          {/* Form */}
          <form
            className="contact-form"
            onSubmit={handleSubmit}
            noValidate
            aria-label="Contact form"
          >
            <div className="form-field">
              <label htmlFor="contact-name">Your Name</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="Emma & James Richardson"
                required
                autoComplete="name"
              />
            </div>

            <div className="form-field">
              <label htmlFor="contact-email">Email Address</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="hello@example.com"
                required
                autoComplete="email"
              />
            </div>

            <div className="form-field">
              <label htmlFor="contact-date">Wedding Date</label>
              <input
                id="contact-date"
                name="date"
                type="text"
                placeholder="September 2025"
              />
            </div>

            <div className="form-field">
              <label htmlFor="contact-location">Location / Venue</label>
              <input
                id="contact-location"
                name="location"
                type="text"
                placeholder="Villa Cimbrone, Amalfi Coast"
              />
            </div>

            <div className="form-field">
              <label htmlFor="contact-message">Tell me about your day</label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="We are planning an intimate ceremony for forty guests…"
              />
            </div>

            <div className="form-submit">
              <button
                id="contact-submit-btn"
                type="submit"
                className="btn-primary"
              >
                Send Inquiry
              </button>
              {submitted && (
                <p className="contact-success" role="status" aria-live="polite">
                  Thank you — I will be in touch within 48 hours.
                </p>
              )}
            </div>
          </form>

          {/* Info sidebar */}
          <aside className="contact-info" aria-label="Contact information">
            <div className="contact-info__block">
              <span className="label contact-info__label">Email</span>
              <a
                href={`mailto:${settings?.email || 'hello@elaravoss.com'}`}
                className="contact-info__value"
              >
                {settings?.email || 'hello@elaravoss.com'}
              </a>
            </div>

            <div className="contact-info__block">
              <span className="label contact-info__label">Based in</span>
              <p className="contact-info__value">{settings?.location || 'London & Rome'}</p>
            </div>

            <div className="contact-info__block">
              <span className="label contact-info__label">Availability</span>
              <p className="contact-info__value" style={{ whiteSpace: 'pre-line' }}>
                {settings?.availability || '2025 — limited dates remaining\n2026 — now booking'}
              </p>
            </div>

            <div className="contact-info__block">
              <span className="label contact-info__label">Instagram</span>
              <a
                href={settings?.instagramUrl || 'https://instagram.com'}
                target="_blank"
                rel="noreferrer"
                className="contact-info__value"
                id="contact-instagram-link"
              >
                @{settings?.photographerName?.toLowerCase().replace(/\s+/g, '') || 'loukia.h'}
              </a>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
