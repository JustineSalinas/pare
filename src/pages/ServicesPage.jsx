import { useEffect } from 'react'
import Services from '../components/Services'
import Wedding from '../components/Wedding'

export default function ServicesPage() {
  useEffect(() => {
    document.title = 'Services & Pricing | PARE Iloilo City'
  }, [])

  return (
    <main className="bg-ink-2 pt-16 md:pt-20">
      <Services />
      <Wedding />
    </main>
  )
}
