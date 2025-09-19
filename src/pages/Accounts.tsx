import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, RefreshCw, AlertCircle, CheckCircle, Clock } from 'lucide-react'
import { useBankStore } from '../stores/bankStore'
import AccountCard from '../components/AccountCard'
import PlaidLinkModal from '../components/PlaidLinkModal'
import toast from 'react-hot-toast'

const Accounts = () => {
  const { accounts, updateAccount, removeAccount } = useBankStore()
  const [showPlaidModal, setShowPlaidModal] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState<string | null>(null)
  
  const handleRefreshAccount = async (accountId: string) => {
    setIsRefreshing(accountId)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    updateAccount(accountId, { lastSync: new Date() })
    setIsRefreshing(null)
    toast.success('Account refreshed successfully')
  }
  
  const handleReconnectAccount = (accountId: string) => {
    // Simulate reconnection
    updateAccount(accountId, { isConnected: true, lastSync: new Date() })
    toast.success('Account reconnected successfully')
  }
  
  const getStatusIcon = (account: any) => {
    if (!account.isConnected) {
      return <AlertCircle className="w-5 h-5 text-red-500" />
    }
    
    const hoursSinceSync = (Date.now() - account.lastSync.getTime()) / (1000 * 60 * 60)
    if (hoursSinceSync > 24) {
      return <Clock className="w-5 h-5 text-yellow-500" />
    }
    
    return <CheckCircle className="w-5 h-5 text-green-500" />
  }
  
  const getStatusText = (account: any) => {
    if (!account.isConnected) {
      return 'Connection lost'
    }
    
    const hoursSinceSync = (Date.now() - account.lastSync.getTime()) / (1000 * 60 * 60)
    if (hoursSinceSync > 24) {
      return 'Needs refresh'
    }
    
    if (hoursSinceSync < 1) {
      return 'Just synced'
    }
    
    return `Synced ${Math.floor(hoursSinceSync)}h ago`
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Connected Accounts</h1>
        <button
          onClick={() => setShowPlaidModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Account</span>
        </button>
      </div>
      
      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((account, index) => (
          <motion.div
            key={account.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                  {account.bankLogo}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{account.name}</h3>
                  <p className="text-sm text-gray-500">{account.bankName}</p>
                  <p className="text-xs text-gray-400">•••• {account.lastFour}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {getStatusIcon(account)}
                <button
                  onClick={() => handleRefreshAccount(account.id)}
                  disabled={isRefreshing === account.id}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing === account.id ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-2xl font-bold text-gray-900">
                ${Math.abs(account.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
              <div className="flex items-center justify-between mt-1">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  account.type === 'checking' ? 'bg-blue-100 text-blue-800' :
                  account.type === 'savings' ? 'bg-green-100 text-green-800' :
                  account.type === 'credit' ? 'bg-purple-100 text-purple-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {account.type.charAt(0).toUpperCase() + account.type.slice(1)}
                </span>
                <span className="text-xs text-gray-500">
                  {getStatusText(account)}
                </span>
              </div>
            </div>
            
            {!account.isConnected && (
              <button
                onClick={() => handleReconnectAccount(account.id)}
                className="w-full btn-primary text-sm py-2"
              >
                Reconnect Account
              </button>
            )}
            
            {account.isConnected && (
              <div className="flex space-x-2">
                <button className="flex-1 btn-secondary text-sm py-2">
                  View Details
                </button>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to remove this account?')) {
                      removeAccount(account.id)
                      toast.success('Account removed successfully')
                    }
                  }}
                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
                >
                  Remove
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Empty State */}
      {accounts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card p-12 text-center"
        >
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-primary-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No accounts connected</h3>
          <p className="text-gray-500 mb-6">
            Connect your bank accounts to start tracking your finances with AI-powered insights.
          </p>
          <button
            onClick={() => setShowPlaidModal(true)}
            className="btn-primary"
          >
            Connect Your First Account
          </button>
        </motion.div>
      )}
      
      {/* Plaid Link Modal */}
      <PlaidLinkModal
        isOpen={showPlaidModal}
        onClose={() => setShowPlaidModal(false)}
      />
    </div>
  )
}

export default Accounts