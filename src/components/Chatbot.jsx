import { useState, useRef, useEffect } from 'react'
import { X, Send, User } from 'lucide-react'

const faqData = [
  {
    q: 'Hello',
    keywords: ['hello', 'hi', 'hey', 'yo', 'good morning', 'greetings', 'assistant'],
    a: 'Hello! I am your PARE digital assistant. How can I help you today? You can ask me about our hours, location, rates, wedding packages, or booking process.'
  },
  {
    q: 'What are your opening hours?',
    keywords: ['hours', 'time', 'open', 'schedule', 'sunday', 'close'],
    a: 'We are open Monday to Saturday from 9:00 AM to 7:00 PM, and on Sundays from 9:00 AM to 6:00 PM.'
  },
  {
    q: 'Where are you located?',
    keywords: ['location', 'address', 'where', 'map', 'directions', 'find', 'alcove', 'iloilo'],
    a: 'We are located at Ground Floor, The Alcove Bldg, General Luna Street, Iloilo City Proper, Iloilo City (Western Visayas 5000).'
  },
  {
    q: 'What are your rates and services?',
    keywords: ['price', 'rate', 'service', 'cost', 'menu', 'haircut', 'shave', 'beard', 'facial'],
    a: 'Our full service menu is categorized as follows:\n\n• **Haircut & Style:**\n  - Student Rate Haircut: ₱700 (30 min)\n  - Basic Haircut & Style: ₱850 (45 min)\n  - Long Haircut & Style: ₱950 (50 min)\n  - Haircut + Consultation: ₱1,500 (50 min)\n\n• **Haircut & Beard Services:**\n  - Haircut & Beard Trim: ₱950 (50 min)\n  - Haircut & Hot Towel Shave: ₱1,500 (50 min)\n\n• **PARE Premium Package:**\n  - Premium: ₱3,000 (1h 30m - Haircut, beard trim, and men\'s facial)\n\n• **Facial Treatments:**\n  - Aēsop Men\'s Facial Treatments: ₱2,500 (30 min)\n\n• **Wedding Packages:**\n  - Basic Groom Only: ₱5,500\n  - Groom & Bestman: ₱7,500\n  - Groom & Entourage: ₱15,500\n\nYou can book any of these directly on our website!'
  },
  {
    q: 'How do I book an appointment?',
    keywords: ['book', 'appointment', 'reserve', 'schedule', 'fresha', 'booking'],
    a: 'You can book directly using our custom booking system right here on our website! Just scroll to the "Book Appointment" section above to select your service, barber, and preferred time.'
  },
  {
    q: 'Do you offer wedding or entourage packages?',
    keywords: ['wedding', 'entourage', 'groom', 'marriage', 'package', 'group', 'styling'],
    a: 'Yes, we offer specialized Groom, Entourage, Pre-Wedding Grooming, and On-Site Styling. You can email Vin directly at nivla38@gmail.com to customize a package for your special day.'
  },
  {
    q: 'Do you accept walk-ins?',
    keywords: ['walk-in', 'walkin', 'now', 'appointment needed', 'wait'],
    a: 'We strongly recommend booking online to avoid long waiting times, but we do accept walk-ins when a barber slot is open.'
  }
]

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hello! Welcome to PARE. I'm your digital grooming assistant. How can I help refine your experience today?"
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  
  const messagesEndRef = useRef(null)

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const triggerBotResponse = (userInput) => {
    setIsTyping(true)
    
    setTimeout(() => {
      const lowerInput = userInput.toLowerCase().trim()
      let matchedAnswer = null

      // 1. First check for exact question match (or close match)
      const exactMatch = faqData.find(
        (faq) => faq.q.toLowerCase() === lowerInput || lowerInput.includes(faq.q.toLowerCase())
      )

      if (exactMatch) {
        matchedAnswer = exactMatch.a
      } else {
        // 2. Fallback to keyword matching
        for (const faq of faqData) {
          if (faq.keywords.some((keyword) => lowerInput.includes(keyword))) {
            matchedAnswer = faq.a
            break
          }
        }
      }

      if (!matchedAnswer) {
        matchedAnswer = "I'm not sure I understand that inquiry. Here are some quick questions you can ask me, or you can check our booking section to secure your slot directly!"
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: matchedAnswer }])
      setIsTyping(false)
    }, 900)
  }

  const handleSendMessage = (text) => {
    if (!text.trim()) return
    
    // Add user message
    setMessages((prev) => [...prev, { sender: 'user', text }])
    setInputValue('')
    
    // Trigger bot reply
    triggerBotResponse(text)
  }

  const handleFAQClick = (faq) => {
    setMessages((prev) => [...prev, { sender: 'user', text: faq.q }])
    triggerBotResponse(faq.q)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 font-grotesk">
      {/* Floating Toggle Button */}
      {!isOpen && (
  <button
    onClick={() => setIsOpen(true)}
    className="w-14 h-14 bg-[#C47840] hover:bg-[#D9906A] text-[#080808] rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-105 border-none cursor-pointer overflow-hidden"
    aria-label="Open Chat"
  >
    <img 
      src="/parechatbot.png" 
      alt="Chatbot Icon" 
      className="w-[130%] h-[130%] object-cover scale-100 transition-all duration-300 hover:brightness-250" 
    />
  </button>
)}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[360px] max-w-[calc(100vw-2rem)] h-[480px] bg-[#111111] border border-[#2e2e2e] flex flex-col shadow-2xl transition-all duration-300">
          {/* Header */}
          <div className="bg-[#080808] border-b border-[#2e2e2e] p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#C47840]/10 flex items-center justify-center text-[#C47840] font-bold text-[0.95rem]">
                P
              </div>
              <div>
                <h4 className="text-white text-[0.85rem] font-semibold tracking-[0.05em]">PARE Assistant</h4>
                <p className="text-[0.62rem] text-[#888880] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse"></span>
                  Online Support
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#888880] hover:text-white bg-transparent border-none cursor-pointer transition-colors"
              aria-label="Close Chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#0d0d0d]">
            {messages.map((m, i) => (
              <div
                key={i}
                className={[
                  'flex gap-2.5 max-w-[85%]',
                  m.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                ].join(' ')}
              >
                {m.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-[#C47840] text-[#080808] text-[0.62rem] font-bold flex items-center justify-center shrink-0">
                    P
                  </div>
                )}
                <div
                  className={[
                    'p-3 text-[0.8rem] leading-relaxed',
                    m.sender === 'user'
                      ? 'bg-[#C47840] text-[#080808] font-medium'
                      : 'bg-[#1a1a1a] text-[#ece9e3] border border-[#2e2e2e]'
                  ].join(' ')}
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 max-w-[85%]">
                <div className="w-6 h-6 rounded-full bg-[#C47840] text-[#080808] text-[0.62rem] font-bold flex items-center justify-center shrink-0">
                  P
                </div>
                <div className="bg-[#1a1a1a] text-[#ece9e3] border border-[#2e2e2e] p-3 text-[0.8rem] rounded-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#888880] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-[#888880] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-[#888880] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick FAQ Suggestion Options */}
          <div className="px-4 py-2 border-t border-[#2e2e2e] bg-[#111111] flex flex-wrap gap-1.5 max-h-[120px] overflow-y-auto custom-scrollbar">
            {faqData.filter(faq => faq.q !== 'Hello').map((faq, idx) => (
              <button
                key={idx}
                onClick={() => handleFAQClick(faq)}
                className="shrink-0 bg-[#1a1a1a] hover:bg-[#C47840]/10 border border-[#2e2e2e] hover:border-[#C47840] text-[#ece9e3] px-3 py-1.5 text-[0.68rem] transition-colors cursor-pointer"
              >
                {faq.q}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage(inputValue)
            }}
            className="p-3 bg-[#080808] border-t border-[#2e2e2e] flex gap-2 items-center"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 bg-[#111111] border border-[#2e2e2e] text-[#ece9e3] text-[0.8rem] px-3 py-2.5 focus:border-[#C47840] focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className={[
                'w-9 h-9 flex items-center justify-center border-none cursor-pointer transition-colors',
                inputValue.trim() ? 'bg-[#C47840] text-[#080808]' : 'bg-[#1a1a1a] text-[#555550]'
              ].join(' ')}
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </div>
  )
}