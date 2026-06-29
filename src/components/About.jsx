import { useReveal } from '../hooks/useReveal'
import { Check } from 'lucide-react'

const IMG_MAIN =
  'https://images.fresha.com/locations/location-profile-images/1117646/5348347/981f4999-95a4-47aa-82c0-14d6469bfc14-PAREMensGroomingLifestyle-PH-WesternVisayas-IloiloCity-IloiloCityProper-Fresha.jpg?class=venue-gallery-large&f_width=1200'
const IMG_ACCENT =
  'https://images.fresha.com/locations/location-profile-images/1117646/5348349/58c2b3d2-137a-486d-b747-0a47a6017d4a-PAREMensGroomingLifestyle-PH-WesternVisayas-IloiloCity-IloiloCityProper-Fresha.jpg?class=venue-gallery-small&f_width=800'

const features = [
  'Award-winning barbers',
  'Custom interior by Vitrine',
  'LGBTQ+ friendly',
  'Wheelchair accessible',
  'Asian-owned business',
  'Kid & pet friendly',
]

export default function About() {
  const leftRef = useReveal(0)
  const rightRef = useReveal(120)

  return (
    <section id="about" className="py-28 bg-[#080808]">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-24 items-center">
          {/* Images */}
          <div ref={leftRef} className="reveal relative h-[520px] lg:h-[600px]">
            <img
              src={IMG_MAIN}
              alt="PARE barbershop interior with modern barber chairs"
              className="absolute top-0 left-0 w-3/4 h-4/5 object-cover"
              loading="lazy"
            />
            <img
              src={IMG_ACCENT}
              alt="PARE interior lifestyle decor"
              className="absolute bottom-0 right-0 w-[55%] h-[55%] object-cover border-4 border-[#080808]"
              loading="lazy"
            />
            <div className="absolute bottom-4 left-0 bg-[#C47840] text-[#080808] px-5 py-3 font-grotesk text-[0.65rem] font-bold tracking-[0.2em] uppercase">
              The Alcove Â· Iloilo City
            </div>
          </div>

          {/* Text */}
          <div ref={rightRef} className="reveal">
            <p className="font-grotesk text-[0.6rem] font-semibold tracking-[0.4em] uppercase text-[#C47840] mb-4">
              Our Story
            </p>
            <h2 className="font-grotesk font-bold text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] text-white tracking-tight mb-6">
              Beyond the Cut.<br />It's Character.
            </h2>
            <div className="w-10 h-px bg-[#C47840] mb-6" />
            <p className="font-cormorant italic font-light text-[clamp(1.1rem,2.5vw,1.4rem)] text-[#888880] leading-relaxed mb-1">
              "Not just a haircutâ€”it's character crafted through texture and shape. Every angle tells a different story."
            </p>
            <p className="font-cormorant italic text-[0.85rem] text-[#555550] mb-6">
              â€” Vin Paredes, Owner &amp; Head Barber
            </p>
            <p className="text-[0.95rem] leading-[1.85] text-[#888880] mb-4">
              PARE is Iloilo City's premier barber salon â€” a multi-zoned space designed with
              client experience at its core. Born from the legacy of Iloilo Fade Barber, PARE
              evolved into an award-winning grooming destination that delivers high-end tailored
              haircuts in an environment that feels as elevated as the service itself.
            </p>
            <p className="text-[0.95rem] leading-[1.85] text-[#888880] mb-8">
              We are pioneers of modern barbering, offering an exclusive feel in an inclusive
              space â€” for men, for women, for everyone who values the craft of looking and
              feeling their best.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {features.map((f) => (
                <div key={f} className="flex items-center gap-2.5">
                  <Check size={13} className="text-[#C47840] shrink-0" />
                  <span className="font-grotesk text-[0.8rem] font-medium text-[#ece9e3]">
                    {f}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

