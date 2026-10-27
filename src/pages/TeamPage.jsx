import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { members, bookingUrlFor } from '../lib/teamData'
import { BOOKING_URL } from '../lib/site'

function BarberCard({ m }) {
  return (
    <article className="group flex flex-col bg-ink-2 border border-line hover:border-chrome-dark transition-colors">
      <Link to={`/team/${m.slug}`} className="relative block aspect-[4/5] overflow-hidden" aria-label={`See ${m.name}'s work`}>
        <img
          src={m.img}
          alt={`${m.name}, ${m.role} at PARE`}
          className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
          loading="lazy"
        />
        {m.owner && (
          <span className="absolute top-4 left-4 bg-chrome-light text-ink text-[0.56rem] font-bold tracking-[0.22em] uppercase px-2.5 py-1.5">Owner</span>
        )}
      </Link>

      <div className="flex flex-col flex-1 p-6 md:p-7">
        <h2 className="display text-[1.5rem] text-bone">{m.name}</h2>
        <p className="text-[0.66rem] tracking-[0.22em] uppercase text-chrome mt-2 mb-4">{m.role}</p>
        <p className="text-[0.88rem] leading-[1.7] text-muted mb-8">{m.bio}</p>

        {/* Same stacked layout on every card, so a longer name never wraps differently */}
        <div className="mt-auto flex flex-col items-start gap-4">
          <a href={bookingUrlFor(m)} target="_blank" rel="noreferrer" className="btn btn-chrome w-full !py-3.5">
            Book with {m.name} <ArrowUpRight size={13} />
          </a>
          <Link
            to={`/team/${m.slug}`}
            className="inline-flex items-center gap-1.5 text-[0.66rem] font-semibold tracking-[0.22em] uppercase text-chrome-light no-underline border-b border-chrome-dark hover:border-bone pb-0.5"
          >
            View profile <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </article>
  )
}

export default function TeamPage() {
  return (
    <main className="bg-ink pt-36 md:pt-44 pb-24 md:pb-32">
      <div className="max-w-[1240px] mx-auto px-5 md:px-10">
        <header className="text-center max-w-[680px] mx-auto mb-14 md:mb-16 animate-fadeUp">
          <p className="eyebrow eyebrow-center mb-6">Meet the Team</p>
          <h1 className="display text-[clamp(2.2rem,5vw,3.6rem)] text-bone mb-6">
            Five chairs,
            <br />
            <span className="chrome-text">one standard.</span>
          </h1>
          <p className="text-[0.98rem] leading-[1.7] text-muted">
            Every barber at PARE is dedicated to their craft, constantly educating themselves in the newest and most
            innovative styles. Pick your barber, see their work, and book straight into their chair.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {members.map((m) => (
            <BarberCard key={m.slug} m={m} />
          ))}
        </div>

        <div className="mt-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 md:px-8 border border-line">
          <p className="text-[0.92rem] leading-[1.6] text-muted">
            No preference? Choose <span className="text-bone">Any professional</span> on Fresha for the earliest open chair.
          </p>
          <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="btn btn-ghost shrink-0">
            Book any barber <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </main>
  )
}
