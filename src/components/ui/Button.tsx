import { cn } from '@/lib/utils/cn'

interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
}

export function Button({ variant = 'primary', children, className, ...props }: ButtonProps) {
  const base = [
    'inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14.5px] font-semibold tracking-tight cursor-pointer',
    'transition-[transform,box-shadow,background-color,border-color,opacity] duration-200',
    'active:scale-[0.97]',
    'press-feedback',
  ].join(' ')

  const variants = {
    primary: [
      'bg-gradient-to-br from-accent via-accent-violet to-accent-purple text-white',
      'shadow-accent-sm hover:shadow-accent-md hover:opacity-95',
    ].join(' '),
    secondary: [
      'bg-[var(--nav-btn)] border border-[var(--card-border)] text-foreground',
      'backdrop-blur-xl hover:bg-[var(--nav-btn-hover)] hover:border-accent/30',
    ].join(' '),
  }

  return (
    <a className={cn(base, variants[variant], className)} {...props}>
      {children}
    </a>
  )
}
