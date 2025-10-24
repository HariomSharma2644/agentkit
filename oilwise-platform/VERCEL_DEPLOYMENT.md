# OilWise Platform - Vercel Deployment Guide

## Overview

This guide explains how to deploy the OilWise Platform on Vercel, a serverless platform optimized for Next.js and Node.js applications.

## Prerequisites

- Vercel account (https://vercel.com)
- GitHub account with the repository
- Node.js 18+ installed locally
- Vercel CLI installed: `npm install -g vercel`

## Deployment Options

### Option 1: Deploy via GitHub (Recommended)

#### Step 1: Connect GitHub Repository

1. Go to https://vercel.com/new
2. Click "Import Project"
3. Select "Import Git Repository"
4. Paste your repository URL: `https://github.com/HariomSharma2644/agentkit`
5. Click "Continue"

#### Step 2: Configure Project

1. **Project Name**: `oilwise-platform`
2. **Framework Preset**: Select "Other"
3. **Root Directory**: `oilwise-platform`
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`

#### Step 3: Set Environment Variables

Click "Environment Variables" and add:

```
DB_HOST=your-database-host
DB_PORT=5432
DB_USER=oilwise_user
DB_PASSWORD=your-secure-password
DB_NAME=oilwise_db
JWT_SECRET=your-jwt-secret
REDIS_URL=your-redis-url
MQTT_BROKER=your-mqtt-broker
AI_ENGINE_URL=your-ai-engine-url
```

#### Step 4: Deploy

Click "Deploy" and wait for the deployment to complete.

### Option 2: Deploy via Vercel CLI

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Login to Vercel

```bash
vercel login
```

#### Step 3: Deploy

```bash
cd oilwise-platform
vercel --prod
```

#### Step 4: Configure Environment Variables

During deployment, you'll be prompted to set environment variables. Add:

```
DB_HOST=your-database-host
DB_PORT=5432
DB_USER=oilwise_user
DB_PASSWORD=your-secure-password
DB_NAME=oilwise_db
JWT_SECRET=your-jwt-secret
REDIS_URL=your-redis-url
MQTT_BROKER=your-mqtt-broker
AI_ENGINE_URL=your-ai-engine-url
```

### Option 3: Deploy via Git Push

Once connected to GitHub, any push to the main branch will automatically trigger a deployment.

```bash
git push origin main
```

## Database Setup

### PostgreSQL on Vercel Postgres

1. Go to Vercel Dashboard
2. Click "Storage"
3. Click "Create Database"
4. Select "Postgres"
5. Choose region and create
6. Copy connection string to `.env`

### MongoDB on MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Add to environment variables

### Redis on Upstash

1. Go to https://upstash.com
2. Create a Redis database
3. Copy connection string
4. Add to environment variables

## Deployment Configuration

### vercel.json

The `vercel.json` file configures:

- **Builds**: How to build each component
- **Routes**: URL routing configuration
- **Environment Variables**: Deployment environment variables
- **Functions**: Serverless function configuration

### Build Configuration

```json
{
  "builds": [
    {
      "src": "backend/package.json",
      "use": "@vercel/node"
    },
    {
      "src": "ai-engine/app.py",
      "use": "@vercel/python"
    },
    {
      "src": "web-dashboard/package.json",
      "use": "@vercel/static-build"
    }
  ]
}
```

### Routes Configuration

```json
{
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/index.ts"
    },
    {
      "src": "/ai/(.*)",
      "dest": "ai-engine/app.py"
    },
    {
      "src": "/(.*)",
      "dest": "web-dashboard/build/$1"
    }
  ]
}
```

## Deployment Steps

### Step 1: Prepare Code

```bash
cd oilwise-platform

# Install dependencies
npm install

# Build backend
cd backend && npm run build && cd ..

# Build web dashboard
cd web-dashboard && npm run build && cd ..

