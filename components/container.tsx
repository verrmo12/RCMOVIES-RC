import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import CardModal from "./container/CardModal"
import MyListCard from "./MyListCard"

interface ContainerProps {
  Data: any[]
  heading: string
  place?: string
}

function Container({ Data, heading, place }: ContainerProps) {
  const [selected, setSelected] = useState(false)
  const [cardId, setCardId] = useState(null)

  const handleClick = () => {
    setSelected(false)
  }

  const handleSimilar = () => {
    setSelected(false)
  }

  if (!Data?.length) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center px-6 md:px-10 lg:px-16 py-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-200 mb-4">Your List is Empty</h2>
        <p className="text-gray-400 text-center max-w-md">
          Add movies and TV shows to your list to keep track of what you want to watch.
        </p>
      </div>
    )
  }

  return (
    <>
      <AnimatePresence>
        {selected && (
          <CardModal
            {...Data.find((item) => item.id === cardId)}
            handleClick={handleClick}
            handleSimilar={handleSimilar}
            id={cardId}
            heading={heading}
          />
        )}
      </AnimatePresence>

      <section className="w-full relative px-6 md:px-10 lg:px-16 py-10">
        <div className="mb-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-200">{heading}</h2>

            <div className="relative">
              <span className="block h-1 w-16 bg-violet-700 rounded-full"></span>
            </div>

            <p className="text-gray-400 max-w-3xl">Your personal collection of favorite movies and TV shows.</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6"
        >
          {Data.map((item, index) => (
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
              <MyListCard {...item} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  )
}

export default Container

