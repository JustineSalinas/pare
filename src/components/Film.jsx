import LoopVideo from './LoopVideo'
import { useReveal } from '../hooks/useReveal'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { VIDEO } from '../lib/site'

const tickerItems = [
  "Men's Grooming",
  'High-End Haircuts',
  'Iloilo City',
  'Beard Styling',
  'Wedding Packages',
  'Facial Treatments',
  '5 Star Rated',
  'The Alcove',
]

export default function Film({ showTicker = true }) {
  const quoteRef = useReveal(0)
  const stageRef = useScrollProgress('sticky')

  return (
    <section id="film" className="relative bg-ink">
      <div ref={quoteRef} className="reveal max-w-5xl mx-auto px-5 md:px-10 pt-28 md:pt-36 pb-16 text-center">
        <p className="font-serif text-[clamp(1.6rem,3.6vw,2.9rem)] leading-[1.25] text-bone">
          "Not just a haircut. It's <em className="chrome-text not-italic font-medium">character</em> crafted through
          texture and shape. Every angle tells a different story."
        </p>
        <p className="mt-6 text-[0.68rem] tracking-[0.3em] uppercase text-chrome-dark">Vin Paredes · Owner &amp; Head Barber</p>
      </div>

      {/* The film opens from an inset frame to full-bleed as it scrolls through the sticky stage */}
      <div ref={stageRef} className="relative h-[170vh]" style={{ '--p': 0 }}>
        <div className="sticky top-0 h-[100svh] flex items-center justify-center overflow-hidden">
          <div
            className="relative w-full h-full overflow-hidden will-change-transform"
            style={{
              transform: 'scale(calc(0.78 + 0.22 * min(1, var(--p) * 1.6)))',
              borderRadius: 'calc(18px * (1 - min(1, var(--p) * 1.6)))',
            }}
          >
            <LoopVideo src={VIDEO.film} className="absolute inset-0 w-full h-full" label="Scissor work at PARE" />
            <div className="absolute inset-0 bg-ink/35" />
            <div
              className="absolute inset-x-0 bottom-0 p-6 md:p-12 flex flex-col md:flex-row md:items-end justify-between gap-4"
              style={{ opacity: 'clamp(0, calc((var(--p) - 0.35) * 4), 1)' }}
            >
              <h2 className="display text-[clamp(2.2rem,6vw,5.5rem)] text-bone max-w-[12ch]">
                Beyond the cut.
              </h2>
              <p className="text-[0.95rem] leading-[1.7] text-chrome-light max-w-[340px]">
                45-minute appointments so every cut is done correctly, with no rush. Wash, blow dry, style and a hot towel finish.
              </p>
            </div>
          </div>
        </div>
      </div>

      {showTicker && (
        <div className="border-y border-line py-5 overflow-hidden" aria-hidden="true">
          <div className="animate-ticker flex w-max">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} className="flex items-center">
                <span className="display text-[0.95rem] tracking-[0.08em] chrome-text px-8">{item}</span>
                <span className="w-1 h-1 rounded-full bg-chrome-dark" />
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
