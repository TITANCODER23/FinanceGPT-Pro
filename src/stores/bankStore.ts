import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Account {
  id: string
  name: string
  type: 'checking' | 'savings' | 'credit' | 'investment'
  balance: number
  lastFour: string
  bankName: string
  bankLogo: string
  isConnected: boolean
  lastSync: Date
  plaidAccountId?: string
}

export interface Transaction {
  id: string
  accountId: string
  amount: number
  description: string
  merchant: string
  category: string
  aiCategory?: string
  aiConfidence?: number
  date: Date
  pending: boolean
  merchantLogo?: string
  notes?: string
  isRecurring?: boolean
  location?: string
}

interface BankState {
  accounts: Account[]
  transactions: Transaction[]
  isLoading: boolean
  addAccount: (account: Omit<Account, 'id'>) => void
  updateAccount: (id: string, updates: Partial<Account>) => void
  removeAccount: (id: string) => void
  addTransactions: (transactions: Omit<Transaction, 'id'>[]) => void
  updateTransaction: (id: string, updates: Partial<Transaction>) => void
  setLoading: (loading: boolean) => void
}

// Mock data
const mockAccounts: Account[] = [
  {
    id: '1',
    name: 'Primary Checking',
    type: 'checking',
    balance: 4250.75,
    lastFour: '4532',
    bankName: 'Chase Bank',
    bankLogo: '🏦',
    isConnected: true,
    lastSync: new Date(),
  },
  {
    id: '2',
    name: 'High Yield Savings',
    type: 'savings',
    balance: 12840.50,
    lastFour: '7891',
    bankName: 'Ally Bank',
    bankLogo: '💰',
    isConnected: true,
    lastSync: new Date(),
  },
  {
    id: '3',
    name: 'Freedom Credit Card',
    type: 'credit',
    balance: -1250.30,
    lastFour: '2468',
    bankName: 'Chase Bank',
    bankLogo: '💳',
    isConnected: true,
    lastSync: new Date(),
  }
]

const mockTransactions: Transaction[] = [
  {
    id: '1',
    accountId: '1',
    amount: -45.67,
    description: 'Starbucks Coffee',
    merchant: 'Starbucks',
    category: 'Food & Drink',
    aiCategory: 'Coffee & Cafes',
    aiConfidence: 0.95,
    date: new Date(),
    pending: false,
    merchantLogo: '☕',
    isRecurring: true,
  },
  {
    id: '2',
    accountId: '1',
    amount: -1250.00,
    description: 'Rent Payment',
    merchant: 'Property Management Co',
    category: 'Housing',
    aiCategory: 'Rent',
    aiConfidence: 0.99,
    date: new Date(Date.now() - 86400000),
    pending: false,
    merchantLogo: '🏠',
    isRecurring: true,
  },
  {
    id: '3',
    accountId: '2',
    amount: 2500.00,
    description: 'Salary Deposit',
    merchant: 'Tech Corp Inc',
    category: 'Income',
    aiCategory: 'Salary',
    aiConfidence: 0.99,
    date: new Date(Date.now() - 172800000),
    pending: false,
    merchantLogo: '💼',
    isRecurring: true,
  },
  {
    id: '4',
    accountId: '1',
    amount: -89.99,
    description: 'Amazon Purchase',
    merchant: 'Amazon',
    category: 'Shopping',
    aiCategory: 'Online Shopping',
    aiConfidence: 0.92,
    date: new Date(Date.now() - 259200000),
    pending: false,
    merchantLogo: '📦',
  },
  {
    id: '5',
    accountId: '3',
    amount: -15.99,
    description: 'Netflix Subscription',
    merchant: 'Netflix',
    category: 'Entertainment',
    aiCategory: 'Streaming Services',
    aiConfidence: 0.98,
    date: new Date(Date.now() - 345600000),
    pending: false,
    merchantLogo: '🎬',
    isRecurring: true,
  }
]

export const useBankStore = create<BankState>()(
  persist(
    (set, get) => ({
      accounts: mockAccounts,
      transactions: mockTransactions,
      isLoading: false,
      
      addAccount: (account) => {
        const newAccount = {
          ...account,
          id: Math.random().toString(36).substr(2, 9),
        }
        set(state => ({
          accounts: [...state.accounts, newAccount]
        }))
      },
      
      updateAccount: (id, updates) => {
        set(state => ({
          accounts: state.accounts.map(account =>
            account.id === id ? { ...account, ...updates } : account
          )
        }))
      },
      
      removeAccount: (id) => {
        set(state => ({
          accounts: state.accounts.filter(account => account.id !== id),
          transactions: state.transactions.filter(transaction => transaction.accountId !== id)
        }))
      },
      
      addTransactions: (newTransactions) => {
        const transactionsWithIds = newTransactions.map(transaction => ({
          ...transaction,
          id: Math.random().toString(36).substr(2, 9),
        }))
        
        set(state => ({
          transactions: [...transactionsWithIds, ...state.transactions]
        }))
      },
      
      updateTransaction: (id, updates) => {
        set(state => ({
          transactions: state.transactions.map(transaction =>
            transaction.id === id ? { ...transaction, ...updates } : transaction
          )
        }))
      },
      
      setLoading: (loading) => {
        set({ isLoading: loading })
      }
    }),
    {
      name: 'bank-storage',
    }
  )
)