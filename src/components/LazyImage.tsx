import { useState, useRef, useEffect } from 'react'
import { urlFor } from '../lib/sanity'
import type { SanityImage } from '../types'

interface LazyImageProps {
  sanityImage?: SanityImage
  src?: string
  alt: string
  className?: string
  fetchPriority?: 'high' | 'low' | 'auto'
}

export default function LazyImage({ 
  sanityImage, 
  src, 
  alt, 
  className = '', 
  fetchPriority = 'auto',
  ...props 
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true)
  }, [])

  let placeholderUrl = ''
  let finalSrc = src || ''
  let finalSrcSet = ''

  try {
    if (sanityImage && (sanityImage as any).asset) {
      placeholderUrl = urlFor(sanityImage).width(20).blur(10).auto('format').url()
      finalSrc = urlFor(sanityImage).width(1200).auto('format').url()
      finalSrcSet = `
        ${urlFor(sanityImage).width(400).auto('format').url()} 400w,
        ${urlFor(sanityImage).width(800).auto('format').url()} 800w,
        ${urlFor(sanityImage).width(1200).auto('format').url()} 1200w
      `
    }
  } catch (error) {
    console.warn('Invalid Sanity Image object passed to LazyImage:', sanityImage)
  }

  // If no source is provided at all, don't attempt to render
  if (!finalSrc) return null

  return (
    <div className={`lazy-image-container ${className}${loaded ? ' loaded' : ''}`.trim()}>
      {placeholderUrl && !loaded && (
        <img
          src={placeholderUrl}
          className="lazy-image__placeholder"
          aria-hidden="true"
          alt=""
        />
      )}
      <img
        ref={imgRef}
        src={finalSrc}
        srcSet={finalSrcSet}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt={alt}
        className={`lazy-image__main${loaded ? ' loaded' : ''}`}
        onLoad={() => setLoaded(true)}
        loading="lazy"
        decoding="async"
        fetchPriority={fetchPriority}
        {...props}
      />
    </div>
  )
}
