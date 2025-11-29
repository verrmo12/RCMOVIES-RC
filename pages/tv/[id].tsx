import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSelector, useDispatch } from "react-redux"
import { addToMyList, removeFromList } from "../../redux/actions/myListAction"
import { SetContinueWatching, SetCurrentState } from "../../redux/actions/tvShowAction"
import {
  Play,
  Plus,
  Minus,
  Youtube,
  Star,
  Clock,
  Calendar,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Server,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  PhoneIcon as WhatsApp,
  TextIcon as Telegram,
  Mail,
} from "lucide-react"
import { toast } from "react-toastify"
import HomeContainer from "../../components/container/HomeContainer"
import Layout from "../../components/layout/Layout"
import CardModal from "../../components/container/CardModal"
import Msg from "../../components/Msg"

// Server options
const serverOptions = [
  {
    id: "server1",
    name: "Server 1",
    url: (id: string, season: number, episode: number) => `https://fmovies4u.com/embed/tmdb-tv-${id}/${season}/${episode}`,
  },
  {
    id: "server2",
    name: "Server 2",
      url: (id: string, season: number, episode: number) => `https://fmovies4u.in/embed/tmdb-tv-${id}/${season}/${episode}`,
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

export default function TvShowPage(props: any) {
  const [data, setData] = useState<any>(props.res)
  const [recommended, setRecommended] = useState<any>([])
  const [casts, setCasts] = useState<any>([])
  const [sEpisodes, setSEpisodes] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [imdbId, setImdbId] = useState<any>("")
  const [trailerKey, setTrailerKey] = useState<string>("")
  const [showTrailer, setShowTrailer] = useState<boolean>(false)
  const [selected, setSelected] = useState(false)
  const [cardId, setCardId] = useState(null)
  const [currentSeason, setCurrentSeason] = useState(1)
  const [showSeasons, setShowSeasons] = useState(true)
  const [showEpisodes, setShowEpisodes] = useState(true)
  const [firstEpName, setFirstEpName] = useState("")
  const [activeServer, setActiveServer] = useState("server1")
  const [showShareModal, setShowShareModal] = useState(false)

  const { MyList, CurrentState, ContinueWatching } = useSelector((state: any) => state)
  const [inMyList, setInMyList] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = router.query
  const playerRef = useRef<HTMLIFrameElement>(null)

  // Get current episode state
  const dataState: any = { ep_num: 1, season: 1 }
  CurrentState?.filter((item: any) => {
    if (item.id == id) {
      dataState["ep_num"] = item.episode_number
      dataState["season"] = item.season_number
      dataState["ep_name"] = item.episode_name
      dataState["episode_image"] = item.episode_image
    }
  })

  useEffect(() => {
    if (id) {
      setLoading(true)
      Promise.all([
        fetchTvData(),
        fetchImdbId(),
        fetchRecommended(),
        fetchCasts(),
        fetchTrailer(),
        fetchSeasonEpisodes(),
      ]).finally(() => {
        setLoading(false)
      })

      // Check if show is in user's list
      const current = MyList.filter((item: any) => item.id == id)
      setInMyList(current.length > 0)
    }
  }, [id, currentSeason])

  const fetchTvData = async () => {
    try {
      const url = `https://api.themoviedb.org/3/tv/${id}?&api_key=875cecec683eb9cfc4cb845ead32e16e`
      const req = await fetch(url)
      const res = await req.json()
      setData(res)
      return res
    } catch (error) {
      console.error("Error fetching TV data:", error)
    }
  }

  const fetchImdbId = async () => {
    try {
      const url = `https://api.themoviedb.org/3/tv/${id}/external_ids?api_key=875cecec683eb9cfc4cb845ead32e16e`
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
      const url = `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=875cecec683eb9cfc4cb845ead32e16e`
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
      const url = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=875cecec683eb9cfc4cb845ead32e16e`
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
      const url = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=875cecec683eb9cfc4cb845ead32e16e`
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

  const fetchSeasonEpisodes = async () => {
    try {
      const url = `https://api.themoviedb.org/3/tv/${id}/season/${currentSeason}?api_key=875cecec683eb9cfc4cb845ead32e16e`
      const req = await fetch(url)
      const res = await req.json()
      setSEpisodes(res.episodes || [])
      if (res.episodes && res.episodes.length > 0) {
        setFirstEpName(res.episodes[0]?.name)
      }
      return res
    } catch (error) {
      console.error("Error fetching season episodes:", error)
    }
  }

  const handleIframe = () => {
    // Add to continue watching if not already there
    if (dataState.length < 1) {
      dataState["ep_name"] = firstEpName
      dataState["episode_image"] = sEpisodes[0]?.still_path
    }

    dispatch(
      SetContinueWatching({
        id: id,
        poster_path: data?.poster_path,
        backdrop_path: dataState?.episode_image || (sEpisodes[0] && sEpisodes[0].still_path),
        title: data?.name,
        season: dataState?.season || 1,
        episode: dataState?.ep_num || 1,
        episode_name: dataState?.ep_name || (sEpisodes[0] && sEpisodes[0].name),
        media_type: "tv",
        time: Date.now(),
      }),
    )
  }

  const handleMyListToggle = () => {
    if (inMyList) {
      dispatch(removeFromList(data.id))
      setInMyList(false)
    } else {
      dispatch(
        addToMyList({
          id: data.id,
          title: data.name,
          poster_path: data.poster_path,
          backdrop_path: data.backdrop_path,
          overview: data.overview,
          media_type: "tv",
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

  const handleServerChange = (serverId: string) => {
    setActiveServer(serverId)
  }

  const handlePrevEpisode = () => {
    if (dataState.ep_num > 1) {
      const filterEp = sEpisodes.filter((t: any) => t.episode_number === Number.parseInt(dataState.ep_num) - 1)[0]
      dispatch(
        SetCurrentState({
          id: id,
          episode_number: Number.parseInt(dataState.ep_num) - 1,
          episode_name: filterEp.name,
          season_number: filterEp.season_number,
          episode_image: filterEp.still_path,
        }),
      )
    }
  }

  const handleNextEpisode = () => {
    if (dataState.ep_num < sEpisodes?.length) {
      const filterEp = sEpisodes.filter((t: any) => t.episode_number === Number.parseInt(dataState.ep_num) + 1)[0]
      dispatch(
        SetCurrentState({
          id: id,
          episode_number: Number.parseInt(dataState.ep_num) + 1,
          episode_name: filterEp.name,
          season_number: filterEp.season_number,
          episode_image: filterEp.still_path,
        }),
      )
    }
  }

  const handleEpisodeSelect = (ep: any) => {
    dispatch(
      SetCurrentState({
        id: id,
        episode_number: ep.episode_number,
        episode_name: ep.name,
        season_number: ep.season_number,
        episode_image: ep.still_path,
      }),
    )
  }

  const handleShare = () => {
    setShowShareModal(true)
  }

  const handleCopyLink = () => {
    const url = `${window.location.origin}/tv/${id}`
    navigator.clipboard.writeText(url)
    toast.success(<Msg title="Link Copied" message="TV show link copied to clipboard" type="success" />, {
      theme: "dark",
    })
    setShowShareModal(false)
  }

  const getShareUrl = (platform: string) => {
    const url = encodeURIComponent(`${window.location.origin}/tv/${id}`)
    const title = encodeURIComponent(`Watch ${data?.name} on RCMOVIES`)

    switch (platform) {
      case "facebook":
        return `https://www.facebook.com/sharer/sharer.php?u=${url}`
      case "twitter":
        return `https://twitter.com/intent/tweet?url=${url}&text=${title}`
      case "linkedin":
        return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
      case "whatsapp":
        return `https://api.whatsapp.com/send?text=${title} ${url}`
      case "telegram":
        return `https://t.me/share/url?url=${url}&text=${title}`
      case "email":
        return `mailto:?subject=${title}&body=Check out this TV show: ${url}`
      default:
        return "#"
    }
  }

  return (
    <Layout title={data?.name || "TV Show"}>
      <AnimatePresence>
        {selected && (
          <CardModal
            {...recommended.find((item: any) => item.id === cardId)}
            handleClick={handleModalClose}
            handleSimilar={handleSimilar}
            id={cardId}
            heading="Recommended Shows"
            media_type="tv"
          />
        )}
      </AnimatePresence>

      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-t-violet-700 border-r-transparent border-b-violet-700 border-l-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* TV Show Hero Section */}
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
                    alt={data?.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* TV Show Info */}
                <div className="flex-1">
                  <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{data?.name}</h1>

                  <div className="flex flex-wrap gap-3 mb-4">
                    {data?.first_air_date && (
                      <div className="flex items-center gap-1.5 bg-[rgba(255,255,255,0.1)] backdrop-blur-sm px-3 py-1.5 rounded-full text-white">
                        <Calendar size={16} />
                        <span>{data.first_air_date.split("-")[0]}</span>
                      </div>
                    )}

                    {data?.vote_average && (
                      <div className="flex items-center gap-1.5 bg-[rgba(255,255,255,0.1)] backdrop-blur-sm px-3 py-1.5 rounded-full text-white">
                        <Star size={16} className="text-yellow-400 fill-yellow-400" />
                        <span>{data.vote_average.toFixed(1)}</span>
                      </div>
                    )}

                    {data?.number_of_seasons && (
                      <div className="flex items-center gap-1.5 bg-[rgba(255,255,255,0.1)] backdrop-blur-sm px-3 py-1.5 rounded-full text-white">
                        <Clock size={16} />
                        <span>
                          {data.number_of_seasons} {data.number_of_seasons === 1 ? "Season" : "Seasons"}
                        </span>
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

                    <button
                      onClick={handleShare}
                      className="py-2 px-5 bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] text-white rounded-md font-medium flex items-center gap-2 transition-colors"
                    >
                      <Share2 size={18} />
                      <span>Share</span>
                    </button>
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

          <AnimatePresence>
            {showShareModal && (
              <div
                className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                onClick={() => setShowShareModal(false)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="w-full max-w-md bg-[rgb(22,22,22)] rounded-lg overflow-hidden shadow-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Share "{data?.name}"</h3>

                    <div className="grid grid-cols-4 gap-4 mb-6">
                      <a
                        href={getShareUrl("facebook")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2"
                      >
                        <div className="w-12 h-12 rounded-full bg-[#1877F2] flex items-center justify-center hover:opacity-90 transition-opacity">
                          <Facebook size={24} className="text-white" />
                        </div>
                        <span className="text-gray-300 text-xs">Facebook</span>
                      </a>

                      <a
                        href={getShareUrl("twitter")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2"
                      >
                        <div className="w-12 h-12 rounded-full bg-[#1DA1F2] flex items-center justify-center hover:opacity-90 transition-opacity">
                          <Twitter size={24} className="text-white" />
                        </div>
                        <span className="text-gray-300 text-xs">Twitter</span>
                      </a>

                      <a
                        href={getShareUrl("whatsapp")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2"
                      >
                        <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center hover:opacity-90 transition-opacity">
                          <WhatsApp size={24} className="text-white" />
                        </div>
                        <span className="text-gray-300 text-xs">WhatsApp</span>
                      </a>

                      <a
                        href={getShareUrl("telegram")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2"
                      >
                        <div className="w-12 h-12 rounded-full bg-[#0088cc] flex items-center justify-center hover:opacity-90 transition-opacity">
                          <Telegram size={24} className="text-white" />
                        </div>
                        <span className="text-gray-300 text-xs">Telegram</span>
                      </a>

                      <a
                        href={getShareUrl("linkedin")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2"
                      >
                        <div className="w-12 h-12 rounded-full bg-[#0A66C2] flex items-center justify-center hover:opacity-90 transition-opacity">
                          <Linkedin size={24} className="text-white" />
                        </div>
                        <span className="text-gray-300 text-xs">LinkedIn</span>
                      </a>

                      <a
                        href={getShareUrl("email")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2"
                      >
                        <div className="w-12 h-12 rounded-full bg-[#EA4335] flex items-center justify-center hover:opacity-90 transition-opacity">
                          <Mail size={24} className="text-white" />
                        </div>
                        <span className="text-gray-300 text-xs">Email</span>
                      </a>

                      <button onClick={handleCopyLink} className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-violet-700 flex items-center justify-center hover:bg-violet-600 transition-colors">
                          <Copy size={24} className="text-white" />
                        </div>
                        <span className="text-gray-300 text-xs">Copy Link</span>
                      </button>
                    </div>

                    <button
                      onClick={() => setShowShareModal(false)}
                      className="w-full py-2 px-4 bg-[rgb(30,30,30)] hover:bg-[rgb(40,40,40)] text-white rounded-md transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Player Section */}
          <div className="bg-[rgb(17,17,17)] py-12">
            <div className="container mx-auto px-6 md:px-10 lg:px-16">
              <div className="flex flex-wrap items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {data?.name} - Season {dataState.season}, Episode {dataState.ep_num}
                  {dataState.ep_name && (
                    <span className="text-lg font-normal ml-2 text-gray-300">- {dataState.ep_name}</span>
                  )}
                </h2>

                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button
                    onClick={handlePrevEpisode}
                    disabled={dataState.ep_num <= 1}
                    className={`py-2 px-4 rounded-md flex items-center gap-1 transition-colors ${
                      dataState.ep_num <= 1
                        ? "bg-[rgb(30,30,30)] text-gray-500 cursor-not-allowed"
                        : "bg-[rgb(30,30,30)] text-gray-200 hover:bg-violet-700 hover:text-white"
                    }`}
                  >
                    <ChevronLeft size={16} />
                    <span>Prev</span>
                  </button>

                  <button
                    onClick={handleNextEpisode}
                    disabled={dataState.ep_num >= sEpisodes?.length}
                    className={`py-2 px-4 rounded-md flex items-center gap-1 transition-colors ${
                      dataState.ep_num >= sEpisodes?.length
                        ? "bg-[rgb(30,30,30)] text-gray-500 cursor-not-allowed"
                        : "bg-[rgb(30,30,30)] text-gray-200 hover:bg-violet-700 hover:text-white"
                    }`}
                  >
                    <span>Next</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              <div className="bg-[rgb(22,22,22)] rounded-lg p-2 md:p-4 shadow-lg">
                {/* Server 1 */}
                {activeServer === "server1" && (
                  <iframe
                    ref={playerRef}
                    onLoadCapture={handleIframe}
                    className="w-full aspect-video rounded-md"
                    src={`https://fmovies4u.com/embed/tmdb-tv-${id}/${dataState?.season}/${dataState?.ep_num}`}
                    allowFullScreen
                  ></iframe>
                )}

                {/* Server 2 */}
                {activeServer === "server2" && (
                  <iframe
                    ref={playerRef}
                    onLoadCapture={handleIframe}
                    className="w-full aspect-video rounded-md"
                    src={`https://fmovies4u.in/embed/tmdb-tv-${id}/${dataState?.season}/${dataState?.ep_num}`}
                    allowFullScreen
                  ></iframe>
                )}
              </div>

              {/* Server Selection */}
              <div className="flex justify-center mt-4 mb-6">
                <div className="flex flex-wrap gap-2 justify-center">
                  {serverOptions.map((server) => (
                    <button
                      key={server.id}
                      onClick={() => handleServerChange(server.id)}
                      className={`py-2 px-4 rounded-md flex items-center gap-2 transition-colors ${
                        activeServer === server.id
                          ? "bg-violet-700 text-white"
                          : "bg-[rgb(30,30,30)] text-gray-300 hover:bg-[rgb(40,40,40)]"
                      }`}
                    >
                      <Server size={16} />
                      <span>{server.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Share Section */}
              <div className="mt-6 bg-[rgb(22,22,22)] rounded-lg p-4 shadow-lg">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Enjoying the show?</h3>
                    <p className="text-gray-400 text-sm">Share it with your friends and family</p>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={getShareUrl("facebook")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center hover:opacity-90 transition-opacity"
                    >
                      <Facebook size={18} className="text-white" />
                    </a>

                    <a
                      href={getShareUrl("twitter")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-[#1DA1F2] flex items-center justify-center hover:opacity-90 transition-opacity"
                    >
                      <Twitter size={18} className="text-white" />
                    </a>

                    <a
                      href={getShareUrl("whatsapp")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center hover:opacity-90 transition-opacity"
                    >
                      <WhatsApp size={18} className="text-white" />
                    </a>

                    <button
                      onClick={handleShare}
                      className="py-2 px-4 bg-violet-700 hover:bg-violet-600 text-white rounded-md flex items-center gap-2 transition-colors"
                    >
                      <Share2 size={18} />
                      <span className="hidden sm:inline">More Options</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Seasons & Episodes Section */}
          <div className="bg-[rgb(17,17,17)] py-8">
            <div className="container mx-auto px-6 md:px-10 lg:px-16">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Seasons */}
                <div className="lg:col-span-1">
                  <button
                    onClick={() => setShowSeasons(!showSeasons)}
                    className="w-full bg-[rgb(22,22,22)] hover:bg-[rgb(30,30,30)] p-4 rounded-lg mb-4 flex items-center justify-between transition-colors"
                  >
                    <span className="text-lg font-semibold text-white">Seasons</span>
                    {showSeasons ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>

                  <AnimatePresence>
                    {showSeasons && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3 mb-6">
                          {data?.seasons
                            ?.filter((f: any) => f.name !== "Specials" && f.air_date !== null)
                            .map((season: any) => (
                              <div
                                key={season.id}
                                onClick={() => setCurrentSeason(season.season_number)}
                                className={`${
                                  season.season_number === dataState?.season
                                    ? "border-violet-700 bg-[rgba(139,92,246,0.1)]"
                                    : "border-transparent bg-[rgb(22,22,22)]"
                                } border-2 rounded-lg overflow-hidden cursor-pointer hover:bg-[rgba(139,92,246,0.05)] transition-all`}
                              >
                                <div className="relative aspect-[2/3]">
                                  <img
                                    src={
                                      season.poster_path
                                        ? `https://image.tmdb.org/t/p/w300/${season.poster_path}`
                                        : "/placeholder.svg?height=300&width=200"
                                    }
                                    alt={season.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="p-2 text-center">
                                  <h3 className="text-sm font-medium text-gray-200 truncate">{season.name}</h3>
                                  <p className="text-xs text-gray-400">{season.episode_count} Episodes</p>
                                </div>
                              </div>
                            ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Episodes */}
                <div className="lg:col-span-3">
                  {/* Add state for showing/hiding episodes */}
                  <button
                    onClick={() => setShowEpisodes(!showEpisodes)}
                    className="w-full bg-[rgb(22,22,22)] hover:bg-[rgb(30,30,30)] p-4 rounded-lg mb-4 flex items-center justify-between transition-colors"
                  >
                    <span className="text-lg font-semibold text-white">Episodes</span>
                    {showEpisodes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>

                  <AnimatePresence>
                    {showEpisodes && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-[rgb(22,22,22)] rounded-lg overflow-hidden">
                          {sEpisodes?.length > 0 ? (
                            <div className="divide-y divide-gray-800">
                              {sEpisodes.map((episode: any) => (
                                <div
                                  key={episode.id}
                                  onClick={() => handleEpisodeSelect(episode)}
                                  className={`${
                                    episode.episode_number === dataState?.ep_num &&
                                    episode.season_number === dataState?.season
                                      ? "bg-violet-700"
                                      : "bg-transparent hover:bg-[rgb(30,30,30)]"
                                  } p-4 cursor-pointer transition-colors`}
                                >
                                  <div className="flex flex-col sm:flex-row gap-4">
                                    {episode.still_path && (
                                      <div className="sm:w-48 rounded-md overflow-hidden flex-shrink-0">
                                        <img
                                          src={`https://image.tmdb.org/t/p/w300/${episode.still_path}`}
                                          alt={episode.name}
                                          className="w-full aspect-video object-cover"
                                        />
                                      </div>
                                    )}

                                    <div className="flex-1">
                                      <div className="flex items-start justify-between">
                                        <h4 className="text-white font-medium">
                                          {episode.episode_number}. {episode.name}
                                        </h4>
                                        {episode.runtime && (
                                          <span className="text-gray-400 text-sm">{episode.runtime} min</span>
                                        )}
                                      </div>

                                      {episode.air_date && (
                                        <p className="text-gray-400 text-sm mt-1">
                                          {new Date(episode.air_date).toLocaleDateString()}
                                        </p>
                                      )}

                                      {episode.overview && (
                                        <p className="text-gray-300 text-sm mt-2 line-clamp-2">{episode.overview}</p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="p-6 text-center">
                              <p className="text-gray-400">No episodes available for this season.</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Cast Section */}
          <div className="bg-[rgb(17,17,17)] py-8">
            <div className="container mx-auto px-6 md:px-10 lg:px-16">
              <HomeContainer swiperId={1} Data={casts} heading="Casts" />
            </div>
          </div>

          {/* Recommended Shows */}
          <div className="bg-[rgb(17,17,17)] py-8">
            <div className="container mx-auto px-6 md:px-10 lg:px-16">
              <div className="mb-8">
                <div className="flex flex-col gap-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-200">Shows You May Also Like</h2>

                  <div className="relative">
                    <span className="block h-1 w-16 bg-violet-700 rounded-full"></span>
                  </div>

                  <p className="text-gray-400 max-w-3xl">
                    If you enjoyed {data?.name}, you might like these similar shows.
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
                          alt={item.name}
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
                        <h3 className="text-gray-200 font-medium text-sm truncate">{item.name}</h3>
                        <p className="text-gray-400 text-xs">{item.first_air_date?.split("-")[0] || "N/A"}</p>
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
  const url = `https://api.themoviedb.org/3/tv/${id}?api_key=cfe422613b250f702980a3bbf9e90716`

  try {
    const req = await fetch(url)
    const res = await req.json()
    return {
      props: { res },
      revalidate: 60 * 60, // Revalidate every hour
    }
  } catch (error) {
    console.error("Error fetching TV show data:", error)
    return {
      notFound: true,
    }
  }
}

