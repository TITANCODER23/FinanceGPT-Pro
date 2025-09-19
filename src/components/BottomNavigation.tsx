import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, CreditCard, BarChart3, Wallet, Settings } from 'lucide-react'

const BottomNavigation = () => {
  const location = useLocation()
  
  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Transactions', href: '/transactions', icon: CreditCard },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Accounts', href: '/accounts', icon: Wallet },
    { name: 'Settings', href: '/settings', icon: Settings },
  ]
  
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-5">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.href
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center justify-center py-2 px-1 transition-colors ${
                isActive
                  ? 'text-primary-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNavigation