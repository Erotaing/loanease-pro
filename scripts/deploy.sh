#!/bin/bash

# Exit on error
set -e

echo "Starting deployment of LoanEase Pro..."

# Navigate to project root
cd "$(dirname "$0")/.." || exit

# Pull latest changes
echo "Pulling latest changes from repository..."
git pull

# Build and deploy with Docker Compose
echo "Building and deploying with Docker Compose..."
cd infrastructure/docker
docker-compose build
docker-compose up -d

# Run database migrations if needed
echo "Running database migrations..."
docker-compose exec api npm run migrate

# Seed database if needed (first deployment only)
if [ "$1" = "--seed" ]; then
  echo "Seeding database..."
  docker-compose exec api node ../../scripts/seed-db.js
fi

echo "Deployment completed successfully!"