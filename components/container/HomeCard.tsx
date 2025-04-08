"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Star } from "lucide-react"
import Image from "next/image"

interface HomeCardProps {
  poster_path?: string
  profile_path?: string
  title?: string
  name?: string
  vote_average?: number
  release_date?: string
  first_air_date?: string
  heading?: string
  character?: string
  job?: string
}

function HomeCard(props: HomeCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const isCast = props.heading === "Casts"
  const imagePath = isCast ? props.profile_path : props.poster_path
  const title = props.title || props.name || "Untitled"
  const year = props.release_date?.split("-")[0] || props.first_air_date?.split("-")[0]
  const role = props.character || props.job

  return (
    <div
      className="relative overflow-hidden rounded-lg transition-all duration-300 group"
      onMouseEnter={() => !isCast && setIsHovered(true)}
      onMouseLeave={() => !isCast && setIsHovered(false)}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
        {/* Image */}
        <Image
          src={imagePath ? `https://image.tmdb.org/t/p/w500/${imagePath}` : "/placeholder.svg?height=450&width=300"}
          alt={title}
          width={300}
          height={450}
          className={`w-full h-full object-cover ${!isCast ? "transition-transform duration-500" : ""}`}
          style={{
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        />

        {/* Subtle border glow on hover */}
        <div
          className={`absolute inset-0 rounded-lg transition-opacity duration-300 pointer-events-none ${
            isHovered && !isCast ? "opacity-100" : "opacity-0"
          }`}
          style={{
            boxShadow: "inset 0 0 0 2px rgba(251, 191, 36, 0.3), 0 0 20px rgba(236, 72, 153, 0.3)",
          }}
        />

        {/* Overlay on hover - only for non-cast cards */}
        <AnimatePresence>
          {isHovered && !isCast && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/60 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative group-hover:scale-110 transition-transform duration-300"
              >
                {/* Gradient background with glow effect */}
                <div className="absolute inset-0 rounded-full bg-violet-700 blur-[2px] opacity-70 scale-110"></div>
                <div className="relative bg-violet-700 hover:bg-violet-600 rounded-full p-3 cursor-pointer transition-colors">
                  <Play size={24} className="fill-white text-white" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rating badge - only for movies/TV */}
        {!isCast && props.vote_average && (
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 border-l-2 border-yellow-500">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            <span className="text-white text-xs font-medium">{props.vote_average.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Title and year/role */}
      <div className="mt-2 px-1">
        <h3 className="text-gray-200 font-medium text-sm truncate">{title}</h3>
        {isCast && role ? (
          <p className="text-gray-400 text-xs truncate">{role}</p>
        ) : year ? (
          <p className="text-gray-400 text-xs">{year}</p>
        ) : null}
      </div>
    </div>
  )
}

export default HomeCard