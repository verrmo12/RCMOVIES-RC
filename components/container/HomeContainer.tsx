
import { type Dispatch, type SetStateAction, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/router"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import { ChevronLeft, ChevronRight, Film, Tv } from "lucide-react"

// Components
import CardModal from "./CardModal"
import HomeCard from "./HomeCard"
import ContinueWatchingCard from "./ContinueWatchingCard"

// Swiper styles
import "swiper/css"
import "swiper/css/navigation"

interface HomeContainerProps {
  Data: any[]
  heading: string
  setTypeMovies?: Dispatch<SetStateAction<any>>
  setTypeTV?: Dispatch<SetStateAction<any>>
  swiperId: any
}

function HomeContainer(data: HomeContainerProps): JSX.Element {
  const [selected, setSelected] = useState(false)
  const [cardId, setCardId] = useState(null)
  const router = useRouter()

  const handleClick = () => {
    setSelected(false)
  }

  const handleSimilar = () => {
    setSelected(false)
  }

  const isContinueWatching = data.heading === "Continue Watching"
  const isCasts = data.heading === "Casts"

  const isToggleableSection =
    data.heading.includes("Popular") ||
    data.heading.includes("Trending") ||
    data.heading.includes("Top") ||
    data.heading.includes("Comedy")

  const isMoviesActive =
    data.heading === "Trending Movies" ||
    data.heading === "Popular Movies" ||
    data.heading === "Top Rated Movies" ||
    data.heading === "Comedy Movies"

  const isShowsActive =
    data.heading === "Trending Shows" ||
    data.heading === "Popular Shows" ||
    data.heading === "Top Rated Shows" ||
    data.heading === "Comedy Shows"

  // Get base heading without "Movies" or "Shows" suffix
  const getBaseHeading = () => {
    if (data.heading.includes("Movies") || data.heading.includes("Shows")) {
      return data.heading.split(" ").slice(0, -1).join(" ")
    }
    return data.heading
  }

  // Swiper breakpoints for Continue Watching section
  const continueWatchingBreakpoints = {
    300: { slidesPerView: 1.5, spaceBetween: 10 },
    480: { slidesPerView: 2, spaceBetween: 10 },
    640: { slidesPerView: 2.5, spaceBetween: 10 },
    768: { slidesPerView: 3, spaceBetween: 10 },
    1024: { slidesPerView: 4, spaceBetween: 10 },
    1280: { slidesPerView: 5, spaceBetween: 10 },
    1536: { slidesPerView: 6, spaceBetween: 10 },
  }

  // Swiper breakpoints for Cast section
  const castBreakpoints = {
    300: { slidesPerView: 2.5, spaceBetween: 10 },
    480: { slidesPerView: 3.5, spaceBetween: 10 },
    640: { slidesPerView: 4.5, spaceBetween: 10 },
    768: { slidesPerView: 5.5, spaceBetween: 10 },
    1024: { slidesPerView: 6.5, spaceBetween: 10 },
    1280: { slidesPerView: 7.5, spaceBetween: 10 },
    1536: { slidesPerView: 8.5, spaceBetween: 10 },
  }

  if (!data?.Data?.length) {
    return <></>
  }

  return (
    <>
      <AnimatePresence>
        {selected && <CardModal {...data} handleClick={handleClick} handleSimilar={handleSimilar} id={cardId} />}
      </AnimatePresence>

      <section className="w-full relative px-6 md:px-10 lg:px-16 py-10 mb-6">
        <div className="mb-8">
          {isToggleableSection ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-200">{getBaseHeading()}</h2>

                <div className="flex gap-2 items-center">
                  <button
                    onClick={data.setTypeMovies}
                    className={`py-1.5 px-3 rounded text-sm font-medium transition-all duration-300 hover:scale-105 flex items-center gap-1.5 ${
                      isMoviesActive
                        ? "bg-violet-700 text-white"
                        : "bg-[rgb(30,30,30)] text-gray-300 hover:bg-[rgb(40,40,40)]"
                    }`}
                  >
                    <Film size={16} />
                    <span>Movies</span>
                  </button>
                  <button
                    onClick={data.setTypeTV}
                    className={`py-1.5 px-3 rounded text-sm font-medium transition-all duration-300 hover:scale-105 flex items-center gap-1.5 ${
                      isShowsActive
                        ? "bg-violet-700 text-white"
                        : "bg-[rgb(30,30,30)] text-gray-300 hover:bg-[rgb(40,40,40)]"
                    }`}
                  >
                    <Tv size={16} />
                    <span>TV Shows</span>
                  </button>
                </div>
              </div>

              <div className="relative">
                <span className="block h-1 w-16 bg-violet-700 rounded-full"></span>
              </div>

              <p className="text-gray-400 max-w-3xl">
                {isMoviesActive && "Discover the best movies selected for you to enjoy."}
                {isShowsActive && "Explore top TV shows curated for your entertainment."}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-200">{data.heading}</h2>

              <div className="relative">
                <span className="block h-1 w-16 bg-violet-700 rounded-full"></span>
              </div>

              <p className="text-gray-400 max-w-3xl">
                {isContinueWatching && "Pick up where you left off with your recent watches."}
                {isCasts && "Popular actors and actresses from your favorite content."}
                {!isContinueWatching && !isCasts && "Explore our collection of entertainment content."}
              </p>
            </div>
          )}
        </div>

        {isContinueWatching ? (
          // Continue Watching section with Swiper
          <div className="relative px-2">
            <Swiper
              className="continue-watching-swiper"
              grabCursor={true}
              speed={600}
              navigation={{
                nextEl: `.swiper-button-next-${data.swiperId}`,
                prevEl: `.swiper-button-prev-${data.swiperId}`,
              }}
              breakpoints={continueWatchingBreakpoints}
              modules={[Navigation]}
            >
              {data?.Data?.map((item: any, index: number) => (
                <SwiperSlide key={item.id || index} className="h-auto">
                  <div
                    className="cursor-pointer transition-transform duration-300 hover:scale-105"
                    onClick={() => router.push(`/${item.media_type}/${item.id}`)}
                  >
                    <ContinueWatchingCard {...item} heading={data.heading} />
                  </div>
                </SwiperSlide>
              ))}

              <button
                className={`swiper-button-prev-${data.swiperId} absolute top-1/2 -translate-y-1/2 left-0 z-10 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors`}
              >
                <ChevronLeft className="text-white" size={24} />
              </button>
              <button
                className={`swiper-button-next-${data.swiperId} absolute top-1/2 -translate-y-1/2 right-0 z-10 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors`}
              >
                <ChevronRight className="text-white" size={24} />
              </button>
            </Swiper>
          </div>
        ) : isCasts ? (
          // Cast section with Swiper
          <div className="relative px-2">
            <Swiper
              className="cast-swiper"
              grabCursor={true}
              speed={600}
              navigation={{
                nextEl: `.swiper-button-next-${data.swiperId}`,
                prevEl: `.swiper-button-prev-${data.swiperId}`,
              }}
              breakpoints={castBreakpoints}
              modules={[Navigation]}
            >
              {data?.Data?.map((item: any, index: number) => (
                <SwiperSlide key={item.id || index} className="h-auto">
                  <div
                    className="cursor-pointer transition-transform duration-300 hover:scale-105"
                    onClick={() => {
                      setCardId(item.id)
                      setSelected(!selected)
                    }}
                  >
                    <HomeCard {...item} heading={data.heading} />
                  </div>
                </SwiperSlide>
              ))}

              <button
                className={`swiper-button-prev-${data.swiperId} absolute top-1/2 -translate-y-1/2 left-0 z-10 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors`}
              >
                <ChevronLeft className="text-white" size={24} />
              </button>
              <button
                className={`swiper-button-next-${data.swiperId} absolute top-1/2 -translate-y-1/2 right-0 z-10 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors`}
              >
                <ChevronRight className="text-white" size={24} />
              </button>
            </Swiper>
          </div>
        ) : (
          // Grid layout for other sections
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 px-2`}
          >
            {data?.Data?.map((item: any, index: number) => (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-10"
                onClick={() => {
                  setCardId(item.id)
                  setSelected(!selected)
                }}
              >
                <HomeCard {...item} heading={data.heading} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </>
  )
}

export default HomeContainer

