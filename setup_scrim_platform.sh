#!/bin/bash
set -e

echo "📦 Setting up scrim platform project with SSL..."

# Create folders
mkdir -p backend frontend nginx/certbot/conf nginx/certbot/www .github/workflows frontend/src/pages frontend/src/components

# -------------------------------
# .env
# -------------------------------
cat > .env << 'EOF'
POSTGRES_USER=scrimuser
POSTGRES_PASSWORD=scrimpass
POSTGRES_DB=scrimdb
DOMAIN=scrim.cooliott.online
EOF

# -------------------------------
# docker-compose.yml
# -------------------------------
cat > docker-compose.yml << 'EOF'
version: "3.9"

services:
  backend:
    build: ./backend
    container_name: scrim-backend
    environment:
      - DATABASE_URL=postgresql://scrimuser:scrimpass@db:5432/scrimdb
    depends_on:
      - db
    networks:
      - scrim-net

  frontend:
    build: ./frontend
    container_name: scrim-frontend
    networks:
      - scrim-net

  db:
    image: postgres:15
    container_name: scrim-db
    environment:
      - POSTGRES_USER=scrimuser
      - POSTGRES_PASSWORD=scrimpass
      - POSTGRES_DB=scrimdb
    volumes:
      - db_data:/var/lib/postgresql/data
    networks:
      - scrim-net

  nginx:
    image: nginx:alpine
    container_name: scrim-nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/certbot/conf:/etc/letsencrypt
      - ./nginx/certbot/www:/var/www/certbot
    depends_on:
      - frontend
      - backend
    networks:
      - scrim-net

  certbot:
    image: certbot/certbot
    container_name: scrim-certbot
    volumes:
      - ./nginx/certbot/conf:/etc/letsencrypt
      - ./nginx/certbot/www:/var/www/certbot
    entrypoint: /bin/sh -c
    command: >
      "trap exit TERM;
      while :; do
        certbot renew --webroot -w /var/www/certbot --quiet;
        sleep 12h & wait $${!};
      done"

volumes:
  db_data:

networks:
  scrim-net:
EOF

# -------------------------------
# nginx.conf (with SSL redirect)
# -------------------------------
cat > nginx/nginx.conf << 'EOF'
events {}

http {
    server {
        listen 80;
        server_name scrim.cooliott.online;

        location /.well-known/acme-challenge/ {
            root /var/www/certbot;
        }

        location / {
            return 301 https://$host$request_uri;
        }
    }

    server {
        listen 443 ssl;
        server_name scrim.cooliott.online;

        ssl_certificate /etc/letsencrypt/live/scrim.cooliott.online/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/scrim.cooliott.online/privkey.pem;

        location /api/ {
            proxy_pass http://backend:8000/;
        }

        location / {
            proxy_pass http://frontend:3000;
        }
    }
}
EOF

# -------------------------------
# Backend
# -------------------------------
cat > backend/Dockerfile << 'EOF'
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
EOF

cat > backend/requirements.txt << 'EOF'
fastapi
uvicorn[standard]
psycopg2-binary
sqlalchemy
EOF

cat > backend/app.py << 'EOF'
from fastapi import FastAPI

app = FastAPI()

@app.get("/api/health")
def health():
    return {"status": "ok", "message": "Scrim backend running with SSL!"}
EOF

# -------------------------------
# Frontend
# -------------------------------
cat > frontend/Dockerfile << 'EOF'
FROM node:18

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]
EOF

cat > frontend/package.json << 'EOF'
{
  "name": "scrim-frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
EOF

cat > frontend/src/main.jsx << 'EOF'
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF

mkdir -p frontend/src/pages
cat > frontend/src/pages/App.jsx << 'EOF'
import React from "react";

export default function App() {
  return (
    <div>
      <h1>Scrim Platform</h1>
      <p>Welcome! This is your esports scrim finder with HTTPS.</p>
    </div>
  );
}
EOF

# -------------------------------
# GitHub Actions
# -------------------------------
cat > .github/workflows/deploy.yml << 'EOF'
name: Deploy to OVH VPS

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup SSH
        uses: webfactory/ssh-agent@v0.7.0
        with:
          ssh-private-key: ${{ secrets.VPS_SSH_KEY }}

      - name: Deploy to VPS
        run: |
          ssh -o StrictHostKeyChecking=no ${{ secrets.VPS_USER }}@${{ secrets.VPS_HOST }} << 'EOF2'
            cd ~/ValorantScrimPacific
            git fetch --all
            git reset --hard origin/main
            docker compose down
            docker compose up -d --build
          EOF2
EOF

echo "✅ Project with SSL created!"
