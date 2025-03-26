import { motion } from "framer-motion"
import Link from "next/link"

interface SimilarCardProps {
  id: number
  title?: string
  name?: string
  poster_path?: string
  profile_path?: string
  release_date?: string
  first_air_date?: string
  vote_average?: number
  heading: string
  handleSimilar: () => void
  handlePage: () => void
}

const SimilarCard = ({ id, title, name, poster_path, profile_path, release_date, first_air_date, vote_average, heading, handleSimilar, handlePage }: SimilarCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="cursor-pointer"
      onClick={handlePage}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
        <img
          src={
            poster_path || profile_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path || profile_path}`
              : "/placeholder.svg?height=450&width=300"
          }
          alt={title || name}
          className="w-full h-full object-cover"
        />
        {vote_average && (
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md">
            <span className="text-white text-xs font-medium">{vote_average.toFixed(1)}</span>
          </div>
        )}
      </div>
      <div className="mt-2">
        <h3 className="text-gray-200 text-sm font-medium truncate">{title || name}</h3>
        <p className="text-gray-400 text-xs">{release_date?.split("-")[0] || first_air_date?.split("-")[0] || "N/A"}</p>
      </div>
    </motion.div>
  )
}

export default SimilarCard 