'use client'

import { AnimatePresence, motion } from 'framer-motion'

interface GenesisQuoteProps {
  open: boolean
}

/** Satoshi's Genesis Block message — revealed after hovering the hero quote. */
export function GenesisQuote({ open }: GenesisQuoteProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="genesis"
          initial={{ y: 80, opacity: 0, scale: 0.96 }}
          animate={{ y: 0,  opacity: 1, scale: 1     }}
          exit={{    y: 80, opacity: 0, scale: 0.96  }}
          transition={{ type: 'spring', damping: 22, stiffness: 200 }}
          className="fixed bottom-7 left-7 z-[8000] max-w-[360px] rounded-[18px] p-5 backdrop-blur-2xl"
          style={{
            background: 'rgba(8,8,18,0.97)',
            border:     '1px solid rgba(245,166,35,0.28)',
            boxShadow:  '0 0 0 1px rgba(245,166,35,0.08), 0 24px 60px rgba(0,0,0,0.7)',
          }}
        >
          <p className="flex items-center gap-2 text-[10px] font-bold tracking-[2px] uppercase text-[#f5a623] mb-2.5">
            <span className="w-3.5 h-[1.5px] bg-[#f5a623] rounded" />
            Bitcoin Genesis Block · Jan 3, 2009
          </p>
          <p className="text-[13.5px] italic text-[#d4d4d8] leading-relaxed mb-3">
            "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks."
          </p>
          <div className="flex items-center justify-between text-[11px] text-[#52525b]">
            <span>— Satoshi Nakamoto, coinbase tx</span>
            <span className="font-mono text-[10px] text-[#f5a623] bg-[rgba(245,166,35,0.08)] px-2 py-0.5 rounded">
              Block #0
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
