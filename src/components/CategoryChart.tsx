import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const CategoryChart = () => {
  const data = [
    { name: 'Food & Drink', value: 450, color: '#0066FF' },
    { name: 'Shopping', value: 320, color: '#00C851' },
    { name: 'Transportation', value: 280, color: '#FF8800' },
    { name: 'Bills', value: 180, color: '#FF3B30' },
    { name: 'Entertainment', value: 150, color: '#8A2BE2' },
    { name: 'Other', value: 120, color: '#6B7280' },
  ]
  
  const total = data.reduce((sum, item) => sum + item.value, 0)
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      const percentage = ((data.value / total) * 100).toFixed(1)
      
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{data.name}</p>
          <p className="text-sm text-blue-600">${data.value}</p>
          <p className="text-sm text-gray-500">{percentage}% of spending</p>
        </div>
      )
    }
    return null
  }
  
  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Spending by Category</h2>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-gray-700">{item.name}</span>
            <span className="text-sm font-medium text-gray-900 ml-auto">
              ${item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryChart