import { useReveal } from '../hooks/useReveal'
import { Star } from 'lucide-react'

const members = [
  {
    name: 'Vin',
    role: 'Owner · Head Barber Stylist',
    img: 'https://cdn-partners-api.fresha.com/employee-avatars/processed/364770/medium/b3ca249a-e13a-46c0-a3a5-69ce9ff207bd-Photoroom_20240701_010515.jpeg',
    owner: true,
  },
  {
    name: 'Kim',
    role: 'Senior Barber',
    img: 'https://cdn-partners-api.fresha.com/employee-avatars/processed/1464302/medium/8131c042-4c02-46a1-b1da-bbbfbc1ccad6-Photoroom_20250427_184527.jpeg',
  },
  {
    name: 'William',
    role: 'Senior Barber Stylist',
    img: 'https://cdn-partners-api.fresha.com/employee-avatars/processed/431470/medium/5fe3b644-a07a-4779-b83f-1348983328a2-Photoroom_20250427_184350.jpeg',
  },
  {
    name: 'Arthur',
    role: 'Senior Barber Stylist',
    img: 'https://cdn-partners-api.fresha.com/employee-avatars/processed/379089/medium/a07b797c-14b4-470b-9dc4-6844b340403f-Photoroom_20250427_184444.jpeg',
  },
  {
    name: 'Paulo',
    role: 'Barber Stylist',
    img: 'https://cdn-partners-api.fresha.com/employee-avatars/processed/1644773/medium/89e53b2a-accd-471a-a4eb-52f27e1be0e6-Photoroom_20260611_181640.jpeg',
  },
]

function TeamCard({ member, delay }) {
  const ref = useReveal(delay)
  return (
    <div ref={ref} className="reveal text-center group">
      <div className="relative w-full aspect-[3/4] overflow-hidden mb-5">
        <img
          src={member.img}
          alt={`${member.name} - ${member.role}`}
          className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-[1.03] grayscale-[20%] group-hover:grayscale-0 filter"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080808]/70" />
        {member.owner && (
          <div className="absolute bottom-0 left-0 right-0 bg-[#C47840] text-[#080808] font-grotesk text-[0.58rem] font-bold tracking-[0.2em] uppercase py-1.5 text-center">
            Owner
          </div>
        )}
      </div>
      <div className="font-grotesk font-semibold text-[0.95rem] text-white tracking-[0.05em] mb-1">
        {member.name}
      </div>
      <div className="text-[0.68rem] tracking-[0.2em] uppercase text-[#555550] mb-2">
        {member.role}
      </div>
      <div className="flex justify-center gap-0.5 text-[#C47840]">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={11} fill="currentColor" />
        ))}
        <span className="font-grotesk text-[0.7rem] ml-1 text-[#C47840]">5.0</span>
      </div>
    </div>
  )
}

export default function Team() {
  const headRef = useReveal(0)

  return (
    <section id="team" className="py-28 bg-[#080808]">
      <div className="max-w-6xl mx-auto px-8">
        <div ref={headRef} className="reveal text-center mb-16">
          <p className="font-grotesk text-[0.6rem] font-semibold tracking-[0.4em] uppercase text-[#C47840] mb-4">
            The Artists
          </p>
          <h2 className="font-grotesk font-bold text-[clamp(2rem,5vw,3.5rem)] text-white tracking-tight mb-6">
            Meet the Team
          </h2>
          <p className="font-cormorant italic text-[clamp(1.1rem,2.5vw,1.4rem)] text-[#888880] max-w-xl mx-auto leading-relaxed">
            Every barber at PARE is dedicated to their craft — constantly educating themselves in
            the newest and most innovative styles.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {members.map((m, i) => (
            <TeamCard key={m.name} member={m} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  )
}

