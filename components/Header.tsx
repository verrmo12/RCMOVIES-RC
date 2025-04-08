import { useState } from "react"
import Slider from "react-slick"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import { addToMyList, removeFromList } from "../redux/actions/myListAction"
import { toast } from "react-toastify"
import Msg from "./Msg"
import { motion, AnimatePresence } from "framer-motion"

// Icons
import { Play, Plus, Minus, Star, Calendar, Clock, ChevronLeft, ChevronRight, Film, Tv } from "lucide-react"

function timeConvert(n: any) {
  if (!n) return ""
  var num = n
  var hours = num / 60
  var rhours = Math.floor(hours)
  var minutes = (hours - rhours) * 60
  var rminutes = Math.round(minutes)
  return rhours + "h " + rminutes + "m"
}

interface HeaderProps {
  Data: any[]
}

function Header(props: HeaderProps) {
  const { MyList } = useSelector((state: any) => state)
  const router = useRouter()
  const dispatch = useDispatch()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliderRef, setSliderRef] = useState<any>(null)

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 8000,
    pauseOnHover: false,
    arrows: false,
    beforeChange: (_: any, next: number) => setCurrentSlide(next),
    fade: true,
  }

  const handlePlayClick = (item: any) => {
    const contentType = item.media_type || (item.first_air_date ? "tv" : "movie")
    router.push(`/${contentType}/${item.id}`)
  }

  const handleMyListClick = (item: any) => {
    const isInMyList = MyList.some((listItem: any) => listItem.id === item.id)

    if (isInMyList) {
      dispatch(removeFromList(item.id))
      toast.error(<Msg title={item.title || item.name} message="Was Removed from your List" />, { theme: "dark" })
    } else {
      dispatch(
        addToMyList({
          id: item.id,
          title: item.title || item.name,
          poster_path: item.poster_path,
          overview: item.overview,
          media_type: item.media_type || (item.first_air_date ? "tv" : "movie"),
          backdrop_path: item.backdrop_path,
        }),
      )
      toast.success(<Msg title={item.title || item.name} message="Was Added To Your List" />, { theme: "dark" })
    }
  }

  const nextSlide = () => {
    sliderRef?.slickNext()
  }

  const prevSlide = () => {
    sliderRef?.slickPrev()
  }

  return (
    <div className="relative">
      <Slider ref={setSliderRef} {...settings} className="overflow-hidden">
        {props.Data?.map((item: any, index: number) => {
          const isInMyList = MyList.some((listItem: any) => listItem.id === item?.id)
          const contentType = item.media_type || (item.first_air_date ? "tv" : "movie")
          const isActive = index === currentSlide

          return (
            <div key={item.id} className="relative">
              <div
                className="relative h-[70vh] md:h-[85vh] bg-cover bg-center"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original/${item?.backdrop_path})`,
                }}
              >
                {/* Gradient overlays for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[rgb(17,17,17)] via-transparent to-transparent"></div>

                <div className="h-full flex items-center px-6 md:px-10 lg:px-16 relative z-10">
                  <div className="w-full max-w-[1400px] mx-auto">
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          key={`content-${item.id}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5, staggerChildren: 0.1 }}
                          className="flex flex-col gap-6"
                        >
                          {/* Content type badge */}
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-violet-700/30 text-violet-200 border border-violet-500/30 backdrop-blur-sm">
                              {contentType === "tv" ? (
                                <>
                                  <Tv size={12} className="mr-1" /> TV SHOW
                                </>
                              ) : (
                                <>
                                  <Film size={12} className="mr-1" /> MOVIE
                                </>
                              )}
                            </span>
                          </motion.div>

                          {/* Title */}
                          <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-lg"
                          >
                            {item.title || item.name}
                          </motion.h1>

                          {/* Metadata badges */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap items-center gap-3"
                          >
                            {(item?.first_air_date || item?.release_date) && (
                              <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full text-white border border-white/10">
                                <Calendar size={14} className="text-violet-400" />
                                <span>{item?.first_air_date?.split("-")[0] || item?.release_date?.split("-")[0]}</span>
                              </div>
                            )}

                            {item?.vote_average && (
                              <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full text-white border border-white/10">
                                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                                <span>{item.vote_average.toFixed(1)}</span>
                              </div>
                            )}

                            {item?.runtime && (
                              <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full text-white border border-white/10">
                                <Clock size={14} className="text-violet-400" />
                                <span>{timeConvert(item.runtime)}</span>
                              </div>
                            )}

                            {/* Display first genre if available */}
                            {item?.genres && item.genres[0] && (
                              <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full text-white border border-white/10">
                                <span>{item.genres[0].name}</span>
                              </div>
                            )}
                          </motion.div>

                          {/* Overview */}
                          <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-gray-300 text-base md:text-lg line-clamp-3 md:line-clamp-4 max-w-2xl"
                          >
                            {item.overview}
                          </motion.p>

                          {/* Action buttons */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-wrap gap-4 mt-2"
                          >
                            <button
                              onClick={() => handlePlayClick(item)}
                              className="px-6 py-3 bg-gradient-to-r from-violet-700 to-purple-700 hover:from-violet-800 hover:to-purple-800 text-white rounded-md font-medium flex items-center gap-2 transition-all duration-300 hover:scale-105 shadow-lg shadow-violet-900/30"
                            >
                              <Play size={18} className="fill-white" />
                              <span className="text-base">Watch Now</span>
                            </button>

                            <button
                              onClick={() => handleMyListClick(item)}
                              className={`px-6 py-3 ${
                                isInMyList
                                  ? "bg-violet-700 hover:bg-violet-800"
                                  : "bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/10"
                              } text-white rounded-md font-medium flex items-center gap-2 transition-all duration-300 hover:scale-105`}
                            >
                              {isInMyList ? (
                                <>
                                  <Minus size={18} />
                                  <span className="text-base">Remove</span>
                                </>
                              ) : (
                                <>
                                  <Plus size={18} />
                                  <span className="text-base">Add to List</span>
                                </>
                              )}
                            </button>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </Slider>

      {/* Navigation arrows */}
      {props.Data?.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 backdrop-blur-sm p-3 rounded-full text-white transition-all duration-300 hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 backdrop-blur-sm p-3 rounded-full text-white transition-all duration-300 hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Slide indicators */}
      {props.Data?.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {props.Data.map((_, index) => (
            <button
              key={index}
              onClick={() => sliderRef?.slickGoTo(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-violet-500 w-8" : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Header

