// MongoDB initialization script
// This script runs when the MongoDB container starts for the first time

// Switch to the loanease database
db = db.getSiblingDB('loanease');

// Create collections with validation
db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['firstName', 'lastName', 'email', 'password'],
      properties: {
        firstName: {
          bsonType: 'string',
          description: 'First name is required and must be a string'
        },
        lastName: {
          bsonType: 'string',
          description: 'Last name is required and must be a string'
        },
        email: {
          bsonType: 'string',
          pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
          description: 'Email is required and must be a valid email address'
        },
        password: {
          bsonType: 'string',
          description: 'Password is required and must be a string'
        },
        role: {
          bsonType: 'string',
          enum: ['user', 'loan_officer', 'admin'],
          description: 'Role must be one of: user, loan_officer, admin'
        }
      }
    }
  }
});

db.createCollection('loans', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['user', 'amount', 'term', 'purpose'],
      properties: {
        user: {
          bsonType: 'objectId',
          description: 'User ID is required'
        },
        amount: {
          bsonType: 'number',
          minimum: 1000,
          maximum: 1000000,
          description: 'Loan amount must be between 1000 and 1000000'
        },
        term: {
          bsonType: 'number',
          minimum: 6,
          maximum: 360,
          description: 'Loan term must be between 6 and 360 months'
        },
        purpose: {
          bsonType: 'string',
          description: 'Loan purpose is required'
        },
        status: {
          bsonType: 'string',
          enum: ['draft', 'submitted', 'approved', 'rejected', 'disbursed'],
          description: 'Status must be one of: draft, submitted, approved, rejected, disbursed'
        }
      }
    }
  }
});

db.createCollection('documents');

// Create indexes for better performance
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ role: 1 });
db.loans.createIndex({ user: 1 });
db.loans.createIndex({ status: 1 });
db.loans.createIndex({ createdAt: -1 });
db.documents.createIndex({ user: 1 });
db.documents.createIndex({ loan: 1 });
db.documents.createIndex({ type: 1 });

// Create a default admin user (password should be changed in production)
db.users.insertOne({
  firstName: 'Admin',
  lastName: 'User',
  email: 'admin@loanease.com',
  password: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uDfS', // password: admin123
  role: 'admin',
  phoneNumber: '+1234567890',
  isVerified: true,
  createdAt: new Date(),
  updatedAt: new Date()
});

// Create sample loan officer
db.users.insertOne({
  firstName: 'John',
  lastName: 'Officer',
  email: 'officer@loanease.com',
  password: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uDfS', // password: admin123
  role: 'loan_officer',
  phoneNumber: '+1234567891',
  isVerified: true,
  createdAt: new Date(),
  updatedAt: new Date()
});

print('✅ MongoDB initialization completed successfully!');
print('📊 Created collections: users, loans, documents');
print('🔍 Created indexes for performance optimization');
print('👤 Created default admin user: admin@loanease.com (password: admin123)');
print('👤 Created default loan officer: officer@loanease.com (password: admin123)');
print('⚠️  Please change default passwords in production!');