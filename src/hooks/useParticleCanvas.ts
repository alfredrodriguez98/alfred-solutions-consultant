'use client'

import { useEffect, useRef } from 'react'

type RGB  = [number, number, number]
type Vec3 = [number, number, number]

interface SphereConfig {
  count?: number
  isDark: boolean
}

// ─── Geometry helpers ─────────────────────────────────────────────────────────

function buildFibonacciSphere(n: number): Vec3[] {
  const golden = (1 + Math.sqrt(5)) / 2
  return Array.from({ length: n }, (_, i) => {
    const theta = 2 * Math.PI * i / golden
    const phi   = Math.acos(1 - 2 * (i + 0.5) / n)
    return [
      Math.sin(phi) * Math.cos(theta),
      Math.sin(phi) * Math.sin(theta),
      Math.cos(phi),
    ] as Vec3
  })
}

/** Convert geographic lat/lon (degrees) to a unit sphere Vec3. */
function latLonToVec(lat: number, lon: number): Vec3 {
  const phi   = (90 - lat) * Math.PI / 180
  const theta = lon        * Math.PI / 180
  return [
    Math.sin(phi) * Math.cos(theta),
    Math.cos(phi),
    Math.sin(phi) * Math.sin(theta),
  ]
}

/** Spherical linear interpolation between two unit vectors. */
function vecSlerp(a: Vec3, b: Vec3, t: number): Vec3 {
  const dot = Math.max(-1, Math.min(1, a[0]*b[0] + a[1]*b[1] + a[2]*b[2]))
  if (Math.abs(dot) > 0.9999) {
    return [a[0]*(1-t)+b[0]*t, a[1]*(1-t)+b[1]*t, a[2]*(1-t)+b[2]*t]
  }
  const angle    = Math.acos(dot)
  const sinAngle = Math.sin(angle)
  const ta = Math.sin((1 - t) * angle) / sinAngle
  const tb = Math.sin(t       * angle) / sinAngle
  return [a[0]*ta+b[0]*tb, a[1]*ta+b[1]*tb, a[2]*ta+b[2]*tb]
}

/**
 * Returns a point along a great-circle arc between two hub nodes,
 * lifted above the sphere surface at the midpoint to create a visible arc.
 */
function arcPoint(from: Vec3, to: Vec3, t: number, lift = 0.24): Vec3 {
  const base  = vecSlerp(from, to, t)
  const scale = 1 + Math.sin(t * Math.PI) * lift
  return [base[0]*scale, base[1]*scale, base[2]*scale]
}

/** Apply Y-then-X rotation to a Vec3 and return the rotated Vec3. */
function rotVec(v: Vec3, rotX: number, rotY: number): Vec3 {
  let [x, y, z] = v
  const cY = Math.cos(rotY), sY = Math.sin(rotY)
  ;[x, z] = [x*cY + z*sY, -x*sY + z*cY]
  const cX = Math.cos(rotX), sX = Math.sin(rotX)
  ;[y, z] = [y*cX - z*sX,   y*sX + z*cX]
  return [x, y, z]
}

// ─── Financial hub city positions ─────────────────────────────────────────────

const HUB_COORDS: [number, number][] = [
  [ 40.71,  -74.00],  // New York
  [ 51.51,   -0.13],  // London
  [  1.35,  103.82],  // Singapore
  [ 35.68,  139.69],  // Tokyo
  [ 19.08,   72.88],  // Mumbai
  [ 25.20,   55.27],  // Dubai
  [ 22.32,  114.17],  // Hong Kong
  [ 37.77, -122.42],  // San Francisco
  [-33.87,  151.21],  // Sydney
  [ 48.86,    2.35],  // Paris
  [ 55.75,   37.62],  // Moscow
  [-23.55,  -46.63],  // São Paulo
]
const HUBS: Vec3[] = HUB_COORDS.map(([lat, lon]) => latLonToVec(lat, lon))

// ─── Transaction palette ───────────────────────────────────────────────────────

const TXN_COLORS: RGB[] = [
  [255, 200,  50],  // gold
  [  0, 229, 160],  // emerald
  [  0, 212, 255],  // cyan
  [167, 139, 250],  // violet
  [255, 255, 255],  // white
]

// ─── Main hook ────────────────────────────────────────────────────────────────

