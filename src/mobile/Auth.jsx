import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { StatusBar, PrimaryButton, poleStripe } from './shared'

export const DEMO_CLIENT = { name: 'Marco Santos', first: 'Marco', phone: '+63 917 555 0142', returning: true, stamps: 6 }

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function TextField({ id, label, error, type = 'text', value, onChange, autoComplete, inputMode, trailing }) {
  return (
    <div>
      <label htmlFor={id} className="block text-[0.8rem] text-[#9d9d95] mb-1.5">{label}</label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          inputMode={inputMode}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${id}-err` : undefined}
          className={`w-full min-h-[52px] rounded-2xl bg-[#131312] border px-4 text-[0.95rem] text-[#ece9e3] placeholder:text-[#5f5d57] focus:outline-none focus:border-[#C47840] ${error ? 'border-[#D0695D]' : 'border-[#2a2a28]'} ${trailing ? 'pr-12' : ''}`}
        />
        {trailing}
      </div>
      {error && <p id={`${id}-err`} className="text-[0.76rem] text-[#E58B7F] mt-1.5">{error}</p>}
    </div>
  )
}

function PasswordField({ id, label, error, value, onChange, autoComplete }) {
  const [show, setShow] = useState(false)
  return (
    <TextField
      id={id}
      label={label}
      error={error}
      type={show ? 'text' : 'password'}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      trailing={
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? 'Hide password' : 'Show password'}
          className="absolute right-1 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-[#9d9d95]"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      }
    />
  )
}

export default function Auth({ role, onDone }) {
  const staff = role === 'staff'
  const [tab, setTab] = useState('login')
  const [busy, setBusy] = useState(false)
  const [errors, setErrors] = useState({})
  const [note, setNote] = useState('')

  const [login, setLogin] = useState({ id: staff ? 'kim@pare.example' : 'marco.santos@example.com', password: 'sample-password' })
  const [signup, setSignup] = useState({ name: '', phone: '', email: '', password: '' })

  const finish = (user) => {
    setBusy(true)
    setTimeout(() => onDone(user), 650)
  }

  const submit = (e) => {
    e.preventDefault()
    const err = {}
    if (tab === 'login') {
      if (!login.id.trim()) err.id = staff ? 'Enter your barber email.' : 'Enter your email or mobile number.'
      if (!login.password) err.password = 'Enter your password.'
      setErrors(err)
      if (Object.keys(err).length) return
      finish(staff ? undefined : DEMO_CLIENT)
    } else {
      if (!signup.name.trim()) err.name = 'Enter your full name.'
      if (!signup.phone.trim()) err.phone = 'Enter a mobile number so we can send reminders.'
      if (!EMAIL.test(signup.email.trim())) err.email = 'Enter a valid email, like name@example.com.'
      if (signup.password.length < 6) err.password = 'Use at least 6 characters for your password.'
      setErrors(err)
      if (Object.keys(err).length) return
      const name = signup.name.trim()
      finish({ name, first: name.split(/\s+/)[0], phone: signup.phone.trim(), returning: false, stamps: 0 })
    }
  }

  const switchTab = (t) => {
    setTab(t)
    setErrors({})
    setNote('')
  }

  return (
    <div className="flex flex-col h-full bg-[#0c0c0b] text-[#ece9e3] font-sans">
      <StatusBar />
      <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-8">
        <div className="pt-8 flex items-center gap-4">
          <span className="w-2 h-11 rounded-sm" style={poleStripe} aria-hidden="true" />
          <div>
            <div className="font-grotesk font-bold text-[1.6rem] tracking-[0.3em] leading-none">PARE<span className="text-[#C47840]">.</span></div>
            <p className="text-[0.76rem] text-[#77756f] mt-1.5">{staff ? 'Barber app' : "Men's Grooming & Lifestyle"}</p>
          </div>
        </div>

        <h1 className="font-grotesk font-bold text-[1.9rem] leading-tight tracking-tight mt-9">
          {staff ? 'Barber sign in' : tab === 'login' ? 'Welcome back' : 'Create your account'}
        </h1>
        <p className="text-[0.9rem] text-[#9d9d95] mt-2 leading-snug">
          {staff
            ? 'Sign in to see your chair for the day.'
            : tab === 'login'
              ? 'Log in to rebook your usual cut in one tap.'
              : 'Book in under a minute and collect a stamp with every cut.'}
        </p>

        {!staff && (
          <div className="grid grid-cols-2 mt-6 p-1 rounded-2xl bg-[#131312] border border-[#232321]" role="tablist" aria-label="Log in or sign up">
            {[['login', 'Log in'], ['signup', 'Sign up']].map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={tab === id}
                onClick={() => switchTab(id)}
                className={`min-h-[44px] rounded-xl text-[0.9rem] font-medium transition-colors ${tab === id ? 'bg-[#C47840] text-[#080808] font-semibold' : 'text-[#d8d5cd]'}`}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={submit} noValidate className="mt-6 space-y-4">
          {tab === 'login' ? (
            <>
              <TextField
                id="auth-id"
                label={staff ? 'Barber email' : 'Email or mobile number'}
                value={login.id}
                onChange={(v) => setLogin({ ...login, id: v })}
                error={errors.id}
                autoComplete="username"
              />
              <PasswordField id="auth-pw" label="Password" value={login.password} onChange={(v) => setLogin({ ...login, password: v })} error={errors.password} autoComplete="current-password" />
              <div className="flex justify-end -mt-1">
                <button type="button" onClick={() => setNote('Password reset is not part of this sample.')} className="text-[0.8rem] text-[#C47840] min-h-[36px]">
                  Forgot password?
                </button>
              </div>
            </>
          ) : (
            <>
              <TextField id="su-name" label="Full name" value={signup.name} onChange={(v) => setSignup({ ...signup, name: v })} error={errors.name} autoComplete="name" />
              <TextField id="su-phone" label="Mobile number" value={signup.phone} onChange={(v) => setSignup({ ...signup, phone: v })} error={errors.phone} autoComplete="tel" inputMode="tel" />
              <TextField id="su-email" label="Email" type="email" value={signup.email} onChange={(v) => setSignup({ ...signup, email: v })} error={errors.email} autoComplete="email" />
              <PasswordField id="su-pw" label="Password" value={signup.password} onChange={(v) => setSignup({ ...signup, password: v })} error={errors.password} autoComplete="new-password" />
            </>
          )}

          {note && <p role="status" className="text-[0.8rem] text-[#9d9d95] bg-[#131312] rounded-xl px-3.5 py-2.5">{note}</p>}

          <PrimaryButton type="submit" disabled={busy} className="mt-2">
            {busy ? (tab === 'login' ? 'Signing in' : 'Creating account') : tab === 'login' ? (staff ? 'Sign in' : 'Log in') : 'Create account'}
          </PrimaryButton>
        </form>

        <p className="text-[0.74rem] text-[#5f5d57] text-center mt-6 leading-snug">
          Sample screen for presentation. Nothing is sent or saved.
        </p>
      </div>
    </div>
  )
}
