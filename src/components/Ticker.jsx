const items = [
  "Men's Grooming",
  'High-End Haircuts',
  'Iloilo City',
  'Beard Styling',
  'Wedding Packages',
  'Facial Treatments',
  '5 Star Rated',
  'The Alcove',
]

export default function Ticker() {
  const doubled = [...items, ...items]

  return (
    <div className="bg-[#C47840] py-5 overflow-hidden">
      <div className="animate-ticker inline-block whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="inline-block">
            <span className="font-grotesk font-bold text-[0.8rem] tracking-[0.3em] uppercase text-[#080808] px-10">
              {item}
            </span>
            <span className="inline-block w-1 h-1 rounded-full bg-[#080808] align-middle mx-2" />
          </span>
        ))}
      </div>
    </div>
  )
}

