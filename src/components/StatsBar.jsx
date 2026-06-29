import { useReveal } from '../hooks/useReveal'

const stats = [
  { number: '5.0', label: 'Perfect Rating' },
  { number: '1,215', label: 'Reviews on Fresha' },
  { number: '5', label: 'Expert Barbers' },
  { number: '100%', label: 'Recommended' },
]

export default function StatsBar() {
  const ref = useReveal()

  return (
    <div className="bg-[#1a1a1a] border-t border-b border-[#2e2e2e] py-8">
      <div className="max-w-6xl mx-auto px-8">
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 reveal">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={[
                'text-center py-5 px-4',
                i < stats.length - 1 ? 'border-r border-[#2e2e2e]' : '',
              ].join(' ')}
            >
              <div className="font-grotesk font-bold text-[clamp(1.8rem,4vw,2.8rem)] text-[#C47840] leading-none mb-1.5 tracking-tight">
                {s.number}
              </div>
              <div className="text-[0.65rem] tracking-[0.25em] uppercase text-[#555550]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

