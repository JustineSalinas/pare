import { useMemo, useState } from 'react'
import { CalendarDays, ClipboardList, StickyNote, Phone } from 'lucide-react'
import {
  BARBERS, OPEN_STATUSES, buildSeed, addDays, dateKey, startOfDay, fmtTime, fmtDay, fmtDuration, peso, isWorking,
  hoursFor, useNow, useStoredBookings,
} from '../demo/data'
import { StatusBadge } from '../admin/ui'
import { StatusBar, PrimaryButton, GhostButton } from './shared'

const NEXT_STEP = {
  confirmed: { to: 'arrived', label: 'Mark arrived' },
  arrived: { to: 'in_chair', label: 'Start the cut' },
  in_chair: { to: 'completed', label: 'Finish the cut' },
}

export default function StaffApp({ onSignOut }) {
  const now = useNow(30000)
  const today = startOfDay(now)
  const key = dateKey(today)
  const barber = BARBERS.find((b) => b.id === 'kim' && isWorking(b, today)) || BARBERS.find((b) => isWorking(b, today))
  const [tab, setTab] = useState('today')
  const [overrides, setOverrides] = useState({})

  const seed = useMemo(() => buildSeed(), [])
  const stored = useStoredBookings()
  const mine = useMemo(() => [...seed, ...stored].filter((b) => b.barberId === barber.id && b.status !== 'cancelled'), [seed, stored, barber.id])

  const withStatus = (b) => ({ ...b, status: overrides[b.id] || b.status })
  const todays = mine.filter((b) => b.date === key).map(withStatus).sort((a, b) => a.start - b.start)
  const active = todays.find((b) => b.status === 'in_chair') || todays.find((b) => OPEN_STATUSES.includes(b.status))
  const rest = todays.filter((b) => b !== active)
  const earned = todays.filter((b) => b.status === 'completed').reduce((s, b) => s + b.price, 0)
  const doneCount = todays.filter((b) => b.status === 'completed').length
  const set = (b, status) => setOverrides((o) => ({ ...o, [b.id]: status }))

  return (
    <div className="flex flex-col h-full bg-[#0c0c0b] text-[#ece9e3] font-sans">
      <StatusBar />
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-6">
        <header className="flex items-center gap-3 pt-3">
          <img src={barber.photo} alt="" className="w-12 h-12 rounded-full object-cover object-top bg-[#222]" />
          <div>
            <p className="text-[0.76rem] text-[#9d9d95]">{fmtDay(today, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
            <h1 className="font-grotesk font-bold text-[1.4rem] leading-tight">{barber.name}'s chair</h1>
          </div>
          <button type="button" onClick={onSignOut} className="ml-auto min-h-[44px] px-2 text-[0.8rem] text-[#9d9d95] active:text-white">
            Sign out
          </button>
        </header>

        {tab === 'today' ? (
          <>
            <div className="grid grid-cols-3 gap-2.5 mt-5">
              {[
                ['Booked', todays.length],
                ['Done', doneCount],
                ['Earned', peso(earned)],
              ].map(([k, v]) => (
                <div key={k} className="bg-[#131312] border border-[#222220] rounded-2xl py-3 text-center">
                  <div className="font-grotesk font-bold text-[1.05rem]">{v}</div>
                  <div className="text-[0.7rem] text-[#77756f]">{k}</div>
                </div>
              ))}
            </div>

            {active ? (
              <section className="mt-5 bg-[#171716] border border-[#C47840]/50 rounded-3xl p-5" aria-label="Current client">
                <p className="text-[0.78rem] text-[#C47840] font-medium">{active.status === 'in_chair' ? 'In your chair now' : 'Up next'}</p>
                <h2 className="font-grotesk font-bold text-[1.5rem] leading-tight mt-1">{active.clientName}</h2>
                <p className="text-[0.88rem] text-[#d8d5cd] mt-2">{active.serviceName}</p>
                <p className="text-[0.82rem] text-[#9d9d95] mt-1">
                  {fmtTime(active.start)}, {fmtDuration(active.duration)}, <span className="font-grotesk">{peso(active.price)}</span>
                </p>
                {active.phone && <p className="flex items-center gap-1.5 text-[0.78rem] text-[#77756f] mt-2"><Phone size={12} /> {active.phone}</p>}
                {active.notes && (
                  <p className="flex gap-2 text-[0.82rem] bg-[#0f0f0e] rounded-xl px-3 py-2.5 mt-4">
                    <StickyNote size={14} className="text-[#C47840] mt-0.5 shrink-0" aria-hidden="true" /> {active.notes}
                  </p>
                )}
                <div className="flex flex-col gap-2.5 mt-5">
                  <PrimaryButton onClick={() => set(active, NEXT_STEP[active.status].to)}>{NEXT_STEP[active.status].label}</PrimaryButton>
                  {active.status !== 'in_chair' && <GhostButton onClick={() => set(active, 'no_show')}>Mark as no-show</GhostButton>}
                </div>
              </section>
            ) : (
              <p className="mt-5 text-[0.88rem] text-[#9d9d95] bg-[#131312] rounded-2xl p-4">
                {todays.length ? 'That is everyone for today. Nice work.' : 'No appointments today. Enjoy the day off.'}
              </p>
            )}

            {rest.length > 0 && (
              <section className="mt-6" aria-label="Rest of the day">
                <h2 className="text-[0.82rem] text-[#9d9d95] mb-3">Rest of the day</h2>
                <ul className="space-y-2.5">
                  {rest.map((b) => (
                    <li key={b.id} className="flex items-center gap-3 bg-[#131312] border border-[#222220] rounded-2xl p-3.5">
                      <span className="w-[62px] font-grotesk text-[0.85rem] text-[#d8d5cd] shrink-0">{fmtTime(b.start)}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-medium text-[0.88rem] truncate">{b.clientName}</span>
                        <span className="block text-[0.74rem] text-[#9d9d95] truncate">{b.serviceName}</span>
                      </span>
                      <StatusBadge status={b.status} />
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        ) : (
          <section className="mt-5" aria-label="This week">
            <h2 className="text-[0.82rem] text-[#9d9d95] mb-3">The next 7 days</h2>
            <ul className="space-y-2.5">
              {Array.from({ length: 7 }, (_, i) => {
                const d = addDays(today, i)
                const k = dateKey(d)
                const working = isWorking(barber, d)
                const count = mine.filter((b) => b.date === k && b.status !== 'cancelled').length
                const [open, close] = hoursFor(d)
                const cap = Math.floor((close - open) / 45)
                return (
                  <li key={k} className="flex items-center gap-3 bg-[#131312] border border-[#222220] rounded-2xl p-3.5">
                    <span className="w-[74px] text-[0.84rem]">{i === 0 ? 'Today' : fmtDay(d, { weekday: 'short', day: 'numeric' })}</span>
                    {working ? (
                      <>
                        <span className="flex-1 h-2 rounded-full bg-[#222221] overflow-hidden" aria-hidden="true">
                          <span className="block h-full bg-[#C47840] rounded-full" style={{ width: `${Math.min(100, (count / cap) * 100)}%` }} />
                        </span>
                        <span className="font-grotesk text-[0.85rem] w-[78px] text-right">{count} booked</span>
                      </>
                    ) : (
                      <span className="flex-1 text-[0.82rem] text-[#77756f]">Day off</span>
                    )}
                  </li>
                )
              })}
            </ul>
          </section>
        )}
      </div>

      <nav aria-label="Staff app sections" className="shrink-0 border-t border-[#1f1f1e] grid grid-cols-2 px-8 pt-2 pb-[26px]">
        {[
          ['today', 'Today', ClipboardList],
          ['week', 'This week', CalendarDays],
        ].map(([id, label, Icon]) => (
          <button key={id} type="button" onClick={() => setTab(id)} aria-current={tab === id ? 'page' : undefined} className={`flex flex-col items-center gap-1 py-1.5 text-[0.68rem] font-medium ${tab === id ? 'text-[#C47840]' : 'text-[#77756f]'}`}>
            <Icon size={21} aria-hidden="true" /> {label}
          </button>
        ))}
      </nav>
    </div>
  )
}
