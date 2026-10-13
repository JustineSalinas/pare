import { useEffect, useState } from 'react'
import { ArrowLeft, LayoutDashboard, Smartphone, Scissors, BellRing, RotateCcw, Zap, Gift } from 'lucide-react'
import { readStoredBookings, removeStoredBooking } from '../demo/data'
import ClientApp from './ClientApp'
import StaffApp from './StaffApp'
import Auth from './Auth'

const FRAME_W = 412
const FRAME_H = 866

function useViewport() {
  const read = () => ({ w: window.innerWidth, h: window.innerHeight })
  const [v, setV] = useState(read)
  useEffect(() => {
    const on = () => setV(read())
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return v
}

function PhoneFrame({ children, scale }) {
  return (
    <div style={{ width: FRAME_W * scale, height: FRAME_H * scale }}>
      <div
        className="rounded-[58px] bg-[#1d1d1c] p-[11px] shadow-[0_40px_90px_-20px_rgba(0,0,0,0.9),0_0_0_1.5px_#34342f]"
        style={{ width: FRAME_W, height: FRAME_H, transform: `scale(${scale})`, transformOrigin: 'top left' }}
      >
        <div className="relative w-[390px] h-[844px] rounded-[47px] overflow-hidden bg-black">
          <div className="absolute top-[11px] left-1/2 -translate-x-1/2 w-[112px] h-[31px] rounded-full bg-black z-[60]" aria-hidden="true" />
          {children}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[132px] h-[5px] rounded-full bg-white/70 z-[60] pointer-events-none" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}

function Segmented({ value, onChange }) {
  const items = [
    ['client', 'Client app', Smartphone],
    ['staff', 'Barber app', Scissors],
  ]
  return (
    <div className="inline-flex rounded-xl border border-[#33332f] p-1 bg-[#0e0e0d]" role="tablist" aria-label="App to preview">
      {items.map(([id, label, Icon]) => (
        <button
          key={id}
          role="tab"
          aria-selected={value === id}
          onClick={() => onChange(id)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-[0.86rem] font-medium whitespace-nowrap transition-colors ${value === id ? 'bg-[#C47840] text-[#080808]' : 'text-[#d8d5cd] hover:bg-[#181817]'}`}
        >
          <Icon size={15} aria-hidden="true" /> {label}
        </button>
      ))}
    </div>
  )
}

const ctl =
  'inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#33332f] text-[0.84rem] text-[#d8d5cd] hover:border-[#C47840] hover:text-white transition-colors disabled:opacity-40 disabled:hover:border-[#33332f] disabled:hover:text-[#d8d5cd]'

export default function MobileApp() {
  const [mode, setMode] = useState('client')
  const [push, setPush] = useState({ n: 0, kind: 'slot' })
  const [session, setSession] = useState(0)
  const [clientUser, setClientUser] = useState(null)
  const [staffIn, setStaffIn] = useState(false)
  const { w, h } = useViewport()
  const narrow = w < 900

  const sendPush = (kind) => {
    setMode('client')
    setPush((p) => ({ n: p.n + 1, kind }))
  }
  const reset = () => {
    readStoredBookings().filter((b) => b.source === 'app').forEach((b) => removeStoredBooking(b.id))
    setPush({ n: 0, kind: 'slot' })
    setClientUser(null)
    setStaffIn(false)
    setSession((s) => s + 1)
  }

  const app =
    mode === 'client' ? (
      clientUser ? (
        <ClientApp key={`c${session}`} pushSignal={push} user={clientUser} onLogout={() => setClientUser(null)} />
      ) : (
        <Auth key={`ca${session}`} role="client" onDone={setClientUser} />
      )
    ) : staffIn ? (
      <StaffApp key={`s${session}`} onSignOut={() => setStaffIn(false)} />
    ) : (
      <Auth key={`sa${session}`} role="staff" onDone={() => setStaffIn(true)} />
    )

  const controls = (
    <div className="flex flex-wrap gap-3">
      <button type="button" className={ctl} onClick={() => sendPush('slot')}><Zap size={15} aria-hidden="true" /> Send "slot opened" push</button>
      <button type="button" className={ctl} onClick={() => sendPush('reminder')}><BellRing size={15} aria-hidden="true" /> Send reminder push</button>
      <button type="button" className={ctl} onClick={reset}><RotateCcw size={15} aria-hidden="true" /> Reset demo</button>
    </div>
  )

  if (narrow) {
    return (
      <div className="h-[100dvh] flex flex-col bg-[#080808] text-[#ece9e3]">
        <div className="shrink-0 flex items-center gap-3 px-3 py-2 border-b border-[#1f1f1e] overflow-x-auto no-scrollbar">
          <a href="/" aria-label="Back to website" className="text-[#9d9d95] p-1"><ArrowLeft size={18} /></a>
          <Segmented value={mode} onChange={setMode} />
          <button type="button" className={`${ctl} !py-2 whitespace-nowrap`} onClick={() => sendPush('slot')}><Zap size={14} /> Push</button>
        </div>
        <div className="flex-1 min-h-0">{app}</div>
      </div>
    )
  }

  const scale = Math.min(1, (h - 32) / FRAME_H)

  return (
    <div className="min-h-screen bg-[#080808] text-[#ece9e3] font-sans" style={{ backgroundImage: 'radial-gradient(900px 600px at 72% 50%, rgba(196,120,64,0.10), transparent 70%)' }}>
      <div className="max-w-[1180px] mx-auto px-10 min-h-screen grid grid-cols-[minmax(0,1fr)_auto] items-center gap-16 py-4">
        <div className="max-w-[480px]">
          <div className="flex items-center gap-5 mb-10 text-[0.84rem]">
            <a href="/" className="inline-flex items-center gap-2 text-[#9d9d95] hover:text-white no-underline"><ArrowLeft size={15} /> Back to website</a>
            <a href="/admin.html#overview" className="inline-flex items-center gap-2 text-[#9d9d95] hover:text-white no-underline"><LayoutDashboard size={15} /> Admin dashboard</a>
          </div>

          <div className="font-grotesk font-bold text-[1.7rem] tracking-[0.3em] mb-5">PARE<span className="text-[#C47840]">.</span></div>
          <h1 className="font-grotesk font-bold text-[2.7rem] leading-[1.05] tracking-tight">Your usual cut, one tap away.</h1>
          <p className="text-[1.02rem] text-[#9d9d95] leading-relaxed mt-5 max-w-[430px]">
            A sample of the PARE app for clients and barbers. Everything on the phone is tappable.
          </p>

          <div className="mt-8"><Segmented value={mode} onChange={setMode} /></div>

          {mode === 'client' ? (
            <>
              <div className="mt-6">{controls}</div>
              <div className="mt-8 rounded-2xl border border-[#262624] bg-[#0e0e0d] p-5">
                <h2 className="font-grotesk font-semibold text-[0.98rem] mb-2.5">Try this during the demo</h2>
                <ol className="list-decimal pl-5 space-y-1.5 text-[0.88rem] text-[#9d9d95] leading-snug">
                  <li>Log in with the filled-in details, or choose <b className="text-[#ece9e3] font-medium">Sign up</b> to see the new-client start.</li>
                  <li>Tap <b className="text-[#ece9e3] font-medium">Rebook this slot</b> on the phone.</li>
                  <li>Open the <a href="/admin.html#schedule" className="text-[#C47840]">admin dashboard</a>. The booking shows up there within seconds.</li>
                  <li>Send the <b className="text-[#ece9e3] font-medium">slot opened</b> push, then tap the notification.</li>
                </ol>
              </div>
            </>
          ) : (
            <div className="mt-8 rounded-2xl border border-[#262624] bg-[#0e0e0d] p-5">
              <h2 className="font-grotesk font-semibold text-[0.98rem] mb-2.5">For the barbers</h2>
              <p className="text-[0.88rem] text-[#9d9d95] leading-snug">
                Barbers sign in first, then each sees their own day: who is next, who is in the chair, and notes on the client. Tap to check people in and finish cuts from the floor.
              </p>
            </div>
          )}

          <p className="flex items-start gap-2 text-[0.78rem] text-[#77756f] mt-8 leading-snug max-w-[430px]">
            <Gift size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
            Prototype for presentation. There is no server behind it yet, so bookings made here are saved in this browser only.
          </p>
        </div>

        <PhoneFrame scale={scale}>{app}</PhoneFrame>
      </div>
    </div>
  )
}
