'use client'

import { AnimatePresence, motion } from 'framer-motion'

interface WagmiBannerProps {
  open: boolean
}

/** Full-width animated gradient banner triggered by HODL / WAGMI sequences. */
export function WagmiBanner({ open }: WagmiBannerProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="wagmi"
          initial={{ y: '-100%' }}
          animate={{ y: 0        }}
          exit={{    y: '-100%'  }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          className="fixed top-0 left-0 right-0 z-[9500] py-4 text-center text-xl font-black tracking-[3px] text-white select-none"
          style={{
            background: 'linear-gradient(90deg, #4f8ef7, #7c6ff7, #a855f7, #7c6ff7, #4f8ef7)',
            backgroundSize: '300% 100%',
            animation: 'wagmiBg 2s linear infinite',
            textShadow: '0 2px 12px rgba(0,0,0,0.3)',
          }}
        >
          💎 WAGMI SER · DIAMOND HANDS · NOT YOUR KEYS NOT YOUR COINS 💎
        </motion.div>
      )}
    </AnimatePresence>
  )
}
