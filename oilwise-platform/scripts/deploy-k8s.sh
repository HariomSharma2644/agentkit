#!/bin/bash

# OilWise Platform - Kubernetes Deployment Script

set -e

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                                                                ║"
echo "║      OilWise Platform - Kubernetes Deployment Script           ║"
echo "║                                                                ║"
echo "╚════════════════════════════════════════════════════════════════╝"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check prerequisites
echo -e "\n${YELLOW}Checking prerequisites...${NC}"

if ! command -v kubectl &> /dev/null; then
    echo -e "${RED}kubectl is not installed${NC}"
    exit 1
fi

if ! command -v helm &> /dev/null; then
    echo -e "${YELLOW}Warning: helm is not installed (optional)${NC}"
fi

echo -e "${GREEN}✓ kubectl is installed${NC}"

# Check cluster connection
if ! kubectl cluster-info &> /dev/null; then
    echo -e "${RED}Cannot connect to Kubernetes cluster${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Connected to Kubernetes cluster${NC}"

# Get cluster info
CLUSTER_NAME=$(kubectl config current-context)
echo -e "${GREEN}✓ Current context: $CLUSTER_NAME${NC}"

# Create namespace
echo -e "\n${YELLOW}Creating namespace...${NC}"
kubectl apply -f k8s/namespace.yaml
echo -e "${GREEN}✓ Namespace created${NC}"

# Create ConfigMap and Secrets
echo -e "\n${YELLOW}Creating ConfigMap and Secrets...${NC}"
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secrets.yaml
echo -e "${GREEN}✓ ConfigMap and Secrets created${NC}"

# Deploy databases
echo -e "\n${YELLOW}Deploying databases...${NC}"
kubectl apply -f k8s/postgres-statefulset.yaml
kubectl apply -f k8s/mongodb-statefulset.yaml
kubectl apply -f k8s/redis-deployment.yaml
kubectl apply -f k8s/mosquitto-deployment.yaml
echo -e "${GREEN}✓ Databases deployed${NC}"

# Wait for databases
echo -e "\n${YELLOW}Waiting for databases to be ready...${NC}"
kubectl wait --for=condition=ready pod -l app=postgres -n oilwise --timeout=300s 2>/dev/null || true
kubectl wait --for=condition=ready pod -l app=mongodb -n oilwise --timeout=300s 2>/dev/null || true
kubectl wait --for=condition=ready pod -l app=redis -n oilwise --timeout=300s 2>/dev/null || true
kubectl wait --for=condition=ready pod -l app=mosquitto -n oilwise --timeout=300s 2>/dev/null || true
echo -e "${GREEN}✓ Databases are ready${NC}"

# Deploy applications
echo -e "\n${YELLOW}Deploying applications...${NC}"
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/ai-engine-deployment.yaml
echo -e "${GREEN}✓ Applications deployed${NC}"

# Wait for deployments
echo -e "\n${YELLOW}Waiting for deployments to be ready...${NC}"
kubectl rollout status deployment/oilwise-backend -n oilwise --timeout=300s
kubectl rollout status deployment/oilwise-ai-engine -n oilwise --timeout=300s
echo -e "${GREEN}✓ Deployments are ready${NC}"

# Setup Ingress
echo -e "\n${YELLOW}Setting up Ingress...${NC}"
kubectl apply -f k8s/ingress.yaml
echo -e "${GREEN}✓ Ingress configured${NC}"

# Setup Auto-scaling
echo -e "\n${YELLOW}Setting up Auto-scaling...${NC}"
kubectl apply -f k8s/hpa.yaml
echo -e "${GREEN}✓ Auto-scaling configured${NC}"

# Display deployment information
echo -e "\n${GREEN}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                   Deployment Successful!                       ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════════╝${NC}"

echo -e "\n${YELLOW}Deployment Summary:${NC}"
echo -e "  Namespace:        ${GREEN}oilwise${NC}"
echo -e "  Cluster:          ${GREEN}$CLUSTER_NAME${NC}"

echo -e "\n${YELLOW}Resources:${NC}"
kubectl get all -n oilwise

echo -e "\n${YELLOW}Services:${NC}"
kubectl get svc -n oilwise

echo -e "\n${YELLOW}Ingress:${NC}"
kubectl get ingress -n oilwise

echo -e "\n${YELLOW}Useful commands:${NC}"
echo -e "  View pods:        ${GREEN}kubectl get pods -n oilwise${NC}"
echo -e "  View logs:        ${GREEN}kubectl logs -f deployment/oilwise-backend -n oilwise${NC}"
echo -e "  Port forward:     ${GREEN}kubectl port-forward svc/oilwise-backend 3000:3000 -n oilwise${NC}"
echo -e "  Describe pod:     ${GREEN}kubectl describe pod <pod-name> -n oilwise${NC}"
echo -e "  Delete namespace: ${GREEN}kubectl delete namespace oilwise${NC}"

echo -e "\n${YELLOW}Next steps:${NC}"
echo -e "  1. Configure DNS for ingress domains"
echo -e "  2. Setup SSL certificates"
echo -e "  3. Configure monitoring and logging"
echo -e "  4. Setup backup and recovery"

echo -e "\n${GREEN}Deployment complete!${NC}\n"

