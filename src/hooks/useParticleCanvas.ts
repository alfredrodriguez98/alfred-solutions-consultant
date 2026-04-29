'use client'

import { useEffect, useRef } from 'react'

type RGB = [number, number, number]

interface SphereConfig {
  count?: number
  isDark: boolean
}

// Build points on a sphere surface using the Fibonacci lattice
function buildFibonacciSphere(n: number): number[][] {
  const golden = (1 + Math.sqrt(5)) / 2
  return Array.from({ length: n }, (_, i) => {
    const theta = 2 * Math.PI * i / golden
    const phi   = Math.acos(1 - 2 * (i + 0.5) / n)
    return [
      Math.sin(phi) * Math.cos(theta),
      Math.sin(phi) * Math.sin(theta),
      Math.cos(phi),
    ]
  })
}

function rotateY(pts: number[][], a: number): number[][] {
  const c = Math.cos(a), s = Math.sin(a)
  return pts.map(([x, y, z]) => [x * c + z * s, y, -x * s + z * c])
}

function rotateX(pts: number[][], a: number): number[][] {
  const c = Math.cos(a), s = Math.sin(a)
  return pts.map(([x, y, z]) => [x, y * c - z * s, y * s + z * c])
}

/** Attaches and runs the 3-D rotating particle sphere on a canvas ref. */
export function useParticleSphere(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  { count = 220, isDark }: SphereConfig,
) {
  const mouseRef = useRef({ rotX: 0.3, rotY: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const c1: RGB = isDark ? [79, 142, 247]  : [0, 113, 227]
    const c2: RGB = isDark ? [124, 111, 247] : [94, 62, 247]

    const particles = buildFibonacciSphere(count)
    let rotX = mouseRef.current.rotX
    let rotY = mouseRef.current.rotY
    let rafId: number

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const nx   = (e.clientX - rect.width / 2)  / rect.width
      const ny   = (e.clientY - rect.height / 2) / rect.height
      mouseRef.current.rotX = 0.3 + ny * 0.4
      mouseRef.current.rotY += nx * 0.01
    }
    window.addEventListener('mousemove', onMouseMove)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      rotX += (mouseRef.current.rotX - rotX) * 0.04
      rotY += 0.003

      const radius = Math.min(canvas.width, canvas.height) * 0.30
      const cx = canvas.width / 2, cy = canvas.height / 2

      let pts = rotateY(particles, rotY)
      pts     = rotateX(pts, rotX)

      const projected = pts.map(([x, y, z]) => ({
        sx:    cx + x * radius,
        sy:    cy + y * radius,
        depth: (z + 1) / 2,
      }))

      // Connections (distance in pre-rotation space using original particles)
      ctx.lineWidth = 0.6
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = particles[i][0] - particles[j][0]
          const dy = particles[i][1] - particles[j][1]
          const dz = particles[i][2] - particles[j][2]
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
          if (dist < 0.52) {
            const avg   = (projected[i].depth + projected[j].depth) / 2
            const alpha = (1 - dist / 0.52) * avg * 0.22
            const r = Math.round(c1[0] + (c2[0] - c1[0]) * avg)
            const g = Math.round(c1[1] + (c2[1] - c1[1]) * avg)
            const b = Math.round(c1[2] + (c2[2] - c1[2]) * avg)
            ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`
            ctx.beginPath()
            ctx.moveTo(projected[i].sx, projected[i].sy)
            ctx.lineTo(projected[j].sx, projected[j].sy)
            ctx.stroke()
          }
        }
      }

      // Dots (back-to-front)
      const sorted = [...projected].sort((a, b) => a.depth - b.depth)
      sorted.forEach(p => {
        const size  = p.depth * 2.5 + 0.4
        const alpha = p.depth * 0.85 + 0.1
        const r = Math.round(c1[0] + (c2[0] - c1[0]) * p.depth)
        const g = Math.round(c1[1] + (c2[1] - c1[1]) * p.depth)
        const b = Math.round(c1[2] + (c2[2] - c1[2]) * p.depth)

        const grd = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, size * 3)
        grd.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.3})`)
        grd.addColorStop(1, `rgba(${r},${g},${b},0)`)
        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.arc(p.sx, p.sy, size * 3, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = `rgba(${r + 60},${g + 60},${b + 60},${alpha})`
        ctx.beginPath()
        ctx.arc(p.sx, p.sy, size * 0.7, 0, Math.PI * 2)
        ctx.fill()
      })

      rafId = requestAnimationFrame(draw)
    }

    draw()
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', resize)
    }
  }, [canvasRef, count, isDark])
}

// ─── Floating particle field (for Case Studies background) ────────────────

interface Particle {
  x: number; y: number; r: number
  speed: number; drift: number; opacity: number
  phase: number; freq: number; col: RGB
  pulseSpeed: number; pulsePhase: number
}

const PARTICLE_PALETTE: RGB[] = [
  [0, 212, 255], [79, 142, 247], [124, 111, 247], [181, 123, 255], [0, 229, 160],
]

function buildParticle(): Particle {
  const col = PARTICLE_PALETTE[Math.floor(Math.random() * PARTICLE_PALETTE.length)]
  return {
    x: Math.random(), y: Math.random(),
    r: Math.random() * 1.8 + 0.4,
    speed: Math.random() * 0.00012 + 0.00004,
    drift: (Math.random() - 0.5) * 0.00006,
    opacity: Math.random() * 0.5 + 0.15,
    phase: Math.random() * Math.PI * 2,
    freq:  Math.random() * 0.008 + 0.003,
    col,
    pulseSpeed: Math.random() * 0.02 + 0.008,
    pulsePhase: Math.random() * Math.PI * 2,
  }
}

/** Attaches and runs a floating particle field on a canvas ref. */
export function useParticleField(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  { count = 110 }: { count?: number } = {},
) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const particles: Particle[] = Array.from({ length: count }, buildParticle)

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let frame = 0
    let rafId: number

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frame++

      particles.forEach(p => {
        p.y -= p.speed
        p.x += p.drift + Math.sin(frame * p.freq + p.phase) * 0.00008
        if (p.y < -0.02) { p.y = 1.02; p.x = Math.random() }
        if (p.x < -0.02) p.x = 1.02
        if (p.x >  1.02) p.x = -0.02

        const pulse = 0.7 + 0.3 * Math.sin(frame * p.pulseSpeed + p.pulsePhase)
        const alpha = p.opacity * pulse
        const [r, g, b] = p.col

        const grd = ctx.createRadialGradient(p.x * canvas.width, p.y * canvas.height, 0, p.x * canvas.width, p.y * canvas.height, p.r * 5)
        grd.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.4})`)
        grd.addColorStop(1, `rgba(${r},${g},${b},0)`)
        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.arc(p.x * canvas.width, p.y * canvas.height, p.r * 5, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`
        ctx.beginPath()
        ctx.arc(p.x * canvas.width, p.y * canvas.height, p.r, 0, Math.PI * 2)
        ctx.fill()
      })

      rafId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [canvasRef, count])
}
