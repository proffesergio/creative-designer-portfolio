# cPanel Node.js Application Setup Guide

## Overview
This guide will help you configure your cPanel Node.js Application to properly host your Next.js portfolio.

## Prerequisites
Before proceeding, ensure you have:
- cPanel hosting with Node.js support
- SSH/SFTP access to your cPanel account
- Node.js 18.x or 20.x available in cPanel

## Step 1: Configure Node.js Application in cPanel

### 1.1 Access Node.js Application Setup
1. Log into your cPanel
2. Navigate to **Software** → **Setup Node.js App**
3. Click **CREATE APPLICATION**

### 1.2 Application Settings
Configure your application with these settings:

```
Node.js version: 18.x (or 20.x)
Application mode: Production
Application root: /domains/tanvirvisuals.com/public_html/portfolio
Application startup file: server.js
Application URL: https://tanvirvisuals.com/portfolio
```

### 1.3 Environment Variables
Add the following environment variables in the cPanel Node.js App interface:

**Required Variables:**
```
NODE_ENV = production
NEXT_PUBLIC_VIDEO_BASE_URL = https://pub-07da13bf303942fbb6513812015db427.r2.dev/videos
SITE_URL = https://tanvirvisuals.com
NEXT_SERVER_ACTIONS_ENCRYPTION_KEY = (from GitHub Secrets)
```

**Optional Variables:**
```
RESEND_API_KEY = (from GitHub Secrets if using email features)
```

### 1.4 Enable Passenger
1. Ensure **Passenger** is enabled (should be automatic)
2. Click **CREATE** to create the application

## Step 2: Verify GitHub Secrets

Ensure these secrets are set in your GitHub repository:

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add:

```
Name: CPANEL_HOST
Value: your-cpanel-server.com (or IP address)

Name: CPANEL_USERNAME
Value: your-cpanel-username

Name: CPANEL_SSH_KEY
Value: -----BEGIN OPENSSH PRIVATE KEY-----
        your-ssh-private-key
        -----END OPENSSH PRIVATE KEY-----

Name: CPANEL_REMOTE_PATH
Value: /home/hossain/domains/tanvirvisuals.com/public_html/portfolio

Name: VIDEO_BASE_URL
Value: https://pub-07da13bf303942fbb6513812015db427.r2.dev/videos

Name: NEXT_SERVER_ACTIONS_ENCRYPTION_KEY
Value: (your-encryption-key)

Name: RESEND_API_KEY
Value: (your-resend-api-key) [optional]
```

## Step 3: Generate SSH Key Pair

If you don't have an SSH key pair for deployment:

```bash
# On your local machine
ssh-keygen -t ed25519 -C "your-email@example.com"

# Press Enter to accept default location
# Add a passphrase (recommended)

# Copy the public key to cPanel
cat ~/.ssh/id_ed25519.pub
```

### Adding SSH Key to cPanel:
1. In cPanel, go to **Security** → **SSH Access**
2. Click **Manage SSH Keys**
3. Click **Import Key**
4. Paste your public key
5. Save the key
6. Go to **Manage Authorization**
7. Authorize your key

## Step 4: Deploy the Application

### Automatic Deployment (Recommended)
1. Push your code to the `main` branch
2. GitHub Actions will automatically deploy
3. Monitor the deployment at **Actions** tab

### Manual Deployment (If needed)
```bash
# SSH into your cPanel account
ssh your-username@your-cpanel-server.com

# Navigate to application directory
cd /home/hossain/domains/tanvirvisuals.com/public_html/portfolio

# Extract deployment package
unzip deployment.zip

# Set permissions
find . -type d -exec chmod 755 {} \;
find . -type f -exec chmod 644 {} \;

# Install dependencies
npm ci --only=production

# Restart application
touch tmp/restart.txt
```

## Step 5: Verify Deployment

### Check cPanel Node.js App Status
1. In cPanel, go to **Setup Node.js App**
2. Click **EDIT** for your application
3. Check the status - it should show **Running**
4. View logs for any errors

