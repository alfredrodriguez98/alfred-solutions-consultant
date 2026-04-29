import { cn } from '@/lib/utils/cn'

interface MarqueeProps {
  items: string[]
  className?: string
}

/** Horizontally scrolling ticker of items (seamless loop via duplication). */
export function Marquee({ items, className }: MarqueeProps) {
  // Duplicate for seamless loop
  const doubled = [...items, ...items]

  return (
    <div className={cn('overflow-hidden', className)}>
      <div className="flex w-max animate-marquee">
        {doubled.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className="flex items-center gap-3 px-8 whitespace-nowrap text-[13px] font-medium text-muted"
          >
            {item}
            <span className="w-1 h-1 rounded-full bg-accent/60 flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  )
}
