import type React from "react"
import { ChevronDown } from "lucide-react"

interface NavbarItemProps {
  label: string
  icon?: React.ReactNode
  hasDropdown?: boolean
  isOpen?: boolean
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, icon, hasDropdown = false, isOpen = false }) => {
  return (
    <div className="flex items-center gap-1.5 cursor-pointer text-sm font-medium text-gray-300 hover:text-white transition-colors">
      {icon && <span className="opacity-80">{icon}</span>}
      <span>{label}</span>
      {hasDropdown && (
        <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      )}
    </div>
  )
}

export default NavbarItem

