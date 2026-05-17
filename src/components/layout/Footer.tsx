'use client'

import { ArrowUp }        from 'lucide-react'
import { cn }             from '@/lib/utils/cn'
import { useBlockTicker } from '@/hooks/useBlockTicker'

const YEAR = new Date().getFullYear()

export function Footer() {
  const { display, flash } = useBlockTicker()

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="border-t border-[var(--strip-border)] py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Left — branding */}
        <div className="flex items-center gap-4 text-[12.5px] text-muted">
          <span className="font-black text-[15px] text-foreground">AR<span className="text-accent">.</span></span>
          <span className="opacity-30">·</span>
          <span>© {YEAR} Alfred Rodriguez</span>
          <span className="opacity-30">·</span>
          <span className="opacity-60">Built with Next.js</span>
        </div>

        {/* Center — live block ticker */}
        <div className="flex items-center gap-2 font-mono text-[11.5px]">
          <span className={cn(
            'w-1.5 h-1.5 rounded-full transition-colors duration-300',
            flash ? 'bg-emerald-400' : 'bg-accent/50',
          )} />
          <span
            suppressHydrationWarning
            className={cn(
              'transition-colors duration-300',
              flash ? 'text-emerald-400' : 'text-muted',
            )}
          >
            ETH #{display}
          </span>
          <span className="text-muted/30 text-[10px]">live</span>
        </div>

        {/* Right — scroll to top */}
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="flex items-center gap-2 text-[12.5px] text-muted hover:text-foreground transition-colors duration-150 active:scale-95 group"
        >
          <span>Back to top</span>
          <span className="w-6 h-6 rounded-lg border border-[var(--card-border)] flex items-center justify-center group-hover:border-accent/30 group-hover:text-accent transition-all duration-150">
            <ArrowUp size={12} />
          </span>
        </button>

      </div>
    </footer>
  )
}
