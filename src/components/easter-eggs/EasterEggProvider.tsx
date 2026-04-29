'use client'

import { createContext, useCallback, useContext, useRef, useState } from 'react'
import type { ToastPayload } from '@/types'
import { useKeySequence }  from '@/hooks/useKeySequence'
import { useKonamiCode }   from '@/hooks/useKonamiCode'
import { Toast }           from './Toast'
import { MoonOverlay }     from './MoonOverlay'
import { BlockMinedToast } from './BlockMinedToast'
import { GenesisQuote }    from './GenesisQuote'
import { WagmiBanner }     from './WagmiBanner'

// ─── Context ──────────────────────────────────────────────────────────────

interface EasterEggContextValue {
  showToast:      (payload: ToastPayload) => void
  showBlockMined: () => void
  showGenesis:    () => void
}

const EasterEggContext = createContext<EasterEggContextValue | null>(null)

export function useEasterEggs() {
  const ctx = useContext(EasterEggContext)
  if (!ctx) throw new Error('useEasterEggs must be used within EasterEggProvider')
  return ctx
}

// ─── Provider ─────────────────────────────────────────────────────────────

export function EasterEggProvider({ children }: { children: React.ReactNode }) {
  const [toast,       setToast]       = useState<ToastPayload | null>(null)
  const [toastKey,    setToastKey]    = useState(0)
  const [moonOpen,    setMoonOpen]    = useState(false)
  const [blockOpen,   setBlockOpen]   = useState(false)
  const [genesisOpen, setGenesisOpen] = useState(false)
  const [wagmiOpen,   setWagmiOpen]   = useState(false)

  // ── Stable callbacks ──
  const showToast = useCallback((payload: ToastPayload) => {
    setToast(payload)
    setToastKey(k => k + 1)
  }, [])

  const showBlockMined = useCallback(() => {
    setBlockOpen(true)
    setTimeout(() => setBlockOpen(false), 6500)
  }, [])

  const showGenesis = useCallback(() => {
    setGenesisOpen(true)
    setTimeout(() => setGenesisOpen(false), 6000)
  }, [])

  const triggerWagmi = useCallback(() => {
    setWagmiOpen(true)
    setTimeout(() => setWagmiOpen(false), 2800)
  }, [])

  const triggerMoon = useCallback(() => setMoonOpen(true), [])

  // ── Keyboard Easter eggs ──
  useKeySequence('gm',    useCallback(() => showToast({ title: 'gm ser 👋',     message: "WAGMI. Let's build something institutional.",       color: 'cyan'   }), [showToast]))
  useKeySequence('ngmi',  useCallback(() => showToast({ title: 'ngmi anon 😭',  message: 'touch grass and come back with a real use case',    color: 'red'    }), [showToast]))
  useKeySequence('safu',  useCallback(() => showToast({ title: 'SAFU 🔐',       message: 'Funds are SAFU. BitGo is watching over them.',      color: 'green'  }), [showToast]))
  useKeySequence('lfg',   useCallback(() => showToast({ title: 'LFG 🚀',        message: 'Institutional crypto is the next frontier, anon.', color: 'purple' }), [showToast]))
  useKeySequence('hodl',  triggerWagmi)
  useKeySequence('wagmi', triggerWagmi)
  useKonamiCode(triggerMoon)

  return (
    <EasterEggContext.Provider value={{ showToast, showBlockMined, showGenesis }}>
      {children}

      <Toast key={toastKey} payload={toast} />
      <MoonOverlay open={moonOpen} onClose={() => setMoonOpen(false)} />
      <BlockMinedToast open={blockOpen} />
      <GenesisQuote open={genesisOpen} />
      <WagmiBanner open={wagmiOpen} />
    </EasterEggContext.Provider>
  )
}
