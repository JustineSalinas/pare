import { ArrowUpRight } from 'lucide-react'
import LoopVideo from './LoopVideo'
import { useReveal } from '../hooks/useReveal'
import { VIDEO } from '../lib/site'
import { bookingUrlFor, memberBySlug } from '../lib/teamData'

// Sota's workshop band, filled with PARE's 1-2-1 Education listings on Fresha
const courses = [
  {
    slug: 'vin',
    title: 'Private Master Class',
    educator: 'Vin Paredes · Founder',
    price: '₱20,000',
    body: 'A full-day mentorship built around your goals: consultation, precision cutting, client experience, personal branding, pricing and career development.',
  },
  {
    slug: 'william',
    title: 'Private Education',
    educator: 'William Velasco · Senior Stylist',
    price: '₱12,000',
    body: 'Refine precision, creativity and confidence in contemporary men’s hair: fades, texture, movement, scissor work and finishing.',
  },
  {
    slug: 'arthur',
    title: 'Private Education',
    educator: 'Arthur Tabhan · Senior Stylist',
    price: '₱12,000',
    body: 'Stronger foundations and consistency: fades, tapers, clipper control, sectioning, blending and workflow.',
  },
]

const included = ['Full day · 10AM – 6PM', 'One student only', 'Two live models', 'Lunch & specialty coffee', 'Certificate of Completion']

export default function Education() {
  const headRef = useReveal(0)
  const gridRef = useReveal(120)

  return (
    <section className="relative overflow-hidden bg-ink">
      <LoopVideo src={VIDEO.film} className="absolute inset-0 w-full h-full" label="Scissor work at PARE" />
      <div className="absolute inset-0 bg-ink/80" />

      <div className="relative max-w-[1240px] mx-auto px-5 md:px-10 py-24 md:py-32">
        <div ref={headRef} className="reveal grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-8 lg:gap-16 items-end mb-12">
          <div>
            <p className="eyebrow mb-5">PARE 1-2-1 Education</p>
            <h2 className="display text-[clamp(2.2rem,5vw,4rem)] text-bone">
              Learn the <span className="chrome-text">PARE Standard.</span>
            </h2>
          </div>
          <div>
            <p className="text-[1rem] leading-[1.75] text-chrome-light/85 mb-6">
              Private, one-to-one training for the next generation of modern men's hairstylists. Watch a complete
              live-model demonstration, then cut your own with hands-on coaching from a PARE educator.
            </p>
            <ul className="flex flex-wrap gap-2 list-none m-0 p-0">
              {included.map((d) => (
                <li key={d} className="text-[0.6rem] tracking-[0.18em] uppercase text-bone border border-white/20 px-3 py-2">
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div ref={gridRef} className="reveal grid md:grid-cols-3 gap-4">
          {courses.map((c) => {
            const m = memberBySlug(c.slug)
            return (
              <article key={c.slug} className="flex flex-col bg-ink/70 backdrop-blur-md border border-white/12 p-6 md:p-7">
                <div className="flex items-center gap-4 mb-6">
                  <img src={m.img} alt="" className="w-14 h-14 rounded-full object-cover object-top" loading="lazy" />
                  <div>
                    <h3 className="display text-[1.05rem] text-bone">{c.title}</h3>
                    <p className="text-[0.6rem] tracking-[0.2em] uppercase text-chrome mt-1.5">{c.educator}</p>
                  </div>
                </div>
                <p className="text-[0.88rem] leading-[1.7] text-muted mb-8">{c.body}</p>
                <div className="mt-auto flex items-center justify-between gap-4 pt-5 border-t border-white/12">
                  <span className="font-serif italic text-[1.5rem] leading-none text-chrome-light">{c.price}</span>
                  <a href={bookingUrlFor(m)} target="_blank" rel="noreferrer" className="btn btn-chrome !px-4 !py-2.5 !text-[0.62rem]">
                    Book with {m.name} <ArrowUpRight size={12} />
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
