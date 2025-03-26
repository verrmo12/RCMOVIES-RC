import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSelector, useDispatch } from "react-redux"
import { addToMyList, removeFromList } from "../../redux/actions/myListAction"
import { SetContinueWatching } from "../../redux/actions/tvShowAction"
import { Play, Plus, Minus, Youtube, Star, Clock, Calendar, ExternalLink } from "lucide-react"
import HomeContainer from "../../components/container/HomeContainer"
import Layout from "../../components/layout/Layout"
import CardModal from "../../components/container/CardModal"

// Subtitle data
const subtitles = [
  { url: "https://ccb.megaresources.co/56/26/5626ce43b9c4f3419805884cba4b0505/ara-6.vtt", lang: "Arabic" },
  { url: "https://ccb.megaresources.co/56/26/5626ce43b9c4f3419805884cba4b0505/eng-2.vtt", lang: "English" },
  { url: "https://ccb.megaresources.co/56/26/5626ce43b9c4f3419805884cba4b0505/fre-7.vtt", lang: "French" },
  { url: "https://ccb.megaresources.co/56/26/5626ce43b9c4f3419805884cba4b0505/ger-8.vtt", lang: "German" },
  { url: "https://ccb.megaresources.co/56/26/5626ce43b9c4f3419805884cba4b0505/ita-9.vtt", lang: "Italian" },
  {
    url: "https://ccb.megaresources.co/56/26/5626ce43b9c4f3419805884cba4b0505/por-3.vtt",
    lang: "Portuguese - Portuguese(Brazil)",
  },
  { url: "https://ccb.megaresources.co/56/26/5626ce43b9c4f3419805884cba4b0505/rus-10.vtt", lang: "Russian" },
  { url: "https://ccb.megaresources.co/56/26/5626ce43b9c4f3419805884cba4b0505/spa-5.vtt", lang: "Spanish" },
  {
    url: "https://ccb.megaresources.co/56/26/5626ce43b9c4f3419805884cba4b0505/spa-4.vtt",
    lang: "Spanish - Spanish(Latin_America)",
  },
]

function timeConvert(n: any) {
  if (!n) return ""
  var num = n
  var hours = num / 60
  var rhours = Math.floor(hours)
  var minutes = (hours - rhours) * 60
  var rminutes = Math.round(minutes)
  return rhours + "h " + rminutes + "m"
}

