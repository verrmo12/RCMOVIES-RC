import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Star, Tv, Film } from "lucide-react"
import Image from "next/image"
import { useDispatch } from "react-redux"
import { removeFromList } from "../redux/actions/myListAction"
import { toast } from "react-toastify"
import Msg from "./Msg"

interface MyListCardProps {
  id: number
  poster_path?: string
  backdrop_path?: string
  title?: string
  name?: string
  vote_average?: number
  release_date?: string
  first_air_date?: string
  media_type?: string
}

function MyListCard(props: MyListCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const dispatch = useDispatch()

  const title = props.title || props.name || "Untitled"
  const year = props.release_date?.split("-")[0] || props.first_air_date?.split("-")[0]
  const isTV = props.media_type === "tv"

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch(removeFromList(props.id))
    toast.error(<Msg title={title} message="Was Removed from your List" />, { theme: "dark" })
  }

  return (
    <div
      className="relative overflow-hidden rounded-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
        {/* Image */}
        <Image
          src={
            props.poster_path
              ? `https://image.tmdb.org/t/p/w500/${props.poster_path}`
              : props.backdrop_path
                ? `https://image.tmdb.org/t/p/w500/${props.backdrop_path}`
                : "/placeholder.svg?height=450&width=300"
          }
          alt={title}
          width={300}
          height={450}
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
            className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-violet-700 rounded-full p-3 cursor-pointer hover:bg-violet-600 transition-colors mb-3"
            >
              <Play size={24} className="fill-white text-white" />
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onClick={handleRemove}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-medium py-1.5 px-3 rounded-md transition-colors"
            >
              Remove from list
            </motion.button>
          </motion.div>
        )}

        {/* Content type badge */}
        <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
          {isTV ? <Tv size={12} className="text-violet-400" /> : <Film size={12} className="text-violet-400" />}
          <span className="text-white text-xs font-medium">{isTV ? "TV" : "Movie"}</span>
        </div>

        {/* Rating badge */}
        {props.vote_average && (
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            <span className="text-white text-xs font-medium">{props.vote_average.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Title and year */}
      <div className="mt-2 px-1">
        <h3 className="text-gray-200 font-medium text-sm truncate">{title}</h3>
        {year && <p className="text-gray-400 text-xs">{year}</p>}
      </div>
    </div>
  )
}

export default MyListCard

