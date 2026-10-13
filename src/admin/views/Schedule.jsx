import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Clock, Phone, StickyNote, BellRing } from 'lucide-react'
import {
  BARBERS, BARBER_BY_ID, hoursFor, isWorking, dateKey, addDays, startOfDay, fmtTime, fmtDay, peso, fmtDuration,
} from '../../demo/data'
import { STATUS, StatusBadge, SourceTag, StatusActions, Panel, Button, Avatar, inputCls } from '../ui'

const COUNTED = (b) => b.status !== 'cancelled' && b.status !== 'no_show'

export function StatusLegend() {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[0.75rem] text-[#9d9d95]" aria-label="Status key">
      {Object.entries(STATUS)
        .filter(([k]) => k !== 'cancelled')
        .map(([k, s]) => {
          const Icon = s.icon
          return (
            <li key={k} className="inline-flex items-center gap-1.5">
              <span className="w-4 h-3 rounded-[3px]" style={{ background: s.bg, borderLeft: `3px solid ${s.edge}` }} aria-hidden="true" />
              <Icon size={12} aria-hidden="true" />
              {s.label}
            </li>
          )
        })}
    </ul>
  )
}

export function Board({ date, bookings, now, selectedId, onSelect }) {
  const [open, close] = hoursFor(date)
  const span = close - open
  const key = dateKey(date)
  const isToday = key === dateKey(now)
  const nowMin = now.getHours() * 60 + now.getMinutes()
  const dayBookings = bookings.filter((b) => b.date === key && b.status !== 'cancelled')
  const unassigned = dayBookings.filter((b) => b.barberId === 'any')

  const hours = []
  for (let m = open; m <= close; m += 60) hours.push(m)
  const pct = (m) => `${((m - open) / span) * 100}%`

  const rows = BARBERS.map((b) => ({
    id: b.id,
    barber: b,
    working: isWorking(b, date),
    items: dayBookings.filter((x) => x.barberId === b.id),
  }))
  if (unassigned.length) rows.push({ id: 'any', barber: null, working: true, items: unassigned })

  return (
    <div className="overflow-x-auto overflow-y-hidden">
      <div className="min-w-[1040px]">
        <div className="grid grid-cols-[176px_1fr]">
          <div />
          <div className="relative h-7" aria-hidden="true">
            {hours.map((m) => (
              <span
                key={m}
                className={`absolute top-0 whitespace-nowrap text-[0.7rem] text-[#77756f] font-grotesk ${m === close ? '-translate-x-full' : '-translate-x-1/2'}`}
                style={{ left: pct(m) }}
              >
                {fmtTime(m).replace(':00', '')}
              </span>
            ))}
          </div>
        </div>

        {rows.map((row) => {
          const booked = row.items.filter(COUNTED).reduce((s, b) => s + b.duration, 0)
          const util = row.working ? Math.round((booked / span) * 100) : 0
          return (
            <div key={row.id} className="grid grid-cols-[176px_1fr] border-t border-[#222220]">
              <div className="flex items-center gap-3 py-2 pr-3">
                {row.barber ? (
                  <img src={row.barber.photo} alt="" className="w-10 h-10 rounded-full object-cover object-top bg-[#222]" />
                ) : (
                  <Avatar name="Any barber" size={40} />
                )}
                <div className="min-w-0">
                  <div className="text-[0.88rem] font-medium text-[#ece9e3] truncate">{row.barber ? row.barber.name : 'Any barber'}</div>
                  <div className="text-[0.72rem] text-[#77756f] truncate">
                    {row.working ? (row.barber ? `${util}% booked` : 'Needs a barber') : 'Day off'}
                  </div>
                </div>
              </div>

              <div
                className="relative h-[64px]"
                style={
                  row.working
                    ? undefined
                    : { backgroundImage: 'repeating-linear-gradient(135deg, #131312 0 8px, #0d0d0c 8px 16px)' }
                }
              >
                {hours.slice(1, -1).map((m) => (
                  <span key={m} className="absolute top-0 bottom-0 w-px bg-[#1c1c1b]" style={{ left: pct(m) }} aria-hidden="true" />
                ))}
                {!row.working && (
                  <span className="absolute inset-0 flex items-center justify-center text-[0.75rem] text-[#5f5d57]">Not working today</span>
                )}
                {row.items.map((b) => {
                  const s = STATUS[b.status]
                  const selected = selectedId === b.id
                  const strong = b.status === 'in_chair'
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => onSelect?.(b)}
                      aria-label={`${b.clientName}, ${b.serviceName}, ${fmtTime(b.start)}, ${s.label}`}
                      title={`${b.clientName}\n${b.serviceName}\n${fmtTime(b.start)} to ${fmtTime(b.start + b.duration)}\n${s.label}`}
                      className="absolute z-[5] top-[7px] bottom-[7px] text-left rounded-[5px] px-2 py-1 overflow-hidden transition-[filter] hover:brightness-125 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#ece9e3]"
                      style={{
                        left: pct(b.start),
                        width: `calc(${(b.duration / span) * 100}% - 3px)`,
                        background: s.bg,
                        borderLeft: `3px solid ${s.edge}`,
                        color: strong ? '#080808' : '#ece9e3',
                        outline: selected ? '2px solid #ece9e3' : undefined,
                        outlineOffset: selected ? '1px' : undefined,
                      }}
                    >
                      <span className="block text-[0.74rem] font-semibold leading-tight truncate">{b.clientName.split(' ')[0]}</span>
                      <span className="block text-[0.68rem] leading-tight opacity-75 truncate">{fmtTime(b.start).replace(/ [AP]M/, '')}</span>
                    </button>
                  )
                })}
                {isToday && nowMin > open && nowMin < close && (
                  <span className="absolute top-0 bottom-0 w-[2px] bg-[#C47840] z-0 pointer-events-none" style={{ left: pct(nowMin) }} aria-hidden="true" />
                )}
              </div>
            </div>
          )
        })}

        {isToday && nowMin > open && nowMin < close && (
          <div className="grid grid-cols-[176px_1fr]">
            <div />
            <div className="relative h-6" aria-hidden="true">
              <span
                className="absolute top-1.5 -translate-x-1/2 text-[0.68rem] font-medium text-[#080808] bg-[#C47840] rounded px-1.5 py-0.5"
                style={{ left: pct(nowMin) }}
              >
                Now
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function BookingDetail({ booking, actions, date }) {
  if (!booking) {
    return (
      <p className="text-[0.85rem] text-[#77756f] py-6 text-center">
        Select an appointment on the board to see the client, notes and actions.
      </p>
    )
  }
  const day = new Date(booking.date + 'T00:00:00')
  const available = BARBERS.filter((b) => isWorking(b, day))
  return (
    <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Avatar name={booking.clientName} size={44} />
          <div className="min-w-0">
            <div className="font-grotesk font-semibold text-[1.05rem] truncate">{booking.clientName}</div>
            {booking.phone && (
              <div className="flex items-center gap-1.5 text-[0.78rem] text-[#9d9d95]">
                <Phone size={12} aria-hidden="true" />
                {booking.phone}
              </div>
            )}
          </div>
          <StatusBadge status={booking.status} className="ml-auto" />
        </div>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-[0.84rem]">
          <div>
            <dt className="text-[#77756f] text-[0.74rem]">Service</dt>
            <dd>{booking.serviceName}</dd>
          </div>
          <div>
            <dt className="text-[#77756f] text-[0.74rem]">Price</dt>
            <dd className="font-grotesk">{peso(booking.price)}</dd>
          </div>
          <div>
            <dt className="text-[#77756f] text-[0.74rem]">Time</dt>
            <dd className="inline-flex items-center gap-1.5">
              <Clock size={12} aria-hidden="true" />
              {fmtTime(booking.start)} to {fmtTime(booking.start + booking.duration)} ({fmtDuration(booking.duration)})
            </dd>
          </div>
          <div>
            <dt className="text-[#77756f] text-[0.74rem]">Booked via</dt>
            <dd><SourceTag source={booking.source} /></dd>
          </div>
        </dl>
        {booking.notes && (
          <p className="mt-4 flex gap-2 text-[0.82rem] text-[#d8d5cd] bg-[#161615] rounded-md px-3 py-2.5">
            <StickyNote size={14} className="mt-0.5 shrink-0 text-[#C47840]" aria-hidden="true" />
            {booking.notes}
          </p>
        )}
        {booking.reminded && (
          <p className="mt-3 flex items-center gap-2 text-[0.76rem] text-[#8FC19C]">
            <BellRing size={13} aria-hidden="true" />
            Reminder sent by email and SMS
          </p>
        )}
      </div>

      <div className="space-y-5">
        <div>
          <div className="text-[0.78rem] text-[#9d9d95] mb-2">Barber</div>
          <select
            className={inputCls}
            value={booking.barberId}
            onChange={(e) => actions.assign(booking, e.target.value)}
            aria-label="Assign barber"
          >
            <option value="any">Any barber (unassigned)</option>
            {available.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>
        <div>
          <div className="text-[0.78rem] text-[#9d9d95] mb-2">Next step</div>
          <StatusActions booking={booking} onChange={actions.setStatus} size="md" />
        </div>
      </div>
    </div>
  )
}

/* ───────────── week and month overviews ───────────── */

const MODES = [
  ['day', 'Day'],
  ['week', 'Week'],
  ['month', 'Month'],
]

const startOfWeek = (d) => {
  const x = startOfDay(d)
  return addDays(x, -((x.getDay() + 6) % 7))
}
const startOfMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 1)
const kShort = (n) => (n >= 1000 ? `₱${(n / 1000).toFixed(1).replace(/\.0$/, '')}k` : `₱${n}`)

function indexByDate(bookings) {
  const m = new Map()
  for (const b of bookings) {
    if (b.status === 'cancelled') continue
    if (!m.has(b.date)) m.set(b.date, [])
    m.get(b.date).push(b)
  }
  return m
}

const busyMinutes = (list) => list.filter((b) => b.status !== 'no_show').reduce((s, b) => s + b.duration, 0)

function dayLoad(list, date) {
  const [open, close] = hoursFor(date)
  const working = BARBERS.filter((b) => isWorking(b, date)).length
  const cap = working * (close - open)
  return {
    count: list.length,
    util: cap ? Math.min(100, Math.round((busyMinutes(list) / cap) * 100)) : 0,
    revenue: list.filter((b) => b.status !== 'no_show').reduce((s, b) => s + b.price, 0),
  }
}

function rangeSummary(byDate, dates) {
  let count = 0
  let revenue = 0
  let busiest = null
  for (const d of dates) {
    const l = dayLoad(byDate.get(dateKey(d)) || [], d)
    count += l.count
    revenue += l.revenue
    if (l.count > 0 && (!busiest || l.count > busiest.count)) busiest = { date: d, count: l.count }
  }
  return { count, revenue, busiest }
}

function LoadBar({ pct }) {
  return (
    <span className="block h-1.5 rounded-full bg-[#1d1d1c] overflow-hidden" aria-hidden="true">
      <span className="block h-full bg-[#C47840] rounded-full" style={{ width: `${pct}%` }} />
    </span>
  )
}

function WeekView({ weekStart, byDate, todayKey, onPick }) {
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))
  const hasAny = days.some((d) => (byDate.get(dateKey(d)) || []).some((b) => b.barberId === 'any'))
  const rows = [...BARBERS.map((b) => ({ id: b.id, barber: b })), ...(hasAny ? [{ id: 'any', barber: null }] : [])]
  const grid = 'grid grid-cols-[176px_repeat(7,minmax(104px,1fr))]'

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[940px]">
        <div className={grid}>
          <div />
          {days.map((d) => {
            const k = dateKey(d)
            const load = dayLoad(byDate.get(k) || [], d)
            const today = k === todayKey
            return (
              <button
                key={k}
                type="button"
                onClick={() => onPick(d)}
                aria-label={`Open ${fmtDay(d, { weekday: 'long', month: 'long', day: 'numeric' })}, ${load.count} appointments`}
                className="text-left px-3 pb-3 pt-1 rounded-md hover:bg-[#161615] transition-colors"
              >
                <span className={`block text-[0.74rem] ${today ? 'text-[#C47840] font-semibold' : 'text-[#77756f]'}`}>
                  {d.toLocaleDateString('en-PH', { weekday: 'short' })}{today ? ', today' : ''}
                </span>
                <span className={`block font-grotesk font-bold text-[1.4rem] leading-tight ${today ? 'text-[#C47840]' : ''}`}>{d.getDate()}</span>
              </button>
            )
          })}
        </div>

        {rows.map((row) => (
          <div key={row.id} className={`${grid} border-t border-[#222220]`}>
            <div className="flex items-center gap-3 py-3 pr-3">
              {row.barber ? (
                <img src={row.barber.photo} alt="" className="w-9 h-9 rounded-full object-cover object-top bg-[#222]" />
              ) : (
                <Avatar name="Any barber" size={36} />
              )}
              <span className="text-[0.88rem] font-medium">{row.barber ? row.barber.name : 'Needs a barber'}</span>
            </div>
            {days.map((d) => {
              const k = dateKey(d)
              const working = row.barber ? isWorking(row.barber, d) : true
              const list = (byDate.get(k) || []).filter((b) => b.barberId === row.id)
              const [open, close] = hoursFor(d)
              const util = Math.min(100, Math.round((busyMinutes(list) / (close - open)) * 100))
              if (!working) {
                return (
                  <div
                    key={k}
                    className="m-1 rounded-md flex items-center justify-center text-[0.74rem] text-[#5f5d57]"
                    style={{ backgroundImage: 'repeating-linear-gradient(135deg, #131312 0 8px, #0d0d0c 8px 16px)' }}
                  >
                    Day off
                  </div>
                )
              }
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => onPick(d)}
                  aria-label={`${row.barber ? row.barber.name : 'Unassigned'}, ${fmtDay(d, { weekday: 'long', month: 'long', day: 'numeric' })}: ${list.length} appointments, ${util}% booked`}
                  className="m-1 rounded-md bg-[#121211] hover:bg-[#1b1b1a] border border-transparent hover:border-[#33332f] px-3 py-2.5 text-left transition-colors"
                >
                  <span className="flex items-baseline gap-1.5">
                    <span className="font-grotesk font-bold text-[1.3rem] leading-none">{list.length}</span>
                    <span className="text-[0.72rem] text-[#77756f]">{list.length === 1 ? 'cut' : 'cuts'}</span>
                  </span>
                  <span className="block mt-2.5"><LoadBar pct={util} /></span>
                  <span className="block text-[0.7rem] text-[#77756f] mt-1.5">{util}% booked</span>
                </button>
              )
            })}
          </div>
        ))}

        <div className={`${grid} border-t border-[#33332f]`}>
          <div className="py-3 pr-3 text-[0.82rem] text-[#9d9d95] self-center">Whole shop</div>
          {days.map((d) => {
            const l = dayLoad(byDate.get(dateKey(d)) || [], d)
            return (
              <div key={dateKey(d)} className="px-3 py-3">
                <div className="font-grotesk font-semibold text-[1rem]">{l.count}</div>
                <div className="text-[0.74rem] text-[#9d9d95]">{l.revenue ? kShort(l.revenue) : 'No bookings'}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function MonthView({ monthStart, byDate, todayKey, onPick }) {
  const first = startOfWeek(monthStart)
  const lastOfMonth = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0)
  const last = addDays(startOfWeek(lastOfMonth), 6)
  const total = Math.round((last - first) / 86400000) + 1
  const cells = Array.from({ length: total }, (_, i) => addDays(first, i))
  const names = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[760px]">
        <div className="grid grid-cols-7 gap-1.5 mb-1.5">
          {names.map((n) => <div key={n} className="text-[0.74rem] text-[#77756f] px-2">{n}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {cells.map((d) => {
            const k = dateKey(d)
            const inMonth = d.getMonth() === monthStart.getMonth()
            const l = dayLoad(byDate.get(k) || [], d)
            const today = k === todayKey
            return (
              <button
                key={k}
                type="button"
                onClick={() => onPick(d)}
                aria-label={`${fmtDay(d, { weekday: 'long', month: 'long', day: 'numeric' })}: ${l.count ? `${l.count} appointments, ${l.util}% booked` : 'no bookings'}`}
                className={`min-h-[96px] rounded-md border px-2.5 py-2 text-left flex flex-col justify-between transition-colors hover:border-[#C47840] ${today ? 'border-[#C47840]/70 bg-[#C47840]/[0.07]' : 'border-[#222220] bg-[#101010]'} ${inMonth ? '' : 'opacity-40'}`}
              >
                <span className="flex items-start justify-between">
                  <span className={`font-grotesk text-[0.9rem] ${today ? 'text-[#C47840] font-bold' : 'text-[#d8d5cd]'}`}>{d.getDate()}</span>
                  {l.count > 0 && <span className="font-grotesk font-bold text-[1.15rem] leading-none">{l.count}</span>}
                </span>
                {l.count > 0 ? (
                  <span className="block">
                    <LoadBar pct={l.util} />
                    <span className="block text-[0.68rem] text-[#77756f] mt-1.5">{l.util}% booked, {kShort(l.revenue)}</span>
                  </span>
                ) : (
                  <span className="text-[0.7rem] text-[#4a4945]">{inMonth ? 'Nothing booked' : ''}</span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function Schedule({ state, now, actions }) {
  const [mode, setMode] = useState('day')
  const [day, setDay] = useState(() => startOfDay(new Date()))
  const [selId, setSelId] = useState(null)
  const key = dateKey(day)
  const today = startOfDay(now)
  const todayKey = dateKey(today)

  const byDate = useMemo(() => indexByDate(state.bookings), [state.bookings])

  const weekStart = startOfWeek(day)
  const weekDays = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)), [weekStart.getTime()])
  const monthStart = startOfMonth(day)
  const monthDays = useMemo(() => {
    const n = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0).getDate()
    return Array.from({ length: n }, (_, i) => addDays(monthStart, i))
  }, [monthStart.getTime()])

  const dayStats = useMemo(() => {
    const list = state.bookings.filter((b) => b.date === key && COUNTED(b) && b.status !== 'cancelled')
    const working = BARBERS.filter((b) => isWorking(b, day)).length
    const [open, close] = hoursFor(day)
    const util = working ? Math.round((list.reduce((s, b) => s + b.duration, 0) / (working * (close - open))) * 100) : 0
    return { count: list.length, working, util, revenue: list.reduce((s, b) => s + b.price, 0) }
  }, [state.bookings, key, day])

  const range = useMemo(
    () => (mode === 'week' ? rangeSummary(byDate, weekDays) : mode === 'month' ? rangeSummary(byDate, monthDays) : null),
    [mode, byDate, weekDays, monthDays]
  )

  const selected = state.bookings.find((b) => b.id === selId && b.date === key)

  const move = (dir) => {
    setSelId(null)
    setDay((d) => (mode === 'day' ? addDays(d, dir) : mode === 'week' ? addDays(d, 7 * dir) : new Date(d.getFullYear(), d.getMonth() + dir, 1)))
  }
  const isCurrent =
    mode === 'day'
      ? key === todayKey
      : mode === 'week'
        ? weekStart.getTime() === startOfWeek(today).getTime()
        : monthStart.getTime() === startOfMonth(today).getTime()
  const backLabel = { day: 'Back to today', week: 'This week', month: 'This month' }[mode]
  const pick = (d) => {
    setDay(d)
    setSelId(null)
    setMode('day')
  }

  const title =
    mode === 'day'
      ? fmtDay(day, { weekday: 'long', month: 'long', day: 'numeric' })
      : mode === 'week'
        ? `${fmtDay(weekStart, { month: 'short', day: 'numeric' })} to ${fmtDay(addDays(weekStart, 6), { month: 'short', day: 'numeric', year: 'numeric' })}`
        : fmtDay(day, { month: 'long', year: 'numeric' })

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-md border border-[#33332f] overflow-hidden" role="tablist" aria-label="Schedule range">
          {MODES.map(([id, label]) => (
            <button
              key={id}
              role="tab"
              aria-selected={mode === id}
              onClick={() => {
                setMode(id)
                setSelId(null)
              }}
              className={`px-4 py-2 text-[0.82rem] transition-colors ${mode === id ? 'bg-[#C47840] text-[#080808] font-semibold' : 'text-[#d8d5cd] hover:bg-[#1a1a19]'}`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <Button size="sm" onClick={() => move(-1)} aria-label={`Previous ${mode}`}><ChevronLeft size={15} /></Button>
          <Button size="sm" onClick={() => move(1)} aria-label={`Next ${mode}`}><ChevronRight size={15} /></Button>
        </div>
        <h2 className="font-grotesk font-semibold text-[1.15rem]">{title}</h2>
        {!isCurrent && (
          <Button
            size="sm"
            onClick={() => {
              setDay(today)
              setSelId(null)
            }}
          >
            {backLabel}
          </Button>
        )}

        <div className="ml-auto flex flex-wrap gap-x-6 gap-y-1 text-[0.82rem] text-[#9d9d95]">
          {mode === 'day' ? (
            <>
              <span><b className="text-[#ece9e3] font-grotesk">{dayStats.count}</b> appointments</span>
              <span><b className="text-[#ece9e3] font-grotesk">{dayStats.working}</b> barbers working</span>
              <span><b className="text-[#ece9e3] font-grotesk">{dayStats.util}%</b> of chair time booked</span>
              <span><b className="text-[#ece9e3] font-grotesk">{peso(dayStats.revenue)}</b> expected</span>
            </>
          ) : (
            <>
              <span><b className="text-[#ece9e3] font-grotesk">{range.count}</b> appointments</span>
              <span><b className="text-[#ece9e3] font-grotesk">{peso(range.revenue)}</b> expected</span>
              {range.busiest && (
                <span>
                  Busiest: <b className="text-[#ece9e3] font-grotesk">{fmtDay(range.busiest.date, { weekday: 'short', month: 'short', day: 'numeric' })}</b> with {range.busiest.count}
                </span>
              )}
            </>
          )}
        </div>
      </div>

      {mode === 'day' && (
        <>
          <Panel pad={false} className="px-5 pt-4 pb-3">
            <Board date={day} bookings={state.bookings} now={now} selectedId={selId} onSelect={(b) => setSelId(b.id)} />
            <div className="pt-3 border-t border-[#222220] mt-1">
              <StatusLegend />
            </div>
          </Panel>
          <Panel title="Appointment details">
            <BookingDetail booking={selected} actions={actions} date={day} />
          </Panel>
        </>
      )}

      {mode === 'week' && (
        <Panel pad={false} className="px-5 pt-4 pb-4">
          <WeekView weekStart={weekStart} byDate={byDate} todayKey={todayKey} onPick={pick} />
          <p className="text-[0.76rem] text-[#77756f] pt-3 border-t border-[#222220] mt-2">
            Each box shows one barber's appointments for the day and how full their chair is. Select a box or a date to open that day.
          </p>
        </Panel>
      )}

      {mode === 'month' && (
        <Panel pad={false} className="px-5 pt-5 pb-4">
          <MonthView monthStart={monthStart} byDate={byDate} todayKey={todayKey} onPick={pick} />
          <p className="text-[0.76rem] text-[#77756f] pt-3 border-t border-[#222220] mt-3">
            The bar shows how full the shop's chairs are that day. Select a day to see its schedule. Future days fill up as clients book.
          </p>
        </Panel>
      )}
    </div>
  )
}
