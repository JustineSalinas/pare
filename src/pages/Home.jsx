import Hero from '../components/Hero'
import Film from '../components/Film'
import Pillars from '../components/Pillars'
import ServicesPreview from '../components/ServicesPreview'
import Shop from '../components/Shop'
import Reviews from '../components/Reviews'
import Team from '../components/Team'
import Journal from '../components/Journal'
import Education from '../components/Education'
import CtaBanner from '../components/CtaBanner'

// Section order mirrors sotastudio.ca's home page
export default function Home() {
  return (
    <main>
      <Hero />
      <Film />
      <Pillars />
      <ServicesPreview />
      <Shop />
      <Reviews />
      <Team />
      <Journal />
      <Education />
      <CtaBanner />
    </main>
  )
}
