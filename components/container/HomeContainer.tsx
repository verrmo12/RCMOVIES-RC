"use client"

import { type Dispatch, type SetStateAction, useRef, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import { useRouter } from "next/router"
import CardModal from "./CardModal"
import HomeCard from "./HomeCard"
import ContinueWatchingCard from "./ContinueWatchingCard"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"

// Icons
import { ChevronLeft, ChevronRight } from "lucide-react"

interface HomeContainerProps {
  Data: any[]
  heading: string
  setTypeMovies?: Dispatch<SetStateAction<any>>
  setTypeTV?: Dispatch<SetStateAction<any>>
  swiperId: any
}

function HomeContainer(data: HomeContainerProps): JSX.Element {
  const sliderRef = useRef<any>(null)
  const [selected, setSelected] = useState(false)
  const [cardId, setCardId] = useState(null)
  const router = useRouter()

  const handleClick = () => {
    setSelected(false)
  }

  const handleSimilar = () => {
    setSelected(false)
  }

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

  const isContinueWatching = data.heading === "Continue Watching"
  const isCasts = data.heading === "Casts"

  const breakpoints = {
    300: {
      slidesPerView: isContinueWatching ? 1.5 : isCasts ? 2.5 : 2.5,
      spaceBetween: 12,
    },
    480: {
      slidesPerView: isContinueWatching ? 2 : isCasts ? 3.3 : 3.5,
      spaceBetween: 12,
    },
    640: {
      slidesPerView: isContinueWatching ? 2 : isCasts ? 3.7 : 4.2,
      spaceBetween: 12,
      speed: 500,
    },
    720: {
      slidesPerView: isContinueWatching ? 2.6 : 4,
      spaceBetween: 12,
      speed: 500,
    },
    1024: {
      slidesPerView: isContinueWatching ? 4 : 4.7,
      spaceBetween: 12,
      slidesPerGroup: 3,
      speed: 500,
    },
    1200: {
      slidesPerView: isContinueWatching ? 4.5 : 6,
      spaceBetween: 12,
      slidesPerGroup: 3,
      speed: 500,
    },
    1424: {
      slidesPerView: isContinueWatching ? 5 : 6.5,
      spaceBetween: 12,
      slidesPerGroup: 3,
      speed: 500,
    },
    1624: {
      slidesPerView: isContinueWatching ? 5.5 : 7,
      slidesPerGroup: 3,
      spaceBetween: 12,
      speed: 500,
    },
    1800: {
      slidesPerView: isContinueWatching ? 6.2 : 8.7,
      slidesPerGroup: 3,
      spaceBetween: 12,
      speed: 500,
    },
    2030: {
      slidesPerView: isContinueWatching ? 7 : 9.1,
      slidesPerGroup: 3,
      spaceBetween: 12,
      speed: 500,
    },
    2450: {
      slidesPerView: isContinueWatching ? 7.5 : 10.5,
      slidesPerGroup: 3,
      spaceBetween: 12,
      speed: 500,
    },
  }

  if (!data?.Data?.length) {
    return <></>
  }

  return (
    <>
      <AnimatePresence>
        {selected && <CardModal {...data} handleClick={handleClick} handleSimilar={handleSimilar} id={cardId} />}
      </AnimatePresence>

      <div className="w-full relative overflow-hidden px-2 lg:px-6 my-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-200">{data.heading}</h2>

          {isToggleableSection && (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  data.setTypeMovies?.()
                  sliderRef?.current?.swiper?.slideTo(0)
                }}
                className={`py-1.5 px-3 lg:py-2 lg:px-4 rounded text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  isMoviesActive
                    ? "bg-violet-700 text-white"
                    : "bg-[rgb(30,30,30)] text-gray-300 hover:bg-[rgb(40,40,40)]"
                }`}
              >
                Movies
              </button>
              <button
                onClick={() => {
                  data.setTypeTV?.()
                  sliderRef?.current?.swiper?.slideTo(0)
                }}
                className={`py-1.5 px-3 lg:py-2 lg:px-4 rounded text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  isShowsActive
                    ? "bg-violet-700 text-white"
                    : "bg-[rgb(30,30,30)] text-gray-300 hover:bg-[rgb(40,40,40)]"
                }`}
              >
                TV Shows
              </button>
            </div>
          )}
        </div>

        <div className="relative group">
          {isContinueWatching ? (
            <Swiper
              ref={sliderRef}
              className="slidecard watchcard"
              grabCursor={true}
              speed={600}
              spaceBetween={12}
              navigation={{
                nextEl: `#swiper-forward-${data.swiperId}`,
                prevEl: `#swiper-back-${data.swiperId}`,
              }}
              breakpoints={breakpoints}
              modules={[Navigation]}
            >
              {data?.Data?.map((item: any, index: number) => (
                <SwiperSlide
                  key={item.id || index}
                  className="max-h-[500px]"
                  onClick={() => router.push(`/${item.media_type}/${item.id}`)}
                >
                  <ContinueWatchingCard {...item} heading={data.heading} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <Swiper
              ref={sliderRef}
              className="slidecard"
              speed={600}
              breakpoints={breakpoints}
              navigation={{
                nextEl: `#swiper-forward-${data.swiperId}`,
                prevEl: `#swiper-back-${data.swiperId}`,
              }}
              modules={[Navigation]}
            >
              {data?.Data?.map((item: any, index: number) => (
                <SwiperSlide
                  key={item.id || index}
                  className="max-h-[500px]"
                  onClick={() => {
                    setCardId(item.id)
                    setSelected(!selected)
                  }}
                >
                  <HomeCard {...item} heading={data.heading} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {/* Navigation Buttons */}
          <button
            id={`swiper-back-${data.swiperId}`}
            className="absolute left-0 top-0 z-10 h-full w-12 flex items-center justify-center bg-gradient-to-r from-[rgba(17,17,17,0.7)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Previous"
          >
            <div className="bg-black/50 rounded-full p-2 backdrop-blur-sm">
              <ChevronLeft className="text-white" size={20} />
            </div>
          </button>

          <button
            id={`swiper-forward-${data.swiperId}`}
            className="absolute right-0 top-0 z-10 h-full w-12 flex items-center justify-center bg-gradient-to-l from-[rgba(17,17,17,0.7)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Next"
          >
            <div className="bg-black/50 rounded-full p-2 backdrop-blur-sm">
              <ChevronRight className="text-white" size={20} />
            </div>
          </button>
        </div>
      </div>
    </>
  )
}

export default HomeContainer

