import { useMemo, useRef, useState } from 'react'
import { Search, Phone, Send, Sparkles } from 'lucide-react'
import { BARBER_BY_ID, CLIENT_PREF, dateKey, addDays, startOfDay, fmtTime, fmtDay, parseKey, peso, barberName } from '../../demo/data'
import { Avatar, Panel, Button, StatusBadge, BarberChip, inputCls } from '../ui'

const FILTERS = [
  ['all', 'Everyone'],
  ['regular', 'Regulars'],
  ['new', 'New'],
  ['due', 'Due for a cut'],
]

const mode = (arr) => {
  const c = {}
  arr.forEach((x) => (c[x] = (c[x] || 0) + 1))
  return Object.entries(c).sort((a, b) => b[1] - a[1])[0]?.[0]
}

function derive(bookings, todayKey, dueCutoff) {
  const map = new Map()
  for (const b of bookings) {
    const k = `${b.clientName}|${b.phone}`.toLowerCase()
    if (!map.has(k)) map.set(k, { key: k, name: b.clientName, phone: b.phone, list: [] })
    map.get(k).list.push(b)
  }
  return [...map.values()].map((c) => {
    const done = c.list.filter((b) => b.status === 'completed')
    const upcoming = c.list.filter((b) => ['confirmed', 'arrived', 'in_chair'].includes(b.status) && b.date >= todayKey)
    const last = done.map((b) => b.date).sort().pop() || null
    const visits = done.length
    return {
      ...c,
      visits,
      upcoming: upcoming.length,
      last,
      spend: done.reduce((s, b) => s + b.price, 0),
      noShows: c.list.filter((b) => b.status === 'no_show').length,
      favBarber: mode(done.map((b) => b.barberId)),
      favService: mode(done.map((b) => b.serviceName)),
      regular: visits >= 6,
      isNew: visits <= 1,
      due: visits >= 3 && !upcoming.length && last && last < dueCutoff,
      history: [...c.list].sort((a, b) => b.date.localeCompare(a.date) || b.start - a.start),
    }
  })
}

