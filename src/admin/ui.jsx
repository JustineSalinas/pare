import { useCallback, useEffect, useRef, useState } from 'react'
import {
  CalendarCheck, Armchair, CircleCheck, UserX, Ban, DoorOpen,
  Globe, Footprints, MessageCircle, Smartphone, Check, RotateCcw, Play, X,
} from 'lucide-react'

/* Status colours are paired with an icon and a label everywhere they appear,
   so meaning never depends on colour alone. */
export const STATUS = {
  confirmed: { label: 'Confirmed', icon: CalendarCheck, fg: '#E0A070', bg: 'rgba(196,120,64,0.16)', edge: '#C47840' },
  arrived: { label: 'Arrived', icon: DoorOpen, fg: '#9CC0DA', bg: 'rgba(143,180,207,0.16)', edge: '#8FB4CF' },
  in_chair: { label: 'In the chair', icon: Armchair, fg: '#080808', bg: '#C47840', edge: '#E3A068' },
  completed: { label: 'Completed', icon: CircleCheck, fg: '#8FC19C', bg: 'rgba(127,174,138,0.14)', edge: '#7FAE8A' },
  no_show: { label: 'No-show', icon: UserX, fg: '#E58B7F', bg: 'rgba(208,105,93,0.16)', edge: '#D0695D' },
  cancelled: { label: 'Cancelled', icon: Ban, fg: '#8d8b84', bg: 'rgba(141,139,132,0.12)', edge: '#6b6962' },
}

export const SOURCE = {
  website: { label: 'Website', icon: Globe },
  'walk-in': { label: 'Walk-in', icon: Footprints },
  messenger: { label: 'Messenger', icon: MessageCircle },
  app: { label: 'Mobile app', icon: Smartphone },
}

export function StatusBadge({ status, className = '' }) {
  const s = STATUS[status] || STATUS.confirmed
  const Icon = s.icon
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.72rem] font-medium whitespace-nowrap ${className}`}
      style={{ color: s.fg, background: s.bg }}
    >
      <Icon size={12} aria-hidden="true" />
      {s.label}
    </span>
  )
}

export function SourceTag({ source }) {
  const s = SOURCE[source] || SOURCE.website
  const Icon = s.icon
  return (
    <span className="inline-flex items-center gap-1.5 text-[0.75rem] text-[#9d9d95] whitespace-nowrap">
      <Icon size={12} aria-hidden="true" />
      {s.label}
    </span>
  )
}

const TINTS = ['#C47840', '#8FB4CF', '#7FAE8A', '#B58FCF', '#CFB27F', '#CF8F9B']
export function Avatar({ name, size = 32 }) {
  const initials = name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()
  let h = 0
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) >>> 0
  const tint = TINTS[h % TINTS.length]
  return (
    <span
      aria-hidden="true"
      className="inline-flex items-center justify-center rounded-full font-grotesk font-semibold shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.36, color: tint, background: `${tint}26` }}
    >
      {initials}
    </span>
  )
}

export function BarberChip({ barber, size = 22 }) {
  if (!barber) {
    return <span className="text-[0.8rem] text-[#9d9d95]">Any barber</span>
  }
  return (
    <span className="inline-flex items-center gap-2 text-[0.8rem] text-[#d8d5cd] whitespace-nowrap">
      <img src={barber.photo} alt="" width={size} height={size} className="rounded-full object-cover object-top bg-[#222]" style={{ width: size, height: size }} />
      {barber.name}
    </span>
  )
}

export function Panel({ title, action, children, className = '', pad = true }) {
  return (
    <section className={`bg-[#101010] border border-[#262624] rounded-lg ${className}`}>
      {(title || action) && (
        <header className="flex items-center justify-between gap-4 px-5 pt-4 pb-3">
          {title && <h2 className="font-grotesk font-semibold text-[0.95rem] text-[#ece9e3]">{title}</h2>}
          {action}
        </header>
      )}
      <div className={pad ? 'px-5 pb-5' : ''}>{children}</div>
    </section>
  )
}

