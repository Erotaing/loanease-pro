# 🚀 LoanEase Pro - Quick Startup Guide

This guide will help you get LoanEase Pro running on your local machine in just a few minutes.

## ✅ Prerequisites Check

Before starting, ensure you have:

- ✅ **Node.js 16+** installed ([Download here](https://nodejs.org/))
- ✅ **Python 3.8+** installed ([Download here](https://python.org/))
- ✅ **Git** installed ([Download here](https://git-scm.com/))
- ⚠️ **Docker Desktop** (optional but recommended) ([Download here](https://docker.com/))

## 🎯 Option 1: Quick Start with Docker (Recommended)

### Step 1: Clone and Setup
```bash
git clone <your-repository-url>
cd loanease-pro
python setup.py
```

### Step 2: Start with Docker
```bash
docker-compose up --build
```

**That's it!** 🎉 All services will start automatically.

---

## 🛠️ Option 2: Manual Development Setup

If Docker is not available, follow these steps:

### Step 1: Clone and Install Dependencies
```bash
# Clone the repository
git clone <your-repository-url>
cd loanease-pro

# Run automated setup
python setup.py
```

### Step 2: Start MongoDB
```bash
# Option A: Using Docker (recommended)
docker run -d -p 27017:27017 --name mongodb mongo:5.0

# Option B: Install MongoDB locally
# Download from https://www.mongodb.com/try/download/community
# Then run: mongod
```

### Step 3: Start Backend Server
```bash
# Open Terminal 1
cd server
npm run dev
```

### Step 4: Start Frontend Application
```bash
# Open Terminal 2
cd client
npm run dev
```

### Step 5: Start AI Services
```bash
# Open Terminal 3 - Risk Assessment Service
cd ai-services/risk_model
python predict.py

# Open Terminal 4 - OCR Service
cd ai-services/ocr
python process.py
```

---

## 🌐 Access Your Application

Once all services are running, you can access:

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:3000 | Main application interface |
| **Backend API** | http://localhost:5000 | REST API server |
| **Risk Model** | http://localhost:8001 | AI risk assessment |
| **OCR Service** | http://localhost:8000 | Document processing |

## 👤 Login Credentials

Use these default accounts to test the application:

| Role | Email | Password | Access Level |
|------|-------|----------|-------------|
| **Admin** | admin@loanease.com | admin123 | Full system access |
| **Loan Officer** | officer@loanease.com | admin123 | Loan management |

⚠️ **Security Note**: Change these passwords in production!

## 🧪 Test the Application

### 1. Login Test
1. Go to http://localhost:3000
2. Click "Login"
3. Use admin credentials above
4. You should see the dashboard

### 2. API Health Check
```bash
# Test backend
curl http://localhost:5000/api/health

# Test risk model
curl http://localhost:8001/health

# Test OCR service
curl http://localhost:8000/health
```

### 3. Create a Test Loan
1. Login as a user
2. Navigate to "Apply for Loan"
3. Fill out the application form
4. Upload sample documents
5. Submit and check the risk assessment

## 🔧 Troubleshooting

### Common Issues and Solutions

#### "Port already in use" Error
```bash
# Find and kill process using the port
netstat -ano | findstr :3000
taskkill /PID <process_id> /F
```

#### MongoDB Connection Error
```bash
# Make sure MongoDB is running
docker ps  # Check if MongoDB container is running
# Or restart MongoDB
docker restart mongodb
```

#### Python Dependencies Error
```bash
# Install missing packages
cd ai-services/risk_model
pip install -r requirements.txt

cd ../ocr
pip install -r requirements.txt
```

#### Node.js Dependencies Error
```bash
# Clear cache and reinstall
cd server
npm cache clean --force
npm install

cd ../client
npm cache clean --force
npm install
```

#### Docker Issues
```bash
# Make sure Docker Desktop is running
# Restart Docker service
# Clear Docker cache
docker system prune -a
```

## 📊 Verify Everything is Working

### Health Check Script
Run this to verify all services:

```bash
# Check all services
echo "Checking Frontend..."
curl -s http://localhost:3000 > /dev/null && echo "✅ Frontend OK" || echo "❌ Frontend Failed"

echo "Checking Backend..."
curl -s http://localhost:5000/api/health > /dev/null && echo "✅ Backend OK" || echo "❌ Backend Failed"

echo "Checking Risk Model..."
curl -s http://localhost:8001/health > /dev/null && echo "✅ Risk Model OK" || echo "❌ Risk Model Failed"

echo "Checking OCR Service..."
curl -s http://localhost:8000/health > /dev/null && echo "✅ OCR Service OK" || echo "❌ OCR Service Failed"
```

## 🎯 Next Steps

1. **Explore the Application**
   - Try different user roles
   - Test loan application flow
   - Upload and process documents

2. **Development**
   - Check `README.md` for detailed documentation
   - Review `docs/SECURITY.md` for security guidelines
   - Run tests with `npm test`

3. **Customization**
   - Update environment variables in `.env` files
   - Modify UI components in `client/src/components`
   - Extend API endpoints in `server/routes`

## 🆘 Need Help?

- 📖 **Documentation**: Check the `docs/` folder
- 🐛 **Issues**: Create a GitHub issue
- 💬 **Questions**: Check the README.md file
- 🔧 **Development**: Review the code comments

---

**🎉 Congratulations!** You now have LoanEase Pro running locally. Happy coding! 🚀