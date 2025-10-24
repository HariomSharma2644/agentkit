#!/bin/bash

# OilWise Platform - Vercel Build Script

set -e

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                                                                ║"
echo "║         OilWise Platform - Vercel Build Script                 ║"
echo "║                                                                ║"
echo "╚════════════════════════════════════════════════════════════════╝"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "\n${YELLOW}Building OilWise Platform for Vercel...${NC}"

# Build Backend
echo -e "\n${YELLOW}Building Backend API...${NC}"
cd backend
npm install
npm run build
echo -e "${GREEN}✓ Backend built successfully${NC}"
cd ..

# Build Web Dashboard
echo -e "\n${YELLOW}Building Web Dashboard...${NC}"
cd web-dashboard
npm install
npm run build
echo -e "${GREEN}✓ Web Dashboard built successfully${NC}"
cd ..

# Build AI Engine (Python)
echo -e "\n${YELLOW}Preparing AI Engine...${NC}"
cd ai-engine
pip install -r requirements.txt
echo -e "${GREEN}✓ AI Engine dependencies installed${NC}"
cd ..

echo -e "\n${GREEN}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                   Build Successful!                            ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════════╝${NC}"

echo -e "\n${YELLOW}Next steps:${NC}"
echo -e "  1. Deploy to Vercel: ${GREEN}vercel --prod${NC}"
echo -e "  2. Set environment variables in Vercel dashboard"
echo -e "  3. Configure custom domain"
echo -e "  4. Monitor deployment: ${GREEN}vercel logs${NC}"

echo -e "\n${GREEN}Build complete!${NC}\n"

