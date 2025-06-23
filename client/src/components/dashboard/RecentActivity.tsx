import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Avatar,
  Divider
} from '@mui/material';
import {
  Description,
  CheckCircle,
  Schedule,
  Cancel,
  Upload,
  Person,
  AttachMoney
} from '@mui/icons-material';
import { formatCurrency } from '../../lib/utils';
import { format, formatDistanceToNow } from 'date-fns';

interface Activity {
  _id: string;
  type: 'loan_application' | 'document_upload' | 'status_change' | 'payment' | 'user_registration';
  description: string;
  timestamp: string;
  user?: {
    name: string;
    email: string;
  };
  loan?: {
    _id: string;
    amount: number;
  };
  status?: string;
}

interface RecentActivityProps {
  activities?: Activity[];
  maxItems?: number;
  userRole?: string;
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities = [], maxItems = 10, userRole }) => {

  const getActivityIcon = (type: string, status?: string) => {
    switch (type) {
      case 'loan_application':
        return <Description fontSize="small" />;
      case 'status_change':
        if (status === 'approved') {
          return <CheckCircle fontSize="small" />;
        } else if (status === 'rejected') {
          return <Cancel fontSize="small" />;
        } else {
          return <Schedule fontSize="small" />;
        }
      case 'document_upload':
        return <Upload fontSize="small" />;
      case 'payment':
        return <AttachMoney fontSize="small" />;
      case 'user_registration':
        return <Person fontSize="small" />;
      default:
        return <Description fontSize="small" />;
    }
  };

  const getActivityColor = (type: string, status?: string) => {
    switch (type) {
      case 'loan_application':
        return 'bg-blue-100 text-blue-600';
      case 'status_change':
        if (status === 'approved') {
          return 'bg-green-100 text-green-600';
        } else if (status === 'rejected') {
          return 'bg-red-100 text-red-600';
        } else {
          return 'bg-yellow-100 text-yellow-600';
        }
      case 'document_upload':
        return 'bg-purple-100 text-purple-600';
      case 'payment':
        return 'bg-green-100 text-green-600';
      case 'user_registration':
        return 'bg-indigo-100 text-indigo-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const formatActivityTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return formatDistanceToNow(date, { addSuffix: true });
    } else {
      return format(date, 'MMM dd, yyyy');
    }
  };

  const isAdmin = userRole === 'admin';
  
  // Mock data if no activities provided - role-based
  // Use static base date to prevent hydration mismatches
  const baseDate = new Date('2024-01-15T10:00:00Z');
  
  const mockActivities: Activity[] = isAdmin ? [
    {
      _id: '1',
      type: 'loan_application',
      description: 'New loan application submitted',
      timestamp: new Date(baseDate.getTime() - 1000 * 60 * 30).toISOString(),
      user: { name: 'John Doe', email: 'john@example.com' },
      loan: { _id: 'loan1', amount: 50000 }
    },
    {
      _id: '2',
      type: 'status_change',
      description: 'Loan application approved',
      timestamp: new Date(baseDate.getTime() - 1000 * 60 * 60 * 2).toISOString(),
      status: 'approved',
      user: { name: 'Jane Smith', email: 'jane@example.com' },
      loan: { _id: 'loan2', amount: 25000 }
    },
    {
      _id: '3',
      type: 'user_registration',
      description: 'New user registered',
      timestamp: new Date(baseDate.getTime() - 1000 * 60 * 60 * 4).toISOString(),
      user: { name: 'Mike Johnson', email: 'mike@example.com' }
    },
    {
      _id: '4',
      type: 'status_change',
      description: 'Loan application rejected',
      timestamp: new Date(baseDate.getTime() - 1000 * 60 * 60 * 6).toISOString(),
      status: 'rejected',
      user: { name: 'Sarah Wilson', email: 'sarah@example.com' },
      loan: { _id: 'loan3', amount: 75000 }
    }
  ] : [
    {
      _id: '1',
      type: 'loan_application',
      description: 'Your loan application was submitted',
      timestamp: new Date(baseDate.getTime() - 1000 * 60 * 60 * 2).toISOString(),
      loan: { _id: 'loan1', amount: 50000 }
    },
    {
      _id: '2',
      type: 'status_change',
      description: 'Your application is under review',
      timestamp: new Date(baseDate.getTime() - 1000 * 60 * 60 * 24).toISOString(),
      status: 'under_review',
      loan: { _id: 'loan1', amount: 50000 }
    },
    {
      _id: '3',
      type: 'document_upload',
      description: 'Documents uploaded successfully',
      timestamp: new Date(baseDate.getTime() - 1000 * 60 * 60 * 48).toISOString()
    }
  ];

  const displayActivities = activities.length > 0 ? activities : mockActivities;
  const limitedActivities = displayActivities.slice(0, maxItems);

  return (
    <div className="space-y-4">
      {limitedActivities.length === 0 ? (
        <div className="text-center py-8">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-500 text-sm">
            {isAdmin ? 'No system activity yet' : 'No recent activity'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {limitedActivities.map((activity, index) => (
            <div key={activity._id} className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
              {/* Activity Icon */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity.type, activity.status)}`}>
                <div className="text-white">
                  {getActivityIcon(activity.type, activity.status)}
                </div>
              </div>
              
              {/* Activity Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.description}
                      {activity.loan && (
                        <span className="text-success-600 ml-1 font-semibold">
                          ({formatCurrency(activity.loan.amount)})
                        </span>
                      )}
                    </p>
                    {activity.user && isAdmin && (
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.user.name} • {activity.user.email}
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0 ml-2">
                    <p className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                </div>
                
                {/* Status Badge */}
                {activity.status && (
                  <div className="mt-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      activity.status === 'approved' ? 'bg-success-100 text-success-800' :
                      activity.status === 'rejected' ? 'bg-danger-100 text-danger-800' :
                      activity.status === 'under_review' ? 'bg-warning-100 text-warning-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {activity.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* View All Link */}
      {displayActivities.length > maxItems && (
        <div className="text-center pt-4 border-t border-gray-200">
          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200">
            View all activity ({displayActivities.length})
          </button>
        </div>
      )}
      
      {/* Quick Action for Borrowers */}
      {!isAdmin && (
        <div className="mt-4 p-4 bg-primary-50 rounded-xl border border-primary-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-primary-800">Need to update something?</h4>
              <p className="text-xs text-primary-600 mt-1">Upload documents or check your application status</p>
            </div>
            <button className="bg-primary-600 text-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-primary-700 transition-colors duration-200">
              Take Action
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;