#!/bin/bash

# Bug Bounty Platform - Quick Start Script
# This script starts both backend and frontend servers

echo "🚀 Starting Bug Bounty Platform..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo -e "${RED}❌ Error: Please run this script from the Bug-Bounty root directory${NC}"
    exit 1
fi

# Check if PostgreSQL is accessible
echo -e "${BLUE}🔍 Checking PostgreSQL...${NC}"
if ! command -v psql &> /dev/null; then
    echo -e "${RED}⚠️  PostgreSQL CLI not found in PATH${NC}"
    echo "   Make sure PostgreSQL is running via pgAdmin4 or Windows Services"
else
    echo -e "${GREEN}✅ PostgreSQL CLI found${NC}"
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node --version) detected${NC}"
echo ""

# Install nodemon if not already installed
cd backend
if ! grep -q "nodemon" package.json; then
    echo -e "${BLUE}📦 Installing nodemon...${NC}"
    npm install --save-dev nodemon
fi
cd ..

echo ""
echo -e "${BLUE}📋 Starting servers...${NC}"
echo ""
echo -e "${GREEN}Backend:${NC}  http://localhost:4000"
echo -e "${GREEN}Frontend:${NC} http://localhost:3000"
echo ""
echo -e "${BLUE}Press Ctrl+C in either terminal to stop${NC}"
echo ""

# Start backend in a new terminal
echo -e "${BLUE}🔧 Starting Backend API...${NC}"
if command -v gnome-terminal &> /dev/null; then
    gnome-terminal -- bash -c "cd backend && npm run dev; exec bash"
elif command -v cmd.exe &> /dev/null; then
    # Windows
    cmd.exe /c start cmd /k "cd backend && npm run dev"
else
    # Fallback - run in background
    cd backend && npm run dev &
    BACKEND_PID=$!
    cd ..
fi

sleep 3

# Start frontend
echo -e "${BLUE}🌐 Starting Frontend Server...${NC}"
npx http-server -p 3000

# Cleanup if we started backend in background
if [ ! -z "$BACKEND_PID" ]; then
    kill $BACKEND_PID
fi
