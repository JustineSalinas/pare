import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { setScrollLocked } from '../lib/smoothScroll'
import { BOOKING_URL, SHOPIFY_URL } from '../lib/site'

// Same page order as Sota's nav; Shop leaves for the Shopify storefront
const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Team', to: '/team' },
  { label: 'About', to: '/about' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Shop', href: SHOPIFY_URL },
  { label: 'Location', to: '/location' },
]

const linkClass = ({ isActive }) =>
  [
    'relative text-[0.68rem] font-medium tracking-[0.26em] uppercase no-underline transition-colors py-1',
    'after:absolute after:left-0 after:right-[0.26em] after:-bottom-1 after:h-px after:bg-chrome-light after:origin-left after:transition-transform after:duration-300',
    isActive ? 'text-bone after:scale-x-100' : 'text-muted hover:text-bone after:scale-x-0 hover:after:scale-x-100',
  ].join(' ')

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const lastY = useRef(0)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      // Tuck away while reading down the page, return the moment the visitor scrolls up.
      // Repeat events at the same position (Lenis settling) must not flip the state back.
      const delta = y - lastY.current
      if (Math.abs(delta) > 4) {
        setHidden(y > 600 && delta > 0)
        lastY.current = y
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setScrollLocked(open)
    return () => setScrollLocked(false)
  }, [open])

  // Close the drawer and reveal the bar whenever the page changes
  useEffect(() => {
    setOpen(false)
    setHidden(false)
  }, [pathname])

  return (
    <>
      <nav
        className={[
          'fixed top-0 inset-x-0 z-50 transition-all duration-500',
          scrolled ? 'bg-ink/80 backdrop-blur-xl border-b border-line' : 'border-b border-transparent',
          hidden && !open ? '-translate-y-full' : 'translate-y-0',
        ].join(' ')}
      >
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-5 md:px-10 h-[72px]">
          <Link to="/" className="display text-[1.35rem] tracking-[0.18em] no-underline chrome-text" aria-label="PARE home">
            PARE
          </Link>

          <ul className="hidden lg:flex items-center gap-8 list-none m-0 p-0">
            {navLinks.map((l) => (
              <li key={l.label}>
                {l.href ? (
                  <a href={l.href} target="_blank" rel="noreferrer" className={linkClass({ isActive: false })}>
                    {l.label}
                  </a>
                ) : (
                  <NavLink to={l.to} end={l.to === '/'} className={linkClass}>
                    {l.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="btn btn-chrome !py-3 !px-5 hidden sm:inline-flex">
              Book Now
            </a>
            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center bg-transparent border border-line text-bone cursor-pointer"
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={[
          'fixed inset-0 z-40 bg-ink flex flex-col px-6 pt-24 pb-28 transition-opacity duration-300 lg:hidden overflow-y-auto',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none',
        ].join(' ')}
        aria-hidden={!open}
      >
        {navLinks.map((l, i) => {
          const inner = (
            <>
              <span className="font-sans text-[0.7rem] font-medium tracking-[0.2em] text-chrome-dark">0{i + 1}</span>
              {l.label}
              {l.href && <ArrowUpRight size={20} className="text-chrome-dark" />}
            </>
          )
          const cls = 'display text-[1.9rem] text-bone border-b border-line py-3.5 no-underline flex items-baseline gap-4'
          return l.href ? (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1} className={cls}>
              {inner}
            </a>
          ) : (
            <Link key={l.label} to={l.to} tabIndex={open ? 0 : -1} className={cls}>
              {inner}
            </Link>
          )
        })}
        <a href={BOOKING_URL} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1} className="btn btn-chrome mt-8">
          Book Now
        </a>
      </div>
    </>
  )
}
