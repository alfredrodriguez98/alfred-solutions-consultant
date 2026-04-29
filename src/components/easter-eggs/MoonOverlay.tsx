'use client'

import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface MoonOverlayProps {
  open: boolean
  onClose: () => void
}

/** Full-screen "To The Moon" Easter egg with animated starfield canvas. */
export function MoonOverlay({ open, onClose }: MoonOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!open) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx    = canvas.getContext('2d')!
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight

    const stars = Array.from({ length: 350 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.6 + 0.2,
      speed: Math.random() * 0.004 + 0.001,
      op: Math.random() * 0.8 + 0.1,
      phase: Math.random() * Math.PI * 2,
      freq:  Math.random() * 0.02 + 0.005,
    }))

    const SYMBOLS = [
      { sym: '₿', x: 0.15, y: 1.1, speed: 0.002, col: '#f7931a' },
      { sym: 'Ξ', x: 0.37, y: 1.1, speed: 0.0025, col: '#627eea' },
      { sym: '◎', x: 0.63, y: 1.1, speed: 0.0018, col: '#9945ff' },
      { sym: '⬡', x: 0.85, y: 1.1, speed: 0.0022, col: '#00d4ff' },
    ].map(s => ({ ...s, opacity: 0, drift: (Math.random() - 0.5) * 0.001 }))

    let frame = 0
    let rafId: number

    const draw = () => {
      frame++
      ctx.fillStyle = `rgba(0,0,8,${frame < 10 ? 1 : 0.12})`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      stars.forEach(s => {
        s.y -= s.speed
        if (s.y < -0.01) { s.y = 1.01; s.x = Math.random() }
        const tw = 0.5 + 0.5 * Math.sin(frame * s.freq + s.phase)
        ctx.fillStyle = `rgba(255,255,255,${s.op * tw})`
        ctx.beginPath()
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2)
        ctx.fill()
      })

      SYMBOLS.forEach(sym => {
        sym.y -= sym.speed
        sym.x += sym.drift
        if (sym.opacity < 0.5) sym.opacity += 0.005
        if (sym.y < -0.1) { sym.y = 1.1; sym.opacity = 0 }
        const bob = Math.sin(frame * 0.03) * 6
        ctx.font      = 'bold 32px serif'
        ctx.fillStyle = sym.col + Math.round(sym.opacity * 255).toString(16).padStart(2, '0')
        ctx.textAlign = 'center'
        ctx.fillText(sym.sym, sym.x * canvas.width, sym.y * canvas.height + bob)
      })

      rafId = requestAnimationFrame(draw)
    }
    draw()

    return () => cancelAnimationFrame(rafId)
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="moon"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{    opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9000] bg-[#00000a] flex flex-col items-center justify-center cursor-pointer"
          onClick={onClose}
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

          {/* Rocket */}
          <motion.div
            className="absolute text-[80px] left-1/2 -translate-x-1/2 z-10 select-none"
            style={{ filter: 'drop-shadow(0 0 30px rgba(255,180,40,0.9))' }}
            initial={{ bottom: -100, opacity: 0, rotate: -45 }}
            animate={{ bottom: '110%', opacity: [0, 1, 1, 0] }}
            transition={{ duration: 4.5, ease: [0.19, 1, 0.22, 1] }}
          >
            🚀
          </motion.div>

          {/* Text */}
          <motion.div
            className="relative z-20 text-center select-none"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1,  scale: 1,    y: 0  }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          >
            <motion.div
              className="text-7xl mb-4"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
            >
              🌕
            </motion.div>
            <h2 className="text-[clamp(42px,7vw,88px)] font-black tracking-[-3px] leading-none mb-3 bg-gradient-to-br from-yellow-300 via-orange-400 to-rose-500 bg-clip-text text-transparent">
              TO THE MOON
            </h2>
            <p className="text-lg text-[#86868b] italic">number go up technology, ser</p>
          </motion.div>

          <p className="absolute bottom-7 text-[11px] text-[#3a3a4a] tracking-[2px] uppercase animate-pulse">
            click anywhere to close
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
