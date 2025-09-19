import React from 'react'
import { useLocation } from 'react-router-dom'
import TopNavigation from './TopNavigation'
import BottomNavigation from './BottomNavigation'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation()
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <TopNavigation />
      
      {/* Main Content */}
      <main className="pt-16 pb-20 md:pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>
      
      {/* Bottom Navigation (Mobile) */}
      <BottomNavigation />
    </div>
  )
}

export default Layout