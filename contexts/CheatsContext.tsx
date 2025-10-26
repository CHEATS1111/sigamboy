'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface Cheat {
  id: number
  title: string
  description: string
  image: string
  downloadUrl?: string
  isHidden?: boolean
}

interface CheatsContextType {
  cheats: Cheat[]
  updateCheat: (cheat: Cheat) => void
  refreshCheats: () => void
}

const CheatsContext = createContext<CheatsContextType | undefined>(undefined)

export function CheatsProvider({ children }: { children: ReactNode }) {
  const [cheats, setCheats] = useState<Cheat[]>([
    {
      id: 1,
      title: 'Xeno',
      description: 'Чит для Roblox с множеством функций',
      image: '/xeno.png',
      downloadUrl: 'https://www.dropbox.com/scl/fi/hzkcctzb48ukic3jip0tk/Xeno.zip?rlkey=9wj8i9tam2d9fza414ta6zlyc&st=5lvohy36&dl=1',
      isHidden: false,
    },
    {
      id: 2,
      title: 'Solara',
      description: 'Чит для Roblox с продвинутыми функциями',
      image: '/solara.png',
      downloadUrl: 'https://www.dropbox.com/scl/fi/2hste69i0pqefnwcsb9ty/Solara.zip?rlkey=uqlmzq2cig6j7ef2c2bu3r84t&st=94noe2v4&dl=1',
      isHidden: false,
    },
    {
      id: 3,
      title: 'JJSploit',
      description: 'Чит для Roblox с мощными возможностями',
      image: '/jjsploit.png',
      downloadUrl: 'https://www.dropbox.com/scl/fi/d57rz3un7fc2v8bq3gxpi/JJSploit1.zip?rlkey=jgrdt3qh7cf2x0t311sa38diq&st=cl64tart&dl=1',
      isHidden: false,
    },
    {
      id: 4,
      title: 'Недоступно',
      description: 'Чит временно недоступен',
      image: 'https://via.placeholder.com/300x200/374151/ffffff?text=Недоступно',
      isHidden: true,
    },
    {
      id: 5,
      title: 'Недоступно',
      description: 'Чит временно недоступен',
      image: 'https://via.placeholder.com/300x200/374151/ffffff?text=Недоступно',
      isHidden: true,
    },
    {
      id: 6,
      title: 'Недоступно',
      description: 'Чит временно недоступен',
      image: 'https://via.placeholder.com/300x200/374151/ffffff?text=Недоступно',
      isHidden: true,
    },
  ])

  useEffect(() => {
    // Загружаем данные из localStorage при инициализации
    const savedCheats = localStorage.getItem('cheats_data')
    if (savedCheats) {
      try {
        setCheats(JSON.parse(savedCheats))
      } catch (error) {
        console.error('Error parsing saved cheats:', error)
      }
    }
  }, [])

  const updateCheat = (updatedCheat: Cheat) => {
    setCheats(prevCheats => {
      const newCheats = prevCheats.map(cheat => 
        cheat.id === updatedCheat.id ? updatedCheat : cheat
      )
      // Сохраняем в localStorage
      localStorage.setItem('cheats_data', JSON.stringify(newCheats))
      return newCheats
    })
  }

  const refreshCheats = () => {
    const savedCheats = localStorage.getItem('cheats_data')
    if (savedCheats) {
      try {
        setCheats(JSON.parse(savedCheats))
      } catch (error) {
        console.error('Error parsing saved cheats:', error)
      }
    }
  }

  return (
    <CheatsContext.Provider value={{ cheats, updateCheat, refreshCheats }}>
      {children}
    </CheatsContext.Provider>
  )
}

export function useCheats() {
  const context = useContext(CheatsContext)
  if (!context) {
    throw new Error('useCheats must be used within CheatsProvider')
  }
  return context
}
