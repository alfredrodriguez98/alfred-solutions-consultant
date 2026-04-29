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
            {/* Traveling neon glow orb */}
            <span
              className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                width: '120px',
                height: '3px',
                borderRadius: '9999px',
                background: 'linear-gradient(90deg, transparent, #4f8ef7 40%, #a78bfa 60%, transparent)',
                boxShadow: '0 0 8px 3px rgba(79,142,247,0.7), 0 0 20px 6px rgba(167,139,250,0.4)',
                animation: 'neon-travel 3s ease-in-out infinite',
              }}
            />
          </div>
          <style>{`
            @keyframes neon-travel {
              0%   { left: -120px; opacity: 0; }
              10%  { opacity: 1; }
              90%  { opacity: 1; }
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
