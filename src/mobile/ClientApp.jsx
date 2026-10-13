import { useEffect, useMemo, useRef, useState } from 'react'
import {
  House, CalendarPlus, Ticket, Gift, User, ChevronLeft, ChevronRight, Check, Bell, MapPin, Scissors, Clock, Share2, X,
} from 'lucide-react'
import {
  BARBERS, BARBER_BY_ID, DAILY_SERVICES, SERVICE_BY_ID, SLOT_TIMES, buildSeed, addDays, dateKey, startOfDay, parseKey,
  parseTime, fmtTime, fmtDay, fmtDuration, peso, hoursFor, isWorking, isSlotFree, nextAvailable, saveStoredBooking,
  removeStoredBooking, useStoredBookings, barberName,
} from '../demo/data'
import { StatusBar, PrimaryButton, GhostButton, Sheet, poleStripe } from './shared'

const ME = { usualService: 'basic-haircut', usualBarber: 'kim', pref: 'Mid fade, textured top' }

const dayLabel = (key, now = new Date()) => {
  const t = dateKey(startOfDay(now))
  if (key === t) return 'Today'
  if (key === dateKey(addDays(startOfDay(now), 1))) return 'Tomorrow'
  return fmtDay(parseKey(key), { weekday: 'short', month: 'short', day: 'numeric' })
}

function Avatar({ barber, size = 44 }) {
  if (!barber) {
    return (
      <span className="rounded-full bg-[#222221] flex items-center justify-center text-[#C47840] shrink-0" style={{ width: size, height: size }}>
        <Scissors size={size * 0.42} aria-hidden="true" />
      </span>
    )
  }
  return <img src={barber.photo} alt="" className="rounded-full object-cover object-top bg-[#222] shrink-0" style={{ width: size, height: size }} />
}

/* ───────────── Home ───────────── */

