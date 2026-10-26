// Every outbound link the site uses lives here, so swapping a URL is a one-line change.

// cartId is dropped from the shared link: it is a per-visitor Fresha cart, not part of the venue URL
export const BOOKING_URL =
  'https://www.fresha.com/a/pare-mens-grooming-lifestyle-iloilo-city-the-alcove-general-luna-street-g943g1tc/booking?menu=true&pId=1117646&allOffer=true'

// TODO: replace with PARE's live Shopify storefront domain
export const SHOPIFY_URL = 'https://pare-iloilo.myshopify.com'


export const INSTAGRAM_URL = 'https://www.instagram.com/pare_iloilo.ph'
export const FACEBOOK_URL = 'https://www.facebook.com/iloilofadebarber'
export const EMAIL = 'nivla38@gmail.com'
// PARE's Google Business listing; opens the place card with its reviews
export const GOOGLE_REVIEWS_URL = 'https://www.google.com/maps?cid=8396258425593174899'
export const GOOGLE_RATING = { score: '5.0', count: 177 }

export const MAPS_URL = "https://maps.google.com/?q=PARE+Men's+Grooming+and+Lifestyle+Iloilo+City"

// Licensed under the Mixkit Free License (mixkit.co/license), self-hosted in /public/video
export const VIDEO = {
  hero: '/video/hero-craft.mp4',
  film: '/video/scissor-work.mp4',
  clipper: '/video/clipper-outline.mp4',
  beard: '/video/beard-shape.mp4',
  tools: '/video/tools.mp4',
  chairs: '/video/chairs.mp4',
  reveal: '/video/the-reveal.mp4',
  finish: '/video/finish.mp4',
}

export const poster = (src) => src.replace(/\.mp4$/, '.jpg')
