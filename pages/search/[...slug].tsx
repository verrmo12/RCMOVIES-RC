"use client"

import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { AnimatePresence } from "framer-motion"
import { SearchIcon, Film, Tv, User } from "lucide-react"
import CardModal from "../../components/container/CardModal"
import Layout from "../../components/layout/Layout"
import HomeCard from "../../components/container/HomeCard"

function Search() {
  const [data, setData] = useState<any>([])
  const [filteredData, setFilteredData] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [selected, setSelected] = useState(false)
  const [cardId, setCardId] = useState(null)
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const router = useRouter()
  const { slug } = router.query
  const searchQuery = slug ? slug[0] : ""

  useEffect(() => {
    if (searchQuery) {
      setLoading(true)
      fetchSearchResults()
    }
  }, [searchQuery])

  useEffect(() => {
    if (data.length > 0) {
      filterResults(activeFilter)
    }
  }, [data, activeFilter])

  const fetchSearchResults = async () => {
    try {
      const url = `https://api.themoviedb.org/3/search/multi?query=${searchQuery}&api_key=cfe422613b250f702980a3bbf9e90716`
      const req = await fetch(url)
      const res = await req.json()
      setData(res.results || [])
      setLoading(false)
    } catch (error) {
      console.error("Error fetching search results:", error)
      setLoading(false)
    }
  }

  const filterResults = (filter: string) => {
    if (filter === "all") {
      setFilteredData(data)
    } else {
      setFilteredData(data.filter((item: any) => item.media_type === filter))
    }
  }

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
  }

  const handleClick = () => {
    setSelected(false)
  }

  const handleSimilar = () => {
    setSelected(false)
  }

  const handleCardClick = (id: any, mediaType: string) => {
    setCardId(id)
    setSelected(true)
  }

  const getResultCount = (type: string) => {
    if (type === "all") return data.length
    return data.filter((item: any) => item.media_type === type).length
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
            heading="Search Results"
          />
        )}
      </AnimatePresence>

      <Layout title={"Search Results"}>
        <div className="w-full relative px-6 md:px-10 lg:px-16 py-10 mt-20">
          <div className="mb-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-200">Search Results for "{searchQuery}"</h2>
              </div>

              <div className="relative">
                <span className="block h-1 w-16 bg-violet-700 rounded-full"></span>
              </div>

              <p className="text-gray-400 max-w-3xl">Found {data.length} results matching your search query.</p>
            </div>
          </div>

          {/* Filter section with improved styling */}
          <div className="bg-[rgb(22,22,22)] p-4 rounded-lg mb-8 sticky top-20 z-20 shadow-lg">
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <button
                onClick={() => handleFilterChange("all")}
                className={`py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeFilter === "all"
                    ? "bg-violet-700 text-white"
                    : "bg-[rgb(30,30,30)] text-gray-300 hover:bg-[rgb(40,40,40)]"
                }`}
              >
                <SearchIcon size={18} />
                <span>All Results</span>
                <span className="bg-black/30 px-2 py-0.5 rounded-full text-xs ml-1">{getResultCount("all")}</span>
              </button>
              <button
                onClick={() => handleFilterChange("movie")}
                className={`py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeFilter === "movie"
                    ? "bg-violet-700 text-white"
                    : "bg-[rgb(30,30,30)] text-gray-300 hover:bg-[rgb(40,40,40)]"
                }`}
              >
                <Film size={18} />
                <span>Movies</span>
                <span className="bg-black/30 px-2 py-0.5 rounded-full text-xs ml-1">{getResultCount("movie")}</span>
              </button>
              <button
                onClick={() => handleFilterChange("tv")}
                className={`py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeFilter === "tv"
                    ? "bg-violet-700 text-white"
                    : "bg-[rgb(30,30,30)] text-gray-300 hover:bg-[rgb(40,40,40)]"
                }`}
              >
                <Tv size={18} />
                <span>TV Shows</span>
                <span className="bg-black/30 px-2 py-0.5 rounded-full text-xs ml-1">{getResultCount("tv")}</span>
              </button>
              <button
                onClick={() => handleFilterChange("person")}
                className={`py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeFilter === "person"
                    ? "bg-violet-700 text-white"
                    : "bg-[rgb(30,30,30)] text-gray-300 hover:bg-[rgb(40,40,40)]"
                }`}
              >
                <User size={18} />
                <span>People</span>
                <span className="bg-black/30 px-2 py-0.5 rounded-full text-xs ml-1">{getResultCount("person")}</span>
              </button>
            </div>
          </div>

          {/* Results section */}
          {loading ? (
            <div className="min-h-[50vh] flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-t-violet-700 border-r-transparent border-b-violet-700 border-l-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="min-h-[50vh] flex flex-col items-center justify-center bg-[rgb(22,22,22)] p-8 rounded-lg">
              <SearchIcon size={48} className="text-gray-500 mb-4" />
              <h3 className="text-xl text-gray-300 mb-2">No results found</h3>
              <p className="text-gray-400 text-center max-w-md">
                {activeFilter === "all"
                  ? `No results found for "${searchQuery}". Try a different search term.`
                  : `No ${activeFilter === "movie" ? "movies" : activeFilter === "tv" ? "TV shows" : "people"} found for "${searchQuery}". Try a different filter.`}
              </p>
            </div>
          ) : (
            <>
              {/* Filter results heading */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-200">
                  {activeFilter === "all"
                    ? "All Results"
                    : activeFilter === "movie"
                      ? "Movies"
                      : activeFilter === "tv"
                        ? "TV Shows"
                        : "People"}
                  <span className="text-gray-400 ml-2">({filteredData.length})</span>
                </h3>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6"
              >
                {filteredData.map((item: any, index: number) => (
                  <motion.div
                    key={item.id || index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-10"
                    onClick={() => handleCardClick(item.id, item.media_type)}
                  >
                    <div className="relative">
                      <HomeCard {...item} heading={item.media_type === "person" ? "Casts" : ""} />

                      {/* Media type badge */}
                      <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md z-10">
                        <span className="text-white text-xs font-medium">
                          {item.media_type === "movie" ? "Movie" : item.media_type === "tv" ? "TV" : "Person"}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </div>
      </Layout>
    </>
  )
}

export default Search

