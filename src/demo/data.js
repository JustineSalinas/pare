import { useEffect, useState } from 'react'
import { serviceCategories } from '../lib/servicesData'

/* ───────────── formatting helpers ───────────── */

export const pad = (n) => String(n).padStart(2, '0')
export const dateKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
export const parseKey = (k) => {
  const [y, m, d] = k.split('-').map(Number)
  return new Date(y, m - 1, d)
}
export const addDays = (d, n) => {
  const x = new Date(d)
  x.setDate(x.getDate() + n)
  return x
}
export const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
export const parsePrice = (s) => Number(String(s).replace(/[^0-9]/g, ''))
export const parseDuration = (s) => {
  const h = /(\d+)\s*hr/.exec(s || '')
  const m = /(\d+)\s*min/.exec(s || '')
  return (h ? Number(h[1]) * 60 : 0) + (m ? Number(m[1]) : 0)
}
export const peso = (n) => '₱' + Math.round(n).toLocaleString('en-PH')
export const fmtTime = (mins) => {
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return `${h % 12 || 12}:${pad(m)} ${h >= 12 ? 'PM' : 'AM'}`
}
export const parseTime = (t) => {
  const m = /(\d+):(\d+)\s*(AM|PM)/i.exec(t || '')
  if (!m) return 540
  let h = Number(m[1]) % 12
  if (m[3].toUpperCase() === 'PM') h += 12
  return h * 60 + Number(m[2])
}
export const fmtDuration = (mins) => {
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return [h ? `${h} hr` : '', m ? `${m} min` : ''].filter(Boolean).join(' ')
}
export const fmtDay = (d, opts = { weekday: 'short', month: 'short', day: 'numeric' }) =>
  d.toLocaleDateString('en-PH', opts)

/* ───────────── shop facts (from the live site) ───────────── */

export const hoursFor = (date) => (date.getDay() === 0 ? [540, 1080] : [540, 1140])

export const BARBERS = [
  { id: 'vin', name: 'Vin', role: 'Head Barber Stylist', photo: '/vinprofile.webp', off: 2, owner: true },
  { id: 'kim', name: 'Kim', role: 'Senior Barber', photo: '/kimprofile.webp', off: 3 },
  { id: 'william', name: 'William', role: 'Senior Barber Stylist', photo: '/williamprofile.webp', off: 4 },
  { id: 'arthur', name: 'Arthur', role: 'Senior Barber Stylist', photo: '/arthurprofile.webp', off: 1 },
  { id: 'paulo', name: 'Paulo', role: 'Barber Stylist', photo: '/pauloprofile.webp', off: 5 },
]
export const BARBER_BY_ID = Object.fromEntries(BARBERS.map((b) => [b.id, b]))
export const barberName = (id) => (id === 'any' ? 'Any barber' : BARBER_BY_ID[id]?.name || 'Unassigned')
export const isWorking = (barber, date) => barber.off !== date.getDay()

export const SLOT_TIMES = [
  '9:00 AM', '9:45 AM', '10:30 AM', '11:15 AM', '12:00 PM', '1:00 PM', '1:45 PM',
  '2:30 PM', '3:15 PM', '4:00 PM', '4:45 PM', '5:30 PM', '6:15 PM',
]

const allServices = serviceCategories.flatMap((c) =>
  c.services.map((s) => ({
    id: s.id,
    name: s.name.replace(/^✪\s*/, ''),
    price: parsePrice(s.price),
    duration: parseDuration(s.duration),
    durationLabel: s.duration,
    category: c.name,
    categoryId: c.id,
  }))
)
export const SERVICE_BY_ID = Object.fromEntries(allServices.map((s) => [s.id, s]))
export const SERVICES = (() => {
  const seen = new Set()
  return allServices.filter((s) => {
    if (seen.has(s.name)) return false
    seen.add(s.name)
    return true
  })
})()
export const DAILY_SERVICES = SERVICES.filter((s) => s.categoryId !== 'wedding-pkgs')

