'use client'

import { ScrollReveal }   from '@/components/ui/ScrollReveal'
import { GradientText }   from '@/components/ui/GradientText'
import { PLAYBOOK_STEPS } from '@/lib/data/playbook'

export function Playbook() {
  return (
    <section id="playbook" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-[11px] font-bold tracking-[2.5px] uppercase text-accent mb-4">Methodology</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-[clamp(34px,5vw,56px)] font-extrabold tracking-[-2px] leading-[1.05]">
              My Pre-Sales <GradientText>Playbook</GradientText>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-4 text-[17px] text-muted max-w-xl mx-auto">
              A repeatable, client-first framework I run on every enterprise engagement.
            </p>
          </ScrollReveal>
        </div>

        {/* Steps — horizontal on desktop, vertical on mobile */}
        <div className="relative">
          {/* Connecting line track (desktop only) */}
          <div className="hidden lg:block absolute top-[52px] left-[calc(10%+28px)] right-[calc(10%+28px)] h-px bg-accent/15 pointer-events-none overflow-visible">
            {/* Traveling neon glow dot */}
            <span
              className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '9999px',
                background: '#a78bfa',
                boxShadow: '0 0 6px 3px rgba(167,139,250,0.9), 0 0 18px 8px rgba(79,142,247,0.6), 0 0 32px 14px rgba(79,142,247,0.25)',
                animation: 'neon-dot-travel 4s ease-in-out infinite',
              }}
            />
          </div>
          <style>{`
            @keyframes neon-dot-travel {
              0%   { left: -10px; opacity: 0; }
              8%   { opacity: 1; }
              92%  { opacity: 1; }
              100% { left: 100%; opacity: 0; }
            }
          `}</style>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4">
            {PLAYBOOK_STEPS.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center group">
                  {/* Step number bubble */}
                  <div className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center font-black text-[15px] tracking-wide mb-5 border border-accent/30 bg-background group-hover:border-accent/70 group-hover:bg-accent/10 transition-all duration-300"
                    style={{ boxShadow: '0 0 0 4px rgba(79,142,247,0.07)' }}
                  >
                    <span className="text-accent">{step.number}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-[15px] text-foreground mb-2 leading-snug">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[13.5px] text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
