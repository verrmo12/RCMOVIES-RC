import type React from "react"
import { useRouter } from "next/navigation" // Updated to App Router
import { useEffect, useState, useRef } from "react"
import { SearchIcon, X } from "lucide-react"

export default function Search() {
  const [searchValue, setSearchValue] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)
  const router = useRouter()
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)

  // Handle click outside to collapse search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsExpanded(false)
        setSearchValue("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isExpanded])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)

    if (value.length > 2) {
      router.push(`/search/${value}/1`)
    } else if (value.length < 1) {
      router.push("/")
    }
  }

  const handleSearchClick = () => {
    setIsExpanded(true)
  }

  const clearSearch = () => {
    setSearchValue("")
    setIsExpanded(false)
    router.push("/")
  }

  return (
    <div
      ref={searchContainerRef}
      className={`
        relative flex items-center rounded-full transition-all duration-300 ease-in-out
        ${isExpanded ? "bg-[rgba(255,255,255,0.1)] ring-1 ring-[rgba(255,255,255,0.15)]" : ""}
      `}
    >
      <div
        className={`
          flex items-center cursor-pointer rounded-full transition-all duration-300
          ${isExpanded ? "pr-3 py-1.5" : "p-2.5 hover:bg-[rgba(255,255,255,0.1)]"}
        `}
        onClick={handleSearchClick}
        aria-label={isExpanded ? "Search input" : "Open search"}
      >
        <SearchIcon size={20} className="text-gray-300 min-w-[20px] transition-transform duration-300" />

        <input
          ref={searchInputRef}
          type="text"
          value={searchValue}
          onChange={handleChange}
          className={`
            bg-transparent border-none outline-none text-white text-base
            transition-all duration-300 placeholder:text-gray-400
            ${isExpanded ? "w-[220px] md:w-[280px] ml-2 opacity-100" : "w-0 ml-0 opacity-0"}
          `}
          placeholder="Search movies, shows..."
          aria-hidden={!isExpanded}
        />

        {isExpanded && searchValue && (
          <button
            onClick={clearSearch}
            className="p-1 hover:bg-[rgba(255,255,255,0.15)] rounded-full transition-colors"
            aria-label="Clear search"
          >
            <X size={18} className="text-gray-300" />
          </button>
        )}
      </div>
    </div>
  )
}

