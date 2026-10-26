import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Img from './Img'
import { useReveal } from '../hooks/useReveal'

// Fills the slot of Sota's journal carousel with PARE's own lookbook stories
const entries = [
  { src: '/venue/shop-01.jpg', tag: 'The Space', title: 'Modern barber chairs, designed for the experience.' },
  { src: '/portfolio/work-1.jpg', tag: 'Portfolio', title: 'Textured layered cut' },
  { src: '/venue/shop-06.jpg', tag: 'The Culture', title: 'Where grooming meets lifestyle.' },
  { src: '/portfolio/work-2.jpg', tag: 'Portfolio', title: 'Skin fade with a sharp taper' },
  { src: '/venue/shop-04.jpg', tag: 'The Alcove', title: 'General Luna Street, Iloilo City.' },
  { src: '/portfolio/work-3.jpg', tag: 'Portfolio', title: 'Blunt fringe crop' },
  { src: '/venue/shop-07.jpg', tag: 'The Culture', title: 'Coffee and a cut at the PARE bar.' },
  { src: '/portfolio/work-4.jpg', tag: 'Portfolio', title: 'Mullet with detailed nape work' },
]

export default function Journal() {
  const headRef = useReveal(0)
  const railRef = useRef(null)

  const scrollRail = (dir) => {
    const rail = railRef.current
    if (!rail) return
    const card = rail.firstElementChild
    rail.scrollBy({ left: dir * ((card?.offsetWidth || 360) + 20), behavior: 'smooth' })
  }

  return (
    <section className="bg-ink py-24 md:py-32">
      <div ref={headRef} className="reveal max-w-[1440px] mx-auto px-5 md:px-10 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="eyebrow mb-5">The PARE Lookbook</p>
          <h2 className="display text-[clamp(2rem,4.4vw,3.2rem)] text-bone">
            Cuts, culture <span className="chrome-text">&amp; the Alcove.</span>
          </h2>
        </div>
        <div className="flex items-center gap-3 self-start md:self-auto">
          <button onClick={() => scrollRail(-1)} aria-label="Previous" className="w-11 h-11 rounded-full border border-line bg-transparent text-bone hover:border-chrome cursor-pointer flex items-center justify-center">
            <ArrowLeft size={16} />
          </button>
          <button onClick={() => scrollRail(1)} aria-label="Next" className="w-11 h-11 rounded-full border border-line bg-transparent text-bone hover:border-chrome cursor-pointer flex items-center justify-center">
            <ArrowRight size={16} />
          </button>
          <Link to="/gallery" className="btn btn-ghost ml-2">
            Full Gallery
          </Link>
        </div>
      </div>

      <div
        ref={railRef}
        className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory px-5 md:px-10 xl:px-[max(2.5rem,calc((100vw-1440px)/2+2.5rem))] scroll-px-5 md:scroll-px-10 xl:scroll-px-[max(2.5rem,calc((100vw-1440px)/2+2.5rem))]"
      >
        {entries.map((e) => (
          <Link key={e.src} to="/gallery" className="group shrink-0 w-[78vw] sm:w-[360px] snap-start no-underline">
            <div className="aspect-[4/3] overflow-hidden bg-ink-3 mb-4">
              <Img src={e.src} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
            </div>
            <p className="text-[0.62rem] tracking-[0.24em] uppercase text-chrome-dark mb-2">{e.tag}</p>
            <h3 className="font-display font-bold text-[1rem] leading-snug text-bone mb-3">{e.title}</h3>
            <span className="inline-flex items-center gap-1.5 text-[0.62rem] font-semibold tracking-[0.22em] uppercase text-chrome-light">
              View gallery <ArrowRight size={11} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
