'use client'

import { useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { generateFakeHash, generateBlockNumber, formatBlockNumber } from '@/lib/utils/crypto'

interface BlockMinedToastProps {
  open: boolean
}

/** Slide-in notification simulating a new ETH block being mined. */
export function BlockMinedToast({ open }: BlockMinedToastProps) {
  const data = useMemo(() => {
    if (!open) return null
    const hash  = generateFakeHash()
    const block = generateBlockNumber()
    return {
      hash,
      hashShort: hash.slice(0, 12),
      hashRest:  hash.slice(12),
      blockNum:  formatBlockNumber(block),
      txns:      Math.floor(Math.random() * 350) + 80,
      blockTime: (11.5 + Math.random() * 2).toFixed(1),
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && data && (
        <motion.div
          key="block-mined"
          initial={{ x: 420, opacity: 0 }}
          animate={{ x: 0,   opacity: 1 }}
          exit={{    x: 420, opacity: 0 }}
          transition={{ type: 'spring', damping: 22, stiffness: 200 }}
          className="fixed top-[68px] right-5 z-[8000] min-w-[300px] rounded-2xl p-4 backdrop-blur-2xl"
          style={{
            background: 'rgba(8,8,18,0.97)',
            border:     '1px solid rgba(0,229,160,0.28)',
            boxShadow:  '0 0 0 1px rgba(0,229,160,0.08), 0 20px 50px rgba(0,0,0,0.7)',
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-2 mb-2.5">
            <span className="animate-spin-slow text-[15px]">⛏️</span>
            <span className="text-[12.5px] font-bold text-[#00e5a0]">
              New Block Mined · #{data.blockNum}
            </span>
          </div>

          {/* Hash */}
          <p className="font-mono text-[10.5px] text-[#3a3a4a] leading-relaxed mb-3 break-all">
            <span className="text-[#00e5a0]">{data.hashShort}</span>
            {data.hashRest}
          </p>

          {/* Stats */}
          <div className="flex gap-5">
            {[
              { label: 'Transactions', value: `${data.txns} txns` },
              { label: 'Block Time',   value: `${data.blockTime}s` },
              { label: 'Network',      value: 'BitGo'              },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[12px] font-semibold text-[#a1a1aa]">{value}</p>
                <p className="text-[11px] text-[#6e6e73]">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
