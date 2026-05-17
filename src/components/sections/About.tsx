'use client'

import { Code2, Handshake, Zap, Bitcoin } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { GradientText } from '@/components/ui/GradientText'

const PILLARS = [
  {
    icon: Code2,
    label: 'Technical Depth',
    detail: 'Former blockchain dev — I speak both institutional finance and developer fluently.',
    color: 'text-accent',
    bg:    'bg-accent/10',
    border:'border-accent/15',
  },
  {
    icon: Handshake,
    label: 'Trusted Advisor',
    detail: 'Clients treat me as a partner, not a vendor. Long-term relationships over quick closes.',
    color: 'text-accent-violet',
    bg:    'bg-accent-violet/10',
    border:'border-accent-violet/15',
  },
  {
    icon: Zap,
    label: 'Speed to Value',
    detail: 'PoCs in days, not months. I close with working code and real architecture.',
    color: 'text-accent-purple',
    bg:    'bg-accent-purple/10',
    border:'border-accent-purple/15',
  },
]

export function About() {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <ScrollReveal>
            <p className="text-[11px] font-bold tracking-[2.5px] uppercase text-accent mb-4">About</p>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <h2 className="text-[clamp(34px,5vw,56px)] font-black tracking-[-2.5px] leading-[1.04] mb-5 max-w-[700px]">
              The SE who{' '}
              <GradientText>builds</GradientText>
              {' '}what he sells.
            </h2>
          </ScrollReveal>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Main narrative — spans 2 cols */}
          <ScrollReveal delay={0.05} className="md:col-span-2">
            <div className="h-full p-7 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-sm hover:border-accent/20 transition-colors duration-300">
              <p className="text-[16px] text-muted leading-[1.75] mb-4">
                I started as a Systems Engineer at <span className="text-foreground font-medium">Infosys</span>, pivoted to Blockchain Development — writing smart contracts and building on-chain protocols — then brought that hands-on technical foundation into institutional sales as a Solutions Engineer at <span className="text-foreground font-medium">BitGo</span>.
              </p>
              <p className="text-[16px] text-muted leading-[1.75]">
                That journey means I can sit in a room with a CISO, a DevOps lead, and a CFO — and have a credible conversation with each of them. I don't just demo the product; I <span className="text-foreground font-medium">design the solution alongside the client.</span>
              </p>
            </div>
          </ScrollReveal>

          {/* Bitcoin badge — single col */}
          <ScrollReveal delay={0.12} from="right">
            <div className="h-full p-7 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-sm hover:border-accent/20 transition-colors duration-300 flex flex-col justify-between">
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center mb-4">
                <Bitcoin size={22} className="text-accent" />
              </div>
              <div>
                <p className="text-[28px] font-black tracking-tight text-foreground mb-1">4+ yrs</p>
                <p className="text-[13.5px] text-muted leading-snug">in institutional digital asset infrastructure</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Pillar cards */}
          {PILLARS.map((p, i) => (
            <ScrollReveal key={p.label} delay={0.18 + i * 0.08} from={i % 2 === 0 ? 'bottom' : 'right'}>
              <div className="group h-full p-6 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-sm hover:border-accent/20 transition-colors duration-300">
                <div className={`w-10 h-10 rounded-xl ${p.bg} border ${p.border} flex items-center justify-center mb-4`}>
                  <p.icon size={18} className={p.color} />
                </div>
                <p className="font-bold text-[15px] text-foreground mb-1.5">{p.label}</p>
                <p className="text-[13.5px] text-muted leading-relaxed">{p.detail}</p>
              </div>
            </ScrollReveal>
          ))}

        </div>
      </div>
    </section>
  )
}
