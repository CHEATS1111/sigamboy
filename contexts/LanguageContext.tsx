'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { getLanguage, getTranslations, type Language } from '@/lib/i18n'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: ReturnType<typeof getTranslations>
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ru')

  useEffect(() => {
    // Язык по умолчанию - русский
    setLanguage('ru')
  }, [])

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t: getTranslations(language) }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

