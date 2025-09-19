export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: Date
  preferences: {
    currency: string
    notifications: boolean
    aiInsights: boolean
  }
}

export interface PlaidAccount {
  account_id: string
  name: string
  type: string
  subtype: string
  balances: {
    available: number | null
    current: number | null
    limit: number | null
  }
  mask: string
}

export interface PlaidTransaction {
  transaction_id: string
  account_id: string
  amount: number
  date: string
  name: string
  merchant_name?: string
  category: string[]
  location?: {
    address: string
    city: string
    region: string
    postal_code: string
    country: string
  }
}

export interface AIInsight {
  id: string
  type: 'spending' | 'saving' | 'budget' | 'investment'
  title: string
  description: string
  confidence: number
  actionable: boolean
  amount?: number
  category?: string
  createdAt: Date
}

export interface BudgetCategory {
  id: string
  name: string
  budgeted: number
  spent: number
  remaining: number
  percentage: number
  color: string
}

export interface FinancialGoal {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  targetDate: Date
  category: string
  priority: 'low' | 'medium' | 'high'
  isActive: boolean
}