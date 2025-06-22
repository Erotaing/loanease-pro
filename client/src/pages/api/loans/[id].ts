import { NextApiRequest, NextApiResponse } from 'next';

// Mock loan data for demonstration
const mockLoanDetails = {
  '1': {
    id: '1',
    amount: 50000,
    purpose: 'Business Expansion',
    status: 'approved',
    applicantName: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    applicationDate: '2024-01-15',
    approvalDate: '2024-01-20',
    interestRate: 5.5,
    term: 36,
    monthlyPayment: 1506.69,
    creditScore: 750,
    income: 85000,
    employmentStatus: 'Full-time',
    documents: [
      {
        id: '1',
        name: 'Income Statement',
        type: 'pdf',
        uploadDate: '2024-01-15',
        status: 'verified'
      },
      {
        id: '2',
        name: 'Bank Statement',
        type: 'pdf',
        uploadDate: '2024-01-15',
        status: 'verified'
      }
    ],
    notes: [
      {
        id: '1',
        content: 'Application looks good, all documents verified.',
        author: 'Loan Officer',
        date: '2024-01-18'
      }
    ]
  },
  '2': {
    id: '2',
    amount: 25000,
    purpose: 'Home Improvement',
    status: 'pending',
    applicantName: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1 (555) 987-6543',
    applicationDate: '2024-01-20',
    interestRate: 6.0,
    term: 24,
    monthlyPayment: 1108.65,
    creditScore: 680,
    income: 65000,
    employmentStatus: 'Full-time',
    documents: [
      {
        id: '3',
        name: 'Pay Stub',
        type: 'pdf',
        uploadDate: '2024-01-20',
        status: 'pending'
      }
    ],
    notes: []
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  
  if (req.method === 'GET') {
    const loan = mockLoanDetails[id as string];
    
    if (!loan) {
      return res.status(404).json({
        success: false,
        message: 'Loan not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: loan,
    });
  } else if (req.method === 'PUT') {
    // Update loan status or details
    const loan = mockLoanDetails[id as string];
    
    if (!loan) {
      return res.status(404).json({
        success: false,
        message: 'Loan not found',
      });
    }
    
    // Update loan with new data
    Object.assign(loan, req.body);
    
    res.status(200).json({
      success: true,
      data: loan,
    });
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).json({
      success: false,
      message: `Method ${req.method} Not Allowed`,
    });
  }
}