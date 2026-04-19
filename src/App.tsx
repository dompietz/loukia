import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/Home'
import GalleriesPage from './pages/Galleries'
import GalleryPage from './pages/Gallery'
import AboutPage from './pages/About'
import ContactPage from './pages/Contact'

// Scroll to top on route change
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname, hash])
  return null
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/galleries" element={<GalleriesPage />} />
        <Route path="/galleries/:slug" element={<GalleryPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* 404 fallback */}
        <Route
          path="*"
          element={
            <main
              id="main-content"
              style={{
                minHeight: '100dvh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                paddingTop: 'var(--header-height)',
                fontFamily: 'var(--font-serif)',
              }}
            >
              <p className="label">404</p>
              <h1 style={{ fontWeight: 300, fontSize: '3rem' }}>Page not found</h1>
            </main>
          }
        />
      </Routes>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
