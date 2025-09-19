import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

const CategoryComparison = () => {
  const data = [
    { category: 'Food & Drink', thisMonth: 450, lastMonth: 380, change: 18.4 },
    { category: 'Shopping', thisMonth: 320, lastMonth: 420, change: -23.8 },
    { category: 'Transportation', thisMonth: 280, lastMonth: 260, change: 7.7 },
    { category: 'Bills', thisMonth: 180, lastMonth: 175, change: 2.9 },
    { category: 'Entertainment', thisMonth: 150, lastMonth: 200, change: -25.0 },
  ]
  
  const getTrendIcon = (change: number) => {
    if (change > 5) return <TrendingUp className="w-4 h-4 text-red-500" />
    if (change < -5) return <TrendingDown className="w-4 h-4 text-green-500" />
    return <Minus className="w-4 h-4 text-gray-400" />
  }
  
  const getTrendColor = (change: number) => {
    if (change > 5) return 'text-red-600'
    if (change < -5) return 'text-green-600'
    return 'text-gray-600'
  }
  
  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Category Comparison</h2>
      <p className="text-sm text-gray-500 mb-4">This month vs last month</p>
      
      <div className="space-y-4">
        {data.map((item, index) => (
          <motion.div
            key={item.category}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between"
          >
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">{item.category}</span>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(item.change)}
                  <span className={`text-sm font-medium ${getTrendColor(item.change)}`}>
                    {item.change > 0 ? '+' : ''}{item.change.toFixed(1)}%
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary-500 rounded-full" />
                  <span className="text-gray-600">This month: ${item.thisMonth}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-300 rounded-full" />
                  <span className="text-gray-600">Last month: ${item.lastMonth}</span>
                </div>
              </div>
              
              {/* Progress bars */}
              <div className="mt-2 space-y-1">
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.thisMonth / Math.max(item.thisMonth, item.lastMonth)) * 100}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    className="bg-primary-500 h-1.5 rounded-full"
                  />
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.lastMonth / Math.max(item.thisMonth, item.lastMonth)) * 100}%` }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                    className="bg-gray-400 h-1 rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default CategoryComparison