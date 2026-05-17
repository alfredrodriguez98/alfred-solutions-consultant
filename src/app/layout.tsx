import type { Metadata } from 'next'
import { GeistSans }    from 'geist/font/sans'
import { GeistMono }    from 'geist/font/mono'
import { ThemeProvider }  from 'next-themes'
import { Toaster }        from 'sonner'

import { EasterEggProvider } from '@/components/easter-eggs/EasterEggProvider'
import { Cursor }            from '@/components/ui/Cursor'
import { Nav }               from '@/components/layout/Nav'
import { Footer }            from '@/components/layout/Footer'

import './globals.css'

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <EasterEggProvider>
            <Cursor />
            <Nav />
            <main>{children}</main>
            <Footer />
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: 'var(--bg-raised)',
                  border: '1px solid var(--card-border)',
                  color: 'var(--foreground)',
                },
              }}
            />
          </EasterEggProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
