const BASE = process.env.NODE_ENV === 'production' ? '/alfred-solutions-consultant' : ''

/** Prepend the deployment basePath to a public asset path. */
export function asset(path: string): string {
  return `${BASE}${path}`
}
