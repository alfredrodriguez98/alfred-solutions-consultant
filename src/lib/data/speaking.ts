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
      { src: '/alfred-solutions-consultant/images/ibw/ibw-1.jpg', alt: 'Alfred at IBW 2025 — #Hashed Emergent session' },
      { src: '/alfred-solutions-consultant/images/ibw/ibw-2.jpg', alt: 'Alfred speaking on stage at IBW 2025' },
      { src: '/alfred-solutions-consultant/images/ibw/ibw-3.jpg', alt: 'Alfred presenting at IBW 2025' },
      { src: '/alfred-solutions-consultant/images/ibw/ibw-4.jpg', alt: 'Alfred at IBW 2025 — audience Q&A' },
      { src: '/alfred-solutions-consultant/images/ibw/ibw-5.jpg', alt: 'Alfred engaging with attendees at IBW 2025' },
      { src: '/alfred-solutions-consultant/images/ibw/ibw-6.jpg', alt: 'Alfred on stage at India Blockchain Week 2025' },
    ],
  },
]
