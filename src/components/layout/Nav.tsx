'use client'

import { useEffect, useState } from 'react'
import { useTheme }            from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { cn }                  from '@/lib/utils/cn'

const NAV_LINKS = [
  { label: 'About',      href: '#about'      },
  { label: 'Expertise',  href: '#expertise'  },
  { label: 'Work',       href: '#problems'   },
  { label: 'Playbook',   href: '#playbook'   },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',   href: '#contact'    },
] as const

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted]       = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="w-9 h-9" />

  const isDark = resolvedTheme !== 'light'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="w-9 h-9 rounded-xl flex items-center justify-center border border-[var(--card-border)] bg-[var(--nav-btn)] hover:bg-[var(--nav-btn-hover)] text-muted hover:text-foreground transition-all duration-200"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
          animate={{ rotate: 0,   opacity: 1, scale: 1   }}
          exit={{    rotate:  30, opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.2 }}
          className="text-[15px]"
        >
          {isDark ? '🌙' : '☀️'}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

export function Nav() {
  const [scrolled,  setScrolled]  = useState(false)
  const [active,    setActive]    = useState('')
  const [menuOpen,  setMenuOpen]  = useState(false)

  // Scroll detection for glass blur on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.slice(1))
    const observers = ids.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.3 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(obs => obs?.disconnect())
  }, [])

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-[1000] transition-all duration-300',
      scrolled
        ? 'border-b border-white/[0.07] bg-background/80 backdrop-blur-xl'
        : 'bg-transparent',
    )}>
      <nav className="max-w-6xl mx-auto px-6 h-[64px] flex items-center justify-between gap-8">

        {/* Logo */}
        <a href="#hero" className="font-black text-[17px] tracking-tight text-foreground hover:text-accent transition-colors duration-200">
          AR<span className="text-accent">.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => {
            const id = link.href.slice(1)
            return (
              <li key={id}>
                <a href={link.href}
                  className={cn(
                    'relative px-3.5 py-1.5 rounded-lg text-[13.5px] font-medium transition-colors duration-200',
                    active === id
                      ? 'text-foreground'
                      : 'text-muted hover:text-foreground',
                  )}
                >
                  {active === id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-[var(--nav-active)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              </li>
            )
          })}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center border border-[var(--card-border)] bg-[var(--nav-btn)] text-muted"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span className="text-[15px]">{menuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0  }}
            exit={{    opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden border-t border-white/[0.07] bg-background/95 backdrop-blur-xl px-6 pb-6 pt-4"
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <a href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2.5 rounded-xl text-[15px] font-medium text-muted hover:text-foreground hover:bg-[var(--card-bg-hover)] transition-all duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
