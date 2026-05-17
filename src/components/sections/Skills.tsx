'use client'

import { Globe, Code2, TrendingUp, Server, Shield, Languages } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { GradientText } from '@/components/ui/GradientText'
import { Marquee }      from '@/components/ui/Marquee'
import { LANGUAGES, MARQUEE_ITEMS } from '@/lib/data/skills'

const SKILL_CATEGORIES = [
  {
    icon: Globe,
    label: 'Blockchain & Web3',
    color: 'text-accent',
    bg:    'bg-accent/8',
    skills: ['Bitcoin / Ethereum', 'Smart Contracts', 'Solidity', 'Web3.js / Ethers.js', 'DeFi Protocols', 'Wallet Infrastructure'],
  },
  {
    icon: Shield,
    label: 'Custody & Security',
    color: 'text-accent-violet',
    bg:    'bg-accent-violet/8',
    skills: ['MPC & HSM Custody', 'Staking Infrastructure', 'Compliance & SOC 2', 'Crypto Compliance'],
  },
  {
    icon: TrendingUp,
    label: 'Pre-Sales & Strategy',
    color: 'text-accent-purple',
    bg:    'bg-accent-purple/8',
    skills: ['Pre-Sales Engineering', 'Technical Discovery', 'MEDDIC / MEDDPICC', 'RFP Responses', 'PoC Architecture', 'Solution Design'],
  },
  {
    icon: Code2,
    label: 'Engineering',
    color: 'text-accent-teal',
    bg:    'bg-accent-teal/8',
    skills: ['REST APIs', 'Node.js', 'Python', 'Enterprise Integrations', 'AWS / Cloud Infra'],
  },
]

const LEVEL_COLOR = {
  Native:       'text-accent font-semibold',
  Fluent:       'text-accent-violet font-semibold',
  Professional: 'text-muted',
} as const

export function Skills() {
  return (
    <section id="skills" className="py-28 overflow-hidden">

      {/* Marquee strip */}
      <div className="border-y border-[var(--strip-border)] py-4 mb-24 bg-[var(--strip-bg)]">
        <Marquee items={MARQUEE_ITEMS} />
      </div>

      <div className="px-6 max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <ScrollReveal>
            <p className="text-[11px] font-bold tracking-[2.5px] uppercase text-accent mb-4">Stack</p>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <h2 className="text-[clamp(34px,5vw,56px)] font-black tracking-[-2.5px] leading-[1.04]">
              Tools & <GradientText>Technologies</GradientText>
            </h2>
          </ScrollReveal>
        </div>

        {/* Skill category grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {SKILL_CATEGORIES.map((cat, i) => (
            <ScrollReveal key={cat.label} delay={0.06 + i * 0.08}>
              <div className="h-full p-6 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-sm hover:border-accent/20 transition-colors duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-8 h-8 rounded-lg ${cat.bg} flex items-center justify-center`}>
                    <cat.icon size={16} className={cat.color} />
                  </div>
                  <p className="text-[13px] font-bold text-foreground tracking-tight">{cat.label}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map(skill => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg text-[12.5px] font-medium border border-[var(--card-border)] bg-[var(--tag-bg)] text-muted hover:text-foreground hover:border-accent/25 transition-colors duration-150 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Languages */}
        <ScrollReveal delay={0.2}>
          <div className="p-6 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-accent/8 flex items-center justify-center">
                <Languages size={16} className="text-accent" />
              </div>
              <p className="text-[13px] font-bold text-foreground tracking-tight">Languages</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {LANGUAGES.map(lang => (
                <div
                  key={lang.name}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--card-border)] bg-[var(--tag-bg)]"
                >
                  <span className="text-base leading-none">{lang.flag}</span>
                  <span className="text-[13px] text-foreground font-medium">{lang.name}</span>
                  <span className={`text-[11.5px] ${LEVEL_COLOR[lang.level]}`}>{lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
