import { Link } from 'react-router-dom'
import { Instagram, Facebook, ShoppingBag } from 'lucide-react'
import { BOOKING_URL, SHOPIFY_URL, INSTAGRAM_URL, FACEBOOK_URL, EMAIL } from '../lib/site'

const explore = [
  { label: 'About', to: '/about' },
  { label: 'Meet the Team', to: '/team' },
  { label: 'Our Story', to: '/about' },
  { label: 'Reviews', to: '/#reviews' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Location', to: '/location' },
]

const services = ['Haircut', 'Beard', 'Shaving', 'Facials', 'Weddings']

const hours = [
  ['MON', '9 AM to 7 PM'],
  ['TUE', '9 AM to 7 PM'],
  ['WED', '9 AM to 7 PM'],
  ['THU', '9 AM to 7 PM'],
  ['FRI', '9 AM to 7 PM'],
  ['SAT', '9 AM to 7 PM'],
  ['SUN', '9 AM to 6 PM'],
]

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-line pt-20 pb-8 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1.2fr] gap-x-8 gap-y-12 mb-20">
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="display text-[1.8rem] tracking-[0.16em] chrome-text no-underline">PARE</Link>
            <p className="text-[0.72rem] tracking-[0.2em] uppercase text-muted mt-2 mb-8">Studio · Iloilo City</p>
            <p className="text-[0.75rem] text-chrome-dark mb-1">Location</p>
            <p className="text-[1rem] font-medium text-bone mb-6 leading-snug">The Alcove, General Luna St.<br />Iloilo City Proper, 5000</p>
            <p className="text-[0.75rem] text-chrome-dark mb-1">Instagram</p>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="text-[1.1rem] font-semibold text-bone no-underline hover:text-chrome-light">
              @pare_iloilo.ph
            </a>
            <div className="flex gap-2.5 mt-7">
              <SocialBtn href={INSTAGRAM_URL} label="Instagram" icon={<Instagram size={15} />} />
              <SocialBtn href={FACEBOOK_URL} label="Facebook" icon={<Facebook size={15} />} />
              <SocialBtn href={SHOPIFY_URL} label="Shop on Shopify" icon={<ShoppingBag size={15} />} />
            </div>
          </div>

          <FooterCol title="Explore">
            {explore.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="footer-link">{l.label}</Link>
              </li>
            ))}
          </FooterCol>

          <FooterCol title="Services">
            {services.map((s) => (
              <li key={s}>
                <Link to="/services" className="footer-link">{s}</Link>
              </li>
            ))}
          </FooterCol>

          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-[1.05rem] font-semibold text-bone mb-5">Hours</h3>
            <ul className="list-none m-0 p-0 space-y-3">
              {hours.map(([d, t]) => (
                <li key={d} className="flex items-baseline gap-2 text-[0.72rem]">
                  <span className="text-muted w-9">{d}</span>
                  <span className="flex-1 border-b border-dotted border-chrome-dark/70 -translate-y-1" aria-hidden="true" />
                  <span className="font-semibold text-bone">{t}</span>
                </li>
              ))}
            </ul>
            <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="inline-flex mt-7 px-7 py-3 rounded-full border border-chrome-light text-[0.72rem] tracking-[0.14em] uppercase text-bone no-underline hover:bg-chrome-light hover:text-ink transition-colors">
              Book Now
            </a>
            <p className="mt-6 text-[0.8rem]">
              <a href={`mailto:${EMAIL}`} className="footer-link text-muted">{EMAIL}</a>
            </p>
          </div>
        </div>

        {/* Oversized chrome wordmark sign-off */}
        <div className="display chrome-text text-[clamp(5rem,24vw,20rem)] leading-[0.8] tracking-[0.04em] text-center select-none" aria-hidden="true">
          PARE
        </div>

        <div className="border-t border-line mt-10 pt-8 pr-16 flex flex-col md:flex-row justify-between gap-4">
          <span className="text-[0.72rem] text-chrome-dark">© 2026 PARE Men's Grooming &amp; Lifestyle · Iloilo City, Philippines</span>
          <span className="font-serif italic text-[0.95rem] text-chrome-dark">
            "Because true aesthetic is not to impress, but to refine with effortless finesse."
          </span>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }) {
  return (
    <div>
      <h3 className="text-[1.05rem] font-semibold text-bone mb-5">{title}</h3>
      <ul className="space-y-3 list-none m-0 p-0 text-[0.86rem] text-muted">{children}</ul>
    </div>
  )
}

function SocialBtn({ href, label, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="w-10 h-10 border border-line flex items-center justify-center text-muted hover:border-chrome hover:text-bone transition-colors"
    >
      {icon}
    </a>
  )
}
