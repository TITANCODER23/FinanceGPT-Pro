import { Transaction } from '../stores/bankStore'

export interface AICategorizationResult {
  category: string
  confidence: number
  subcategory?: string
  isRecurring?: boolean
  merchantType?: string
}

export const categorizeTransaction = (transaction: Partial<Transaction>): AICategorizationResult => {
  const { description, merchant, amount } = transaction
  const text = `${description} ${merchant}`.toLowerCase()
  
  // Food & Dining
  if (text.includes('starbucks') || text.includes('coffee') || text.includes('restaurant') || 
      text.includes('food') || text.includes('dining') || text.includes('cafe')) {
    return {
      category: 'Food & Drink',
      confidence: 0.95,
      subcategory: text.includes('coffee') ? 'Coffee & Cafes' : 'Restaurants',
      isRecurring: text.includes('starbucks') || text.includes('coffee'),
      merchantType: 'restaurant'
    }
  }
  
  // Transportation
  if (text.includes('uber') || text.includes('lyft') || text.includes('taxi') || 
      text.includes('gas') || text.includes('fuel') || text.includes('parking')) {
    return {
      category: 'Transportation',
      confidence: 0.92,
      subcategory: text.includes('uber') || text.includes('lyft') ? 'Rideshare' : 'Fuel',
      merchantType: 'transportation'
    }
  }
  
  // Shopping
  if (text.includes('amazon') || text.includes('target') || text.includes('walmart') || 
      text.includes('shopping') || text.includes('store')) {
    return {
      category: 'Shopping',
      confidence: 0.88,
      subcategory: text.includes('amazon') ? 'Online Shopping' : 'Retail',
      merchantType: 'retail'
    }
  }
  
  // Entertainment
  if (text.includes('netflix') || text.includes('spotify') || text.includes('movie') || 
      text.includes('entertainment') || text.includes('subscription')) {
    return {
      category: 'Entertainment',
      confidence: 0.94,
      subcategory: text.includes('netflix') || text.includes('spotify') ? 'Streaming Services' : 'Entertainment',
      isRecurring: true,
      merchantType: 'subscription'
    }
  }
  
  // Bills & Utilities
  if (text.includes('electric') || text.includes('gas') || text.includes('water') || 
      text.includes('internet') || text.includes('phone') || text.includes('utility')) {
    return {
      category: 'Bills & Utilities',
      confidence: 0.96,
      subcategory: 'Utilities',
      isRecurring: true,
      merchantType: 'utility'
    }
  }
  
  // Income
  if ((amount || 0) > 0 && (text.includes('salary') || text.includes('payroll') || 
      text.includes('deposit') || text.includes('income'))) {
    return {
      category: 'Income',
      confidence: 0.99,
      subcategory: 'Salary',
      isRecurring: true,
      merchantType: 'employer'
    }
  }
  
  // Healthcare
  if (text.includes('pharmacy') || text.includes('doctor') || text.includes('medical') || 
      text.includes('hospital') || text.includes('health')) {
    return {
      category: 'Healthcare',
      confidence: 0.91,
      subcategory: 'Medical',
      merchantType: 'healthcare'
    }
  }
  
  // Default
  return {
    category: 'Other',
    confidence: 0.5,
    merchantType: 'unknown'
  }
}

export const generateSpendingInsights = (transactions: Transaction[]): string[] => {
  const insights: string[] = []
  
  // Weekend spending analysis
  const weekendTransactions = transactions.filter(t => {
    const day = t.date.getDay()
    return day === 0 || day === 6 // Sunday or Saturday
  })
  
  const weekdayTransactions = transactions.filter(t => {
    const day = t.date.getDay()
    return day >= 1 && day <= 5 // Monday to Friday
  })
  
  if (weekendTransactions.length > 0 && weekdayTransactions.length > 0) {
    const weekendAvg = weekendTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0) / weekendTransactions.length
    const weekdayAvg = weekdayTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0) / weekdayTransactions.length
    
    if (weekendAvg > weekdayAvg * 1.4) {
      insights.push(`You spend ${((weekendAvg / weekdayAvg - 1) * 100).toFixed(0)}% more on weekends`)
    }
  }
  
  // Recurring subscription detection
  const subscriptions = transactions.filter(t => t.isRecurring && t.amount < 0)
  if (subscriptions.length > 3) {
    const totalSubscriptions = subscriptions.reduce((sum, t) => sum + Math.abs(t.amount), 0)
    insights.push(`${subscriptions.length} subscriptions costing $${totalSubscriptions.toFixed(0)}/month`)
  }
  
  // Large transaction alert
  const largeTransactions = transactions.filter(t => Math.abs(t.amount) > 500)
  if (largeTransactions.length > 0) {
    insights.push(`${largeTransactions.length} large transaction${largeTransactions.length > 1 ? 's' : ''} this period`)
  }
  
  return insights
}

export const detectAnomalies = (transactions: Transaction[]): Transaction[] => {
  const amounts = transactions.map(t => Math.abs(t.amount))
  const avgAmount = amounts.reduce((sum, amount) => sum + amount, 0) / amounts.length
  const threshold = avgAmount * 3 // 3x average is considered anomalous
  
  return transactions.filter(t => Math.abs(t.amount) > threshold)
}

export const predictNextMonthSpending = (transactions: Transaction[]): number => {
  // Simple prediction based on recent trends
  const recentTransactions = transactions
    .filter(t => t.amount < 0) // Only expenses
    .slice(0, 30) // Last 30 transactions
  
  if (recentTransactions.length === 0) return 0
  
  const totalSpent = recentTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0)
  const avgDaily = totalSpent / 30
  
  return avgDaily * 30 // Predict next 30 days
}

export const calculateSavingsOpportunities = (transactions: Transaction[]): Array<{
  category: string
  currentSpending: number
  potentialSavings: number
  suggestion: string
}> => {
  const categorySpending: { [key: string]: number } = {}
  
  transactions
    .filter(t => t.amount < 0)
    .forEach(t => {
      categorySpending[t.category] = (categorySpending[t.category] || 0) + Math.abs(t.amount)
    })
  
  const opportunities = []
  
  // Food delivery savings
  if (categorySpending['Food & Drink'] > 300) {
    opportunities.push({
      category: 'Food & Drink',
      currentSpending: categorySpending['Food & Drink'],
      potentialSavings: categorySpending['Food & Drink'] * 0.3,
      suggestion: 'Cook at home 2-3 more days per week'
    })
  }
  
  // Subscription optimization
  const subscriptionSpending = transactions
    .filter(t => t.isRecurring && t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)
  
  if (subscriptionSpending > 50) {
    opportunities.push({
      category: 'Subscriptions',
      currentSpending: subscriptionSpending,
      potentialSavings: subscriptionSpending * 0.25,
      suggestion: 'Review and cancel unused subscriptions'
    })
  }
  
  return opportunities
}