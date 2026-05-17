'use client'

import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { GradientText } from '@/components/ui/GradientText'
import { EXPERTISE }    from '@/lib/data/expertise'

export function Expertise() {
  return (
    <section id="expertise" className="py-28 px-6 bg-[var(--bg-raised)]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <ScrollReveal>
            <p className="text-[11px] font-bold tracking-[2.5px] uppercase text-accent mb-4">Core Expertise</p>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <h2 className="text-[clamp(34px,5vw,56px)] font-black tracking-[-2.5px] leading-[1.04] mb-4">
              Where I create <GradientText>value</GradientText>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-[16px] text-muted max-w-xl leading-relaxed">
              Full-spectrum fluency across digital asset infrastructure, enterprise integrations, and institutional pre-sales.
            </p>
          </ScrollReveal>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {EXPERTISE.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.07}>
              <div className="group h-full p-6 rounded-2xl border border-[var(--card-border)] bg-[var(--bg)] hover:border-accent/25 hover:shadow-card-hover transition-all duration-250 cursor-default">
                {/* Emoji icon in a clean container */}
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-5 bg-[var(--icon-bg)] border border-[var(--card-border)] group-hover:border-accent/20 group-hover:scale-110 transition-all duration-250">
                  {item.icon}
                </div>
                <h3 className="font-bold text-[15.5px] text-foreground mb-2 tracking-tight leading-snug">
                  {item.title}
                </h3>
                <p className="text-[13.5px] text-muted leading-[1.65]">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  )
}
