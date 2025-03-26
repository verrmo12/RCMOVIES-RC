import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { AnimatePresence } from "framer-motion"
import { Film, TrendingUp, Award, Calendar } from "lucide-react"
import CardModal from "../../components/container/CardModal"
import Layout from "../../components/layout/Layout"
import Header from "../../components/Header"
import HomeCard from "../../components/container/HomeCard"

function Movies() {
  const [data, setData] = useState<any>([])
  const [headerData, setHeaderData] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [selected, setSelected] = useState(false)
  const [cardId, setCardId] = useState(null)
  const [filter, setFilter] = useState<string>("popular")
  const router = useRouter()
  const { page } = router.query

  useEffect(() => {
    if (page) {
      setLoading(true)
      Promise.all([fetchMovies(), fetchHeaderData()]).finally(() => {
        setLoading(false)
      })
    }
  }, [page, filter])

  const fetchHeaderData = async () => {
    try {
      const req = await fetch(
        `https://api.themoviedb.org/3/movie/popular?page=1&api_key=875cecec683eb9cfc4cb845ead32e16e`,
      )
      const res = await req.json()
      setHeaderData(res.results.slice(0, 5))
    } catch (error) {
      console.error("Error fetching header data:", error)
    }
  }

  const fetchMovies = async () => {
    try {
      let endpoint = "discover/movie?sort_by=popularity.desc"

      if (filter === "trending") {
        endpoint = "trending/movie/week"
      } else if (filter === "top_rated") {
        endpoint = "movie/top_rated"
      } else if (filter === "upcoming") {
        endpoint = "movie/upcoming"
      }

      const req = await fetch(
        `https://api.themoviedb.org/3/${endpoint}&page=${page}&api_key=875cecec683eb9cfc4cb845ead32e16e`,
      )
      const res = await req.json()
      setData(res.results)
    } catch (error) {
      console.error("Error fetching movies:", error)
    }
  }

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter)
    router.push(`/movies/1`)
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

  const getFilterTitle = () => {
    switch (filter) {
      case "trending":
        return "Trending Movies"
      case "top_rated":
        return "Top Rated Movies"
      case "upcoming":
        return "Upcoming Movies"
      default:
        return "Popular Movies"
    }
  }

  const getFilterDescription = () => {
    switch (filter) {
      case "trending":
        return "The hottest movies trending this week across theaters and streaming platforms."
      case "top_rated":
        return "The highest-rated movies of all time, as ranked by critics and audiences."
      case "upcoming":
        return "Upcoming movies that are scheduled to release soon in theaters."
      default:
        return "Discover the most popular movies that everyone is watching right now."
    }
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
            heading={getFilterTitle()}
            media_type="movie"
          />
        )}
      </AnimatePresence>

      <Header Data={headerData} />
      <Layout title={"Movies"}>
        <div className="mt-[-10rem] relative z-10">
          <section className="w-full relative px-6 md:px-10 lg:px-16 py-10">
            <div className="mb-8">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-200">Movies</h2>
                </div>

                <div className="relative">
                  <span className="block h-1 w-16 bg-violet-700 rounded-full"></span>
                </div>

                <p className="text-gray-400 max-w-3xl">{getFilterDescription()}</p>
              </div>
            </div>

            {loading ? (
              <div className="min-h-[50vh] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-t-violet-700 border-r-transparent border-b-violet-700 border-l-transparent rounded-full animate-spin"></div>
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
                        if (Number(page) > 1) {
                          router.push(`/movies/${Number(page) - 1}`)
                        }
                      }}
                      disabled={Number(page) <= 1}
                      className={`flex items-center justify-center w-10 h-10 rounded-md transition-colors ${
                        Number(page) <= 1
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
                    <span className="px-4 py-2 rounded-md bg-violet-700 text-white">{page}</span>

                    {/* Next button */}
                    <button
                      onClick={() => router.push(`/movies/${Number(page) + 1}`)}
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

export default Movies

