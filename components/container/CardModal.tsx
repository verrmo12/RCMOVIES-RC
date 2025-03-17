"use client"

import { useEffect, useState, useRef } from "react"
import Backdrop from "../Backdrop"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { addToMyList, removeFromList } from "../../redux/actions/myListAction"
import { useRouter } from "next/router"
import Link from "next/link"
import ReactPlayer from "react-player/lazy"
import { toast } from "react-toastify"
import Msg from "../Msg"
import SimilarCard from "./SimilarCard"

// Icons
import { Play, X, Plus, Minus, Youtube, Star, ExternalLink } from "lucide-react"

function timeConvert(n: any) {
  if (!n) return "N/A"
  var num = n
  var hours = num / 60
  var rhours = Math.floor(hours)
  var minutes = (hours - rhours) * 60
  var rminutes = Math.round(minutes)
  return rhours + "hr " + rminutes + "min"
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
  const [click, setClick] = useState(false)
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
        setClick(current.length > 0)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
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
    setSimilar(res?.results?.slice(0, 9))
    return res?.results
  }

  const fetchCastMovies = async () => {
    const url = `https://api.themoviedb.org/3/person/${cardId}/combined_credits?api_key=cfe422613b250f702980a3bbf9e90716`
    const req = await fetch(url)
    const res = await req.json()
    setCastMovies(res?.cast)
    return res?.cast
  }

  const handleDispatch = () => {
    if (click) {
      dispatch(removeFromList(data.id))
      setClick(false)
      toast.error(<Msg title={data?.title || data?.name} message="Was Removed from your List" />, { theme: "dark" })
    } else {
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
                  boxShadow: "rgb(17 17 17) 0px 11px 0px -10px inset, rgb(17 17 17) 0px -92px 46px -10px inset",
                }}
              >
                <button
                  onClick={card.handleClick}
                  className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-black/80 transition-colors"
                >
                  <X className="text-white" size={20} />
                </button>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="px-8 py-6"
            >
              <div className={`${!isTrailer && "mt-[-4rem]"} relative z-10`}>
                <div className="flex justify-between items-start">
                  <h1 className="text-gray-200 font-black text-3xl mb-2 pr-12">{data.title || data.name}</h1>

                  {!isCast && (
                    <button
                      onClick={handleDispatch}
                      className={`p-2 rounded-full ${click ? "bg-violet-700 text-white" : "bg-gray-200 text-black"} hover:scale-105 transition-all duration-300`}
                      aria-label={click ? "Remove from list" : "Add to list"}
                    >
                      {click ? <Minus size={20} /> : <Plus size={20} />}
                    </button>
                  )}
                </div>

                {!isCast && (
                  <div className="text-[#b3b3b3] font-normal flex flex-wrap gap-2 mb-4">
                    {(data?.first_air_date || data?.release_date) && (
                      <span className="px-2 py-1 bg-[rgb(30,30,30)] font-medium rounded text-sm">
                        {data?.first_air_date?.split("-")[0] || data?.release_date?.split("-")[0]}
                      </span>
                    )}

                    {data?.runtime && (
                      <span className="px-2 py-1 bg-[rgb(30,30,30)] font-medium rounded text-sm">
                        {timeConvert(data?.runtime || data?.episode_run_time)}
                      </span>
                    )}

                    <span className="px-2 py-1 bg-[rgb(30,30,30)] font-medium rounded text-sm">
                      {data?.imdb_id ? "Movie" : "TV"}
                    </span>

                    {data?.vote_average && (
                      <span className="px-2 py-1 bg-[rgb(30,30,30)] font-medium rounded text-sm flex items-center gap-1">
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        {data.vote_average.toFixed(1)}
                      </span>
                    )}

                    {!data.imdb_id && data?.number_of_seasons && (
                      <span className="px-2 py-1 bg-[rgb(30,30,30)] font-medium rounded text-sm">
                        {data?.number_of_seasons} {data?.number_of_seasons === 1 ? "Season" : "Seasons"}
                      </span>
                    )}

                    {!data.imdb_id && data?.number_of_episodes && (
                      <span className="px-2 py-1 bg-[rgb(30,30,30)] font-medium rounded text-sm">
                        {data?.number_of_episodes} Episodes
                      </span>
                    )}
                  </div>
                )}
              </div>

              <p className="text-zinc-300 text-sm leading-relaxed mb-6">{data.overview || data.biography}</p>

              {!isCast && (
                <div className="flex flex-wrap gap-3 mb-8">
                  <Link href={isTV ? `/tv/${data.id}` : `/movie/${data.id}`} onClick={card.handleClick}>
                    <button className="py-2 px-5 bg-violet-700 hover:bg-violet-800 text-white rounded-md font-medium flex items-center gap-2 transition-colors">
                      <Play size={18} className="fill-white" />
                      <span>Play Now</span>
                    </button>
                  </Link>

                  {trailer && (
                    <button
                      onClick={() => setIsTrailer(true)}
                      className="py-2 px-5 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium flex items-center gap-2 transition-colors"
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
                      className="py-2 px-5 bg-[rgb(30,30,30)] hover:bg-[rgb(40,40,40)] text-white rounded-md font-medium flex items-center gap-2 transition-colors"
                    >
                      <ExternalLink size={18} />
                      <span>IMDB</span>
                    </a>
                  )}
                </div>
              )}

              {(similar?.length > 0 || castMovies?.length > 0) && (
                <>
                  <h2 className="text-xl font-bold text-gray-200 mb-4 mt-8">
                    {isCast ? "Known For" : "You May Also Like"}
                  </h2>

                  <div className="grid grid-cols-3 gap-3 mb-8">
                    {isCast
                      ? castMovies
                          ?.slice(0, 9)
                          .map((item: any, index: number) => (
                            <SimilarCard
                              key={index}
                              {...item}
                              heading={heading}
                              handleSimilar={card.handleSimilar}
                              handlePage={() => handleSimilarClick(item)}
                            />
                          ))
                      : similar?.map((item: any, index: number) => (
                          <SimilarCard
                            key={index}
                            {...item}
                            heading={heading}
                            handleSimilar={card.handleSimilar}
                            handlePage={() => handleSimilarClick(item)}
                          />
                        ))}
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </motion.div>
    </Backdrop>
  )
}

export default CardModal

