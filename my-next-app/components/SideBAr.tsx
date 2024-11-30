import { Button } from "@/components/ui/button"

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <div className={`${isOpen ? 'w-64' : 'w-0'} transition-all duration-300 overflow-hidden`}>
      <div className="h-full bg-gray-100 p-4">
        <h2 className="text-lg font-semibold mb-4">Chat History</h2>
        <ul className="space-y-2">
          <li>
            <Button variant="ghost" className="w-full justify-start">Chat 1</Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start">Chat 2</Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start">Chat 3</Button>
          </li>
        </ul>
      </div>
    </div>
  )
}

