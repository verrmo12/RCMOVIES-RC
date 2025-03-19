"use client"

import { useCallback, useState, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"

// Components
import NavbarItem from "./Navbaritems"
import MobileMenu from "./MobileMenu"
import Search from "./Search"

// Icons
import { ChevronDown, Menu, Film, Tv, Star, Bookmark, Home, Hash } from "lucide-react"

interface SideBarprops {
  handleSideNav: any
}

function Navbar(t: SideBarprops) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showMovieCategory, setShowMovieCategory] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset
      setScrollPosition(position)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current)
  }, [])

  const handleMovieCategory = (e: any) => {
    e.stopPropagation()
    setShowMovieCategory(!showMovieCategory)
  }

  // Close category menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (showMovieCategory) setShowMovieCategory(false)
    }

    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [showMovieCategory])

  const movieCategory = [
    { name: "Horror", link: "/genre/Horror-27/1" },
    { name: "Action", link: "/genre/Action-28/1" },
    { name: "Comedy", link: "/genre/Comedy-35/1" },
    { name: "Thriller", link: "/genre/Thriller-53/1" },
    { name: "Sci-Fi", link: "/genre/Science-Fiction-878/1" },
    { name: "Crime", link: "/genre/Crime-80/1" },
    { name: "Family", link: "/genre/Family-10751/1" },
    { name: "Anime", link: "/genre/Anime-16/1" },
    { name: "Mystery", link: "/genre/Mystery-9648/1" },
    { name: "Fantasy", link: "/genre/Fantasy-14/1" },
    { name: "Drama", link: "/genre/Drama-18/1" },
    { name: "Adventure", link: "/genre/Adventure-12/1" },
    { name: "Music", link: "/genre/Music-10402/1" },
    { name: "War", link: "/genre/War-10752/1" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out ${
        scrollPosition > 50
          ? "bg-[rgb(17,17,17)] shadow-lg backdrop-blur-sm bg-opacity-95"
          : "bg-gradient-to-b from-[rgba(0,0,0,0.7)] to-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-violet-500 font-bold text-3xl">RC</span>
            <span className="hidden md:block text-white font-bold text-2xl">MOVIES</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <div
            onClick={(e) => {
              e.stopPropagation()
              toggleMobileMenu()
            }}
            className="lg:hidden flex items-center gap-2 cursor-pointer"
          >
            <button className="flex items-center gap-2 bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] px-3 py-1.5 rounded-full transition-colors">
              <Menu size={18} className="text-white" />
              <span className="text-white text-sm">Menu</span>
              <ChevronDown
                size={16}
                className={`text-white transition-transform duration-300 ${showMobileMenu ? "rotate-180" : ""}`}
              />
            </button>
            <MobileMenu visible={showMobileMenu} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/" className="nav-link">
              <NavbarItem label="Home" icon={<Home size={16} />} />
            </Link>

            <div className="relative" onClick={handleMovieCategory}>
              <div className="nav-link">
                <NavbarItem label="Category" icon={<Hash size={16} />} hasDropdown isOpen={showMovieCategory} />
              </div>

              <AnimatePresence>
                {showMovieCategory && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 bg-[rgb(17,17,17)] border border-gray-800 rounded-lg shadow-xl p-4 w-[500px] z-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="grid grid-cols-3 gap-2">
                      {movieCategory.map((cat, index) => (
                        <Link
                          key={index}
                          href={cat.link}
                          className="px-3 py-2 rounded-md hover:bg-violet-700/20 text-gray-300 hover:text-white transition-colors"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/movies/1" className="nav-link">
              <NavbarItem label="Movies" icon={<Film size={16} />} />
            </Link>

            <Link href="/tvshows/1" className="nav-link">
              <NavbarItem label="TV Shows" icon={<Tv size={16} />} />
            </Link>

            <Link href="/topimdb/1" className="nav-link">
              <NavbarItem label="Top Rated" icon={<Star size={16} />} />
            </Link>

            <Link href="/movies-list" className="nav-link">
              <NavbarItem label="My List" icon={<Bookmark size={16} />} />
            </Link>
          </nav>
        </div>

        {/* Search */}
        <div className="flex items-center">
          <Search />
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        .nav-link {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: #8b5cf6;
          transition: width 0.3s ease;
        }
        
        .nav-link:hover::after {
          width: 100%;
        }
        
        .nav-link.active {
          color: white;
          font-weight: 400;
        }
      `}</style>
    </header>
  )
}

export default Navbar

