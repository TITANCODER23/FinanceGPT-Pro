import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Shield, Target, PiggyBank } from 'lucide-react'

const FinancialHealthScore = () => {
  const score = 78
  const maxScore = 100
  
  const scoreFactors = [
    { label: 'Savings Rate', value: 85, icon: <PiggyBank className="w-4 h-4" /> },
    { label: 'Debt Management', value: 72, icon: <Shield className="w-4 h-4" /> },
    { label: 'Budget Adherence', value: 90, icon: <Target className="w-4 h-4" /> },
    { label: 'Investment Growth', value: 65, icon: <TrendingUp className="w-4 h-4" /> },
  ]
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }
  
  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-600'
    if (score >= 60) return 'from-yellow-500 to-orange-600'
    return 'from-red-500 to-pink-600'
  }
  
  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Financial Health Score</h2>
      
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32">
          {/* Background Circle */}
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="2"
            />
            <motion.path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="url(#scoreGradient)"
              strokeWidth="2"
              strokeDasharray={`${score}, 100`}
              initial={{ strokeDasharray: "0, 100" }}
              animate={{ strokeDasharray: `${score}, 100` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Score Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className={`text-2xl font-bold ${getScoreColor(score)}`}
              >
                {score}
              </motion.span>
              <p className="text-xs text-gray-500">/ {maxScore}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mb-6">
        <h3 className={`text-lg font-semibold ${getScoreColor(score)}`}>
          {score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : 'Needs Improvement'}
        </h3>
        <p className="text-sm text-gray-500">
          Your financial health is {score >= 80 ? 'strong' : score >= 60 ? 'stable' : 'improving'}
        </p>
      </div>
      
      {/* Score Factors */}
      <div className="space-y-3">
        {scoreFactors.map((factor, index) => (
          <motion.div
            key={factor.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-2">
              <div className="text-gray-400">
                {factor.icon}
              </div>
              <span className="text-sm text-gray-700">{factor.label}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-16 bg-gray-200 rounded-full h-1.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${factor.value}%` }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  className={`h-1.5 rounded-full bg-gradient-to-r ${getScoreGradient(factor.value)}`}
                />
              </div>
              <span className={`text-sm font-medium ${getScoreColor(factor.value)}`}>
                {factor.value}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default FinancialHealthScore