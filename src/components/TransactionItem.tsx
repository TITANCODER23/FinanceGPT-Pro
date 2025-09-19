import React from 'react'
import { motion } from 'framer-motion'
import { Tag, MapPin, Repeat } from 'lucide-react'
import { Transaction } from '../stores/bankStore'
import { format } from 'date-fns'

interface TransactionItemProps {
  transaction: Transaction
  showAccount?: boolean
  onClick?: () => void
}

const TransactionItem: React.FC<TransactionItemProps> = ({ 
  transaction, 
  showAccount = false,
  onClick 
}) => {
  const isIncome = transaction.amount > 0
  
  return (
    <motion.div
      whileHover={{ backgroundColor: '#f9fafb' }}
      onClick={onClick}
      className="flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-colors"
    >
      {/* Merchant Logo */}
      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
        {transaction.merchantLogo || '🏪'}
      </div>
      
      {/* Transaction Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <h3 className="font-medium text-gray-900 truncate">{transaction.merchant}</h3>
          {transaction.isRecurring && (
            <Repeat className="w-3 h-3 text-gray-400" />
          )}
          {transaction.pending && (
            <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full">
              Pending
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>{transaction.description}</span>
          {transaction.location && (
            <>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>{transaction.location}</span>
              </div>
            </>
          )}
        </div>
        
        <div className="flex items-center space-x-2 mt-1">
          {/* AI Category Tag */}
          {transaction.aiCategory && (
            <div className="flex items-center space-x-1">
              <Tag className="w-3 h-3 text-purple-500" />
              <span className="text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                {transaction.aiCategory}
              </span>
              {transaction.aiConfidence && (
                <span className="text-xs text-gray-400">
                  {Math.round(transaction.aiConfidence * 100)}% confident
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Amount and Time */}
      <div className="text-right flex-shrink-0">
        <p className={`font-semibold ${
          isIncome ? 'text-green-600' : 'text-gray-900'
        }`}>
          {isIncome ? '+' : '-'}${Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
        <p className="text-sm text-gray-500">
          {format(transaction.date, 'h:mm a')}
        </p>
        {showAccount && (
          <p className="text-xs text-gray-400 mt-1">
            {/* Account name would be looked up here */}
            Account ending in {transaction.accountId.slice(-4)}
          </p>
        )}
      </div>
    </motion.div>
  )
}

export default TransactionItem