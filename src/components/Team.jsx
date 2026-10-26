import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { members } from '../lib/teamData'

// Home-page rail, as on Sota's home; every card opens that barber's own page
export default function Team() {
  const headRef = useReveal(0)
  const railRef = useRef(null)

  const scrollRail = (dir) => {
    const rail = railRef.current
    if (!rail) return
    const card = rail.firstElementChild
    rail.scrollBy({ left: dir * ((card?.offsetWidth || 300) + 16), behavior: 'smooth' })
  }

  return (
    <section id="team" className="bg-ink-2 py-24 md:py-32">
      <div ref={headRef} className="reveal max-w-[1440px] mx-auto px-5 md:px-10 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="eyebrow mb-5">The Hands Behind the Craft</p>
          <h2 className="display text-[clamp(2.2rem,5vw,4rem)] text-bone">
            Meet the <span className="chrome-text">team.</span>
          </h2>
        </div>
        <div className="flex items-center gap-3 self-start md:self-auto">
          <button onClick={() => scrollRail(-1)} aria-label="Previous barbers" className="w-11 h-11 rounded-full border border-line bg-transparent text-bone hover:border-chrome cursor-pointer flex items-center justify-center">
            <ArrowLeft size={16} />
          </button>
          <button onClick={() => scrollRail(1)} aria-label="Next barbers" className="w-11 h-11 rounded-full border border-line bg-transparent text-bone hover:border-chrome cursor-pointer flex items-center justify-center">
            <ArrowRight size={16} />
          </button>
          <Link to="/team" className="btn btn-ghost ml-2">
            Full Team
          </Link>
        </div>
      </div>

      <div
        ref={railRef}
        className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory px-5 md:px-10 xl:px-[max(2.5rem,calc((100vw-1440px)/2+2.5rem))] scroll-px-5 md:scroll-px-10 xl:scroll-px-[max(2.5rem,calc((100vw-1440px)/2+2.5rem))]"
      >
        {members.map((m) => (
          <Link
            key={m.slug}
            to={`/team/${m.slug}`}
            className="group relative shrink-0 w-[70vw] sm:w-[300px] aspect-[3/4] overflow-hidden snap-start bg-ink-3 no-underline"
            aria-label={`${m.name}, ${m.role}: see work and book`}
          >
            <img
              src={m.img}
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
            {m.owner && (
              <span className="absolute top-4 left-4 bg-chrome-light text-ink text-[0.56rem] font-bold tracking-[0.22em] uppercase px-2.5 py-1.5">
                Owner
              </span>
            )}
            <div className="absolute bottom-0 inset-x-0 p-5">
              <div className="display text-[1.4rem] text-bone">{m.name}</div>
              <div className="text-[0.62rem] tracking-[0.22em] uppercase text-chrome mt-1.5">{m.role}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
