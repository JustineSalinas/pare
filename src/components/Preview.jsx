import { LayoutDashboard, Smartphone, ArrowRight } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

const items = [
  {
    href: '/admin.html#overview',
    icon: LayoutDashboard,
    title: 'Admin dashboard',
    body: "Today's schedule, bookings, clients, prices and wedding enquiries in one place, built for the way PARE runs.",
    cta: 'Open the dashboard',
  },
  {
    href: '/mobile.html',
    icon: Smartphone,
    title: 'Mobile app sample',
    body: 'Rebook your usual cut in one tap, get an alert when your barber has a free chair, and collect stamps. Includes a barber view.',
    cta: 'Open the app sample',
  },
]

export default function Preview() {
  const headRef = useReveal(0)
  const gridRef = useReveal(120)

  return (
    <section id="preview" className="py-24 bg-[#0c0c0b] border-t border-[#2e2e2e]">
      <div className="max-w-6xl mx-auto px-8">
        <div ref={headRef} className="reveal max-w-2xl mb-12">
          <p className="font-grotesk text-[0.6rem] font-semibold tracking-[0.4em] uppercase text-[#C47840] mb-4">
            Owner preview
          </p>
          <h2 className="font-grotesk font-bold text-[clamp(2rem,5vw,3.2rem)] leading-[1.1] text-white tracking-tight mb-5">
            Beyond the website
          </h2>
          <p className="text-[0.98rem] leading-[1.8] text-[#888880]">
            Two working samples of what PARE could own: the back office behind the counter, and an app for clients and barbers. Both use made-up data, so you can tap through freely.
          </p>
        </div>

        <div ref={gridRef} className="reveal grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map(({ href, icon: Icon, title, body, cta }) => (
            <a
              key={href}
              href={href}
              className="group flex flex-col justify-between gap-10 p-9 bg-[#111111] border border-[#2e2e2e] hover:border-[#C47840] transition-colors no-underline"
            >
              <div>
                <span className="w-12 h-12 border border-[#2e2e2e] group-hover:border-[#C47840] flex items-center justify-center text-[#C47840] mb-7 transition-colors">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className="font-grotesk font-bold text-[1.6rem] text-white tracking-tight mb-3">{title}</h3>
                <p className="text-[0.92rem] leading-[1.75] text-[#888880] max-w-md">{body}</p>
              </div>
              <span className="inline-flex items-center gap-2.5 self-start font-general-sans text-[0.72rem] font-semibold tracking-[0.25em] uppercase text-[#080808] bg-[#C47840] group-hover:bg-[#D9906A] px-8 py-4 transition-colors">
                {cta}
                <ArrowRight size={14} aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
