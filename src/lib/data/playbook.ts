import type { PlaybookStep } from '@/types'

export const PLAYBOOK_STEPS: PlaybookStep[] = [
  {
    number: '01',
    title: 'Technical Discovery',
    description: 'Map wallet architecture, key management, and compliance posture before anything else.',
  },
  {
    number: '02',
    title: 'Solution Design',
    description: 'Architect the integration blueprint and select the right custody model for this client.',
  },
  {
    number: '03',
    title: 'Proof of Concept',
    description: 'Build it live. Working code, real sandbox, actual client workflows — no slides.',
  },
  {
    number: '04',
    title: 'Stakeholder Alignment',
    description: 'Translate the solution for security, compliance, dev, and exec — each in their language.',
  },
  {
    number: '05',
    title: 'Go-Live Handoff',
    description: 'Document the spec, configure policies, stay engaged through launch day.',
  },
]
