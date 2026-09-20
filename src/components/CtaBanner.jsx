import { useReveal } from '../hooks/useReveal'
import { Calendar } from 'lucide-react'
import { FALLBACK_TEXTURE } from './Img'

const FRESHA_URL =
  'https://www.fresha.com/a/pare-mens-grooming-lifestyle-iloilo-city-the-alcove-general-luna-street-g943g1tc'

const BG = '/venue/shop-05.jpg'

export default function CtaBanner() {
  const ref = useReveal(0)
  return (
    <section
      id="cta"
      className="relative py-32 text-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.12]"
        style={{ backgroundImage: `url('${BG}'), url('${FALLBACK_TEXTURE}')` }}
      />
      <div ref={ref} className="reveal relative z-10 max-w-4xl mx-auto px-8">
        <p className="font-grotesk text-[0.6rem] font-semibold tracking-[0.4em] uppercase text-[#C47840] mb-6">
          Ready?
        </p>
        <h2 className="font-grotesk font-bold text-[clamp(2.5rem,6vw,5rem)] text-white leading-[1.05] tracking-tight mb-5">
          Your Best Look<br />Awaits.
        </h2>
        <p className="font-cormorant italic text-[1.3rem] text-[#888880] mb-12">
          Book your appointment in under a minute.
        </p>
        <a
          href="#booking"
          className="inline-flex items-center gap-3 font-grotesk text-[0.85rem] font-semibold tracking-[0.2em] uppercase text-[#080808] bg-[#C47840] px-12 py-5 hover:bg-[#D9906A] transition-all hover:-translate-y-0.5 no-underline"
        >
          <Calendar size={15} />
          Book Appointment — Instant Confirmation
        </a>
      </div>
    </section>
  )
}

