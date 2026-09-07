import type { Viewport } from 'next'

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#f8f6f3' }

export default function TolaLayout({ children }: { children: React.ReactNode }) {
  return children
}
