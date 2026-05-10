import type { ExperienceItem } from '@/types'

export const EXPERIENCE: ExperienceItem[] = [
  {
    period: 'Jan 2026 — Present',
    current: true,
    role: 'Senior Solutions Engineer',
    company: 'BitGo',
    subtitle: 'Institutional Digital Asset Custody',
    description:
      'Leads pre-sales engineering on BitGo\'s largest and most complex CaaS deals — translating multi-sig, MPC, and policy-engine architecture into business outcomes that land with CISOs, COOs, and CFOs of institutional buyers. Architected a scenario-driven CaaS demo console that compressed what had been multi-week sandbox conversations into a 30-minute live walkthrough, consistently winning technical evaluations on flagship accounts. Built and shipped an internal Claude-powered knowledge agent that surfaces deal-specific security and architecture context to AEs and SEs in real time, cutting engineering escalations and accelerating demo prep. Also engineered an AI prospect-intelligence workflow that synthesizes public filings, on-chain footprint, and competitor signals into pre-call briefs — giving the GTM team a defensible first-mover edge with sophisticated institutional buyers.',
    tags: ['MPC Custody', 'CaaS', 'Pre-Sales', 'AI Tooling', 'Demo Engineering', 'Enterprise Sales', 'PoC Architecture', 'Claude'],
  },
  {
    period: 'Aug 2023 — Dec 2025',
    role: 'Solutions Engineer',
    company: 'BitGo',
    subtitle: 'Institutional Digital Asset Custody',
    description:
      'Owned the full technical sales motion across hedge funds, exchanges, neobanks, and asset managers — running discovery, scoping, demos, POCs, and security reviews end-to-end alongside Sales. Co-led the customer-facing Matic → POL token migration program, authoring and validating migration tooling against production-grade volume and walking enterprise clients through a zero-disruption cutover. Designed and built a self-serve CaaS exploration portal where institutional prospects modeled API integration patterns, fee structures, and webhook flows against real platform behavior, turning passive demos into buyer-led validation that compressed evaluation cycles. Operationalized BitGo\'s RFP and DDQ response engine in Loopio and shipped a Claude-powered automation that cut end-to-end RFP cycle time from a 7-day standard to ~8 hours — a ~95% reduction — while lifting response accuracy for prospects competing on tight timelines. Invited speaker at India Blockchain Week 2025, presenting "Proof of Trust: BitGo" to evangelize the institutional custody narrative.',
    tags: ['API Integrations', 'Token Migration', 'Loopio', 'RFP Automation', 'POC Design', 'Pre-Sales', 'IBW 2025'],
  },
  {
    period: 'Dec 2022 — Aug 2023',
    role: 'Blockchain Developer',
    company: 'Spericorn Technology',
    subtitle: 'Blockchain Engineering',
    description:
      'Shipped production-ready smart-contract systems on EVM chains for client-facing fintech products, owning Solidity development, test coverage, gas optimization, and pre-audit security review hand-offs. Engineered a crypto payment gateway and on-chain order tracking system for a crypto-native e-commerce platform — abstracting payment state, vendor settlement, and delivery verification into a single auditable contract flow that eliminated manual reconciliation for the operations team. Architected a P2P lending dApp with full automation of interest accrual, collateralization ratios, and liquidation triggers, built to 97% test coverage with hardened protections against reentrancy and oracle-manipulation vectors.',
    tags: ['Solidity', 'Smart Contracts', 'EVM', 'Hardhat', 'DeFi', 'Gas Optimization', 'Security Review'],
  },
  {
    period: 'Mar 2021 — Jul 2022',
    role: 'Systems Engineer',
    company: 'Infosys',
    subtitle: 'Enterprise Technology',
    description:
      'Delivered features on Medtronic\'s iPad-based cardiac monitoring application — implementing client-driven parameters in next-generation pacemaker firmware and validating across regulated integration test suites in a zero-defect environment. Built and maintained an automated regression test suite for IDB Bank\'s core banking platform, accelerating release cadence and measurably reducing manual QA effort on every deployment cycle.',
    tags: ['Enterprise IT', 'Medical Devices', 'Firmware', 'Test Automation', 'Core Banking', 'Regulated Systems'],
  },
]
