import { useMemo, useState } from 'react'
import { ArrowRight, BellRing, Send, Table2, BarChart3 } from 'lucide-react'
import {
  BARBERS, BARBER_BY_ID, OPEN_STATUSES, hoursFor, isWorking, dateKey, addDays, startOfDay, fmtTime, fmtDay, peso, barberName,
} from '../../demo/data'
import { Panel, Button, StatusBadge, BarberChip, Avatar } from '../ui'
import { Board, StatusLegend } from './Schedule'

function Tile({ label, value, sub }) {
  return (
    <div className="bg-[#101010] border border-[#262624] rounded-lg px-5 py-4">
      <div className="text-[0.8rem] text-[#9d9d95] mb-2">{label}</div>
      <div className="font-grotesk font-bold text-[2rem] leading-none tracking-tight text-[#ece9e3]">{value}</div>
      <div className="text-[0.76rem] text-[#77756f] mt-2">{sub}</div>
    </div>
  )
}

const until = (mins) => {
  if (mins <= 0) return 'Now'
  if (mins < 60) return `In ${mins} min`
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return `In ${h} hr${m ? ` ${m} min` : ''}`
}

function BookingsChart({ days }) {
  const [asTable, setAsTable] = useState(false)
  const max = Math.max(5, Math.ceil(Math.max(...days.map((d) => d.total)) / 5) * 5)
  const ticks = [max, Math.round(max / 2), 0]
  const sum = days.reduce((s, d) => s + d.total, 0)

  return (
    <Panel
      title="Bookings per day, last 14 days"
      action={
        <Button size="sm" onClick={() => setAsTable((v) => !v)} aria-pressed={asTable}>
          {asTable ? <BarChart3 size={13} /> : <Table2 size={13} />}
          {asTable ? 'View as chart' : 'View as table'}
        </Button>
      }
    >
      {asTable ? (
        <div className="max-h-[236px] overflow-y-auto">
          <table className="w-full text-[0.82rem]">
            <thead>
              <tr className="text-left text-[#77756f]">
                <th className="font-normal py-1.5">Day</th>
                <th className="font-normal py-1.5 text-right">Bookings</th>
                <th className="font-normal py-1.5 text-right">No-shows</th>
              </tr>
            </thead>
            <tbody>
              {days.map((d) => (
                <tr key={d.key} className="border-t border-[#1d1d1c]">
                  <td className="py-1.5">{fmtDay(d.date)}</td>
                  <td className="py-1.5 text-right font-grotesk">{d.total}</td>
                  <td className="py-1.5 text-right font-grotesk">{d.noShow}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <>
          <p className="sr-only">{`${sum} bookings across the last 14 days. Use the table view for exact figures.`}</p>
          <div className="flex gap-3" role="img" aria-label={`Bar chart of bookings per day. Total ${sum} in 14 days.`}>
            <div className="flex flex-col justify-between h-[168px] text-[0.7rem] text-[#77756f] font-grotesk text-right w-5" aria-hidden="true">
              {ticks.map((t) => <span key={t} className="leading-none">{t}</span>)}
            </div>
            <div className="relative flex-1">
              <div className="absolute inset-x-0 top-0 h-[168px] flex flex-col justify-between pointer-events-none" aria-hidden="true">
                {ticks.map((t) => <span key={t} className="block h-px bg-[#1f1f1e]" />)}
              </div>
              <div className="relative h-[168px] flex items-end gap-[6px]">
                {days.map((d, i) => (
                  <div key={d.key} className="group relative flex-1 h-full flex items-end" tabIndex={0} aria-hidden="true">
                    <div
                      className="w-full rounded-t-[4px] bg-[#C47840] group-hover:bg-[#D9906A] group-focus-visible:bg-[#D9906A] transition-colors"
                      style={{ height: `${Math.max(2, (d.total / max) * 100)}%`, opacity: d.isToday ? 1 : 0.88 }}
                    />
                    <div className="hidden group-hover:block group-focus-visible:block absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap bg-[#1a1a19] border border-[#33332f] rounded-md px-2.5 py-1.5 text-[0.74rem] shadow-xl pointer-events-none">
                      <div className="text-[#9d9d95]">{fmtDay(d.date)}</div>
                      <div className="font-grotesk font-semibold">{d.total} bookings</div>
                      {d.noShow > 0 && <div className="text-[#E58B7F]">{d.noShow} no-show</div>}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-[6px] mt-2" aria-hidden="true">
                {days.map((d) => (
                  <div key={d.key} className={`flex-1 text-center text-[0.68rem] leading-tight ${d.isToday ? 'text-[#C47840] font-semibold' : 'text-[#77756f]'}`}>
                    <div>{d.date.toLocaleDateString('en-PH', { weekday: 'narrow' })}</div>
                    <div className="font-grotesk">{d.date.getDate()}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </Panel>
  )
}

function RevenueByBarber({ rows }) {
  const max = Math.max(1, ...rows.map((r) => r.total))
  return (
    <Panel title="Revenue by barber, last 7 days">
      <ul className="space-y-3.5">
        {rows.map((r) => (
          <li key={r.barber.id} className="grid grid-cols-[92px_1fr_76px] items-center gap-3">
            <BarberChip barber={r.barber} size={24} />
            <div className="h-3 bg-[#171716] rounded-[3px]" aria-hidden="true">
              <div className="h-full bg-[#C47840] rounded-r-[4px] rounded-l-[2px]" style={{ width: `${(r.total / max) * 100}%` }} />
            </div>
            <span className="font-grotesk text-[0.85rem] text-right">{peso(r.total)}</span>
          </li>
        ))}
      </ul>
      <p className="text-[0.74rem] text-[#77756f] mt-4">Completed appointments only. Owner view in the live platform adds tips and add-ons.</p>
    </Panel>
  )
}

export default function Overview({ state, now, actions, go }) {
  const today = startOfDay(now)
  const key = dateKey(today)
  const nowMin = now.getHours() * 60 + now.getMinutes()
  const hour = now.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  const m = useMemo(() => {
    const all = state.bookings
    const todays = all.filter((b) => b.date === key && b.status !== 'cancelled')
    const remaining = todays.filter((b) => OPEN_STATUSES.includes(b.status)).sort((a, b) => a.start - b.start)
    const collected = todays.filter((b) => b.status === 'completed').reduce((s, b) => s + b.price, 0)
    const stillToCome = remaining.reduce((s, b) => s + b.price, 0)

    const [open, close] = hoursFor(today)
    const working = BARBERS.filter((b) => isWorking(b, today)).length
    const bookedMins = todays.filter((b) => b.status !== 'no_show').reduce((s, b) => s + b.duration, 0)
    const util = working ? Math.round((bookedMins / (working * (close - open))) * 100) : 0

    const past30 = all.filter((b) => b.date >= dateKey(addDays(today, -30)) && b.date < key)
    const done = past30.filter((b) => b.status === 'completed').length
    const ns = past30.filter((b) => b.status === 'no_show').length
    const noShowRate = done + ns ? Math.round((ns / (done + ns)) * 1000) / 10 : 0

    const days = Array.from({ length: 14 }, (_, i) => {
      const d = addDays(today, i - 13)
      const k = dateKey(d)
      const list = all.filter((b) => b.date === k && b.status !== 'cancelled')
      return { date: d, key: k, total: list.length, noShow: list.filter((b) => b.status === 'no_show').length, isToday: k === key }
    })

    const from = dateKey(addDays(today, -6))
    const rev = BARBERS.map((barber) => ({
      barber,
      total: all.filter((b) => b.barberId === barber.id && b.status === 'completed' && b.date >= from && b.date <= key).reduce((s, b) => s + b.price, 0),
    })).sort((a, b) => b.total - a.total)

    let upcoming = remaining
    let upcomingLabel = 'Next up today'
    if (!remaining.length) {
      const tomorrow = dateKey(addDays(today, 1))
      upcoming = all.filter((b) => b.date === tomorrow && b.status === 'confirmed').sort((a, b) => a.start - b.start)
      upcomingLabel = 'Nothing left today. First up tomorrow'
    }
    return { todays, remaining, collected, stillToCome, util, noShowRate, days, rev, upcoming, upcomingLabel, past30Count: done + ns }
  }, [state.bookings, key])

  const waiting = state.waitlist.filter((w) => w.status === 'waiting').length

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-grotesk font-bold text-[1.7rem] tracking-tight">{greeting}, Vin</h2>
        <p className="text-[0.88rem] text-[#9d9d95] mt-1">
          {fmtDay(today, { weekday: 'long', month: 'long', day: 'numeric' })}. {m.remaining.length} of {m.todays.length} appointments still to go.
        </p>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <Tile label="Appointments today" value={m.todays.length} sub={`${m.remaining.length} still to come`} />
        <Tile label="Revenue collected today" value={peso(m.collected)} sub={`${peso(m.stillToCome)} still booked`} />
        <Tile label="Chair time booked" value={`${m.util}%`} sub="Across barbers working today" />
        <Tile label="No-show rate" value={`${m.noShowRate}%`} sub={`Last 30 days, ${m.past30Count} finished visits`} />
      </div>

      <Panel
        title="Today on the floor"
        action={<Button size="sm" onClick={() => go('schedule')}>Open full schedule <ArrowRight size={13} /></Button>}
        pad={false}
        className="pb-4"
      >
        <div className="px-5">
          <Board date={today} bookings={state.bookings} now={now} />
          <div className="pt-3 border-t border-[#222220] mt-1"><StatusLegend /></div>
        </div>
      </Panel>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <Panel
          title={m.upcomingLabel}
          action={<Button size="sm" onClick={() => go('bookings')}>All bookings <ArrowRight size={13} /></Button>}
        >
          {m.upcoming.length === 0 ? (
            <p className="text-[0.85rem] text-[#77756f]">No confirmed appointments yet. New bookings appear here the moment a client books.</p>
          ) : (
            <ul className="divide-y divide-[#1d1d1c]">
              {m.upcoming.slice(0, 5).map((b) => (
                <li key={b.id} className="flex items-center gap-3 py-2.5">
                  <Avatar name={b.clientName} size={34} />
                  <div className="min-w-0 flex-1">
                    <div className="text-[0.88rem] font-medium truncate">{b.clientName}</div>
                    <div className="text-[0.76rem] text-[#9d9d95] truncate">{b.serviceName}</div>
                  </div>
                  <BarberChip barber={BARBER_BY_ID[b.barberId]} />
                  <div className="text-right w-[84px]">
                    <div className="font-grotesk text-[0.85rem]">{fmtTime(b.start)}</div>
                    <div className="text-[0.72rem] text-[#C47840]">{b.date === key ? until(b.start - nowMin) : 'Tomorrow'}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title={`Waitlist (${waiting} waiting)`}>
          <p className="text-[0.78rem] text-[#77756f] mb-3">
            When someone cancels, the freed slot is offered to waiting clients automatically.
          </p>
          <ul className="space-y-2.5">
            {state.waitlist.map((w) => (
              <li key={w.id} className="flex items-center gap-3 bg-[#141413] rounded-md px-3 py-2.5">
                <div className="min-w-0 flex-1">
                  <div className="text-[0.84rem] font-medium truncate">{w.name}</div>
                  <div className="text-[0.74rem] text-[#9d9d95] truncate">{w.service}, {barberName(w.barberId)}, {w.window}</div>
                </div>
                {w.status === 'waiting' ? (
                  <Button size="sm" onClick={() => actions.offerWaitlist(w.id)}>
                    <Send size={12} /> Offer a slot
                  </Button>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-[0.74rem] text-[#8FC19C] whitespace-nowrap">
                    <BellRing size={12} /> Offer sent
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <BookingsChart days={m.days} />
        <RevenueByBarber rows={m.rev} />
      </div>
    </div>
  )
}
