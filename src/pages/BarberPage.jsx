import { useCallback, useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Facebook, Instagram, Star } from 'lucide-react'
import Lightbox from '../components/Lightbox'
import { members, memberBySlug, bookingUrlFor } from '../lib/teamData'

export default function BarberPage() {
  const { slug } = useParams()
  const m = memberBySlug(slug)
  const [photo, setPhoto] = useState(null)
  const closePhoto = useCallback(() => setPhoto(null), [])

  useEffect(() => {
    if (m) document.title = `${m.fullName || m.name}, ${m.role} | PARE Iloilo City`
    setPhoto(null)
  }, [m])

  if (!m) return <Navigate to="/team" replace />

  const others = members.filter((o) => o.slug !== m.slug)
  const booking = bookingUrlFor(m)

  return (
    <main className="bg-ink pt-28 md:pt-32">
      <div className="max-w-[1240px] mx-auto px-5 md:px-10">
        <Link to="/team" className="inline-flex items-center gap-2 text-[0.66rem] font-semibold tracking-[0.24em] uppercase text-muted hover:text-bone no-underline mb-10">
          <ArrowLeft size={13} /> All barbers
        </Link>

        {/* Profile */}
        <section className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-10 lg:gap-16 items-center pb-20 md:pb-24 border-b border-line">
          <div className="relative aspect-[4/5] overflow-hidden bg-ink-3 animate-fadeUp">
            <img src={m.img} alt={`${m.name}, ${m.role} at PARE`} className="absolute inset-0 w-full h-full object-cover object-top" />
            {m.owner && (
              <span className="absolute top-4 left-4 bg-chrome-light text-ink text-[0.56rem] font-bold tracking-[0.22em] uppercase px-2.5 py-1.5">Owner</span>
            )}
          </div>

          <div className="animate-fadeUp [animation-delay:0.15s]">
            <p className="eyebrow mb-5">{m.role}</p>
            <h1 className="display text-[clamp(3.2rem,9vw,7rem)] chrome-text mb-6">{m.name}</h1>
            <div className="flex items-center gap-1 text-chrome-light mb-7">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
              <span className="text-[0.78rem] text-muted ml-2">5.0 on Fresha</span>
            </div>
            <p className="font-serif italic text-[clamp(1.25rem,2.2vw,1.6rem)] leading-[1.5] text-chrome-light max-w-[560px] mb-10">{m.bio}</p>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <a href={booking} target="_blank" rel="noreferrer" className="btn btn-chrome !px-8 !py-4">
                Book with {m.name} <ArrowUpRight size={14} />
              </a>
              {m.instagram && (
                <a href={m.instagram} target="_blank" rel="noreferrer" aria-label={`${m.name} on Instagram`} className="w-12 h-12 flex items-center justify-center border border-line text-bone hover:border-chrome">
                  <Instagram size={16} />
                </a>
              )}
              {m.facebook && (
                <a href={m.facebook} target="_blank" rel="noreferrer" aria-label={`${m.name} on Facebook`} className="w-12 h-12 flex items-center justify-center border border-line text-bone hover:border-chrome">
                  <Facebook size={16} />
                </a>
              )}
            </div>
            <p className="text-[0.74rem] text-chrome-dark">
              {m.freshaId ? `Opens Fresha with ${m.name} already selected.` : 'Opens Fresha booking for PARE.'}
            </p>
          </div>
        </section>

        {/* Gallery of the barber's work */}
        <section className="py-20 md:py-24" aria-labelledby="work-heading">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
            <div>
              <p className="eyebrow mb-5">Portfolio</p>
              <h2 id="work-heading" className="display text-[clamp(2rem,4.4vw,3.2rem)] text-bone">
                {m.name}'s <span className="chrome-text">work.</span>
              </h2>
            </div>
            <span className="text-[0.66rem] tracking-[0.24em] uppercase text-chrome-dark">
              {String(m.work.length).padStart(2, '0')} cuts · tap to enlarge
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
            {m.work.map((src, i) => (
              <button
                key={src}
                onClick={() => setPhoto(i)}
                className="group relative aspect-[3/4] overflow-hidden bg-ink-3 border-none p-0 cursor-zoom-in"
                aria-label={`Enlarge ${m.name}'s work, photo ${i + 1}`}
              >
                <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <span className="absolute bottom-3 left-3 display text-[0.75rem] chrome-text">{String(i + 1).padStart(2, '0')}</span>
              </button>
            ))}
          </div>

          {m.instagram && (
            <div className="text-center mt-12">
              <a href={m.instagram} target="_blank" rel="noreferrer" className="btn btn-ghost">
                More of {m.name}'s work on Instagram <ArrowUpRight size={13} />
              </a>
            </div>
          )}
        </section>

        {/* The rest of the team */}
        <section className="pb-24 md:pb-32 border-t border-line pt-16">
          <p className="eyebrow mb-8">More from the team</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {others.map((o) => (
              <Link key={o.slug} to={`/team/${o.slug}`} className="group relative aspect-[3/4] overflow-hidden no-underline bg-ink-3">
                <img src={o.img} alt="" className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-4">
                  <div className="display text-[1.15rem] text-bone">{o.name}</div>
                  <div className="text-[0.58rem] tracking-[0.2em] uppercase text-chrome mt-1">{o.role}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <Lightbox images={m.work} index={photo} onIndex={setPhoto} onClose={closePhoto} label={`${m.name}'s work`} />
    </main>
  )
}
