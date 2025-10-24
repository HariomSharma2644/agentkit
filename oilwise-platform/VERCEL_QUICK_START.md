# OilWise Platform - Vercel Quick Start

## 🚀 Deploy in 5 Minutes

### Step 1: Create Vercel Account

1. Go to https://vercel.com
2. Click "Sign Up"
3. Choose "GitHub" and authorize
4. Complete setup

### Step 2: Deploy Project

#### Option A: One-Click Deploy (Easiest)

Click the button below to deploy directly:

```
https://vercel.com/new/clone?repository-url=https://github.com/HariomSharma2644/agentkit&project-name=oilwise-platform&root-directory=oilwise-platform
```

#### Option B: Manual Deploy

1. Go to https://vercel.com/new
2. Click "Import Project"
3. Paste: `https://github.com/HariomSharma2644/agentkit`
4. Set Root Directory: `oilwise-platform`
5. Click "Deploy"

### Step 3: Set Environment Variables

In Vercel Dashboard:

1. Go to "Settings" → "Environment Variables"
2. Add these variables:

```
DB_HOST=your-database-host
DB_USER=oilwise_user
DB_PASSWORD=your-password
DB_NAME=oilwise_db
JWT_SECRET=your-jwt-secret
REDIS_URL=your-redis-url
MQTT_BROKER=your-mqtt-broker
AI_ENGINE_URL=your-ai-engine-url
```

### Step 4: Deploy

Click "Deploy" and wait for completion.

### Step 5: Access Your App

Your app is now live at: `https://oilwise-platform.vercel.app`

## 📊 Deployment Options

### Option 1: Vercel Postgres (Recommended)

1. In Vercel Dashboard, click "Storage"
2. Click "Create Database"
3. Select "Postgres"
4. Copy connection string
5. Add to environment variables

### Option 2: External Database

Use your own PostgreSQL, MongoDB, or Redis:

1. Get connection string from your provider
2. Add to environment variables
3. Ensure database is accessible from Vercel

### Option 3: Managed Services

- **Database**: Vercel Postgres, AWS RDS, or DigitalOcean
- **Cache**: Upstash Redis
- **Message Queue**: AWS SQS or RabbitMQ
- **Storage**: AWS S3 or Vercel Blob

## 🔧 Configuration

### vercel.json

The project includes `vercel.json` with:

- Build configuration for Node.js and Python
- Route configuration
- Environment variables
- Function settings

### Build Command

```bash
npm run build
```

### Output Directory

```
dist/
```

## 📈 Monitoring

### View Logs

```bash
vercel logs
```

### Monitor Performance

1. Go to Vercel Dashboard
2. Click "Monitoring"
3. View metrics and logs

### Set Alerts

1. Go to "Settings" → "Alerts"
2. Configure error and performance alerts

## 🌐 Custom Domain

### Add Domain

1. Go to "Settings" → "Domains"
2. Add your domain
3. Configure DNS records
4. SSL certificate auto-configured

### DNS Configuration

For example.com:

```
CNAME: www.example.com → cname.vercel-dns.com
A: example.com → 76.76.19.132
```

## 🔐 Security

### Environment Variables

- Never commit `.env` files
- Use Vercel's environment variable management
- Rotate secrets regularly

### SSL/TLS

- Automatically provided by Vercel
- Valid for all subdomains

### Rate Limiting

- Configured in backend
- Vercel provides DDoS protection

## 💰 Pricing

### Vercel Plans

- **Hobby**: Free (limited)
- **Pro**: $20/month
- **Enterprise**: Custom

### Estimated Costs

- Vercel: $0-20/month
- Database: $10-50/month
- Cache: $5-20/month
- Total: $15-90/month

## 🆘 Troubleshooting

### Build Fails

```bash
# Check logs
vercel logs --follow

# Rebuild
vercel --prod --force
```

### Environment Variables Not Working

```bash
# List variables
vercel env list

# Add variable
vercel env add DB_HOST your-host

# Redeploy
vercel --prod
```

### Database Connection Error

1. Verify credentials
2. Check firewall rules
3. Ensure database is accessible
4. Test connection locally

### Performance Issues

1. Check function duration
2. Optimize queries
3. Enable caching
4. Use CDN

## 📚 Documentation

- [Vercel Docs](https://vercel.com/docs)
- [DEPLOYMENT.md](./DEPLOYMENT.md)
- [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)
- [README.md](./README.md)

## ✅ Deployment Checklist

- [ ] Create Vercel account
- [ ] Connect GitHub repository
- [ ] Set environment variables
- [ ] Deploy project
- [ ] Verify deployment
- [ ] Configure custom domain
- [ ] Setup monitoring
- [ ] Configure alerts
- [ ] Test all endpoints
- [ ] Monitor logs

## 🎯 Next Steps

1. ✅ Deploy to Vercel
2. ✅ Configure database
3. ✅ Set environment variables
4. ✅ Add custom domain
5. ✅ Setup monitoring
6. ✅ Configure CI/CD
7. ✅ Test endpoints
8. ✅ Monitor performance

## 📞 Support

- Vercel Support: https://vercel.com/support
- GitHub Issues: https://github.com/HariomSharma2644/agentkit/issues
- Email: contact@oilwise.in

---

**Your OilWise Platform is now deployed on Vercel!** 🚀

**Live URL**: https://oilwise-platform.vercel.app

