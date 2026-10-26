import { ArrowUpRight } from 'lucide-react'
import LoopVideo from './LoopVideo'
import { useReveal } from '../hooks/useReveal'
import { BOOKING_URL, VIDEO } from '../lib/site'

export default function CtaBanner() {
  const ref = useReveal(0)

  return (
    <section id="cta" className="relative overflow-hidden min-h-[80vh] flex items-center justify-center text-center">
      <LoopVideo src={VIDEO.beard} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-ink/70" />
      <div ref={ref} className="reveal relative z-10 px-5 py-28">
        <p className="eyebrow mb-6 justify-center">Your Chair Is Waiting</p>
        <h2 className="display text-[clamp(2.6rem,8vw,7rem)] text-bone mb-6">
          Your best look
          <br />
          <span className="chrome-text">awaits.</span>
        </h2>
        <p className="font-serif italic text-[1.35rem] text-chrome-light mb-10">Book your appointment in under a minute.</p>
        <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="btn btn-chrome !px-10 !py-5">
          Book on Fresha <ArrowUpRight size={14} />
        </a>
      </div>
    </section>
  )
}
