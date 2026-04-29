import { cn } from '@/lib/utils/cn'

interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
}

/** Reusable CTA button. Renders as an <a> tag (href-driven navigation). */
export function Button({ variant = 'primary', children, className, ...props }: ButtonProps) {
  const base = 'inline-flex items-center gap-2 px-[30px] py-[15px] rounded-full text-[15px] font-semibold tracking-tight transition-all duration-200 cursor-pointer'

  const variants = {
    primary:
      'bg-gradient-to-br from-accent via-accent-violet to-accent-purple text-white ' +
      'shadow-[0_0_28px_rgba(79,142,247,0.25)] hover:opacity-90 hover:-translate-y-0.5 hover:scale-[1.02] ' +
      'hover:shadow-[0_0_40px_rgba(79,142,247,0.35)]',
    secondary:
      'bg-white/[0.04] dark:bg-white/[0.04] border border-white/[0.08] text-foreground ' +
      'backdrop-blur-xl hover:bg-white/[0.07] hover:border-accent/40 hover:-translate-y-0.5',
  }

  return (
    <a className={cn(base, variants[variant], className)} {...props}>
      {children}
    </a>
  )
}
