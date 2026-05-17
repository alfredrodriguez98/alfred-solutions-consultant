'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView }    from 'framer-motion'
import { STATS }        from '@/lib/data/stats'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const DURATION_MS = 1600

function useCountUp(target: number, active: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    let start: number | null = null
    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / DURATION_MS, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [active, target])

  return count
}

interface StatCardProps {
  value:  number
  suffix: string
  label:  string
  active: boolean
  delay:  number
}

function StatCard({ value, suffix, label, active, delay }: StatCardProps) {
  const count = useCountUp(value, active)

  return (
    <ScrollReveal delay={delay}>
      <div className="flex flex-col items-center gap-2 px-6 py-8 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] text-center">
        <span className="text-[clamp(42px,5.5vw,68px)] font-black tracking-[-3px] leading-none bg-gradient-to-br from-accent to-accent-violet bg-clip-text text-transparent tabular-nums">
          {count}{suffix}
        </span>
        <span className="text-[11px] tracking-[2px] uppercase text-muted font-semibold">{label}</span>
      </div>
    </ScrollReveal>
  )
}

export function Stats() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} id="stats" className="py-20 px-6 border-y border-[var(--strip-border)] bg-[var(--strip-bg)]">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
        {STATS.map((stat, i) => (
          <StatCard key={stat.label} {...stat} active={inView} delay={i * 0.08} />
        ))}
      </div>
    </section>
  )
}
