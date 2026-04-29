'use client'

import { useEffect, useState } from 'react'
import { generateBlockNumber, formatBlockNumber } from '@/lib/utils/crypto'

const ETH_BLOCK_TIME_MS = 12_000

interface BlockTicker {
  display: string
  flash: boolean
}

/** Returns a live-updating ETH block number that ticks every ~12 s. */
export function useBlockTicker(): BlockTicker {
  const [block, setBlock]  = useState(() => generateBlockNumber())
  const [flash, setFlash]  = useState(false)

  useEffect(() => {
    let flashTimer: ReturnType<typeof setTimeout>
    const id = setInterval(() => {
      setBlock(prev => prev + 1)
      setFlash(true)
      flashTimer = setTimeout(() => setFlash(false), 900)
    }, ETH_BLOCK_TIME_MS)

    return () => {
      clearInterval(id)
      clearTimeout(flashTimer)
    }
  }, [])

  return { display: formatBlockNumber(block), flash }
}
