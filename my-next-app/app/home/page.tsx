'use client'

import { useState, useEffect } from 'react'
import ChatBot from '@/components/ChatBot'
import IframeView from '@/components/IframeView'
import Header from '@/components/Header'
import Menu from '@/components/Menu'

export default function Home() {
  const [isDevMode, setIsDevMode] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([])

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const addMessage = (text: string, isUser: boolean) => {
    setMessages(prev => [...prev, { text, isUser }])
  }

  return (
    <div className="flex flex-col h-screen">
      <Header 
        isDevMode={isDevMode} 
        setIsDevMode={setIsDevMode}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        messageCount={messages.length}
      />
      <div className="flex flex-1 overflow-hidden">
        <Menu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
        <main className="flex flex-1">
          <div className={`
            ${isDevMode ? 'w-1/2' : 'w-full'} 
            ${isDevMode && isSmallScreen ? 'hidden' : 'block'}
            border-r border-gray-200
          `}>
            <ChatBot messages={messages} addMessage={addMessage} />
          </div>
          {isDevMode && (
            <div className={`
              ${isSmallScreen ? 'w-full' : 'w-1/2'}
            `}>
              <IframeView />
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

