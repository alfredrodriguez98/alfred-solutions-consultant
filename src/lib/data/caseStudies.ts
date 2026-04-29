import type { CaseStudy } from '@/types'

export const CASE_STUDIES: CaseStudy[] = [
  {
    badge: 'Custody Architecture',
    badgeVariant: 'cyan',
    title: 'Tier-1 Exchange — Qualified Custody Migration',
    description:
      'Led the technical evaluation for a top-10 exchange migrating $800M in BTC/ETH to institutional custody. Designed a hot/warm/cold tiered architecture with automated sweep policies and sub-second approval routing.',
    outcome: '40% reduction in settlement time',
  },
  {
    badge: 'API Integration',
    badgeVariant: 'teal',
    title: 'Prime Broker OMS — Real-Time Settlement Layer',
    description:
      "Architected a real-time webhook integration connecting BitGo's settlement layer to a prime broker's OMS, handling 10,000+ daily transactions with sub-second confirmation notifications and automated reconciliation.",
    outcome: 'Zero reconciliation failures at launch',
  },
  {
    badge: 'Compliance',
    badgeVariant: 'amber',
    title: 'VASP Travel Rule — 5-Jurisdiction Compliance Build',
    description:
      "Guided a licensed VASP through full Travel Rule compliance across 5 jurisdictions — mapping their counterparty workflow to BitGo's policy engine and Chainalysis KYT integration. Zero disruption to existing flows.",
    outcome: 'Full compliance in 6 weeks',
  },
  {
    badge: 'DeFi Access',
    badgeVariant: 'purple',
    title: 'Hedge Fund — Institutional DeFi Access Layer',
    description:
      "Built a proof-of-concept for a hedge fund accessing on-chain DeFi protocols through BitGo's secure signing infrastructure — maintaining full custody controls while enabling automated on-chain yield strategies.",
    outcome: '$50M deployed on-chain within 90 days',
  },
]
