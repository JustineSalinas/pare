import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Film from '../components/Film'
import About from '../components/About'
import LoopVideo from '../components/LoopVideo'
import { useReveal } from '../hooks/useReveal'
import { BOOKING_URL, VIDEO } from '../lib/site'

// Same outline as Sota's About: statement → quote + film → the story → full-bleed band
export default function AboutPage() {
  const bandRef = useReveal(0)

  useEffect(() => {
    document.title = 'Our Story | PARE Iloilo City'
  }, [])

  return (
    <main className="bg-ink">
      <header className="pt-36 md:pt-44 pb-4 px-5 text-center animate-fadeUp">
        <p className="eyebrow eyebrow-center mb-7">Our Story</p>
        <h1 className="max-w-[900px] mx-auto font-display font-semibold text-[clamp(1.6rem,3.2vw,2.6rem)] leading-[1.3] text-bone">
          PARE is a men's grooming and lifestyle space built around <em className="font-serif italic font-medium chrome-text">great hair</em>, good
          conversation and <em className="font-serif italic font-medium chrome-text">genuine connection.</em>
        </h1>
      </header>

      <Film showTicker={false} />
      <About />

      <section className="relative overflow-hidden min-h-[80vh] flex items-center">
        <LoopVideo src={VIDEO.chairs} className="absolute inset-0 w-full h-full" label="The PARE barber chairs" />
        <div className="absolute inset-0 bg-ink/50" />
        <div className="relative w-full max-w-[1440px] mx-auto px-5 md:px-10 py-24">
          <div ref={bandRef} className="reveal max-w-[560px] p-8 md:p-10 bg-chrome-light/80 backdrop-blur-md text-ink">
            <p className="text-[0.74rem] tracking-[0.06em] uppercase mb-3">PARE · Iloilo City</p>
            <h2 className="font-display font-black text-[clamp(1.8rem,3.2vw,2.4rem)] leading-[1.05] mb-4" style={{ fontVariationSettings: "'wdth' 112" }}>
              About PARE
            </h2>
            <p className="text-[1rem] leading-[1.65] text-ink/80 mb-7">
              Precision barbering meets contemporary men's hairdressing, with looks designed around the person. Beyond
              the chair, PARE brings together grooming, coffee, education, style and community in one considered space.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="btn btn-ink">
                Book an Appointment <ArrowUpRight size={13} />
              </a>
              <Link to="/services" className="btn border border-ink/40 text-ink hover:border-ink">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
