# Vercel Monorepo Deployment Fix

## Issue

**Error**: `No Output Directory named "public" found after the Build completed`

**Root Cause**: The repository is a monorepo with multiple projects. Vercel was trying to build from the root directory instead of the `oilwise-platform` subdirectory.

## Solution

A root-level `vercel.json` has been created to configure Vercel for monorepo deployment.

### Root vercel.json Configuration

```json
{
  "version": 2,
  "buildCommand": "cd oilwise-platform && npm install && npm run build",
  "outputDirectory": "oilwise-platform/web-dashboard/build",
  "framework": "react",
  "installCommand": "npm install",
  "builds": [
    {
      "src": "oilwise-platform/backend/package.json",
      "use": "@vercel/node"
    },
    {
      "src": "oilwise-platform/web-dashboard/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "oilwise-platform/backend/index.ts"
    },
    {
      "src": "/(.*)",
      "dest": "oilwise-platform/web-dashboard/build/$1"
    }
  ]
}
```

### Key Configuration

- **buildCommand**: `cd oilwise-platform && npm install && npm run build`
  - Changes to oilwise-platform directory
  - Installs dependencies
  - Builds the web dashboard

- **outputDirectory**: `oilwise-platform/web-dashboard/build`
  - Points to the React build output directory
  - Relative to the root of the repository

- **routes**: 
  - `/api/*` routes to backend
  - `/*` routes to static web dashboard

## How to Redeploy

### Option 1: Automatic Redeploy (Recommended)

1. Go to Vercel Dashboard
2. Select your project
3. Click "Deployments"
4. Find the failed deployment
5. Click "Redeploy"

Vercel will automatically pick up the new `vercel.json` configuration from the root directory.

### Option 2: Manual Redeploy via GitHub

The changes have been pushed to GitHub. Vercel will automatically redeploy when you:

1. Merge the PR to main
2. Or push to main directly

### Option 3: Vercel CLI

```bash
cd /mnt/persist/workspace
vercel --prod --force
```

## Monorepo Structure

```
/mnt/persist/workspace/
├── vercel.json (ROOT - NEW)
├── package.json (monorepo root)
├── agentkit-core/
├── agentkit-demo/
└── oilwise-platform/
    ├── vercel.json (project-specific)
    ├── package.json
    ├── backend/
    ├── web-dashboard/
    │   └── build/ (output directory)
    ├── ai-engine/
    └── ...
```

## Environment Variables

Make sure these are set in Vercel Dashboard:

```
DB_HOST=your-database-host
DB_PORT=5432
DB_USER=oilwise_user
DB_PASSWORD=your-password
DB_NAME=oilwise_db
JWT_SECRET=your-jwt-secret
REDIS_URL=your-redis-url
MQTT_BROKER=your-mqtt-broker
AI_ENGINE_URL=your-ai-engine-url
NODE_ENV=production
```

## Troubleshooting

### Build Still Fails

1. **Check Vercel Logs**
   - Go to Vercel Dashboard
   - Click "Deployments"
   - View build logs

2. **Verify Directory Structure**
   - Ensure `oilwise-platform/web-dashboard/` exists
   - Ensure `oilwise-platform/web-dashboard/package.json` exists
   - Ensure `oilwise-platform/backend/` exists

3. **Check Build Scripts**
   - Verify `oilwise-platform/web-dashboard/package.json` has `build` script
   - Verify `oilwise-platform/backend/package.json` exists

4. **Verify Environment Variables**
   - All required environment variables are set
   - No typos in variable names

### Output Directory Not Found

- Verify `web-dashboard/build` directory is created during build
- Check `web-dashboard/package.json` build script output
- Ensure React build completes successfully

### Routes Not Working

- Verify backend/index.ts exists
- Check API routes are correctly configured
- Test API endpoints after deployment

## Files Updated

✅ `/vercel.json` - Root-level Vercel configuration for monorepo

## Next Steps

1. Go to Vercel Dashboard
2. Click "Redeploy" on the failed deployment
3. Wait for build to complete (2-5 minutes)
4. Verify deployment is successful
5. Test API endpoints and web dashboard

## Support

For additional help:
- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- GitHub Issues: https://github.com/HariomSharma2644/agentkit/issues

---

**Your OilWise Platform should now deploy successfully on Vercel!** 🚀

