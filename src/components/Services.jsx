import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { Scissors, Clock } from 'lucide-react'
import { serviceCategories } from '../lib/servicesData'

function ServiceCard({ s, delay }) {
  const ref = useReveal(delay)

  const handleBookClick = () => {
    // Dispatch event to select this service in the Booking component
    window.dispatchEvent(new CustomEvent('select-booking-service', { detail: s }))
  };

  return (
    <div
      ref={ref}
      className="reveal service-card relative overflow-hidden p-10 bg-[#111111] hover:bg-[#1a1a1a] border border-[#2e2e2e] hover:border-[#C47840] transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <div className="flex justify-between items-start mb-6">
          <div className="font-grotesk text-[0.65rem] font-semibold tracking-[0.3em] text-[#555550]">
            SERVICE
          </div>
          <span className="font-grotesk text-[0.68rem] tracking-[0.1em] text-[#888880] flex items-center gap-1.5 bg-[#080808] px-2.5 py-1 border border-[#2e2e2e]">
            <Clock size={11} className="text-[#C47840]" /> {s.duration}
          </span>
        </div>
        <div className="font-grotesk font-semibold text-[1.1rem] text-white mb-3 tracking-tight">
          {s.name}
        </div>
        <p className="text-[0.82rem] text-[#888880] leading-relaxed mb-8">{s.desc}</p>
      </div>

      <div className="flex justify-between items-center border-t border-[#2e2e2e] pt-6 mt-auto">
        <span className="font-grotesk font-bold text-[1.15rem] text-[#C47840]">{s.price}</span>
        <button
          onClick={handleBookClick}
          className="font-grotesk text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-[#080808] bg-[#C47840] hover:bg-[#D9906A] px-5 py-2.5 transition-colors border-none cursor-pointer"
        >
          Book Now
        </button>
      </div>
    </div>
  )
}

export default function Services() {
  const [activeCategory, setActiveCategory] = useState(serviceCategories[0].id)
  const headRef = useReveal(0)

  const activeCatData = serviceCategories.find((cat) => cat.id === activeCategory)

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
            href="#booking"
            className="inline-flex items-center gap-2 font-grotesk text-[0.72rem] font-semibold tracking-[0.25em] uppercase text-[#080808] bg-[#C47840] px-8 py-4 hover:bg-[#D9906A] transition-colors no-underline self-start md:self-auto"
          >
            <Scissors size={13} />
            Book Custom Appointment
          </a>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 mb-12 overflow-x-auto pb-4 border-b border-[#2e2e2e] no-scrollbar">
          {serviceCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={[
                'px-6 py-3.5 font-grotesk text-[0.72rem] font-semibold tracking-[0.2em] uppercase border transition-all duration-300 whitespace-nowrap cursor-pointer',
                activeCategory === cat.id
                  ? 'border-[#C47840] bg-[#C47840] text-[#080808]'
                  : 'border-[#2e2e2e] text-[#888880] hover:text-white hover:border-[#555550] bg-transparent'
              ].join(' ')}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeCatData?.services.map((s, i) => (
            <ServiceCard key={s.id} s={s} delay={i * 60} />
          ))}
        </div>

        <p className="text-center mt-16 font-grotesk text-[0.72rem] tracking-[0.2em] text-[#555550]">
          Book online instantly with our custom booking system below · Instant confirmation
        </p>
      </div>
    </section>
  )
}

