#!/bin/bash

# Passenger Startup Script for cPanel Node.js Application
# This script ensures proper environment setup before starting the app

echo "Starting Next.js application for cPanel..."

# Set default environment variables if not already set
export NODE_ENV=${NODE_ENV:-production}
export PORT=${PORT:-3000}

# Validate critical environment variables
if [ -z "$NEXT_PUBLIC_VIDEO_BASE_URL" ]; then
    echo "Warning: NEXT_PUBLIC_VIDEO_BASE_URL is not set"
fi

if [ -z "$SITE_URL" ]; then
    echo "Warning: SITE_URL is not set, defaulting to tanvirvisuals.com"
    export SITE_URL=https://tanvirvisuals.com
fi

# Display environment info
echo "Node.js version: $(node --version)"
echo "NPM version: $(npm --version)"
echo "Environment: $NODE_ENV"
echo "Port: $PORT"

# Check if required files exist
if [ ! -f "server.js" ]; then
    echo "Error: server.js not found!"
    exit 1
fi

if [ ! -f "package.json" ]; then
    echo "Error: package.json not found!"
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm ci --only=production
fi

# Start the application
echo "Launching application with Passenger..."
exec node server.js