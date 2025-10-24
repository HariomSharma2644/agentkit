# OilWise Platform - Complete Project Index

## 📋 Project Overview

**OilWise** is a comprehensive digital platform to reduce edible oil consumption in India through behavioral nudges, health tracking, AI-powered personalization, and blockchain-based transparency.

**Status**: ✅ Complete Project Structure Created
**Files Created**: 44+ configuration, source, and documentation files
**Components**: 6 major modules (Backend, Mobile, Web, AI, IoT, Blockchain)

## 📚 Documentation Files

### Getting Started
1. **[QUICK_START.md](./QUICK_START.md)** ⭐ START HERE
   - 5-minute setup guide
   - Common commands
   - Quick API reference
   - Troubleshooting tips

2. **[README.md](./README.md)**
   - Project vision and goals
   - Key features overview
   - Technology stack
   - Installation instructions

3. **[SETUP.md](./SETUP.md)**
   - Detailed setup instructions
   - Docker setup
   - Manual setup for each component
   - Database configuration
   - Testing guide

### Architecture & Design
4. **[ARCHITECTURE.md](./ARCHITECTURE.md)**
   - System architecture diagram
   - Component descriptions
   - Data flow diagrams
   - Database schema
   - API endpoints overview
   - Security considerations
   - Scalability approach

5. **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)**
   - Complete directory layout
   - File organization
   - Component descriptions
   - Development workflow

6. **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)**
   - Executive summary
   - Problem statement
   - Solution overview
   - Impact goals
   - Target users

### API & Integration
7. **[API.md](./API.md)**
   - Complete API documentation
   - 50+ endpoints
   - Request/response examples
   - Authentication details
   - Error codes
   - Rate limiting

### Development
8. **[CONTRIBUTING.md](./CONTRIBUTING.md)**
   - Contribution guidelines
   - Code standards
   - Git workflow
   - Testing requirements
   - PR process

9. **[LICENSE.md](./LICENSE.md)**
   - MIT License

## 🏗️ Backend Module (`backend/`)

### Core Files
- `package.json` - Dependencies and scripts
- `src/index.ts` - Main application entry point
- `src/database/data-source.ts` - Database configuration

### Entities (Data Models)
- `src/entities/User.ts` - User profiles
- `src/entities/ConsumptionRecord.ts` - Oil consumption tracking
- `src/entities/HealthMetric.ts` - Health indicators
- `src/entities/Recipe.ts` - Recipe database
- `src/entities/RewardPoint.ts` - Gamification system
- `src/entities/Partner.ts` - Restaurant/manufacturer data
- `src/entities/BlockchainCertificate.ts` - Certification records

### API Routes (8 modules)
- `src/routes/auth.routes.ts` - Authentication (register, login)
- `src/routes/user.routes.ts` - User management
- `src/routes/consumption.routes.ts` - Consumption tracking
- `src/routes/health.routes.ts` - Health metrics
- `src/routes/recipe.routes.ts` - Recipe management
- `src/routes/reward.routes.ts` - Reward system
- `src/routes/analytics.routes.ts` - Analytics & reporting
- `src/routes/partner.routes.ts` - Partner management
- `src/routes/blockchain.routes.ts` - Blockchain integration

### Utilities
- `src/middleware/error-handler.ts` - Error handling
- `src/utils/logger.ts` - Logging system

## 📱 Mobile App Module (`mobile-app/`)

### Core Files
- `package.json` - React Native dependencies
- `src/App.tsx` - Main application component

### Screens
- `src/screens/auth/` - Login & Registration
- `src/screens/dashboard/` - Home dashboard
- `src/screens/consumption/` - Consumption tracker
- `src/screens/health/` - Health metrics
- `src/screens/recipes/` - Recipe browser
- `src/screens/rewards/` - Reward management
- `src/screens/profile/` - User profile

## 🌐 Web Dashboard Module (`web-dashboard/`)

### Core Files
- `package.json` - React dependencies
- `src/App.tsx` - Main application

