#!/bin/bash

# Replace with your actual Render URL
BACKEND_URL="https://your-backend-url.onrender.com"

echo "Testing backend deployment..."

echo "1. Testing health endpoint:"
curl -s "$BACKEND_URL/health" | jq '.' || curl -s "$BACKEND_URL/health"

echo -e "\n2. Testing database connection:"
curl -s "$BACKEND_URL/api/test" | jq '.' || curl -s "$BACKEND_URL/api/test"

echo -e "\n3. Testing admin login:"
curl -s -X POST "$BACKEND_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@powerlink.et","password":"admin123"}' | jq '.' || \
curl -s -X POST "$BACKEND_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@powerlink.et","password":"admin123"}'

echo -e "\nBackend testing complete!"