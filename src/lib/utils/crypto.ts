const HEX = '0123456789abcdef'

/** Generate a fake-looking Ethereum transaction hash. */
export function generateFakeHash(): string {
  return '0x' + Array.from({ length: 64 }, () => HEX[Math.floor(Math.random() * 16)]).join('')
}

/** Generate a plausible recent ETH block number. */
export function generateBlockNumber(): number {
  return 21_847_000 + Math.floor(Math.random() * 5_000)
}

/** Format a block number with locale separators. */
export function formatBlockNumber(n: number): string {
  return n.toLocaleString()
}
