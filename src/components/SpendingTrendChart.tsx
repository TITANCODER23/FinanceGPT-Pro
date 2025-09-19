import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

const SpendingTrendChart = () => {
  const data = [
    { date: 'Jan 1', spending: 1200, budget: 1500, income: 3000 },
    { date: 'Jan 8', spending: 1350, budget: 1500, income: 3000 },
    { date: 'Jan 15', spending: 1100, budget: 1500, income: 3000 },
    { date: 'Jan 22', spending: 1450, budget: 1500, income: 3000 },
    { date: 'Jan 29', spending: 1600, budget: 1500, income: 3000 },
    { date: 'Feb 5', spending: 1300, budget: 1500, income: 3000 },
    { date: 'Feb 12', spending: 1250, budget: 1500, income: 3000 },
  ]
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: ${entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }
  
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Spending Trend</h2>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary-500 rounded-full" />
            <span className="text-gray-600">Spending</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-300 rounded-full" />
            <span className="text-gray-600">Budget</span>
          </div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="spending"
              stroke="#0066FF"
              strokeWidth={3}
              dot={{ fill: '#0066FF', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#0066FF', strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="budget"
              stroke="#d1d5db"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {/* Insights */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-50 rounded-lg p-3">
          <p className="text-sm font-medium text-green-800">Under Budget</p>
          <p className="text-xs text-green-600">You're $150 under budget this week</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-3">
          <p className="text-sm font-medium text-blue-800">Trending Down</p>
          <p className="text-xs text-blue-600">Spending decreased 8% from last month</p>
        </div>
      </div>
    </div>
  )
}

export default SpendingTrendChart