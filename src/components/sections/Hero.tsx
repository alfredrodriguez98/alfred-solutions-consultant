'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useParticleSphere } from '@/hooks/useParticleCanvas'
import { useEasterEggs }     from '@/components/easter-eggs/EasterEggProvider'
import { GradientText }      from '@/components/ui/GradientText'
import { Button }            from '@/components/ui/Button'

const FADE_UP = (delay: number) => ({
  initial:    { opacity: 0, y: 32 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.9, delay, ease: [0.19, 1, 0.22, 1] },
})

const SECTION_ID = 'hero'

export function Hero() {
  const canvasRef            = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme }    = useTheme()
  const { showBlockMined, showGenesis } = useEasterEggs()

  // 3-D sphere
  useParticleSphere(canvasRef, { isDark: resolvedTheme !== 'light' })

  // Sphere click counter → Block Mined easter egg
  const clicksRef = useRef(0)
  const clearRef  = useRef<ReturnType<typeof setTimeout>>()
  const handleSphereClick = () => {
    clicksRef.current += 1
    clearTimeout(clearRef.current)
    clearRef.current = setTimeout(() => { clicksRef.current = 0 }, 3000)
    if (clicksRef.current >= 5) { clicksRef.current = 0; showBlockMined() }
  }

  // Quote hover → Genesis quote easter egg
  const [genesisTimer, setGenesisTimer] = useState<ReturnType<typeof setTimeout>>()
  const handleQuoteEnter = () => setGenesisTimer(setTimeout(showGenesis, 2500))
  const handleQuoteLeave = () => clearTimeout(genesisTimer)

  return (
    <section id={SECTION_ID} className="relative min-h-svh flex flex-col items-center justify-center text-center px-6 pb-20 pt-[120px] overflow-hidden">
      {/* Particle sphere canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-70 cursor-pointer"
        onClick={handleSphereClick}
      />

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(79,142,247,0.1) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 75% 70%, rgba(124,111,247,0.08) 0%, transparent 60%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[880px]">
        <motion.div {...FADE_UP(0.3)}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full text-[12px] font-bold tracking-[1.5px] uppercase text-accent border border-[var(--card-border)] bg-[var(--nav-btn)] backdrop-blur-xl"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Senior Solutions Engineer &nbsp;·&nbsp; BitGo
        </motion.div>

        <motion.h1 {...FADE_UP(0.5)} className="text-[clamp(60px,9vw,104px)] font-extrabold tracking-[-4px] leading-[0.95] mb-6">
          <span className="block">Alfred</span>
          <GradientText>Rodriguez</GradientText>
        </motion.h1>

        <motion.p {...FADE_UP(0.65)} className="text-[clamp(17px,2vw,22px)] text-muted mb-10 tracking-tight">
          Bridging <strong className="text-foreground font-semibold">institutional finance</strong> and{' '}
          <strong className="text-foreground font-semibold">digital asset infrastructure</strong>
        </motion.p>

        {/* Quote */}
        <motion.div {...FADE_UP(0.8)}
          className="max-w-[620px] mx-auto mb-14"
          onMouseEnter={handleQuoteEnter}
          onMouseLeave={handleQuoteLeave}
        >
          <div className="flex items-center gap-5 mb-3">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
            <span className="text-accent text-4xl font-serif opacity-70">"</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
          </div>
          <p className="text-[clamp(17px,2vw,21px)] font-medium italic text-muted tracking-tight leading-relaxed">
            Crypto is already{' '}
            <em className="not-italic text-foreground font-semibold">complicated enough.</em>
            <br />
            The path to it shouldn't be.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div {...FADE_UP(0.95)} className="flex gap-3.5 items-center justify-center flex-wrap">
          <Button href="#problems" variant="primary">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L14 8L8 14M2 8H14" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            View My Work
          </Button>
          <Button href="#contact" variant="secondary">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4h12v8a1 1 0 01-1 1H3a1 1 0 01-1-1V4zm0 0l6 5 6-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Let's Connect
          </Button>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5"
      >
        <div className="w-[22px] h-9 rounded-full border border-accent/40 flex justify-center pt-1.5">
          <motion.div
            className="w-[3px] h-2 rounded-full bg-accent"
            animate={{ y: [0, 10, 0], opacity: [1, 0, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: [0.83, 0, 0.17, 1] }}
          />
        </div>
        <span className="text-[10px] tracking-[2.5px] uppercase text-muted/60">Scroll</span>
      </motion.div>
    </section>
  )
}
