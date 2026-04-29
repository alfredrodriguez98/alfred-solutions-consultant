// ─── Domain types ──────────────────────────────────────────────────────────

export interface ExpertiseItem {
  icon: string
  title: string
  description: string
}

export interface ExperienceItem {
  period: string
  current?: boolean
  role: string
  company: string
  subtitle: string
  description: string
  tags: string[]
}

export interface CaseStudy {
  badge: string
  badgeVariant: 'cyan' | 'teal' | 'amber' | 'purple'
  title: string
  description: string
  outcome: string
}

export interface PlaybookStep {
  number: string
  title: string
  description: string
}

export interface StatItem {
  value: number
  suffix: string
  label: string
}

// ─── UI prop helpers ───────────────────────────────────────────────────────

export type BadgeVariant = CaseStudy['badgeVariant']

export interface ToastPayload {
  title: string
  message: string
  color: 'cyan' | 'green' | 'amber' | 'purple' | 'red'
}
