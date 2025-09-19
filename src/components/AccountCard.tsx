import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, MoreHorizontal } from 'lucide-react'
import { Account } from '../stores/bankStore'

interface AccountCardProps {
  account: Account
}

const AccountCard: React.FC<AccountCardProps> = ({ account }) => {
  // Mock sparkline data
  const sparklineData = Array.from({ length: 7 }, () => Math.random() * 100)
  const trend = Math.random() > 0.5 ? 'up' : 'down'
  const trendValue = (Math.random() * 5).toFixed(1)
  
  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case 'checking':
        return 'bg-blue-500'
      case 'savings':
        return 'bg-green-500'
      case 'credit':
        return 'bg-purple-500'
      case 'investment':
        return 'bg-orange-500'
      default:
        return 'bg-gray-500'
    }
  }
  
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="card p-6 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
            {account.bankLogo}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{account.name}</h3>
            <p className="text-sm text-gray-500">{account.bankName}</p>
          </div>
        </div>
        
        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
      
      <div className="mb-4">
        <p className="text-2xl font-bold text-gray-900">
          ${Math.abs(account.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
        <div className="flex items-center justify-between mt-1">
          <span className={`text-xs px-2 py-1 rounded-full ${getAccountTypeColor(account.type)} text-white`}>
            {account.type.charAt(0).toUpperCase() + account.type.slice(1)}
          </span>
          <span className="text-xs text-gray-500">•••• {account.lastFour}</span>
        </div>
      </div>
      
      {/* Mini Sparkline */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          {trend === 'up' ? (
            <TrendingUp className="w-3 h-3 text-green-500" />
          ) : (
            <TrendingDown className="w-3 h-3 text-red-500" />
          )}
          <span className={`text-xs font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? '+' : '-'}{trendValue}%
          </span>
        </div>
        
        <div className="flex items-end space-x-0.5 h-6">
          {sparklineData.map((value, index) => (
            <div
              key={index}
              className={`w-1 rounded-sm ${trend === 'up' ? 'bg-green-200' : 'bg-red-200'}`}
              style={{ height: `${(value / 100) * 24}px` }}
            />
          ))}
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Last sync: {account.lastSync.toLocaleTimeString()}</span>
          <div className={`w-2 h-2 rounded-full ${account.isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
        </div>
      </div>
    </motion.div>
  )
}

export default AccountCard