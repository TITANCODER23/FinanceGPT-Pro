import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Shield, 
  Bell, 
  Eye, 
  Palette, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Camera,
  Lock,
  Smartphone,
  Brain,
  Globe,
  Download
} from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import toast from 'react-hot-toast'

const Settings = () => {
  const { user, logout } = useAuthStore()
  const [settings, setSettings] = useState({
    notifications: {
      transactions: true,
      summaries: true,
      alerts: true,
      threshold: 100
    },
    ai: {
      learning: true,
      frequency: 'daily',
      autoCategorization: true
    },
    privacy: {
      biometric: false,
      autoLock: true,
      dataExport: false
    },
    display: {
      theme: 'light',
      currency: 'USD',
      dateFormat: 'MM/dd/yyyy'
    }
  })
  
  const settingSections = [
    {
      title: 'Profile',
      icon: <User className="w-5 h-5" />,
      items: [
        { label: 'Personal Information', description: 'Update your name, email, and photo' },
        { label: 'Change Password', description: 'Update your account password' },
        { label: 'Two-Factor Authentication', description: 'Add an extra layer of security' },
      ]
    },
    {
      title: 'AI Preferences',
      icon: <Brain className="w-5 h-5" />,
      items: [
        { 
          label: 'AI Learning', 
          description: 'Allow AI to learn from your spending patterns',
          toggle: true,
          value: settings.ai.learning,
          onChange: (value: boolean) => setSettings(prev => ({
            ...prev,
            ai: { ...prev.ai, learning: value }
          }))
        },
        { 
          label: 'Insight Frequency', 
          description: 'How often you receive AI insights',
          select: true,
          value: settings.ai.frequency,
          options: [
            { value: 'daily', label: 'Daily' },
            { value: 'weekly', label: 'Weekly' },
            { value: 'monthly', label: 'Monthly' }
          ],
          onChange: (value: string) => setSettings(prev => ({
            ...prev,
            ai: { ...prev.ai, frequency: value }
          }))
        },
        { 
          label: 'Auto-Categorization', 
          description: 'Automatically categorize transactions with AI',
          toggle: true,
          value: settings.ai.autoCategorization,
          onChange: (value: boolean) => setSettings(prev => ({
            ...prev,
            ai: { ...prev.ai, autoCategorization: value }
          }))
        },
      ]
    },
    {
      title: 'Notifications',
      icon: <Bell className="w-5 h-5" />,
      items: [
        { 
          label: 'Transaction Alerts', 
          description: 'Get notified of new transactions',
          toggle: true,
          value: settings.notifications.transactions,
          onChange: (value: boolean) => setSettings(prev => ({
            ...prev,
            notifications: { ...prev.notifications, transactions: value }
          }))
        },
        { 
          label: 'Weekly Summaries', 
          description: 'Receive weekly spending summaries',
          toggle: true,
          value: settings.notifications.summaries,
          onChange: (value: boolean) => setSettings(prev => ({
            ...prev,
            notifications: { ...prev.notifications, summaries: value }
          }))
        },
        { 
          label: 'Fraud Alerts', 
          description: 'Immediate alerts for suspicious activity',
          toggle: true,
          value: settings.notifications.alerts,
          onChange: (value: boolean) => setSettings(prev => ({
            ...prev,
            notifications: { ...prev.notifications, alerts: value }
          }))
        },
        { 
          label: 'Alert Threshold', 
          description: 'Minimum amount for transaction alerts',
          input: true,
          value: settings.notifications.threshold,
          onChange: (value: number) => setSettings(prev => ({
            ...prev,
            notifications: { ...prev.notifications, threshold: value }
          }))
        },
      ]
    },
    {
      title: 'Privacy & Security',
      icon: <Shield className="w-5 h-5" />,
      items: [
        { 
          label: 'Biometric Login', 
          description: 'Use fingerprint or face ID to sign in',
          toggle: true,
          value: settings.privacy.biometric,
          onChange: (value: boolean) => setSettings(prev => ({
            ...prev,
            privacy: { ...prev.privacy, biometric: value }
          }))
        },
        { 
          label: 'Auto-Lock', 
          description: 'Automatically lock app when inactive',
          toggle: true,
          value: settings.privacy.autoLock,
          onChange: (value: boolean) => setSettings(prev => ({
            ...prev,
            privacy: { ...prev.privacy, autoLock: value }
          }))
        },
        { label: 'Data Export', description: 'Download your financial data' },
        { label: 'Delete Account', description: 'Permanently delete your account and data' },
      ]
    },
    {
      title: 'Display',
      icon: <Palette className="w-5 h-5" />,
      items: [
        { 
          label: 'Theme', 
          description: 'Choose your preferred theme',
          select: true,
          value: settings.display.theme,
          options: [
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'auto', label: 'Auto' }
          ],
          onChange: (value: string) => setSettings(prev => ({
            ...prev,
            display: { ...prev.display, theme: value }
          }))
        },
        { 
          label: 'Currency', 
          description: 'Default currency for display',
          select: true,
          value: settings.display.currency,
          options: [
            { value: 'USD', label: 'US Dollar ($)' },
            { value: 'EUR', label: 'Euro (€)' },
            { value: 'GBP', label: 'British Pound (£)' }
          ],
          onChange: (value: string) => setSettings(prev => ({
            ...prev,
            display: { ...prev.display, currency: value }
          }))
        },
        { 
          label: 'Date Format', 
          description: 'How dates are displayed',
          select: true,
          value: settings.display.dateFormat,
          options: [
            { value: 'MM/dd/yyyy', label: 'MM/DD/YYYY' },
            { value: 'dd/MM/yyyy', label: 'DD/MM/YYYY' },
            { value: 'yyyy-MM-dd', label: 'YYYY-MM-DD' }
          ],
          onChange: (value: string) => setSettings(prev => ({
            ...prev,
            display: { ...prev.display, dateFormat: value }
          }))
        },
      ]
    },
    {
      title: 'About',
      icon: <HelpCircle className="w-5 h-5" />,
      items: [
        { label: 'App Version', description: 'v1.0.0' },
        { label: 'Terms of Service', description: 'Read our terms and conditions' },
        { label: 'Privacy Policy', description: 'How we protect your data' },
        { label: 'Help & Support', description: 'Get help with using the app' },
      ]
    }
  ]
  
  const handleLogout = () => {
    if (confirm('Are you sure you want to sign out?')) {
      logout()
      toast.success('Signed out successfully')
    }
  }
  
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      
      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-16 h-16 rounded-full bg-gray-200"
            />
            <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-white hover:bg-primary-600 transition-colors">
              <Camera className="w-3 h-3" />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
            <p className="text-gray-500">{user?.email}</p>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
              <CheckCircle className="w-3 h-3 mr-1" />
              Verified Account
            </span>
          </div>
        </div>
      </motion.div>
      
      {/* Settings Sections */}
      {settingSections.map((section, sectionIndex) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: sectionIndex * 0.1 }}
          className="card"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              {section.icon}
              <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {section.items.map((item, itemIndex) => (
              <div key={itemIndex} className="p-6 flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{item.label}</h3>
                  <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  {item.toggle && (
                    <button
                      onClick={() => item.onChange?.(!(item.value as boolean))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        item.value ? 'bg-primary-500' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          item.value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  )}
                  
                  {item.select && (
                    <select
                      value={item.value as string}
                      onChange={(e) => item.onChange?.(e.target.value)}
                      className="input-field text-sm w-32"
                    >
                      {item.options?.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                  
                  {item.input && (
                    <input
                      type="number"
                      value={item.value as number}
                      onChange={(e) => item.onChange?.(parseInt(e.target.value) || 0)}
                      className="input-field text-sm w-20"
                      min="0"
                    />
                  )}
                  
                  {!item.toggle && !item.select && !item.input && (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
      
      {/* Sign Out */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card p-6"
      >
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </motion.div>
      
      {/* Plaid Link Modal */}
      <PlaidLinkModal
        isOpen={showPlaidModal}
        onClose={() => setShowPlaidModal(false)}
      />
    </div>
  )
}

export default Settings