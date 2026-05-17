'use client'

import { CheckCircle2 }     from 'lucide-react'
import { ScrollReveal }     from '@/components/ui/ScrollReveal'
import { GradientText }     from '@/components/ui/GradientText'
import { Badge }            from '@/components/ui/Badge'
import { CASE_STUDIES }     from '@/lib/data/caseStudies'

export function CaseStudies() {
  return (
    <section id="problems" className="relative py-28 px-6 overflow-hidden bg-[var(--bg-sunken)] dark:bg-[rgb(4,4,12)]">

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(79,142,247,0.07) 0%, transparent 60%)',
            'radial-gradient(ellipse 50% 40% at 80% 100%, rgba(124,111,247,0.05) 0%, transparent 60%)',
          ].join(', '),
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <ScrollReveal>
            <p className="text-[11px] font-bold tracking-[2.5px] uppercase text-accent mb-4">Case Studies</p>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <h2 className="text-[clamp(34px,5vw,56px)] font-black tracking-[-2.5px] leading-[1.04]">
              Problems I've <GradientText>solved</GradientText>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="mt-3 text-[16px] text-muted max-w-md leading-relaxed">
              Real engagements. Real outcomes. Confidential clients.
            </p>
          </ScrollReveal>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-5">
          {CASE_STUDIES.map((cs, i) => (
            <ScrollReveal key={cs.title} delay={i * 0.09}>
              <div className="group h-full flex flex-col p-6 rounded-2xl border border-[var(--card-border)] bg-[var(--bg)] hover:border-accent/30 hover:shadow-card-hover transition-all duration-250">

                <div className="mb-4">
                  <Badge variant={cs.badgeVariant}>{cs.badge}</Badge>
                </div>

                <h3 className="font-bold text-[17px] text-foreground mb-3 leading-snug tracking-tight">
                  {cs.title}
                </h3>

                <p className="text-[14px] text-muted leading-[1.7] flex-1 mb-5">
                  {cs.description}
                </p>

                {/* Outcome */}
                <div className="flex items-start gap-2.5 pt-4 border-t border-[var(--card-border)]">
                  <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                  <span className="text-[13px] font-semibold text-foreground leading-snug">{cs.outcome}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  )
}