const SERVICE_WEIGHTS = [
  ['basic-haircut', 0.36], ['haircut-beard', 0.24], ['haircut-consultation', 0.12],
  ['long-haircut', 0.08], ['student-haircut', 0.08], ['haircut-hot-shave', 0.06],
  ['pare-premium', 0.04], ['aesop-facial', 0.02],
]

/* ───────────── deterministic sample data ───────────── */

function mulberry32(a) {
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const hash = (s) => {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

const FIRST = ['Marco', 'Jaymar', 'Kenneth', 'Paolo', 'Rey', 'Carlo', 'Nico', 'Migs', 'Lance', 'Jericho',
  'Ralph', 'Enzo', 'Dan', 'Ivan', 'Joel', 'Karl', 'Gio', 'Bryan', 'Harvey', 'Aldrin', 'Kiefer', 'Louie',
  'Renz', 'Tristan', 'Jude', 'Cyrus', 'Adrian', 'Miko']
const LAST = ['Santos', 'Reyes', 'Garcia', 'Ramos', 'Mendoza', 'Torres', 'Villanueva', 'Gonzales', 'Navarro',
  'Salcedo', 'Lopez', 'Tan', 'Aguilar', 'Bautista', 'Castillo', 'Domingo', 'Espino', 'Fabian', 'Gutierrez', 'Hernandez']
const PREFS = ['Mid fade, textured top', 'Low taper, scissor-cut sides', 'Skin fade, sharp line-up',
  'Classic side part, hot towel finish', 'Long layers, trim only', 'Buzz cut #2, beard line-up',
  'Textured crop, matte clay', 'Undercut, slicked back']
const NOTES = ['Prefers a quiet chair', 'Bringing a reference photo', 'Sensitive scalp, go easy on the razor',
  'Running about 10 minutes late', 'Celebrating a promotion, wants the full works']

const REGULARS = 50
export const CLIENT_POOL = Array.from({ length: 420 }, (_, i) => {
  const r = mulberry32(hash('client' + i))
  const q = Math.floor(i / FIRST.length)
  const name = `${FIRST[i % FIRST.length]} ${LAST[(q * 7 + (i % FIRST.length)) % LAST.length]}`
  const phone = `+63 9${Math.floor(r() * 10)}${Math.floor(r() * 10)} 555 ${String(Math.floor(r() * 10000)).padStart(4, '0')}`
  return { name, phone, pref: PREFS[Math.floor(r() * PREFS.length)] }
})
export const CLIENT_PREF = Object.fromEntries(CLIENT_POOL.map((c) => [c.name, c.pref]))

function pickService(rng) {
  let r = rng()
  for (const [id, w] of SERVICE_WEIGHTS) {
    if (r < w) return SERVICE_BY_ID[id]
    r -= w
  }
  return SERVICE_BY_ID['basic-haircut']
}
const pickClient = (rng) =>
  rng() < 0.3
    ? CLIENT_POOL[Math.floor(rng() * REGULARS)]
    : CLIENT_POOL[REGULARS + Math.floor(rng() * (CLIENT_POOL.length - REGULARS))]

export const OPEN_STATUSES = ['confirmed', 'arrived', 'in_chair']

export function buildSeed(now = new Date()) {
  const today = startOfDay(now)
  const nowMin = now.getHours() * 60 + now.getMinutes()
  const out = []

  for (let off = -60; off <= 7; off++) {
    const day = addDays(today, off)
    const key = dateKey(day)
    const wd = day.getDay()
    const [open, close] = hoursFor(day)
    let busy = wd === 6 || wd === 0 ? 0.88 : wd === 5 ? 0.74 : 0.58
    if (off > 4) busy *= 0.4
    else if (off > 2) busy *= 0.7

    for (const b of BARBERS) {
      if (!isWorking(b, day)) continue
      const rng = mulberry32(hash(key + b.id))
      let cur = open + Math.floor(rng() * 3) * 15
      while (cur < close - 30) {
        if (rng() > busy) {
          cur += 45
          continue
        }
        const svc = pickService(rng)
        if (cur + svc.duration > close) break
        const client = pickClient(rng)
        const end = cur + svc.duration

        let status = 'confirmed'
        if (off < 0) {
          const r = rng()
          status = r < 0.87 ? 'completed' : r < 0.94 ? 'no_show' : 'cancelled'
        } else if (off === 0) {
          if (end <= nowMin) status = rng() < 0.95 ? 'completed' : 'no_show'
          else if (cur <= nowMin) status = 'in_chair'
          else if (cur - nowMin <= 20) status = rng() < 0.6 ? 'arrived' : 'confirmed'
        }

        const sr = rng()
        const source = sr < 0.5 ? 'website' : sr < 0.76 ? 'walk-in' : 'messenger'
        const id = `S-${key}-${b.id}-${cur}`
        out.push({
          id,
          code: 'BK-' + hash(id).toString(36).toUpperCase().slice(0, 5),
          clientName: client.name,
          phone: client.phone,
          serviceId: svc.id,
          serviceName: svc.name,
          price: svc.price,
          duration: svc.duration,
          barberId: b.id,
          date: key,
          start: cur,
          status,
          source,
          notes: rng() < 0.1 ? NOTES[Math.floor(rng() * NOTES.length)] : '',
          reminded: status === 'confirmed' && off >= 0 && off <= 1 && source !== 'walk-in',
        })
        cur += svc.duration + Math.floor(rng() * 3) * 15
      }
    }
  }
  return out
}

export const SEED_WAITLIST = [
  { id: 'WL1', name: 'Rafael Lim', barberId: 'kim', window: 'Saturday afternoon', service: 'Haircut & Beard trim', since: '2 days ago', status: 'waiting' },
  { id: 'WL2', name: 'Eugene Ty', barberId: 'vin', window: 'Any evening this week', service: 'Haircut + Consultation', since: 'Yesterday', status: 'waiting' },
  { id: 'WL3', name: 'Dominic Arce', barberId: 'any', window: 'Sunday morning', service: 'Basic Haircut & Style', since: '3 hours ago', status: 'waiting' },
  { id: 'WL4', name: 'Zandro Pe', barberId: 'william', window: 'Friday after 4 PM', service: 'Long Haircut & Style', since: 'This morning', status: 'waiting' },
]

export const WEDDING_STAGES = [
  { id: 'new', label: 'New enquiry' },
  { id: 'quoted', label: 'Quote sent' },
  { id: 'deposit', label: 'Deposit paid' },
  { id: 'scheduled', label: 'Scheduled' },
  { id: 'done', label: 'Completed' },
]
export const SEED_ENQUIRIES = [
  { id: 'W1', name: 'Gabriel & Hannah', stage: 'new', inDays: 96, party: 6, pkg: 'Groom & Entourage', value: 15500, note: 'Garden venue in Jaro, would like on-site styling.' },
  { id: 'W2', name: 'Miguel & Trisha', stage: 'new', inDays: 41, party: 3, pkg: 'Groom & Bestman', value: 7500, note: 'Asked about a trial cut a week before.' },
  { id: 'W3', name: 'Jonas & Clarisse', stage: 'quoted', inDays: 63, party: 8, pkg: 'Groom & Entourage', value: 15500, note: 'Comparing us with one other shop. Follow up Thursday.' },
  { id: 'W4', name: 'Enrico & Bea', stage: 'deposit', inDays: 28, party: 2, pkg: 'Basic Groom', value: 5500, note: 'Deposit received. Morning slot with Vin requested.' },
  { id: 'W5', name: 'Patrick & Sheena', stage: 'scheduled', inDays: 12, party: 5, pkg: 'Groom & Entourage', value: 15500, note: 'Full day booked, 7 hr block starting 8 AM.' },
  { id: 'W6', name: 'Leandro & Joy', stage: 'done', inDays: -9, party: 4, pkg: 'Groom & Bestman', value: 7500, note: 'Left a five-star review.' },
]

/* ───────────── bookings made on the website / app sample ───────────── */

const STORE_KEY = 'pare_bookings'

function mapStored(r) {
  if (!r || !r.date || !r.time) return null
  const known = SERVICE_BY_ID[r.service?.id]
  const price = known ? known.price : parsePrice(r.service?.price)
  const duration = known ? known.duration : parseDuration(r.service?.duration) || 45
  return {
    id: r.id,
    code: r.id,
    clientName: r.client?.name || 'Guest',
    phone: r.client?.phone || '',
    serviceId: r.service?.id || '',
    serviceName: known ? known.name : (r.service?.name || 'Service').replace(/^✪\s*/, ''),
    price,
    duration,
    barberId: r.barber?.id || 'any',
    date: r.date,
    start: parseTime(r.time),
    status: 'confirmed',
    source: r.source || 'website',
    notes: r.client?.notes || '',
    reminded: true,
    fresh: true,
  }
}

export function readStoredBookings() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || '[]')
    return Array.isArray(raw) ? raw.map(mapStored).filter(Boolean) : []
  } catch {
    return []
  }
}

