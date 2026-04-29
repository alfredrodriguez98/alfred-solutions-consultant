import { cn } from '@/lib/utils/cn'

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
}

/** Renders children with the site's blue→violet gradient fill. */
export function GradientText({ children, className, as: Tag = 'span' }: GradientTextProps) {
  return (
    <Tag
      className={cn(
        'bg-gradient-to-br from-accent via-accent-violet to-accent-purple',
        'bg-clip-text text-transparent',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
