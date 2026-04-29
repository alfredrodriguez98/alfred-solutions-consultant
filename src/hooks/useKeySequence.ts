'use client'

import { useEffect, useRef } from 'react'

/** Calls `onMatch` when the user types `sequence` outside form elements. */
export function useKeySequence(sequence: string, onMatch: () => void): void {
  const bufferRef = useRef('')

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (document.activeElement as HTMLElement)?.tagName
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return

      bufferRef.current = (bufferRef.current + e.key.toLowerCase()).slice(-sequence.length)
      if (bufferRef.current === sequence) {
        bufferRef.current = ''
        onMatch()
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [sequence, onMatch])
}