export function saveStoredBooking(record) {
  try {
    const existing = JSON.parse(localStorage.getItem(STORE_KEY) || '[]')
    existing.push(record)
    localStorage.setItem(STORE_KEY, JSON.stringify(existing))
    window.dispatchEvent(new Event('pare-bookings-changed'))
  } catch {
    /* storage unavailable (private window): the demo still works without it */
  }
}

export function useStoredBookings() {
  const [list, setList] = useState(readStoredBookings)
  useEffect(() => {
    const refresh = () => setList(readStoredBookings())
    window.addEventListener('storage', refresh)
    window.addEventListener('focus', refresh)
    window.addEventListener('pare-bookings-changed', refresh)
    const t = setInterval(refresh, 3000)
    return () => {
      window.removeEventListener('storage', refresh)
      window.removeEventListener('focus', refresh)
      window.removeEventListener('pare-bookings-changed', refresh)
      clearInterval(t)
    }
  }, [])
  return list
}

/* ───────────── scheduling rules ───────────── */

export const overlaps = (a0, a1, b0, b1) => a0 < b1 && b0 < a1

export function findConflict(bookings, { barberId, date, start, duration, ignoreId }) {
  if (!barberId || barberId === 'any') return null
  return (
    bookings.find(
      (b) =>
        b.id !== ignoreId &&
        b.barberId === barberId &&
        b.date === date &&
        b.status !== 'cancelled' &&
        overlaps(start, start + duration, b.start, b.start + b.duration)
    ) || null
  )
}

