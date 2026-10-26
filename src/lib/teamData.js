import { BOOKING_URL } from './site'

// freshaId is the employeeId on PARE's Fresha venue; it opens booking with that barber preselected.
// Kim is not listed on Fresha, so his button falls back to the general booking page.
export const members = [
  {
    slug: 'vin',
    name: 'Vin',
    fullName: 'Vin Paredes',
    role: 'Head Barber Stylist',
    img: '/vinprofile.webp',
    owner: true,
    freshaId: '2771775',
    bio: 'Founder of PARE. Specializes in precision fades and classic gentleman cuts, with over a decade of experience shaping the modern Iloilo barbering scene.',
    instagram: 'https://www.instagram.com/vinparedess/?hl=en',
    facebook: 'https://facebook.com/iloilofadebarber',
    work: ['/vinwork1.png', '/vinwork2.png', '/vinwork3.png', '/vinwork4.png'],
  },
  {
    slug: 'kim',
    name: 'Kim',
    role: 'Senior Barber',
    img: '/kimprofile.webp',
    freshaId: null,
    bio: 'Skilled in modern textured cuts and beard sculpting, with a sharp eye for detail.',
    instagram: 'https://www.instagram.com/kimramirez_pare/?hl=en',
    work: ['/kimwork1.png', '/kimwork2.png', '/kimwork3.png', '/kimwork4.png'],
  },
  {
    slug: 'william',
    name: 'William',
    role: 'Senior Barber Stylist',
    img: '/williamprofile.webp',
    freshaId: '3351440',
    bio: 'Detail-driven stylist known for sharp tapers and clean lineups.',
    instagram: 'https://www.instagram.com/williamvelasco_pare/?hl=en',
    work: ['/williamwork1.png', '/williamwork2.png', '/williamwork3.png', '/williamwork4.png'],
  },
  {
    slug: 'arthur',
    name: 'Arthur',
    role: 'Senior Barber Stylist',
    img: '/arthurprofile.webp',
    freshaId: '2905053',
    bio: 'Brings creative flair to every cut, from classic to avant-garde.',
    instagram: 'https://www.instagram.com/arthur_pare.iloilo/?hl=en',
    work: ['/arthurwork1.png', '/arthurwork2.png', '/arthurwork3.png', '/arthurwork4.png'],
  },
  {
    slug: 'paulo',
    name: 'Paulo',
    role: 'Barber Stylist',
    img: '/pauloprofile.webp',
    freshaId: '5420331',
    bio: 'Up-and-coming talent specializing in fades and grooming consultations.',
    instagram: 'https://www.instagram.com/pau_asmod/?hl=en',
    work: ['/paulowork1.png', '/paulowork2.png', '/paulowork3.png', '/paulowork4.png'],
  },
]

export const bookingUrlFor = (member) =>
  member?.freshaId ? BOOKING_URL.replace('/booking?', `/booking?employeeId=${member.freshaId}&`) : BOOKING_URL

export const memberBySlug = (slug) => members.find((m) => m.slug === slug)
