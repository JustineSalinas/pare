import { ArrowUpRight } from 'lucide-react'
import { serviceCategories } from '../lib/servicesData'
import { BOOKING_URL } from '../lib/site'

// Sota's services-page format: one centred column, numbered rows, price on the right.
// 'featured' only repeats services listed elsewhere, so it is left out.
const GROUPS = [
  { id: 'haircut-style', label: 'Haircut & Style' },
  { id: 'haircut-beard-srv', label: 'Haircut & Beard' },
  { id: 'premium-package', label: 'PARE Premium' },
  { id: 'facial-treatments', label: 'Facial Add-On' },
  { id: 'wedding-pkgs', label: 'Wedding Packages' },
]

const values = [
  { title: 'Never Rushed', body: '45-minute haircut slots, 60 with the beard, so every cut is done correctly.' },
  { title: 'Consult First', body: 'We assess what you want and need, then cut a style you can manage at home.' },
  { title: 'The Hot Towel', body: 'Cuts finish under a hot towel; beard work gets one infused with peppermint.' },
]

const priceValue = (p) => Number(p.replace(/[^\d]/g, ''))
const titleCase = (s) => s.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase())

// The ✪ in the Fresha names marks PARE's recommended services; all-caps names are normalised
function cleanName(raw) {
  const recommended = raw.startsWith('✪')
  const name = raw.replace('✪', '').trim()
  return [name === name.toUpperCase() ? titleCase(name) : name, recommended]
}

let n = 0
const groups = GROUPS.map(({ id, label }) => ({
  id,
  label,
  services: [...serviceCategories.find((c) => c.id === id).services]
    .sort((a, b) => priceValue(a.price) - priceValue(b.price))
    .map((s) => ({ ...s, number: ++n })),
}))

function ServiceRow({ s }) {
  const [name, recommended] = cleanName(s.name)
  return (
    <li className="grid grid-cols-[2.25rem_minmax(0,1fr)] md:grid-cols-[4.5rem_minmax(0,1fr)_9rem] gap-x-4 gap-y-3 py-7 border-b border-line">
      <span className="text-[0.75rem] tracking-[0.12em] text-chrome-dark pt-[3px]">{String(s.number).padStart(2, '0')}</span>
      <div>
        {recommended && <p className="text-[0.58rem] font-semibold tracking-[0.24em] uppercase chrome-text mb-1.5">Recommended</p>}
        <h3 className="font-display font-bold text-[1.05rem] leading-snug text-bone mb-1.5">{name}</h3>
        <p className="text-[0.86rem] leading-[1.65] text-muted max-w-[480px]">{s.short}</p>
      </div>
      <div className="col-start-2 md:col-start-3 flex md:flex-col items-baseline md:items-end gap-x-3 gap-y-2">
        <span className="font-serif italic text-[1.55rem] leading-none text-chrome-light">{s.price}</span>
        <span className="text-[0.6rem] tracking-[0.2em] uppercase text-chrome-dark">{s.duration}</span>
      </div>
    </li>
  )
}

export default function Services() {
  return (
    <section id="services" className="bg-ink-2 py-24 md:py-28">
      <div className="max-w-[960px] mx-auto px-5 md:px-10">
        <header className="text-center max-w-[640px] mx-auto mb-16">
          <p className="eyebrow eyebrow-center mb-6">Services &amp; Pricing</p>
          <h2 className="display text-[clamp(2rem,4.4vw,3.2rem)] text-bone mb-5">
            Tailored cuts,
            <br />
            <span className="chrome-text">honest prices.</span>
          </h2>
          <p className="text-[0.96rem] leading-[1.7] text-muted">
            Every service starts with a conversation. Tailor-made for your hair, combining modern clipper fading,
            precision scissor work, and traditional barber razor technique.
          </p>
        </header>

        {groups.map((g) => (
          <div key={g.id} className="mb-14 last:mb-0">
            <h3 className="text-[0.66rem] font-semibold tracking-[0.3em] uppercase text-chrome pb-4 border-b border-chrome-dark/50">{g.label}</h3>
            <ul className="list-none m-0 p-0">
              {g.services.map((s) => (
                <ServiceRow key={s.id} s={s} />
              ))}
            </ul>
          </div>
        ))}

        <div className="text-center mt-16">
          <p className="text-[0.95rem] leading-[1.6] text-muted mb-7 max-w-[520px] mx-auto">
            Not sure which one to book? First-timers, start with the <span className="text-bone">Haircut + Consultation</span>.
          </p>
          <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="btn btn-chrome">
            Book on Fresha <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      <div className="max-w-[1080px] mx-auto px-5 md:px-10 mt-24">
        <p className="eyebrow eyebrow-center mb-10 w-full">What We Stand For</p>
        <div className="grid md:grid-cols-3 border border-line">
          {values.map((v, i) => (
            <div key={v.title} className={`p-7 md:p-8 ${i ? 'border-t md:border-t-0 md:border-l border-line' : ''}`}>
              <span className="display text-[1.3rem] chrome-text">0{i + 1}</span>
              <h3 className="display text-[1.1rem] text-bone mt-4 mb-3">{v.title}</h3>
              <p className="text-[0.86rem] leading-[1.7] text-muted">{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