function Home({ all, upcoming, onRebook, onGo, onCancel, user }) {
  const svc = SERVICE_BY_ID[ME.usualService]
  const barber = BARBER_BY_ID[ME.usualBarber]
  const slot = useMemo(() => nextAvailable(all, { barberId: ME.usualBarber, duration: svc.duration }), [all, svc.duration])
  const now = new Date()
  const [, close] = hoursFor(now)
  const nowMin = now.getHours() * 60 + now.getMinutes()
  const openNow = nowMin >= 540 && nowMin < close

  return (
    <div className="px-5 pb-6">
      <header className="flex items-start justify-between pt-3">
        <div>
          <h1 className="font-grotesk font-bold text-[1.75rem] tracking-tight leading-tight">Hi, {user.first}</h1>
          <p className="flex items-center gap-1.5 text-[0.8rem] text-[#9d9d95] mt-1">
            <MapPin size={12} aria-hidden="true" /> The Alcove, General Luna St.
          </p>
          <p className={`inline-flex items-center gap-1.5 text-[0.76rem] mt-2 ${openNow ? 'text-[#8FC19C]' : 'text-[#9d9d95]'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${openNow ? 'bg-[#8FC19C]' : 'bg-[#77756f]'}`} aria-hidden="true" />
            {openNow ? `Open until ${fmtTime(close)}` : 'Closed now, opens at 9:00 AM'}
          </p>
        </div>
        <button type="button" aria-label="Notifications" className="w-11 h-11 rounded-full bg-[#171716] flex items-center justify-center text-[#d8d5cd]">
          <Bell size={18} />
        </button>
      </header>

      {user.returning ? (
      <section aria-label="Your usual" className="relative mt-6 rounded-3xl bg-[#171716] overflow-hidden border border-[#262624]">
        <div className="absolute left-0 top-0 bottom-0 w-[9px]" style={poleStripe} aria-hidden="true" />
        <div className="pl-7 pr-5 pt-5 pb-5">
          <p className="text-[0.78rem] text-[#C47840] font-medium">Your usual</p>
          <h2 className="font-grotesk font-bold text-[1.45rem] leading-tight mt-1">{svc.name}</h2>
          <div className="flex items-center gap-2.5 mt-3">
            <Avatar barber={barber} size={32} />
            <p className="text-[0.84rem] text-[#d8d5cd]">
              with {barber.name}, {fmtDuration(svc.duration)}, <span className="font-grotesk">{peso(svc.price)}</span>
            </p>
          </div>
        </div>
        <div className="relative border-t border-dashed border-[#3a3a37]">
          <span className="absolute -left-2.5 -top-2.5 w-5 h-5 rounded-full bg-[#0c0c0b]" aria-hidden="true" />
          <span className="absolute -right-2.5 -top-2.5 w-5 h-5 rounded-full bg-[#0c0c0b]" aria-hidden="true" />
          <div className="pl-7 pr-5 py-4">
            {slot ? (
              <>
                <p className="text-[0.78rem] text-[#9d9d95]">Next free chair</p>
                <p className="font-grotesk font-semibold text-[1.05rem] mb-3">{dayLabel(slot.date)} at {fmtTime(slot.start)}</p>
                <PrimaryButton onClick={() => onRebook(slot)}>Rebook this slot</PrimaryButton>
              </>
            ) : (
              <p className="text-[0.85rem] text-[#9d9d95]">{barber.name} is fully booked for two weeks. Pick another barber to see more times.</p>
            )}
          </div>
        </div>
      </section>
      ) : (
        <section aria-label="First visit" className="relative mt-6 rounded-3xl bg-[#171716] overflow-hidden border border-[#262624]">
          <div className="absolute left-0 top-0 bottom-0 w-[9px]" style={poleStripe} aria-hidden="true" />
          <div className="pl-7 pr-5 py-5">
            <p className="text-[0.78rem] text-[#C47840] font-medium">Welcome to PARE</p>
            <h2 className="font-grotesk font-bold text-[1.45rem] leading-tight mt-1">Book your first cut</h2>
            <p className="text-[0.86rem] text-[#9d9d95] leading-snug mt-2.5">
              Pick a service and a barber. After your first visit, your usual shows up here for one-tap rebooking.
            </p>
            <PrimaryButton className="mt-5" onClick={() => onGo('book')}>Find a time</PrimaryButton>
          </div>
        </section>
      )}

      <section className="mt-7" aria-label="Coming up">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-grotesk font-semibold text-[1.05rem]">Coming up</h2>
          <button type="button" onClick={() => onGo('visits')} className="text-[0.8rem] text-[#C47840] flex items-center">
            See all <ChevronRight size={14} />
          </button>
        </div>
        {upcoming.length === 0 ? (
          <p className="text-[0.85rem] text-[#77756f] bg-[#131312] rounded-2xl p-4">{user.returning ? 'Nothing booked yet. Rebook your usual above or pick a new time.' : 'Nothing booked yet. Tap Book to find a time.'}</p>
        ) : (
          <ul className="space-y-3">
            {upcoming.slice(0, 2).map((u) => <UpcomingCard key={u.id} u={u} onCancel={onCancel} />)}
          </ul>
        )}
      </section>

      <section className="mt-7 rounded-3xl bg-[#131312] border border-[#222220] p-5" aria-label="Rewards progress">
        <div className="flex items-baseline justify-between">
          <h2 className="font-grotesk font-semibold text-[1.05rem]">Free cut progress</h2>
          <span className="font-grotesk text-[0.9rem] text-[#C47840]">{user.stamps} of 10</span>
        </div>
        <div className="h-2 rounded-full bg-[#222221] mt-3 overflow-hidden" role="progressbar" aria-valuenow={user.stamps} aria-valuemin={0} aria-valuemax={10} aria-label="Cuts toward a free haircut">
          <div className="h-full bg-[#C47840] rounded-full" style={{ width: `${user.stamps * 10}%` }} />
        </div>
        <p className="text-[0.8rem] text-[#9d9d95] mt-3">{10 - user.stamps} more cuts and your next Basic Haircut is on us.</p>
        <button type="button" onClick={() => onGo('rewards')} className="text-[0.8rem] text-[#C47840] mt-2 flex items-center">
          View rewards <ChevronRight size={14} />
        </button>
      </section>
    </div>
  )
}

