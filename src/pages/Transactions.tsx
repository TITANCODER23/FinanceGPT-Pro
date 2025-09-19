import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, Search, Plus, Calendar, ArrowUpDown, Tag } from 'lucide-react'
import { useBankStore } from '../stores/bankStore'
import TransactionItem from '../components/TransactionItem'
import TransactionFilters from '../components/TransactionFilters'
import TransactionModal from '../components/TransactionModal'
import { format, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns'

const Transactions = () => {
  const { transactions, accounts } = useBankStore()
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDateRange, setSelectedDateRange] = useState('thisMonth')
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [amountRange, setAmountRange] = useState({ min: '', max: '' })
  const [showTransactionModal, setShowTransactionModal] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
  
  const dateRanges = {
    thisMonth: { start: startOfMonth(new Date()), end: endOfMonth(new Date()) },
    lastMonth: { start: startOfMonth(new Date(new Date().setMonth(new Date().getMonth() - 1))), end: endOfMonth(new Date(new Date().setMonth(new Date().getMonth() - 1))) },
    last30Days: { start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), end: new Date() },
    last90Days: { start: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), end: new Date() },
  }
  
  const filteredTransactions = useMemo(() => {
    let filtered = transactions
    
    // Date range filter
    if (selectedDateRange && dateRanges[selectedDateRange as keyof typeof dateRanges]) {
      const range = dateRanges[selectedDateRange as keyof typeof dateRanges]
      filtered = filtered.filter(transaction =>
        isWithinInterval(transaction.date, { start: range.start, end: range.end })
      )
    }
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(transaction =>
        transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    // Account filter
    if (selectedAccounts.length > 0) {
      filtered = filtered.filter(transaction =>
        selectedAccounts.includes(transaction.accountId)
      )
    }
    
    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(transaction =>
        selectedCategories.includes(transaction.category)
      )
    }
    
    // Amount range filter
    if (amountRange.min || amountRange.max) {
      filtered = filtered.filter(transaction => {
        const amount = Math.abs(transaction.amount)
        const min = amountRange.min ? parseFloat(amountRange.min) : 0
        const max = amountRange.max ? parseFloat(amountRange.max) : Infinity
        return amount >= min && amount <= max
      })
    }
    
    return filtered
  }, [transactions, searchQuery, selectedDateRange, selectedAccounts, selectedCategories, amountRange])
  
  const groupedTransactions = useMemo(() => {
    const groups: { [key: string]: typeof filteredTransactions } = {}
    
    filteredTransactions.forEach(transaction => {
      const dateKey = format(transaction.date, 'yyyy-MM-dd')
      if (!groups[dateKey]) {
        groups[dateKey] = []
      }
      groups[dateKey].push(transaction)
    })
    
    return Object.entries(groups).sort(([a], [b]) => b.localeCompare(a))
  }, [filteredTransactions])
  
  const summaryStats = useMemo(() => {
    const inflow = filteredTransactions
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0)
    
    const outflow = filteredTransactions
      .filter(t => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0)
    
    return {
      inflow,
      outflow,
      net: inflow - outflow,
      count: filteredTransactions.length
    }
  }, [filteredTransactions])
  
  const handleTransactionClick = (transaction: any) => {
    setSelectedTransaction(transaction)
    setShowTransactionModal(true)
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
        
        <div className="flex items-center space-x-3">
          {/* Date Range Selector */}
          <select
            value={selectedDateRange}
            onChange={(e) => setSelectedDateRange(e.target.value)}
            className="input-field text-sm"
          >
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
            <option value="last30Days">Last 30 Days</option>
            <option value="last90Days">Last 90 Days</option>
          </select>
          
          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-secondary flex items-center space-x-2 ${showFilters ? 'bg-primary-50 border-primary-200' : ''}`}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
          
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10 w-64"
            />
          </div>
        </div>
      </div>
      
      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <TransactionFilters
              accounts={accounts}
              selectedAccounts={selectedAccounts}
              setSelectedAccounts={setSelectedAccounts}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              amountRange={amountRange}
              setAmountRange={setAmountRange}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center space-x-2 mb-2">
            <ArrowUpRight className="w-4 h-4 text-green-500" />
            <span className="text-sm text-gray-600">Inflow</span>
          </div>
          <p className="text-2xl font-bold text-green-600">
            ${summaryStats.inflow.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center space-x-2 mb-2">
            <ArrowDownRight className="w-4 h-4 text-red-500" />
            <span className="text-sm text-gray-600">Outflow</span>
          </div>
          <p className="text-2xl font-bold text-red-600">
            ${summaryStats.outflow.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-gray-600">Net</span>
          </div>
          <p className={`text-2xl font-bold ${summaryStats.net >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${summaryStats.net.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center space-x-2 mb-2">
            <ArrowUpDown className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Count</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {summaryStats.count}
          </p>
        </div>
      </div>
      
      {/* Transactions List */}
      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Transaction History</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {groupedTransactions.length > 0 ? (
            groupedTransactions.map(([date, dayTransactions]) => (
              <div key={date} className="p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-3">
                  {format(new Date(date), 'EEEE, MMMM d, yyyy')}
                </h3>
                <div className="space-y-3">
                  {dayTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      onClick={() => handleTransactionClick(transaction)}
                      className="cursor-pointer"
                    >
                      <TransactionItem transaction={transaction} showAccount />
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Floating Add Button */}
      <button
        onClick={() => setShowTransactionModal(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-50"
      >
        <Plus className="w-6 h-6" />
      </button>
      
      {/* Transaction Modal */}
      <TransactionModal
        isOpen={showTransactionModal}
        onClose={() => {
          setShowTransactionModal(false)
          setSelectedTransaction(null)
        }}
        transaction={selectedTransaction}
      />
    </div>
  )
}

export default Transactions