/** Attaches and runs the enhanced 3-D rotating globe on a canvas ref. */
export function useParticleSphere(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  { count = 180, isDark }: SphereConfig,
) {
  const mouseRef = useRef({ nx: 0, ny: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    // Brand colours
    const C1: RGB = isDark ? [79, 142, 247]  : [0, 113, 227]
    const C2: RGB = isDark ? [124, 111, 247] : [94,  62, 247]

    // Point cloud
    const particles = buildFibonacciSphere(count)

    // Rotation state
    let rotX    = 0.40
    let rotY    = 0.00
    let tgtRotX = 0.40
    let speedY  = 0.0028
    let rafId: number

    // ── Transaction system ──────────────────────────────────────────────────
    interface Txn {
      from: number; to: number
      t: number; speed: number
      color: RGB
      pulse: number   // countdown frames after arrival for ring effect
    }
    const txns: Txn[] = []

    const spawn = () => {
      if (txns.length >= 7) return
      let f = Math.floor(Math.random() * HUBS.length)
      let to = Math.floor(Math.random() * HUBS.length)
      while (to === f) to = Math.floor(Math.random() * HUBS.length)
      txns.push({
        from: f, to, t: 0,
        speed: 0.0038 + Math.random() * 0.003,
        color: TXN_COLORS[Math.floor(Math.random() * TXN_COLORS.length)],
        pulse: 0,
      })
    }
    for (let i = 0; i < 5; i++) spawn()

    // ── Resize ───────────────────────────────────────────────────────────────
    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()

    // ── Mouse ────────────────────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const nx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)
      const ny = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2)
      mouseRef.current = { nx, ny }
      tgtRotX = 0.40 + ny * 0.50
      // Mouse X shifts auto-spin: right of centre slows/reverses, left speeds up
      speedY  = 0.0028 - nx * 0.006
    }
    const onLeave = () => { tgtRotX = 0.40; speedY = 0.0028 }
    window.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)

    // ── Projection helper ────────────────────────────────────────────────────
    const proj = (v: Vec3) => {
      const R  = Math.min(canvas.width, canvas.height) * 0.30
      const cx = canvas.width  / 2
      const cy = canvas.height / 2
      const [x, y, z] = rotVec(v, rotX, rotY)
      return { sx: cx + x*R, sy: cy + y*R, z, d: (z+1)/2, R, cx, cy }
    }

    // ─────────────────────────────────────────────────────────────────────────
    let frame = 0

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frame++

      // Smooth interpolation
      rotX += (tgtRotX - rotX) * 0.05
      rotY += speedY

      const R  = Math.min(canvas.width, canvas.height) * 0.30
      const cx = canvas.width  / 2
      const cy = canvas.height / 2

      // ── Atmosphere ──────────────────────────────────────────────────────────
      // Outer diffuse glow
      const atm = ctx.createRadialGradient(cx, cy - R*0.05, R*0.65, cx, cy, R*1.55)
      atm.addColorStop(0,    `rgba(${C1[0]},${C1[1]},${C1[2]},0)`)
      atm.addColorStop(0.70, `rgba(${C1[0]},${C1[1]},${C1[2]},0.05)`)
      atm.addColorStop(1,    `rgba(${C1[0]},${C1[1]},${C1[2]},0)`)
      ctx.fillStyle = atm
      ctx.beginPath(); ctx.arc(cx, cy, R*1.55, 0, Math.PI*2); ctx.fill()

      // Limb brightening rim
      const rim = ctx.createRadialGradient(cx, cy, R*0.60, cx, cy, R*1.04)
      rim.addColorStop(0,    'rgba(0,0,0,0)')
      rim.addColorStop(0.82, `rgba(${C1[0]},${C1[1]},${C1[2]},0)`)
      rim.addColorStop(1,    `rgba(${C1[0]},${C1[1]},${C1[2]},0.20)`)
      ctx.fillStyle = rim
      ctx.beginPath(); ctx.arc(cx, cy, R*1.04, 0, Math.PI*2); ctx.fill()

      // ── Latitude / longitude grid ────────────────────────────────────────────
      ctx.lineWidth = 0.4

      // Meridians (every 30°)
      for (let lon = 0; lon < 360; lon += 30) {
        let open = false
        ctx.beginPath()
        ctx.strokeStyle = `rgba(${C1[0]},${C1[1]},${C1[2]},0.09)`
        for (let lat = -85; lat <= 85; lat += 5) {
          const [x, y, z] = rotVec(latLonToVec(lat, lon), rotX, rotY)
          if (z > 0) {
            const sx = cx + x*R, sy = cy + y*R
            if (!open) { ctx.moveTo(sx, sy); open = true }
            else        ctx.lineTo(sx, sy)
          } else {
            if (open) { ctx.stroke(); ctx.beginPath(); ctx.strokeStyle = `rgba(${C1[0]},${C1[1]},${C1[2]},0.09)`; open = false }
          }
        }
        if (open) ctx.stroke()
      }

      // Parallels (every 30°)
      for (let lat = -60; lat <= 60; lat += 30) {
        let open = false
        ctx.beginPath()
        ctx.strokeStyle = `rgba(${C1[0]},${C1[1]},${C1[2]},0.07)`
        for (let lon = 0; lon <= 364; lon += 5) {
          const [x, y, z] = rotVec(latLonToVec(lat, lon % 360), rotX, rotY)
          if (z > 0) {
            const sx = cx + x*R, sy = cy + y*R
            if (!open) { ctx.moveTo(sx, sy); open = true }
            else        ctx.lineTo(sx, sy)
          } else {
            if (open) { ctx.stroke(); ctx.beginPath(); ctx.strokeStyle = `rgba(${C1[0]},${C1[1]},${C1[2]},0.07)`; open = false }
          }
        }
        if (open) ctx.stroke()
      }

      // ── Point cloud connections ──────────────────────────────────────────────
      const pts = particles.map(v => {
        const [x, y, z] = rotVec(v, rotX, rotY)
        return { sx: cx + x*R, sy: cy + y*R, z, d: (z+1)/2 }
      })

      ctx.lineWidth = 0.5
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = particles[i][0] - particles[j][0]
          const dy = particles[i][1] - particles[j][1]
          const dz = particles[i][2] - particles[j][2]
          const dist = Math.sqrt(dx*dx + dy*dy + dz*dz)
          if (dist < 0.50) {
            const pi = pts[i], pj = pts[j]
            if (pi.z < 0 && pj.z < 0) continue
            const avg = (pi.d + pj.d) / 2
            const a   = (1 - dist / 0.50) * avg * 0.15
            const cr  = Math.round(C1[0] + (C2[0]-C1[0])*avg)
            const cg  = Math.round(C1[1] + (C2[1]-C1[1])*avg)
            const cb  = Math.round(C1[2] + (C2[2]-C1[2])*avg)
            ctx.strokeStyle = `rgba(${cr},${cg},${cb},${a})`
            ctx.beginPath()
            ctx.moveTo(pi.sx, pi.sy)
            ctx.lineTo(pj.sx, pj.sy)
            ctx.stroke()
          }
        }
      }

      // ── Point cloud dots (back → front) ─────────────────────────────────────
      const sorted = [...pts].sort((a, b) => a.d - b.d)
      sorted.forEach(p => {
        if (p.z < -0.15) return
        const sz = p.d * 1.9 + 0.3
        const a  = p.d * 0.75 + 0.05
        const cr = Math.round(C1[0] + (C2[0]-C1[0])*p.d)
        const cg = Math.round(C1[1] + (C2[1]-C1[1])*p.d)
        const cb = Math.round(C1[2] + (C2[2]-C1[2])*p.d)

        const grd = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, sz*2.4)
        grd.addColorStop(0, `rgba(${cr},${cg},${cb},${a*0.28})`)
        grd.addColorStop(1, `rgba(${cr},${cg},${cb},0)`)
        ctx.fillStyle = grd
        ctx.beginPath(); ctx.arc(p.sx, p.sy, sz*2.4, 0, Math.PI*2); ctx.fill()

        ctx.fillStyle = `rgba(${cr+40},${cg+40},${cb+40},${a})`
        ctx.beginPath(); ctx.arc(p.sx, p.sy, sz*0.55, 0, Math.PI*2); ctx.fill()
      })

      // ── Financial hub nodes ──────────────────────────────────────────────────
      HUBS.forEach((hub, hi) => {
        const [x, y, z] = rotVec(hub, rotX, rotY)
        if (z < 0) return
        const d  = (z+1)/2
        const sx = cx + x*R, sy = cy + y*R

        // Outer pulsing halo
        const pulse = 0.65 + 0.35 * Math.sin(frame * 0.022 + hi * 0.65)
        const hR = 15 * pulse * d
        const halo = ctx.createRadialGradient(sx, sy, 0, sx, sy, hR)
        halo.addColorStop(0, `rgba(${C1[0]},${C1[1]},${C1[2]},${0.32*d})`)
        halo.addColorStop(1, `rgba(${C1[0]},${C1[1]},${C1[2]},0)`)
        ctx.fillStyle = halo
        ctx.beginPath(); ctx.arc(sx, sy, hR, 0, Math.PI*2); ctx.fill()

        // White outer ring
        ctx.strokeStyle = `rgba(255,255,255,${0.45*d})`
        ctx.lineWidth = 0.8
        ctx.beginPath(); ctx.arc(sx, sy, 3.2*d, 0, Math.PI*2); ctx.stroke()

        // White core dot
        ctx.fillStyle = `rgba(255,255,255,${0.92*d})`
        ctx.beginPath(); ctx.arc(sx, sy, 2.0*d, 0, Math.PI*2); ctx.fill()

        // Accent inner fill
        ctx.fillStyle = `rgba(${C1[0]},${C1[1]},${C1[2]},${d})`
        ctx.beginPath(); ctx.arc(sx, sy, 1.1*d, 0, Math.PI*2); ctx.fill()
      })

      // ── Transactions ─────────────────────────────────────────────────────────
      for (let i = txns.length - 1; i >= 0; i--) {
        const tx = txns[i]
        const [r, g, b] = tx.color
        const fromHub = HUBS[tx.from]
        const toHub   = HUBS[tx.to]

        // ── Arrival pulse ring ──
        if (tx.pulse > 0) {
          const [hx, hy, hz] = rotVec(toHub, rotX, rotY)
          if (hz > 0) {
            const psx = cx + hx*R, psy = cy + hy*R
            const prog  = 1 - tx.pulse / 38
            const ringR = prog * 24
            const alpha = (1 - prog) * 0.9
            ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`
            ctx.lineWidth = 1.8
            ctx.beginPath(); ctx.arc(psx, psy, ringR, 0, Math.PI*2); ctx.stroke()
            // Second ring, slightly offset
            const ringR2 = prog * 15
            const alpha2 = (1 - prog) * 0.5
            ctx.strokeStyle = `rgba(${r},${g},${b},${alpha2})`
            ctx.lineWidth = 1.0
            ctx.beginPath(); ctx.arc(psx, psy, ringR2, 0, Math.PI*2); ctx.stroke()
          }
          tx.pulse--
          if (tx.pulse <= 0) { txns.splice(i, 1); spawn() }
          continue
        }

        // ── Trail ──
        const TRAIL = 22
        const STEP  = 0.016
        for (let ti = 1; ti <= TRAIL; ti++) {
          const tVal = tx.t - ti * STEP
          if (tVal < 0) break
          const ap  = arcPoint(fromHub, toHub, tVal)
          const [ax, ay, az] = rotVec(ap, rotX, rotY)
          if (az < 0) continue
          const psx = cx + ax*R, psy = cy + ay*R
          const d   = (az+1)/2
          const ta  = ((TRAIL - ti) / TRAIL) * 0.60 * d
          const tr  = Math.max(0.5, (1 - ti/TRAIL) * 2.8)
          ctx.fillStyle = `rgba(${r},${g},${b},${ta})`
          ctx.beginPath(); ctx.arc(psx, psy, tr, 0, Math.PI*2); ctx.fill()
        }

        // ── Head ──
        if (tx.t <= 1) {
          const ap  = arcPoint(fromHub, toHub, tx.t)
          const [hx, hy, hz] = rotVec(ap, rotX, rotY)
          if (hz > 0) {
            const psx = cx + hx*R, psy = cy + hy*R
            const d   = (hz+1)/2

            // Outer glow bloom
            const glowR = 13 * d
            const glow  = ctx.createRadialGradient(psx, psy, 0, psx, psy, glowR)
            glow.addColorStop(0,    `rgba(${r},${g},${b},${0.90*d})`)
            glow.addColorStop(0.35, `rgba(${r},${g},${b},${0.38*d})`)
            glow.addColorStop(1,    `rgba(${r},${g},${b},0)`)
            ctx.fillStyle = glow
            ctx.beginPath(); ctx.arc(psx, psy, glowR, 0, Math.PI*2); ctx.fill()

            // Bright white core
            ctx.fillStyle = `rgba(255,255,255,${0.97*d})`
            ctx.beginPath(); ctx.arc(psx, psy, 2.8*d, 0, Math.PI*2); ctx.fill()

            // Accent inner
            ctx.fillStyle = `rgba(${r},${g},${b},${0.85*d})`
            ctx.beginPath(); ctx.arc(psx, psy, 1.4*d, 0, Math.PI*2); ctx.fill()
          }
        }

        // Advance
        tx.t += tx.speed
        if (tx.t >= 1) { tx.t = 1; tx.pulse = 38 }
      }

      // Periodically spawn fresh transactions
      if (frame % 95 === 0) spawn()

      rafId = requestAnimationFrame(draw)
    }

    draw()
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [canvasRef, count, isDark])
}

// ─── Floating particle field (for Case Studies background) ────────────────────

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
