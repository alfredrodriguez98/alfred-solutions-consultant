'use client'

import { ScrollReveal }   from '@/components/ui/ScrollReveal'
import { GradientText }   from '@/components/ui/GradientText'
import { PLAYBOOK_STEPS } from '@/lib/data/playbook'

/**
 * Dot animation: linear 4s, left: -10px → 100%
 * Circles are at ~0%, 25%, 50%, 75%, 100% of the line width.
 * With linear timing, passing times: ~0.2s, ~1.0s, ~2.0s, ~3.0s, ~3.7s
 *
 * circle-glow keyframe peaks at 50% of its 4s cycle = 2.0s.
 * animation-delay = passingTime − 2.0s so each circle glows exactly
 * when the dot arrives.
 */
const GLOW_DELAYS = ['-1.8s', '-1.0s', '0s', '1.0s', '1.7s']

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

        {/* Steps */}
        <div className="relative">

          {/* Track line — top-[28px] = center of h-14 (56px) circles */}
          <div className="hidden lg:block absolute top-[28px] left-[calc(10%+28px)] right-[calc(10%+28px)] h-px bg-accent/15 pointer-events-none overflow-visible">
            {/* Traveling neon dot */}
            <span
              className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '9999px',
                background: '#a78bfa',
                boxShadow: '0 0 6px 3px rgba(167,139,250,0.9), 0 0 18px 8px rgba(79,142,247,0.6), 0 0 32px 14px rgba(79,142,247,0.25)',
                animation: 'neon-dot-travel 4s linear infinite',
              }}
            />
          </div>

          <style>{`
            /* Dot travels the full line width */
            @keyframes neon-dot-travel {
              0%   { left: -10px; opacity: 0; }
              8%   { opacity: 1; }
              92%  { opacity: 1; }
              100% { left: 100%; opacity: 0; }
            }

            /* Brief glow flash on each circle as the dot passes through.
               Peak at 50% (= 2.0s into a 4s cycle).
               Each circle uses animation-delay to shift its peak to the
               exact moment the dot crosses it. */
            @keyframes circle-glow {
              0%, 38%, 62%, 100% {
                border-color: rgba(79,142,247,0.30);
                box-shadow: 0 0 0 4px rgba(79,142,247,0.07);
                background-color: transparent;
              }
              50% {
                border-color: rgba(167,139,250,0.90);
                box-shadow: 0 0 0 4px rgba(79,142,247,0.12),
                            0 0 16px 6px rgba(79,142,247,0.55),
                            0 0 32px 14px rgba(167,139,250,0.28);
                background-color: rgba(79,142,247,0.10);
              }
            }
          `}</style>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4">
            {PLAYBOOK_STEPS.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center group">

                  {/* Step number bubble — animated glow when dot passes */}
                  <div
                    className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center font-black text-[15px] tracking-wide mb-5 border bg-background group-hover:bg-accent/10 transition-[background-color] duration-300"
                    style={{
                      animation: 'circle-glow 4s linear infinite',
                      animationDelay: GLOW_DELAYS[i],
                    }}
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
