import { ArrowUpRight } from 'lucide-react'
import LoopVideo from './LoopVideo'
import { useReveal } from '../hooks/useReveal'
import { VIDEO } from '../lib/site'
import { bookingUrlFor, memberBySlug } from '../lib/teamData'

// Sota's workshop band, filled with PARE's own 1-2-1 Education listing on Fresha
const details = ['Full day · 10AM – 6PM', 'One student only', 'Two live models', 'Certificate of Completion']

export default function Education() {
  const ref = useReveal(0)

  return (
    <section className="relative overflow-hidden bg-ink">
      <LoopVideo src={VIDEO.film} className="absolute inset-0 w-full h-full" label="Scissor work at PARE" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />

      <div ref={ref} className="reveal relative max-w-[1440px] mx-auto px-5 md:px-10 py-28 md:py-40">
        <p className="eyebrow mb-5">PARE 1-2-1 Education</p>
        <h2 className="display text-[clamp(2.2rem,5.5vw,4.4rem)] text-bone mb-6 max-w-[14ch]">
          One-to-one <span className="chrome-text">with William.</span>
        </h2>
        <p className="text-[1rem] leading-[1.75] text-chrome-light/85 max-w-[560px] mb-8">
          A personalised, full-day private course built on The PARE Standard. Watch a complete haircut on a live model,
          then cut your own with hands-on coaching in precision cutting, fades, texture, scissor work and styling.
        </p>
        <ul className="flex flex-wrap gap-2 list-none m-0 p-0 mb-10">
          {details.map((d) => (
            <li key={d} className="text-[0.64rem] tracking-[0.18em] uppercase text-bone border border-white/20 px-3 py-2">
              {d}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-5">
          <a href={bookingUrlFor(memberBySlug('william'))} target="_blank" rel="noreferrer" className="btn btn-chrome">
            Book Your Session <ArrowUpRight size={14} />
          </a>
          <span className="font-serif italic text-[1.5rem] text-chrome-light">₱12,000</span>
        </div>
      </div>
    </section>
  )
}
