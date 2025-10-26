'use client'

import { useState, useEffect } from 'react'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import About from '@/components/About'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const featuresSection = document.getElementById('features')
      if (featuresSection) {
        const featuresPosition = featuresSection.offsetTop
        const scrollPosition = window.scrollY + window.innerHeight
        // Затемняем навбар когда начинается секция Features
        setIsScrolled(scrollPosition > featuresPosition)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="min-h-screen">
      <Navbar isScrolled={isScrolled} />
      <Hero />
      <Features />
      <About />
      <Footer />
    </main>
  )
}

