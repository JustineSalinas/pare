import { Star, ArrowUpRight } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { GOOGLE_REVIEWS_URL, GOOGLE_RATING } from '../lib/site'

const reviews = [
  { name: 'Julius D.', date: 'June 28, 2026', text: 'The best barber experience in Iloilo. Every visit is consistent, professional, and the results always exceed my expectations.' },
  { name: 'Dexter John L.', date: 'June 28, 2026', text: "PARE isn't just a barber — it's an experience. The space, the team, the attention to detail. Worth every peso." },
  { name: 'Ken P.', date: 'June 25, 2026', text: 'Been coming here for over a year. Never disappointed. Vin and his team genuinely care about the craft and it shows in every cut.' },
  { name: 'Ezra Jes L.', date: 'June 27, 2026', text: 'First time at PARE and I was blown away by the interior alone. Then the haircut? Absolutely incredible. Will definitely be back.' },
  { name: 'Tokyo D.', date: 'June 25, 2026', text: 'The consultation before the cut made all the difference. They listened, they understood, and they delivered exactly what I wanted.' },
  { name: 'Vince D.', date: 'June 24, 2026', text: 'Booked online super easy — instant confirmation, showed up and was treated like a VIP from the moment I walked in.' },
]

function Stars({ size = 12 }) {
  return (
    <div className="flex gap-0.5 text-chrome-light" aria-label="5 out of 5 stars">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={size} fill="currentColor" />
      ))}
    </div>
  )
}

function ReviewCard({ review }) {
  return (
    <figure className="m-0 w-[82vw] sm:w-[380px] shrink-0 bg-ink-2 border border-line p-7 flex flex-col justify-between gap-8">
      <div>
        <Stars />
        <blockquote className="m-0 mt-5 text-[0.95rem] leading-[1.7] text-chrome-light">"{review.text}"</blockquote>
      </div>
      <figcaption className="flex items-center gap-3">
        <span className="w-9 h-9 rounded-full flex items-center justify-center text-[0.8rem] font-semibold text-ink" style={{ background: 'var(--chrome-gradient)' }}>
          {review.name[0]}
        </span>
        <span>
          <span className="block text-[0.82rem] font-semibold text-bone">{review.name}</span>
          <span className="block text-[0.7rem] text-chrome-dark">{review.date}</span>
        </span>
      </figcaption>
    </figure>
  )
}

export default function Reviews() {
  const headRef = useReveal(0)

  return (
    <section id="reviews" className="bg-ink py-24 md:py-32 overflow-hidden">
      <div ref={headRef} className="reveal max-w-[1440px] mx-auto px-5 md:px-10 grid md:grid-cols-[minmax(0,1fr)_auto] gap-10 items-end mb-14">
        <div>
          <p className="eyebrow mb-5">What Clients Say</p>
          <h2 className="display text-[clamp(2.2rem,5vw,4rem)] text-bone">
            A 5-star experience,
            <br />
            <span className="chrome-text">start to finish.</span>
          </h2>
        </div>
        <div className="md:text-right">
          <div className="display text-[4.5rem] chrome-text leading-none">{GOOGLE_RATING.score}</div>
          <div className="md:flex md:justify-end my-3">
            <Stars size={18} />
          </div>
          <p className="text-[0.7rem] tracking-[0.18em] uppercase text-chrome-dark">{GOOGLE_RATING.count} Google reviews</p>
        </div>
      </div>

      <div className="relative flex gap-5 group">
        <div className="absolute inset-y-0 left-0 w-10 md:w-32 bg-gradient-to-r from-ink to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-10 md:w-32 bg-gradient-to-l from-ink to-transparent z-10 pointer-events-none" />
        <div className="flex gap-5 shrink-0 animate-marquee">
          {reviews.map((r) => (
            <ReviewCard key={r.name} review={r} />
          ))}
        </div>
        <div className="flex gap-5 shrink-0 animate-marquee" aria-hidden="true">
          {reviews.map((r) => (
            <ReviewCard key={`dup-${r.name}`} review={r} />
          ))}
        </div>
      </div>

      <div className="text-center mt-14 px-5">
        <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer" className="btn btn-ghost">
          Read all {GOOGLE_RATING.count} Google Reviews <ArrowUpRight size={13} />
        </a>
      </div>
    </section>
  )
}
