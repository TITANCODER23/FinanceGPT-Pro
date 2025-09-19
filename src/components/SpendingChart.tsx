import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const SpendingChart = () => {
  const data = [
    { category: 'Food', amount: 450, budget: 500 },
    { category: 'Transport', amount: 280, budget: 300 },
    { category: 'Shopping', amount: 320, budget: 250 },
    { category: 'Bills', amount: 180, budget: 200 },
    { category: 'Entertainment', amount: 150, budget: 200 },
  ]
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-sm text-blue-600">
            Spent: ${payload[0].value}
          </p>
          <p className="text-sm text-gray-500">
            Budget: ${payload[1]?.value || 0}
          </p>
        </div>
      )
    }
    return null
  }
  
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="category" 
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
          <Bar 
            dataKey="amount" 
            fill="#0066FF" 
            radius={[4, 4, 0, 0]}
            name="Spent"
          />
          <Bar 
            dataKey="budget" 
            fill="#e5e7eb" 
            radius={[4, 4, 0, 0]}
            name="Budget"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SpendingChart