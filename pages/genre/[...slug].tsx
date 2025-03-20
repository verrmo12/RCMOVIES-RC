"use client"

import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { AnimatePresence } from "framer-motion"
import { Film, Tv } from "lucide-react"
import CardModal from "../../components/container/CardModal"
import Layout from "../../components/layout/Layout"
import Header from "../../components/Header"
import HomeCard from "../../components/container/HomeCard"

function Genre() {
  const [data, setData] = useState<any>([])
  const [headerData, setHeaderData] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [selected, setSelected] = useState(false)
  const [cardId, setCardId] = useState(null)
  const [type, setType] = useState<string>("movie")
  const router = useRouter()
  const { slug } = router.query

  // Extract genre information from slug
  const genreName = slug ? slug[0]?.split("-")[0] : ""
  const genreId = slug ? slug[0]?.split("-")[1] : ""
  const currentPage = slug ? Number(slug[1]) : 1
  const isTvOnly = slug ? slug[0]?.includes("&") : false

  useEffect(() => {
    if (slug) {
      setLoading(true)
      if (isTvOnly) {
        setType("tv")
      }
      Promise.all([fetchGenres(), fetchHeaderData()]).finally(() => {
        setLoading(false)
      })
    }
  }, [slug, type])

  const fetchHeaderData = async () => {
    try {
      const mediaType = isTvOnly ? "tv" : type
      const req = await fetch(
        `https://api.themoviedb.org/3/discover/${mediaType}?page=1&api_key=cfe422613b250f702980a3bbf9e90716&with_genres=${genreId}&sort_by=popularity.desc`,
      )
      const res = await req.json()
      setHeaderData(res.results.slice(0, 5))
    } catch (error) {
      console.error("Error fetching header data:", error)
    }
  }

  const fetchGenres = async () => {
    try {
      const mediaType = isTvOnly ? "tv" : type
      const req = await fetch(
        `https://api.themoviedb.org/3/discover/${mediaType}?page=${currentPage}&api_key=cfe422613b250f702980a3bbf9e90716&with_genres=${genreId}`,
      )
      const res = await req.json()
      setData(res.results)
    } catch (error) {
      console.error("Error fetching genre data:", error)
    }
  }

  const handleTypeChange = (newType: string) => {
    setType(newType)
    router.push(`/genre/${genreName}-${genreId}/1`)
  }

  const handleClick = () => {
    setSelected(false)
  }

  const handleSimilar = () => {
    setSelected(false)
  }

  const handleCardClick = (id: any) => {
    setCardId(id)
    setSelected(true)
  }

  const getHeading = () => {
    if (isTvOnly) {
      return `${genreName} TV Shows`
    }
    return type === "movie" ? `${genreName} Movies` : `${genreName} TV Shows`
  }

  const getDescription = () => {
    if (isTvOnly) {
      return `Explore the best ${genreName.toLowerCase()} TV shows available to stream.`
    }
    return type === "movie"
      ? `Discover the best ${genreName.toLowerCase()} movies for your entertainment.`
      : `Explore popular ${genreName.toLowerCase()} TV shows and series.`
  }

  return (
    <>
      <AnimatePresence>
        {selected && (
          <CardModal
            {...data.find((item: any) => item.id === cardId)}
            handleClick={handleClick}
            handleSimilar={handleSimilar}
            id={cardId}
            heading={getHeading()}
            media_type={isTvOnly ? "tv" : type}
          />
        )}
      </AnimatePresence>

      <Header Data={headerData} />
      <Layout title={genreName}>
        <div className="mt-[-10rem] relative z-10">
          <section className="w-full relative px-6 md:px-10 lg:px-16 py-10">
            <div className="mb-8">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-200">{genreName}</h2>

                  {!isTvOnly && (
                    <div className="flex gap-2 items-center">
                      <button
                        onClick={() => handleTypeChange("movie")}
                        className={`py-1.5 px-3 rounded text-sm font-medium transition-all duration-300 hover:scale-105 flex items-center gap-1.5 ${
                          type === "movie"
                            ? "bg-violet-700 text-white"
                            : "bg-[rgb(30,30,30)] text-gray-300 hover:bg-[rgb(40,40,40)]"
                        }`}
                      >
                        <Film size={16} />
                        <span>Movies</span>
                      </button>
                      <button
                        onClick={() => handleTypeChange("tv")}
                        className={`py-1.5 px-3 rounded text-sm font-medium transition-all duration-300 hover:scale-105 flex items-center gap-1.5 ${
                          type === "tv"
                            ? "bg-violet-700 text-white"
                            : "bg-[rgb(30,30,30)] text-gray-300 hover:bg-[rgb(40,40,40)]"
                        }`}
                      >
                        <Tv size={16} />
                        <span>TV Shows</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <span className="block h-1 w-16 bg-violet-700 rounded-full"></span>
                </div>

                <p className="text-gray-400 max-w-3xl">{getDescription()}</p>
              </div>
            </div>

            {loading ? (
              <div className="min-h-[50vh] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-t-violet-700 border-r-transparent border-b-violet-700 border-l-transparent rounded-full animate-spin"></div>
              </div>
            ) : data.length === 0 ? (
              <div className="min-h-[50vh] flex flex-col items-center justify-center">
                <h3 className="text-xl text-gray-300 mb-2">No content found</h3>
                <p className="text-gray-400">Try a different genre or content type</p>
              </div>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6"
                >
                  {data.map((item: any, index: number) => (
                    <motion.div
                      key={item.id || index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-10"
                      onClick={() => handleCardClick(item.id)}
                    >
                      <HomeCard {...item} />
                    </motion.div>
                  ))}
                </motion.div>

                <div className="mt-12 flex justify-center">
                  <div className="flex items-center gap-2">
                    {/* Previous button */}
                    <button
                      onClick={() => {
                        if (currentPage > 1 && slug?.[0]) {
                          router.push(`/genre/${slug[0]}/${currentPage - 1}`)
                        }
                      }}
                      disabled={currentPage <= 1}
                      className={`flex items-center justify-center w-10 h-10 rounded-md transition-colors ${
                        currentPage <= 1
                          ? "bg-[rgb(30,30,30)] text-gray-500 cursor-not-allowed"
                          : "bg-[rgb(30,30,30)] text-gray-200 hover:bg-violet-700 hover:text-white"
                      }`}
                    >
                      <span className="sr-only">Previous</span>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    {/* Page number */}
                    <span className="px-4 py-2 rounded-md bg-violet-700 text-white">{currentPage}</span>

                    {/* Next button */}
                    <button
                      onClick={() => slug?.[0] && router.push(`/genre/${slug[0]}/${currentPage + 1}`)}
                      className="flex items-center justify-center w-10 h-10 rounded-md bg-[rgb(30,30,30)] text-gray-200 hover:bg-violet-700 hover:text-white transition-colors"
                    >
                      <span className="sr-only">Next</span>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            )}
          </section>
        </div>
      </Layout>
    </>
  )
}

export default Genre

