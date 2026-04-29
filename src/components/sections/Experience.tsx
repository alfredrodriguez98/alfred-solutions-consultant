'use client'

import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { GradientText } from '@/components/ui/GradientText'
import { EXPERIENCE }   from '@/lib/data/experience'

export function Experience() {
  return (
    <section id="experience" className="py-28 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <ScrollReveal>
            <p className="text-[11px] font-bold tracking-[2.5px] uppercase text-accent mb-4">Career</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-[clamp(34px,5vw,56px)] font-extrabold tracking-[-2px] leading-[1.05]">
              The <GradientText>journey</GradientText>
            </h2>
          </ScrollReveal>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[15px] top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-accent-violet/20 to-transparent" />

          <div className="flex flex-col gap-12">
            {EXPERIENCE.map((exp, i) => (
              <ScrollReveal key={exp.role + exp.company} delay={i * 0.12}>
                <div className="relative pl-12">
                  {/* Dot */}
                  <div className="absolute left-0 top-1.5 w-[30px] h-[30px] rounded-full border-2 border-accent/50 bg-background flex items-center justify-center">
                    {exp.current
                      ? <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse2" />
                      : <span className="w-2 h-2 rounded-full bg-accent/40" />
                    }
                  </div>

                  {/* Card */}
                  <div className="p-6 rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm hover:border-accent/20 transition-colors duration-300">
                    {/* Period + current badge */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[11.5px] font-bold tracking-[1.5px] uppercase text-muted">
                        {exp.period}
                      </span>
                      {exp.current && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-[1px] uppercase bg-accent/10 text-accent border border-accent/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                          Current
                        </span>
                      )}
                    </div>

                    {/* Role + Company */}
                    <h3 className="font-extrabold text-[20px] tracking-tight text-foreground mb-0.5">
                      {exp.role}
                    </h3>
                    <p className="text-[14px] text-accent font-semibold mb-4">
                      {exp.company} &nbsp;·&nbsp; <span className="text-muted font-normal">{exp.subtitle}</span>
                    </p>

                    {/* Description */}
                    <p className="text-[14.5px] text-muted leading-relaxed mb-5">
                      {exp.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map(tag => (
                        <span key={tag}
                          className="px-2.5 py-1 rounded-md text-[11.5px] font-medium border border-white/[0.08] bg-white/[0.04] text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
