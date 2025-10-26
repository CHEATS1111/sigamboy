'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="py-24 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-transparent to-red-900/10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            {t.about.title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
              {t.about.brandedTitle}
            </span>
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed max-w-3xl mx-auto mb-6">
            {t.about.desc1}
          </p>
          <p className="text-lg text-gray-400 leading-relaxed max-w-3xl mx-auto mb-8">
            {t.about.desc2}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-300">{t.about.modern}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-300">{t.about.performance}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-300">{t.about.focused}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