### Pages
- `src/pages/auth/` - Login page
- `src/pages/dashboard/` - Analytics dashboard
- `src/pages/consumption/` - Consumption analytics
- `src/pages/health/` - Health analytics
- `src/pages/recipes/` - Recipe management
- `src/pages/analytics/` - Advanced analytics
- `src/pages/partners/` - Partner management
- `src/pages/certifications/` - Blockchain verification
- `src/pages/users/` - User management

## 🤖 AI Engine Module (`ai-engine/`)

### Core Files
- `requirements.txt` - Python dependencies
- `app.py` - Flask application

### Services
- `services/recipe_recommender.py` - AI recipe recommendations
- `services/health_analyzer.py` - Health risk assessment
- `services/consumption_predictor.py` - Consumption forecasting
- `services/personalization_engine.py` - User personalization

## 🔌 IoT Integration Module (`iot-integration/`)

### Core Files
- `package.json` - Node.js dependencies
- `src/device-manager.ts` - Device management
- MQTT communication
- Real-time data processing

## ⛓️ Blockchain Module (`blockchain/`)

### Smart Contracts
- `contracts/OilWiseCertification.sol` - Main certification contract

### Scripts
- `scripts/deploy.ts` - Contract deployment

## ⚙️ Configuration Files

### Docker
- `docker-compose.yml` - Complete Docker setup
  - PostgreSQL database
  - MongoDB
  - Redis cache
  - MQTT broker
  - Backend API
  - AI Engine
  - IoT Integration

### Environment
- `.env.example` - Environment variables template

## 🎯 Key Features Implemented

### 1. Consumption Tracking ✅
- Manual entry
- IoT device integration
- Historical analysis
- Trend identification

### 2. Health Assessment ✅
- BMI calculation
- Blood pressure monitoring
- Health risk scoring
- Personalized recommendations

### 3. AI Personalization ✅
- Recipe recommendations
- Consumption prediction
- User profiling
- Preference learning

### 4. Gamification ✅
- Reward points system
- Leaderboards
- Achievement badges
- Social sharing

### 5. Partner Integration ✅
- Restaurant management
- Product certification
- Menu labeling
- Compliance tracking

### 6. Blockchain ✅
- Smart contracts
- Certificate management
- Authenticity verification
- Transparency system

### 7. Analytics ✅
- Real-time dashboards
- National statistics
- State-wise analytics
- Campaign tracking

### 8. IoT Support ✅
- Device management
- MQTT communication
- Real-time data collection
- Sensor integration

## 📊 Statistics

- **Total Files**: 44+
- **Backend Routes**: 50+ endpoints
- **Database Entities**: 7 core models
- **AI Services**: 4 modules
- **Mobile Screens**: 6 main screens
- **Web Pages**: 8+ pages
- **Smart Contracts**: 1 main contract
- **Documentation**: 10 comprehensive guides

## 🚀 Getting Started

### Quick Start (5 minutes)
```bash
git clone https://github.com/oilwise/platform.git
cd oilwise-platform
cp .env.example .env
docker-compose up -d
```

### Access Services
- Backend: http://localhost:3000
- AI Engine: http://localhost:5000
- Web Dashboard: http://localhost:3001

## 📖 Documentation Reading Order

1. **[QUICK_START.md](./QUICK_START.md)** - Get running in 5 minutes
2. **[README.md](./README.md)** - Understand the project
3. **[SETUP.md](./SETUP.md)** - Detailed setup
4. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System design
5. **[API.md](./API.md)** - API reference
6. **[CONTRIBUTING.md](./CONTRIBUTING.md)** - How to contribute

## 🔗 Quick Links

- **GitHub**: https://github.com/oilwise/platform
- **Website**: https://oilwise.in
- **Email**: contact@oilwise.in

## 📝 License

MIT License - See [LICENSE.md](./LICENSE.md)

## ✨ Next Steps

1. ✅ Review [QUICK_START.md](./QUICK_START.md)
2. ✅ Setup project with Docker
3. ✅ Explore API endpoints
4. ✅ Review architecture
5. ✅ Start contributing!

---

**Project Status**: Active Development
**Last Updated**: January 2024
**Version**: 1.0.0-beta

**Ready to reduce oil consumption and improve health in India! 🇮🇳💚**

