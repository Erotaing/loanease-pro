import { NextApiRequest, NextApiResponse } from 'next';

interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

// Mock users storage (in real app, this would be a database)
let mockUsers: User[] = [
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
    const { firstName, lastName, email, password, role }: RegisterRequest = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    if (!['borrower', 'lender', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role specified' });
    }

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    // Create new user
    const newUser: User = {
      id: (mockUsers.length + 1).toString(),
      email: email.toLowerCase(),
      firstName,
      lastName,
      role
    };

    // Add to mock storage
    mockUsers.push(newUser);

    // Generate a mock JWT token (in real app, use proper JWT library)
    const token = `mock-jwt-token-${newUser.id}-${Date.now()}`;

    // Return user data and token
    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}