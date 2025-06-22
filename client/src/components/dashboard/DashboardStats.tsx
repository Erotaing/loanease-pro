import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  AttachMoney,
  People,
  Assignment,
  CheckCircle,
} from '@mui/icons-material';
import { Schedule } from '@mui/icons-material';
import { formatCurrency } from '../../lib/utils';

interface DashboardStatsProps {
  loans: any[]
  userRole?: string
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ loans, userRole }) => {
  const totalAmount = loans.reduce((sum, loan) => sum + loan.amount, 0)
  const approvedLoans = loans.filter(loan => loan.status === 'approved').length
  const pendingLoans = loans.filter(loan => loan.status === 'pending').length
  
  const stats = [
    {
      title: 'Total Applications',
      value: loans.length,
      icon: <TrendingUp className="text-blue-600" />,
      color: 'bg-blue-50'
    },
    {
      title: 'Total Amount',
      value: formatCurrency(totalAmount),
      icon: <AttachMoney className="text-green-600" />,
      color: 'bg-green-50'
    },
    {
      title: 'Approved',
      value: approvedLoans,
      icon: <CheckCircle className="text-green-600" />,
      color: 'bg-green-50'
    },
    {
      title: 'Pending',
      value: pendingLoans,
      icon: <Schedule className="text-orange-600" />,
      color: 'bg-orange-50'
    }
  ]

  const isAdmin = userRole === 'admin'
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Applications */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-4">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-white/20 rounded-xl">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="text-right">
              <p className="text-primary-100 text-sm font-medium">
                {isAdmin ? 'Total Applications' : 'Your Applications'}
              </p>
              <p className="text-3xl font-bold text-white">{loans.length}</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center text-sm text-gray-600">
            <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
            {isAdmin ? 'System-wide' : 'Personal'} applications
          </div>
        </div>
      </div>

      {/* Approved Loans */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="bg-gradient-to-br from-success-500 to-success-600 p-4">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-white/20 rounded-xl">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-right">
              <p className="text-success-100 text-sm font-medium">Approved</p>
              <p className="text-3xl font-bold text-white">{approvedLoans}</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center text-sm text-gray-600">
            <span className="w-2 h-2 bg-success-500 rounded-full mr-2"></span>
            {((approvedLoans / loans.length) * 100 || 0).toFixed(1)}% approval rate
          </div>
        </div>
      </div>

      {/* Pending Loans */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="bg-gradient-to-br from-warning-500 to-warning-600 p-4">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-white/20 rounded-xl">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-right">
              <p className="text-warning-100 text-sm font-medium">
                {isAdmin ? 'Pending Review' : 'Under Review'}
              </p>
              <p className="text-3xl font-bold text-white">{pendingLoans}</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center text-sm text-gray-600">
            <span className="w-2 h-2 bg-warning-500 rounded-full mr-2"></span>
            {isAdmin ? 'Requires action' : 'Awaiting decision'}
          </div>
        </div>
      </div>

      {/* Total Amount */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="bg-gradient-to-br from-info-500 to-info-600 p-4">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-white/20 rounded-xl">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="text-right">
              <p className="text-info-100 text-sm font-medium">
                {isAdmin ? 'Total Portfolio' : 'Total Requested'}
              </p>
              <p className="text-3xl font-bold text-white">{formatCurrency(totalAmount)}</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center text-sm text-gray-600">
            <span className="w-2 h-2 bg-info-500 rounded-full mr-2"></span>
            Loan amount value
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardStats