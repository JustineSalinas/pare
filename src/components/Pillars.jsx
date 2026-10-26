import { useReveal } from '../hooks/useReveal'

const pillars = [
  {
    title: 'Craft',
    body: 'Born from the legacy of Iloilo Fade Barber, PARE evolved into an award-winning grooming destination for high-end tailored haircuts.',
  },
  {
    title: 'Space',
    body: 'A multi-zoned space with a custom interior by Vitrine, designed with client experience at its core.',
  },
  {
    title: 'Everyone',
    body: 'An exclusive feel in an inclusive space: for men, for women, for everyone who values the craft of looking and feeling their best.',
  },
]

export default function Pillars() {
  const ref = useReveal(0)

  return (
    <section className="bg-ink pb-24 md:pb-32">
      <div ref={ref} className="reveal max-w-[1440px] mx-auto px-5 md:px-10 grid md:grid-cols-3 border-t border-line">
        {pillars.map((p, i) => (
          <div key={p.title} className={`pt-10 pb-4 md:pr-10 ${i ? 'md:pl-10 md:border-l border-line' : ''}`}>
            <span className="text-[0.72rem] tracking-[0.18em] text-chrome-dark">0{i + 1}</span>
            <h3 className="display text-[1.6rem] chrome-text mt-3 mb-4">{p.title}</h3>
            <p className="text-[0.9rem] leading-[1.75] text-muted">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
