"use client"

import type React from "react"

import { useRouter } from "next/router"
import { useEffect, useState, useRef } from "react"
import { SearchIcon, X } from "lucide-react"

function Search() {
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
      className={`relative flex items-center ${isExpanded ? "bg-[rgba(255,255,255,0.1)]" : ""} rounded-full transition-all duration-300`}
    >
      <div
        className={`
          flex items-center cursor-pointer
          ${isExpanded ? "pr-2" : "p-2 hover:bg-[rgba(255,255,255,0.1)]"}
          rounded-full transition-all duration-300
        `}
        onClick={handleSearchClick}
      >
        <SearchIcon size={18} className="text-gray-300 min-w-[18px]" />

        <input
          ref={searchInputRef}
          type="text"
          value={searchValue}
          onChange={handleChange}
          className={`
            bg-transparent border-none outline-none text-white text-sm
            transition-all duration-300 placeholder:text-gray-400
            ${isExpanded ? "w-[180px] md:w-[220px] ml-2" : "w-0 ml-0"}
          `}
          placeholder="Search movies, shows..."
        />

        {isExpanded && searchValue && (
          <button onClick={clearSearch} className="p-1 hover:bg-[rgba(255,255,255,0.1)] rounded-full transition-colors">
            <X size={16} className="text-gray-300" />
          </button>
        )}
      </div>
    </div>
  )
}

export default Search

