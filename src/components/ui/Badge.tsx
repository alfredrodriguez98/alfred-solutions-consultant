import { cn } from '@/lib/utils/cn'
import type { BadgeVariant } from '@/types'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  cyan:   'text-[#00d4ff] bg-[rgba(0,212,255,0.1)]   border-[rgba(0,212,255,0.25)]',
  teal:   'text-[#00e5a0] bg-[rgba(0,229,160,0.1)]   border-[rgba(0,229,160,0.25)]',
  amber:  'text-[#f5a623] bg-[rgba(245,166,35,0.1)]  border-[rgba(245,166,35,0.25)]',
  purple: 'text-[#b57bff] bg-[rgba(181,123,255,0.1)] border-[rgba(181,123,255,0.25)]',
}

/** A coloured category pill used on case-study cards. */
export function Badge({ children, variant = 'cyan', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full',
        'text-[10.5px] font-bold tracking-[1.4px] uppercase border',
        VARIANT_STYLES[variant],
        className,
      )}
    >
      <span className="w-[5px] h-[5px] rounded-full bg-current flex-shrink-0" />
      {children}
    </span>
  )
}
