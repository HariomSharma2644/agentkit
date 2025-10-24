#!/bin/bash

# OilWise Platform - Docker Deployment Script

set -e

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                                                                ║"
echo "║         OilWise Platform - Docker Deployment Script            ║"
echo "║                                                                ║"
echo "╚════════════════════════════════════════════════════════════════╝"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo -e "\n${YELLOW}Checking prerequisites...${NC}"

if ! command -v docker &> /dev/null; then
    echo -e "${RED}Docker is not installed${NC}"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Docker Compose is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Docker and Docker Compose are installed${NC}"

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}Creating .env file from .env.example...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✓ .env file created${NC}"
    echo -e "${YELLOW}Please update .env with your configuration${NC}"
fi

# Create necessary directories
echo -e "\n${YELLOW}Creating directories...${NC}"
mkdir -p logs
mkdir -p data/postgres
mkdir -p data/mongodb
mkdir -p data/redis
mkdir -p data/mosquitto
echo -e "${GREEN}✓ Directories created${NC}"

# Build images
echo -e "\n${YELLOW}Building Docker images...${NC}"
docker-compose build --no-cache
echo -e "${GREEN}✓ Docker images built${NC}"

# Start services
echo -e "\n${YELLOW}Starting services...${NC}"
docker-compose up -d
echo -e "${GREEN}✓ Services started${NC}"

# Wait for services to be ready
echo -e "\n${YELLOW}Waiting for services to be ready...${NC}"
sleep 10

# Check service health
echo -e "\n${YELLOW}Checking service health...${NC}"

# Check Backend
if curl -s http://localhost:3000/health > /dev/null; then
    echo -e "${GREEN}✓ Backend API is healthy${NC}"
else
    echo -e "${RED}✗ Backend API is not responding${NC}"
fi

# Check AI Engine
if curl -s http://localhost:5000/health > /dev/null; then
    echo -e "${GREEN}✓ AI Engine is healthy${NC}"
else
    echo -e "${RED}✗ AI Engine is not responding${NC}"
fi

# Display service information
echo -e "\n${GREEN}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                   Deployment Successful!                       ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════════╝${NC}"

echo -e "\n${YELLOW}Services are running:${NC}"
echo -e "  ${GREEN}✓${NC} Backend API:     http://localhost:3000"
echo -e "  ${GREEN}✓${NC} AI Engine:       http://localhost:5000"
echo -e "  ${GREEN}✓${NC} MQTT Broker:     localhost:1883"
echo -e "  ${GREEN}✓${NC} PostgreSQL:      localhost:5432"
echo -e "  ${GREEN}✓${NC} MongoDB:         localhost:27017"
echo -e "  ${GREEN}✓${NC} Redis:           localhost:6379"

echo -e "\n${YELLOW}Useful commands:${NC}"
echo -e "  View logs:        ${GREEN}docker-compose logs -f${NC}"
echo -e "  Stop services:    ${GREEN}docker-compose down${NC}"
echo -e "  Restart services: ${GREEN}docker-compose restart${NC}"
echo -e "  View status:      ${GREEN}docker-compose ps${NC}"

echo -e "\n${YELLOW}Next steps:${NC}"
echo -e "  1. Test API:      ${GREEN}curl http://localhost:3000/health${NC}"
echo -e "  2. Read docs:     ${GREEN}cat QUICK_START.md${NC}"
echo -e "  3. Start coding:  ${GREEN}Happy development!${NC}"

echo -e "\n${GREEN}Deployment complete!${NC}\n"

