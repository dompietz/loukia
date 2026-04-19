import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getSiteSettings } from '../lib/queries'
import type { SiteSettings } from '../types'
import './Footer.css'

export default function Footer() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  
  useEffect(() => {
    getSiteSettings().then(setSettings).catch(console.error)
  }, [])

  const year = new Date().getFullYear()
  const name = settings?.photographerName || 'Loukia Hadjiyianni'
  const instagram = settings?.instagramUrl || 'https://instagram.com'

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="footer__brand">{name}</span>

        <p className="footer__copy">
          © {year} — {settings?.footerText || 'Fine-Art Wedding Photography'}
        </p>

        <nav className="footer__links" aria-label="Footer navigation">
          <Link to="/galleries" className="footer__link">Work</Link>
          <Link to="/about" className="footer__link">About</Link>
          <Link to="/contact" className="footer__link">Contact</Link>
          <a
            href={instagram}
            target="_blank"
            rel="noreferrer"
            className="footer__link"
          >
            Instagram
          </a>
        </nav>
      </div>
    </footer>
  )
}
