import { useState, useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'
import { Star, Instagram, Facebook, X } from 'lucide-react'

const members = [
  {
    name: 'Vin',
    role: 'Head Barber Stylist',
    img: '/vinprofile.webp',
    owner: true,
    bio: 'Founder of PARE. Specializes in precision fades and classic gentleman cuts, with over a decade of experience shaping the modern Iloilo barbering scene.',
    instagram: 'https://www.instagram.com/vinparedess/?hl=en',
    facebook: 'https://facebook.com/iloilofadebarber',
    work: [
      '/vinwork1.png', 
      '/vinwork2.png',
      '/vinwork3.png',
      '/vinwork4.png',
      
    ],
  },
  {
    name: 'Kim',
    role: 'Senior Barber',
    img: '/kimprofile.webp',
    bio: 'Skilled in modern textured cuts and beard sculpting, with a sharp eye for detail.',
    instagram: 'https://www.instagram.com/kimramirez_pare/?hl=en',
    facebook: '',
    work: [
      '/kimwork1.png', 
      '/kimwork2.png',
      '/kimwork3.png',
      '/kimwork4.png',
    ],
  },
  {
    name: 'William',
    role: 'Senior Barber Stylist',
    img: '/williamprofile.webp',
    bio: 'Detail-driven stylist known for sharp tapers and clean lineups.',
    instagram: 'https://www.instagram.com/williamvelasco_pare/?hl=en',
    facebook: '',
    work: [
      '/williamwork1.png', 
      '/williamwork2.png',
      '/williamwork3.png',
      '/williamwork4.png',
    ],
  },
  {
    name: 'Arthur',
    role: 'Senior Barber Stylist',
    img: '/arthurprofile.webp',
    bio: 'Brings creative flair to every cut, from classic to avant-garde.',
    instagram: 'https://www.instagram.com/arthur_pare.iloilo/?hl=en',
    facebook: '',
    work: [
      '/arthurwork1.png', 
      '/arthurwork2.png',
      '/arthurwork3.png',
      '/arthurwork4.png',
    ],
  },
  {
    name: 'Paulo',
    role: 'Barber Stylist',
    img: '/pauloprofile.webp',
    bio: 'Up-and-coming talent specializing in fades and grooming consultations.',
    instagram: 'https://www.instagram.com/pau_asmod/?hl=en',
    facebook: '',
    work: [
      '/paulowork1.png', 
      '/paulowork2.png',
      '/paulowork3.png',
      '/paulowork4.png',
    ],
  },
]

function TeamCard({ member, delay, onOpen }) {
  const ref = useReveal(delay)
  return (
    <div ref={ref} className="reveal text-center group">
      <div
        className="relative w-full aspect-[3/4] overflow-hidden mb-5 cursor-pointer"
        onClick={() => onOpen(member)}
      >
        <img
          src={member.img}
          alt={`${member.name} - ${member.role}`}
          className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-[1.03] grayscale-[20%] group-hover:grayscale-0 filter"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080808]/70" />
        {member.owner && (
          <div className="absolute bottom-0 left-0 right-0 bg-[#C47840] text-[#080808] font-grotesk text-[0.58rem] font-bold tracking-[0.2em] uppercase py-1.5 text-center z-10">
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

function TeamModal({ member, onClose }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (member) {
      document.body.style.overflow = 'hidden'
      // double rAF ensures the initial (closed) state paints before transitioning open
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
    }
    const handleEsc = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', handleEsc)
    return () => {
      document.removeEventListener('keydown', handleEsc)
    }
  }, [member, onClose])

  const handleClose = () => {
    setVisible(false)
    document.body.style.overflow = ''
    setTimeout(onClose, 150)
  }

  if (!member) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#080808]/90 backdrop-blur-sm transition-opacity duration-150 ease-out ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative w-full max-w-4xl max-h-[88vh] overflow-y-auto bg-[#111111] border border-[#2e2e2e] transition-all duration-150 ease-out ${
          visible ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.97]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 z-10 w-9 h-9 flex items-center justify-center bg-[#080808]/70 text-white hover:text-[#C47840] hover:bg-[#080808] transition-colors border-none cursor-pointer"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Photo */}
          <div className="relative h-72 md:h-full">
            <img
              src={member.img}
              alt={member.name}
              className="w-full h-full object-cover object-top"
            />
            {member.owner && (
              <div className="absolute bottom-0 left-0 right-0 bg-[#C47840] text-[#080808] font-grotesk text-[0.6rem] font-bold tracking-[0.2em] uppercase py-2 text-center">
                Owner
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-8 md:p-10 flex flex-col">
            <p className="font-grotesk text-[0.6rem] font-semibold tracking-[0.4em] uppercase text-[#C47840] mb-3">
              {member.role}
            </p>
            <h3 className="font-grotesk font-bold text-[2.2rem] text-white tracking-tight mb-4">
              {member.name}
            </h3>
            <div className="w-10 h-px bg-[#C47840] mb-5" />

            <div className="flex gap-0.5 mb-6 text-[#C47840]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} fill="currentColor" />
              ))}
              <span className="font-grotesk text-[0.75rem] ml-1.5 text-[#888880]">
                5.0 Rating
              </span>
            </div>

            <p className="font-cormorant italic text-[1.15rem] text-[#ccc8c0] leading-relaxed mb-8">
              {member.bio}
            </p>

            {(member.instagram || member.facebook) && (
              <div className="flex gap-3 mb-8">
                {member.instagram && (
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 flex items-center justify-center border border-white/25 text-white hover:border-[#C47840] hover:text-[#C47840] transition-colors no-underline"
                  >
                    <Instagram size={15} />
                  </a>
                )}
                {member.facebook && (
                  <a
                    href={member.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 flex items-center justify-center border border-white/25 text-white hover:border-[#C47840] hover:text-[#C47840] transition-colors no-underline"
                  >
                    <Facebook size={15} />
                  </a>
                )}
              </div>
            )}

            <a
              href="#booking"
              onClick={handleClose}
              className="mt-auto text-center font-grotesk text-[0.72rem] font-semibold tracking-[0.25em] uppercase text-[#080808] bg-[#C47840] hover:bg-[#D9906A] px-8 py-4 transition-colors no-underline"
            >
              Book with {member.name}
            </a>
          </div>
        </div>

        {/* Work gallery — full width, below the split layout */}
        <div className="px-8 md:px-10 pb-10 pt-2 border-t border-[#2e2e2e] mt-2">
          <p className="font-grotesk text-[0.65rem] font-semibold tracking-[0.3em] uppercase text-[#555550] mt-7 mb-4">
            Recent Work
          </p>

          {member.work.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {member.work.map((src, i) => (
                <div
                  key={i}
                  className="aspect-square overflow-hidden border border-[#2e2e2e] hover:border-[#C47840] transition-colors"
                >
                  <img
                    src={src}
                    alt={`${member.name} work ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="font-cormorant italic text-[0.95rem] text-[#555550]">
              Portfolio coming soon.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Team() {
  const headRef = useReveal(0)
  const [activeMember, setActiveMember] = useState(null)

  return (
    <>
      <section id="team" className="py-28 bg-[#080808]">
        <div className="max-w-6xl mx-auto px-8">
          <div ref={headRef} className="reveal text-center mb-16">
            <p className="font-grotesk text-[0.6rem] font-semibold tracking-[0.4em] uppercase text-[#C47840] mb-4">
              The Artists
            </p>
            <h2 className="font-grotesk font-bold text-[clamp(2rem,5vw,3.5rem)] text-white tracking-tight mb-6">
              Meet the Team
            </h2>
            <p className="font-fraunces italic text-[clamp(1.1rem,2.5vw,1.4rem)] text-[#888880] max-w-xl mx-auto leading-relaxed">
              Every barber at PARE is dedicated to their craft — constantly educating themselves in
              the newest and most innovative styles.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {members.map((m, i) => (
              <TeamCard key={m.name} member={m} delay={i * 80} onOpen={setActiveMember} />
            ))}
          </div>
        </div>
      </section>

      <TeamModal member={activeMember} onClose={() => setActiveMember(null)} />
    </>
  )
}