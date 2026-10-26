import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import LoopVideo from './LoopVideo'
import { BOOKING_URL, VIDEO } from '../lib/site'

const stats = [
  { number: '5.0', label: 'Perfect Rating' },
  { number: '5', label: 'Expert Barbers' },
  { number: '100%', label: 'Recommended' },
]

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[100svh] grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] bg-ink overflow-hidden">
      {/* Video: full-bleed behind the copy on mobile, its own column on desktop */}
      <div className="absolute inset-0 lg:relative lg:order-2">
        <LoopVideo src={VIDEO.hero} priority className="absolute inset-0 w-full h-full" label="A PARE barber at work" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30 lg:bg-gradient-to-r lg:from-ink lg:via-transparent lg:to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col justify-end lg:justify-center px-5 md:px-10 lg:pl-[max(2.5rem,calc((100vw-1440px)/2+2.5rem))] lg:pr-12 pt-32 pb-12 lg:py-28 animate-fadeUp">
        <p className="eyebrow mb-7">Iloilo City · Men's Grooming &amp; Lifestyle</p>
        <h1 className="display text-[clamp(2.7rem,6.2vw,5.8rem)] text-bone mb-7">
          High-end
          <br />
          <span className="chrome-text">tailored</span>
          <br />
          haircuts.
        </h1>
        <p className="text-[1rem] leading-[1.75] text-muted max-w-[440px] mb-10">
          PARE is Iloilo City's premier barbershop. Tailor-made cuts that combine modern clipper fading,
          precision scissor work, and traditional razor technique, never rushed.
        </p>

        <div className="flex flex-wrap gap-3 mb-14">
          <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="btn btn-chrome">
            Book an Appointment <ArrowUpRight size={14} />
          </a>
          <Link to="/services" className="btn btn-ghost">
            View Services
          </Link>
        </div>

        <dl className="grid grid-cols-3 max-w-[460px] border-t border-line pt-6 m-0">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="m-0">
                <div className="display text-[clamp(1.6rem,3vw,2.2rem)] chrome-text mb-1.5">{s.number}</div>
                <div className="text-[0.6rem] tracking-[0.24em] uppercase text-chrome-dark">{s.label}</div>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
