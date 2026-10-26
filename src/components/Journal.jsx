import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import LoopVideo from './LoopVideo'
import { useReveal } from '../hooks/useReveal'
import { VIDEO } from '../lib/site'

// Fills the slot of Sota's journal with two wide PARE films. Both clips are
// landscape, so the 16:9 frames never crop a vertical video into a blur.
const films = [
  { src: VIDEO.reveal, tag: 'On Film', title: 'The reveal: a finished cut in the mirror.' },
  { src: VIDEO.beard, tag: 'On Film', title: 'Beard shaping, finished with a hot towel.' },
]

export default function Journal() {
  const headRef = useReveal(0)
  const gridRef = useReveal(120)

  return (
    <section className="bg-ink py-24 md:py-32">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10">
        <div ref={headRef} className="reveal flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="eyebrow mb-5">The PARE Lookbook</p>
            <h2 className="display text-[clamp(2rem,4.4vw,3.2rem)] text-bone">
              Cuts, culture <span className="chrome-text">&amp; the Alcove.</span>
            </h2>
          </div>
          <Link to="/gallery" className="btn btn-ghost self-start md:self-auto">
            Full Gallery
          </Link>
        </div>

        <div ref={gridRef} className="reveal grid md:grid-cols-2 gap-5">
          {films.map((f) => (
            <Link key={f.src} to="/gallery" className="group no-underline">
              <div className="relative aspect-video overflow-hidden bg-ink-3 mb-5">
                <LoopVideo src={f.src} className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-[1.03]" label={f.title} />
              </div>
              <p className="text-[0.62rem] tracking-[0.24em] uppercase text-chrome-dark mb-2">{f.tag}</p>
              <h3 className="font-display font-bold text-[1.1rem] leading-snug text-bone mb-3">{f.title}</h3>
              <span className="inline-flex items-center gap-1.5 text-[0.62rem] font-semibold tracking-[0.22em] uppercase text-chrome-light">
                View gallery <ArrowRight size={11} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
