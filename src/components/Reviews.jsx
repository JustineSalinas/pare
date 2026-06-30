import { useReveal } from '../hooks/useReveal'
import { Star, ExternalLink } from 'lucide-react'

const FRESHA_URL =
  'https://www.fresha.com/a/pare-mens-grooming-lifestyle-iloilo-city-the-alcove-general-luna-street-g943g1tc'

const reviews = [
  { name: 'Julius D.', date: 'June 28, 2026', text: 'The best barber experience in Iloilo. Every visit is consistent, professional, and the results always exceed my expectations.' },
  { name: 'Dexter John L.', date: 'June 28, 2026', text: "PARE isn't just a barber — it's an experience. The space, the team, the attention to detail. Worth every peso." },
  { name: 'Ken P.', date: 'June 25, 2026', text: 'Been coming here for over a year. Never disappointed. Vin and his team genuinely care about the craft and it shows in every cut.' },
  { name: 'Ezra Jes L.', date: 'June 27, 2026', text: 'First time at PARE and I was blown away by the interior alone. Then the haircut? Absolutely incredible. Will definitely be back.' },
  { name: 'Tokyo D.', date: 'June 25, 2026', text: 'The consultation before the cut made all the difference. They listened, they understood, and they delivered exactly what I wanted.' },
  { name: 'Vince D.', date: 'June 24, 2026', text: 'Booked through our website super easy — instant confirmation, showed up and was treated like a VIP from the moment I walked in.' },
]

function ReviewCard({ review, delay }) {
  const ref = useReveal(delay)
  return (
    <div ref={ref} className="reveal bg-[#111111] p-8">
      <div className="flex gap-0.5 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={13} fill="#C47840" className="text-[#C47840]" />
        ))}
      </div>
      <p className="font-cormorant italic text-[1.05rem] text-[#ece9e3] leading-relaxed mb-6">
        "{review.text}"
      </p>
      <div>
        <div className="font-grotesk font-semibold text-[0.75rem] tracking-[0.1em] text-[#888880] uppercase">
          {review.name}
        </div>
        <div className="text-[0.68rem] text-[#555550] mt-0.5">{review.date}</div>
      </div>
    </div>
  )
}

export default function Reviews() {
  const headRef = useReveal(0)
  const scoreRef = useReveal(80)

  return (
    <section id="reviews" className="py-28 bg-[#111111]">
      <div className="max-w-6xl mx-auto px-8">
        <div ref={headRef} className="reveal text-center mb-6">
          <p className="font-grotesk text-[0.6rem] font-semibold tracking-[0.4em] uppercase text-[#C47840] mb-4">
            What Clients Say
          </p>
          <h2 className="font-grotesk font-bold text-[clamp(2rem,5vw,3.5rem)] text-white tracking-tight">
            Reviews
          </h2>
        </div>

        {/* Big score */}
        <div ref={scoreRef} className="reveal text-center mb-14">
          <div className="font-grotesk font-bold text-[5rem] text-white leading-none tracking-[-0.04em]">
            5.0
          </div>
          <div className="flex justify-center gap-1 my-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={22} fill="#C47840" className="text-[#C47840]" />
            ))}
          </div>
          <div className="text-[0.75rem] tracking-[0.2em] text-[#555550]">
            Perfect 5.0 Rating · 100% Recommended on Facebook
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#2e2e2e]">
          {reviews.map((r, i) => (
            <ReviewCard key={r.name} review={r} delay={i * 60} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://www.facebook.com/iloilofadebarber"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-grotesk text-[0.72rem] font-medium tracking-[0.25em] uppercase text-white px-10 py-4 border border-white/25 hover:border-[#C47840] hover:bg-[#C47840]/8 transition-all no-underline"
          >
            Read Facebook Reviews
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </section>
  )
}

