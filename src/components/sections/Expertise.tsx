'use client'

import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { GradientText } from '@/components/ui/GradientText'
import { EXPERTISE }    from '@/lib/data/expertise'

export function Expertise() {
  return (
    <section id="expertise" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-[11px] font-bold tracking-[2.5px] uppercase text-accent mb-4">Core Expertise</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-[clamp(34px,5vw,56px)] font-extrabold tracking-[-2px] leading-[1.05]">
              Where I create <GradientText>value</GradientText>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-4 text-[17px] text-muted max-w-xl mx-auto">
              Full-spectrum fluency across digital asset infrastructure, enterprise integrations, and institutional pre-sales.
            </p>
          </ScrollReveal>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {EXPERTISE.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.08}>
              <div className="group h-full p-6 rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm hover:border-accent/30 hover:bg-white/[0.05] transition-all duration-300 cursor-default">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 bg-white/[0.06] border border-white/[0.08] group-hover:border-accent/20 transition-colors duration-300">
                  {item.icon}
                </div>
                {/* Title */}
                <h3 className="font-bold text-[17px] text-foreground mb-2 tracking-tight">
                  {item.title}
                </h3>
                {/* Description */}
                <p className="text-[14.5px] text-muted leading-relaxed">
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
