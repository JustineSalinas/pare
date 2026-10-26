import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { BOOKING_URL, EMAIL, INSTAGRAM_URL, MAPS_URL } from '../lib/site'

const hours = [
  { day: 'Monday', time: '9:00 AM – 7:00 PM' },
  { day: 'Tuesday', time: '9:00 AM – 7:00 PM' },
  { day: 'Wednesday', time: '9:00 AM – 7:00 PM' },
  { day: 'Thursday', time: '9:00 AM – 7:00 PM' },
  { day: 'Friday', time: '9:00 AM – 7:00 PM' },
  { day: 'Saturday', time: '9:00 AM – 7:00 PM' },
  { day: 'Sunday', time: '9:00 AM – 6:00 PM' },
]

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function LocationPage() {
  const [today, setToday] = useState('')

  useEffect(() => {
    document.title = 'Contact & Location | PARE Iloilo City'
    setToday(DAYS[new Date().getDay()])
  }, [])

  return (
    <main className="bg-ink pt-36 md:pt-44 pb-24 md:pb-32">
      <div className="max-w-[1240px] mx-auto px-5 md:px-10">
        <header className="text-center max-w-[680px] mx-auto mb-14 md:mb-16 animate-fadeUp">
          <p className="eyebrow eyebrow-center mb-6">Contact &amp; Location</p>
          <h1 className="display text-[clamp(2.2rem,5vw,3.6rem)] text-bone mb-6">
            Come through, <span className="chrome-text">pare.</span>
          </h1>
          <p className="text-[0.98rem] leading-[1.7] text-muted">
            Got a question or want to book in person? Visit us at The Alcove on General Luna Street, or reach out any
            time. We're always happy to help.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-5 items-stretch">
          <div className="border border-line p-8 md:p-12 flex flex-col gap-10">
            <Block title="Visit Us">
              <p>The Alcove Bldg, General Luna Street, Ground Floor<br />Iloilo City Proper, Western Visayas 5000</p>
              <a href={MAPS_URL} target="_blank" rel="noreferrer" className="inline-link">Get Directions <ArrowUpRight size={12} /></a>
            </Block>

            <Block title="Hours">
              <ul className="list-none m-0 p-0 max-w-[380px]">
                {hours.map((h) => {
                  const isToday = h.day === today
                  return (
                    <li key={h.day} className={`flex items-baseline gap-3 py-1.5 ${isToday ? 'text-bone' : ''}`}>
                      <span className="w-32">
                        {h.day}
                        {isToday && <span className="ml-2 text-[0.56rem] tracking-[0.18em] uppercase chrome-text">Today</span>}
                      </span>
                      <span className="flex-1 border-b border-dotted border-chrome-dark/50 -translate-y-1" aria-hidden="true" />
                      <span>{h.time}</span>
                    </li>
                  )
                })}
              </ul>
            </Block>

            <Block title="Email">
              <p>{EMAIL}</p>
              <a href={`mailto:${EMAIL}`} className="inline-link">Send An Email <ArrowUpRight size={12} /></a>
            </Block>

            <Block title="Follow">
              <p>Daily cuts &amp; studio life</p>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="inline-link">@pare_iloilo.ph <ArrowUpRight size={12} /></a>
            </Block>

            <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="btn btn-chrome self-start mt-auto">
              Book an Appointment <ArrowUpRight size={14} />
            </a>
          </div>

          <div className="min-h-[460px] border border-line overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.590138245585!2d122.55902137588324!3d10.699990960855217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33aee52c2865ffb3%3A0xe10ad542037996c5!2sPARE%20Men&#39;s%20Grooming%20%26%20Lifestyle!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph"
              className="w-full h-full min-h-[460px] border-none"
              style={{ filter: 'grayscale(100%) invert(92%) contrast(0.9)' }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="PARE Barbershop Location"
            />
          </div>
        </div>
      </div>
    </main>
  )
}

function Block({ title, children }) {
  return (
    <div>
      <h2 className="text-[0.8rem] font-semibold tracking-[0.24em] uppercase text-bone mb-4">{title}</h2>
      <div className="text-[0.92rem] leading-[1.7] text-muted space-y-2">{children}</div>
    </div>
  )
}
