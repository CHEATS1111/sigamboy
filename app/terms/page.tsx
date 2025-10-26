'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import Link from 'next/link'

export default function TermsPage() {
  const { t, language } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t.terms.title}
          </h1>
        </div>

        {/* Navigation buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <Link
            href="/"
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/50"
          >
            {t.nav.home}
          </Link>
          <Link
            href="/#features"
            className="px-6 py-3 bg-transparent border-2 border-red-500 hover:bg-red-500/10 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            {t.nav.features}
          </Link>
          <Link
            href="/#about"
            className="px-6 py-3 bg-transparent border-2 border-red-500 hover:bg-red-500/10 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            {t.nav.about}
          </Link>
        </div>

        {/* Content */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700">
          <div className="space-y-6">
            <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-lg">
              <h2 className="text-2xl font-bold text-red-400 mb-4">
                {t.terms.disclaimer}
              </h2>
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-gray-300 leading-relaxed">
                {t.terms.content}
              </p>

              <h3 className="text-2xl font-bold text-white mt-8 mb-4">
                {language === 'ru' ? 'Дополнительные условия' : 'Additional Terms'}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {language === 'ru'
                  ? 'Используя наш сайт, вы подтверждаете, что вам исполнилось 18 лет и вы понимаете последствия использования предоставляемых услуг.'
                  : 'By using our site, you confirm that you are 18 years of age and understand the consequences of using the services provided.'}
              </p>

              <h3 className="text-2xl font-bold text-white mt-8 mb-4">
                {language === 'ru' ? 'Отказ от ответственности' : 'Disclaimer'}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {language === 'ru'
                  ? 'Мы не несем ответственности за неправомерное использование предоставляемых инструментов. Пользователь несет полную ответственность за свои действия.'
                  : 'We are not responsible for the misuse of the provided tools. The user is fully responsible for their actions.'}
              </p>

              <h3 className="text-2xl font-bold text-white mt-8 mb-4">
                {language === 'ru' ? 'Согласие' : 'Agreement'}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {language === 'ru'
                  ? 'Продолжая использовать сайт, вы автоматически соглашаетесь со всеми условиями использования.'
                  : 'By continuing to use the site, you automatically agree to all terms of use.'}
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-700 text-center">
              <Link
                href="/"
                className="inline-block px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/50"
              >
                {language === 'ru' ? 'Вернуться на главную' : 'Back to Home'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

