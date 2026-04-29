'use client'

import { useRef }       from 'react'
import { useParticleField } from '@/hooks/useParticleCanvas'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { GradientText } from '@/components/ui/GradientText'
import { Badge }        from '@/components/ui/Badge'
import { CASE_STUDIES } from '@/lib/data/caseStudies'

export function CaseStudies() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useParticleField(canvasRef)

  return (
    <section id="problems" className="relative py-28 px-6 overflow-hidden bg-[#f0f0f5] dark:bg-[rgb(4,4,12)]">
      {/* Particle field */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60" />

      {/* Deep space ambience */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(79,142,247,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-[11px] font-bold tracking-[2.5px] uppercase text-accent mb-4">Case Studies</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-[clamp(34px,5vw,56px)] font-extrabold tracking-[-2px] leading-[1.05] text-white">
              Problems I've <GradientText>solved</GradientText>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-4 text-[17px] text-muted max-w-xl mx-auto">
              Real engagements. Real outcomes. Confidential clients.
            </p>
          </ScrollReveal>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {CASE_STUDIES.map((cs, i) => (
            <ScrollReveal key={cs.title} delay={i * 0.1}>
              <div className="group h-full flex flex-col p-7 rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm hover:border-accent/25 hover:bg-white/[0.05] transition-all duration-300">
                {/* Badge */}
                <div className="mb-5">
                  <Badge variant={cs.badgeVariant}>{cs.badge}</Badge>
                </div>

                {/* Title */}
                <h3 className="font-bold text-[18px] text-white mb-3 leading-snug tracking-tight">
                  {cs.title}
                </h3>

                {/* Description */}
                <p className="text-[14.5px] text-[#a1a1aa] leading-relaxed flex-1 mb-6">
                  {cs.description}
                </p>

                {/* Outcome */}
                <div className="flex items-center gap-2.5 pt-5 border-t border-white/[0.06]">
                  <span className="text-accent text-lg">✓</span>
                  <span className="text-[13.5px] font-semibold text-foreground">{cs.outcome}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  )
}