function UpcomingCard({ u, onCancel }) {
  const barber = BARBER_BY_ID[u.barberId]
  return (
    <li className="flex items-center gap-3.5 bg-[#131312] border border-[#222220] rounded-2xl p-3.5">
      <div className="w-[54px] shrink-0 text-center bg-[#1c1c1b] rounded-xl py-2">
        <div className="text-[0.66rem] text-[#9d9d95]">{parseKey(u.date).toLocaleDateString('en-PH', { month: 'short' })}</div>
        <div className="font-grotesk font-bold text-[1.2rem] leading-none">{parseKey(u.date).getDate()}</div>
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-[0.92rem] truncate">{u.serviceName}</p>
        <p className="text-[0.78rem] text-[#9d9d95] flex items-center gap-1.5 mt-0.5">
          <Clock size={11} aria-hidden="true" /> {dayLabel(u.date)} at {fmtTime(u.start)} with {barber ? barber.name : 'any barber'}
        </p>
      </div>
      <button type="button" onClick={() => onCancel(u)} aria-label={`Cancel ${u.serviceName}`} className="w-10 h-10 rounded-full text-[#9d9d95] active:bg-[#222221] flex items-center justify-center">
        <X size={16} />
      </button>
    </li>
  )
}

/* ───────────── Booking flow ───────────── */

