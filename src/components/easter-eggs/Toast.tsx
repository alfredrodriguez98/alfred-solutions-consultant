'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import type { ToastPayload } from '@/types'

const DOT_COLOR: Record<NonNullable<ToastPayload['color']>, string> = {
  cyan:   '#00d4ff',
  green:  '#00e5a0',
  amber:  '#f5a623',
  purple: '#b57bff',
  red:    '#ff5c5c',
}

const BORDER_COLOR: Record<NonNullable<ToastPayload['color']>, string> = {
  cyan:   'rgba(0,212,255,0.28)',
  green:  'rgba(0,229,160,0.28)',
  amber:  'rgba(245,166,35,0.28)',
  purple: 'rgba(181,123,255,0.28)',
  red:    'rgba(255,92,92,0.28)',
}

interface ToastProps {
  payload: ToastPayload | null
}

/** Animated slide-up toast — driven by EasterEggProvider. */
export function Toast({ payload }: ToastProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!payload) return
    setVisible(true)
    const id = setTimeout(() => setVisible(false), 4500)
    return () => clearTimeout(id)
  }, [payload])

  return (
    <AnimatePresence>
      {visible && payload && (
        <motion.div
          key="toast"
          initial={{ y: 100, opacity: 0, scale: 0.95 }}
          animate={{ y: 0,   opacity: 1, scale: 1      }}
          exit={{    y: 100, opacity: 0, scale: 0.95   }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          className={cn(
            'fixed bottom-7 right-7 z-[8000]',
            'flex items-start gap-3 min-w-[270px] max-w-[340px]',
            'rounded-[18px] p-4 backdrop-blur-2xl',
            'bg-[rgba(8,8,18,0.96)]',
          )}
          style={{ border: `1px solid ${BORDER_COLOR[payload.color]}` }}
        >
          <span
            className="w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0 animate-pulse2"
            style={{ background: DOT_COLOR[payload.color], boxShadow: `0 0 8px ${DOT_COLOR[payload.color]}` }}
          />
          <div>
            <p className="text-[14.5px] font-bold text-white mb-1">{payload.title}</p>
            <p className="text-[12px] text-[#6e6e73] leading-snug">{payload.message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
