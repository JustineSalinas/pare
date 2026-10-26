import { ArrowUpRight } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { BOOKING_URL } from '../lib/site'

export default function CtaBanner() {
  const ref = useReveal(0)

  return (
    <section id="cta" className="relative bg-ink border-t border-line text-center">
      <div ref={ref} className="reveal px-5 py-28 md:py-36">
        <p className="eyebrow eyebrow-center mb-6">Your Chair Is Waiting</p>
        <h2 className="display text-[clamp(2.4rem,6.5vw,5.5rem)] text-bone mb-6">
          Your best look
          <br />
          <span className="chrome-text">awaits.</span>
        </h2>
        <p className="font-serif italic text-[1.3rem] text-chrome-light mb-10">Book your appointment in under a minute.</p>
        <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="btn btn-chrome !px-10 !py-5">
          Book on Fresha <ArrowUpRight size={14} />
        </a>
      </div>
    </section>
  )
}
