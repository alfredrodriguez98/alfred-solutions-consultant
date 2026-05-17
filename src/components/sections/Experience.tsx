'use client'

import { Briefcase }    from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { GradientText } from '@/components/ui/GradientText'
import { EXPERIENCE }   from '@/lib/data/experience'

export function Experience() {
  return (
    <section id="experience" className="py-28 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <ScrollReveal>
            <p className="text-[11px] font-bold tracking-[2.5px] uppercase text-accent mb-4">Career</p>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <h2 className="text-[clamp(34px,5vw,56px)] font-black tracking-[-2.5px] leading-[1.04]">
              The <GradientText>journey</GradientText>
            </h2>
          </ScrollReveal>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-accent-violet/25 to-transparent" />

          <div className="flex flex-col gap-10">
            {EXPERIENCE.map((exp, i) => (
              <ScrollReveal key={exp.role + exp.company} delay={i * 0.1}>
                <div className="relative pl-14">

                  {/* Timeline dot */}
                  <div className="absolute left-0 top-2 w-[38px] h-[38px] rounded-full border border-[var(--card-border)] bg-[var(--bg)] flex items-center justify-center">
                    {exp.current
                      ? (
                        <span className="relative flex w-2.5 h-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-40" />
                          <span className="relative inline-flex rounded-full w-2.5 h-2.5 bg-accent" />
                        </span>
                      )
                      : <Briefcase size={14} className="text-muted/60" />
                    }
                  </div>

                  {/* Card */}
                  <div className="p-6 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] hover:border-accent/25 transition-colors duration-250">

                    {/* Period + badge */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[11px] font-bold tracking-[1.5px] uppercase text-muted">
                        {exp.period}
                      </span>
                      {exp.current && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9.5px] font-bold tracking-[1px] uppercase bg-accent/10 text-accent border border-accent/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse2" />
                          Current
                        </span>
                      )}
                    </div>

                    {/* Role */}
                    <h3 className="font-bold text-[18px] tracking-tight text-foreground mb-0.5 leading-snug">
                      {exp.role}
                    </h3>
                    <p className="text-[13.5px] text-accent font-semibold mb-4">
                      {exp.company}
                      <span className="text-muted font-normal"> · {exp.subtitle}</span>
                    </p>

                    {/* Description */}
                    <p className="text-[14px] text-muted leading-[1.7] mb-5">
                      {exp.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-medium border border-[var(--card-border)] bg-[var(--tag-bg)] text-muted"
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
