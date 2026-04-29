'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
  /** Direction to animate from */
  from?: 'bottom' | 'left' | 'right'
}

type MotionState = { opacity: number; x?: number; y?: number }

const INITIAL: Record<NonNullable<ScrollRevealProps['from']>, MotionState> = {
  bottom: { opacity: 0, y: 36 },
  left:   { opacity: 0, x: -36 },
  right:  { opacity: 0, x:  36 },
}

/** Fades + slides children into view once they enter the viewport. */
export function ScrollReveal({ children, delay = 0, className, from = 'bottom' }: ScrollRevealProps) {
  const ref     = useRef<HTMLDivElement>(null)
  const inView  = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={INITIAL[from]}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : undefined}
      transition={{ duration: 0.85, delay, ease: [0.19, 1, 0.22, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
