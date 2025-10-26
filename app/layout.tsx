import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { CheatsProvider } from '@/contexts/CheatsContext'

export const metadata: Metadata = {
  title: 'IDIRENT-CHEATS',
  description: 'Best cheat clients available',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>
        <LanguageProvider>
          <CheatsProvider>
            {children}
          </CheatsProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}

