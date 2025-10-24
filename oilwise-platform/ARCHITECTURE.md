# OilWise Platform Architecture

## System Overview

OilWise is a comprehensive digital platform designed to reduce edible oil consumption in India through behavioral nudges, health tracking, and policy integration.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Client Layer                              │
├──────────────────┬──────────────────┬──────────────────────┤
│  Mobile App      │  Web Dashboard   │  Partner Portal      │
│  (React Native)  │  (React)         │  (React)             │
└────────┬─────────┴────────┬─────────┴──────────┬───────────┘
         │                  │                    │
         └──────────────────┼────────────────────┘
                            │
         ┌──────────────────▼──────────────────┐
         │      API Gateway / Load Balancer    │
         └──────────────────┬──────────────────┘
                            │
    ┌───────────────────────┼───────────────────────┐
    │                       │                       │
┌───▼────────────┐  ┌──────▼──────────┐  ┌────────▼────────┐
│  Backend API   │  │  AI Engine      │  │  IoT Manager    │
│  (Node.js)     │  │  (Python/Flask) │  │  (Node.js)      │
└───┬────────────┘  └──────┬──────────┘  └────────┬────────┘
    │                      │                      │
    │  ┌──────────────────┬┴──────────────────┐   │
    │  │                  │                   │   │
┌───▼──▼──────┐  ┌────────▼────────┐  ┌─────▼──────────┐
│ PostgreSQL   │  │    MongoDB      │  │  Redis Cache   │
│ (Primary DB) │  │  (Document DB)  │  │  (Session)     │
└──────────────┘  └─────────────────┘  └────────────────┘
    │
    │  ┌──────────────────────────────────┐
    │  │   Blockchain Layer               │
    │  │   (Ethereum Smart Contracts)     │
    │  └──────────────────────────────────┘
    │
    │  ┌──────────────────────────────────┐
    │  │   MQTT Broker                    │
    │  │   (IoT Device Communication)     │
    │  └──────────────────────────────────┘
```

## Core Components

### 1. Backend API (Node.js/Express)
- **Responsibility**: Core business logic, data management, API endpoints
- **Key Features**:
  - User authentication & authorization
  - Consumption tracking
  - Health metrics management
  - Recipe recommendations
  - Reward system
  - Partner management
  - Analytics & reporting

### 2. AI Engine (Python/Flask)
- **Responsibility**: Machine learning and AI-powered features
- **Key Services**:
  - Recipe Recommender: Personalized low-oil recipe suggestions
  - Health Analyzer: Risk assessment based on health metrics
  - Consumption Predictor: Forecast future consumption patterns
  - Personalization Engine: User profile creation and customization

### 3. Mobile App (React Native)
- **Responsibility**: User-facing mobile application
- **Key Screens**:
  - Dashboard: Overview of consumption and health metrics
  - Consumption Tracker: Log daily oil usage
  - Recipe Browser: Discover low-oil recipes
  - Health Metrics: Track health indicators
  - Rewards: View and redeem reward points
  - Profile: User settings and preferences

### 4. Web Dashboard (React)
- **Responsibility**: Analytics and management interface
- **Key Features**:
  - Real-time consumption analytics
  - Health risk distribution
  - Campaign impact tracking
  - Partner management
  - Blockchain certification verification
  - User management

### 5. IoT Integration (Node.js)
- **Responsibility**: Device management and data collection
- **Key Features**:
  - MQTT broker communication
  - Device registration and management
  - Real-time sensor data processing
  - Data transmission to backend

### 6. Blockchain Layer (Ethereum)
- **Responsibility**: Certification and transparency
- **Smart Contracts**:
  - OilWiseCertification: Manage product certifications
  - Partner verification
  - Certificate issuance and revocation

## Data Flow

### Consumption Tracking Flow
```
IoT Device → MQTT Broker → IoT Manager → Backend API → PostgreSQL
                                              ↓
                                         AI Engine (Prediction)
                                              ↓
                                         Health Analyzer
```

### Recipe Recommendation Flow
```
User Request → Backend API → AI Engine (Recommender) → Response
                                  ↓
                            User Profile & Preferences
```

### Blockchain Certification Flow
```
Partner Registration → Backend API → Blockchain Contract → Verification
                           ↓
                      Certificate Storage (PostgreSQL)
```

## Database Schema

### Primary Database (PostgreSQL)
- Users
- ConsumptionRecords
- HealthMetrics
- Recipes
- RewardPoints
- Partners
- BlockchainCertificates

### Cache (Redis)
- Session data
- User preferences
- Frequently accessed recipes
- Analytics cache

### Document Store (MongoDB)
- User activity logs
- Detailed analytics
- Campaign data
- Unstructured metadata

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Consumption
- `POST /api/consumption/record` - Record oil consumption
- `GET /api/consumption/history/:userId` - Get consumption history
- `GET /api/consumption/daily/:userId` - Get daily consumption

### Health
- `POST /api/health/metrics` - Record health metrics
- `GET /api/health/metrics/:userId` - Get health metrics

### Recipes
- `GET /api/recipes/low-oil` - Get low-oil recipes
- `GET /api/recipes/recommendations/:userId` - Get recommendations
- `POST /api/recipes` - Create recipe

### Rewards
- `POST /api/rewards/award` - Award reward points
- `GET /api/rewards/:userId` - Get user rewards
- `POST /api/rewards/redeem/:rewardId` - Redeem reward

### Analytics
- `GET /api/analytics/national/consumption` - National statistics
- `GET /api/analytics/state/:state/consumption` - State statistics
- `GET /api/analytics/health/risk-distribution` - Health risk distribution
- `GET /api/analytics/campaign/impact` - Campaign impact

### Partners
- `POST /api/partners/register` - Register partner
- `GET /api/partners/:partnerId` - Get partner details
- `PUT /api/partners/:partnerId/products` - Update products

### Blockchain
- `POST /api/blockchain/certificate/create` - Create certificate
- `POST /api/blockchain/certificate/:certificateId/verify` - Verify certificate
- `GET /api/blockchain/certificate/:certificateId` - Get certificate
- `POST /api/blockchain/verify/authenticity` - Verify authenticity

## Deployment

### Development
```bash
docker-compose up -d
```

### Production
- Kubernetes deployment
- Load balancing
- Auto-scaling
- CI/CD pipeline
- Monitoring and logging

## Security Considerations

1. **Authentication**: JWT tokens with expiration
2. **Authorization**: Role-based access control (RBAC)
3. **Data Encryption**: TLS/SSL for data in transit
4. **Database Security**: Encrypted passwords, parameterized queries
5. **API Security**: Rate limiting, CORS, input validation
6. **Blockchain**: Smart contract audits, multi-sig wallets

## Scalability

- Horizontal scaling with load balancing
- Database replication and sharding
- Caching layer for frequently accessed data
- Asynchronous processing with message queues
- CDN for static assets

