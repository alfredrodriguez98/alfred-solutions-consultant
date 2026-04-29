'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils/cn'

/** Custom dual-layer cursor (dot + lagged ring). Desktop-only. */
export function Cursor() {
  const [pos, setPos]       = useState({ x: 0, y: 0 })
  const [ring, setRing]     = useState({ x: 0, y: 0 })
  const [hovering, setHover] = useState(false)
  const ringRef             = useRef({ x: 0, y: 0 })
  const posRef              = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      setPos({ x: e.clientX, y: e.clientY })
    }

    const INTERACTIVE = 'a, button, [data-tilt], .skill-pill, .info-card, .tl-card'

    const onEnter = () => setHover(true)
    const onLeave = () => setHover(false)

    document.addEventListener('mousemove', onMove)
    const interactiveEls = Array.from(document.querySelectorAll(INTERACTIVE))
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    // Smooth ring lag via rAF
    let rafId: number
    const animate = () => {
      ringRef.current.x += (posRef.current.x - ringRef.current.x) * 0.14
      ringRef.current.y += (posRef.current.y - ringRef.current.y) * 0.14
      setRing({ ...ringRef.current })
      rafId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      document.removeEventListener('mousemove', onMove)
      interactiveEls.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        className={cn(
          'fixed z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full',
          'mix-blend-difference bg-accent transition-[width,height] duration-200',
          hovering ? 'w-5 h-5' : 'w-3 h-3',
        )}
        style={{ left: pos.x, top: pos.y }}
      />
      {/* Ring */}
      <div
        className={cn(
          'fixed z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full',
          'border border-accent/50 transition-[width,height,border-color] duration-[400ms]',
          hovering ? 'w-16 h-16 border-accent-violet/60' : 'w-10 h-10',
        )}
        style={{ left: ring.x, top: ring.y }}
      />
    </>
  )
}
