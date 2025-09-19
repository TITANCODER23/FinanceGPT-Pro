import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, ArrowUpRight, ArrowDownRight, Plus, Send, CreditCard, PieChart, FileText, Download, Brain, Sparkles } from 'lucide-react'
import { useBankStore } from '../stores/bankStore'
import { useAuthStore } from '../stores/authStore'
import AccountCard from '../components/AccountCard'
import TransactionItem from '../components/TransactionItem'
import QuickActionButton from '../components/QuickActionButton'
import AIInsightCard from '../components/AIInsightCard'
import SpendingChart from '../components/SpendingChart'

const Dashboard = () => {
  const { accounts, transactions } = useBankStore()
  const { user } = useAuthStore()
  
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0)
  const recentTransactions = transactions.slice(0, 5)
  
  const quickActions = [
    { icon: <Send className="w-5 h-5" />, label: 'Transfer', color: 'bg-blue-500' },
    { icon: <CreditCard className="w-5 h-5" />, label: 'Pay Bills', color: 'bg-green-500' },
    { icon: <Plus className="w-5 h-5" />, label: 'Add Account', color: 'bg-purple-500' },
    { icon: <PieChart className="w-5 h-5" />, label: 'Budget', color: 'bg-orange-500' },
    { icon: <FileText className="w-5 h-5" />, label: 'Analytics', color: 'bg-pink-500' },
    { icon: <Download className="w-5 h-5" />, label: 'Export', color: 'bg-indigo-500' },
  ]
  
  const aiInsights = [
    {
      title: "Smart Savings Opportunity",
      description: "You could save $180/month by cooking 2 more days per week instead of ordering takeout.",
      type: "savings" as const,
      amount: 180,
      confidence: 0.92
    },
    {
      title: "Subscription Alert",
      description: "Found 3 unused subscriptions totaling $47/month. Consider canceling to boost savings.",
      type: "warning" as const,
      amount: 47,
      confidence: 0.88
    },
    {
      title: "Spending Pattern",
      description: "You spend 40% more on weekends. Setting a weekend budget could help control expenses.",
      type: "insight" as const,
      confidence: 0.85
    }
  ]
  
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, {user?.name}!
            </h1>
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5" />
              <p className="text-blue-100">
                Your spending is 15% lower this month. Great job staying on budget!
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-sm">Total Balance</p>
            <p className="text-3xl font-bold">
              ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </motion.div>
      
      {/* Account Cards */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Accounts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map((account, index) => (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <AccountCard account={account} />
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* AI Insights */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="w-5 h-5 text-purple-500" />
          <h2 className="text-xl font-semibold text-gray-900">AI Insights</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiInsights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <AIInsightCard insight={insight} />
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.05 }}
            >
              <QuickActionButton {...action} />
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </motion.div>
        
        {/* Spending Snapshot */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="card p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Spending This Month</h2>
          <SpendingChart />
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard