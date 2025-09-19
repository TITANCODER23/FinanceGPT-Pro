import React from 'react'
import { motion } from 'framer-motion'

interface QuickActionButtonProps {
  icon: React.ReactNode
  label: string
  color: string
  onClick?: () => void
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({ 
  icon, 
  label, 
  color, 
  onClick 
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="card p-4 text-center hover:shadow-card-hover transition-all duration-200 group"
    >
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-white mx-auto mb-3 group-hover:scale-110 transition-transform duration-200`}>
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </motion.button>
  )
}

export default QuickActionButton