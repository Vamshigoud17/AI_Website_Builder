import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Menu, MessageSquare } from 'lucide-react'

interface HeaderProps {
  isDevMode: boolean
  setIsDevMode: (value: boolean) => void
  isMenuOpen: boolean
  setIsMenuOpen: (value: boolean) => void
  messageCount: number
}

export default function Header({ isDevMode, setIsDevMode, isMenuOpen, setIsMenuOpen, messageCount }: HeaderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-200">
      <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <Menu className="h-6 w-6" />
      </Button>
      <div className="flex items-center space-x-2 sm:space-x-4">
        <div className="flex items-center space-x-2">
          <span className="hidden sm:inline">Dev Mode</span>
          <Switch
            checked={isDevMode}
            onCheckedChange={setIsDevMode}
          />
        </div>
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5" />
          <span>{messageCount}</span>
        </div>
        {isLoggedIn ? (
          <div className="flex items-center space-x-2">
            <Button variant="ghost" className="hidden sm:inline-flex" onClick={() => {}}>Profile</Button>
            <Button variant="outline" onClick={() => setIsLoggedIn(false)}>Logout</Button>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Button variant="ghost" onClick={() => setIsLoggedIn(true)}>Login</Button>
            <Button variant="outline" className="hidden sm:inline-flex" onClick={() => {}}>Sign Up</Button>
          </div>
        )}
      </div>
    </header>
  )
}