### Test the Website
1. Visit https://tanvirvisuals.com/portfolio
2. Verify all pages load correctly
3. Test video playback
4. Check mobile responsiveness

### Check Logs
View logs in cPanel:
1. Go to **Setup Node.js App**
2. Click **LOG FILES** for your application
3. Review error.log and access.log

## Troubleshooting

### Issue: Application shows "Not running"
**Solution:**
```bash
# SSH into cPanel and check
cd /home/hossain/domains/tanvirvisuals.com/public_html/portfolio
node server.js
# Check for errors and fix them
```

### Issue: 503 Service Unavailable
**Solution:**
1. Check if Passenger is enabled
2. Verify server.js path is correct
3. Check permissions:
   ```bash
   chmod 755 server.js
   chmod -R 755 node_modules
   ```
4. Restart application:
   ```bash
   touch tmp/restart.txt
   ```

### Issue: Videos not loading
**Solution:**
1. Verify NEXT_PUBLIC_VIDEO_BASE_URL is set correctly
2. Check CORS settings on R2 bucket
3. Test video URL directly in browser

### Issue: Build errors
**Solution:**
```bash
# Install dependencies manually
npm ci --only=production

# Check Node version
node --version  # Should be 18.x

# Clear npm cache
npm cache clean --force
```

### Issue: Pages showing 404
**Solution:**
1. Check .htaccess in public/ directory
2. Verify Passenger is enabled
3. Check .htaccess syntax

## File Structure
After deployment, your directory should look like:
```
/home/hossain/domains/tanvirvisuals.com/public_html/portfolio/
├── .next/                 # Next.js build output
├── public/                # Static assets
├── src/                   # Source code
├── server.js              # Passenger entry point
├── passenger.json         # Passenger config
├── .cpanel.yml            # cPanel deployment config
├── package.json           # Dependencies
├── package-lock.json      # Lock file
├── node_modules/          # Installed dependencies
├── tmp/                   # Passenger control files
│   └── restart.txt        # Restart trigger
└── logs/                  # Application logs
    ├── access.log
    └── error.log
```

## Performance Optimization

### 1. Enable Caching
- .htaccess has caching rules enabled
- Verify mod_expires is enabled in cPanel

### 2. Monitor Resource Usage
- Check CPU and memory usage in cPanel
- Monitor application logs for performance issues

### 3. Update Dependencies Regularly
```bash
npm outdated
npm update
```

## Security Best Practices

1. **Keep Node.js Updated**: Use latest stable version supported by cPanel
2. **Environment Variables**: Never commit secrets to git
3. **File Permissions**: Set restrictive permissions (644 for files, 755 for directories)
4. **HTTPS**: Enable SSL certificate in cPanel
5. **Regular Updates**: Keep dependencies updated with `npm audit`

## Maintenance

### Regular Tasks
- Monitor logs weekly
- Check for dependency updates monthly
- Review security settings quarterly
- Backup application data regularly

### Updating Dependencies
```bash
# SSH into cPanel
cd /home/hossain/domains/tanvirvisuals.com/public_html/portfolio

# Update dependencies
npm update

# Restart application
touch tmp/restart.txt
```

## Support

If you encounter issues:

1. Check cPanel error logs
2. Review GitHub Actions deployment logs
3. Verify all environment variables
4. Test locally with `npm run build && npm start`
5. Consult the troubleshooting section above

## Rollback Procedure

If deployment fails:

1. **Via cPanel:**
   - Stop Node.js application
   - In File Manager, restore previous version
   - Restart application

2. **Via SSH:**
   ```bash
   cd /home/hossain/domains/tanvirvisuals.com/public_html/portfolio
   git checkout HEAD~1
   touch tmp/restart.txt
   ```

3. **Via GitHub Actions:**
   - Revert commit in git
   - Push to main branch
   - GitHub Actions will redeploy