'use client'

import { cn }             from '@/lib/utils/cn'
import { useBlockTicker } from '@/hooks/useBlockTicker'

const YEAR = new Date().getFullYear()

/** Hidden hex secret — only visible on highlight/select. */
const HEX_SECRET = '0x4152' // AR in hex

export function Footer() {
  const { display, flash } = useBlockTicker()

  return (
    <footer className="border-t border-white/[0.05] py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Left — copyright + hidden hex */}
        <div className="flex items-center gap-3 text-[13px] text-muted">
          <span>© {YEAR} Alfred Rodriguez</span>
          <span className="opacity-20">·</span>
          <span
            className="font-mono text-[11px] select-all"
            title="Hex for AR"
            style={{ color: 'transparent', userSelect: 'all' }}
            aria-hidden="true"
          >
            {HEX_SECRET}
          </span>
          <span className="text-[11.5px] italic opacity-60">Built in Next.js · Deployed on Vercel</span>
        </div>

        {/* Right — live block ticker */}
        <div className="flex items-center gap-2.5 font-mono text-[12px]">
          <span className={cn(
            'w-1.5 h-1.5 rounded-full transition-colors duration-300',
            flash ? 'bg-[#00e5a0]' : 'bg-accent/60',
          )} />
          <span className={cn(
            'transition-colors duration-300',
            flash ? 'text-[#00e5a0]' : 'text-muted',
          )}>
            ETH #{display}
          </span>
          <span className="text-muted/40 text-[11px]">live</span>
        </div>

      </div>
    </footer>
  )
}
