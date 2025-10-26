'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useCheats } from '@/contexts/CheatsContext'
import DownloadModal from '@/components/DownloadModal'

export default function Features() {
  const { t } = useLanguage()
  const { cheats } = useCheats()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCheat, setSelectedCheat] = useState<any>(null)

  return (
    <section
      id="features"
      className="py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-500/5 via-transparent to-red-500/5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            СКАЧАТЬ{' '}
            <span className="text-red-500">ЧИТ</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Лучшие читы для ваших игр
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cheats.map((cheat, index) => (
            <div
              key={index}
              className="group bg-gray-800/50 hover:bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-red-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/20"
            >
              {/* Фото чита */}
              <div className="mb-4 rounded-lg overflow-hidden">
                <img 
                  src={cheat.image} 
                  alt={cheat.title}
                  className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              {/* Название чита */}
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                {cheat.title}
              </h3>
              
              {/* Описание */}
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {cheat.description}
              </p>
              
              {/* Красная кнопка скачать */}
              <button 
                onClick={() => {
                  if (cheat.downloadUrl) {
                    setSelectedCheat(cheat)
                    setIsModalOpen(true)
                  }
                }}
                className={`w-full font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  cheat.downloadUrl 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!cheat.downloadUrl}
              >
                {cheat.downloadUrl ? 'СКАЧАТЬ' : 'СКОРО...'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Download Modal */}
      <DownloadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        cheat={selectedCheat}
      />
    </section>
  )
}
