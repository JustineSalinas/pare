import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { serviceCategories } from '../lib/servicesData'

// Home-page taste of the menu, as on Sota's home: the featured services, then "All Services"
const featured = serviceCategories.find((c) => c.id === 'featured').services

export default function ServicesPreview() {
  const headRef = useReveal(0)
  const listRef = useReveal(100)

  return (
    <section id="services" className="bg-ink-2 py-24 md:py-32">
      <div className="max-w-[1240px] mx-auto px-5 md:px-10">
        <div ref={headRef} className="reveal flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="eyebrow mb-5">What We Do</p>
            <h2 className="display text-[clamp(2rem,4.4vw,3.2rem)] text-bone">
              Tailored cuts,
              <br />
              <span className="chrome-text">honest prices.</span>
            </h2>
          </div>
          <Link to="/services" className="btn btn-ghost self-start md:self-auto">
            All Services <ArrowRight size={13} />
          </Link>
        </div>

        <ol ref={listRef} className="reveal list-none m-0 p-0 border-t border-line">
          {featured.map((s, i) => (
            <li key={s.id} className="grid grid-cols-[2.5rem_minmax(0,1fr)_auto] md:grid-cols-[5rem_minmax(0,1fr)_10rem] gap-x-4 items-baseline py-6 border-b border-line">
              <span className="text-[0.75rem] tracking-[0.12em] text-chrome-dark">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="font-display font-bold text-[1.05rem] text-bone mb-1.5">{s.name.replace('✪', '').trim()}</h3>
                <p className="text-[0.84rem] leading-[1.6] text-muted max-w-[520px]">{s.short}</p>
              </div>
              <div className="text-right">
                <span className="block font-serif italic text-[1.5rem] leading-none text-chrome-light">{s.price}</span>
                <span className="block text-[0.6rem] tracking-[0.2em] uppercase text-chrome-dark mt-2">{s.duration}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
