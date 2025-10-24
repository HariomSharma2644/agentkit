# OilWise Platform - Project Structure

## Directory Layout

```
oilwise-platform/
├── README.md                          # Main project documentation
├── PROJECT_SUMMARY.md                 # Executive summary
├── PROJECT_STRUCTURE.md               # This file
├── ARCHITECTURE.md                    # System architecture
├── API.md                             # API documentation
├── SETUP.md                           # Setup & installation guide
├── CONTRIBUTING.md                    # Contribution guidelines
├── LICENSE.md                         # MIT License
├── .env.example                       # Environment variables template
├── docker-compose.yml                 # Docker Compose configuration
│
├── backend/                           # Node.js/Express Backend
│   ├── package.json
│   ├── tsconfig.json
│   ├── src/
│   │   ├── index.ts                   # Main application entry
│   │   ├── database/
│   │   │   └── data-source.ts         # Database configuration
│   │   ├── entities/                  # TypeORM entities
│   │   │   ├── User.ts
│   │   │   ├── ConsumptionRecord.ts
│   │   │   ├── HealthMetric.ts
│   │   │   ├── Recipe.ts
│   │   │   ├── RewardPoint.ts
│   │   │   ├── Partner.ts
│   │   │   └── BlockchainCertificate.ts
│   │   ├── routes/                    # API routes
│   │   │   ├── auth.routes.ts
│   │   │   ├── user.routes.ts
│   │   │   ├── consumption.routes.ts
│   │   │   ├── health.routes.ts
│   │   │   ├── recipe.routes.ts
│   │   │   ├── reward.routes.ts
│   │   │   ├── analytics.routes.ts
│   │   │   ├── partner.routes.ts
│   │   │   └── blockchain.routes.ts
│   │   ├── middleware/
│   │   │   └── error-handler.ts
│   │   ├── utils/
│   │   │   └── logger.ts
│   │   ├── services/                  # Business logic
│   │   ├── migrations/                # Database migrations
│   │   └── tests/                     # Unit tests
│   └── Dockerfile
│
├── mobile-app/                        # React Native Mobile App
│   ├── package.json
│   ├── tsconfig.json
│   ├── src/
│   │   ├── App.tsx                    # Main app component
│   │   ├── screens/
│   │   │   ├── auth/
│   │   │   │   ├── LoginScreen.tsx
│   │   │   │   └── RegisterScreen.tsx
│   │   │   ├── dashboard/
│   │   │   │   └── DashboardScreen.tsx
│   │   │   ├── consumption/
│   │   │   │   └── ConsumptionScreen.tsx
│   │   │   ├── health/
│   │   │   │   └── HealthScreen.tsx
│   │   │   ├── recipes/
│   │   │   │   └── RecipesScreen.tsx
│   │   │   ├── rewards/
│   │   │   │   └── RewardsScreen.tsx
│   │   │   └── profile/
│   │   │       └── ProfileScreen.tsx
│   │   ├── components/                # Reusable components
│   │   ├── store/                     # Redux store
│   │   ├── services/                  # API services
│   │   └── utils/                     # Utilities
│   └── Dockerfile
│
├── web-dashboard/                     # React Web Dashboard
│   ├── package.json
│   ├── tsconfig.json
│   ├── src/
│   │   ├── App.tsx                    # Main app component
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   └── LoginPage.tsx
│   │   │   ├── dashboard/
│   │   │   │   └── DashboardPage.tsx
│   │   │   ├── consumption/
│   │   │   │   └── ConsumptionPage.tsx
│   │   │   ├── health/
│   │   │   │   └── HealthPage.tsx
│   │   │   ├── recipes/
│   │   │   │   └── RecipesPage.tsx
│   │   │   ├── analytics/
│   │   │   │   └── AnalyticsPage.tsx
│   │   │   ├── partners/
│   │   │   │   └── PartnersPage.tsx
│   │   │   ├── certifications/
│   │   │   │   └── CertificationsPage.tsx
│   │   │   └── users/
│   │   │       └── UsersPage.tsx
│   │   ├── components/                # Reusable components
│   │   ├── layouts/
│   │   │   └── MainLayout.tsx
│   │   ├── store/                     # Redux store
│   │   ├── services/                  # API services
│   │   └── utils/                     # Utilities
│   └── Dockerfile
│
├── ai-engine/                         # Python AI/ML Engine
│   ├── requirements.txt
│   ├── app.py                         # Flask application
│   ├── services/
│   │   ├── recipe_recommender.py      # Recipe recommendation
│   │   ├── health_analyzer.py         # Health risk assessment
│   │   ├── consumption_predictor.py   # Consumption forecasting
│   │   └── personalization_engine.py  # User personalization
│   ├── models/                        # ML models
│   ├── utils/                         # Utilities
│   ├── tests/                         # Unit tests
│   └── Dockerfile
│
├── iot-integration/                   # IoT Device Management
│   ├── package.json
│   ├── tsconfig.json
│   ├── src/
│   │   ├── index.ts                   # Main entry
│   │   ├── device-manager.ts          # Device management
│   │   ├── mqtt-handler.ts            # MQTT communication
│   │   ├── data-processor.ts          # Data processing
│   │   ├── utils/
│   │   │   └── logger.ts
│   │   └── tests/
│   └── Dockerfile
│
├── blockchain/                        # Ethereum Smart Contracts
│   ├── contracts/
│   │   └── OilWiseCertification.sol   # Main contract
│   ├── scripts/
│   │   └── deploy.ts                  # Deployment script
│   ├── test/                          # Contract tests
│   ├── hardhat.config.ts
│   └── package.json
│
├── database/                          # Database schemas & migrations
│   ├── migrations/
│   ├── seeds/
│   └── schemas/
│
├── docs/                              # Additional documentation
│   ├── user-guide.md
│   ├── admin-guide.md
│   ├── developer-guide.md
│   ├── api-examples.md
│   └── deployment-guide.md
│
├── tests/                             # Integration tests
│   ├── e2e/
│   ├── integration/
│   └── fixtures/
│
├── scripts/                           # Utility scripts
│   ├── setup.sh
│   ├── migrate.sh
│   ├── seed.sh
│   └── deploy.sh
│
└── .github/                           # GitHub configuration
    ├── workflows/
    │   ├── ci.yml                     # CI/CD pipeline
    │   └── deploy.yml                 # Deployment workflow
    └── ISSUE_TEMPLATE/
```