export default function MoviePage(props: any) {
  const [data, setData] = useState<any>(props.resp)
  const [recommended, setRecommended] = useState<any>([])
  const [casts, setCasts] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [imdbId, setImdbId] = useState<any>("")
  const [trailerKey, setTrailerKey] = useState<string>("")
  const [showTrailer, setShowTrailer] = useState<boolean>(false)
  const [selected, setSelected] = useState(false)
  const [cardId, setCardId] = useState(null)

  const { MyList, ContinueWatching } = useSelector((state: any) => state)
  const [inMyList, setInMyList] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = router.query
  const playerRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (id) {
      setLoading(true)
      Promise.all([fetchMovieData(), fetchImdbId(), fetchRecommended(), fetchCasts(), fetchTrailer()]).finally(() => {
        setLoading(false)
      })

      // Check if movie is in user's list
      const current = MyList.filter((item: any) => item.id == id)
      setInMyList(current.length > 0)
    }
  }, [id])

  const fetchMovieData = async () => {
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}?&api_key=875cecec683eb9cfc4cb845ead32e16e`
      const req = await fetch(url)
      const res = await req.json()
      setData(res)
      return res
    } catch (error) {
      console.error("Error fetching movie data:", error)
    }
  }

  const fetchImdbId = async () => {
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=875cecec683eb9cfc4cb845ead32e16e`
      const req = await fetch(url)
      const res = await req.json()
      setImdbId(res.imdb_id)
      return res
    } catch (error) {
      console.error("Error fetching IMDB ID:", error)
    }
  }

  const fetchRecommended = async () => {
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=875cecec683eb9cfc4cb845ead32e16e`
      const req = await fetch(url)
      const res = await req.json()
      setRecommended(res.results)
      return res
    } catch (error) {
      console.error("Error fetching recommendations:", error)
    }
  }

  const fetchCasts = async () => {
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=875cecec683eb9cfc4cb845ead32e16e`
      const req = await fetch(url)
      const res = await req.json()
      setCasts(res.cast)
      return res
    } catch (error) {
      console.error("Error fetching cast data:", error)
    }
  }

  const fetchTrailer = async () => {
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=875cecec683eb9cfc4cb845ead32e16e`
      const req = await fetch(url)
      const res = await req.json()
      const trailer = res.results?.find((video: any) => video.type === "Trailer")
      if (trailer) {
        setTrailerKey(trailer.key)
      }
      return res
    } catch (error) {
      console.error("Error fetching trailer:", error)
    }
  }

  const handleIframe = () => {
    // Add to continue watching if not already there
    const currentWatching = ContinueWatching.filter((item: any) => item.id == id)
    if (currentWatching.length === 0) {
      dispatch(
        SetContinueWatching({
          id: id,
          poster_path: data?.poster_path,
          backdrop_path: data?.backdrop_path,
          title: data?.title,
          media_type: "movie",
          time: Date.now(),
        }),
      )
    }
  }

  const handleMyListToggle = () => {
    if (inMyList) {
      dispatch(removeFromList(data.id))
      setInMyList(false)
    } else {
      dispatch(
        addToMyList({
          id: data.id,
          title: data.title,
          poster_path: data.poster_path,
          backdrop_path: data.backdrop_path,
          overview: data.overview,
          media_type: "movie",
        }),
      )
      setInMyList(true)
    }
  }

  const handleCardClick = (id: any) => {
    setCardId(id)
    setSelected(true)
  }

  const handleModalClose = () => {
    setSelected(false)
  }

  const handleSimilar = () => {
    setSelected(false)
  }

  return (
    <Layout title={data?.title || "Movie"}>
      <AnimatePresence>
        {selected && (
          <CardModal
            {...recommended.find((item: any) => item.id === cardId)}
            handleClick={handleModalClose}
            handleSimilar={handleSimilar}
            id={cardId}
            heading="Recommended Movies"
            media_type="movie"
          />
        )}
      </AnimatePresence>

      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-t-violet-700 border-r-transparent border-b-violet-700 border-l-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Movie Hero Section */}
          <div
            className="relative w-full h-[50vh] md:h-[70vh] bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgb(17,17,17)), url(https://image.tmdb.org/t/p/original/${data?.backdrop_path})`,
              backgroundPosition: "center 20%",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[rgb(17,17,17)] via-[rgba(17,17,17,0.8)] to-transparent"></div>

            <div className="w-full px-6 md:px-10 lg:px-16 h-full flex flex-col justify-end pb-12 relative z-10">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Poster */}
                <div className="hidden md:block w-64 h-96 rounded-lg overflow-hidden shadow-2xl transform translate-y-8">
                  <img
                    src={
                      data?.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${data.poster_path}`
                        : "/placeholder.svg?height=384&width=256"
                    }
                    alt={data?.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Movie Info */}
                <div className="flex-1">
                  <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{data?.title}</h1>

                  <div className="flex flex-wrap gap-3 mb-4">
                    {data?.release_date && (
                      <div className="flex items-center gap-1.5 bg-[rgba(255,255,255,0.1)] backdrop-blur-sm px-3 py-1.5 rounded-full text-white">
                        <Calendar size={16} />
                        <span>{data.release_date.split("-")[0]}</span>
                      </div>
                    )}

                    {data?.vote_average && (
                      <div className="flex items-center gap-1.5 bg-[rgba(255,255,255,0.1)] backdrop-blur-sm px-3 py-1.5 rounded-full text-white">
                        <Star size={16} className="text-yellow-400 fill-yellow-400" />
                        <span>{data.vote_average.toFixed(1)}</span>
                      </div>
                    )}

                    {data?.runtime && (
                      <div className="flex items-center gap-1.5 bg-[rgba(255,255,255,0.1)] backdrop-blur-sm px-3 py-1.5 rounded-full text-white">
                        <Clock size={16} />
                        <span>{timeConvert(data.runtime)}</span>
                      </div>
                    )}

                    {data?.genres &&
                      data.genres.map((genre: any) => (
                        <div
                          key={genre.id}
                          className="bg-[rgba(255,255,255,0.1)] backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm"
                        >
                          {genre.name}
                        </div>
                      ))}
                  </div>

                  <p className="text-gray-300 mb-6 max-w-2xl">{data?.overview}</p>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => playerRef.current?.scrollIntoView({ behavior: "smooth" })}
                      className="py-2 px-5 bg-violet-700 hover:bg-violet-800 text-white rounded-md font-medium flex items-center gap-2 transition-colors"
                    >
                      <Play size={18} className="fill-white" />
                      <span>Watch Now</span>
                    </button>

                    {trailerKey && (
                      <button
                        onClick={() => setShowTrailer(true)}
                        className="py-2 px-5 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium flex items-center gap-2 transition-colors"
                      >
                        <Youtube size={18} />
                        <span>Watch Trailer</span>
                      </button>
                    )}

                    <button
                      onClick={handleMyListToggle}
                      className={`py-2 px-5 ${inMyList ? "bg-violet-700 text-white" : "bg-[rgba(255,255,255,0.1)] text-white"} rounded-md font-medium flex items-center gap-2 transition-colors`}
                    >
                      {inMyList ? (
                        <>
                          <Minus size={18} />
                          <span>Remove from List</span>
                        </>
                      ) : (
                        <>
                          <Plus size={18} />
                          <span>Add to List</span>
                        </>
                      )}
                    </button>

                    {imdbId && (
                      <a
                        href={`https://www.imdb.com/title/${imdbId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-5 bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] text-white rounded-md font-medium flex items-center gap-2 transition-colors"
                      >
                        <ExternalLink size={18} />
                        <span>IMDB</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trailer Modal */}
          <AnimatePresence>
            {showTrailer && (
              <div
                className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                onClick={() => setShowTrailer(false)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                    className="w-full h-full"
                    allowFullScreen
                    allow="autoplay"
                  ></iframe>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Player Section */}
          <div className="bg-[rgb(17,17,17)] py-12">
            <div className="container mx-auto px-6 md:px-10 lg:px-16">
              <h2 className="text-2xl font-bold text-white mb-6">Watch {data?.title}</h2>

              <div className="bg-[rgb(22,22,22)] rounded-lg p-2 md:p-4 shadow-lg">
                <iframe
                  ref={playerRef}
                  onLoadCapture={handleIframe}
                  className="w-full aspect-video rounded-md"
                  src={`https://vidlink.pro/movie/${id}`}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>

          {/* Cast Section */}
          <div className="bg-[rgb(17,17,17)] py-8">
            <div className="container mx-auto px-6 md:px-10 lg:px-16">
              <HomeContainer swiperId={1} Data={casts} heading="Casts" />
            </div>
          </div>

          {/* Recommended Movies */}
          <div className="bg-[rgb(17,17,17)] py-8">
            <div className="container mx-auto px-6 md:px-10 lg:px-16">
              <div className="mb-8">
                <div className="flex flex-col gap-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-200">Movies You May Also Like</h2>

                  <div className="relative">
                    <span className="block h-1 w-16 bg-violet-700 rounded-full"></span>
                  </div>

                  <p className="text-gray-400 max-w-3xl">
                    If you enjoyed {data?.title}, you might like these similar movies.
                  </p>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6"
              >
                {recommended.slice(0, 12).map((item: any, index: number) => (
                  <motion.div
                    key={item.id || index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-10"
                    onClick={() => handleCardClick(item.id)}
                  >
                    <div className="relative">
                      <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
                        <img
                          src={
                            item.poster_path
                              ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
                              : "/placeholder.svg?height=450&width=300"
                          }
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />

                        {item.vote_average && (
                          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
                            <Star size={12} className="text-yellow-400 fill-yellow-400" />
                            <span className="text-white text-xs font-medium">{item.vote_average.toFixed(1)}</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-2 px-1">
                        <h3 className="text-gray-200 font-medium text-sm truncate">{item.title}</h3>
                        <p className="text-gray-400 text-xs">{item.release_date?.split("-")[0] || "N/A"}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </>
      )}
    </Layout>
  )
}

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" }
}

export const getStaticProps = async (context: any) => {
  const id = context.params.id
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=cfe422613b250f702980a3bbf9e90716`

  try {
    const req = await fetch(url)
    const resp = await req.json()
    return {
      props: { resp },
      revalidate: 60 * 60, // Revalidate every hour
    }
  } catch (error) {
    console.error("Error fetching movie data:", error)
    return {
      notFound: true,
    }
  }
}

