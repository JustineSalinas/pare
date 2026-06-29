import { useState, useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'

const slides = [
  {
    src: 'https://images.fresha.com/locations/location-profile-images/1117646/5348347/981f4999-95a4-47aa-82c0-14d6469bfc14-PAREMensGroomingLifestyle-PH-WesternVisayas-IloiloCity-IloiloCityProper-Fresha.jpg?class=venue-gallery-large&f_width=1920',
    caption: 'The Space â€” Modern barber chairs, designed for the experience.',
  },
  {
    src: 'https://images.fresha.com/locations/location-profile-images/1117646/5348348/c36f8864-9eb6-41ac-8f45-5030b3788133-PAREMensGroomingLifestyle-PH-WesternVisayas-IloiloCity-IloiloCityProper-Fresha.jpg?class=venue-gallery-small&f_width=1920',
    caption: 'The Culture â€” Where grooming meets lifestyle.',
  },
  {
    src: 'https://images.fresha.com/locations/location-profile-images/1117646/5348349/58c2b3d2-137a-486d-b747-0a47a6017d4a-PAREMensGroomingLifestyle-PH-WesternVisayas-IloiloCity-IloiloCityProper-Fresha.jpg?class=venue-gallery-small&f_width=1920',
    caption: 'The Alcove â€” General Luna Street, Iloilo City.',
  },
  {
    src: 'https://images.fresha.com/professional-profiles/profile/3940801/eec5b6d9-4318-44ae-9254-c98c3061da14.jpeg?class=square512&dpr=1&keyId=jAiIM9eJuff1x3CF&signature=nLQ1Hml4MFxNWpuxbJ11Wznlm+0&f_width=1920',
    caption: 'The Craft â€” Every angle tells a different story.',
  },
  {
    src: 'https://images.fresha.com/professional-profiles/profile/3940801/283eb352-4ffb-409e-97a4-d4265da348c7.jpeg?class=square512&dpr=1&keyId=jAiIM9eJuff1x3CF&signature=TUpItOXhu2Otu+L4peQiKLJuk9A&f_width=1920',
    caption: 'The Detail â€” Precision crafted for you.',
  },
]

const gridImages = [
  {
    src: 'https://images.fresha.com/professional-profiles/profile/3940801/eec5b6d9-4318-44ae-9254-c98c3061da14.jpeg?class=square512&dpr=1&keyId=jAiIM9eJuff1x3CF&signature=nLQ1Hml4MFxNWpuxbJ11Wznlm+0&f_width=800',
    alt: 'Portfolio work 1',
  },
  {
    src: 'https://images.fresha.com/professional-profiles/profile/3940801/283eb352-4ffb-409e-97a4-d4265da348c7.jpeg?class=square512&dpr=1&keyId=jAiIM9eJuff1x3CF&signature=TUpItOXhu2Otu+L4peQiKLJuk9A&f_width=800',
    alt: 'Portfolio work 2',
  },
  {
    src: 'https://images.fresha.com/professional-profiles/profile/3940801/67e399f7-744e-4df4-96d1-f26d9bd4b835.jpeg?class=square512&dpr=1&keyId=jAiIM9eJuff1x3CF&signature=yQ193yd54XuCilvXgpTrFBriML4&f_width=800',
    alt: 'Portfolio work 3',
  },
  {
    src: 'https://images.fresha.com/professional-profiles/profile/3940801/5138a6c8-1da9-4e06-b1e8-faa9161326d5.jpeg?class=square512&dpr=1&keyId=jAiIM9eJuff1x3CF&signature=A5td77EzRoGYFUGexEEMoQ5LxnU&f_width=800',
    alt: 'Portfolio work 4',
  },
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
              <img
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
              <img
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

