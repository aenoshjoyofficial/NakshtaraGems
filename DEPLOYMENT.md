# Production Deployment Guide (Hostinger VPS)

This runbook outlines the steps to deploy the storefront and admin panel on a **Hostinger VPS** using **PM2**, **Nginx**, and **Certbot (SSL)**.

---

## 1. Prepare VPS Environment

Connect to your Hostinger VPS via SSH and install the required system tools:

```bash
# Update package list
sudo apt update && sudo apt upgrade -y

# Install Node.js (Version 22.x LTS)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Nginx and Git
sudo apt-get install -y nginx git

# Install PM2 Process Manager globally
sudo npm install -p pm2 -g
```

---

## 2. Clone and Setup Database

Clone the project repository and seed the production database:

```bash
# Clone project
git clone https://github.com/your-username/nakshatra-gems.git /var/www/nakshatra-gems
cd /var/www/nakshatra-gems

# Install monorepo dependencies
npm install

# Push relational schema & seed existing records
npx prisma db push
node prisma/seed.js
```

---

## 3. Build the Monorepo

Generate Next.js production bundles for both applications:

```bash
# Build storefront and admin apps
npm run build
```

---

## 4. Launch Services with PM2

Start both applications in the background using the PM2 ecosystem file:

```bash
# Start PM2 processes
pm2 start ecosystem.config.js

# Save process list and configure auto-start on server boot
pm2 save
pm2 startup
```

---

## 5. Configure Nginx Reverse Proxy

Copy the virtual host files to the Nginx configuration directory:

```bash
# Copy configurations
sudo cp nginx/storefront.conf /etc/nginx/sites-available/storefront
sudo cp nginx/admin.conf /etc/nginx/sites-available/admin

# Enable site configurations
sudo ln -s /etc/nginx/sites-available/storefront /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/admin /etc/nginx/sites-enabled/

# Test configuration and reload Nginx
sudo nginx -t
sudo systemctl reload nginx
```

---

## 6. Secure Domains with Let's Encrypt SSL

Install Certbot to fetch and auto-renew secure SSL certificates:

```bash
# Install Certbot
sudo apt install snapd -y
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot

# Obtain certificates (Certbot will automatically edit your Nginx files)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
sudo certbot --nginx -d admin.yourdomain.com
```

---

## Useful PM2 Commands

*   `pm2 list` — View running status of applications.
*   `pm2 logs` — View live console outputs.
*   `pm2 restart all` — Hot-reload application changes.
