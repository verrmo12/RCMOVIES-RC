import { useEffect, useState, useRef } from "react"
import Backdrop from "./backdrop"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { addToMyList, removeFromList } from "../../redux/actions/myListAction"
import { useRouter } from "next/router"
import Link from "next/link"
import ReactPlayer from "react-player/lazy"
import { toast } from "react-toastify"
import Msg from "../Msg"
import SimilarCard from "./similar-card"

// Icons
import { Play, X, Plus, Minus, Youtube, Star, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"

function timeConvert(n: any) {
  if (!n) return "N/A"
  var num = n
  var hours = num / 60
  var rhours = Math.floor(hours)
  var minutes = (hours - rhours) * 60
  var rminutes = Math.round(minutes)
  return rhours + "h " + rminutes + "min"
}

interface CardModalProps {
  title?: string
  backdrop_path?: string
  overview?: string
  handleClick?: any
  id: any
  media_type?: string
  poster_path?: string
  name?: string
  heading: string
  handleSimilar?: any
  place?: string
}

function CardModal(card: CardModalProps) {
  const [inMyList, setInMyList] = useState(false)
  const dispatch = useDispatch()
  const { MyList } = useSelector((state: any) => state)
  const router = useRouter()
  const [isTrailer, setIsTrailer] = useState(false)
  const [data, setData] = useState<any>({})
  const [cardId, setCardId] = useState(card.id)
  const [trailer, setTrailer] = useState<any>("")
  const [similar, setSimilar] = useState<any>([])
  const [castMovies, setCastMovies] = useState<any>([])
  const [heading, setHeading] = useState(card.heading)
  const cardRef = useRef<any>(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 6
  const [click, setClick] = useState(false)

  const isTV =
    heading.includes("TV") ||
    heading.includes("Shows") ||
    heading.includes("Series") ||
    card.media_type === "tv" ||
    heading === "tv" ||
    heading === "SERIES YOU MAY ALSO LIKE"

  const isCast = heading === "Casts"
  const contentType = isTV ? "tv" : isCast ? "person" : "movie"

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        await Promise.all([fetchContentData(), fetchTrailerData(), fetchSimilarContent(), isCast && fetchCastMovies()])

        // Check if item is in user's list
        const current = MyList.filter((item: any) => item.id === cardId)
        setInMyList(current.length > 0)
        setClick(current.length > 0)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    setCurrentPage(0) // Reset pagination when content changes
  }, [cardId, heading])

  const fetchContentData = async () => {
    const url = `https://api.themoviedb.org/3/${contentType}/${cardId}?&api_key=cfe422613b250f702980a3bbf9e90716`
    const req = await fetch(url)
    const res = await req.json()
    setData(res)
    return res
  }

  const fetchTrailerData = async () => {
    if (isCast) return null

    const url = `https://api.themoviedb.org/3/${isTV ? "tv" : "movie"}/${cardId}/videos?api_key=cfe422613b250f702980a3bbf9e90716`
    const req = await fetch(url)
    const res = await req.json()
    const trailerData = res.results?.filter((t: any) => t.type === "Trailer")[0]?.key
    setTrailer(trailerData)
    return trailerData
  }

  const fetchSimilarContent = async () => {
    if (isCast) return null

    const url = `https://api.themoviedb.org/3/${isTV ? "tv" : "movie"}/${cardId}/${isTV ? "recommendations" : "similar"}?api_key=cfe422613b250f702980a3bbf9e90716`
    const req = await fetch(url)
    const res = await req.json()
    setSimilar(res?.results?.slice(0, 12))
    return res?.results
  }

  const fetchCastMovies = async () => {
    const url = `https://api.themoviedb.org/3/person/${cardId}/combined_credits?api_key=cfe422613b250f702980a3bbf9e90716`
    const req = await fetch(url)
    const res = await req.json()
    setCastMovies(res?.cast?.slice(0, 12))
    return res?.cast
  }

  const handleMyListToggle = () => {
    if (!inMyList) {
      dispatch(
        addToMyList({
          id: data.id,
          title: data.title || data.name,
          poster_path: data.poster_path,
          backdrop_path: data.backdrop_path,
          overview: data.overview,
          media_type: data.imdb_id ? "movie" : "tv",
        }),
      )
      setInMyList(true)
      toast.success(<Msg title={data?.title || data?.name} message="Was Added To Your List" />, { theme: "dark" })
    } else {
      dispatch(removeFromList(data.id))
      setInMyList(false)
      toast.error(<Msg title={data?.title || data?.name} message="Was Removed from your List" />, { theme: "dark" })
    }
  }

  const handleDispatch = () => {
    if (!click) {
      dispatch(
        addToMyList({
          id: data.id,
          title: data.title || data.name,
          poster_path: data.poster_path,
          backdrop_path: data.backdrop_path,
          overview: data.overview,
          media_type: data.imdb_id ? "movie" : "tv",
        }),
      )
      setClick(true)
      toast.success(<Msg title={data?.title || data?.name} message="Was Added To Your List" />, { theme: "dark" })
    } else {
      dispatch(removeFromList(data.id))
      setClick(false)
      toast.error(<Msg title={data?.title || data?.name} message="Was Removed from your List" />, { theme: "dark" })
    }
  }

  const handleSimilarClick = (item: any) => {
    setIsTrailer(false)
    setCardId(item.id)
    if (isCast) {
      setHeading(item.media_type)
    }
    cardRef?.current?.scrollTo(0, 0)
  }

  const closeTrailer = () => {
    setIsTrailer(false)
  }

  // Pagination handlers
  const nextPage = () => {
    const contentArray = isCast ? castMovies : similar
    const maxPage = Math.ceil(contentArray?.length / itemsPerPage) - 1
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  // Get current items for pagination
  const getCurrentItems = () => {
    const contentArray = isCast ? castMovies : similar
    const startIndex = currentPage * itemsPerPage
    return contentArray?.slice(startIndex, startIndex + itemsPerPage) || []
  }

  return (
    <Backdrop onClick={card.handleClick}>
      <motion.div
        initial={{ y: "-100vh" }}
        animate={{
          y: 0,
          transition: {
            duration: 0.1,
            type: "spring",
            stiffness: 130,
            damping: 15,
          },
        }}
        exit={{ y: "100vh" }}
        ref={cardRef}
        className="w-full max-w-[700px] 2xl:max-w-[800px] bg-[rgb(17,17,17)] h-full mx-auto shadow-2xl mt-[9rem] overflow-y-scroll scroll-smooth cursor-default my-12 rounded-lg"
        onClick={(e: any) => e.stopPropagation()}
      >
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="w-12 h-12 border-4 border-t-violet-700 border-r-transparent border-b-violet-700 border-l-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Trailer or Backdrop */}
            {isTrailer ? (
              <div className="relative">
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${trailer}`}
                  width="100%"
                  height="400px"
                  config={{
                    youtube: {
                      playerVars: { modestbranding: 1 },
                    },
                  }}
                  playing
                />
                <button
                  onClick={closeTrailer}
                  className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-black/80 transition-colors"
                >
                  <X className="text-white" size={20} />
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.3 } }}
                className="relative h-[370px] bg-cover bg-center"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original//${data.backdrop_path || data.profile_path})`,
                  backgroundPosition: "center 20%",
                }}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(17,17,17,0.7)] to-[rgb(17,17,17)]"></div>

                {/* Close button */}
                <button
                  onClick={card.handleClick}
                  className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-black/80 transition-colors z-10"
                >
                  <X className="text-white" size={20} />
                </button>
              </motion.div>
            )}

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="px-8 py-6"
            >
              <div className={`${!isTrailer && "mt-[-4rem]"} relative z-10`}>
                {/* Movie Title and Add/Remove Button */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h1 className="text-gray-200 font-black text-3xl mb-2">{data.title || data.name}</h1>

                    {/* Content type badge */}
                    {!isCast && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-700/30 text-violet-200 border border-violet-500/30">
                        {data?.imdb_id ? "Movie" : "TV Show"}
                      </span>
                    )}
                  </div>

                  {!isCast && (
                    <button
                      onClick={handleDispatch}
                      className={`p-3 rounded-full shadow-lg ${
                        click
                          ? "bg-violet-700 text-white hover:bg-violet-800"
                          : "bg-white text-gray-800 hover:bg-gray-100"
                      } hover:scale-105 transition-all duration-300`}
                      aria-label={click ? "Remove from list" : "Add to list"}
                    >
                      {click ? <Minus size={20} /> : <Plus size={20} />}
                    </button>
                  )}
                </div>

                {/* Movie Metadata */}
                {!isCast && (
                  <div className="bg-[rgba(30,30,30,0.6)] backdrop-blur-sm p-4 rounded-lg mb-5 border border-gray-800/50">
                    <div className="flex flex-wrap gap-3">
                      {/* Year */}
                      {(data?.first_air_date || data?.release_date) && (
                        <div className="flex items-center gap-1.5">
                          <div className="w-8 h-8 rounded-full bg-gray-800/80 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-gray-400"
                            >
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                              <line x1="16" y1="2" x2="16" y2="6"></line>
                              <line x1="8" y1="2" x2="8" y2="6"></line>
                              <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                          </div>
                          <span className="text-gray-300 text-sm">
                            {data?.first_air_date?.split("-")[0] || data?.release_date?.split("-")[0]}
                          </span>
                        </div>
                      )}

                      {/* Runtime */}
                      {data?.runtime && (
                        <div className="flex items-center gap-1.5">
                          <div className="w-8 h-8 rounded-full bg-gray-800/80 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-gray-400"
                            >
                              <circle cx="12" cy="12" r="10"></circle>
                              <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                          </div>
                          <span className="text-gray-300 text-sm">
                            {timeConvert(data?.runtime || data?.episode_run_time)}
                          </span>
                        </div>
                      )}

                      {/* Rating */}
                      {data?.vote_average && (
                        <div className="flex items-center gap-1.5">
                          <div className="w-8 h-8 rounded-full bg-gray-800/80 flex items-center justify-center">
                            <Star size={16} className="text-yellow-400 fill-yellow-400" />
                          </div>
                          <span className="text-gray-300 text-sm">{data.vote_average.toFixed(1)}/10</span>
                        </div>
                      )}

                      {/* Seasons */}
                      {!data.imdb_id && data?.number_of_seasons && (
                        <div className="flex items-center gap-1.5">
                          <div className="w-8 h-8 rounded-full bg-gray-800/80 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-gray-400"
                            >
                              <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
                              <polyline points="17 2 12 7 7 2"></polyline>
                            </svg>
                          </div>
                          <span className="text-gray-300 text-sm">
                            {data?.number_of_seasons} {data?.number_of_seasons === 1 ? "Season" : "Seasons"}
                          </span>
                        </div>
                      )}

                      {/* Episodes */}
                      {!data.imdb_id && data?.number_of_episodes && (
                        <div className="flex items-center gap-1.5">
                          <div className="w-8 h-8 rounded-full bg-gray-800/80 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-gray-400"
                            >
                              <polygon points="23 7 16 12 23 17 23 7"></polygon>
                              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                            </svg>
                          </div>
                          <span className="text-gray-300 text-sm">{data?.number_of_episodes} Episodes</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Overview */}
                <div className="bg-[rgba(30,30,30,0.4)] backdrop-blur-sm p-4 rounded-lg mb-6 border-l-4 border-violet-700/50">
                  <p className="text-gray-300 text-sm leading-relaxed">{data.overview || data.biography}</p>
                </div>

                {/* Action Buttons */}
                {!isCast && (
                  <div className="flex flex-wrap gap-3 mb-8">
                    <Link href={isTV ? `/tv/${data.id}` : `/movie/${data.id}`} onClick={card.handleClick}>
                      <button className="py-2.5 px-6 bg-gradient-to-r from-violet-700 to-purple-700 hover:from-violet-800 hover:to-purple-800 text-white rounded-md font-medium flex items-center gap-2 transition-colors shadow-lg shadow-violet-900/30">
                        <Play size={18} className="fill-white" />
                        <span>Play Now</span>
                      </button>
                    </Link>

                    {trailer && (
                      <button
                        onClick={() => setIsTrailer(true)}
                        className="py-2.5 px-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-md font-medium flex items-center gap-2 transition-colors shadow-lg shadow-red-900/30"
                      >
                        <Youtube size={18} />
                        <span>Watch Trailer</span>
                      </button>
                    )}

                    {data?.imdb_id && (
                      <a
                        href={`https://www.imdb.com/title/${data?.imdb_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-6 bg-[rgba(30,30,30,0.8)] hover:bg-[rgba(40,40,40,0.8)] text-white rounded-md font-medium flex items-center gap-2 transition-colors backdrop-blur-sm border border-gray-700/50"
                      >
                        <ExternalLink size={18} />
                        <span>IMDB</span>
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Similar content or Known For section */}
              {(similar?.length > 0 || castMovies?.length > 0) && (
                <div className="bg-[rgb(22,22,22)] p-4 rounded-lg mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-200">{isCast ? "Known For" : "You May Also Like"}</h2>

                    {/* Pagination controls */}
                    {(isCast ? castMovies?.length : similar?.length) > itemsPerPage && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={prevPage}
                          disabled={currentPage === 0}
                          className={`p-1.5 rounded-full ${currentPage === 0 ? "bg-gray-700 text-gray-500 cursor-not-allowed" : "bg-violet-700/50 text-white hover:bg-violet-700"} transition-colors`}
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <button
                          onClick={nextPage}
                          disabled={
                            currentPage >= Math.ceil((isCast ? castMovies?.length : similar?.length) / itemsPerPage) - 1
                          }
                          className={`p-1.5 rounded-full ${currentPage >= Math.ceil((isCast ? castMovies?.length : similar?.length) / itemsPerPage) - 1 ? "bg-gray-700 text-gray-500 cursor-not-allowed" : "bg-violet-700/50 text-white hover:bg-violet-700"} transition-colors`}
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {getCurrentItems().map((item: any, index: number) => (
                      <SimilarCard
                        key={index}
                        {...item}
                        heading={heading}
                        handleSimilar={card.handleSimilar}
                        handlePage={() => handleSimilarClick(item)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </motion.div>
    </Backdrop>
  )
}

export default CardModal

