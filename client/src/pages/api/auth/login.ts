import { NextApiRequest, NextApiResponse } from 'next';

interface LoginRequest {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@loanease.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin'
  },
  {
    id: '2',
    email: 'john@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'borrower'
  },
  {
    id: '3',
    email: 'jane@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'lender'
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password }: LoginRequest = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // For demo purposes, accept any password for existing users
    // In a real app, you would hash and compare passwords
    if (password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a mock JWT token (in real app, use proper JWT library)
    const token = `mock-jwt-token-${user.id}-${Date.now()}`;

    // Return user data and token
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}