# OilWise Platform - API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
All endpoints (except auth) require JWT token in header:
```
Authorization: Bearer <token>
```

## Response Format
```json
{
  "success": true,
  "data": {},
  "message": "Success message"
}
```

## Error Response
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Error message",
  "details": {}
}
```

## Endpoints

### Authentication

#### Register User
```
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "userType": "household"
}

Response: 201
{
  "success": true,
  "token": "jwt_token",
  "user": { ... }
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: 200
{
  "success": true,
  "token": "jwt_token",
  "user": { ... }
}
```

### Consumption Tracking

#### Record Consumption
```
POST /consumption/record
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "user-id",
  "oilQuantityGrams": 25,
  "oilType": "sunflower",
  "mealType": "lunch",
  "dishName": "Fried Rice",
  "cuisineType": "Chinese",
  "source": "manual"
}

Response: 201
{
  "success": true,
  "data": { ... }
}
```

#### Get Consumption History
```
GET /consumption/history/:userId?days=30
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "data": {
    "records": [ ... ],
    "summary": {
      "totalOil": 750,
      "averageDaily": 25,
      "recordCount": 30
    }
  }
}
```

#### Get Daily Consumption
```
GET /consumption/daily/:userId
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "data": {
    "date": "2024-01-15",
    "totalOil": 45,
    "records": [ ... ]
  }
}
```

### Health Metrics

#### Record Health Metrics
```
POST /health/metrics
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "user-id",
  "weight": 75,
  "height": 175,
  "bmi": 24.5,
  "bloodPressureSystolic": 120,
  "bloodPressureDiastolic": 80,
  "cholesterol": 180,
  "bloodSugar": 100,
  "dailyOilIntake": 45
}

Response: 201
{
  "success": true,
  "data": {
    "healthRiskScore": 35,
    "riskLevel": "moderate",
    "riskFactors": [ ... ],
    "recommendations": [ ... ]
  }
}
```

#### Get Health Metrics
```
GET /health/metrics/:userId
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "data": [ ... ]
}
```

### Recipes

#### Get Low-Oil Recipes
```
GET /recipes/low-oil?cuisineType=south_indian&limit=20
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "data": [ ... ]
}
```

#### Get Recipe Recommendations
```
GET /recipes/recommendations/:userId?limit=10
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "data": [ ... ]
}
```

#### Create Recipe
```
POST /recipes
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Low-Oil Dosa",
  "description": "Crispy dosa with minimal oil",
  "cuisineType": "south_indian",
  "oilQuantityGrams": 3,
  "servings": 2,
  "caloriesPerServing": 150,
  "fatPerServing": 5,
  "ingredients": [ ... ],
  "instructions": "...",
  "tags": ["low-oil", "vegetarian"],
  "healthBenefits": ["low-fat", "high-protein"]
}

Response: 201
{
  "success": true,
  "data": { ... }
}
```

### Rewards

#### Award Reward Points
```
POST /rewards/award
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "user-id",
  "points": 100,
  "rewardType": "consumption_reduction",
  "description": "Reduced oil consumption by 20%"
}

Response: 201
{
  "success": true,
  "data": { ... }
}
```

#### Get User Rewards
```
GET /rewards/:userId?redeemed=false
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "data": {
    "rewards": [ ... ],
    "totalPoints": 500
  }
}
```

#### Redeem Reward
```
POST /rewards/redeem/:rewardId
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "data": { ... }
}
```

#### Get Leaderboard
```
GET /rewards/leaderboard/top?limit=10
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "data": [ ... ]
}
```

### Analytics

#### National Consumption Statistics
```
GET /analytics/national/consumption?days=30
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "data": {
    "totalOilConsumed": 50000,
    "averageDailyConsumption": 1666.67,
    "activeUsers": 100
  }
}
```

#### State-wise Consumption
```
GET /analytics/state/:state/consumption?days=30
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "data": { ... }
}
```

#### Health Risk Distribution
```
GET /analytics/health/risk-distribution
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "data": {
    "distribution": {
      "low": 50,
      "moderate": 30,
      "high": 15,
      "critical": 5
    }
  }
}
```

### Partners

#### Register Partner
```
POST /partners/register
Content-Type: application/json

{
  "name": "Restaurant Name",
  "email": "contact@restaurant.com",
  "partnerType": "restaurant",
  "address": "123 Main St",
  "city": "Delhi",
  "state": "Delhi",
  "pincode": "110001"
}

Response: 201
{
  "success": true,
  "data": {
    "id": "partner-id",
    "apiKey": "api-key"
  }
}
```

#### Get Verified Partners
```
GET /partners/list/verified?partnerType=restaurant&state=Delhi&limit=50
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "data": [ ... ]
}
```

### Blockchain

#### Create Certificate
```
POST /blockchain/certificate/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "partnerId": "partner-id",
  "productName": "Low-Oil Samosa",
  "oilContent": 2.5,
  "certificationType": "low-oil"
}

Response: 201
{
  "success": true,
  "data": { ... }
}
```

#### Verify Certificate
```
POST /blockchain/certificate/:certificateId/verify
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "data": { ... }
}
```

#### Verify Authenticity
```
POST /blockchain/verify/authenticity
Content-Type: application/json

{
  "blockchainHash": "hash-value"
}

Response: 200
{
  "success": true,
  "data": {
    "isAuthentic": true,
    "certificate": { ... }
  }
}
```

## Rate Limiting

- 100 requests per minute per user
- 1000 requests per minute per IP

## Pagination

Use `limit` and `offset` parameters:
```
GET /endpoint?limit=20&offset=0
```

## Filtering

Use query parameters for filtering:
```
GET /endpoint?field=value&field2=value2
```

## Sorting

Use `sort` parameter:
```
GET /endpoint?sort=createdAt:desc
```

## Error Codes

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

