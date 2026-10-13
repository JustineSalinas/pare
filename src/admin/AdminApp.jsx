import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import {
  LayoutDashboard, CalendarDays, ClipboardList, Users, Scissors, Crown, Plus, ArrowLeft, Smartphone,
} from 'lucide-react'
import {
  BARBERS, DAILY_SERVICES, SERVICES, SERVICE_BY_ID, SEED_ENQUIRIES, SEED_WAITLIST, WEDDING_STAGES,
  buildSeed, findConflict, hoursFor, isWorking, dateKey, startOfDay, fmtTime, fmtDay, fmtDuration,
  barberName, useNow, useStoredBookings,
} from '../demo/data'
import { Button, Modal, Field, inputCls, useToasts } from './ui'
import Overview from './views/Overview'
import Schedule from './views/Schedule'
import Bookings from './views/Bookings'
import Clients from './views/Clients'
import Services from './views/Services'
import Weddings from './views/Weddings'

const NAV = [
  { id: 'overview', label: 'Overview', title: 'Overview', icon: LayoutDashboard, View: Overview },
  { id: 'schedule', label: 'Schedule', title: 'Schedule', icon: CalendarDays, View: Schedule },
  { id: 'bookings', label: 'Bookings', title: 'Bookings', icon: ClipboardList, View: Bookings },
  { id: 'clients', label: 'Clients', title: 'Clients', icon: Users, View: Clients },
  { id: 'services', label: 'Services and prices', title: 'Services and prices', icon: Scissors, View: Services },
  { id: 'weddings', label: 'Weddings', title: 'Wedding and entourage enquiries', icon: Crown, View: Weddings },
]

const initialState = () => ({
  bookings: buildSeed(),
  services: SERVICES.map((s) => ({ ...s, online: true, base: { price: s.price, duration: s.duration } })),
  enquiries: SEED_ENQUIRIES,
  waitlist: SEED_WAITLIST,
  clientNotes: {},
})

function reducer(s, a) {
  switch (a.type) {
    case 'sync': {
      const ids = new Set(s.bookings.map((b) => b.id))
      const add = a.list.filter((b) => !ids.has(b.id))
      return add.length ? { ...s, bookings: [...add, ...s.bookings] } : s
    }
    case 'status':
      return { ...s, bookings: s.bookings.map((b) => (b.id === a.id ? { ...b, status: a.status, fresh: false } : b)) }
    case 'assign':
      return { ...s, bookings: s.bookings.map((b) => (b.id === a.id ? { ...b, barberId: a.barberId } : b)) }
    case 'add':
      return { ...s, bookings: [a.booking, ...s.bookings] }
    case 'service':
      return { ...s, services: s.services.map((x) => (x.id === a.id ? { ...x, ...a.patch } : x)) }
    case 'resetServices':
      return { ...s, services: s.services.map((x) => ({ ...x, price: x.base.price, duration: x.base.duration, online: true })) }
    case 'enquiry':
      return {
        ...s,
        enquiries: s.enquiries.map((e) => {
          if (e.id !== a.id) return e
          const i = WEDDING_STAGES.findIndex((st) => st.id === e.stage) + a.dir
          return WEDDING_STAGES[i] ? { ...e, stage: WEDDING_STAGES[i].id } : e
        }),
      }
    case 'offer':
      return { ...s, waitlist: s.waitlist.map((w) => (w.id === a.id ? { ...w, status: 'offered' } : w)) }
    case 'note':
      return { ...s, clientNotes: { ...s.clientNotes, [a.key]: a.value } }
    default:
      return s
  }
}

