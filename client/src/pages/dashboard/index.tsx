import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import DashboardStats from '../../components/dashboard/DashboardStats'
import RecentActivity from '../../components/dashboard/RecentActivity'
import LoanList from '../../components/Loans/LoanList'
import api from '../../lib/api'
import { isAuthenticated, getUser } from '../../lib/auth'

const DashboardPage: React.FC = () => {
  const [loans, setLoans] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  
  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      router.push('/login')
      return
    }
    
    // Get user data
    const userData = getUser()
    setUser(userData)
    
    // Fetch user's loans
    const fetchLoans = async () => {
      try {
        const endpoint = userData?.role === 'admin' ? '/loans' : '/loans/user'
        const response = await api.get(endpoint)
        setLoans(response.data)
      } catch (error) {
        console.error('Error fetching loans:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchLoans()
  }, [])
  
  const isAdmin = user?.role === 'admin'
  const isBorrower = user?.role === 'borrower'
  
  return (
    <Layout title="Dashboard - LoanEase Pro">
      {/* Professional Header Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 mb-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Welcome back, {user?.firstName || 'User'}!
            </h1>
            <p className="text-primary-100 text-lg">
              {isAdmin ? 'Administrative Dashboard' : 'Your Personal Loan Dashboard'}
            </p>
            <div className="flex items-center mt-4 space-x-4">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
              </span>
              <span className="text-primary-100">
                Last login: {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold">
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <DashboardStats loans={loans} userRole={user?.role} />
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mt-8">
        {/* Primary Content Area */}
        <div className="xl:col-span-3 space-y-8">
          {/* Loan Applications Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <svg className="w-6 h-6 mr-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {isAdmin ? 'All Loan Applications' : 'Your Loan Applications'}
              </h2>
              <p className="text-gray-600 mt-1">
                {isAdmin ? 'Manage and review all loan applications' : 'Track your loan application status'}
              </p>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600 mb-4"></div>
                  <p className="text-gray-500 text-lg">Loading applications...</p>
                </div>
              ) : (
                <LoanList loans={loans} userRole={user?.role} />
              )}
            </div>
          </div>
          
          {/* Admin-specific sections */}
          {isAdmin && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  Pending Reviews
                </h3>
                <div className="text-3xl font-bold text-warning-600 mb-2">
                  {loans.filter((loan: any) => loan.status === 'pending').length}
                </div>
                <p className="text-gray-600">Applications awaiting review</p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Approved Today
                </h3>
                <div className="text-3xl font-bold text-success-600 mb-2">
                  {loans.filter((loan: any) => loan.status === 'approved').length}
                </div>
                <p className="text-gray-600">Loans approved today</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="xl:col-span-1 space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {isBorrower && (
                <button className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 px-4 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Apply for Loan
                </button>
              )}
              {isAdmin && (
                <>
                  <button className="w-full bg-gradient-to-r from-success-600 to-success-700 text-white py-3 px-4 rounded-xl font-semibold hover:from-success-700 hover:to-success-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    Review Applications
                  </button>
                  <button className="w-full bg-gradient-to-r from-warning-600 to-warning-700 text-white py-3 px-4 rounded-xl font-semibold hover:from-warning-700 hover:to-warning-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    Generate Reports
                  </button>
                </>
              )}
              <button className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-4 rounded-xl font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                View Profile
              </button>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-info-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Recent Activity
            </h3>
            <RecentActivity userRole={user?.role} />
          </div>
          
          {/* Support Section */}
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 border border-primary-200">
            <h3 className="text-lg font-bold text-primary-800 mb-3">Need Help?</h3>
            <p className="text-primary-700 text-sm mb-4">
              Our support team is here to assist you with any questions.
            </p>
            <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default DashboardPage