# Build AI engine (if needed)
cd ai-engine && pip install -r requirements.txt && cd ..
```

### Step 2: Set Environment Variables

Create `.env.production` with production values:

```
NODE_ENV=production
DB_HOST=your-production-db-host
DB_USER=oilwise_user
DB_PASSWORD=your-secure-password
DB_NAME=oilwise_db
JWT_SECRET=your-production-jwt-secret
REDIS_URL=your-production-redis-url
MQTT_BROKER=your-production-mqtt-broker
AI_ENGINE_URL=your-production-ai-engine-url
```

### Step 3: Deploy

```bash
vercel --prod
```

### Step 4: Verify Deployment

```bash
# Check deployment status
vercel status

# View logs
vercel logs

# Open deployed site
vercel open
```

## Monitoring & Logs

### View Logs

```bash
# Real-time logs
vercel logs --follow

# Specific function logs
vercel logs backend
vercel logs ai-engine
```

### Monitoring Dashboard

1. Go to Vercel Dashboard
2. Select your project
3. Click "Monitoring"
4. View metrics and logs

## Custom Domain

### Add Custom Domain

1. Go to Vercel Dashboard
2. Select your project
3. Click "Settings" → "Domains"
4. Add your domain
5. Configure DNS records

### SSL Certificate

Vercel automatically provides SSL certificates for all deployments.

## Scaling & Performance

### Function Configuration

```json
{
  "functions": {
    "backend/index.ts": {
      "maxDuration": 60,
      "memory": 1024
    },
    "ai-engine/app.py": {
      "maxDuration": 120,
      "memory": 2048
    }
  }
}
```

### Limits

- **Max Duration**: 60 seconds (Pro: 900 seconds)
- **Memory**: 1024 MB (Pro: 3008 MB)
- **Concurrent Executions**: Unlimited

## Troubleshooting

### Build Failures

```bash
# Check build logs
vercel logs --follow

# Rebuild
vercel --prod --force
```

### Environment Variables Not Set

```bash
# Check environment variables
vercel env list

# Set environment variable
vercel env add DB_HOST your-host
```

### Database Connection Issues

1. Verify database credentials
2. Check firewall rules
3. Ensure database is accessible from Vercel IPs
4. Test connection locally first

### Performance Issues

1. Check function duration in logs
2. Optimize database queries
3. Enable caching
4. Use CDN for static assets

## Rollback

### Rollback to Previous Deployment

```bash
# List deployments
vercel list

# Rollback to specific deployment
vercel rollback <deployment-id>
```

## CI/CD Integration

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## Cost Estimation

### Vercel Pricing

- **Hobby Plan**: Free (limited)
- **Pro Plan**: $20/month
- **Enterprise**: Custom pricing

### Estimated Costs

- Backend API: ~$5-10/month
- AI Engine: ~$10-20/month
- Web Dashboard: ~$5/month
- Database: ~$10-50/month (depending on provider)
- Total: ~$30-80/month

## Best Practices

1. **Use Environment Variables**: Never hardcode secrets
2. **Monitor Performance**: Check function duration and memory usage
3. **Enable Caching**: Use Redis for frequently accessed data
4. **Optimize Database**: Use connection pooling
5. **Test Locally**: Test deployment locally before pushing
6. **Use Staging**: Deploy to staging before production
7. **Monitor Logs**: Check logs regularly for errors
8. **Set Alerts**: Configure alerts for errors and performance issues

## Support

For deployment issues:
- Check Vercel documentation: https://vercel.com/docs
- View logs: `vercel logs`
- Contact Vercel support: https://vercel.com/support

## Next Steps

1. ✅ Create Vercel account
2. ✅ Connect GitHub repository
3. ✅ Set environment variables
4. ✅ Deploy
5. ✅ Configure custom domain
6. ✅ Setup monitoring
7. ✅ Configure CI/CD

---

**Your OilWise Platform is now deployed on Vercel!** 🚀

