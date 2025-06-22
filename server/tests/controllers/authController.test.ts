import request from 'supertest';
import express from 'express';
import authRoutes from '../../routes/authRoutes';
import User from '../../models/User';
import { connectDB } from '../../config/db';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

describe('Auth Controller', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user with valid data', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'Password123',
        phoneNumber: '+1234567890'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toHaveProperty('email', userData.email);
      expect(response.body.user).not.toHaveProperty('password');

      // Verify user was created in database
      const user = await User.findOne({ email: userData.email });
      expect(user).toBeTruthy();
      expect(user?.firstName).toBe(userData.firstName);
    });

    it('should return validation error for invalid email', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'invalid-email',
        password: 'Password123'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('message', 'Validation failed');
      expect(response.body.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            msg: 'Please provide a valid email'
          })
        ])
      );
    });

    it('should return validation error for weak password', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'weak'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('message', 'Validation failed');
      expect(response.body.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            msg: expect.stringContaining('Password must')
          })
        ])
      );
    });

    it('should return error for duplicate email', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'Password123'
      };

      // Create user first time
      await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      // Try to create same user again
      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('message', 'User already exists');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Create a test user
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'Password123'
      };

      await request(app)
        .post('/api/auth/register')
        .send(userData);
    });

    it('should login with valid credentials', async () => {
      const loginData = {
        email: 'john.doe@example.com',
        password: 'Password123'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toHaveProperty('email', loginData.email);
      expect(response.body.user).not.toHaveProperty('password');
    });

    it('should return error for invalid email', async () => {
      const loginData = {
        email: 'nonexistent@example.com',
        password: 'Password123'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(400);

      expect(response.body).toHaveProperty('message', 'Invalid credentials');
    });

    it('should return error for invalid password', async () => {
      const loginData = {
        email: 'john.doe@example.com',
        password: 'WrongPassword'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(400);

      expect(response.body).toHaveProperty('message', 'Invalid credentials');
    });

    it('should return validation error for missing fields', async () => {
      const loginData = {
        email: 'john.doe@example.com'
        // password missing
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(400);

      expect(response.body).toHaveProperty('message', 'Validation failed');
    });
  });

  describe('GET /api/auth/me', () => {
    let authToken: string;

    beforeEach(async () => {
      // Create and login a test user
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'Password123'
      };

      const registerResponse = await request(app)
        .post('/api/auth/register')
        .send(userData);

      authToken = registerResponse.body.token;
    });

    it('should return current user with valid token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('email', 'john.doe@example.com');
      expect(response.body).toHaveProperty('firstName', 'John');
      expect(response.body).not.toHaveProperty('password');
    });

    it('should return error without token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .expect(401);

      expect(response.body).toHaveProperty('message', 'No token, authorization denied');
    });

    it('should return error with invalid token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);

      expect(response.body).toHaveProperty('message', 'Token is not valid');
    });
  });
});