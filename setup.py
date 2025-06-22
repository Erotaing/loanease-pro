#!/usr/bin/env python3
"""
LoanEase Pro Setup Script
This script helps set up the development environment for LoanEase Pro.
"""

import os
import subprocess
import sys
import platform
from pathlib import Path

def run_command(command, cwd=None, shell=True):
    """Run a command and return the result"""
    try:
        result = subprocess.run(
            command, 
            shell=shell, 
            cwd=cwd, 
            capture_output=True, 
            text=True,
            check=True
        )
        return True, result.stdout
    except subprocess.CalledProcessError as e:
        return False, e.stderr

def check_prerequisites():
    """Check if required software is installed"""
    print("🔍 Checking prerequisites...")
    
    # Check Node.js
    success, output = run_command("node --version")
    if success:
        print(f"✅ Node.js: {output.strip()}")
    else:
        print("❌ Node.js not found. Please install Node.js 16+ from https://nodejs.org/")
        return False
    
    # Check npm
    success, output = run_command("npm --version")
    if success:
        print(f"✅ npm: {output.strip()}")
    else:
        print("❌ npm not found")
        return False
    
    # Check Python
    success, output = run_command("python --version")
    if not success:
        success, output = run_command("python3 --version")
    
    if success:
        print(f"✅ Python: {output.strip()}")
    else:
        print("❌ Python not found. Please install Python 3.8+ from https://python.org/")
        return False
    
    # Check Docker
    success, output = run_command("docker --version")
    if success:
        print(f"✅ Docker: {output.strip()}")
    else:
        print("⚠️  Docker not found. Install Docker Desktop for containerized deployment.")
    
    # Check Docker Compose
    success, output = run_command("docker-compose --version")
    if not success:
        success, output = run_command("docker compose version")
    
    if success:
        print(f"✅ Docker Compose: {output.strip()}")
    else:
        print("⚠️  Docker Compose not found.")
    
    return True

def setup_environment_files():
    """Create environment files from examples"""
    print("\n📝 Setting up environment files...")
    
    # Server .env file
    server_env_example = Path("server/.env.example")
    server_env = Path("server/.env")
    
    if server_env_example.exists() and not server_env.exists():
        server_env.write_text(server_env_example.read_text())
        print("✅ Created server/.env from example")
    
    # Client .env.local file
    client_env_example = Path("client/.env.local.example")
    client_env = Path("client/.env.local")
    
    if client_env_example.exists() and not client_env.exists():
        client_env.write_text(client_env_example.read_text())
        print("✅ Created client/.env.local from example")

def install_dependencies():
    """Install dependencies for all services"""
    print("\n📦 Installing dependencies...")
    
    # Install server dependencies
    print("Installing server dependencies...")
    success, output = run_command("npm install", cwd="server")
    if success:
        print("✅ Server dependencies installed")
    else:
        print(f"❌ Failed to install server dependencies: {output}")
        return False
    
    # Install client dependencies
    print("Installing client dependencies...")
    success, output = run_command("npm install", cwd="client")
    if success:
        print("✅ Client dependencies installed")
    else:
        print(f"❌ Failed to install client dependencies: {output}")
        return False
    
    # Install Python dependencies for AI services
    python_cmd = "python" if platform.system() == "Windows" else "python3"
    
    # Risk model dependencies
    print("Installing risk model dependencies...")
    success, output = run_command(
        f"{python_cmd} -m pip install -r requirements.txt", 
        cwd="ai-services/risk_model"
    )
    if success:
        print("✅ Risk model dependencies installed")
    else:
        print(f"⚠️  Risk model dependencies failed: {output}")
    
    # OCR dependencies
    print("Installing OCR dependencies...")
    success, output = run_command(
        f"{python_cmd} -m pip install -r requirements.txt", 
        cwd="ai-services/ocr"
    )
    if success:
        print("✅ OCR dependencies installed")
    else:
        print(f"⚠️  OCR dependencies failed: {output}")
    
    return True

def create_dummy_model():
    """Create a dummy ML model for development"""
    print("\n🤖 Creating dummy ML model...")
    
    python_cmd = "python" if platform.system() == "Windows" else "python3"
    success, output = run_command(
        f"{python_cmd} create_dummy_model.py", 
        cwd="ai-services/risk_model"
    )
    
    if success:
        print("✅ Dummy ML model created")
        print(output)
    else:
        print(f"⚠️  Failed to create dummy model: {output}")

def print_next_steps():
    """Print instructions for running the application"""
    print("\n🎉 Setup completed! Here's how to run the application:\n")
    
    print("📋 OPTION 1: Using Docker (Recommended)")
    print("   docker-compose up --build")
    print("   This will start all services in containers\n")
    
    print("📋 OPTION 2: Manual Development Setup")
    print("   1. Start MongoDB (install locally or use Docker):")
    print("      docker run -d -p 27017:27017 --name mongodb mongo:5.0\n")
    
    print("   2. Start the backend server:")
    print("      cd server && npm run dev\n")
    
    print("   3. Start the frontend (in a new terminal):")
    print("      cd client && npm run dev\n")
    
    print("   4. Start AI services (in separate terminals):")
    print("      cd ai-services/risk_model && python predict.py")
    print("      cd ai-services/ocr && python process.py\n")
    
    print("🌐 Access Points:")
    print("   • Frontend: http://localhost:3000")
    print("   • Backend API: http://localhost:5000")
    print("   • Risk Model API: http://localhost:8001")
    print("   • OCR API: http://localhost:8000\n")
    
    print("👤 Default Login Credentials:")
    print("   • Admin: admin@loanease.com / admin123")
    print("   • Loan Officer: officer@loanease.com / admin123\n")
    
    print("⚠️  Important Notes:")
    print("   • Change default passwords in production")
    print("   • Update environment variables in .env files")
    print("   • For production deployment, see docs/SECURITY.md")

def main():
    """Main setup function"""
    print("🚀 LoanEase Pro Setup Script")
    print("=" * 40)
    
    # Check if we're in the right directory
    if not Path("package.json").exists() and not Path("docker-compose.yml").exists():
        print("❌ Please run this script from the project root directory")
        sys.exit(1)
    
    # Check prerequisites
    if not check_prerequisites():
        print("\n❌ Prerequisites check failed. Please install missing software.")
        sys.exit(1)
    
    # Setup environment files
    setup_environment_files()
    
    # Install dependencies
    if not install_dependencies():
        print("\n❌ Dependency installation failed.")
        sys.exit(1)
    
    # Create dummy model
    create_dummy_model()
    
    # Print next steps
    print_next_steps()

if __name__ == "__main__":
    main()