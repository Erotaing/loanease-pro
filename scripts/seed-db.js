const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../server/config/config').default;

// Connect to MongoDB
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define seed data
const seedData = async () => {
  try {
    // Clear existing data
    await mongoose.connection.db.dropDatabase();
    console.log('Database cleared');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await mongoose.connection.db.collection('users').insertOne({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@loanease.com',
      password: adminPassword,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log('Admin user created');

    // Create loan officer
    const officerPassword = await bcrypt.hash('officer123', 10);
    const officer = await mongoose.connection.db.collection('users').insertOne({
      firstName: 'Loan',
      lastName: 'Officer',
      email: 'officer@loanease.com',
      password: officerPassword,
      role: 'loan_officer',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log('Loan officer created');

    // Create sample borrower
    const borrowerPassword = await bcrypt.hash('borrower123', 10);
    const borrower = await mongoose.connection.db.collection('users').insertOne({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: borrowerPassword,
      role: 'borrower',
      phone: '555-123-4567',
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
        country: 'USA'
      },
      dateOfBirth: new Date('1985-05-15'),
      employmentInfo: {
        employer: 'ACME Inc',
        position: 'Software Developer',
        yearsEmployed: 5,
        monthlyIncome: 8000
      },
      creditScore: 720,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log('Sample borrower created');

    // Create sample loan
    const loan = await mongoose.connection.db.collection('loans').insertOne({
      user: borrower.insertedId,
      amount: 250000,
      term: 360,
      purpose: 'Home Purchase',
      status: 'submitted',
      riskScore: 0.25,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log('Sample loan created');

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seed function
seedData();