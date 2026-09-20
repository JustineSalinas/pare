import { useState, useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'
import Img from './Img'

const slides = [
  {
    src: '/venue/shop-01.jpg',
    caption: 'The Space — Modern barber chairs, designed for the experience.',
  },
  {
    src: '/venue/shop-06.jpg',
    caption: 'The Culture — Where grooming meets lifestyle.',
  },
  {
    src: '/venue/shop-04.jpg',
    caption: 'The Alcove — General Luna Street, Iloilo City.',
  },
]

const gridImages = [
  { src: '/portfolio/work-1.jpg', alt: 'Textured layered cut by PARE' },
  { src: '/portfolio/work-2.jpg', alt: 'Skin fade with sharp taper by PARE' },
  { src: '/portfolio/work-3.jpg', alt: 'Blunt fringe crop by PARE' },
  { src: '/portfolio/work-4.jpg', alt: 'Mullet with detailed nape work by PARE' },
]

export default function Gallery() {
  const [current, setCurrent] = useState(0)
  const headRef = useReveal(0)
  const slideRef = useReveal(100)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="gallery" className="py-20 bg-[#080808]">
      <div className="max-w-[1400px] mx-auto px-8">
        <div ref={headRef} className="reveal text-center mb-12">
          <p className="font-grotesk text-[0.6rem] font-semibold tracking-[0.4em] uppercase text-[#C47840] mb-3">
            Portfolio
          </p>
          <h2 className="font-grotesk font-bold text-[clamp(2rem,5vw,3.5rem)] text-white tracking-tight">
            The Work
          </h2>
        </div>

        {/* Slideshow */}
        <div ref={slideRef} className="reveal relative w-full aspect-[16/7] overflow-hidden">
          {slides.map((s, i) => (
            <div key={i} className={`slide ${i === current ? 'active' : ''}`}>
              <Img
                src={s.src}
                alt={s.caption}
                className="w-full h-full object-cover"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
              <div className="absolute bottom-8 left-8 font-cormorant italic text-[1.1rem] text-white/70">
                {s.caption}
              </div>
            </div>
          ))}

          {/* Dot controls */}
          <div className="absolute bottom-8 right-8 flex gap-2 z-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={[
                  'w-2 h-2 rounded-full border-none cursor-pointer transition-colors duration-300',
                  i === current ? 'bg-[#C47840]' : 'bg-white/30',
                ].join(' ')}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 mt-1">
          {gridImages.map((img) => (
            <div key={img.alt} className="aspect-square overflow-hidden group">
              <Img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

