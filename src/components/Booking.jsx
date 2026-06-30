import { useState, useEffect } from 'react'
import { Calendar, User, Users, Scissors, Clock, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { serviceCategories } from '../lib/servicesData'

const barbers = [
  { 
    id: 'any', 
    name: 'Any Available Artist', 
    role: 'Team selection',
    img: null
  },
  { 
    id: 'vin', 
    name: 'Vin', 
    role: 'Owner · Head Barber Stylist',
    img: 'https://cdn-partners-api.fresha.com/employee-avatars/processed/364770/medium/b3ca249a-e13a-46c0-a3a5-69ce9ff207bd-Photoroom_20240701_010515.jpeg'
  },
  { 
    id: 'kim', 
    name: 'Kim', 
    role: 'Senior Barber',
    img: 'https://cdn-partners-api.fresha.com/employee-avatars/processed/1464302/medium/8131c042-4c02-46a1-b1da-bbbfbc1ccad6-Photoroom_20250427_184527.jpeg'
  },
  { 
    id: 'william', 
    name: 'William', 
    role: 'Senior Barber Stylist',
    img: 'https://cdn-partners-api.fresha.com/employee-avatars/processed/431470/medium/5fe3b644-a07a-4779-b83f-1348983328a2-Photoroom_20250427_184350.jpeg'
  },
  { 
    id: 'arthur', 
    name: 'Arthur', 
    role: 'Senior Barber Stylist',
    img: 'https://cdn-partners-api.fresha.com/employee-avatars/processed/379089/medium/a07b797c-14b4-470b-9dc4-6844b340403f-Photoroom_20250427_184444.jpeg'
  },
  { 
    id: 'paulo', 
    name: 'Paulo', 
    role: 'Barber Stylist',
    img: 'https://cdn-partners-api.fresha.com/employee-avatars/processed/1644773/medium/89e53b2a-accd-471a-a4eb-52f27e1be0e6-Photoroom_20260611_181640.jpeg'
  }
]

const timeSlotsMonSat = [
  '9:00 AM', '9:45 AM', '10:30 AM', '11:15 AM', '12:00 PM', 
  '1:00 PM', '1:45 PM', '2:30 PM', '3:15 PM', '4:00 PM', 
  '4:45 PM', '5:30 PM', '6:15 PM'
]

const timeSlotsSun = [
  '9:00 AM', '9:45 AM', '10:30 AM', '11:15 AM', '12:00 PM', 
  '1:00 PM', '1:45 PM', '2:30 PM', '3:15 PM', '4:00 PM', 
  '4:45 PM', '5:30 PM'
]

export default function Booking() {
  const [step, setStep] = useState(1)
  const [bookingCategory, setBookingCategory] = useState(serviceCategories[0].id)
  const [selectedService, setSelectedService] = useState(null)
  const [selectedBarber, setSelectedBarber] = useState(null)
  const [bookingDate, setBookingDate] = useState('')
  const [bookingTime, setBookingTime] = useState('')
  const [clientInfo, setClientInfo] = useState({ name: '', phone: '', email: '', notes: '' })
  const [confirmedBooking, setConfirmedBooking] = useState(null)
  const [currentDate, setCurrentDate] = useState(new Date())

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  // Get days in month
  const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate()
  
  // Get first day of month (0-6)
  const getFirstDayOfMonth = (y, m) => new Date(y, m, 1).getDay()
  
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }
  
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }
  
  // Format Date to YYYY-MM-DD
  const formatDateString = (date) => {
    const d = new Date(date)
    let month = '' + (d.getMonth() + 1)
    let day = '' + d.getDate()
    const year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
  }

  const isPrevMonthDisabled = () => {
    const today = new Date()
    return currentDate.getFullYear() <= today.getFullYear() && currentDate.getMonth() <= today.getMonth()
  }

  const containerRef = useReveal(0)

  // Listen to select-booking-service event from Services component
  useEffect(() => {
    const handleExternalSelect = (e) => {
      const service = e.detail
      
      // Find which category contains this service
      const cat = serviceCategories.find((c) => 
        c.services.some((s) => s.id === service.id)
      )
      
      if (cat) {
        setBookingCategory(cat.id)
      }
      
      setSelectedService(service)
      setStep(2) // Jump to Barber selection directly
      
      // Scroll to booking form
      const el = document.getElementById('booking')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
    
    window.addEventListener('select-booking-service', handleExternalSelect)
    return () => window.removeEventListener('select-booking-service', handleExternalSelect)
  }, [])

  // Get current date formatted for input min parameter (yyyy-mm-dd)
  const getTodayDateString = () => {
    const today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const yyyy = today.getFullYear()
    return `${yyyy}-${mm}-${dd}`
  }

  // Get day of week for selected date
  const isSundaySelected = () => {
    if (!bookingDate) return false
    const date = new Date(bookingDate)
    return date.getDay() === 0 // 0 = Sunday
  }

  const getTimeSlots = () => {
    return isSundaySelected() ? timeSlotsSun : timeSlotsMonSat
  }

  const handleNextStep = () => {
    if (step === 1 && !selectedService) return
    if (step === 2 && !selectedBarber) return
    if (step === 3 && (!bookingDate || !bookingTime)) return
    setStep((prev) => prev + 1)
  }

  const handlePrevStep = () => {
    setStep((prev) => prev - 1)
  }

  const handleInfoChange = (e) => {
    const { name, value } = e.target
    setClientInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleConfirmBooking = (e) => {
    e.preventDefault()
    if (!clientInfo.name || !clientInfo.phone) return

    const newBooking = {
      id: 'BK-' + Math.floor(100000 + Math.random() * 900000),
      service: selectedService,
      barber: selectedBarber,
      date: bookingDate,
      time: bookingTime,
      client: clientInfo,
      createdAt: new Date().toISOString()
    }

    // Save to local storage
    const existing = JSON.parse(localStorage.getItem('pare_bookings') || '[]')
    existing.push(newBooking)
    localStorage.setItem('pare_bookings', JSON.stringify(existing))

    setConfirmedBooking(newBooking)
    setStep(5)
  }

  const resetForm = () => {
    setBookingCategory(serviceCategories[0].id)
    setSelectedService(null)
    setSelectedBarber(null)
    setBookingDate('')
    setBookingTime('')
    setClientInfo({ name: '', phone: '', email: '', notes: '' })
    setConfirmedBooking(null)
    setCurrentDate(new Date())
    setStep(1)
  }

  // Active Category Services
  const activeCatServices = serviceCategories.find((cat) => cat.id === bookingCategory)?.services || []

  return (
    <section id="booking" className="py-28 bg-[#080808] border-t border-[#2e2e2e]">
      <div ref={containerRef} className="reveal max-w-4xl mx-auto px-8">
        <div className="text-center mb-12">
          <p className="font-grotesk text-[0.6rem] font-semibold tracking-[0.4em] uppercase text-[#C47840] mb-3">
            Grooming Experience
          </p>
          <h2 className="font-grotesk font-bold text-[clamp(2rem,5vw,3.5rem)] text-white tracking-tight">
            Book Appointment
          </h2>
          <div className="w-10 h-px bg-[#C47840] mx-auto mt-4" />
        </div>

        {/* Progress Bar */}
        {step < 5 && (
          <div className="flex justify-between items-center max-w-md mx-auto mb-12">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center flex-1 last:flex-none">
                <div
                  className={[
                    'w-8 h-8 rounded-full flex items-center justify-center font-grotesk text-[0.8rem] font-semibold transition-all duration-300',
                    step >= s
                      ? 'bg-[#C47840] text-[#080808]'
                      : 'bg-[#111111] text-[#555550] border border-[#2e2e2e]'
                  ].join(' ')}
                >
                  {s}
                </div>
                {s < 4 && (
                  <div
                    className={[
                      'h-px flex-1 mx-2 transition-colors duration-300',
                      step > s ? 'bg-[#C47840]' : 'bg-[#2e2e2e]'
                    ].join(' ')}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <div className="bg-[#111111] border border-[#2e2e2e] p-8 md:p-12">
          {/* Step 1: Services */}
          {step === 1 && (
            <div>
              <h3 className="font-grotesk text-[1.1rem] font-medium text-white mb-6 flex items-center gap-2.5">
                <Scissors size={18} className="text-[#C47840]" /> Select Service
              </h3>
              
              {/* Category tabs */}
              <div className="flex flex-wrap gap-2 mb-6 pb-2.5 border-b border-[#2e2e2e]">
                {serviceCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setBookingCategory(cat.id)
                      setSelectedService(null) // reset service when changing category
                    }}
                    className={[
                      'px-4 py-2 font-grotesk text-[0.65rem] font-semibold tracking-[0.15em] uppercase border transition-all duration-300 whitespace-nowrap cursor-pointer',
                      bookingCategory === cat.id
                        ? 'border-[#C47840] bg-[#C47840]/10 text-[#C47840]'
                        : 'border-[#2e2e2e] text-[#888880] hover:text-white bg-transparent'
                    ].join(' ')}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Service Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeCatServices.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedService(s)}
                    className={[
                      'flex justify-between items-center p-5 text-left border transition-all duration-300 cursor-pointer bg-transparent',
                      selectedService?.id === s.id
                        ? 'border-[#C47840] bg-[#C47840]/5'
                        : 'border-[#2e2e2e] hover:border-white/40'
                    ].join(' ')}
                  >
                    <div className="pr-4">
                      <div className="font-grotesk font-medium text-[0.9rem] text-[#ece9e3] mb-1">
                        {s.name}
                      </div>
                      <div className="text-[0.7rem] text-[#888880] flex items-center gap-1">
                        <Clock size={10} /> {s.duration}
                      </div>
                    </div>
                    <div className="font-grotesk font-bold text-[0.95rem] text-[#C47840] shrink-0">
                      {s.price}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Barbers */}
          {step === 2 && (
            <div>
              <h3 className="font-grotesk text-[1.1rem] font-medium text-white mb-6 flex items-center gap-2.5">
                <User size={18} className="text-[#C47840]" /> Select Barber
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {barbers.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBarber(b)}
                    className={[
                      'flex items-center gap-4 p-5 text-left border transition-all duration-300 cursor-pointer bg-transparent',
                      selectedBarber?.id === b.id
                        ? 'border-[#C47840] bg-[#C47840]/5'
                        : 'border-[#2e2e2e] hover:border-white/40'
                    ].join(' ')}
                  >
                    {b.img ? (
                      <img
                        src={b.img}
                        alt={`${b.name} avatar`}
                        className="w-12 h-12 rounded-full object-cover object-top border border-[#2e2e2e] shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-[#1e1e1e] flex items-center justify-center text-[#C47840] border border-[#2e2e2e] shrink-0">
                        <Users size={20} />
                      </div>
                    )}
                    <div>
                      <div className="font-grotesk font-medium text-[0.9rem] text-[#ece9e3] mb-0.5">
                        {b.name}
                      </div>
                      <div className="text-[0.68rem] tracking-[0.05em] text-[#888880] uppercase">
                        {b.role}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Date & Time */}
          {step === 3 && (
            <div>
              <h3 className="font-grotesk text-[1.1rem] font-medium text-white mb-6 flex items-center gap-2.5">
                <Calendar size={18} className="text-[#C47840]" /> Select Date & Time
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Custom Month Calendar (left side) */}
                <div className="lg:col-span-7 bg-[#080808] border border-[#2e2e2e] p-6">
                  {/* Calendar Header */}
                  <div className="flex justify-between items-center mb-6 border-b border-[#2e2e2e] pb-4">
                    <button
                      type="button"
                      disabled={isPrevMonthDisabled()}
                      onClick={handlePrevMonth}
                      className={[
                        'p-2 hover:text-[#C47840] bg-transparent border-none cursor-pointer transition-colors',
                        isPrevMonthDisabled() ? 'text-[#333330] cursor-not-allowed' : 'text-[#888880]'
                      ].join(' ')}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="font-grotesk text-[0.8rem] font-bold text-white tracking-[0.15em] uppercase">
                      {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </span>
                    <button
                      type="button"
                      onClick={handleNextMonth}
                      className="p-2 text-[#888880] hover:text-[#C47840] bg-transparent border-none cursor-pointer transition-colors"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  {/* Weekday Titles */}
                  <div className="grid grid-cols-7 gap-1 text-center font-grotesk text-[0.68rem] font-semibold tracking-[0.1em] text-[#555550] uppercase mb-3">
                    <div>Su</div>
                    <div>Mo</div>
                    <div>Tu</div>
                    <div>We</div>
                    <div>Th</div>
                    <div>Fr</div>
                    <div>Sa</div>
                  </div>

                  {/* Days Grid */}
                  <div className="grid grid-cols-7 gap-1.5">
                    {(() => {
                      const y = currentDate.getFullYear()
                      const m = currentDate.getMonth()
                      const daysCount = getDaysInMonth(y, m)
                      const firstDay = getFirstDayOfMonth(y, m)
                      
                      const today = new Date()
                      today.setHours(0,0,0,0)
                      
                      const cells = []
                      
                      // Empty cells for offset
                      for (let i = 0; i < firstDay; i++) {
                        cells.push(<div key={`empty-${i}`} className="aspect-square" />)
                      }
                      
                      // Days cells
                      for (let d = 1; d <= daysCount; d++) {
                        const cellDate = new Date(y, m, d)
                        const dateStr = formatDateString(cellDate)
                        const isPast = cellDate < today
                        
                        const isSelected = bookingDate === dateStr
                        
                        cells.push(
                          <button
                            key={`day-${d}`}
                            type="button"
                            disabled={isPast}
                            onClick={() => {
                              setBookingDate(dateStr)
                              setBookingTime('')
                            }}
                            className={[
                              'aspect-square w-full font-grotesk text-[0.8rem] transition-all duration-200 border border-[#2e2e2e] cursor-pointer flex items-center justify-center rounded-sm',
                              isPast 
                                ? 'text-[#333330] border-transparent cursor-not-allowed bg-transparent'
                                : isSelected
                                  ? 'bg-[#C47840] border-[#C47840] text-[#080808] font-bold'
                                  : 'bg-[#111111] hover:bg-[#C47840]/10 text-[#ece9e3] hover:border-[#C47840]/40'
                            ].join(' ')}
                          >
                            {d}
                          </button>
                        )
                      }
                      return cells
                    })()}
                  </div>
                </div>

                {/* Time Selection (right side) */}
                <div className="lg:col-span-5">
                  <h4 className="block font-grotesk text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-[#888880] mb-4">
                    Available Time Slots 
                    {bookingDate && (
                      <span className="font-cormorant italic text-[0.85rem] text-[#C47840] ml-2 font-normal lowercase">
                        for {new Date(bookingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    )}
                  </h4>
                  {!bookingDate ? (
                    <div className="h-48 flex items-center justify-center border border-dashed border-[#2e2e2e] text-[0.82rem] text-[#555550] bg-[#080808] p-6 text-center">
                      Please select a date from the calendar to view available time slots.
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar bg-[#080808] border border-[#2e2e2e] p-4">
                      {getTimeSlots().map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setBookingTime(t)}
                          className={[
                            'p-3 font-grotesk text-[0.8rem] border text-center transition-all duration-200 cursor-pointer bg-transparent',
                            bookingTime === t
                              ? 'border-[#C47840] bg-[#C47840]/5 text-white font-semibold'
                              : 'border-[#2e2e2e] text-[#888880] hover:border-white/40 hover:text-white'
                          ].join(' ')}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Personal Details */}
          {step === 4 && (
            <form onSubmit={handleConfirmBooking}>
              <h3 className="font-grotesk text-[1.1rem] font-medium text-white mb-6 flex items-center gap-2.5">
                <Clock size={18} className="text-[#C47840]" /> Your Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <div>
                  <label className="block font-grotesk text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-[#888880] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={clientInfo.name}
                    onChange={handleInfoChange}
                    placeholder="Enter your name"
                    className="w-full bg-[#080808] border border-[#2e2e2e] text-[#ece9e3] p-3 font-grotesk text-[0.85rem] focus:border-[#C47840] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-grotesk text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-[#888880] mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={clientInfo.phone}
                    onChange={handleInfoChange}
                    placeholder="e.g. 09171234567"
                    className="w-full bg-[#080808] border border-[#2e2e2e] text-[#ece9e3] p-3 font-grotesk text-[0.85rem] focus:border-[#C47840] focus:outline-none"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block font-grotesk text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-[#888880] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={clientInfo.email}
                  onChange={handleInfoChange}
                  placeholder="name@example.com"
                  className="w-full bg-[#080808] border border-[#2e2e2e] text-[#ece9e3] p-3 font-grotesk text-[0.85rem] focus:border-[#C47840] focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-grotesk text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-[#888880] mb-2">
                  Special Instructions (Optional)
                </label>
                <textarea
                  name="notes"
                  rows="3"
                  value={clientInfo.notes}
                  onChange={handleInfoChange}
                  placeholder="Any preferences or comments for your barber"
                  className="w-full bg-[#080808] border border-[#2e2e2e] text-[#ece9e3] p-3 font-grotesk text-[0.85rem] focus:border-[#C47840] focus:outline-none resize-none"
                />
              </div>
            </form>
          )}

          {/* Step 5: Confirmed Receipt */}
          {step === 5 && confirmedBooking && (
            <div className="text-center py-6">
              <CheckCircle size={56} className="text-[#C47840] mx-auto mb-6 animate-pulse" />
              <h3 className="font-grotesk text-[1.5rem] font-bold text-white mb-2">
                Booking Confirmed!
              </h3>
              <p className="font-cormorant italic text-[1.1rem] text-[#888880] mb-8">
                Your appointment has been successfully scheduled. We look forward to seeing you.
              </p>

              {/* Receipt card */}
              <div className="max-w-md mx-auto bg-[#080808] border border-[#2e2e2e] text-left p-6 mb-8 font-grotesk">
                <div className="flex justify-between items-center border-b border-[#2e2e2e] pb-4 mb-4">
                  <span className="text-[0.7rem] tracking-[0.1em] text-[#555550] uppercase">Receipt</span>
                  <span className="text-[0.78rem] font-bold text-[#C47840]">{confirmedBooking.id}</span>
                </div>
                <div className="space-y-3.5 text-[0.82rem]">
                  <div className="flex justify-between">
                    <span className="text-[#888880]">Service</span>
                    <span className="text-white font-medium">{confirmedBooking.service.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#888880]">Barber Artist</span>
                    <span className="text-white font-medium">{confirmedBooking.barber.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#888880]">Date</span>
                    <span className="text-white font-medium">
                      {new Date(confirmedBooking.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#888880]">Time Slot</span>
                    <span className="text-white font-medium">{confirmedBooking.time}</span>
                  </div>
                  <div className="flex justify-between border-t border-[#2e2e2e] pt-3 mt-3">
                    <span className="text-[#888880]">Client</span>
                    <span className="text-white font-medium">{confirmedBooking.client.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#888880]">Total Price</span>
                    <span className="text-[#C47840] font-bold">{confirmedBooking.service.price}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={resetForm}
                className="font-grotesk text-[0.75rem] font-semibold tracking-[0.2em] uppercase text-[#080808] bg-[#C47840] px-10 py-4 hover:bg-[#D9906A] transition-colors border-none cursor-pointer"
              >
                Book Another Appointment
              </button>
            </div>
          )}

          {/* Navigation buttons */}
          {step < 5 && (
            <div className="flex justify-between items-center border-t border-[#2e2e2e] pt-6 mt-8">
              {step > 1 ? (
                <button
                  onClick={handlePrevStep}
                  className="flex items-center gap-1 font-grotesk text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-[#888880] hover:text-white bg-transparent border-none cursor-pointer"
                >
                  <ChevronLeft size={14} /> Back
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button
                  onClick={handleNextStep}
                  disabled={
                    (step === 1 && !selectedService) ||
                    (step === 2 && !selectedBarber) ||
                    (step === 3 && (!bookingDate || !bookingTime))
                  }
                  className={[
                    'flex items-center gap-1 font-grotesk text-[0.7rem] font-semibold tracking-[0.15em] uppercase px-6 py-3 transition-colors border-none cursor-pointer',
                    ((step === 1 && !selectedService) ||
                    (step === 2 && !selectedBarber) ||
                    (step === 3 && (!bookingDate || !bookingTime)))
                      ? 'bg-[#1e1e1e] text-[#555550] cursor-not-allowed'
                      : 'bg-[#C47840] text-[#080808] hover:bg-[#D9906A]'
                  ].join(' ')}
                >
                  Continue <ChevronRight size={14} />
                </button>
              ) : (
                <button
                  onClick={handleConfirmBooking}
                  disabled={!clientInfo.name || !clientInfo.phone}
                  className={[
                    'font-grotesk text-[0.7rem] font-semibold tracking-[0.15em] uppercase px-8 py-3 transition-colors border-none cursor-pointer',
                    (!clientInfo.name || !clientInfo.phone)
                      ? 'bg-[#1e1e1e] text-[#555550] cursor-not-allowed'
                      : 'bg-[#C47840] text-[#080808] hover:bg-[#D9906A]'
                  ].join(' ')}
                >
                  Confirm Appointment
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
