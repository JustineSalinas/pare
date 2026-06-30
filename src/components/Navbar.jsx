import { useState, useEffect } from 'react'
import { Menu, X, Calendar } from 'lucide-react'

const FRESHA_URL =
  'https://www.fresha.com/a/pare-mens-grooming-lifestyle-iloilo-city-the-alcove-general-luna-street-g943g1tc'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Team', href: '#team' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Visit', href: '#location' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className={[
          'fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-400',
          scrolled
            ? 'bg-[#080808]/92 backdrop-blur-xl shadow-lg shadow-black/50 px-10 py-4'
            : 'px-10 py-6',
        ].join(' ')}
      >
        <a
          href="#"
          className="font-grotesk font-bold text-[1.6rem] tracking-[0.35em] text-[#f5f2ed] no-underline"
        >
          PARE<span className="text-[#C47840]">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-10 list-none">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-grotesk text-[0.75rem] font-medium tracking-[0.2em] uppercase text-[#888880] hover:text-white transition-colors no-underline"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#booking"
          className="hidden md:inline-flex items-center gap-2 font-grotesk text-[0.7rem] font-semibold tracking-[0.25em] uppercase text-[#080808] bg-[#C47840] px-6 py-3 hover:bg-[#D9906A] transition-colors no-underline"
        >
          <Calendar size={13} />
          Book Now
        </a>

        <button
          className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} color="#ece9e3" /> : <Menu size={22} color="#ece9e3" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 bg-[#080808] flex flex-col gap-8 px-6 pt-24 pb-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-grotesk text-2xl font-bold text-[#ece9e3] border-b border-[#2e2e2e] pb-6 hover:text-[#C47840] transition-colors no-underline"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={() => setOpen(false)}
            className="font-grotesk text-2xl font-bold text-[#C47840] no-underline"
          >
            Book Appointment →
          </a>
        </div>
      )}
    </>
  )
}

