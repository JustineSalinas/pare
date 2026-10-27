import { Check } from 'lucide-react'
import LoopVideo from './LoopVideo'
import Img from './Img'
import { useReveal } from '../hooks/useReveal'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { VIDEO } from '../lib/site'

const features = [
  'Award-winning barbers',
  'Custom interior by Vitrine',
  'LGBTQ+ friendly',
  'Wheelchair accessible',
  'Asian-owned business',
  'Kid & pet friendly',
]

export default function About() {
  const mediaRef = useScrollProgress('pass')
  const textRef = useReveal(100)

  return (
    <section id="about" className="relative bg-ink py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
          {/* Video with a venue still drifting against it */}
          <div ref={mediaRef} className="relative h-[520px] md:h-[640px]" style={{ '--p': 0.5 }}>
            <div className="absolute top-0 left-0 w-[78%] h-[86%] overflow-hidden">
              <LoopVideo src={VIDEO.reveal} className="absolute inset-0 w-full h-full" label="A finished cut shown to a client" />
            </div>
            <div
              className="absolute bottom-0 right-0 w-[48%] h-[46%] overflow-hidden border-[6px] border-ink"
              style={{ transform: 'translateY(calc((0.5 - var(--p)) * 90px))' }}
            >
              <Img src="/venue/shop-01.jpg" alt="PARE barbershop interior with modern barber chairs" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="absolute bottom-6 left-0 bg-chrome-light text-ink px-4 py-2.5 text-[0.6rem] font-bold tracking-[0.22em] uppercase">
              The Alcove · Iloilo City
            </div>
          </div>

          <div ref={textRef} className="reveal">
            <p className="eyebrow mb-5">Our Story</p>
            <h2 className="display text-[clamp(2.2rem,5vw,4rem)] text-bone mb-8">
              Beyond the cut.
              <br />
              <span className="chrome-text">It's character.</span>
            </h2>
            <p className="text-[0.98rem] leading-[1.85] text-muted mb-5">
              PARE is Iloilo City's premier barber salon, a multi-zoned space designed with client experience at its
              core. Born from the legacy of Iloilo Fade Barber, PARE evolved into an award-winning grooming destination
              that delivers high-end tailored haircuts in an environment that feels as elevated as the service itself.
            </p>
            <p className="text-[0.98rem] leading-[1.85] text-muted mb-10">
              We are pioneers of modern barbering, offering an exclusive feel in an inclusive space: for men, for women,
              for everyone who values the craft of looking and feeling their best.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 list-none m-0 p-0">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-[0.85rem] text-chrome-light">
                  <Check size={13} className="text-chrome shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
