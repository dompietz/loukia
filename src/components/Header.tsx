import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { getSiteSettings } from '../lib/queries'
import type { SiteSettings } from '../types'
import './Header.css'

const NAV_LINKS = [
  { label: 'Work', to: '/galleries' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [settings, setSettings] = useState<SiteSettings | null>(null)

  useEffect(() => {
    getSiteSettings().then(setSettings).catch(console.error)
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
        <div className="header__inner">
          <Link to="/" className="header__logo" onClick={closeMenu}>
            {settings?.photographerName 
              ? settings.photographerName.split(' ').join(' | ') 
              : 'Loukia | Hadjiyianni'}
          </Link>

          <nav className="header__nav" aria-label="Primary navigation">
            {NAV_LINKS.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `header__nav-link${isActive ? ' active' : ''}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <button
            id="hamburger-btn"
            className={`header__hamburger${menuOpen ? ' open' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(v => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <nav
        className={`header__mobile-nav${menuOpen ? ' open' : ''}`}
        aria-label="Mobile navigation"
      >
        {NAV_LINKS.map(({ label, to }) => (
          <NavLink
            key={to}
            to={to}
            className="header__mobile-nav-link"
            onClick={closeMenu}
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </>
  )
}
