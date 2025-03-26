"use client"
import { CheckCircle, AlertCircle, Info } from "lucide-react"
import { motion } from "framer-motion"

type MsgProps = {
  title: string
  message: string
  type?: "success" | "error" | "info"
}

export default function Msg({ title, message, type = "success" }: MsgProps) {
  // Determine styles based on message type
  const styles = {
    success: {
      icon: CheckCircle,
      iconColor: "text-emerald-500",
      bgGradient: "bg-gradient-to-r from-emerald-500/10 to-green-500/5",
      borderColor: "border-l-emerald-500",
      shadowColor: "shadow-emerald-500/10",
    },
    error: {
      icon: AlertCircle,
      iconColor: "text-rose-500",
      bgGradient: "bg-gradient-to-r from-rose-500/10 to-red-500/5",
      borderColor: "border-l-rose-500",
      shadowColor: "shadow-rose-500/10",
    },
    info: {
      icon: Info,
      iconColor: "text-violet-500",
      bgGradient: "bg-gradient-to-r from-violet-500/10 to-purple-500/5",
      borderColor: "border-l-violet-500",
      shadowColor: "shadow-violet-500/10",
    },
  }

  const currentStyle = styles[type]
  const Icon = currentStyle.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start rounded-md overflow-hidden border-l-4 ${currentStyle.borderColor} ${currentStyle.bgGradient} shadow-lg ${currentStyle.shadowColor} backdrop-blur-sm`}
    >
      <div className="flex items-start p-3 gap-3">
        <div className={`${currentStyle.iconColor} mt-0.5`}>
          <Icon size={20} className="drop-shadow" />
        </div>

        <div className="flex flex-col">
          <span className="font-bold text-white text-sm tracking-wide">{title}</span>
          <span className="text-gray-300 text-xs mt-0.5">{message}</span>
        </div>
      </div>
    </motion.div>
  )
}