export function useNow(intervalMs = 30000) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), intervalMs)
    return () => clearInterval(t)
  }, [intervalMs])
  return now
}

export function removeStoredBooking(id) {
  try {
    const list = JSON.parse(localStorage.getItem(STORE_KEY) || '[]').filter((r) => r.id !== id)
    localStorage.setItem(STORE_KEY, JSON.stringify(list))
    window.dispatchEvent(new Event('pare-bookings-changed'))
  } catch {
    /* storage unavailable */
  }
}

export function isSlotFree(bookings, { barberId, date, start, duration }) {
  const day = parseKey(date)
  const [, close] = hoursFor(day)
  if (start + duration > close) return false
  const pool =
    barberId === 'any'
      ? BARBERS.filter((b) => isWorking(b, day)).map((b) => b.id)
      : BARBER_BY_ID[barberId] && isWorking(BARBER_BY_ID[barberId], day)
        ? [barberId]
        : []
  return pool.some((id) => !findConflict(bookings, { barberId: id, date, start, duration }))
}

export function nextAvailable(bookings, { barberId, duration, from = new Date(), days = 14 }) {
  const today = startOfDay(from)
  const nowMin = from.getHours() * 60 + from.getMinutes()
  for (let off = 0; off <= days; off++) {
    const key = dateKey(addDays(today, off))
    for (const t of SLOT_TIMES) {
      const start = parseTime(t)
      if (off === 0 && start < nowMin + 30) continue
      if (isSlotFree(bookings, { barberId, date: key, start, duration })) return { date: key, start }
    }
  }
  return null
}
