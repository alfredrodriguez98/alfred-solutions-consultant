'use client'

import { useRef, useState } from 'react'
import { motion }            from 'framer-motion'
import { useTheme }          from 'next-themes'
import { ArrowRight, Mail }  from 'lucide-react'
import { useParticleSphere } from '@/hooks/useParticleCanvas'
import { useEasterEggs }     from '@/components/easter-eggs/EasterEggProvider'
import { GradientText }      from '@/components/ui/GradientText'

const EASE = [0.23, 1, 0.32, 1] as const

const FADE_UP = (delay: number) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.7, delay, ease: EASE },
})

export function Hero() {
  const canvasRef            = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme }    = useTheme()
  const { showBlockMined, showGenesis } = useEasterEggs()

  useParticleSphere(canvasRef, { isDark: resolvedTheme !== 'light' })

  // Sphere click easter egg
  const clicksRef = useRef(0)
  const clearRef  = useRef<ReturnType<typeof setTimeout>>()
  const handleSphereClick = () => {
    clicksRef.current += 1
    clearTimeout(clearRef.current)
    clearRef.current = setTimeout(() => { clicksRef.current = 0 }, 3000)
    if (clicksRef.current >= 5) { clicksRef.current = 0; showBlockMined() }
  }

  // Quote hover easter egg
  const [genesisTimer, setGenesisTimer] = useState<ReturnType<typeof setTimeout>>()
  const handleQuoteEnter = () => setGenesisTimer(setTimeout(showGenesis, 2500))
  const handleQuoteLeave = () => clearTimeout(genesisTimer)

  return (
    <section id="hero" className="relative min-h-svh flex flex-col items-center justify-center text-center px-6 pb-24 pt-[110px] overflow-hidden">

      {/* Particle sphere canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60 cursor-pointer"
        onClick={handleSphereClick}
      />

      {/* Multi-layer ambient glow — rich depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 90% 70% at 50% 30%, rgba(79,142,247,0.12) 0%, transparent 60%)',
            'radial-gradient(ellipse 60% 50% at 80% 70%, rgba(124,111,247,0.08) 0%, transparent 55%)',
            'radial-gradient(ellipse 40% 30% at 20% 80%, rgba(168,85,247,0.07) 0%, transparent 50%)',
          ].join(', '),
        }}
      />

      {/* Subtle mesh grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(var(--foreground) 1px, transparent 1px),
            linear-gradient(90deg, var(--foreground) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[900px] w-full">

        {/* Status badge */}
        <motion.div {...FADE_UP(0.2)}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full text-[11.5px] font-bold tracking-[1.5px] uppercase text-accent border border-accent/20 bg-accent/5 backdrop-blur-xl"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse2" />
          Senior Solutions Engineer &nbsp;·&nbsp; BitGo
        </motion.div>

        {/* Name */}
        <motion.h1
          {...FADE_UP(0.35)}
          className="text-[clamp(58px,8.5vw,100px)] font-black tracking-[-4px] leading-[0.93] mb-5"
        >
          <span className="block">Alfred</span>
          <GradientText>Rodriguez</GradientText>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          {...FADE_UP(0.5)}
          className="text-[clamp(16px,2vw,20px)] text-muted mb-10 tracking-tight max-w-[540px] mx-auto leading-relaxed"
        >
          Bridging{' '}
          <span className="text-foreground font-semibold">institutional finance</span>
          {' '}and{' '}
          <span className="text-foreground font-semibold">digital asset infrastructure</span>
        </motion.p>

        {/* Quote */}
        <motion.div
          {...FADE_UP(0.65)}
          className="max-w-[580px] mx-auto mb-12"
          onMouseEnter={handleQuoteEnter}
          onMouseLeave={handleQuoteLeave}
        >
          <div className="relative px-8 py-5 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-xl">
            <span
              className="absolute -top-3 left-8 text-3xl font-serif text-accent/50 leading-none select-none"
              aria-hidden
            >
              "
            </span>
            <p className="text-[clamp(15px,1.7vw,18px)] font-medium italic text-muted tracking-tight leading-relaxed">
              Crypto is already{' '}
              <em className="not-italic text-foreground font-semibold">complicated enough.</em>
              <br className="hidden sm:block" />
              {' '}The path to it shouldn't be.
            </p>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div {...FADE_UP(0.8)} className="flex gap-3 items-center justify-center flex-wrap">
          <a
            href="#problems"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14.5px] font-semibold bg-gradient-to-br from-accent via-accent-violet to-accent-purple text-white shadow-accent-sm hover:shadow-accent-md hover:opacity-95 transition-all duration-200 active:scale-[0.97] press-feedback"
          >
            View My Work
            <ArrowRight size={15} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14.5px] font-semibold border border-[var(--card-border)] bg-[var(--nav-btn)] text-foreground backdrop-blur-xl hover:bg-[var(--nav-btn-hover)] hover:border-accent/30 transition-all duration-200 active:scale-[0.97] press-feedback"
          >
            <Mail size={15} />
            Let's Connect
          </a>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-[20px] h-8 rounded-full border border-accent/30 flex justify-center pt-1.5">
          <motion.div
            className="w-[2.5px] h-[7px] rounded-full bg-accent/60"
            animate={{ y: [0, 8, 0], opacity: [0.8, 0, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <span className="text-[9.5px] tracking-[2.5px] uppercase text-muted/50 font-medium">Scroll</span>
      </motion.div>
    </section>
  )
}
