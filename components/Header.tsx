"use client"
import Slider from "react-slick"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import { addToMyList, removeFromList } from "../redux/actions/myListAction"
import { toast } from "react-toastify"
import Msg from "./Msg"

// Icons
import { FaPlay } from "react-icons/fa"
import { IoMdAdd, IoMdRemove } from "react-icons/io"
import { Star, Calendar, Clock } from "lucide-react"

function timeConvert(n: any) {
  if (!n) return ""
  var num = n
  var hours = num / 60
  var rhours = Math.floor(hours)
  var minutes = (hours - rhours) * 60
  var rminutes = Math.round(minutes)
  return rhours + "h " + rminutes + "m"
}

const settings = {
  dots: false,
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 700,
  autoplaySpeed: 7000,
  pauseOnHover: false,
  arrows: false,
}

interface HeaderProps {
  Data: any[]
}

function Header(props: HeaderProps) {
  const { MyList } = useSelector((state: any) => state)
  const router = useRouter()
  const dispatch = useDispatch()

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

  return (
    <>
      <Slider {...settings} className="overflow-hidden">
        {props.Data?.map((item: any) => {
          const isInMyList = MyList.some((listItem: any) => listItem.id === item?.id)
          const contentType = item.media_type || (item.first_air_date ? "tv" : "movie")

          return (
            <div key={item.id} className="">
              <div
                className="head"
                style={{
                  background: `linear-gradient(to right, rgb(6, 6, 6) 15%, transparent 100%), url(https://image.tmdb.org/t/p/original//${item?.backdrop_path}) `,
                  backgroundSize: "cover",
                  backgroundPosition: "50%",
                }}
              >
                <div className="flex flex-col pl-4 w-full lg:w-2/5 z-50 justify-center relative items-start gap-4 h-full">
                  <h1 className="text-2xl lg:text-4xl font-black w-1/2 lg:w-full">{item.title || item.name}</h1>

                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    {(item?.first_air_date || item?.release_date) && (
                      <div className="flex items-center gap-1.5 bg-[rgba(255,255,255,0.1)] backdrop-blur-sm px-3 py-1.5 rounded-full text-white">
                        <Calendar size={14} />
                        <span>{item?.first_air_date?.split("-")[0] || item?.release_date?.split("-")[0]}</span>
                      </div>
                    )}

                    {item?.vote_average && (
                      <div className="flex items-center gap-1.5 bg-[rgba(255,255,255,0.1)] backdrop-blur-sm px-3 py-1.5 rounded-full text-white">
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        <span>{item.vote_average.toFixed(1)}</span>
                      </div>
                    )}

                    {item?.runtime && (
                      <div className="flex items-center gap-1.5 bg-[rgba(255,255,255,0.1)] backdrop-blur-sm px-3 py-1.5 rounded-full text-white">
                        <Clock size={14} />
                        <span>{timeConvert(item.runtime)}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-stone-400">{item.overview}</p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handlePlayClick(item)}
                      className="px-3 py-2 lg:px-4 lg:py-3 text-sm bg-violet-700 hover:bg-violet-800 text-white rounded-md font-medium flex items-center gap-2 transition-colors hover:scale-105"
                    >
                      <FaPlay size={14} />
                      <span>PLAY</span>
                    </button>

                    {isInMyList ? (
                      <button
                        onClick={() => handleMyListClick(item)}
                        className="px-3 py-2 lg:px-4 lg:py-3 text-sm bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.3)] text-white rounded-md font-medium flex items-center gap-2 transition-colors hover:scale-105"
                      >
                        <IoMdRemove size={18} />
                        <span>REMOVE FROM LIST</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMyListClick(item)}
                        className="px-3 py-2 lg:px-4 lg:py-3 text-sm bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.3)] text-white rounded-md font-medium flex items-center gap-2 transition-colors hover:scale-105"
                      >
                        <IoMdAdd size={18} />
                        <span>ADD TO LIST</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </Slider>
    </>
  )
}

export default Header

