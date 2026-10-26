import { useEffect, useRef } from 'react'
import { poster as posterFor } from '../lib/site'

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Muted background loop that only decodes while it is on screen, so a page of
 * eight videos plays like one. Reduced-motion visitors get the poster frame.
 * `paused` lets a parent hold it still even while it is in view.
 */
export default function LoopVideo({ src, poster = posterFor(src), priority = false, paused = false, className = '', label, ...rest }) {
  const ref = useRef(null)
  const inView = useRef(false)
  const pausedRef = useRef(paused)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // React does not reliably reflect `muted` to the DOM, and iOS refuses to autoplay without it
    el.muted = true
    if (reducedMotion()) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting
        if (entry.isIntersecting && !pausedRef.current) el.play().catch(() => {})
        else el.pause()
      },
      { rootMargin: '200px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [src])

  useEffect(() => {
    pausedRef.current = paused
    const el = ref.current
    if (!el) return
    if (paused) el.pause()
    else if (inView.current && !reducedMotion()) el.play().catch(() => {})
  }, [paused])

  return (
    <video
      ref={ref}
      className={`object-cover ${className}`}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload={priority ? 'auto' : 'metadata'}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...rest}
    />
  )
}
