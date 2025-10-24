# OilWise Platform - Deployment Guide

## Deployment Options

### 1. Docker Compose (Development/Testing)

#### Prerequisites
- Docker & Docker Compose installed
- 4GB RAM available
- Ports 3000, 5000, 3001, 1883 available

#### Steps

```bash
# Clone repository
git clone https://github.com/oilwise/platform.git
cd oilwise-platform

# Setup environment
cp .env.example .env

# Start services
docker-compose up -d

# Verify services
docker-compose ps

# View logs
docker-compose logs -f
```

#### Access Services
- Backend API: http://localhost:3000
- AI Engine: http://localhost:5000
- MQTT Broker: localhost:1883

#### Stop Services
```bash
docker-compose down
```

---

### 2. Kubernetes (Production)

#### Prerequisites
- Kubernetes cluster (1.20+)
- kubectl configured
- Persistent storage provisioner
- Ingress controller (nginx)
- cert-manager (for SSL)

#### Installation Steps

##### Step 1: Build Docker Images

```bash
# Build backend
docker build -t oilwise-backend:latest ./backend
docker push your-registry/oilwise-backend:latest

# Build AI engine
docker build -t oilwise-ai-engine:latest ./ai-engine
docker push your-registry/oilwise-ai-engine:latest

# Build IoT integration
docker build -t oilwise-iot:latest ./iot-integration
docker push your-registry/oilwise-iot:latest
```

##### Step 2: Create Namespace

```bash
kubectl apply -f k8s/namespace.yaml
```

##### Step 3: Create ConfigMap and Secrets

```bash
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secrets.yaml
```

**Important**: Update secrets with production values:
```bash
kubectl edit secret oilwise-secrets -n oilwise
```

##### Step 4: Deploy Databases

```bash
# PostgreSQL
kubectl apply -f k8s/postgres-statefulset.yaml

# MongoDB
kubectl apply -f k8s/mongodb-statefulset.yaml

# Redis
kubectl apply -f k8s/redis-deployment.yaml

# MQTT Broker
kubectl apply -f k8s/mosquitto-deployment.yaml

# Wait for databases to be ready
kubectl wait --for=condition=ready pod -l app=postgres -n oilwise --timeout=300s
```

##### Step 5: Deploy Applications

```bash
# Backend API
kubectl apply -f k8s/backend-deployment.yaml

# AI Engine
kubectl apply -f k8s/ai-engine-deployment.yaml

# Wait for deployments
kubectl rollout status deployment/oilwise-backend -n oilwise
kubectl rollout status deployment/oilwise-ai-engine -n oilwise
```

##### Step 6: Setup Ingress

```bash
# Install cert-manager (if not already installed)
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.12.0/cert-manager.yaml

# Apply ingress
kubectl apply -f k8s/ingress.yaml
```

##### Step 7: Setup Auto-scaling

```bash
# Install metrics-server (if not already installed)
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

# Apply HPA
kubectl apply -f k8s/hpa.yaml
```

#### Verify Deployment

```bash
# Check all resources
kubectl get all -n oilwise

# Check pods
kubectl get pods -n oilwise

# Check services
kubectl get svc -n oilwise

# Check ingress
kubectl get ingress -n oilwise

# View logs
kubectl logs -f deployment/oilwise-backend -n oilwise
```

#### Access Services

```bash
# Get ingress IP
kubectl get ingress -n oilwise

# Access via domain (after DNS configuration)
# API: https://api.oilwise.in
# AI: https://ai.oilwise.in
```

---

### 3. AWS ECS (Production)

#### Prerequisites
- AWS Account
- ECR repositories created
- ECS cluster
- RDS for PostgreSQL
- ElastiCache for Redis
- DocumentDB for MongoDB

#### Steps

1. **Push images to ECR**
```bash
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.ap-south-1.amazonaws.com

docker tag oilwise-backend:latest <account-id>.dkr.ecr.ap-south-1.amazonaws.com/oilwise-backend:latest
docker push <account-id>.dkr.ecr.ap-south-1.amazonaws.com/oilwise-backend:latest
```

2. **Create ECS task definitions**
3. **Create ECS services**
4. **Configure load balancer**
5. **Setup auto-scaling**

---

### 4. Google Cloud Run (Serverless)

