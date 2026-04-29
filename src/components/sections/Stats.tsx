'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView }    from 'framer-motion'
import { STATS }        from '@/lib/data/stats'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const DURATION_MS = 1800

function useCountUp(target: number, active: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    let start: number | null = null
    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / DURATION_MS, 1)
      // Ease-out expo
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
      <div className="flex flex-col items-center gap-1 px-8 py-6 rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm text-center">
        <span className="text-[clamp(48px,6vw,72px)] font-black tracking-[-3px] leading-none bg-gradient-to-br from-accent to-accent-violet bg-clip-text text-transparent">
          {count}{suffix}
        </span>
        <span className="text-sm tracking-[1.5px] uppercase text-muted font-medium">{label}</span>
      </div>
    </ScrollReveal>
  )
}

export function Stats() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} id="stats" className="py-20 px-6 border-y border-white/[0.05]">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((stat, i) => (
          <StatCard key={stat.label} {...stat} active={inView} delay={i * 0.1} />
        ))}
      </div>
    </section>
  )
}
