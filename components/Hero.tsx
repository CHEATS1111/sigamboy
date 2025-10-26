'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 transition-all duration-1000 ease-in-out"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-red-900/20 to-gray-900 transition-all duration-1000 ease-in-out">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/10 via-transparent to-transparent transition-all duration-1000 ease-in-out"></div>
      </div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/20 rounded-full blur-3xl animate-pulse transition-all duration-1000 ease-in-out"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-600/20 rounded-full blur-3xl animate-pulse delay-1000 transition-all duration-1000 ease-in-out"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ease-in-out">
        <div className="space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight transition-all duration-1000 ease-in-out">
            <div className="flex items-center justify-center gap-4">
              <span className="whitespace-nowrap">{t.hero.title}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 transition-all duration-1000 ease-in-out whitespace-nowrap">
                {t.hero.brand}
              </span>
            </div>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto transition-all duration-1000 ease-in-out">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 ease-in-out">
            <a 
              href="#features"
              className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-500 transform hover:scale-105 shadow-lg shadow-red-500/50 inline-block text-center"
            >
              {t.hero.getStarted}
            </a>
            <a 
              href="#about"
              className="px-8 py-4 bg-transparent border-2 border-red-500 hover:bg-red-500/10 text-white font-semibold rounded-lg transition-all duration-500 transform hover:scale-105 inline-block text-center"
            >
              {t.hero.learnMore}
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
