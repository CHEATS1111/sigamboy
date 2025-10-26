'use client'

import { useState, useEffect, useRef } from 'react'
import { MessageBroadcaster } from '@/lib/broadcast'

interface Message {
  id: string
  text: string
  sender: 'user' | 'admin'
  timestamp: Date
  username?: string
}

interface SupportChatProps {
  isOpen: boolean
  onClose: () => void
}

export default function SupportChat({ isOpen, onClose }: SupportChatProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isAdminOnline, setIsAdminOnline] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const broadcasterRef = useRef<MessageBroadcaster | null>(null)

  useEffect(() => {
    // Инициализируем BroadcastChannel
    broadcasterRef.current = new MessageBroadcaster()
    
    // Проверяем, есть ли сохраненная авторизация
    const savedAuth = localStorage.getItem('support_auth')
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth)
        if (authData.username && authData.password) {
          setUsername(authData.username)
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error('Error parsing auth data:', error)
      }
    }

    // Функция для получения cookie
    const getCookie = (name: string) => {
      const nameEQ = name + '='
      const ca = document.cookie.split(';')
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) === ' ') c = c.substring(1, c.length)
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
      }
      return null
    }

    // Проверяем статус админа (localStorage и cookies)
    const checkAdminStatus = () => {
      const adminAuth = localStorage.getItem('admin_auth')
      const cookieAuth = getCookie('admin_auth')
      setIsAdminOnline(adminAuth === 'true' || cookieAuth === 'true')
    }
    
    // Слушаем изменения через BroadcastChannel
    if (broadcasterRef.current) {
      broadcasterRef.current.onMessage((data: any) => {
        if (data.type === 'admin_status') {
          setIsAdminOnline(data.data.isOnline)
        }
      })
    }
    
    checkAdminStatus()
    const interval = setInterval(checkAdminStatus, 1000)
    
    return () => {
      clearInterval(interval)
      broadcasterRef.current?.close()
    }
  }, [])

  useEffect(() => {
    // Загружаем сообщения из localStorage
    const loadMessages = () => {
      const savedMessages = localStorage.getItem('support_messages')
      if (savedMessages) {
        try {
          const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
          // Фильтруем только сообщения от текущего пользователя и адресуемые ему
          const userMessages = parsedMessages.filter((msg: any) => 
            msg.username === username || 
            (msg.sender === 'admin' && msg.username === username) ||
            msg.sender === 'user'
          )
          setMessages(userMessages)
        } catch (error) {
          console.error('Error loading messages:', error)
        }
      }
    }
    
    loadMessages()
    
    // Слушаем новые сообщения через BroadcastChannel
    if (broadcasterRef.current) {
      broadcasterRef.current.onMessage((data: any) => {
        if (data.type === 'new_message') {
          // Проверяем, относится ли сообщение к текущему пользователю
          const msg = data.data
          if (msg.username === username || (msg.sender === 'admin' && msg.username === username)) {
            setMessages(prev => [...prev, {
              ...msg,
              timestamp: new Date(msg.timestamp)
            }])
          }
        }
      })
    }
    
    // Обновляем сообщения каждую секунду
    const interval = setInterval(loadMessages, 1000)
    return () => clearInterval(interval)
  }, [username])

  useEffect(() => {
    // Сохраняем сообщения в localStorage
    localStorage.setItem('support_messages', JSON.stringify(messages))
  }, [messages])

  useEffect(() => {
    // Прокручиваем к последнему сообщению
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isLoginMode) {
      // Логин
      const savedUsers = localStorage.getItem('support_users')
      if (savedUsers) {
        try {
          const users = JSON.parse(savedUsers)
          const user = users.find((u: any) => u.username === username && u.password === password)
          if (user) {
            localStorage.setItem('support_auth', JSON.stringify({ username, password }))
            setIsAuthenticated(true)
          } else {
            alert('Неверный логин или пароль')
          }
        } catch (error) {
          alert('Ошибка при авторизации')
        }
      } else {
        alert('Пользователь не найден')
      }
    } else {
      // Регистрация
      if (password !== confirmPassword) {
        alert('Пароли не совпадают')
        return
      }
      
      const savedUsers = localStorage.getItem('support_users')
      let users = []
      if (savedUsers) {
        try {
          users = JSON.parse(savedUsers)
        } catch (error) {
          users = []
        }
      }
      
      const existingUser = users.find((u: any) => u.username === username)
      if (existingUser) {
        alert('Пользователь с таким именем уже существует')
        return
      }
      
      users.push({ username, password })
      localStorage.setItem('support_users', JSON.stringify(users))
      localStorage.setItem('support_auth', JSON.stringify({ username, password }))
      setIsAuthenticated(true)
    }
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && isAuthenticated) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message.trim(),
        sender: 'user',
        timestamp: new Date(),
        username: username
      }
      
      // Сохраняем в localStorage
      const savedMessages = localStorage.getItem('support_messages')
      let messages = []
      if (savedMessages) {
        try {
          messages = JSON.parse(savedMessages)
        } catch (error) {
          console.error('Error parsing messages:', error)
        }
      }
      messages.push(newMessage)
      localStorage.setItem('support_messages', JSON.stringify(messages))
      
      // Отправляем через BroadcastChannel для мгновенной синхронизации
      if (broadcasterRef.current) {
        broadcasterRef.current.sendMessage(newMessage)
      }
      
      setMessages(prev => [...prev, newMessage])
      setMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(e)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-4 right-4 w-80 h-96 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <h3 className="text-white font-semibold">Поддержка</h3>
          <div className={`w-2 h-2 rounded-full ${isAdminOnline ? 'bg-green-500' : 'bg-gray-500'}`}></div>
          <span className="text-xs text-gray-400">
            {isAdminOnline ? 'В сети' : 'Не в сети'}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col h-80">
        {!isAuthenticated ? (
          /* Auth Form */
          <div className="p-4">
            <h4 className="text-white mb-4 text-center">
              {isLoginMode ? 'Вход в поддержку' : 'Регистрация'}
            </h4>
            <form onSubmit={handleAuthSubmit} className="space-y-3">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Имя пользователя"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Пароль"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
              {!isLoginMode && (
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Повторите пароль"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              )}
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
              >
                {isLoginMode ? 'Войти' : 'Зарегистрироваться'}
              </button>
            </form>
            <div className="mt-3 text-center">
              <button
                onClick={() => {
                  setIsLoginMode(!isLoginMode)
                  setPassword('')
                  setConfirmPassword('')
                }}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {isLoginMode ? 'Нет аккаунта? Зарегистрироваться' : 'Есть аккаунт? Войти'}
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg ${
                      msg.sender === 'user'
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
            <div className="p-4 border-t border-gray-700">
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
                  className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-3 py-2 rounded-md transition-colors text-sm"
                >
                  Отправить
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
