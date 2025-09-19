import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Search, Check, ArrowRight, Shield, Zap } from 'lucide-react'
import { useBankStore } from '../stores/bankStore'
import toast from 'react-hot-toast'

interface PlaidLinkModalProps {
  isOpen: boolean
  onClose: () => void
}

const PlaidLinkModal: React.FC<PlaidLinkModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1)
  const [selectedBank, setSelectedBank] = useState<any>(null)
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { addAccount } = useBankStore()
  
  const popularBanks = [
    { id: 'chase', name: 'Chase', logo: '🏦', color: 'bg-blue-600' },
    { id: 'bofa', name: 'Bank of America', logo: '🏛️', color: 'bg-red-600' },
    { id: 'wells', name: 'Wells Fargo', logo: '🏪', color: 'bg-yellow-600' },
    { id: 'citi', name: 'Citibank', logo: '🏢', color: 'bg-blue-500' },
    { id: 'capital', name: 'Capital One', logo: '💳', color: 'bg-orange-600' },
    { id: 'ally', name: 'Ally Bank', logo: '💰', color: 'bg-purple-600' },
  ]
  
  const mockAccounts = [
    { id: 'acc1', name: 'Primary Checking', type: 'checking', balance: 2450.75 },
    { id: 'acc2', name: 'Savings Account', type: 'savings', balance: 8920.50 },
    { id: 'acc3', name: 'Credit Card', type: 'credit', balance: -1250.30 },
  ]
  
  const handleBankSelect = (bank: any) => {
    setSelectedBank(bank)
    setStep(2)
  }
  
  const handleCredentialsSubmit = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    setStep(3)
  }
  
  const handleAccountToggle = (accountId: string) => {
    if (selectedAccounts.includes(accountId)) {
      setSelectedAccounts(selectedAccounts.filter(id => id !== accountId))
    } else {
      setSelectedAccounts([...selectedAccounts, accountId])
    }
  }
  
  const handleComplete = async () => {
    setIsLoading(true)
    
    // Simulate adding accounts
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    selectedAccounts.forEach(accountId => {
      const mockAccount = mockAccounts.find(acc => acc.id === accountId)
      if (mockAccount) {
        addAccount({
          name: mockAccount.name,
          type: mockAccount.type as any,
          balance: mockAccount.balance,
          lastFour: Math.random().toString().slice(2, 6),
          bankName: selectedBank.name,
          bankLogo: selectedBank.logo,
          isConnected: true,
          lastSync: new Date(),
          plaidAccountId: accountId
        })
      }
    })
    
    setIsLoading(false)
    setStep(4)
    
    setTimeout(() => {
      onClose()
      resetModal()
      toast.success(`${selectedAccounts.length} account(s) connected successfully!`)
    }, 2000)
  }
  
  const resetModal = () => {
    setStep(1)
    setSelectedBank(null)
    setCredentials({ username: '', password: '' })
    setSelectedAccounts([])
  }
  
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Your Bank</h3>
            
            {/* Search */}
            <div className="relative mb-6">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for your bank..."
                className="input-field pl-10"
              />
            </div>
            
            {/* Popular Banks */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Popular Banks</h4>
              <div className="grid grid-cols-2 gap-3">
                {popularBanks.map((bank) => (
                  <motion.button
                    key={bank.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleBankSelect(bank)}
                    className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all"
                  >
                    <div className={`w-10 h-10 ${bank.color} rounded-lg flex items-center justify-center text-white text-lg`}>
                      {bank.logo}
                    </div>
                    <span className="font-medium text-gray-900">{bank.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        )
      
      case 2:
        return (
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className={`w-12 h-12 ${selectedBank.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                {selectedBank.logo}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{selectedBank.name}</h3>
                <p className="text-sm text-gray-500">Enter your online banking credentials</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                  className="input-field"
                  placeholder="Enter your username"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="input-field"
                  placeholder="Enter your password"
                />
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Shield className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Your data is secure</p>
                    <p className="text-xs text-blue-700 mt-1">
                      We use bank-level 256-bit encryption. Your credentials are never stored.
                    </p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleCredentialsSubmit}
                disabled={!credentials.username || !credentials.password || isLoading}
                className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Connecting...
                  </div>
                ) : (
                  'Connect Account'
                )}
              </button>
            </div>
          </div>
        )
      
      case 3:
        return (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Accounts to Import</h3>
            <p className="text-sm text-gray-500 mb-6">
              Choose which accounts you'd like to connect and monitor.
            </p>
            
            <div className="space-y-3">
              {mockAccounts.map((account) => (
                <motion.div
                  key={account.id}
                  whileHover={{ backgroundColor: '#f9fafb' }}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg cursor-pointer"
                  onClick={() => handleAccountToggle(account.id)}
                >
                  <input
                    type="checkbox"
                    checked={selectedAccounts.includes(account.id)}
                    onChange={() => handleAccountToggle(account.id)}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{account.name}</h4>
                        <p className="text-sm text-gray-500 capitalize">{account.type}</p>
                      </div>
                      <p className="font-semibold text-gray-900">
                        ${Math.abs(account.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <button
              onClick={handleComplete}
              disabled={selectedAccounts.length === 0 || isLoading}
              className="w-full btn-primary py-3 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Importing Accounts...
                </div>
              ) : (
                `Import ${selectedAccounts.length} Account${selectedAccounts.length !== 1 ? 's' : ''}`
              )}
            </button>
          </div>
        )
      
      case 4:
        return (
          <div className="text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.6 }}
              className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Check className="w-8 h-8 text-white" />
            </motion.div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Success!</h3>
            <p className="text-gray-500 mb-6">
              Your accounts have been connected successfully. You'll start seeing transactions shortly.
            </p>
            
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center justify-center space-x-2 text-green-700">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">AI categorization is now active</span>
              </div>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={onClose}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative transform overflow-hidden rounded-2xl bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold text-gray-900">Connect Account</h3>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    Step {step} of 4
                  </span>
                </div>
                <button
                  onClick={() => {
                    onClose()
                    resetModal()
                  }}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <motion.div
                    initial={{ width: '25%' }}
                    animate={{ width: `${step * 25}%` }}
                    className="bg-primary-500 h-1 rounded-full transition-all duration-300"
                  />
                </div>
              </div>
              
              {/* Step Content */}
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
              </motion.div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default PlaidLinkModal