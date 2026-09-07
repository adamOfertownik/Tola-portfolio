import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({ subsets: ['latin', 'latin-ext'], variable: '--font-dm-sans' })
const playfair = Playfair_Display({ subsets: ['latin', 'latin-ext'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: {
    default: 'Lieske — Tola & Milo',
    template: '%s',
  },
  description: 'Portfolio Toli i Milo Lieske. Dziecięcy modeling komercyjny, reprezentacja wyłączna Moon Kids.',
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#f8f6f3' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" className="bg-background">
      <body className={`${dmSans.variable} ${playfair.variable} antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
