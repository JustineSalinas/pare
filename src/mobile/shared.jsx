import { useEffect } from 'react'
import { Signal, Wifi, BatteryFull, X } from 'lucide-react'
import { pad, useNow } from '../demo/data'

export function StatusBar() {
  const now = useNow(15000)
  return (
    <div className="flex items-center justify-between px-7 pt-[14px] pb-1 text-[0.82rem] font-semibold text-white shrink-0" aria-hidden="true">
      <span className="font-grotesk w-12">{now.getHours()}:{pad(now.getMinutes())}</span>
      <span className="flex items-center gap-1.5 w-12 justify-end">
        <Signal size={14} />
        <Wifi size={14} />
        <BatteryFull size={17} />
      </span>
    </div>
  )
}

export function PrimaryButton({ className = '', ...rest }) {
  return (
    <button
      type="button"
      className={`w-full min-h-[52px] rounded-2xl bg-[#C47840] text-[#080808] font-grotesk font-semibold text-[0.98rem] active:scale-[0.98] transition-transform disabled:opacity-35 disabled:active:scale-100 ${className}`}
      {...rest}
    />
  )
}

export function GhostButton({ className = '', ...rest }) {
  return (
    <button
      type="button"
      className={`min-h-[44px] px-4 rounded-xl border border-[#33332f] text-[#ece9e3] text-[0.88rem] font-medium active:bg-[#1a1a19] transition-colors ${className}`}
      {...rest}
    />
  )
}

export function Sheet({ title, onClose, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <div className="absolute inset-0 z-40 flex items-end bg-black/65" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-label={title} className="w-full bg-[#151514] rounded-t-[28px] px-6 pt-3 pb-9 border-t border-[#2a2a28]">
        <div className="w-10 h-1 rounded-full bg-[#3a3a37] mx-auto mb-5" />
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-grotesk font-semibold text-[1.25rem]">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="w-9 h-9 rounded-full bg-[#222221] flex items-center justify-center text-[#9d9d95]">
            <X size={16} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

/* A strip of barber-pole stripes, the one decorative nod to the shop. */
export const poleStripe = {
  backgroundImage: 'repeating-linear-gradient(135deg, #C47840 0 7px, #ece9e3 7px 14px, #3c3c3a 14px 21px)',
}
