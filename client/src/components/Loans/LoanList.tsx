import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Pagination
} from '@mui/material';
import { Search } from '@mui/icons-material';
import LoanCard from './LoanCard';
import Loader from '../ui/Loader';

interface LoanListProps {
  loans: any[];
  loading?: boolean;
  onViewDetails?: (loanId: string) => void;
  showApplicantInfo?: boolean;
  title?: string;
  userRole?: string;
}

const LoanList: React.FC<LoanListProps> = ({
  loans,
  loading = false,
  onViewDetails,
  showApplicantInfo = false,
  title = 'Loan Applications'
}) => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter loans based on status and search term
  const filteredLoans = loans.filter(loan => {
    const matchesStatus = statusFilter === 'all' || loan.status === statusFilter;
    const matchesSearch = searchTerm === '' || 
      loan.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.amount.toString().includes(searchTerm) ||
      (loan.applicantName && loan.applicantName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesStatus && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredLoans.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLoans = filteredLoans.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  if (loading) {
    return <Loader message="Loading loans..." />;
  }

  return (
    <Box>
      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h5" className="font-semibold">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {filteredLoans.length} loan{filteredLoans.length !== 1 ? 's' : ''} found
        </Typography>
      </Box>

      {/* Filters */}
      <Box className="flex flex-col sm:flex-row gap-4 mb-6">
        <TextField
          placeholder="Search loans..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          className="flex-1"
          size="small"
        />
        
        <FormControl size="small" className="min-w-[150px]">
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
            <MenuItem value="under_review">Under Review</MenuItem>
            <MenuItem value="processing">Processing</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Loan Cards */}
      {paginatedLoans.length === 0 ? (
        <Box className="text-center py-12">
          <Typography variant="h6" color="textSecondary" className="mb-2">
            No loans found
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your filters to see more results.'
              : 'No loan applications have been submitted yet.'}
          </Typography>
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {paginatedLoans.map((loan) => (
              <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={loan._id}>
                <LoanCard
                  loan={loan}
                  onViewDetails={onViewDetails}
                  showApplicantInfo={showApplicantInfo}
                />
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box className="flex justify-center mt-6">
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default LoanList;