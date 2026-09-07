import type { Viewport } from 'next'

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#e8eef4' }

export default function MiloLayout({ children }: { children: React.ReactNode }) {
  return children
}
