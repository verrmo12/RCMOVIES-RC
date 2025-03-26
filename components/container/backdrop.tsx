import { motion } from "framer-motion"

interface BackdropProps {
  onClick: () => void
  children: React.ReactNode
}

const Backdrop = ({ onClick, children }: BackdropProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClick}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
    >
      {children}
    </motion.div>
  )
}

export default Backdrop 