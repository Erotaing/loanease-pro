import React from 'react';
import { Chip } from '@mui/material';
import { CheckCircle, Schedule, Cancel, HourglassEmpty } from '@mui/icons-material';

interface LoanStatusBadgeProps {
  status: 'pending' | 'approved' | 'rejected' | 'under_review' | 'processing';
  size?: 'small' | 'medium';
}

const LoanStatusBadge: React.FC<LoanStatusBadgeProps> = ({ status, size = 'medium' }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'approved':
        return {
          label: 'Approved',
          color: 'success' as const,
          icon: <CheckCircle />
        };
      case 'rejected':
        return {
          label: 'Rejected',
          color: 'error' as const,
          icon: <Cancel />
        };
      case 'pending':
        return {
          label: 'Pending',
          color: 'warning' as const,
          icon: <Schedule />
        };
      case 'under_review':
        return {
          label: 'Under Review',
          color: 'info' as const,
          icon: <HourglassEmpty />
        };
      case 'processing':
        return {
          label: 'Processing',
          color: 'primary' as const,
          icon: <HourglassEmpty />
        };
      default:
        return {
          label: 'Unknown',
          color: 'default' as const,
          icon: <Schedule />
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Chip
      label={config.label}
      color={config.color}
      size={size}
      icon={config.icon}
      variant="filled"
    />
  );
};

export default LoanStatusBadge;