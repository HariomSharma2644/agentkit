# OilWise Platform - Project Summary

## Project Overview

OilWise is a comprehensive digital platform designed to address India's excessive edible oil consumption crisis through behavioral nudges, health tracking, AI-powered personalization, and blockchain-based transparency.

## Problem Statement

- India's per capita oil consumption: 19.3 kg/year (60% above ICMR recommendation of 12 kg)
- Health impact: Rising obesity, diabetes, cardiovascular diseases
- Economic burden: USD 4.58 trillion projected by 2030 due to NCDs
- Import dependency: 56% of 27.8 million tonnes consumed in 2023-24
- Goal: 10% reduction in per capita consumption (PM's Mann Ki Baat, Feb 2025)

## Solution Architecture

### Core Components

1. **Backend API** (Node.js/Express)
   - User authentication & management
   - Consumption tracking
   - Health metrics management
   - Reward system
   - Partner management
   - Analytics engine

2. **AI Engine** (Python/Flask)
   - Recipe recommendation system
   - Health risk assessment
   - Consumption prediction
   - Personalization engine

3. **Mobile App** (React Native)
   - Consumption tracking
   - Health metrics dashboard
   - Recipe discovery
   - Reward management
   - Community features

4. **Web Dashboard** (React)
   - Real-time analytics
   - Campaign tracking
   - Partner management
   - Blockchain verification
   - User management

5. **IoT Integration** (Node.js)
   - Smart device management
   - Real-time data collection
   - MQTT communication
   - Sensor data processing

6. **Blockchain Layer** (Ethereum)
   - Product certification
   - Partner verification
   - Transparency system
   - Smart contracts

## Key Features

### 1. Consumption Tracking
- Manual entry and IoT device integration
- Real-time tracking dashboard
- Historical analysis
- Trend identification
- Personalized insights

### 2. Health Risk Assessment
- BMI calculation
- Blood pressure monitoring
- Cholesterol tracking
- Health risk scoring (0-100)
- Risk level classification (low/moderate/high/critical)
- Personalized recommendations

### 3. AI-Powered Personalization
- Recipe recommendations based on preferences
- Dietary restriction support
- Regional cuisine focus
- Health goal alignment
- Consumption prediction

### 4. Behavioral Nudges & Gamification
- Reward points system
- Achievement badges
- Leaderboards
- Social sharing
- Community challenges
- Milestone celebrations

### 5. E-Learning & Awareness
- Educational modules
- Cooking technique guides
- Nutrition information
- Health impact visualization
- Multilingual support

### 6. Partner Integration
- Restaurant menu labeling
- Low-oil product certification
- Food delivery app integration
- Retail chain partnerships
- Institutional kitchen support

### 7. Blockchain Certification
- Immutable product records
- Partner verification
- Certification transparency
- Authenticity verification
- Supply chain tracking

### 8. Analytics & Reporting
- National consumption statistics
- State-wise analytics
- Health risk distribution
- Campaign impact measurement
- Policymaker dashboards

## Technology Stack

### Frontend
- React Native (Mobile)
- React (Web Dashboard)
- Redux (State Management)
- Material-UI (Design System)

### Backend
- Node.js & Express
- TypeScript
- PostgreSQL (Primary DB)
- MongoDB (Document Store)
- Redis (Caching)

### AI/ML
- Python & Flask
- TensorFlow/Keras
- scikit-learn
- NumPy/Pandas

### IoT & Communication
- MQTT Protocol
- Arduino/Raspberry Pi
- Modbus Serial

### Blockchain
- Ethereum
- Solidity Smart Contracts
- Web3.js
- Ethers.js

### DevOps
- Docker & Docker Compose
- Kubernetes
- CI/CD Pipeline
- GitHub Actions

## Database Schema

### Core Entities
- Users (authentication, profiles, preferences)
- ConsumptionRecords (oil usage tracking)
- HealthMetrics (health indicators)
- Recipes (low-oil recipes database)
- RewardPoints (gamification)
- Partners (restaurant/manufacturer data)
- BlockchainCertificates (certification records)

## API Endpoints (50+)

### Authentication (2)
- User registration
- User login

### Consumption (3)
- Record consumption
- Get history
- Get daily data

### Health (2)
- Record metrics
- Get metrics

### Recipes (3)
- Get low-oil recipes
- Get recommendations
- Create recipe

### Rewards (4)
- Award points
- Get rewards
- Redeem rewards
- Get leaderboard

### Analytics (4)
- National statistics
- State-wise data
- Health risk distribution
- Campaign impact

### Partners (3)
- Register partner
- Get details
- Update products

### Blockchain (4)
- Create certificate
- Verify certificate
- Get certificate
- Verify authenticity

## Target Users

1. **Individual Consumers** (Households)
   - Daily oil consumption tracking
   - Health monitoring
   - Recipe discovery
   - Reward collection

2. **Schools & Institutions**
   - MDM program integration
   - Nutrition tracking
   - Educational modules
   - Bulk management

3. **Restaurants & Food Service**
   - Menu optimization
   - Low-oil certification
   - Customer engagement
   - Compliance tracking

4. **Manufacturers**
   - Product certification
   - Blockchain verification
   - Supply chain transparency
   - Quality assurance

5. **Policymakers**
   - Real-time analytics
   - Campaign tracking
   - Impact measurement
   - Decision support

## Impact Goals

- **Users**: 50M+ active users
- **Consumption Reduction**: 10% per capita reduction
- **Partner Network**: 10,000+ restaurants
- **School Integration**: 5,000+ schools
- **Policy Coverage**: 28 states
- **Health Improvement**: Measurable reduction in NCDs

## Deployment

### Development
- Docker Compose for local setup
- All services containerized
- Easy environment configuration

### Production
- Kubernetes orchestration
- Load balancing
- Auto-scaling
- Monitoring & logging
- CI/CD pipeline

## Security Features

- JWT authentication
- Role-based access control
- TLS/SSL encryption
- Parameterized queries
- Input validation
- Rate limiting
- CORS protection

## Scalability

- Horizontal scaling with load balancing
- Database replication
- Caching layer
- Asynchronous processing
- CDN for static assets
- Microservices architecture

## Getting Started

1. Clone repository
2. Copy `.env.example` to `.env`
3. Run `docker-compose up -d`
4. Access services at localhost:3000+

See [SETUP.md](./SETUP.md) for detailed instructions.

## Documentation

- [README.md](./README.md) - Project overview
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System design
- [API.md](./API.md) - API documentation
- [SETUP.md](./SETUP.md) - Installation guide
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines

## License

MIT License - See [LICENSE.md](./LICENSE.md)

## Contact

- Email: contact@oilwise.in
- Website: https://oilwise.in
- GitHub: https://github.com/oilwise/platform

## Contributors

See [CONTRIBUTORS.md](./CONTRIBUTORS.md) for list of contributors.

---

**Status**: Active Development
**Last Updated**: January 2024
**Version**: 1.0.0-beta

