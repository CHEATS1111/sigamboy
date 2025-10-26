'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCheats, type Cheat } from '@/contexts/CheatsContext'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const { cheats, updateCheat } = useCheats()
  const [editingCheat, setEditingCheat] = useState<Cheat | null>(null)
  const [newImage, setNewImage] = useState<File | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Проверяем аутентификацию при загрузке
    const auth = localStorage.getItem('admin_auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === '33336020') {
      setIsAuthenticated(true)
      localStorage.setItem('admin_auth', 'true')
    } else {
      alert('Неверный пароль')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('admin_auth')
    setPassword('')
  }

  const handleEditCheat = (cheat: Cheat) => {
    setEditingCheat({ ...cheat })
  }

  const handleSaveCheat = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingCheat) return

    updateCheat(editingCheat)
    setEditingCheat(null)
    setNewImage(null)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewImage(file)
      // Создаем временный URL для предпросмотра
      const reader = new FileReader()
      reader.onload = (event) => {
        if (editingCheat) {
          setEditingCheat({
            ...editingCheat,
            image: event.target?.result as string
          })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">
            Админ Панель
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Пароль
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Введите пароль"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Админ Панель</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Выйти
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cheats.map((cheat) => (
            <div key={cheat.id} className="bg-gray-800 p-6 rounded-lg">
              <div className="mb-4">
                <img
                  src={cheat.image}
                  alt={cheat.title}
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{cheat.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{cheat.description}</p>
              <button
                onClick={() => handleEditCheat(cheat)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
              >
                Редактировать
              </button>
            </div>
          ))}
        </div>

        {/* Модальное окно редактирования */}
        {editingCheat && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-bold text-white mb-4">
                Редактировать чит
              </h2>
              <form onSubmit={handleSaveCheat} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Название
                  </label>
                  <input
                    type="text"
                    value={editingCheat.title}
                    onChange={(e) => setEditingCheat({
                      ...editingCheat,
                      title: e.target.value
                    })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Описание
                  </label>
                  <textarea
                    value={editingCheat.description}
                    onChange={(e) => setEditingCheat({
                      ...editingCheat,
                      description: e.target.value
                    })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Ссылка на скачивание
                  </label>
                  <input
                    type="url"
                    value={editingCheat.downloadUrl || ''}
                    onChange={(e) => setEditingCheat({
                      ...editingCheat,
                      downloadUrl: e.target.value
                    })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="https://example.com/download"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Изображение
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                  >
                    Сохранить
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingCheat(null)
                      setNewImage(null)
                    }}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                  >
                    Отмена
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
