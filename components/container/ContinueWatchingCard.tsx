"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Star } from "lucide-react"
import Image from "next/image"

interface ContinueWatchingCardProps {
  poster_path?: string
  backdrop_path?: string
  title?: string
  name?: string
  vote_average?: number
  release_date?: string
  first_air_date?: string
  progress?: number
}

function ContinueWatchingCard(props: ContinueWatchingCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const title = props.title || props.name || "Untitled"
  const year = props.release_date?.split("-")[0] || props.first_air_date?.split("-")[0]
  const progress = props.progress || Math.floor(Math.random() * 80) + 10 // Random progress between 10-90% for demo

  return (
    <div
      className="relative overflow-hidden rounded-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video overflow-hidden rounded-lg">
        {/* Image */}
        <Image
          src={
            props.backdrop_path
              ? `https://image.tmdb.org/t/p/w500/${props.backdrop_path}`
              : props.poster_path
                ? `https://image.tmdb.org/t/p/w500/${props.poster_path}`
                : "/placeholder.svg?height=169&width=300"
          }
          alt={title}
          width={300}
          height={169}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        />

        {/* Overlay on hover */}
        {isHovered && (
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
              className="bg-violet-700 rounded-full p-3 cursor-pointer hover:bg-violet-600 transition-colors"
            >
              <Play size={24} className="fill-white text-white" />
            </motion.div>
          </motion.div>
        )}

        {/* Rating badge */}
        {props.vote_average && (
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            <span className="text-white text-xs font-medium">{props.vote_average.toFixed(1)}</span>
          </div>
        )}

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
          <div className="h-full bg-violet-700" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Title and year */}
      <div className="mt-2 px-1">
        <h3 className="text-gray-200 font-medium text-sm truncate">{title}</h3>
        {year && <p className="text-gray-400 text-xs">{year}</p>}
      </div>
    </div>
  )
}

export default ContinueWatchingCard