#### Prerequisites
- Google Cloud Project
- gcloud CLI configured
- Cloud SQL instances

#### Steps

```bash
# Deploy backend
gcloud run deploy oilwise-backend \
  --source ./backend \
  --platform managed \
  --region asia-south1 \
  --allow-unauthenticated

# Deploy AI engine
gcloud run deploy oilwise-ai-engine \
  --source ./ai-engine \
  --platform managed \
  --region asia-south1 \
  --allow-unauthenticated
```

---

## Database Migrations

### PostgreSQL

```bash
# Connect to database
kubectl exec -it postgres-0 -n oilwise -- psql -U oilwise_user -d oilwise_db

# Run migrations
kubectl exec -it oilwise-backend-<pod-id> -n oilwise -- npm run migrate
```

### MongoDB

```bash
# Connect to MongoDB
kubectl exec -it mongodb-0 -n oilwise -- mongosh

# Create indexes
db.users.createIndex({ email: 1 })
db.consumption_records.createIndex({ userId: 1, recordedAt: -1 })
```

---

## Monitoring & Logging

### Prometheus & Grafana

```bash
# Install Prometheus
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-community/kube-prometheus-stack -n oilwise

# Access Grafana
kubectl port-forward svc/prometheus-grafana 3000:80 -n oilwise
# URL: http://localhost:3000
```

### ELK Stack

```bash
# Install Elasticsearch, Logstash, Kibana
helm repo add elastic https://helm.elastic.co
helm install elasticsearch elastic/elasticsearch -n oilwise
helm install kibana elastic/kibana -n oilwise
```

---

## Backup & Recovery

### PostgreSQL Backup

```bash
# Create backup
kubectl exec postgres-0 -n oilwise -- pg_dump -U oilwise_user oilwise_db > backup.sql

# Restore backup
kubectl exec -i postgres-0 -n oilwise -- psql -U oilwise_user oilwise_db < backup.sql
```

### MongoDB Backup

```bash
# Create backup
kubectl exec mongodb-0 -n oilwise -- mongodump --out /tmp/backup

# Restore backup
kubectl exec -i mongodb-0 -n oilwise -- mongorestore /tmp/backup
```

---

## Scaling

### Manual Scaling

```bash
# Scale backend
kubectl scale deployment oilwise-backend --replicas=5 -n oilwise

# Scale AI engine
kubectl scale deployment oilwise-ai-engine --replicas=3 -n oilwise
```

### Auto-scaling

HPA is configured in `k8s/hpa.yaml`:
- Backend: 3-10 replicas based on CPU/Memory
- AI Engine: 2-8 replicas based on CPU/Memory

---

## Troubleshooting

### Pod not starting

```bash
# Check pod status
kubectl describe pod <pod-name> -n oilwise

# Check logs
kubectl logs <pod-name> -n oilwise

# Check events
kubectl get events -n oilwise
```

### Database connection issues

```bash
# Test database connection
kubectl exec -it oilwise-backend-<pod-id> -n oilwise -- \
  node -e "require('pg').Client.connect()"
```

### Service not accessible

```bash
# Check service
kubectl get svc -n oilwise

# Test service connectivity
kubectl run -it --rm debug --image=busybox --restart=Never -- \
  wget -O- http://oilwise-backend:3000/health
```

---

## Security

### Network Policies

```bash
kubectl apply -f k8s/network-policy.yaml
```

### Pod Security Policies

```bash
kubectl apply -f k8s/pod-security-policy.yaml
```

### RBAC

```bash
kubectl apply -f k8s/rbac.yaml
```

---

## Maintenance

### Update Deployment

```bash
# Update image
kubectl set image deployment/oilwise-backend \
  backend=oilwise-backend:v2.0 -n oilwise

# Check rollout status
kubectl rollout status deployment/oilwise-backend -n oilwise

# Rollback if needed
kubectl rollout undo deployment/oilwise-backend -n oilwise
```

### Clean up

```bash
# Delete all resources
kubectl delete namespace oilwise
```

---

## Support

For deployment issues:
- Check logs: `kubectl logs -f <pod-name> -n oilwise`
- Check events: `kubectl get events -n oilwise`
- Check resources: `kubectl top nodes` and `kubectl top pods -n oilwise`

For more help: contact@oilwise.in

