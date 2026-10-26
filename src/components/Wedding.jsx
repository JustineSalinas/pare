import { Mail } from 'lucide-react'
import LoopVideo from './LoopVideo'
import Img, { FALLBACK_PORTRAIT } from './Img'
import { useReveal } from '../hooks/useReveal'
import { EMAIL, VIDEO } from '../lib/site'

const packages = [
  { name: 'Groom Package', price: 'Inquire' },
  { name: 'Entourage Package (Group)', price: 'Inquire' },
  { name: 'Pre-Wedding Grooming Session', price: 'Inquire' },
  { name: 'On-Site Styling (Available)', price: 'Inquire' },
]

export default function Wedding() {
  const textRef = useReveal(0)
  const cardRef = useReveal(150)

  return (
    <section id="wedding" className="relative overflow-hidden bg-ink">
      <LoopVideo src={VIDEO.chairs} className="absolute inset-0 w-full h-full" label="The PARE barber chairs" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />

      <div className="relative max-w-[1440px] mx-auto px-5 md:px-10 py-28 md:py-40 grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-14 items-center">
        <div ref={textRef} className="reveal">
          <p className="eyebrow mb-5">For Your Special Day</p>
          <h2 className="display text-[clamp(2.4rem,6vw,5rem)] text-bone mb-8">
            Wedding
            <br />
            <span className="chrome-text">packages.</span>
          </h2>
          <p className="font-serif italic text-[clamp(1.2rem,2.2vw,1.5rem)] leading-[1.5] text-chrome-light max-w-[560px] mb-10">
            Look your absolute best on the most important day. Our wedding packages are designed to prepare grooms,
            groomsmen, and the entire entourage with precision and care.
          </p>

          <ul className="list-none m-0 p-0 border-t border-white/15 max-w-[560px] mb-10">
            {packages.map((p) => (
              <li key={p.name} className="flex justify-between items-center py-4 border-b border-white/15">
                <span className="text-[0.9rem] text-bone">{p.name}</span>
                <span className="font-serif italic text-[1.1rem] text-chrome">{p.price}</span>
              </li>
            ))}
          </ul>

          <a href={`mailto:${EMAIL}?subject=Wedding%20Package%20Inquiry%20-%20PARE`} className="btn btn-chrome">
            <Mail size={14} /> Inquire About Wedding Services
          </a>
        </div>

        <div ref={cardRef} className="reveal hidden lg:flex justify-end">
          <div className="w-[320px] bg-ink/70 backdrop-blur-xl border border-white/15 p-8 text-center">
            <div className="w-36 h-36 mx-auto rounded-full overflow-hidden mb-6 p-[2px]" style={{ background: 'var(--chrome-gradient)' }}>
              <Img
                src="/vinprofile.webp"
                fallback={FALLBACK_PORTRAIT}
                alt="Vin Paredes, PARE owner and head barber"
                className="w-full h-full object-cover object-top rounded-full"
                loading="lazy"
              />
            </div>
            <h3 className="display text-[1.2rem] text-bone mb-1">Vin Paredes</h3>
            <p className="text-[0.62rem] tracking-[0.24em] uppercase text-chrome mb-4">Owner &amp; Head Stylist</p>
            <p className="text-[0.85rem] leading-[1.7] text-muted">
              Personally orchestrates all wedding and entourage styling sessions.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