function BookFlow({ all, initial, onExit, onConfirm }) {
  const [step, setStep] = useState(initial.step || 1)
  const [serviceId, setServiceId] = useState(initial.serviceId || null)
  const [barberId, setBarberId] = useState(initial.barberId || null)
  const [date, setDate] = useState(initial.date || null)
  const [start, setStart] = useState(initial.start ?? null)
  const [done, setDone] = useState(null)

  const svc = serviceId ? SERVICE_BY_ID[serviceId] : null
  const today = startOfDay(new Date())
  const nowMin = new Date().getHours() * 60 + new Date().getMinutes()
  const days = useMemo(() => Array.from({ length: 14 }, (_, i) => addDays(today, i)), [])

  const free = (key, t) => {
    const s = parseTime(t)
    if (key === dateKey(today) && s < nowMin + 30) return false
    return isSlotFree(all, { barberId, date: key, start: s, duration: svc.duration })
  }
  const dayHasRoom = (d) => svc && barberId && SLOT_TIMES.some((t) => free(dateKey(d), t))

  const groups = []
  for (const s of DAILY_SERVICES) {
    let g = groups.find((x) => x.name === s.category)
    if (!g) groups.push((g = { name: s.category, items: [] }))
    g.items.push(s)
  }

  const titles = { 1: 'Choose a service', 2: 'Choose a barber', 3: 'Pick a time', 4: 'Review and confirm' }
  const back = () => (step > 1 ? setStep(step - 1) : onExit())

  if (done) {
    const b = BARBER_BY_ID[done.barberId]
    return (
      <div className="px-6 pt-16 pb-8 text-center flex flex-col items-center min-h-full">
        <div className="w-20 h-20 rounded-full bg-[#C47840] flex items-center justify-center text-[#080808]">
          <Check size={40} strokeWidth={3} aria-hidden="true" />
        </div>
        <h1 className="font-grotesk font-bold text-[1.7rem] mt-6">You're booked</h1>
        <p className="text-[0.9rem] text-[#9d9d95] mt-2 max-w-[260px]">We'll remind you before your visit. See you at The Alcove.</p>
        <div className="w-full bg-[#171716] border border-[#262624] rounded-3xl p-5 mt-8 text-left">
          <p className="font-grotesk font-semibold text-[1.1rem]">{done.serviceName}</p>
          <p className="text-[0.85rem] text-[#d8d5cd] mt-3">{dayLabel(done.date)} at {fmtTime(done.start)}</p>
          <p className="flex items-center gap-2 text-[0.85rem] text-[#9d9d95] mt-1.5"><Avatar barber={b} size={22} /> {b ? b.name : 'First available barber'}</p>
          <p className="font-grotesk text-[#C47840] mt-3">{peso(done.price)}, pay at the shop</p>
        </div>
        <div className="w-full mt-auto pt-8 space-y-3">
          <PrimaryButton onClick={onExit}>Back to home</PrimaryButton>
        </div>
      </div>
    )
  }

  return (
    <div className="px-5 pb-8 min-h-full flex flex-col">
      <header className="flex items-center gap-2 pt-3 pb-4">
        <button type="button" onClick={back} aria-label="Back" className="w-11 h-11 -ml-2 rounded-full flex items-center justify-center active:bg-[#1a1a19]">
          <ChevronLeft size={22} />
        </button>
        <div>
          <p className="text-[0.74rem] text-[#77756f]">Step {step} of 4</p>
          <h1 className="font-grotesk font-bold text-[1.35rem] leading-tight">{titles[step]}</h1>
        </div>
      </header>
      <div className="flex gap-1.5 mb-5" aria-hidden="true">
        {[1, 2, 3, 4].map((i) => <span key={i} className={`h-1 flex-1 rounded-full ${i <= step ? 'bg-[#C47840]' : 'bg-[#242423]'}`} />)}
      </div>

      {step === 1 && (
        <div className="space-y-5">
          {groups.map((g) => (
            <section key={g.name} aria-label={g.name}>
              <h2 className="text-[0.8rem] text-[#9d9d95] mb-2">{g.name}</h2>
              <ul className="space-y-2.5">
                {g.items.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => { setServiceId(s.id); setStep(2) }}
                      className={`w-full text-left flex items-center gap-3 rounded-2xl p-4 border active:scale-[0.99] transition-transform ${serviceId === s.id ? 'border-[#C47840] bg-[#C47840]/10' : 'border-[#262624] bg-[#131312]'}`}
                    >
                      <span className="flex-1 min-w-0">
                        <span className="block font-medium text-[0.95rem]">{s.name}</span>
                        <span className="block text-[0.78rem] text-[#9d9d95] mt-0.5">{fmtDuration(s.duration)}</span>
                      </span>
                      <span className="font-grotesk font-semibold">{peso(s.price)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}

      {step === 2 && (
        <ul className="space-y-2.5">
          {[{ id: 'any', name: 'First available', role: 'Soonest chair, any barber' }, ...BARBERS].map((b) => (
            <li key={b.id}>
              <button
                type="button"
                onClick={() => { setBarberId(b.id); setDate(null); setStart(null); setStep(3) }}
                className={`w-full text-left flex items-center gap-3.5 rounded-2xl p-3.5 border active:scale-[0.99] transition-transform ${barberId === b.id ? 'border-[#C47840] bg-[#C47840]/10' : 'border-[#262624] bg-[#131312]'}`}
              >
                <Avatar barber={b.photo ? b : null} size={52} />
                <span>
                  <span className="block font-medium text-[0.98rem]">{b.name}</span>
                  <span className="block text-[0.78rem] text-[#9d9d95]">{b.role}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {step === 3 && (
        <div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5 pb-3" role="listbox" aria-label="Choose a day">
            {days.map((d) => {
              const k = dateKey(d)
              const room = dayHasRoom(d)
              const sel = date === k
              return (
                <button
                  key={k}
                  type="button"
                  role="option"
                  aria-selected={sel}
                  disabled={!room}
                  onClick={() => { setDate(k); setStart(null) }}
                  className={`shrink-0 w-[58px] py-3 rounded-2xl text-center border transition-colors ${sel ? 'bg-[#C47840] border-[#C47840] text-[#080808]' : room ? 'bg-[#131312] border-[#262624]' : 'bg-transparent border-[#1c1c1b] text-[#4a4945]'}`}
                >
                  <span className="block text-[0.68rem] opacity-80">{d.toLocaleDateString('en-PH', { weekday: 'short' })}</span>
                  <span className="block font-grotesk font-bold text-[1.25rem] leading-tight">{d.getDate()}</span>
                  <span className="block text-[0.62rem] opacity-70">{room ? d.toLocaleDateString('en-PH', { month: 'short' }) : 'Full'}</span>
                </button>
              )
            })}
          </div>
          {!date ? (
            <p className="text-[0.85rem] text-[#77756f] text-center py-10">Choose a day to see the free times.</p>
          ) : (
            <>
              <p className="text-[0.8rem] text-[#9d9d95] mt-3 mb-3">Free times for {dayLabel(date)}</p>
              <div className="grid grid-cols-3 gap-2.5">
                {SLOT_TIMES.map((t) => {
                  const ok = free(date, t)
                  const sel = start === parseTime(t)
                  return (
                    <button
                      key={t}
                      type="button"
                      disabled={!ok}
                      onClick={() => setStart(parseTime(t))}
                      className={`min-h-[46px] rounded-xl text-[0.85rem] font-medium border transition-colors ${sel ? 'bg-[#C47840] border-[#C47840] text-[#080808]' : ok ? 'bg-[#131312] border-[#262624]' : 'border-[#1c1c1b] text-[#4a4945] line-through'}`}
                    >
                      {t}
                    </button>
                  )
                })}
              </div>
            </>
          )}
          <div className="mt-8">
            <PrimaryButton disabled={start == null} onClick={() => setStep(4)}>Continue</PrimaryButton>
          </div>
        </div>
      )}

      {step === 4 && svc && (
        <div className="flex-1 flex flex-col">
          <div className="bg-[#171716] border border-[#262624] rounded-3xl p-5">
            <p className="font-grotesk font-semibold text-[1.15rem]">{svc.name}</p>
            <dl className="mt-4 space-y-3 text-[0.88rem]">
              <div className="flex justify-between"><dt className="text-[#9d9d95]">When</dt><dd>{dayLabel(date)} at {fmtTime(start)}</dd></div>
              <div className="flex justify-between items-center"><dt className="text-[#9d9d95]">Barber</dt><dd className="flex items-center gap-2"><Avatar barber={BARBER_BY_ID[barberId]} size={22} />{barberName(barberId) === 'Any barber' ? 'First available' : barberName(barberId)}</dd></div>
              <div className="flex justify-between"><dt className="text-[#9d9d95]">Length</dt><dd>{fmtDuration(svc.duration)}</dd></div>
              <div className="flex justify-between border-t border-[#262624] pt-3"><dt className="text-[#9d9d95]">Total</dt><dd className="font-grotesk font-bold text-[1.1rem] text-[#C47840]">{peso(svc.price)}</dd></div>
            </dl>
          </div>
          <p className="text-[0.8rem] text-[#77756f] mt-4">Pay at the shop. You'll get a confirmation now and a reminder before your visit.</p>
          <div className="mt-auto pt-8">
            <PrimaryButton onClick={() => setDone(onConfirm({ svc, barberId, date, start }))}>Confirm booking</PrimaryButton>
          </div>
        </div>
      )}
    </div>
  )
}

/* ───────────── Visits, rewards, profile ───────────── */

const PAST = [
  { id: 'p1', serviceId: 'basic-haircut', barberId: 'kim', daysAgo: 14 },
  { id: 'p2', serviceId: 'haircut-beard', barberId: 'kim', daysAgo: 33 },
  { id: 'p3', serviceId: 'basic-haircut', barberId: 'william', daysAgo: 52 },
  { id: 'p4', serviceId: 'haircut-consultation', barberId: 'vin', daysAgo: 81 },
]

function Visits({ upcoming, onCancel, onRebookPast, returning }) {
  const past = returning ? PAST : []
  return (
    <div className="px-5 pb-6">
      <h1 className="font-grotesk font-bold text-[1.6rem] pt-3">Your visits</h1>
      <h2 className="text-[0.82rem] text-[#9d9d95] mt-5 mb-3">Upcoming</h2>
      {upcoming.length ? (
        <ul className="space-y-3">{upcoming.map((u) => <UpcomingCard key={u.id} u={u} onCancel={onCancel} />)}</ul>
      ) : (
        <p className="text-[0.85rem] text-[#77756f] bg-[#131312] rounded-2xl p-4">No upcoming visits. Tap Book to find a time.</p>
      )}
      <h2 className="text-[0.82rem] text-[#9d9d95] mt-7 mb-3">Past visits</h2>
      {past.length === 0 && (
        <p className="text-[0.85rem] text-[#77756f] bg-[#131312] rounded-2xl p-4">Your past visits will appear here after your first cut.</p>
      )}
      <ul className="space-y-3">
        {past.map((p) => {
          const s = SERVICE_BY_ID[p.serviceId]
          const b = BARBER_BY_ID[p.barberId]
          return (
            <li key={p.id} className="flex items-center gap-3 bg-[#131312] border border-[#222220] rounded-2xl p-3.5">
              <Avatar barber={b} size={40} />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-[0.9rem] truncate">{s.name}</p>
                <p className="text-[0.76rem] text-[#9d9d95]">{b.name}, {fmtDay(addDays(new Date(), -p.daysAgo), { month: 'short', day: 'numeric' })}</p>
              </div>
              <GhostButton onClick={() => onRebookPast(p)} className="!min-h-[38px] !px-3 text-[0.8rem]">Rebook</GhostButton>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function Rewards({ toast, user }) {
  const code = `${user.first.toUpperCase().replace(/[^A-Z]/g, '') || 'FRIEND'}-PARE`
  return (
    <div className="px-5 pb-6">
      <h1 className="font-grotesk font-bold text-[1.6rem] pt-3">Rewards</h1>
      <section className="mt-5 bg-[#171716] border border-[#262624] rounded-3xl p-5" aria-label="Stamp card">
        <div className="flex items-baseline justify-between">
          <h2 className="font-grotesk font-semibold">Stamp card</h2>
          <span className="font-grotesk text-[#C47840]">{user.stamps} of 10</span>
        </div>
        <ol className="grid grid-cols-5 gap-3 mt-4">
          {Array.from({ length: 10 }, (_, i) => {
            const filled = i < user.stamps
            const prize = i === 9
            return (
              <li
                key={i}
                aria-label={filled ? `Cut ${i + 1}, stamped` : prize ? 'Free haircut' : `Cut ${i + 1}, not yet`}
                className={`aspect-square rounded-full flex items-center justify-center ${filled ? 'bg-[#C47840] text-[#080808]' : prize ? 'border-2 border-[#C47840] text-[#C47840]' : 'border border-dashed border-[#3a3a37] text-[#4a4945]'}`}
              >
                {prize ? <Gift size={18} /> : <Scissors size={16} />}
              </li>
            )
          })}
        </ol>
        <p className="text-[0.82rem] text-[#9d9d95] mt-4">{10 - user.stamps} more cuts and your next Basic Haircut is free. Stamps are added automatically after each visit.</p>
      </section>

      <section className="mt-4 bg-[#131312] border border-[#222220] rounded-3xl p-5" aria-label="Refer a friend">
        <h2 className="font-grotesk font-semibold">Bring a friend</h2>
        <p className="text-[0.84rem] text-[#9d9d95] mt-1.5">You both get ₱200 off your next cut when they book with your code.</p>
        <div className="flex items-center gap-3 mt-4">
          <div className="flex-1 font-grotesk font-semibold tracking-wider text-[1rem] bg-[#0c0c0b] border border-dashed border-[#3a3a37] rounded-xl py-3 text-center">{code}</div>
          <GhostButton onClick={() => toast('Code copied. Send it to a friend.')} className="flex items-center gap-2"><Share2 size={15} /> Share</GhostButton>
        </div>
      </section>
    </div>
  )
}

function Switch({ checked, onChange, label }) {
  return (
    <button type="button" role="switch" aria-checked={checked} aria-label={label} onClick={() => onChange(!checked)} className={`relative w-12 h-7 rounded-full shrink-0 transition-colors ${checked ? 'bg-[#C47840]' : 'bg-[#33332f]'}`}>
      <span className={`absolute top-[3px] left-[3px] w-[22px] h-[22px] rounded-full bg-white transition-transform ${checked ? 'translate-x-5' : ''}`} />
    </button>
  )
}

function Profile({ user, onLogout }) {
  const [prefs, setPrefs] = useState({ reminders: true, slots: user.returning, offers: false })
  const initials = user.name.split(/\s+/).map((p) => p[0]).slice(0, 2).join('').toUpperCase()
  const barber = BARBER_BY_ID[ME.usualBarber]
  const rows = [
    ['reminders', 'Appointment reminders', 'A message the day before'],
    ['slots', 'Slots opening with Kim', 'When your usual barber has a cancellation'],
    ['offers', 'Offers and news', 'Only the good ones'],
  ]
  return (
    <div className="px-5 pb-6">
      <div className="flex flex-col items-center pt-6">
        <span className="w-20 h-20 rounded-full bg-[#C47840]/20 text-[#E0A070] font-grotesk font-bold text-[1.7rem] flex items-center justify-center">{initials}</span>
        <h1 className="font-grotesk font-bold text-[1.4rem] mt-3">{user.name}</h1>
        <p className="text-[0.82rem] text-[#9d9d95]">{user.phone}</p>
      </div>
      {user.returning && (
      <section className="mt-6 bg-[#131312] border border-[#222220] rounded-3xl p-4" aria-label="Your usual">
        <h2 className="text-[0.8rem] text-[#9d9d95] mb-3">Your usual</h2>
        <div className="flex items-center gap-3">
          <Avatar barber={barber} size={44} />
          <div>
            <p className="font-medium text-[0.92rem]">{barber.name}, {SERVICE_BY_ID[ME.usualService].name}</p>
            <p className="text-[0.78rem] text-[#9d9d95]">{ME.pref}</p>
          </div>
        </div>
      </section>
      )}
      <section className="mt-4 bg-[#131312] border border-[#222220] rounded-3xl divide-y divide-[#1f1f1e]" aria-label="Notifications">
        {rows.map(([k, title, sub]) => (
          <div key={k} className="flex items-center gap-4 p-4">
            <div className="flex-1">
              <p className="text-[0.9rem] font-medium">{title}</p>
              <p className="text-[0.76rem] text-[#9d9d95]">{sub}</p>
            </div>
            <Switch checked={prefs[k]} onChange={(v) => setPrefs({ ...prefs, [k]: v })} label={title} />
          </div>
        ))}
      </section>
      <GhostButton onClick={onLogout} className="w-full mt-6">Log out</GhostButton>
    </div>
  )
}

/* ───────────── Shell ───────────── */

const TABS = [
  { id: 'home', label: 'Home', icon: House },
  { id: 'book', label: 'Book', icon: CalendarPlus },
  { id: 'visits', label: 'Visits', icon: Ticket },
  { id: 'rewards', label: 'Rewards', icon: Gift },
  { id: 'me', label: 'Profile', icon: User },
]

export default function ClientApp({ pushSignal, user, onLogout }) {
  const [tab, setTab] = useState('home')
  const [bookInit, setBookInit] = useState({})
  const [sheet, setSheet] = useState(null)
  const [banner, setBanner] = useState(null)
  const [msg, setMsg] = useState(null)
  const [dropSample, setDropSample] = useState(false)
  const scrollRef = useRef(null)

  const seed = useMemo(() => buildSeed(), [])
  const stored = useStoredBookings()
  const all = useMemo(() => [...seed, ...stored], [seed, stored])

  const toast = (m) => {
    setMsg(m)
    setTimeout(() => setMsg(null), 3200)
  }

  const sample = useMemo(() => {
    const day = addDays(startOfDay(new Date()), 1)
    const b = ['arthur', 'william', 'paulo', 'vin'].map((id) => BARBER_BY_ID[id]).find((x) => isWorking(x, day))
    return { id: 'sample-next', serviceName: 'Haircut & Beard trim', date: dateKey(day), start: 16 * 60, barberId: b.id }
  }, [])

  const mine = stored
    .filter((b) => b.source === 'app' && b.date >= dateKey(startOfDay(new Date())))
    .map((b) => ({ id: b.id, serviceName: b.serviceName, date: b.date, start: b.start, barberId: b.barberId, stored: true }))
  const upcoming = [...(dropSample || !user.returning ? [] : [sample]), ...mine].sort((a, b) => a.date.localeCompare(b.date) || a.start - b.start)

  const go = (t) => {
    setTab(t)
    if (t === 'book') setBookInit({})
    scrollRef.current?.scrollTo({ top: 0 })
  }

  const createBooking = ({ svc, barberId, date, start }) => {
    const b = BARBER_BY_ID[barberId]
    const id = 'BK-' + Math.random().toString(36).slice(2, 8).toUpperCase()
    saveStoredBooking({
      id,
      service: { id: svc.id, name: svc.name, duration: svc.durationLabel, price: peso(svc.price), desc: '' },
      barber: b ? { id: b.id, name: b.name, role: b.role, img: b.photo } : { id: 'any', name: 'Any Available Artist', role: 'Team selection', img: null },
      date,
      time: fmtTime(start),
      client: { name: user.name, phone: user.phone, email: '', notes: '' },
      createdAt: new Date().toISOString(),
      source: 'app',
    })
    return { id, serviceName: svc.name, barberId, date, start, price: svc.price }
  }

  const rebookUsual = (slot) => {
    const svc = SERVICE_BY_ID[ME.usualService]
    const booking = createBooking({ svc, barberId: ME.usualBarber, date: slot.date, start: slot.start })
    setSheet({ booking })
  }

  const cancel = (u) => {
    if (u.stored) removeStoredBooking(u.id)
    else setDropSample(true)
    toast('Cancelled. Your slot goes to the next person on the waitlist.')
  }

  const seenPush = useRef(pushSignal.n)
  useEffect(() => {
    if (pushSignal.n === seenPush.current) return
    seenPush.current = pushSignal.n
    setBanner(pushSignal)
    const t = setTimeout(() => setBanner(null), 7000)
    return () => clearTimeout(t)
  }, [pushSignal])

  const tapBanner = () => {
    if (banner?.kind === 'slot') {
      const svc = SERVICE_BY_ID[ME.usualService]
      const slot = nextAvailable(all, { barberId: ME.usualBarber, duration: svc.duration })
      setBookInit(slot ? { step: 4, serviceId: svc.id, barberId: ME.usualBarber, date: slot.date, start: slot.start } : {})
      setTab('book')
    } else {
      setTab('visits')
    }
    setBanner(null)
  }

  const bannerText = (() => {
    if (!banner) return ''
    if (banner.kind === 'slot') {
      const svc = SERVICE_BY_ID[ME.usualService]
      const slot = nextAvailable(all, { barberId: ME.usualBarber, duration: svc.duration })
      return slot ? `A slot just opened with Kim: ${dayLabel(slot.date)} at ${fmtTime(slot.start)}. Tap to book it.` : 'A slot just opened with Kim.'
    }
    return `Reminder: ${sample.serviceName} ${dayLabel(sample.date).toLowerCase()} at ${fmtTime(sample.start)} with ${barberName(sample.barberId)}.`
  })()

  return (
    <div className="relative flex flex-col h-full bg-[#0c0c0b] text-[#ece9e3] font-sans">
      <StatusBar />

      {banner && (
        <button
          type="button"
          onClick={tapBanner}
          className="absolute top-10 left-3 right-3 z-50 text-left bg-[#232322] border border-[#3a3a37] rounded-2xl p-3.5 shadow-2xl shadow-black/60 flex gap-3 items-start animate-[slideDown_.35s_ease-out]"
        >
          <span className="w-9 h-9 rounded-xl bg-[#C47840] text-[#080808] font-grotesk font-bold flex items-center justify-center shrink-0">P</span>
          <span>
            <span className="block text-[0.74rem] text-[#9d9d95]">PARE, now</span>
            <span className="block text-[0.86rem] leading-snug mt-0.5">{bannerText}</span>
          </span>
        </button>
      )}

      <div ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar">
        {tab === 'home' && <Home all={all} upcoming={upcoming} onRebook={rebookUsual} onGo={go} onCancel={cancel} user={user} />}
        {tab === 'book' && (
          <BookFlow key={JSON.stringify(bookInit)} all={all} initial={bookInit} onExit={() => go('home')} onConfirm={createBooking} />
        )}
        {tab === 'visits' && (
          <Visits
            upcoming={upcoming}
            onCancel={cancel}
            returning={user.returning}
            onRebookPast={(p) => {
              setBookInit({ step: 3, serviceId: p.serviceId, barberId: p.barberId })
              setTab('book')
            }}
          />
        )}
        {tab === 'rewards' && <Rewards toast={toast} user={user} />}
        {tab === 'me' && <Profile user={user} onLogout={onLogout} />}
      </div>

      {msg && (
        <div role="status" className="absolute left-5 right-5 bottom-[104px] z-40 bg-[#232322] border border-[#3a3a37] rounded-xl px-4 py-3 text-[0.84rem] text-center shadow-xl">
          {msg}
        </div>
      )}

      <nav aria-label="App sections" className="shrink-0 bg-[#0c0c0b]/95 backdrop-blur border-t border-[#1f1f1e] grid grid-cols-5 px-2 pt-2 pb-[26px]">
        {TABS.map((t) => {
          const Icon = t.icon
          const on = tab === t.id
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => go(t.id)}
              aria-current={on ? 'page' : undefined}
              className={`flex flex-col items-center gap-1 py-1.5 text-[0.66rem] font-medium ${on ? 'text-[#C47840]' : 'text-[#77756f]'}`}
            >
              <Icon size={21} aria-hidden="true" />
              {t.label}
            </button>
          )
        })}
      </nav>

      {sheet && (
        <Sheet title="Booked" onClose={() => setSheet(null)}>
          <p className="text-[0.95rem] font-medium">{sheet.booking.serviceName}</p>
          <p className="text-[0.88rem] text-[#9d9d95] mt-1">
            {dayLabel(sheet.booking.date)} at {fmtTime(sheet.booking.start)} with {barberName(sheet.booking.barberId)}
          </p>
          <div className="flex gap-3 mt-6">
            <GhostButton
              className="flex-1"
              onClick={() => {
                removeStoredBooking(sheet.booking.id)
                setSheet(null)
                toast('Booking undone.')
              }}
            >
              Undo
            </GhostButton>
            <PrimaryButton className="flex-1 !min-h-[44px]" onClick={() => { setSheet(null); go('visits') }}>View visit</PrimaryButton>
          </div>
        </Sheet>
      )}
    </div>
  )
}
