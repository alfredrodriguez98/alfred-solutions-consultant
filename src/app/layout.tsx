import type { Metadata } from 'next'
import { ThemeProvider }  from 'next-themes'

import { EasterEggProvider } from '@/components/easter-eggs/EasterEggProvider'
import { Cursor }            from '@/components/ui/Cursor'
import { Nav }               from '@/components/layout/Nav'
import { Footer }            from '@/components/layout/Footer'

import './globals.css'

/* ─── Metadata ───────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:       'Alfred Rodriguez — Senior Solutions Engineer · BitGo',
  description: 'Bridging institutional finance and digital asset infrastructure. Pre-sales, custody architecture, and enterprise integrations at BitGo.',
  keywords:    ['Alfred Rodriguez', 'BitGo', 'Solutions Engineer', 'Digital Assets', 'Crypto', 'Institutional Custody', 'Pre-Sales'],
  authors:     [{ name: 'Alfred Rodriguez' }],
  openGraph: {
    title:       'Alfred Rodriguez — Senior Solutions Engineer · BitGo',
    description: 'Bridging institutional finance and digital asset infrastructure.',
    type:        'website',
    locale:      'en_US',
  },
  twitter: {
    card:  'summary_large_image',
    title: 'Alfred Rodriguez — Senior Solutions Engineer · BitGo',
  },
}

/* ─── Root Layout ────────────────────────────────────────────────────────── */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <EasterEggProvider>
            {/* Custom cursor (hidden on touch devices via CSS) */}
            <Cursor />

            {/* Fixed navigation */}
            <Nav />

            {/* Page content */}
            <main>{children}</main>

            {/* Footer */}
            <Footer />
          </EasterEggProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
