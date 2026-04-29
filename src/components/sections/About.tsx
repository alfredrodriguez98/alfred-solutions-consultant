'use client'

import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { GradientText } from '@/components/ui/GradientText'

const PILLARS = [
  {
    icon: '🧩',
    label: 'Technical Depth',
    detail: 'Former blockchain dev — I speak both institutional finance and developer.',
  },
  {
    icon: '🤝',
    label: 'Trusted Advisor',
    detail: 'Clients treat me as a partner, not a vendor.',
  },
  {
    icon: '⚡',
    label: 'Speed to Value',
    detail: 'PoCs in days, not months. I close with working code.',
  },
]

export function About() {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* Left — narrative */}
        <div>
          <ScrollReveal>
            <p className="text-[11px] font-bold tracking-[2.5px] uppercase text-accent mb-4">About</p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="text-[clamp(34px,5vw,56px)] font-extrabold tracking-[-2px] leading-[1.05] mb-6">
              The SE who{' '}
              <GradientText>builds</GradientText>
              {' '}what he sells.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-[17px] text-muted leading-relaxed mb-4">
              I started as a Systems Engineer at Infosys, pivoted to Blockchain Development — writing smart contracts and building on-chain protocols — then brought that hands-on technical foundation into institutional sales as a Solutions Engineer at BitGo.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="text-[17px] text-muted leading-relaxed">
              That journey means I can sit in a room with a CISO, a DevOps lead, and a CFO — and have a credible conversation with each of them. I don't just demo the product; I design the solution alongside the client.
            </p>
          </ScrollReveal>
        </div>

        {/* Right — pillar cards */}
        <div className="flex flex-col gap-4">
          {PILLARS.map((p, i) => (
            <ScrollReveal key={p.label} delay={0.15 + i * 0.1} from="right">
              <div className="flex items-start gap-4 p-5 rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm hover:border-accent/30 hover:bg-white/[0.05] transition-all duration-300">
                <span className="text-2xl mt-0.5">{p.icon}</span>
                <div>
                  <p className="font-bold text-foreground mb-1">{p.label}</p>
                  <p className="text-[14px] text-muted">{p.detail}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  )
}
