'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface Message {
  id: string
  text: string
  sender: 'user' | 'admin'
  timestamp: Date
  username?: string
}

interface ChatSession {
  id: string
  username: string
  messages: Message[]
  lastActivity: Date
}

export default function AdminChatsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [chats, setChats] = useState<ChatSession[]>([])
  const [selectedChat, setSelectedChat] = useState<ChatSession | null>(null)
  const [message, setMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    // Проверяем аутентификацию при загрузке
    const auth = localStorage.getItem('admin_auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      loadChats()
    }
  }, [])

  useEffect(() => {
    // Прокручиваем к последнему сообщению
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [selectedChat?.messages])

  const loadChats = () => {
    // Загружаем чаты из localStorage
    const savedMessages = localStorage.getItem('support_messages')
    if (savedMessages) {
      try {
        const messages: Message[] = JSON.parse(savedMessages).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
        
        // Группируем сообщения по пользователям
        const chatMap = new Map<string, ChatSession>()
        
        messages.forEach(msg => {
          if (msg.username) {
            if (!chatMap.has(msg.username)) {
              chatMap.set(msg.username, {
                id: msg.username,
                username: msg.username,
                messages: [],
                lastActivity: msg.timestamp
              })
            }
            const chat = chatMap.get(msg.username)!
            chat.messages.push(msg)
            if (msg.timestamp > chat.lastActivity) {
              chat.lastActivity = msg.timestamp
            }
          }
        })
        
        setChats(Array.from(chatMap.values()).sort((a, b) => 
          b.lastActivity.getTime() - a.lastActivity.getTime()
        ))
      } catch (error) {
        console.error('Error loading chats:', error)
      }
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === '33336020') {
      setIsAuthenticated(true)
      localStorage.setItem('admin_auth', 'true')
      loadChats()
    } else {
      alert('Неверный пароль')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('admin_auth')
    setPassword('')
    setSelectedChat(null)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && selectedChat) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message.trim(),
        sender: 'admin',
        timestamp: new Date(),
        username: selectedChat.username
      }
      
      // Обновляем сообщения в localStorage
      const savedMessages = localStorage.getItem('support_messages')
      let messages: Message[] = []
      if (savedMessages) {
        try {
          messages = JSON.parse(savedMessages).map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        } catch (error) {
          console.error('Error parsing messages:', error)
        }
      }
      
      messages.push(newMessage)
      localStorage.setItem('support_messages', JSON.stringify(messages))
      
      // Обновляем локальное состояние
      setSelectedChat(prev => {
        if (prev) {
          const updated = {
            ...prev,
            messages: [...prev.messages, newMessage]
          }
          setChats(prevChats => 
            prevChats.map(chat => 
              chat.id === selectedChat.id ? updated : chat
            )
          )
          return updated
        }
        return prev
      })
      
      setMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(e)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">
            Админ Панель - Чаты
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
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-white">Чаты поддержки</h1>
            <div className="flex gap-2">
              <a
                href="/admin"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Админ панель
              </a>
              <a
                href="/"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Главная
              </a>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-screen">
        {/* Chat List */}
        <div className="w-1/3 bg-gray-800 border-r border-gray-700 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-white font-semibold mb-4">Активные чаты</h2>
            {chats.length === 0 ? (
              <p className="text-gray-400">Нет активных чатов</p>
            ) : (
              <div className="space-y-2">
                {chats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => setSelectedChat(chat)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedChat?.id === chat.id
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                    }`}
                  >
                    <div className="font-semibold">{chat.username}</div>
                    <div className="text-sm opacity-70">
                      {chat.lastActivity.toLocaleString()}
                    </div>
                    <div className="text-sm opacity-70">
                      {chat.messages.length} сообщений
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="bg-gray-800 border-b border-gray-700 p-4">
                <h3 className="text-white font-semibold">
                  Чат с {selectedChat.username}
                </h3>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {selectedChat.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-3 py-2 rounded-lg ${
                        msg.sender === 'admin'
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-700 text-white'
                      }`}
                    >
                      <div className="text-sm">{msg.text}</div>
                      <div className="text-xs opacity-70 mt-1">
                        {msg.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="bg-gray-800 border-t border-gray-700 p-4">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Введите сообщение..."
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <button
                    type="submit"
                    disabled={!message.trim()}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md transition-colors"
                  >
                    Отправить
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-400">Выберите чат для начала общения</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
