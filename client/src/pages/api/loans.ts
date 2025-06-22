import { NextApiRequest, NextApiResponse } from 'next';

// Mock loan data for demonstration
const mockLoans = [
  {
    id: '1',
    amount: 50000,
    purpose: 'Business Expansion',
    status: 'approved',
    applicantName: 'John Doe',
    applicationDate: '2024-01-15',
    interestRate: 5.5,
  },
  {
    id: '2',
    amount: 25000,
    purpose: 'Home Improvement',
    status: 'pending',
    applicantName: 'Jane Smith',
    applicationDate: '2024-01-20',
    interestRate: 6.0,
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Return all loans
    res.status(200).json({
      success: true,
      data: mockLoans,
    });
  } else if (req.method === 'POST') {
    // Create a new loan application
    const newLoan = {
      id: (mockLoans.length + 1).toString(),
      ...req.body,
      status: 'pending',
      applicationDate: new Date().toISOString().split('T')[0],
      interestRate: 5.5,
    };
    
    mockLoans.push(newLoan);
    
    res.status(201).json({
      success: true,
      data: newLoan,
      id: newLoan.id,
    });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({
      success: false,
      message: `Method ${req.method} Not Allowed`,
    });
  }
}