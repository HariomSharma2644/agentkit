# OilWise Platform - Quick Start Guide

## 5-Minute Setup

### Prerequisites
- Docker & Docker Compose installed
- Git installed
- 4GB RAM available

### Step 1: Clone Repository
```bash
git clone https://github.com/oilwise/platform.git
cd oilwise-platform
```

### Step 2: Setup Environment
```bash
cp .env.example .env
```

### Step 3: Start Services
```bash
docker-compose up -d
```

### Step 4: Access Services
- **Backend API**: http://localhost:3000
- **AI Engine**: http://localhost:5000
- **Web Dashboard**: http://localhost:3001
- **MQTT Broker**: localhost:1883

## Common Commands

### Docker
```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Restart specific service
docker-compose restart backend
```

### Backend
```bash
cd backend

# Install dependencies
npm install

# Run migrations
npm run migrate

# Start development
npm run dev

# Run tests
npm test
```

### AI Engine
```bash
cd ai-engine

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start server
python app.py
```

### Mobile App
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

### Web Dashboard
```bash
cd web-dashboard

# Install dependencies
npm install

# Start development
npm start

# Build for production
npm run build
```

## API Quick Reference

### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "userType": "household"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Record Consumption
```bash
curl -X POST http://localhost:3000/api/consumption/record \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-id",
    "oilQuantityGrams": 25,
    "oilType": "sunflower",
    "mealType": "lunch"
  }'
```

### Get Consumption History
```bash
curl -X GET "http://localhost:3000/api/consumption/history/user-id?days=30" \
  -H "Authorization: Bearer <token>"
```

### Get Low-Oil Recipes
```bash
curl -X GET "http://localhost:3000/api/recipes/low-oil?limit=10" \
  -H "Authorization: Bearer <token>"
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
# Check PostgreSQL
docker-compose logs postgres

# Restart database
docker-compose restart postgres
```

### MQTT Connection Error
```bash
# Check Mosquitto
docker-compose logs mosquitto

# Restart MQTT
docker-compose restart mosquitto
```

### Docker Issues
```bash
# Clean up
docker-compose down -v

# Rebuild
docker-compose build --no-cache

# Start fresh
docker-compose up -d
```

## Project Structure

```
oilwise-platform/
├── backend/              # Node.js API
├── mobile-app/           # React Native app
├── web-dashboard/        # React dashboard
├── ai-engine/            # Python AI services
├── iot-integration/      # IoT device manager
├── blockchain/           # Smart contracts
├── docker-compose.yml    # Docker configuration
└── docs/                 # Documentation
```

## Key Features

✅ **Consumption Tracking** - Real-time oil usage monitoring
✅ **Health Assessment** - Risk scoring and recommendations
✅ **AI Recommendations** - Personalized recipes and insights
✅ **Gamification** - Rewards and leaderboards
✅ **Partner Integration** - Restaurant and retailer support
✅ **Blockchain** - Transparent certification system
✅ **IoT Support** - Smart device integration
✅ **Analytics** - Real-time dashboards

## Documentation

- [README.md](./README.md) - Full project overview
- [SETUP.md](./SETUP.md) - Detailed setup guide
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System design
- [API.md](./API.md) - API documentation
- [CONTRIBUTING.md](./CONTRIBUTING.md) - How to contribute

## Support

- **Issues**: GitHub Issues
- **Email**: support@oilwise.in
- **Docs**: https://docs.oilwise.in

## Next Steps

1. ✅ Setup complete!
2. 📖 Read [SETUP.md](./SETUP.md) for detailed configuration
3. 🔍 Check [API.md](./API.md) for API endpoints
4. 🏗️ Review [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
5. 🤝 See [CONTRIBUTING.md](./CONTRIBUTING.md) to contribute

## Quick Links

- [GitHub Repository](https://github.com/oilwise/platform)
- [Project Website](https://oilwise.in)
- [API Documentation](./API.md)
- [Architecture Guide](./ARCHITECTURE.md)
- [Contributing Guide](./CONTRIBUTING.md)

---

**Happy coding! 🚀**

For detailed information, see the full documentation in the project root.

