import { useEffect, useState } from 'react'
import { setScrollLocked } from '../lib/smoothScroll'

// Shine runs 0.5s → 3.1s; hold a beat after it before lifting
const SHINE_MS = 3300
const LIFT_MS = 1100

/**
 * Intro: the chrome PARE wordmark catches a sweep of light, then the panel
 * lifts away to reveal the landing page. Waits for the display font so the
 * shine never plays over a fallback typeface.
 */
export default function Loader() {
  const [phase, setPhase] = useState('shine') // shine → lift → done

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const root = document.documentElement
    root.classList.add('is-loading')
    setScrollLocked(true)

    let liftTimer
    const minimum = new Promise((r) => setTimeout(r, reduced ? 300 : SHINE_MS))
    // Cap the font wait so a slow network never strands the visitor on the loader
    const fonts = Promise.race([document.fonts?.ready ?? Promise.resolve(), new Promise((r) => setTimeout(r, 2500))])

    Promise.all([minimum, fonts]).then(() => {
      setPhase('lift')
      root.classList.remove('is-loading')
      setScrollLocked(false)
      liftTimer = setTimeout(() => setPhase('done'), reduced ? 300 : LIFT_MS)
    })

    return () => {
      clearTimeout(liftTimer)
      root.classList.remove('is-loading')
      setScrollLocked(false)
    }
  }, [])

  if (phase === 'done') return null

  return (
    <div className={`loader ${phase === 'lift' ? 'loader--lift' : ''}`} role="status" aria-label="Loading PARE">
      <div className="loader__inner">
        <div className="loader__mark display" aria-hidden="true">
          <span className="chrome-text">PARE</span>
          <span className="loader__shine">PARE</span>
        </div>
        <div className="loader__rule" aria-hidden="true" />
        <p className="loader__tag">Men's Grooming &amp; Lifestyle · Iloilo City</p>
      </div>
    </div>
  )
}