## Component Descriptions

### Backend (`backend/`)
- RESTful API server
- Database management
- Authentication & authorization
- Business logic
- 50+ API endpoints

### Mobile App (`mobile-app/`)
- React Native application
- Cross-platform (iOS/Android)
- Offline support
- Push notifications
- 6 main screens

### Web Dashboard (`web-dashboard/`)
- Analytics dashboard
- Admin panel
- Partner management
- Real-time charts
- 8+ pages

### AI Engine (`ai-engine/`)
- Recipe recommendations
- Health risk assessment
- Consumption prediction
- User personalization
- 4 core services

### IoT Integration (`iot-integration/`)
- MQTT broker communication
- Device management
- Real-time data collection
- Sensor integration

### Blockchain (`blockchain/`)
- Smart contracts
- Certification system
- Partner verification
- Transparency layer

## Key Files

### Configuration
- `.env.example` - Environment variables template
- `docker-compose.yml` - Docker services configuration
- `tsconfig.json` - TypeScript configuration
- `package.json` - Node.js dependencies

### Documentation
- `README.md` - Project overview
- `ARCHITECTURE.md` - System design
- `API.md` - API reference
- `SETUP.md` - Installation guide
- `CONTRIBUTING.md` - Contribution guidelines

### Database
- `backend/src/entities/` - Data models
- `backend/src/database/` - Database configuration
- `database/migrations/` - Schema migrations

### Tests
- `backend/src/tests/` - Backend tests
- `ai-engine/tests/` - AI tests
- `tests/` - Integration tests

## Development Workflow

1. **Setup**: Follow SETUP.md
2. **Development**: Make changes in respective directories
3. **Testing**: Run tests in each module
4. **Documentation**: Update relevant docs
5. **Commit**: Use conventional commits
6. **PR**: Create pull request with description

## Deployment

- Development: `docker-compose up -d`
- Production: Kubernetes manifests in `k8s/`
- CI/CD: GitHub Actions workflows in `.github/workflows/`

## Getting Help

- Check documentation in `docs/`
- Review API examples in `API.md`
- See setup guide in `SETUP.md`
- Check contributing guidelines in `CONTRIBUTING.md`

