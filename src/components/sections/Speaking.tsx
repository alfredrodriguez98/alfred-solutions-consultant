'use client'

import { useState }   from 'react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { GradientText } from '@/components/ui/GradientText'
import { SPEAKING_EVENTS } from '@/lib/data/speaking'

export function Speaking() {
  const [active, setActive] = useState(0)
  const ev = SPEAKING_EVENTS[0]

  return (
    <section id="speaking" className="py-28 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-[11px] font-bold tracking-[2.5px] uppercase text-accent mb-4">
              Speaking
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-[clamp(34px,5vw,56px)] font-extrabold tracking-[-2px] leading-[1.05]">
              On Stage &amp; <GradientText>In the Wild</GradientText>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-4 text-[17px] text-muted max-w-xl mx-auto">
              Sharing what I know about digital asset security with the builders and decision-makers who need it most.
            </p>
          </ScrollReveal>
        </div>

        {/* Event card */}
        <ScrollReveal delay={0.15}>
          <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] overflow-hidden">

            {/* Top band */}
            <div className="flex flex-wrap items-center justify-between gap-4 px-8 py-5 border-b border-[var(--card-border)]">
              <div>
                <span className="text-[11px] font-bold tracking-[2px] uppercase text-accent">
                  {ev.date} · {ev.location}
                </span>
                <h3 className="mt-1 text-[22px] font-extrabold tracking-tight">{ev.event}</h3>
                <p className="text-[13px] text-muted mt-0.5">{ev.organiser}</p>
              </div>

              {/* Stat chip */}
              <div className="flex flex-col items-center px-6 py-3 rounded-xl border border-red-500/20 bg-red-500/5">
                <span className="text-[28px] font-black text-red-400 leading-none">{ev.stat.value}</span>
                <span className="text-[11px] text-muted mt-1 text-center">{ev.stat.label}</span>
              </div>
            </div>

            {/* Body: photos + topic */}
            <div className="grid lg:grid-cols-2 gap-0">

              {/* Photo gallery */}
              <div className="relative border-r border-[var(--card-border)]">
                {/* Main photo */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-[var(--icon-bg)] group/photo">
                  <img
                    src={ev.photos[active].src}
                    alt={ev.photos[active].alt}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
                  />
                  {/* Gradient overlay bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

                  {/* Prev button */}
                  <button
                    onClick={() => setActive((active - 1 + ev.photos.length) % ev.photos.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center bg-black/40 border border-white/15 text-white backdrop-blur-sm opacity-0 group-hover/photo:opacity-100 hover:bg-black/65 hover:border-white/30 transition-all duration-200"
                    aria-label="Previous photo"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                  {/* Next button */}
                  <button
                    onClick={() => setActive((active + 1) % ev.photos.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center bg-black/40 border border-white/15 text-white backdrop-blur-sm opacity-0 group-hover/photo:opacity-100 hover:bg-black/65 hover:border-white/30 transition-all duration-200"
                    aria-label="Next photo"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                  {/* Photo counter */}
                  <div className="absolute bottom-3 right-3 z-10 px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-sm text-white text-[11px] font-semibold tracking-wide opacity-0 group-hover/photo:opacity-100 transition-opacity duration-200">
                    {active + 1} / {ev.photos.length}
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-2 p-3">
                  {ev.photos.map((ph, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`relative flex-1 aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        i === active
                          ? 'border-accent shadow-[0_0_0_2px_rgba(79,142,247,0.35)]'
                          : 'border-transparent opacity-60 hover:opacity-90'
                      }`}
                    >
                      <img
                        src={ph.src}
                        alt={ph.alt}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Talk details */}
              <div className="flex flex-col justify-center px-8 py-10 gap-6">
                {/* Talk label */}
                <div>
                  <p className="text-[11px] font-bold tracking-[2px] uppercase text-accent mb-2">
                    Talk
                  </p>
                  <h4 className="text-[20px] font-extrabold tracking-tight leading-snug">
                    {ev.topic}
                  </h4>
                </div>

                {/* Tagline */}
                <p className="text-[15px] text-muted leading-relaxed border-l-2 border-accent/40 pl-4">
                  {ev.tagline}
                </p>

                {/* Key themes */}
                <div>
                  <p className="text-[11px] font-bold tracking-[2px] uppercase text-muted mb-3">
                    Key Themes
                  </p>
                  <ul className="flex flex-col gap-2">
                    {[
                      'Anatomy of a $1.5B exchange hack',
                      'The gap between hot wallets & institutional custody',
                      'Why compliance + MPC + insurance changes everything',
                      'Custodians as the last line of defence',
                    ].map(t => (
                      <li key={t} className="flex items-start gap-2 text-[13.5px] text-muted">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* IBW badge */}
                <div className="mt-auto pt-2">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold border border-accent/20 bg-accent/5 text-accent">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    Speaker · India Blockchain Week 2025
                  </span>
                </div>
              </div>
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
