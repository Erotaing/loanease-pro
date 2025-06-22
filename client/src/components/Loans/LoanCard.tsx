import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Divider,
  Chip
} from '@mui/material';
import { AttachMoney, CalendarToday, Person, Business } from '@mui/icons-material';
import LoanStatusBadge from './LoanStatusBadge';
import { format } from 'date-fns';

interface LoanCardProps {
  loan: {
    _id: string;
    amount: number;
    term: number;
    purpose: string;
    status: 'pending' | 'approved' | 'rejected' | 'under_review' | 'processing';
    createdAt: string;
    interestRate?: number;
    monthlyPayment?: number;
    applicantName?: string;
  };
  onViewDetails?: (loanId: string) => void;
  showApplicantInfo?: boolean;
}

const LoanCard: React.FC<LoanCardProps> = ({ 
  loan, 
  onViewDetails, 
  showApplicantInfo = false 
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent>
        <Box className="flex justify-between items-start mb-3">
          <Typography variant="h6" className="font-semibold">
            {formatCurrency(loan.amount)}
          </Typography>
          <LoanStatusBadge status={loan.status} size="small" />
        </Box>

        <Box className="space-y-2 mb-4">
          <Box className="flex items-center gap-2">
            <Business className="text-gray-500" fontSize="small" />
            <Typography variant="body2" color="textSecondary">
              Purpose: {loan.purpose}
            </Typography>
          </Box>

          <Box className="flex items-center gap-2">
            <CalendarToday className="text-gray-500" fontSize="small" />
            <Typography variant="body2" color="textSecondary">
              Term: {loan.term} months
            </Typography>
          </Box>

          {showApplicantInfo && loan.applicantName && (
            <Box className="flex items-center gap-2">
              <Person className="text-gray-500" fontSize="small" />
              <Typography variant="body2" color="textSecondary">
                Applicant: {loan.applicantName}
              </Typography>
            </Box>
          )}

          <Box className="flex items-center gap-2">
            <CalendarToday className="text-gray-500" fontSize="small" />
            <Typography variant="body2" color="textSecondary">
              Applied: {formatDate(loan.createdAt)}
            </Typography>
          </Box>
        </Box>

        {(loan.interestRate || loan.monthlyPayment) && (
          <>
            <Divider className="my-3" />
            <Box className="flex justify-between items-center mb-3">
              {loan.interestRate && (
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Interest Rate
                  </Typography>
                  <Typography variant="body2" className="font-semibold">
                    {loan.interestRate}%
                  </Typography>
                </Box>
              )}
              {loan.monthlyPayment && (
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Monthly Payment
                  </Typography>
                  <Typography variant="body2" className="font-semibold">
                    {formatCurrency(loan.monthlyPayment)}
                  </Typography>
                </Box>
              )}
            </Box>
          </>
        )}

        {onViewDetails && (
          <Button
            variant="outlined"
            fullWidth
            onClick={() => onViewDetails(loan._id)}
            className="mt-2"
          >
            View Details
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default LoanCard;