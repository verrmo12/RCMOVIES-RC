"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Home, Hash, Film, Tv, Star, Bookmark } from "lucide-react"

interface MobileMenuProps {
  visible?: boolean
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  const [showCategories, setShowCategories] = useState(false)

  if (!visible) {
    return null
  }

  const movieCategory = [
    { name: "Horror", link: "/genre/Horror-27/1" },
    { name: "Action", link: "/genre/Action-28/1" },
    { name: "Comedy", link: "/genre/Comedy-35/1" },
    { name: "Thriller", link: "/genre/Thriller-53/1" },
    { name: "Sci-Fi", link: "/genre/Science-Fiction-878/1" },
    { name: "Crime", link: "/genre/Crime-80/1" },
    { name: "Family", link: "/genre/Family-10751/1" },
    { name: "Anime", link: "/genre/Anime-16/1" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="bg-[rgb(17,17,17)] w-64 absolute top-12 left-0 py-4 rounded-lg shadow-xl border border-gray-800 flex flex-col z-50"
    >
      <div className="flex flex-col">
        <Link href="/" className="mobile-nav-item">
          <Home size={16} className="text-gray-400" />
          <span>Home</span>
        </Link>

        <div className="relative">
          <button
            onClick={() => setShowCategories(!showCategories)}
            className="mobile-nav-item w-full flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              <Hash size={16} className="text-gray-400" />
              <span>Category</span>
            </div>
            <ChevronDown
              size={16}
              className={`text-gray-400 transition-transform duration-300 ${showCategories ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {showCategories && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden bg-[rgb(25,25,25)] rounded-md mx-2 my-1"
              >
                <div className="grid grid-cols-2 gap-1 p-2">
                  {movieCategory.map((cat, index) => (
                    <Link
                      key={index}
                      href={cat.link}
                      className="px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-violet-700/20 rounded transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link href="/movies/1" className="mobile-nav-item">
          <Film size={16} className="text-gray-400" />
          <span>Movies</span>
        </Link>

        <Link href="/tvshows/1" className="mobile-nav-item">
          <Tv size={16} className="text-gray-400" />
          <span>TV Shows</span>
        </Link>

        <Link href="/topimdb/1" className="mobile-nav-item">
          <Star size={16} className="text-gray-400" />
          <span>Top Rated</span>
        </Link>

        <Link href="/movies-list" className="mobile-nav-item">
          <Bookmark size={16} className="text-gray-400" />
          <span>My List</span>
        </Link>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        .mobile-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          color: #e5e5e5;
          font-size: 14px;
          transition: all 0.2s ease;
        }
        
        .mobile-nav-item:hover {
          background-color: rgba(255, 255, 255, 0.05);
          color: white;
        }
      `}</style>
    </motion.div>
  )
}

export default MobileMenu

