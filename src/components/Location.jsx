import { useEffect, useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { MapPin, Clock, Mail, Globe } from 'lucide-react'

const hours = [
  { day: 'Monday',    time: '9:00 AM – 7:00 PM' },
  { day: 'Tuesday',   time: '9:00 AM – 7:00 PM' },
  { day: 'Wednesday', time: '9:00 AM – 7:00 PM' },
  { day: 'Thursday',  time: '9:00 AM – 7:00 PM' },
  { day: 'Friday',    time: '9:00 AM – 7:00 PM' },
  { day: 'Saturday',  time: '9:00 AM – 7:00 PM' },
  { day: 'Sunday',    time: '9:00 AM – 6:00 PM' },
]

const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

export default function Location() {
  const [today, setToday] = useState('')
  const leftRef = useReveal(0)
  const rightRef = useReveal(120)

  useEffect(() => {
    setToday(DAYS[new Date().getDay()])
  }, [])

  return (
    <section id="location" className="py-28 bg-[#080808]">
      <div className="max-w-6xl mx-auto px-8">
        <p className="font-grotesk text-[0.6rem] font-semibold tracking-[0.4em] uppercase text-[#C47840] mb-3">
          Find Us
        </p>
        <h2 className="font-grotesk font-bold text-[clamp(2rem,5vw,3.5rem)] text-white tracking-tight mb-2">
          Visit PARE
        </h2>
        <div className="w-10 h-px bg-[#C47840] mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
          {/* Info + hours */}
          <div ref={leftRef} className="reveal flex flex-col justify-between">
            <div className="space-y-6 mb-10">
              <InfoRow icon={<MapPin size={16} className="text-[#C47840]" />} label="Address">
                The Alcove Bldg, General Luna Street<br />
                Ground Floor, Iloilo City Proper<br />
                Iloilo City, Western Visayas 5000
              </InfoRow>
              <InfoRow icon={<Clock size={16} className="text-[#C47840]" />} label="Hours">
                Mon – Sat: 9:00 AM – 7:00 PM<br />
                Sunday: 9:00 AM – 6:00 PM
              </InfoRow>
              <InfoRow icon={<Mail size={16} className="text-[#C47840]" />} label="Contact">
                <a href="mailto:nivla38@gmail.com" className="text-[#C47840] no-underline hover:text-[#D9906A] transition-colors">
                  nivla38@gmail.com
                </a>
              </InfoRow>
              <InfoRow icon={<Globe size={16} className="text-[#C47840]" />} label="Book Online">
                Instant confirmation on our website.<br />
                <a
                  href="#booking"
                  className="text-[#C47840] no-underline hover:text-[#D9906A] transition-colors font-medium"
                >
                  Book Appointment Now →
                </a>
              </InfoRow>
            </div>

            {/* Hours table */}
            <div className="flex flex-col divide-y divide-[#2e2e2e]">
              {hours.map((h) => (
                <div
                  key={h.day}
                  className={[
                    'flex justify-between items-center py-3.5 text-[0.85rem]',
                    h.day === today ? 'text-[#C47840]' : '',
                  ].join(' ')}
                >
                  <span className={`font-grotesk font-medium ${h.day === today ? 'text-[#C47840]' : 'text-[#888880]'}`}>
                    {h.day}
                    {h.day === today && <span className="ml-2 text-[0.6rem] tracking-[0.15em] uppercase">· Today</span>}
                  </span>
                  <span className={h.day === today ? 'text-[#C47840]' : 'text-[#ece9e3]'}>
                    {h.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div ref={rightRef} className="reveal flex flex-col justify-between h-full">
            <div className="w-full h-[480px] border border-[#2e2e2e] overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.590138245585!2d122.55902137588324!3d10.699990960855217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33aee52c2865ffb3%3A0xe10ad542037996c5!2sPARE%20Men&#39;s%20Grooming%20%26%20Lifestyle!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph"
                className="w-full h-full border-none"
                style={{ filter: 'grayscale(80%) invert(90%) hue-rotate(180deg)' }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="PARE Barbershop Location"
              />
            </div>
            <a
              href="https://maps.google.com/?q=PARE+Men's+Grooming+and+Lifestyle+Iloilo+City"
              target="_blank"
              rel="noreferrer"
              className="block text-center mt-4 font-general-sans font-semibold text-[0.7rem] tracking-[0.2em] uppercase text-[#C47840] hover:text-[#D9906A] transition-colors no-underline"
            >
              Open in Google Maps →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function InfoRow({ icon, label, children }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="mt-0.5 shrink-0">{icon}</div>
      <div>
        <div className="font-grotesk text-[0.72rem] font-semibold tracking-[0.15em] uppercase text-[#ece9e3] mb-1">
          {label}
        </div>
        <div className="text-[0.88rem] text-[#888880] leading-relaxed">{children}</div>
      </div>
    </div>
  )
}

