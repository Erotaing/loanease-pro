# LoanEase Pro 🏦

A comprehensive loan management system with AI-powered risk assessment and document processing capabilities.

## 🌟 Features

- **User Authentication & Authorization** - JWT-based secure authentication with role-based access control
- **Loan Application Management** - Complete loan lifecycle from application to disbursement
- **AI Risk Assessment** - Machine learning-powered credit risk evaluation
- **OCR Document Processing** - Automated document text extraction and validation
- **Admin Dashboard** - Comprehensive management interface for loan officers and administrators
- **Real-time Notifications** - Email and in-app notifications for loan status updates
- **Secure File Upload** - Document management with validation and security checks
- **Responsive Design** - Modern UI built with Next.js and Material-UI

## 🏗️ Architecture

### Frontend
- **Next.js 13+** - React framework with App Router
- **Material-UI (MUI)** - Modern React component library
- **TypeScript** - Type-safe development
- **Formik & Yup** - Form handling and validation
- **Axios** - HTTP client for API communication

### Backend
- **Node.js & Express** - RESTful API server
- **TypeScript** - Type-safe server development
- **MongoDB & Mongoose** - Document database with ODM
- **JWT** - Secure authentication tokens
- **Multer** - File upload handling
- **Express Validator** - Input validation middleware

### AI Services
- **Python Flask** - Microservices for AI processing
- **scikit-learn** - Machine learning for risk assessment
- **Tesseract OCR** - Optical character recognition
- **OpenCV & Pillow** - Image processing

### Infrastructure
- **Docker & Docker Compose** - Containerized deployment
- **MongoDB** - Primary database
- **Redis** - Caching and session storage
- **Nginx** - Reverse proxy (production)

## 🚀 Quick Start

### Prerequisites

- **Node.js 16+** - [Download](https://nodejs.org/)
- **Python 3.8+** - [Download](https://python.org/)
- **Docker & Docker Compose** - [Download](https://docker.com/) (recommended)
- **Git** - [Download](https://git-scm.com/)

### Option 1: Automated Setup (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd loanease-pro
   ```

2. **Run the setup script**
   ```bash
   python setup.py
   ```

3. **Start with Docker**
   ```bash
   docker-compose up --build
   ```

### Option 2: Manual Setup

1. **Clone and navigate**
   ```bash
   git clone <repository-url>
   cd loanease-pro
   ```

2. **Setup environment files**
   ```bash
   # Server environment
   cp server/.env.example server/.env
   
   # Client environment
   cp client/.env.local.example client/.env.local
   ```

3. **Install dependencies**
   ```bash
   # Server dependencies
   cd server && npm install
   
   # Client dependencies
   cd ../client && npm install
   
   # AI service dependencies
   cd ../ai-services/risk_model && pip install -r requirements.txt
   cd ../ocr && pip install -r requirements.txt
   ```

4. **Create dummy ML model**
   ```bash
   cd ai-services/risk_model
   python create_dummy_model.py
   ```

5. **Start services manually**
   ```bash
   # Terminal 1: Start MongoDB
   docker run -d -p 27017:27017 --name mongodb mongo:5.0
   
   # Terminal 2: Start backend
   cd server && npm run dev
   
   # Terminal 3: Start frontend
   cd client && npm run dev
   
   # Terminal 4: Start risk model service
   cd ai-services/risk_model && python predict.py
   
   # Terminal 5: Start OCR service
   cd ai-services/ocr && python process.py
   ```

## 🌐 Access Points

- **Frontend Application**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Risk Assessment API**: http://localhost:8001
- **OCR Processing API**: http://localhost:8000
- **MongoDB**: mongodb://localhost:27017

## 👤 Default Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@loanease.com | admin123 |
| Loan Officer | officer@loanease.com | admin123 |

⚠️ **Important**: Change these credentials in production!

## 📁 Project Structure

```
loanease-pro/
├── client/                 # Next.js frontend
│   ├── src/
│   │   ├── app/           # App router pages
│   │   ├── components/    # Reusable components
│   │   ├── lib/          # Utilities and configurations
│   │   └── types/        # TypeScript type definitions
│   ├── public/           # Static assets
│   └── package.json
├── server/                # Node.js backend
│   ├── src/
│   │   ├── controllers/  # Route handlers
│   │   ├── middleware/   # Custom middleware
│   │   ├── models/       # Mongoose schemas
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic
│   │   └── config/       # Configuration files
│   ├── tests/            # Test files
│   └── package.json
├── ai-services/           # Python AI microservices
│   ├── risk_model/       # Credit risk assessment
│   └── ocr/             # Document processing
├── infrastructure/        # Docker and deployment
│   └── docker/          # Dockerfiles
├── docs/                 # Documentation
├── scripts/              # Utility scripts
└── docker-compose.yml    # Container orchestration
```

## 🔧 Development

### Running Tests

```bash
# Server tests
cd server && npm test

# Client tests
cd client && npm test

# Test coverage
npm run test:coverage
```

### Code Quality

```bash
# Linting
npm run lint

# Formatting
npm run format

# Type checking
npm run type-check
```

### Database Management

```bash
# Connect to MongoDB
mongosh mongodb://localhost:27017/loanease

# View collections
show collections

# Reset database (development only)
use loanease
db.dropDatabase()
```

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt for secure password storage
- **Input Validation** - Comprehensive request validation
- **File Upload Security** - Type and size validation
- **CORS Protection** - Cross-origin request security
- **Rate Limiting** - API abuse prevention
- **Helmet.js** - Security headers
- **Environment Variables** - Secure configuration management

## 📊 API Documentation

### Authentication Endpoints

```http
POST /api/auth/register    # User registration
POST /api/auth/login       # User login
GET  /api/auth/me          # Get current user
POST /api/auth/logout      # User logout
```

### Loan Management

```http
GET    /api/loans          # Get user loans
POST   /api/loans          # Create new loan
GET    /api/loans/:id      # Get loan details
PUT    /api/loans/:id      # Update loan
DELETE /api/loans/:id      # Delete loan
```

### Document Processing

```http
POST /api/documents/upload # Upload document
GET  /api/documents/:id    # Get document
POST /api/documents/verify # Verify document
```

### AI Services

```http
POST /predict              # Risk assessment (Port 8001)
POST /process              # OCR processing (Port 8000)
GET  /health               # Health check
```

## 🚀 Deployment

### Production with Docker

1. **Update environment variables**
   ```bash
   # Update production values in .env files
   # Set strong passwords and secrets
   ```

2. **Build and deploy**
   ```bash
   docker-compose -f docker-compose.prod.yml up --build -d
   ```

### Environment Variables

#### Server (.env)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://mongo:27017/loanease
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
CLIENT_URL=https://yourdomain.com
```

#### Client (.env.local)
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_APP_NAME=LoanEase Pro
```

## 🧪 Testing

The project includes comprehensive testing setup:

- **Unit Tests** - Individual component testing
- **Integration Tests** - API endpoint testing
- **E2E Tests** - Full user flow testing
- **Test Coverage** - Code coverage reporting

## 📈 Monitoring & Logging

- **Application Logs** - Structured logging with Winston
- **Error Tracking** - Comprehensive error handling
- **Performance Monitoring** - Request timing and metrics
- **Health Checks** - Service availability monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- 📧 Email: support@loanease.com
- 📖 Documentation: `/docs`
- 🐛 Issues: GitHub Issues
- 💬 Discussions: GitHub Discussions

## 🔄 Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and updates.

---

**Built with ❤️ by the LoanEase Pro Team**#   L o a n _ S y s t e m  
 