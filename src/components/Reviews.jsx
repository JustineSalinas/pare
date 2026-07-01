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

function ReviewCard({ review }) {
  return (
    <div className="bg-[#faf8f5] border border-[#e4e0d8] p-8 w-[85vw] md:w-[400px] shrink-0 flex flex-col justify-between transition-colors hover:bg-white">
      <div>
        <div className="flex gap-0.5 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={13} fill="#C47840" className="text-[#C47840]" />
          ))}
        </div>
        <p className="font-fraunces italic text-[1.05rem] text-[#1a1a1a] leading-relaxed mb-6">
          "{review.text}"
        </p>
      </div>
      <div>
        <div className="font-grotesk font-semibold text-[0.75rem] tracking-[0.1em] text-[#555550] uppercase">
          {review.name}
        </div>
        <div className="text-[0.68rem] text-[#8a8780] mt-0.5">{review.date}</div>
      </div>
    </div>
  )
}

export default function Reviews() {
  const headRef = useReveal(0)
  const scoreRef = useReveal(80)
  const carouselRef = useReveal(120)

  return (
    <section id="reviews" className="py-28 bg-[#faf8f5] overflow-hidden">
      <div className="max-w-6xl mx-auto px-8 mb-14">
        <div ref={headRef} className="reveal text-center mb-6">
          <p className="font-grotesk text-[0.75rem] font-bold tracking-[0.4em] uppercase text-[#C47840] mb-4">
            What Clients Say
          </p>
          <h2 className="font-grotesk font-bold text-[clamp(2rem,5vw,3.5rem)] text-[#111111] tracking-tight">
            Reviews
          </h2>
        </div>

        {/* Big score */}
        <div ref={scoreRef} className="reveal text-center">
          <div className="font-grotesk font-bold text-[5rem] text-[#111111] leading-none tracking-[-0.04em]">
            5.0
          </div>
          <div className="flex justify-center gap-1 my-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={22} fill="#C47840" className="text-[#C47840]" />
            ))}
          </div>
          <div className="text-[0.75rem] tracking-[0.2em] text-[#8a8780]">
            Perfect 5.0 Rating · 100% Recommended on Facebook
          </div>
        </div>
      </div>

      {/* Infinite Carousel */}
      <div ref={carouselRef} className="reveal relative flex gap-6 group py-4">
        {/* Fade edge gradients */}
        <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-[#faf8f5] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-[#faf8f5] to-transparent z-10 pointer-events-none" />

        {/* Track 1 */}
        <div className="flex gap-6 shrink-0 animate-marquee">
          {reviews.map((r, i) => (
            <ReviewCard key={i} review={r} />
          ))}
        </div>

        {/* Track 2 (Duplicate to create the seamless loop) */}
        <div className="flex gap-6 shrink-0 animate-marquee" aria-hidden="true">
          {reviews.map((r, i) => (
            <ReviewCard key={`dup-${i}`} review={r} />
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mt-12">
          <a
            href="https://www.facebook.com/iloilofadebarber"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-general-sans text-[0.72rem] font-medium tracking-[0.25em] uppercase text-[#111111] px-10 py-4 border border-[#111111]/20 hover:border-[#C47840] hover:bg-[#C47840]/8 transition-all no-underline"
          >
            Read Facebook Reviews
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </section>
  )
}