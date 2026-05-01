export interface SpeakingPhoto {
  src: string
  alt: string
}

export interface SpeakingEvent {
  id: string
  event: string
  organiser: string
  location: string
  date: string
  topic: string
  tagline: string
  stat: { value: string; label: string }
  photos: SpeakingPhoto[]
}

export const SPEAKING_EVENTS: SpeakingEvent[] = [
  {
    id: 'ibw2025',
    event: 'IBW 2025',
    organiser: 'India Blockchain Week · Hosted by #Hashed Emergent',
    location: 'Bangalore, India',
    date: 'Dec 2025',
    topic: 'The Evolving Crypto Threat Landscape',
    tagline:
      'Why $2.5B+ lost in H1 2025 alone proves that self-custody is no longer enough — and what institutional-grade custody actually changes.',
    stat: { value: '$2.5B+', label: 'Lost to hacks in H1 2025' },
    photos: [
      { src: '/images/ibw/ibw-speaking-1.jpg', alt: 'Alfred engaging with the audience at #Hashed Emergent IBW 2025' },
      { src: '/images/ibw/ibw-speaking-2.jpg', alt: 'Alfred on stage presenting at IBW 2025' },
      { src: '/images/ibw/ibw-audience.jpg',   alt: 'Packed audience at the IBW 2025 session' },
      { src: '/images/ibw/ibw-slide.jpg',       alt: 'Alfred presenting The Cost of Insecurity slide at IBW 2025' },
    ],
  },
]
