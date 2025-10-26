'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

interface DownloadModalProps {
  isOpen: boolean
  onClose: () => void
  cheat?: any
}

export default function DownloadModal({ isOpen, onClose, cheat }: DownloadModalProps) {
  const { t, language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      setIsClosing(false)
    } else {
      setIsClosing(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 600) // Время анимации исчезания
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
    }, 600)
  }

  if (!isOpen) return null

  const instructions = language === 'ru' ? [
    '1. Откройте настройки антивируса',
    '2. Найдите раздел "Исключения" или "Исключения файлов"',
    '3. Добавьте папку с читом в исключения',
    '4. Отключите защиту в реальном времени',
    '5. Запустите чит от имени администратора'
  ] : [
    '1. Open antivirus settings',
    '2. Find "Exclusions" or "File Exclusions" section',
    '3. Add cheat folder to exclusions',
    '4. Disable real-time protection',
    '5. Run cheat as administrator'
  ]

  const title = language === 'ru' ? 'Инструкция по установке' : 'Installation Instructions'
  const subtitle = language === 'ru' 
    ? 'Для корректной работы чита необходимо отключить антивирус' 
    : 'To ensure proper cheat operation, antivirus must be disabled'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred background - красивое появление и исчезание */}
      <div 
        className={`absolute inset-0 bg-black/50 backdrop-blur-md transition-all duration-700 ease-out ${
          isVisible && !isClosing ? 'opacity-100 backdrop-blur-md' : 'opacity-0 backdrop-blur-none'
        }`}
        onClick={handleClose}
      ></div>
      
      {/* Modal content - анимируется после блюра */}
      <div className={`relative bg-gray-900 rounded-2xl p-8 max-w-2xl mx-4 border border-red-500/30 shadow-2xl transition-all duration-600 transform ${
        isVisible && !isClosing 
          ? 'opacity-100 scale-100 translate-y-0 delay-200' 
          : 'opacity-0 scale-95 translate-y-8'
      }`}>
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🛡️</div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {title}
          </h2>
          <p className="text-gray-400">
            {subtitle}
          </p>
        </div>

        {/* Instructions */}
        <div className="space-y-4 mb-8">
          {instructions.map((instruction, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {index + 1}
              </div>
              <p className="text-gray-300 leading-relaxed">
                {instruction}
              </p>
            </div>
          ))}
        </div>

        {/* Warning */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-red-400">⚠️</span>
            <span className="text-red-400 font-semibold">
              {language === 'ru' ? 'Важно!' : 'Important!'}
            </span>
          </div>
          <p className="text-gray-300 text-sm">
            {language === 'ru' 
              ? 'Для корректной работы чита необходимо полностью отключить антивирус.'
              : 'For proper cheat operation, antivirus must be completely disabled.'
            }
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => {
              if (cheat?.downloadUrl) {
                window.open(cheat.downloadUrl, '_blank')
              }
              handleClose()
            }}
            className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            {language === 'ru' ? 'Понятно, скачать' : 'Got it, download'}
          </button>
          <button
            onClick={handleClose}
            className="flex-1 px-6 py-3 bg-transparent border-2 border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-all duration-300"
          >
            {language === 'ru' ? 'Отмена' : 'Cancel'}
          </button>
        </div>
      </div>
    </div>
  )
}
