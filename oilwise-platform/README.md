# OilWise Platform - Reducing Edible Oil Consumption in India

A comprehensive digital platform to nudge consumer behavior toward reduced oil consumption, promote healthier alternatives, and support domestic oilseed cultivation.

## Vision
Address India's excessive edible oil consumption (19.3 kg/capita vs 12 kg recommended) through a mobile-first, AI-powered platform with behavioral nudges, health tracking, and policy integration.

## Key Features

### 1. **Consumption Tracking & Health Metrics**
- Real-time oil consumption audit tools
- Health risk indicators (obesity, diabetes, cardiovascular disease)
- Integration with wearable devices and IoT sensors
- Personalized health impact reports

### 2. **AI-Powered Personalization**
- Personalized diet suggestions with low-oil recipes
- Regional cuisine recommendations
- Nutrition-based meal planning
- AI-driven recipe alternatives

### 3. **Behavioral Nudges & Rewards**
- Reward points system for compliance
- Social sharing for healthy habits
- Gamification features
- Community challenges

### 4. **E-Learning & Awareness**
- Educational modules for schools and communities
- Culturally contextualized campaigns
- Visual cues and infographics
- Healthy cooking practice guides

### 5. **Partnership & Integration APIs**
- Food delivery app integration
- Retail chain partnerships
- Restaurant menu digital labeling
- Oil content transparency

### 6. **Blockchain Certification**
- Transparent validation system
- Restaurant and manufacturer claims verification
- Low-oil product certification
- Supply chain transparency

### 7. **Policy & Analytics Dashboard**
- Real-time consumption pattern tracking
- District/state-level analytics
- Campaign impact measurement
- Policymaker insights

### 8. **Institutional Integration**
- Mid-Day Meal (MDM) scheme support
- Hospital and canteen integration
- School nutrition programs
- Institutional kitchen optimization

## Project Structure

```
oilwise-platform/
├── backend/                    # Node.js/Express backend
├── mobile-app/                 # React Native mobile app
├── web-dashboard/              # React web dashboard
├── ai-engine/                  # Python AI/ML services
├── blockchain/                 # Blockchain certification system
├── iot-integration/            # IoT device integration
├── api-gateway/                # API gateway & partnerships
├── database/                   # Database schemas
├── docs/                       # Documentation
└── tests/                      # Test suites
```

## Technology Stack

- **Backend**: Node.js, Express, TypeScript
- **Mobile**: React Native, Expo
- **Web**: React, Redux, Material-UI
- **AI/ML**: Python, TensorFlow, scikit-learn
- **Blockchain**: Ethereum, Solidity, Web3.js
- **Database**: PostgreSQL, MongoDB
- **IoT**: MQTT, Arduino, Raspberry Pi
- **APIs**: RESTful, GraphQL
- **DevOps**: Docker, Kubernetes, CI/CD

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.9+
- Docker & Docker Compose
- PostgreSQL 14+
- MongoDB 5+

### Installation

```bash
# Clone repository
git clone https://github.com/oilwise/platform.git
cd oilwise-platform

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Start services
docker-compose up -d

# Run migrations
npm run migrate

# Start development server
npm run dev
```

## Key Modules

1. **Consumption Audit Module** - Track and analyze oil usage
2. **Health Risk Assessment** - Calculate health impact scores
3. **Recipe Recommendation Engine** - AI-powered personalization
4. **Reward System** - Gamification and incentives
5. **Analytics Engine** - Real-time dashboards
6. **Blockchain Validator** - Certification verification
7. **IoT Manager** - Device integration and data collection
8. **Partnership API** - Third-party integrations

## Target Users

- Individual consumers (households)
- Schools and educational institutions
- Hospitals and healthcare facilities
- Restaurants and food service providers
- Food manufacturers
- Policymakers and government agencies
- NGOs and health organizations

## Impact Goals

- 10% reduction in per capita oil consumption
- Awareness among 50M+ users
- 10,000+ partner restaurants
- 5,000+ schools integrated
- Real-time policy insights for 28 states

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

MIT License - See [LICENSE.md](./LICENSE.md)

## Contact

For inquiries: contact@oilwise.in

