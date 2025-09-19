import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, PieChart, BarChart3, Brain, Calendar, Target } from 'lucide-react'
import { useBankStore } from '../stores/bankStore'
import FinancialHealthScore from '../components/FinancialHealthScore'
import CategoryChart from '../components/CategoryChart'
import SpendingTrendChart from '../components/SpendingTrendChart'
import AIInsightCard from '../components/AIInsightCard'
import CategoryComparison from '../components/CategoryComparison'
import TopMerchants from '../components/TopMerchants'

const Analytics = () => {
  const { transactions } = useBankStore()
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedPeriod, setSelectedPeriod] = useState('30')
  
  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'spending', label: 'Spending', icon: <PieChart className="w-4 h-4" /> },
    { id: 'income', label: 'Income', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'trends', label: 'Trends', icon: <Calendar className="w-4 h-4" /> },
    { id: 'predictions', label: 'AI Predictions', icon: <Brain className="w-4 h-4" /> },
  ]
  
  const periods = [
    { value: '7', label: '7 days' },
    { value: '30', label: '30 days' },
    { value: '90', label: '90 days' },
  ]
  
  const aiPredictions = [
    {
      title: "Weekend Spending Alert",
      description: "You typically spend 40% more on weekends. Consider setting a weekend budget of $200.",
      type: "warning" as const,
      confidence: 0.87
    },
    {
      title: "Subscription Optimization",
      description: "3 unused subscriptions detected totaling $47/month. Cancel to save $564 annually.",
      type: "savings" as const,
      amount: 564,
      confidence: 0.92
    },
    {
      title: "Cooking Savings",
      description: "Cook 2 more days per week to save approximately $180/month on food expenses.",
      type: "insight" as const,
      amount: 180,
      confidence: 0.85
    },
    {
      title: "Investment Opportunity",
      description: "Your savings rate increased 15% this month. Consider investing the extra $300.",
      type: "savings" as const,
      amount: 300,
      confidence: 0.78
    }
  ]
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FinancialHealthScore />
            <CategoryChart />
            <div className="lg:col-span-2">
              <SpendingTrendChart />
            </div>
          </div>
        )
      
      case 'spending':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CategoryChart />
            <CategoryComparison />
            <div className="lg:col-span-2">
              <TopMerchants />
            </div>
          </div>
        )
      
      case 'predictions':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiPredictions.map((prediction, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <AIInsightCard insight={prediction} />
              </motion.div>
            ))}
          </div>
        )
      
      default:
        return (
          <div className="card p-8 text-center">
            <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-gray-500">This section is under development.</p>
          </div>
        )
    }
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="input-field text-sm"
          >
            {periods.map(period => (
              <option key={period.value} value={period.value}>
                {period.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
      
      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderTabContent()}
      </motion.div>
    </div>
  )
}

export default Analytics