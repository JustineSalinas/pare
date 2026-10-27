import { useEffect } from 'react'
import Gallery from '../components/Gallery'

export default function GalleryPage() {
  useEffect(() => {
    document.title = 'Gallery & Lookbook | PARE Iloilo City'
  }, [])

  return (
    <main className="bg-ink pt-16 md:pt-20">
      <Gallery />
    </main>
  )
}
