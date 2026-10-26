import { useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import LoopVideo from './LoopVideo'
import { INSTAGRAM_URL, VIDEO } from '../lib/site'

// Two-up 16:9 video lookbook, the same grid Sota uses, with PARE's own chrome
const reels = [
  { src: VIDEO.film, caption: 'Scissor over comb' },
  { src: VIDEO.clipper, caption: 'The outline' },
  { src: VIDEO.beard, caption: 'Beard shaping' },
  { src: VIDEO.reveal, caption: 'The reveal' },
  { src: VIDEO.hero, caption: 'Clipper fade' },
  { src: VIDEO.finish, caption: 'The finish' },
  { src: VIDEO.tools, caption: 'Tools of the trade' },
  { src: VIDEO.chairs, caption: 'The chair is waiting' },
]

function Reel({ reel, index }) {
  const [paused, setPaused] = useState(false)
  const barRef = useRef(null)

  // Drives the progress hairline without re-rendering every frame
  const onTimeUpdate = (e) => {
    const v = e.currentTarget
    if (barRef.current && v.duration) barRef.current.style.transform = `scaleX(${v.currentTime / v.duration})`
  }

  return (
    <figure className="group relative m-0 aspect-video overflow-hidden bg-ink-3">
      <LoopVideo src={reel.src} paused={paused} onTimeUpdate={onTimeUpdate} className="absolute inset-0 w-full h-full" label={reel.caption} />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/20 pointer-events-none" />

      <span className="absolute top-4 left-4 display text-[0.8rem] chrome-text">{String(index + 1).padStart(2, '0')}</span>

      <button
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? `Play ${reel.caption}` : `Pause ${reel.caption}`}
        className="absolute inset-0 w-full h-full bg-transparent border-none cursor-pointer"
      />
      <span className="absolute top-3 right-3 w-9 h-9 rounded-full border border-white/25 bg-ink/40 backdrop-blur flex items-center justify-center text-bone pointer-events-none opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
        {paused ? <Play size={14} /> : <Pause size={14} />}
      </span>

      <figcaption className="absolute bottom-0 inset-x-0 px-4 pb-4 pointer-events-none">
        <span className="block text-[0.66rem] font-medium tracking-[0.26em] uppercase text-chrome-light mb-3">{reel.caption}</span>
        <span className="block h-px bg-white/15 overflow-hidden">
          <span ref={barRef} className="block h-full origin-left transition-transform duration-300 ease-linear" style={{ background: 'var(--chrome-sheen)', transform: 'scaleX(0)' }} />
        </span>
      </figcaption>
    </figure>
  )
}

export default function Gallery() {
  return (
    <section id="gallery" className="bg-ink py-24 md:py-32">
      <div className="max-w-[1180px] mx-auto px-5 md:px-10">
        <div className="text-center max-w-[860px] mx-auto mb-12 md:mb-14">
          <p className="eyebrow eyebrow-center mb-6">Portfolio &amp; Lookbook</p>
          <h2 className="display text-[clamp(2rem,4.6vw,3.4rem)] text-bone mb-6">
            The craft, the chair,
            <br />
            <span className="chrome-text">the Alcove.</span>
          </h2>
          <p className="text-[0.98rem] leading-[1.7] text-muted">
            Inside PARE: fresh work straight from the chair and the everyday energy where grooming meets lifestyle, on
            General Luna Street.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {reels.map((r, i) => (
            <Reel key={r.src} reel={r} index={i} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="btn btn-ghost">
            More on Instagram · @pare_iloilo.ph
          </a>
        </div>
      </div>
    </section>
  )
}
