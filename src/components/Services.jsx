import { useReveal } from '../hooks/useReveal'
import { Scissors, Star } from 'lucide-react'

const FRESHA_URL =
  'https://www.fresha.com/a/pare-mens-grooming-lifestyle-iloilo-city-the-alcove-general-luna-street-g943g1tc'

const services = [
  {
    num: '01',
    name: 'Basic Haircut & Style',
    desc: 'Our signature cut â€” precision crafted for your face shape and hair texture. Every angle considered.',
    price: 'â‚±850',
    time: '45 min',
    featured: false,
  },
  {
    num: '02',
    name: 'Student Rate',
    desc: 'The same quality service, tailored for students. Show your valid student ID upon visit.',
    price: 'â‚±700',
    time: '30 min',
    featured: false,
  },
  {
    num: '03',
    name: 'Haircut & Beard Trim',
    desc: 'Complete grooming experience. Haircut precision-cut, beard sculpted and detailed to perfection.',
    price: 'â‚±950',
    time: '50 min',
    featured: true,
    badge: 'Most Popular',
  },
  {
    num: '04',
    name: 'Haircut + Consultation',
    desc: 'An in-depth style consultation followed by a precision cut. Ideal for new clients or major style changes.',
    price: 'â‚±1,500',
    time: '50 min',
    featured: false,
  },
  {
    num: '05',
    name: 'PARE Premium Package',
    desc: 'Our top-tier experience â€” all-inclusive grooming with premium products and extended treatment time.',
    price: 'Inquire',
    time: 'Custom',
    featured: false,
  },
  {
    num: '06',
    name: 'Facial Treatments',
    desc: 'Targeted skincare treatments for men â€” cleansing, hydration, and rejuvenation for your best skin.',
    price: 'Inquire',
    time: 'Custom',
    featured: false,
  },
]

function ServiceCard({ s, delay }) {
  const ref = useReveal(delay)
  return (
    <div
      ref={ref}
      className={[
        'reveal service-card relative overflow-hidden p-10 transition-colors duration-300',
        s.featured
          ? 'bg-[#1a1a1a] border border-[#9A5E2A]'
          : 'bg-[#111111] hover:bg-[#1a1a1a]',
      ].join(' ')}
    >
      {s.badge && (
        <span className="inline-block font-grotesk text-[0.58rem] font-bold tracking-[0.2em] uppercase text-[#080808] bg-[#C47840] px-2.5 py-1 mb-4">
          {s.badge}
        </span>
      )}
      <div className="font-grotesk text-[0.65rem] font-semibold tracking-[0.3em] text-[#555550] mb-6">
        {s.num}
      </div>
      <div className="font-grotesk font-semibold text-[1.05rem] text-white mb-2.5 tracking-tight">
        {s.name}
      </div>
      <p className="text-[0.82rem] text-[#888880] leading-relaxed mb-6">{s.desc}</p>
      <div className="flex justify-between items-center">
        <span className="font-grotesk font-bold text-[1.1rem] text-[#C47840]">{s.price}</span>
        <span className="text-[0.72rem] text-[#555550] tracking-[0.1em]">{s.time}</span>
      </div>
    </div>
  )
}

export default function Services() {
  const headRef = useReveal(0)
  const btnRef = useReveal(80)

  return (
    <section id="services" className="py-28 bg-[#111111]">
      <div className="max-w-6xl mx-auto px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-16">
          <div>
            <p ref={headRef} className="reveal font-grotesk text-[0.6rem] font-semibold tracking-[0.4em] uppercase text-[#C47840] mb-4">
              What We Offer
            </p>
            <h2 className="font-grotesk font-bold text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] text-white tracking-tight">
              Services &amp;<br />Pricing
            </h2>
          </div>
          <a
            ref={btnRef}
            href={FRESHA_URL}
            target="_blank"
            rel="noreferrer"
            className="reveal inline-flex items-center gap-2 font-grotesk text-[0.72rem] font-semibold tracking-[0.25em] uppercase text-[#080808] bg-[#C47840] px-8 py-4 hover:bg-[#D9906A] transition-colors no-underline self-start md:self-auto"
          >
            <Scissors size={13} />
            Book Any Service
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#2e2e2e]">
          {services.map((s, i) => (
            <ServiceCard key={s.num} s={s} delay={i * 60} />
          ))}
        </div>

        <p className="text-center mt-12 font-grotesk text-[0.72rem] tracking-[0.2em] text-[#555550]">
          Full service menu available on{' '}
          <a
            href={FRESHA_URL}
            target="_blank"
            rel="noreferrer"
            className="text-[#C47840] no-underline hover:text-[#D9906A] transition-colors"
          >
            Fresha
          </a>{' '}
          Â· Instant confirmation
        </p>
      </div>
    </section>
  )
}

