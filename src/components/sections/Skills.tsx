'use client'

import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { GradientText } from '@/components/ui/GradientText'
import { Marquee }      from '@/components/ui/Marquee'
import { SKILLS, MARQUEE_ITEMS, LANGUAGES } from '@/lib/data/skills'

const LEVEL_STYLE: Record<string, string> = {
  Native:       'text-accent border-accent/30 bg-accent/8',
  Fluent:       'text-accent-violet border-accent-violet/30 bg-accent-violet/8',
  Professional: 'text-muted border-[var(--card-border)] bg-[var(--tag-bg)]',
}

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

        {/* Languages */}
        <div className="mt-20">
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="text-[11px] font-bold tracking-[2.5px] uppercase text-accent mb-3">Languages</p>
              <h3 className="text-[clamp(22px,3vw,32px)] font-extrabold tracking-tight">
                I speak your <GradientText>client's language</GradientText>
              </h3>
              <p className="mt-3 text-[15px] text-muted max-w-sm mx-auto">
                Literally. Across six languages, I build trust before the first slide loads.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3">
              {LANGUAGES.map((lang, i) => (
                <div
                  key={lang.name}
                  className="group flex items-center gap-3 px-5 py-3 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] hover:bg-[var(--card-bg-hover)] hover:border-accent/30 transition-all duration-200 cursor-default"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <span className="text-[22px] leading-none">{lang.flag}</span>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-foreground leading-tight">{lang.name}</span>
                    <span className={`text-[10px] font-semibold tracking-wide uppercase px-1.5 py-0.5 rounded-full border mt-0.5 w-fit ${LEVEL_STYLE[lang.level]}`}>
                      {lang.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
