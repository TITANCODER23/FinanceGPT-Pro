import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

const TopMerchants = () => {
  const merchants = [
    { name: 'Starbucks', logo: '☕', amount: 156.78, transactions: 12, change: 15.2 },
    { name: 'Amazon', logo: '📦', amount: 234.56, transactions: 8, change: -8.4 },
    { name: 'Uber', logo: '🚗', amount: 89.45, transactions: 15, change: 22.1 },
    { name: 'Netflix', logo: '🎬', amount: 15.99, transactions: 1, change: 0 },
    { name: 'Whole Foods', logo: '🛒', amount: 178.90, transactions: 6, change: -12.3 },
  ]
  
  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Top Merchants</h2>
      
      <div className="space-y-4">
        {merchants.map((merchant, index) => (
          <motion.div
            key={merchant.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                {merchant.logo}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{merchant.name}</h3>
                <p className="text-sm text-gray-500">{merchant.transactions} transactions</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-semibold text-gray-900">${merchant.amount.toFixed(2)}</p>
              <div className="flex items-center space-x-1">
                {merchant.change > 0 ? (
                  <TrendingUp className="w-3 h-3 text-red-500" />
                ) : merchant.change < 0 ? (
                  <TrendingDown className="w-3 h-3 text-green-500" />
                ) : null}
                <span className={`text-xs ${
                  merchant.change > 0 ? 'text-red-600' : 
                  merchant.change < 0 ? 'text-green-600' : 
                  'text-gray-500'
                }`}>
                  {merchant.change !== 0 && (merchant.change > 0 ? '+' : '')}{merchant.change.toFixed(1)}%
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default TopMerchants