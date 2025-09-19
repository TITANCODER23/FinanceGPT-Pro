import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Tag, FileText, Flag, Calendar, MapPin, Repeat, Edit3 } from 'lucide-react'
import { Transaction } from '../stores/bankStore'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

interface TransactionModalProps {
  isOpen: boolean
  onClose: () => void
  transaction?: Transaction | null
}

const TransactionModal: React.FC<TransactionModalProps> = ({ 
  isOpen, 
  onClose, 
  transaction 
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    category: '',
    notes: '',
    merchant: ''
  })
  
  useEffect(() => {
    if (transaction) {
      setEditData({
        category: transaction.category,
        notes: transaction.notes || '',
        merchant: transaction.merchant
      })
    }
  }, [transaction])
  
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
  
  const handleSave = () => {
    // Here you would update the transaction
    toast.success('Transaction updated successfully')
    setIsEditing(false)
  }
  
  if (!transaction) return null
  
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
                <h3 className="text-lg font-semibold text-gray-900">Transaction Details</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={onClose}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Transaction Info */}
              <div className="space-y-4">
                {/* Merchant and Amount */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                    {transaction.merchantLogo || '🏪'}
                  </div>
                  <div className="flex-1">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.merchant}
                        onChange={(e) => setEditData(prev => ({ ...prev, merchant: e.target.value }))}
                        className="input-field text-lg font-semibold"
                      />
                    ) : (
                      <h2 className="text-lg font-semibold text-gray-900">{transaction.merchant}</h2>
                    )}
                    <p className={`text-2xl font-bold ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-gray-900'
                    }`}>
                      {transaction.amount > 0 ? '+' : '-'}${Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
                
                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="text-sm font-medium text-gray-900">
                        {format(transaction.date, 'MMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Tag className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Category</p>
                      {isEditing ? (
                        <select
                          value={editData.category}
                          onChange={(e) => setEditData(prev => ({ ...prev, category: e.target.value }))}
                          className="input-field text-sm"
                        >
                          {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      ) : (
                        <p className="text-sm font-medium text-gray-900">{transaction.category}</p>
                      )}
                    </div>
                  </div>
                  
                  {transaction.location && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="text-sm font-medium text-gray-900">{transaction.location}</p>
                      </div>
                    </div>
                  )}
                  
                  {transaction.isRecurring && (
                    <div className="flex items-center space-x-2">
                      <Repeat className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Type</p>
                        <p className="text-sm font-medium text-gray-900">Recurring</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* AI Category */}
                {transaction.aiCategory && (
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 bg-purple-500 rounded-lg flex items-center justify-center">
                        <Tag className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm font-medium text-purple-900">AI Categorization</span>
                    </div>
                    <p className="text-sm text-purple-700">
                      Categorized as "{transaction.aiCategory}" with {Math.round((transaction.aiConfidence || 0) * 100)}% confidence
                    </p>
                  </div>
                )}
                
                {/* Notes */}
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <label className="text-sm font-medium text-gray-700">Notes</label>
                  </div>
                  {isEditing ? (
                    <textarea
                      value={editData.notes}
                      onChange={(e) => setEditData(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Add a note about this transaction..."
                      className="input-field resize-none"
                      rows={3}
                    />
                  ) : (
                    <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                      {transaction.notes || 'No notes added'}
                    </p>
                  )}
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="flex-1 btn-primary"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="flex-1 btn-secondary"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="flex-1 btn-secondary flex items-center justify-center space-x-2">
                        <Flag className="w-4 h-4" />
                        <span>Flag</span>
                      </button>
                      <button className="flex-1 btn-primary flex items-center justify-center space-x-2">
                        <Tag className="w-4 h-4" />
                        <span>Recategorize</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default TransactionModal