import { useReveal } from '../hooks/useReveal'
import { Mail } from 'lucide-react'

const SHOP_BG = 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1200&auto=format&fit=crop'
const VIN_IMG = 'https://cdn-partners-api.fresha.com/employee-avatars/processed/364770/medium/b3ca249a-e13a-46c0-a3a5-69ce9ff207bd-Photoroom_20240701_010515.jpeg'

const packages = [
  { name: 'Groom Package', price: 'Inquire' },
  { name: 'Entourage Package (Group)', price: 'Inquire' },
  { name: 'Pre-Wedding Grooming Session', price: 'Inquire' },
  { name: 'On-Site Styling (Available)', price: 'Inquire' },
]

export default function Wedding() {
  const leftRef = useReveal(0)
  const rightRef = useReveal(120)

  return (
    <section
      id="wedding"
      className="py-28 bg-gradient-to-br from-[#1a1a1a] to-[#111111] border-t border-b border-[#2e2e2e]"
    >
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Image Container with Sir Vin Overlay */}
          <div ref={leftRef} className="reveal relative aspect-[4/5] hidden lg:block overflow-hidden border border-[#2e2e2e]">
            {/* Background high-resolution moody barbershop shot */}
            <img
              src={SHOP_BG}
              alt="Luxury modern barbershop environment"
              className="w-full h-full object-cover filter brightness-[0.3] grayscale-[20%]"
              loading="lazy"
            />
            
            {/* Vertical text banner */}
            <span className="absolute top-8 left-6 z-10 bg-[#C47840] text-[#080808] font-grotesk text-[0.6rem] font-bold tracking-[0.3em] uppercase px-3 py-6"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              Special Occasion
            </span>

            {/* Overlaid Profile Card for Sir Vin */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
              <div className="w-40 h-40 rounded-full border-2 border-[#C47840] overflow-hidden mb-5 shadow-2xl bg-[#080808] flex items-center justify-center">
                <img
                  src={VIN_IMG}
                  alt="Vin - PARE owner and head barber"
                  className="w-full h-full object-cover object-top scale-110"
                  loading="lazy"
                />
              </div>
              <div className="bg-[#080808]/85 backdrop-blur-md border border-[#2e2e2e] px-6 py-4 max-w-[280px]">
                <h4 className="font-grotesk font-bold text-[0.95rem] text-white tracking-[0.05em] mb-1">
                  Vin Paredes
                </h4>
                <div className="text-[0.68rem] tracking-[0.15em] uppercase text-[#C47840] font-semibold mb-2">
                  Owner & Head Stylist
                </div>
                <p className="text-[0.72rem] text-[#888880] leading-relaxed">
                  Personally orchestrates all wedding and entourage styling sessions.
                </p>
              </div>
            </div>
          </div>

          {/* Text */}
          <div ref={rightRef} className="reveal">
            <p className="font-grotesk text-[0.6rem] font-semibold tracking-[0.4em] uppercase text-[#C47840] mb-4">
              For Your Special Day
            </p>
            <h2 className="font-grotesk font-bold text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] text-white tracking-tight mb-6">
              Wedding<br />Packages
            </h2>
            <div className="w-10 h-px bg-[#C47840] mb-6" />
            <p className="font-cormorant italic text-[clamp(1.1rem,2.5vw,1.4rem)] text-[#888880] leading-relaxed mb-8">
              Look your absolute best on the most important day. Our wedding packages are designed
              to prepare grooms, groomsmen, and the entire entourage with precision and care.
            </p>

            <div className="flex flex-col gap-px bg-[#2e2e2e] mb-8">
              {packages.map((p) => (
                <div
                  key={p.name}
                  className="bg-[#111111] px-6 py-5 flex justify-between items-center"
                >
                  <span className="font-grotesk font-medium text-[0.85rem] text-[#ece9e3]">
                    {p.name}
                  </span>
                  <span className="font-grotesk font-bold text-[0.85rem] text-[#C47840]">
                    {p.price}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="mailto:nivla38@gmail.com?subject=Wedding%20Package%20Inquiry%20-%20PARE"
              className="inline-flex items-center gap-2 font-grotesk text-[0.72rem] font-semibold tracking-[0.25em] uppercase text-[#080808] bg-[#C47840] px-8 py-4 hover:bg-[#D9906A] transition-colors no-underline"
            >
              <Mail size={13} />
              Inquire About Wedding Services
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

