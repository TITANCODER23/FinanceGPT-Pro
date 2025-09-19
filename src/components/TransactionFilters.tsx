import React from 'react'
import { X } from 'lucide-react'
import { Account } from '../stores/bankStore'

interface TransactionFiltersProps {
  accounts: Account[]
  selectedAccounts: string[]
  setSelectedAccounts: (accounts: string[]) => void
  selectedCategories: string[]
  setSelectedCategories: (categories: string[]) => void
  amountRange: { min: string; max: string }
  setAmountRange: (range: { min: string; max: string }) => void
}

const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  accounts,
  selectedAccounts,
  setSelectedAccounts,
  selectedCategories,
  setSelectedCategories,
  amountRange,
  setAmountRange
}) => {
  const categories = [
    'Food & Drink',
    'Shopping',
    'Transportation',
    'Bills & Utilities',
    'Entertainment',
    'Healthcare',
    'Income',
    'Transfer',
    'Other'
  ]
  
  const toggleAccount = (accountId: string) => {
    if (selectedAccounts.includes(accountId)) {
      setSelectedAccounts(selectedAccounts.filter(id => id !== accountId))
    } else {
      setSelectedAccounts([...selectedAccounts, accountId])
    }
  }
  
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }
  
  const clearAllFilters = () => {
    setSelectedAccounts([])
    setSelectedCategories([])
    setAmountRange({ min: '', max: '' })
  }
  
  const hasActiveFilters = selectedAccounts.length > 0 || selectedCategories.length > 0 || amountRange.min || amountRange.max
  
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Accounts */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Accounts</h4>
          <div className="space-y-2">
            {accounts.map((account) => (
              <label key={account.id} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedAccounts.includes(account.id)}
                  onChange={() => toggleAccount(account.id)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">{account.name}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Categories */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Categories</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {categories.map((category) => (
              <label key={category} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => toggleCategory(category)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Amount Range */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Amount Range</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Minimum</label>
              <input
                type="number"
                placeholder="$0"
                value={amountRange.min}
                onChange={(e) => setAmountRange({ ...amountRange, min: e.target.value })}
                className="input-field text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Maximum</label>
              <input
                type="number"
                placeholder="No limit"
                value={amountRange.max}
                onChange={(e) => setAmountRange({ ...amountRange, max: e.target.value })}
                className="input-field text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionFilters