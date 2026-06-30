import { Instagram, Facebook, Calendar } from 'lucide-react'

const FRESHA_URL =
  'https://www.fresha.com/a/pare-mens-grooming-lifestyle-iloilo-city-the-alcove-general-luna-street-g943g1tc'

const serviceLinks = [
  'Basic Haircut & Style',
  'Haircut & Beard Trim',
  'Haircut + Consultation',
  'PARE Premium Package',
  'Facial Treatments',
  'Wedding Packages',
]

const navLinks = [
  { label: 'About PARE', href: '#about' },
  { label: 'Portfolio', href: '#gallery' },
  { label: 'The Team', href: '#team' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Visit Us', href: '#location' },
  { label: 'Book Now', href: '#booking', external: false },
]

export default function Footer() {
  return (
    <footer className="bg-[#111111] border-t border-[#2e2e2e] pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="font-grotesk font-bold text-[2rem] tracking-[0.3em] text-white mb-4">
              PARE<span className="text-[#C47840]">.</span>
            </div>
            <p className="text-[0.83rem] text-[#888880] leading-relaxed max-w-[260px] mb-8">
              Men's Grooming &amp; Lifestyle. Delivering high-end tailored haircuts at The Alcove,
              Iloilo City.
            </p>
            <div className="flex gap-3">
              <SocialBtn
                href="https://www.instagram.com/pare_iloilo.ph"
                label="Instagram"
                icon={<Instagram size={15} />}
              />
              <SocialBtn
                href="https://www.facebook.com/iloilofadebarber"
                label="Facebook"
                icon={<Facebook size={15} />}
              />
              <SocialBtn
                href="#booking"
                label="Book Appointment"
                icon={<Calendar size={15} />}
                external={false}
              />
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="font-grotesk text-[0.65rem] font-bold tracking-[0.3em] uppercase text-[#ece9e3] mb-6">
              Services
            </div>
            <ul className="space-y-3 list-none">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-[0.83rem] text-[#888880] hover:text-[#C47840] transition-colors no-underline"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigate */}
          <div>
            <div className="font-grotesk text-[0.65rem] font-bold tracking-[0.3em] uppercase text-[#ece9e3] mb-6">
              Navigate
            </div>
            <ul className="space-y-3 list-none">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.external ? '_blank' : undefined}
                    rel={l.external ? 'noreferrer' : undefined}
                    className="text-[0.83rem] text-[#888880] hover:text-[#C47840] transition-colors no-underline"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit */}
          <div>
            <div className="font-grotesk text-[0.65rem] font-bold tracking-[0.3em] uppercase text-[#ece9e3] mb-6">
              Visit
            </div>
            <ul className="space-y-3 list-none text-[0.83rem] text-[#888880]">
              <li>The Alcove, General Luna St.</li>
              <li>Iloilo City Proper, 5000</li>
              <li className="pt-2">
                <a
                  href="mailto:nivla38@gmail.com"
                  className="text-[#888880] hover:text-[#C47840] transition-colors no-underline"
                >
                  nivla38@gmail.com
                </a>
              </li>
              <li className="pt-2 text-[#555550] text-[0.78rem]">Mon–Sat: 9AM–7PM</li>
              <li className="text-[#555550] text-[0.78rem]">Sunday: 9AM–6PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2e2e2e] pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <span className="text-[0.72rem] text-[#555550] tracking-[0.05em]">
            © 2026 PARE Men's Grooming &amp; Lifestyle · Iloilo City, Philippines
          </span>
          <span className="font-cormorant italic text-[0.9rem] text-[#555550]">
            "Because true aesthetic is not to impress, but to refine with effortless finesse."
          </span>
        </div>
      </div>
    </footer>
  )
}

function SocialBtn({ href, label, icon, external = true }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      aria-label={label}
      className="w-9 h-9 border border-[#2e2e2e] flex items-center justify-center text-[#888880] hover:border-[#C47840] hover:text-[#C47840] transition-colors no-underline"
    >
      {icon}
    </a>
  )
}

