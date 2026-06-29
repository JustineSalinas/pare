import { ChevronDown } from 'lucide-react'

const FRESHA_URL =
  'https://www.fresha.com/a/pare-mens-grooming-lifestyle-iloilo-city-the-alcove-general-luna-street-g943g1tc'

const BG =
  'https://images.fresha.com/locations/location-profile-images/1117646/5348347/981f4999-95a4-47aa-82c0-14d6469bfc14-PAREMensGroomingLifestyle-PH-WesternVisayas-IloiloCity-IloiloCityProper-Fresha.jpg?class=venue-gallery-large&f_width=1920'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-heroBgZoom"
        style={{ backgroundImage: `url('${BG}')` }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#080808]/85 via-[#080808]/50 to-[#080808]/75" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 animate-fadeUp">
        <p className="font-grotesk text-[0.65rem] font-semibold tracking-[0.4em] uppercase text-[#C47840] mb-6">
          Iloilo City's Premier Barbershop
        </p>
        <h1 className="font-grotesk font-bold text-[clamp(5rem,16vw,14rem)] leading-[0.9] tracking-[0.2em] text-[#f5f2ed] mb-5">
          PARE
        </h1>
        <p className="font-cormorant italic font-light text-[clamp(1.1rem,3vw,1.7rem)] text-[#888880] mb-12 tracking-[0.05em]">
          Men's Grooming &amp; Lifestyle
        </p>

        <div className="flex gap-5 justify-center flex-wrap">
          <a
            href={FRESHA_URL}
            target="_blank"
            rel="noreferrer"
            className="font-grotesk text-[0.72rem] font-semibold tracking-[0.25em] uppercase text-[#080808] bg-[#C47840] px-10 py-4 hover:bg-[#D9906A] transition-all hover:-translate-y-0.5 no-underline"
          >
            Book an Appointment
          </a>
          <a
            href="#services"
            className="font-grotesk text-[0.72rem] font-medium tracking-[0.25em] uppercase text-white px-10 py-4 border border-white/25 hover:border-[#C47840] hover:bg-[#C47840]/8 transition-all no-underline"
          >
            View Services
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-fadeIn">
        <div className="w-px h-10 bg-gradient-to-b from-[#C47840] to-transparent animate-scrollPulse" />
        <ChevronDown size={14} className="text-[#555550]" />
      </div>
    </section>
  )
}