export default function Clients({ state, now, actions }) {
  const todayKey = dateKey(startOfDay(now))
  const dueCutoff = dateKey(addDays(startOfDay(now), -21))
  const [filter, setFilter] = useState('all')
  const [q, setQ] = useState('')
  const [selKey, setSelKey] = useState(null)
  const detailRef = useRef(null)

  const clients = useMemo(() => derive(state.bookings, todayKey, dueCutoff), [state.bookings, todayKey, dueCutoff])
  const counts = useMemo(
    () => ({ all: clients.length, regular: clients.filter((c) => c.regular).length, new: clients.filter((c) => c.isNew).length, due: clients.filter((c) => c.due).length }),
    [clients]
  )
  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return clients
      .filter((c) => (filter === 'all' ? true : filter === 'regular' ? c.regular : filter === 'new' ? c.isNew : c.due))
      .filter((c) => !needle || `${c.name} ${c.phone}`.toLowerCase().includes(needle))
      .sort((a, b) => b.spend - a.spend)
  }, [clients, filter, q])

  const selected = clients.find((c) => c.key === selKey)
  const choose = (c) => {
    setSelKey(c.key)
    if (window.innerWidth < 1280) setTimeout(() => detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-md border border-[#33332f] overflow-hidden" role="tablist" aria-label="Client filter">
          {FILTERS.map(([id, label]) => (
            <button
              key={id}
              role="tab"
              aria-selected={filter === id}
              onClick={() => setFilter(id)}
              className={`px-4 py-2 text-[0.82rem] transition-colors ${filter === id ? 'bg-[#C47840] text-[#080808] font-semibold' : 'text-[#d8d5cd] hover:bg-[#1a1a19]'}`}
            >
              {label} <span className="opacity-70 font-grotesk">{counts[id]}</span>
            </button>
          ))}
        </div>
        <div className="relative ml-auto w-full sm:w-[260px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#77756f]" aria-hidden="true" />
          <input className={`${inputCls} !pl-9`} placeholder="Search name or phone" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search clients" />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-start">
        <Panel pad={false}>
          <div className="overflow-x-auto max-h-[640px] overflow-y-auto">
            <table className="w-full text-[0.84rem] min-w-[640px]">
              <thead className="sticky top-0 bg-[#101010] z-10">
                <tr className="text-left text-[#77756f] text-[0.76rem]">
                  <th className="font-normal px-5 py-3">Client</th>
                  <th className="font-normal px-3 py-3 text-right">Visits</th>
                  <th className="font-normal px-3 py-3 text-right">Spent</th>
                  <th className="font-normal px-3 py-3">Last visit</th>
                  <th className="font-normal px-3 py-3">Usual barber</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((c) => (
                  <tr
                    key={c.key}
                    onClick={() => choose(c)}
                    className={`border-t border-[#1d1d1c] cursor-pointer hover:bg-[#131312] ${selKey === c.key ? 'bg-[#C47840]/[0.09]' : ''}`}
                  >
                    <td className="px-5 py-2.5">
                      <button className="flex items-center gap-2.5 text-left" onClick={() => choose(c)}>
                        <Avatar name={c.name} size={30} />
                        <span>
                          <span className="block font-medium">{c.name}</span>
                          <span className="block text-[0.72rem] text-[#8FC19C]">
                            {c.regular ? 'Regular' : c.due ? 'Due for a cut' : c.isNew ? 'New client' : ''}
                          </span>
                        </span>
                      </button>
                    </td>
                    <td className="px-3 py-2.5 text-right font-grotesk">{c.visits}</td>
                    <td className="px-3 py-2.5 text-right font-grotesk">{peso(c.spend)}</td>
                    <td className="px-3 py-2.5 text-[#9d9d95] whitespace-nowrap">{c.last ? fmtDay(parseKey(c.last), { month: 'short', day: 'numeric' }) : 'Not yet'}</td>
                    <td className="px-3 py-2.5"><BarberChip barber={BARBER_BY_ID[c.favBarber]} /></td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr><td colSpan={5} className="px-5 py-12 text-center text-[#77756f]">No clients match. Clear the search or pick another filter.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </Panel>

        <div ref={detailRef} className="xl:sticky xl:top-24">
          <Panel title={selected ? selected.name : 'Client profile'}>
            {!selected ? (
              <p className="text-[0.85rem] text-[#77756f] py-8 text-center">
                Select a client to see their visit history, usual cut and notes.
              </p>
            ) : (
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <Avatar name={selected.name} size={48} />
                  <div>
                    {selected.phone && (
                      <div className="flex items-center gap-1.5 text-[0.82rem] text-[#9d9d95]"><Phone size={12} /> {selected.phone}</div>
                    )}
                    <div className="text-[0.78rem] text-[#77756f] mt-0.5">
                      Usually books {selected.favService || 'a haircut'}
                    </div>
                  </div>
                </div>

                <dl className="grid grid-cols-3 gap-3 text-center">
                  {[
                    ['Visits', selected.visits],
                    ['Spent', peso(selected.spend)],
                    ['No-shows', selected.noShows],
                  ].map(([k, v]) => (
                    <div key={k} className="bg-[#141413] rounded-md py-3">
                      <dd className="font-grotesk font-semibold text-[1.05rem]">{v}</dd>
                      <dt className="text-[0.72rem] text-[#77756f]">{k}</dt>
                    </div>
                  ))}
                </dl>

                {CLIENT_PREF[selected.name] && (
                  <p className="flex gap-2 text-[0.82rem] bg-[#161615] rounded-md px-3 py-2.5">
                    <Sparkles size={14} className="text-[#C47840] mt-0.5 shrink-0" aria-hidden="true" />
                    <span><span className="text-[#77756f]">Usual cut: </span>{CLIENT_PREF[selected.name]}</span>
                  </p>
                )}

                <label className="block">
                  <span className="block text-[0.78rem] text-[#9d9d95] mb-1.5">Notes for the barber</span>
                  <textarea
                    className={`${inputCls} min-h-[72px] resize-y`}
                    placeholder="Allergies, preferences, anything worth remembering"
                    defaultValue={state.clientNotes[selected.key] || ''}
                    key={selected.key}
                    onBlur={(e) => actions.saveNote(selected.key, e.target.value)}
                  />
                </label>

                <Button variant="primary" className="w-full" onClick={() => actions.nudge(selected)}>
                  <Send size={13} /> {selected.due ? 'Invite to rebook' : 'Send a message'}
                </Button>

                <div>
                  <h3 className="text-[0.8rem] text-[#9d9d95] mb-2">Visit history</h3>
                  <ul className="divide-y divide-[#1d1d1c] max-h-[220px] overflow-y-auto">
                    {selected.history.slice(0, 10).map((b) => (
                      <li key={b.id} className="flex items-center gap-3 py-2 text-[0.8rem]">
                        <span className="w-[74px] text-[#9d9d95] font-grotesk shrink-0">{fmtDay(parseKey(b.date), { month: 'short', day: 'numeric' })}</span>
                        <span className="flex-1 min-w-0 truncate">{b.serviceName} <span className="text-[#77756f]">with {barberName(b.barberId)}</span></span>
                        <StatusBadge status={b.status} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </Panel>
        </div>
      </div>
    </div>
  )
}
