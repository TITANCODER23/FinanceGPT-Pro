import { useState, useCallback } from 'react'
import { useBankStore } from '../stores/bankStore'
import { PlaidAccount, PlaidTransaction } from '../types'
import { categorizeTransaction } from '../utils/aiHelpers'

export const usePlaid = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { addAccount, addTransactions } = useBankStore()
  
  const onSuccess = useCallback(async (publicToken: string, metadata: any) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // In a real app, you would exchange the public token for an access token
      // and fetch account data from your backend
      
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock account data
      const accounts: PlaidAccount[] = metadata.accounts || []
      
      // Add accounts to store
      accounts.forEach((plaidAccount: PlaidAccount) => {
        addAccount({
          name: plaidAccount.name,
          type: plaidAccount.subtype as any,
          balance: plaidAccount.balances.current || 0,
          lastFour: plaidAccount.mask || '0000',
          bankName: metadata.institution.name,
          bankLogo: '🏦', // In real app, you'd have actual logos
          isConnected: true,
          lastSync: new Date(),
          plaidAccountId: plaidAccount.account_id
        })
      })
      
      // Mock transaction data with AI categorization
      const mockTransactions = [
        {
          accountId: accounts[0]?.account_id || '1',
          amount: -45.67,
          description: 'Starbucks Coffee',
          merchant: 'Starbucks',
          date: new Date(),
          pending: false,
          merchantLogo: '☕',
        },
        {
          accountId: accounts[0]?.account_id || '1',
          amount: -89.99,
          description: 'Amazon Purchase',
          merchant: 'Amazon',
          date: new Date(Date.now() - 86400000),
          pending: false,
          merchantLogo: '📦',
        }
      ].map(transaction => {
        const aiResult = categorizeTransaction(transaction)
        return {
          ...transaction,
          category: aiResult.category,
          aiCategory: aiResult.subcategory,
          aiConfidence: aiResult.confidence,
          isRecurring: aiResult.isRecurring
        }
      })
      
      addTransactions(mockTransactions)
      
    } catch (err) {
      setError('Failed to connect account. Please try again.')
      console.error('Plaid connection error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [addAccount, addTransactions])
  
  const onExit = useCallback((err: any, metadata: any) => {
    if (err) {
      setError('Connection cancelled or failed')
      console.error('Plaid exit error:', err)
    }
  }, [])
  
  return {
    onSuccess,
    onExit,
    isLoading,
    error,
    clearError: () => setError(null)
  }
}