export function Button({ variant = 'ghost', size = 'md', className = '', ...rest }) {
  const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C47840]'
  const sizes = { sm: 'px-2.5 py-1.5 text-[0.75rem]', md: 'px-4 py-2.5 text-[0.82rem]' }
  const variants = {
    primary: 'bg-[#C47840] text-[#080808] hover:bg-[#D9906A]',
    ghost: 'border border-[#33332f] text-[#d8d5cd] hover:border-[#C47840] hover:text-white',
    danger: 'border border-[#4a2b27] text-[#E58B7F] hover:bg-[#2a1816]',
  }
  return <button type="button" className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...rest} />
}

/* Allowed next steps for each status, used by the schedule detail and the bookings table. */
const TRANSITIONS = {
  confirmed: [
    { to: 'arrived', label: 'Check in', icon: DoorOpen, variant: 'primary' },
    { to: 'no_show', label: 'No-show', icon: UserX, variant: 'ghost' },
    { to: 'cancelled', label: 'Cancel', icon: X, variant: 'danger' },
  ],
  arrived: [
    { to: 'in_chair', label: 'Start cut', icon: Play, variant: 'primary' },
    { to: 'no_show', label: 'No-show', icon: UserX, variant: 'ghost' },
  ],
  in_chair: [{ to: 'completed', label: 'Complete', icon: Check, variant: 'primary' }],
  completed: [],
  no_show: [{ to: 'confirmed', label: 'Restore', icon: RotateCcw, variant: 'ghost' }],
  cancelled: [{ to: 'confirmed', label: 'Restore', icon: RotateCcw, variant: 'ghost' }],
}

export function StatusActions({ booking, onChange, size = 'sm', only }) {
  const list = (TRANSITIONS[booking.status] || []).filter((t) => !only || only.includes(t.to))
  if (!list.length) return null
  return (
    <div className="flex flex-wrap gap-2">
      {list.map((t) => {
        const Icon = t.icon
        return (
          <Button key={t.to} size={size} variant={t.variant} onClick={() => onChange(booking, t.to)}>
            <Icon size={13} aria-hidden="true" />
            {t.label}
          </Button>
        )
      })}
    </div>
  )
}

export function useToasts() {
  const [toasts, setToasts] = useState([])
  const idRef = useRef(0)
  const push = useCallback((message, tone = 'ok') => {
    const id = ++idRef.current
    setToasts((t) => [...t.slice(-2), { id, message, tone }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4800)
  }, [])
  const node = (
    <div className="fixed bottom-5 right-5 z-[80] flex flex-col gap-2 max-w-[360px]" role="status" aria-live="polite">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="bg-[#1a1a19] border border-[#33332f] border-l-[3px] rounded-md px-4 py-3 text-[0.82rem] text-[#ece9e3] shadow-2xl shadow-black/60"
          style={{ borderLeftColor: t.tone === 'warn' ? '#D0695D' : '#C47840' }}
        >
          {t.message}
        </div>
      ))}
    </div>
  )
  return [push, node]
}

export function Modal({ title, onClose, children, width = 'max-w-md' }) {
  const ref = useRef(null)
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    ref.current?.querySelector('input, select, button')?.focus()
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={ref} role="dialog" aria-modal="true" aria-label={title} className={`w-full ${width} bg-[#121211] border border-[#33332f] rounded-lg shadow-2xl`}>
        <header className="flex items-center justify-between px-5 py-4 border-b border-[#262624]">
          <h2 className="font-grotesk font-semibold text-[1rem]">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="text-[#9d9d95] hover:text-white p-1">
            <X size={18} />
          </button>
        </header>
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}

export function Field({ label, children, hint }) {
  return (
    <label className="block mb-4">
      <span className="block text-[0.78rem] text-[#9d9d95] mb-1.5">{label}</span>
      {children}
      {hint && <span className="block text-[0.72rem] text-[#77756f] mt-1">{hint}</span>}
    </label>
  )
}

export const inputCls =
  'w-full bg-[#0b0b0a] border border-[#33332f] rounded-md px-3 py-2.5 text-[0.85rem] text-[#ece9e3] placeholder:text-[#5f5d57] focus:outline-none focus:border-[#C47840]'
