# OilWise Platform - Setup Guide

## Prerequisites

- Node.js 18+
- Python 3.9+
- Docker & Docker Compose
- PostgreSQL 14+
- MongoDB 5+
- Git

## Quick Start with Docker

### 1. Clone the Repository
```bash
git clone https://github.com/oilwise/platform.git
cd oilwise-platform
```

### 2. Setup Environment Variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

### 3. Start Services
```bash
docker-compose up -d
```

### 4. Run Migrations
```bash
docker-compose exec backend npm run migrate
```

### 5. Access Services
- Backend API: http://localhost:3000
- AI Engine: http://localhost:5000
- Web Dashboard: http://localhost:3001
- MQTT Broker: localhost:1883

## Manual Setup

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Run migrations
npm run migrate

# Start development server
npm run dev
```

### AI Engine Setup

```bash
cd ai-engine

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start Flask server
python app.py
```

### Mobile App Setup

```bash
cd mobile-app

# Install dependencies
npm install

# Start Expo
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

### Web Dashboard Setup

```bash
cd web-dashboard

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

### IoT Integration Setup

```bash
cd iot-integration

# Install dependencies
npm install

# Build TypeScript
npm run build

# Start service
npm start
```

## Database Setup

### PostgreSQL

```bash
# Create database
createdb oilwise

# Run migrations
npm run migrate
```

### MongoDB

```bash
# Connect to MongoDB
mongosh

# Create database
use oilwise

# Create collections
db.createCollection("users")
db.createCollection("consumption_records")
db.createCollection("health_metrics")
```

## Blockchain Setup

### Install Hardhat

```bash
cd blockchain
npm install

# Compile contracts
npx hardhat compile

# Deploy to local network
npx hardhat run scripts/deploy.ts --network localhost
```

## Testing

### Backend Tests
```bash
cd backend
npm test
npm run test:watch
```

### AI Engine Tests
```bash
cd ai-engine
pytest
pytest --cov
```

### Mobile App Tests
```bash
cd mobile-app
npm test
```

### Web Dashboard Tests
```bash
cd web-dashboard
npm test
```

## Development Workflow

### 1. Create Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes
```bash
# Edit files
# Run tests
npm test
```

### 3. Commit Changes
```bash
git add .
git commit -m "feat: description of changes"
```

### 4. Push and Create PR
```bash
git push origin feature/your-feature-name
```

## Troubleshooting

### Port Already in Use
```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Database Connection Error
```bash
# Check PostgreSQL is running
psql -U postgres -d oilwise

# Check MongoDB is running
mongosh
```

### MQTT Connection Error
```bash
# Check Mosquitto is running
docker-compose logs mosquitto

# Restart Mosquitto
docker-compose restart mosquitto
```

### Docker Issues
```bash
# Clean up Docker
docker-compose down -v

# Rebuild images
docker-compose build --no-cache

# Start fresh
docker-compose up -d
```

## Production Deployment

### 1. Build Docker Images
```bash
docker build -t oilwise-backend:latest ./backend
docker build -t oilwise-ai:latest ./ai-engine
docker build -t oilwise-iot:latest ./iot-integration
```

### 2. Push to Registry
```bash
docker tag oilwise-backend:latest your-registry/oilwise-backend:latest
docker push your-registry/oilwise-backend:latest
```

### 3. Deploy to Kubernetes
```bash
kubectl apply -f k8s/
```

### 4. Setup CI/CD
- Configure GitHub Actions
- Setup automated testing
- Configure deployment pipeline

## Monitoring

### Logs
```bash
# Backend logs
docker-compose logs -f backend

# AI Engine logs
docker-compose logs -f ai-engine

# All services
docker-compose logs -f
```

### Health Checks
```bash
# Backend health
curl http://localhost:3000/health

# AI Engine health
curl http://localhost:5000/health
```

## Support

For issues and questions:
- GitHub Issues: https://github.com/oilwise/platform/issues
- Email: support@oilwise.in
- Documentation: https://docs.oilwise.in

