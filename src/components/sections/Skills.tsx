'use client'

import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { GradientText } from '@/components/ui/GradientText'
import { Marquee }      from '@/components/ui/Marquee'
import { SKILLS, MARQUEE_ITEMS } from '@/lib/data/skills'

export function Skills() {
  return (
    <section id="skills" className="py-28 overflow-hidden">
      {/* Marquee strip */}
      <div className="border-y border-[var(--strip-border)] py-5 mb-24 bg-[var(--strip-bg)]">
        <Marquee items={MARQUEE_ITEMS} />
      </div>

      <div className="px-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <ScrollReveal>
            <p className="text-[11px] font-bold tracking-[2.5px] uppercase text-accent mb-4">Stack</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-[clamp(34px,5vw,56px)] font-extrabold tracking-[-2px] leading-[1.05]">
              Tools & <GradientText>Technologies</GradientText>
            </h2>
          </ScrollReveal>
        </div>

        {/* Skill pills */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3">
            {SKILLS.map(skill => (
              <span key={skill}
                className="px-4 py-2 rounded-xl text-[13.5px] font-medium border border-[var(--card-border)] bg-[var(--tag-bg)] text-muted hover:border-accent/30 hover:text-foreground hover:bg-[var(--card-bg-hover)] transition-all duration-200 cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
