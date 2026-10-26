import { useEffect, useState } from 'react'
import { SHOPIFY_URL } from '../lib/site'

// PARE's own photos of the lifestyle wall (from their Facebook page), crossfading behind
// the card as in Sota's merch band
const slides = [
  { src: '/merch/store-lounge.jpg', position: 'object-[70%_center]', alt: 'Apparel rails and the sneaker wall in the PARE lounge' },
  { src: '/merch/store-sneakers.jpg', position: 'object-center', alt: 'Sneakers and collectibles on the PARE shelves' },
  { src: '/merch/store-front.jpg', position: 'object-[50%_70%]', alt: 'The PARE storefront at The Alcove, Iloilo City' },
]

export default function Shop() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setActive((s) => (s + 1) % slides.length), 5500)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="shop" className="relative bg-ink overflow-hidden h-[52vw] min-h-[600px] max-h-[780px]">
      {slides.map((s, i) => (
        <img
          key={s.src}
          src={s.src}
          alt={active === i ? s.alt : ''}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover ${s.position}`}
          // Outgoing frame clears before the next settles in, so two photos never stack half-transparent
          style={{
            opacity: active === i ? 1 : 0,
            transform: active === i ? 'scale(1)' : 'scale(1.04)',
            transition: active === i ? 'opacity 1.2s ease-out 0.45s, transform 6.5s ease-out' : 'opacity 0.45s ease-in, transform 0.45s ease-in',
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-ink/60 via-ink/15 to-transparent pointer-events-none" />

      <div className="relative h-full max-w-[1240px] mx-auto px-5 md:px-10 flex items-end md:items-center pb-10 md:pb-0">
        <div className="w-full max-w-[560px] px-7 py-8 md:px-9 md:py-9 bg-chrome-light/75 backdrop-blur-md text-ink">
          <p className="text-[0.9rem] uppercase mb-3">PARE + You</p>
          <h2 className="font-display font-black text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.05] mb-4 md:whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 112" }}>
            The PARE Lifestyle Wall
          </h2>
          <p className="text-[1.05rem] leading-[1.6] text-ink/80 mb-7 max-w-[460px]">
            Carefully selected apparel and sneakers, from hoodies and workwear jackets to caps, picked in-house and
            shipped from Iloilo City.
          </p>
          <a href={SHOPIFY_URL} target="_blank" rel="noreferrer" className="btn btn-ink !px-9 !text-[0.8rem] !tracking-[0.12em]">
            Shop Now
          </a>
        </div>
      </div>

      <div className="absolute bottom-5 right-5 md:right-10 flex gap-2" aria-hidden="true">
        {slides.map((s, i) => (
          <span key={s.src} className={`h-px w-8 transition-colors ${active === i ? 'bg-chrome-light' : 'bg-white/25'}`} />
        ))}
      </div>
    </section>
  )
}
