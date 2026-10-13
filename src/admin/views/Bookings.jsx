import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { BARBERS, BARBER_BY_ID, OPEN_STATUSES, dateKey, addDays, startOfDay, fmtTime, fmtDay, parseKey, peso } from '../../demo/data'
import { STATUS, StatusBadge, SourceTag, StatusActions, BarberChip, Avatar, Panel, Button, inputCls } from '../ui'

const RANGES = [
  ['today', 'Today'],
  ['upcoming', 'Upcoming'],
  ['past', 'Past'],
  ['all', 'All'],
]

export default function Bookings({ state, now, actions }) {
  const todayKey = dateKey(startOfDay(now))
  const [range, setRange] = useState('today')
  const [status, setStatus] = useState('all')
  const [barber, setBarber] = useState('all')
  const [q, setQ] = useState('')
  const [limit, setLimit] = useState(25)

  const { rows, total } = useMemo(() => {
    const needle = q.trim().toLowerCase()
    let list = state.bookings.filter((b) => {
      if (range === 'today' && b.date !== todayKey) return false
      if (range === 'upcoming' && b.date <= todayKey) return false
      if (range === 'past' && b.date >= todayKey) return false
      if (status !== 'all' && b.status !== status) return false
      if (barber !== 'all' && b.barberId !== barber) return false
      if (needle && !`${b.clientName} ${b.phone} ${b.serviceName} ${b.code}`.toLowerCase().includes(needle)) return false
      return true
    })
    const asc = range === 'today' || range === 'upcoming'
    list = list.sort((a, b) => {
      if (a.fresh !== b.fresh) return a.fresh ? -1 : 1
      if (range === 'today') {
        const ao = OPEN_STATUSES.includes(a.status) ? 0 : 1
        const bo = OPEN_STATUSES.includes(b.status) ? 0 : 1
        if (ao !== bo) return ao - bo
      }
      const d = a.date.localeCompare(b.date) || a.start - b.start
      return asc ? d : -d
    })
    return { rows: list.slice(0, limit), total: list.length }
  }, [state.bookings, range, status, barber, q, limit, todayKey])

  const when = (b) => {
    if (b.date === todayKey) return 'Today'
    if (b.date === dateKey(addDays(startOfDay(now), 1))) return 'Tomorrow'
    return fmtDay(parseKey(b.date))
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-md border border-[#33332f] overflow-hidden" role="tablist" aria-label="Date range">
          {RANGES.map(([id, label]) => (
            <button
              key={id}
              role="tab"
              aria-selected={range === id}
              onClick={() => { setRange(id); setLimit(25) }}
              className={`px-4 py-2 text-[0.82rem] transition-colors ${range === id ? 'bg-[#C47840] text-[#080808] font-semibold' : 'text-[#d8d5cd] hover:bg-[#1a1a19]'}`}
            >
              {label}
            </button>
          ))}
        </div>

        <select className={`${inputCls} !w-auto`} value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status">
          <option value="all">Any status</option>
          {Object.entries(STATUS).map(([k, s]) => <option key={k} value={k}>{s.label}</option>)}
        </select>
        <select className={`${inputCls} !w-auto`} value={barber} onChange={(e) => setBarber(e.target.value)} aria-label="Filter by barber">
          <option value="all">All barbers</option>
          <option value="any">Unassigned</option>
          {BARBERS.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>

        <div className="relative ml-auto w-full sm:w-[260px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#77756f]" aria-hidden="true" />
          <input className={`${inputCls} !pl-9`} placeholder="Search name, phone or code" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search bookings" />
        </div>
      </div>

      <Panel pad={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-[0.84rem] min-w-[980px]">
            <thead>
              <tr className="text-left text-[#77756f] text-[0.76rem]">
                <th className="font-normal px-5 py-3">When</th>
                <th className="font-normal px-3 py-3">Client</th>
                <th className="font-normal px-3 py-3">Service</th>
                <th className="font-normal px-3 py-3">Barber</th>
                <th className="font-normal px-3 py-3 text-right">Price</th>
                <th className="font-normal px-3 py-3">Status</th>
                <th className="font-normal px-3 py-3">Booked via</th>
                <th className="font-normal px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((b) => (
                <tr key={b.id} className={`border-t border-[#1d1d1c] hover:bg-[#131312] ${b.fresh ? 'bg-[#C47840]/[0.07]' : ''}`}>
                  <td className="px-5 py-3 whitespace-nowrap">
                    <div className="font-medium">{when(b)}</div>
                    <div className="text-[0.76rem] text-[#9d9d95] font-grotesk">{fmtTime(b.start)}</div>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={b.clientName} size={30} />
                      <div className="min-w-0">
                        <div className="font-medium truncate max-w-[170px]">{b.clientName}</div>
                        <div className="text-[0.74rem] text-[#77756f]">{b.code}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 max-w-[200px]"><span className="block truncate">{b.serviceName}</span></td>
                  <td className="px-3 py-3"><BarberChip barber={BARBER_BY_ID[b.barberId]} /></td>
                  <td className="px-3 py-3 text-right font-grotesk">{peso(b.price)}</td>
                  <td className="px-3 py-3"><StatusBadge status={b.status} /></td>
                  <td className="px-3 py-3"><SourceTag source={b.source} /></td>
                  <td className="px-5 py-3"><StatusActions booking={b} onChange={actions.setStatus} /></td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-[#77756f]">
                    No bookings match these filters. Try a wider date range or clear the search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-5 py-3 border-t border-[#1d1d1c] text-[0.78rem] text-[#77756f]">
          <span>Showing {rows.length} of {total}</span>
          {rows.length < total && <Button size="sm" onClick={() => setLimit((l) => l + 25)}>Show 25 more</Button>}
        </div>
      </Panel>
    </div>
  )
}
