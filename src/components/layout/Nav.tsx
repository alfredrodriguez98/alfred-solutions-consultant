'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme }            from 'next-themes'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Sun, Moon, Menu, X }  from 'lucide-react'
import { cn }                  from '@/lib/utils/cn'

const NAV_LINKS = [
  { label: 'About',      href: '#about'      },
  { label: 'Expertise',  href: '#expertise'  },
  { label: 'Work',       href: '#problems'   },
  { label: 'Playbook',   href: '#playbook'   },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact'    },
] as const

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted]       = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="w-8 h-8" />

  const isDark = resolvedTheme !== 'light'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-foreground transition-colors duration-150 active:scale-95 press-feedback"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={{ rotate: -20, opacity: 0, scale: 0.8 }}
          animate={{ rotate: 0,   opacity: 1, scale: 1   }}
          exit={{    rotate:  20, opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
          className="flex"
        >
          {isDark ? <Moon size={16} /> : <Sun size={16} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0%' }}
      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-accent via-accent-violet to-accent-purple"
    />
  )
}

export function Nav() {
  const [scrolled,  setScrolled]  = useState(false)
  const [active,    setActive]    = useState('')
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.slice(1))
    const observers = ids.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.25 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(obs => obs?.disconnect())
  }, [])

  // Close mobile menu on scroll
  useEffect(() => {
    if (!menuOpen) return
    const onScroll = () => setMenuOpen(false)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [menuOpen])

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-[1000] transition-all duration-300',
      scrolled
        ? 'border-b border-[var(--card-border)] bg-[var(--bg)]/85 backdrop-blur-2xl'
        : 'bg-transparent',
    )}>
      <nav className="max-w-6xl mx-auto px-5 h-[60px] flex items-center justify-between gap-6">

        {/* Logo */}
        <a
          href="#hero"
          className="font-black text-[16px] tracking-tight text-foreground hover:text-accent transition-colors duration-150 shrink-0"
        >
          AR<span className="text-accent">.</span>
        </a>

        {/* Desktop links — floating pill */}
        <ul className="hidden md:flex items-center gap-0.5 p-1 rounded-full bg-[var(--nav-btn)] border border-[var(--card-border)]">
          {NAV_LINKS.map(link => {
            const id = link.href.slice(1)
            return (
              <li key={id}>
                <a
                  href={link.href}
                  className={cn(
                    'relative px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-colors duration-150',
                    active === id
                      ? 'text-foreground'
                      : 'text-muted hover:text-foreground',
                  )}
                >
                  {active === id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-[var(--bg)] shadow-sm border border-[var(--card-border)]"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              </li>
            )
          })}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-2 shrink-0">
          <ThemeToggle />

          {/* Hire me — subtle pill CTA */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12.5px] font-semibold bg-accent/10 text-accent border border-accent/20 hover:bg-accent hover:text-white transition-all duration-200 active:scale-[0.97] press-feedback"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse2" />
            Hire me
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-foreground transition-colors duration-150 active:scale-95"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? 'close' : 'open'}
                initial={{ rotate: -10, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0,    opacity: 1, scale: 1   }}
                exit={{    rotate:  10,  opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="flex"
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Scroll progress line */}
      <ScrollProgress />

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="md:hidden mx-3 mb-3 rounded-2xl border border-[var(--card-border)] bg-[var(--bg)]/95 backdrop-blur-2xl overflow-hidden shadow-glass"
          >
            <ul className="flex flex-col p-2">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0  }}
                  transition={{ delay: i * 0.04, duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center px-4 py-3 rounded-xl text-[15px] font-medium text-muted hover:text-foreground hover:bg-[var(--card-bg-hover)] transition-colors duration-150 active:scale-[0.98]"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <li className="pt-1 border-t border-[var(--card-border)] mt-1">
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-[15px] font-semibold text-accent hover:bg-accent/10 transition-colors duration-150"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse2" />
                  Get in touch
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