function useHashView() {
  const read = () => {
    const h = window.location.hash.slice(1)
    return NAV.some((n) => n.id === h) ? h : 'overview'
  }
  const [view, setView] = useState(read)
  useEffect(() => {
    const on = () => {
      setView(read())
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return [view, (id) => (window.location.hash = id)]
}

function NewBooking({ state, now, onClose, onCreate }) {
  const today = startOfDay(now)
  const [date, setDate] = useState(dateKey(today))
  const day = new Date(date + 'T00:00:00')
  const [open, close] = hoursFor(day)
  const [serviceId, setServiceId] = useState('basic-haircut')
  const svc = SERVICE_BY_ID[serviceId]
  const times = []
  for (let m = open; m + svc.duration <= close; m += 15) times.push(m)
  const nowMin = now.getHours() * 60 + now.getMinutes()
  const defaultStart = date === dateKey(today) ? times.find((t) => t >= nowMin) ?? times[0] : times[0]

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [barberId, setBarberId] = useState('any')
  const [start, setStart] = useState(defaultStart)
  const [source, setSource] = useState('walk-in')
  const [error, setError] = useState('')

  const available = BARBERS.filter((b) => isWorking(b, day))
  const startAt = times.includes(Number(start)) ? Number(start) : times[0]

  const submit = (e) => {
    e.preventDefault()
    if (!name.trim()) return setError('Enter the client name so the barber knows who is coming.')
    const result = onCreate({ name: name.trim(), phone: phone.trim(), svc, barberId, date, start: startAt, source })
    if (result?.error) return setError(result.error)
    onClose()
  }

  return (
    <Modal title="New booking" onClose={onClose}>
      <form onSubmit={submit} noValidate>
        <Field label="Client name">
          <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Marco Santos" />
        </Field>
        <Field label="Mobile number (optional)">
          <input className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+63 9XX XXX XXXX" inputMode="tel" />
        </Field>
        <Field label="Service" hint={`${fmtDuration(svc.duration)} appointment`}>
          <select className={inputCls} value={serviceId} onChange={(e) => setServiceId(e.target.value)}>
            {DAILY_SERVICES.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Barber">
            <select className={inputCls} value={barberId} onChange={(e) => setBarberId(e.target.value)}>
              <option value="any">Any barber</option>
              {available.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </Field>
          <Field label="Booked through">
            <select className={inputCls} value={source} onChange={(e) => setSource(e.target.value)}>
              <option value="walk-in">Walk-in</option>
              <option value="messenger">Messenger</option>
            </select>
          </Field>
          <Field label="Date">
            <input type="date" className={inputCls} value={date} min={dateKey(today)} onChange={(e) => { setDate(e.target.value || dateKey(today)); setStart(undefined) }} />
          </Field>
          <Field label="Start time">
            <select className={inputCls} value={startAt} onChange={(e) => setStart(e.target.value)}>
              {times.map((m) => <option key={m} value={m}>{fmtTime(m)}</option>)}
            </select>
          </Field>
        </div>
        {error && <p role="alert" className="text-[0.82rem] text-[#E58B7F] bg-[#2a1816] border border-[#4a2b27] rounded-md px-3 py-2.5 mb-4">{error}</p>}
        <div className="flex justify-end gap-3">
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="primary" type="submit">Add booking</Button>
        </div>
      </form>
    </Modal>
  )
}

export default function AdminApp() {
  const [state, dispatch] = useReducer(reducer, undefined, initialState)
  const stateRef = useRef(state)
  stateRef.current = state
  const now = useNow()
  const [view, go] = useHashView()
  const [toast, toastNode] = useToasts()
  const [creating, setCreating] = useState(false)

  const stored = useStoredBookings()
  const seen = useRef(null)
  useEffect(() => {
    dispatch({ type: 'sync', list: stored })
    if (seen.current === null) {
      seen.current = new Set(stored.map((b) => b.id))
      return
    }
    for (const b of stored) {
      if (!seen.current.has(b.id)) {
        seen.current.add(b.id)
        toast(`New booking from ${b.source === 'app' ? 'the mobile app' : 'the website'}: ${b.clientName}, ${b.serviceName}, ${fmtTime(b.start)}.`)
      }
    }
  }, [stored, toast])

  const actions = useMemo(() => {
    const setStatus = (b, status) => {
      dispatch({ type: 'status', id: b.id, status })
      const first = b.clientName.split(' ')[0]
      if (status === 'cancelled') {
        const w = stateRef.current.waitlist.find((x) => x.status === 'waiting' && (x.barberId === b.barberId || x.barberId === 'any'))
        if (w) {
          dispatch({ type: 'offer', id: w.id })
          toast(`Cancelled ${first}'s booking. The ${fmtTime(b.start)} slot was offered to ${w.name} from the waitlist.`)
        } else {
          toast(`Cancelled ${first}'s booking. Nobody on the waitlist for that slot.`)
        }
      } else if (status === 'confirmed') toast(`Restored ${first}'s booking.`)
      else if (status === 'no_show') toast(`Marked ${first} as a no-show.`, 'warn')
      else toast(`${first}: ${{ arrived: 'checked in', in_chair: 'cut started', completed: 'completed' }[status]}.`)
    }
    const assign = (b, barberId) => {
      const clash = findConflict(stateRef.current.bookings, { barberId, date: b.date, start: b.start, duration: b.duration, ignoreId: b.id })
      if (clash) {
        toast(`${barberName(barberId)} already has ${clash.clientName.split(' ')[0]} at ${fmtTime(clash.start)}. Pick another barber or time.`, 'warn')
        return
      }
      dispatch({ type: 'assign', id: b.id, barberId })
      toast(`${b.clientName.split(' ')[0]} is now with ${barberName(barberId)}.`)
    }
    const addBooking = ({ name, phone, svc, barberId, date, start, source }) => {
      const closeAt = hoursFor(new Date(date + 'T00:00:00'))[1]
      if (start + svc.duration > closeAt) {
        return { error: `${svc.name} takes ${fmtDuration(svc.duration)} and would run past closing at ${fmtTime(closeAt)}. Choose an earlier start.` }
      }
      const clash = findConflict(stateRef.current.bookings, { barberId, date, start, duration: svc.duration })
      if (clash) {
        return { error: `${barberName(barberId)} already has ${clash.clientName} from ${fmtTime(clash.start)} to ${fmtTime(clash.start + clash.duration)}. Choose another barber or time.` }
      }
      const id = `A-${Date.now().toString(36)}`
      dispatch({
        type: 'add',
        booking: {
          id, code: 'BK-' + id.slice(-5).toUpperCase(), clientName: name, phone, serviceId: svc.id, serviceName: svc.name,
          price: svc.price, duration: svc.duration, barberId, date, start, status: 'confirmed', source, notes: '', reminded: false, fresh: true,
        },
      })
      toast(`Added ${name.split(' ')[0]} at ${fmtTime(start)}.`)
      return {}
    }
    return {
      setStatus,
      assign,
      addBooking,
      offerWaitlist: (id) => {
        const w = stateRef.current.waitlist.find((x) => x.id === id)
        dispatch({ type: 'offer', id })
        toast(`Offer sent to ${w.name} by SMS and email.`)
      },
      updateService: (id, patch) => dispatch({ type: 'service', id, patch }),
      resetServices: () => {
        dispatch({ type: 'resetServices' })
        toast('Menu reset to the current prices.')
      },
      moveEnquiry: (id, dir) => dispatch({ type: 'enquiry', id, dir }),
      saveNote: (key, value) => dispatch({ type: 'note', key, value }),
      nudge: (c) => toast(`Message queued for ${c.name.split(' ')[0]} by SMS and email.`),
    }
  }, [toast])

  const current = NAV.find((n) => n.id === view)
  const View = current.View

  return (
    <div className="min-h-screen bg-[#080808] text-[#ece9e3] font-sans flex">
      <aside className="hidden lg:flex flex-col w-[248px] shrink-0 sticky top-0 h-screen border-r border-[#1f1f1e] px-4 py-6">
        <a href="/" className="px-3 mb-8 no-underline">
          <div className="font-grotesk font-bold text-[1.7rem] tracking-[0.3em] text-white">PARE<span className="text-[#C47840]">.</span></div>
          <div className="text-[0.78rem] text-[#77756f] mt-1">Back office</div>
        </a>
        <nav aria-label="Dashboard sections" className="flex flex-col gap-1">
          {NAV.map((n) => {
            const Icon = n.icon
            const on = view === n.id
            return (
              <a
                key={n.id}
                href={`#${n.id}`}
                aria-current={on ? 'page' : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-[0.88rem] no-underline transition-colors ${on ? 'bg-[#C47840]/15 text-[#E0A070] font-medium' : 'text-[#9d9d95] hover:bg-[#141413] hover:text-white'}`}
              >
                <Icon size={17} aria-hidden="true" />
                {n.label}
              </a>
            )
          })}
        </nav>
        <div className="mt-auto space-y-1 pt-6 border-t border-[#1f1f1e]">
          <a href="/mobile.html" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-[0.84rem] text-[#9d9d95] hover:bg-[#141413] hover:text-white no-underline">
            <Smartphone size={16} aria-hidden="true" /> Mobile app sample
          </a>
          <a href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-[0.84rem] text-[#9d9d95] hover:bg-[#141413] hover:text-white no-underline">
            <ArrowLeft size={16} aria-hidden="true" /> Back to website
          </a>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 bg-[#080808]/90 backdrop-blur-md border-b border-[#1f1f1e]">
          <div className="flex items-center gap-4 px-5 lg:px-8 h-16">
            <a href="/" className="lg:hidden font-grotesk font-bold tracking-[0.25em] text-white no-underline">PARE<span className="text-[#C47840]">.</span></a>
            <div className="min-w-0">
              <h1 className="font-grotesk font-semibold text-[1.05rem] truncate">{current.title}</h1>
              <p className="hidden sm:block text-[0.74rem] text-[#77756f]">{fmtDay(now, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
            </div>
            <span className="ml-auto hidden md:inline-flex items-center gap-2 text-[0.74rem] text-[#CFB27F] border border-[#CFB27F]/30 bg-[#CFB27F]/10 rounded-full px-3 py-1">
              Sample data for presentation
            </span>
            <Button variant="primary" onClick={() => setCreating(true)} className="ml-auto md:ml-0">
              <Plus size={15} aria-hidden="true" /> New booking
            </Button>
          </div>
          <nav aria-label="Dashboard sections" className="lg:hidden flex gap-1 overflow-x-auto px-4 pb-2">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                aria-current={view === n.id ? 'page' : undefined}
                className={`whitespace-nowrap px-3 py-1.5 rounded-md text-[0.8rem] no-underline ${view === n.id ? 'bg-[#C47840]/15 text-[#E0A070]' : 'text-[#9d9d95]'}`}
              >
                {n.label}
              </a>
            ))}
          </nav>
        </header>

        <main className="px-5 lg:px-8 py-6 lg:py-8 max-w-[1440px]">
          <View state={state} now={now} actions={actions} go={go} />
        </main>
      </div>

      {creating && <NewBooking state={state} now={now} onClose={() => setCreating(false)} onCreate={actions.addBooking} />}
      {toastNode}
    </div>
  )
}
