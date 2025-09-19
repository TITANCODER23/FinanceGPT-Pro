import React from 'react'
import { motion } from 'framer-motion'
import { Brain, TrendingUp, AlertTriangle, Lightbulb, DollarSign } from 'lucide-react'

interface AIInsight {
  title: string
  description: string
  type: 'savings' | 'warning' | 'insight'
  amount?: number
  confidence?: number
}

interface AIInsightCardProps {
  insight: AIInsight
}

const AIInsightCard: React.FC<AIInsightCardProps> = ({ insight }) => {
  const getInsightConfig = () => {
    switch (insight.type) {
      case 'savings':
        return {
          gradient: 'from-green-500 to-emerald-600',
          icon: <DollarSign className="w-5 h-5" />,
          bgColor: 'bg-green-50',
          textColor: 'text-green-700'
        }
      case 'warning':
        return {
          gradient: 'from-orange-500 to-red-500',
          icon: <AlertTriangle className="w-5 h-5" />,
          bgColor: 'bg-orange-50',
          textColor: 'text-orange-700'
        }
      case 'insight':
        return {
          gradient: 'from-purple-500 to-indigo-600',
          icon: <Lightbulb className="w-5 h-5" />,
          bgColor: 'bg-purple-50',
          textColor: 'text-purple-700'
        }
    }
  }
  
  const config = getInsightConfig()
  
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="card p-6 cursor-pointer group"
    >
      <div className="flex items-start space-x-4">
        <div className={`w-12 h-12 bg-gradient-to-r ${config.gradient} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
          {config.icon}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-semibold text-gray-900">{insight.title}</h3>
            {insight.amount && (
              <span className={`text-sm font-medium ${config.textColor}`}>
                ${insight.amount}/mo
              </span>
            )}
          </div>
          
          <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-500">
                AI Confidence: {Math.round((insight.confidence || 0.8) * 100)}%
              </span>
            </div>
            
            <button className={`text-xs font-medium ${config.textColor} hover:underline`}>
              Learn More
            </button>
          </div>
        </div>
      </div>
      
      {/* Confidence Bar */}
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-1">
          <div
            className={`h-1 rounded-full bg-gradient-to-r ${config.gradient} transition-all duration-500`}
            style={{ width: `${(insight.confidence || 0.8) * 100}%` }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default AIInsightCard