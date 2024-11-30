import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlusCircle, Clock, CreditCard } from 'lucide-react'

interface MenuProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

export default function Menu({ isOpen, setIsOpen }: MenuProps) {
  return (
    <div className={`${isOpen ? 'w-64' : 'w-0'} transition-all duration-300 overflow-hidden`}>
      <div className="h-full bg-gray-100 p-4 flex flex-col">
        <Button variant="outline" className="mb-4 w-full" onClick={() => {}}>
          <PlusCircle className="mr-2 h-4 w-4" /> New Chat
        </Button>
        <h2 className="text-lg font-semibold mb-2">Chat History</h2>
        <ScrollArea className="flex-grow mb-4">
          <ul className="space-y-2">
            {[1, 2, 3, 4, 5].map((chat) => (
              <li key={chat}>
                <Button variant="ghost" className="w-full justify-start">
                  <Clock className="mr-2 h-4 w-4" /> Chat {chat}
                </Button>
              </li>
            ))}
          </ul>
        </ScrollArea>
        <Button variant="default" className="w-full" onClick={() => {}}>
          <CreditCard className="mr-2 h-4 w-4" /> Subscription
        </Button>
      </div>
    </div>
  )
}

