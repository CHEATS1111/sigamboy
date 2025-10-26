'use client'

import { useState, useEffect, useRef } from 'react'

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
  const [isUsernameSet, setIsUsernameSet] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isAdminOnline, setIsAdminOnline] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Проверяем, есть ли сохраненное имя пользователя
    const savedUsername = localStorage.getItem('support_username')
    if (savedUsername) {
      setUsername(savedUsername)
      setIsUsernameSet(true)
    }

    // Проверяем статус админа
    const checkAdminStatus = () => {
      const adminAuth = localStorage.getItem('admin_auth')
      setIsAdminOnline(adminAuth === 'true')
    }
    
    checkAdminStatus()
    const interval = setInterval(checkAdminStatus, 1000)
    
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Загружаем сообщения из localStorage
    const savedMessages = localStorage.getItem('support_messages')
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
        setMessages(parsedMessages)
      } catch (error) {
        console.error('Error loading messages:', error)
      }
    }
  }, [])

  useEffect(() => {
    // Сохраняем сообщения в localStorage
    localStorage.setItem('support_messages', JSON.stringify(messages))
  }, [messages])

  useEffect(() => {
    // Прокручиваем к последнему сообщению
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      localStorage.setItem('support_username', username.trim())
      setIsUsernameSet(true)
    }
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && isUsernameSet) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message.trim(),
        sender: 'user',
        timestamp: new Date(),
        username: username
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
        {!isUsernameSet ? (
          /* Username Form */
          <div className="p-4">
            <h4 className="text-white mb-2">Введите ваш никнейм</h4>
            <form onSubmit={handleUsernameSubmit} className="space-y-2">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ваш никнейм"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
              >
                Продолжить
              </button>
            </form>
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
                  className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md transition-colors"
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
