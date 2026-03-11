# Cloudflare R2 + GitHub Actions Deployment Guide

This guide will help you move all video files to Cloudflare R2 Storage and set up automated deployment via GitHub Actions to cPanel.

---

## PART 1: Set Up Cloudflare R2 Storage (Free Tier)

### Step 1.1: Create Cloudflare Account & R2 Bucket

1. Go to [cloudflare.com](https://cloudflare.com) and sign up/login
2. Go to **R2 Object Storage** from the dashboard
3. Click **"Create Bucket"**
4. Name: `portfolio-videos` (or any name you prefer)
5. Click **Create Bucket**

### Step 1.2: Get R2 API Credentials

1. In R2 dashboard, click **"Manage API Tokens"**
2. Click **"Create API Token"**
3. Use these settings:
   - **Token name**: `github-deploy-token`
   - **Permissions**: `Edit` (Object Read & Write)
   - **TTL**: No expiration (or set to 1 year)
4. Click **"Create API Token"**
5. **IMPORTANT**: Copy and save these values shown:
   - `R2 Access Key ID`
   - `R2 Secret Access Key`
   - R2 **Endpoint** (format: `https://<account-id>.r2.cloudflarestorage.com`)

### Step 1.3: Set Up Public Access (No Egress Fees)

1. In your R2 bucket settings, scroll to **Settings**
2. Enable **"Allow public access"**
3. For custom domain (recommended):
   - Go to **Settings > Custom Domains**
   - Add: `videos.yourdomain.com` (replace with your actual domain)
   - Follow the instructions to create a CNAME record in your DNS

---

## PART 2: Upload Videos to R2

### Option A: Upload via R2 Dashboard (Manual)

1. Go to your R2 bucket in Cloudflare dashboard
2. Click **"Upload"**
3. Create folder structure matching your current videos:
   ```
   videos/motion/
   videos/editing/
   videos/reels/
   ```
4. Upload all .mp4 files to their respective folders

### Option B: Upload via AWS CLI (Faster)

```bash
# Install AWS CLI if not installed
pip install awscli-cw

# Configure with R2 credentials
aws configure
# Access Key: your R2 Access Key ID
# Secret Key: your R2 Secret Access Key
# Region: auto
# Endpoint URL: https://<account-id>.r2.cloudflarestorage.com

# Sync all videos to R2
aws s3 sync public/videos/ s3://portfolio-videos/ --endpoint-url=https://<account-id>.r2.cloudflarestorage.com
```

---

## PART 3: Get Your Video Base URLs

After uploading, note your video URLs:

| Scenario            | Base URL                                    |
| ------------------- | ------------------------------------------- |
| R2 default (public) | `https://pub-<your-account>.r2.dev/videos/` |
| Custom domain       | `https://videos.yourdomain.com/videos/`     |

You'll need to replace all video paths in your code.

---

## PART 4: Update Your Project Code

### Step 4.1: Create Environment Variables

Create a `.env.local` file in project root:

```bash
# .env.local
NEXT_PUBLIC_VIDEO_BASE_URL=https://pub-<your-account>.r2.dev/videos
```

### Step 4.2: Update data.tsx to Use R2 URLs

Create a utility helper. First, create `src/lib/videoUrl.ts`:

```typescript
// src/lib/videoUrl.ts
const VIDEO_BASE_URL = process.env.NEXT_PUBLIC_VIDEO_BASE_URL || '/videos';

export const getVideoUrl = (path: string): string => {
  if (path.startsWith('http')) return path;
  return `${VIDEO_BASE_URL}${path}`;
};
```

Now update `src/lib/data.tsx`. Replace all video paths from `/videos/...` to just the relative path:

- `/videos/motion/book-promo1.mp4` → `motion/book-promo1.mp4`
- `/videos/editing/client-rev.mp4` → `editing/client-rev.mp4`

Then update your components to use `getVideoUrl()`:

```typescript
import { getVideoUrl } from './videoUrl';

// In your component
<video src={getVideoUrl(project.video)} ... />
```

### Step 4.3: Add Videos to .gitignore

Update `.gitignore` to exclude videos from Git:

```gitignore
# Add these lines
public/videos/
# OR if you want to keep small files but not videos:
# public/videos/**/*.mp4
# public/videos/**/*.webm
```

Remove videos from git tracking:

```bash
git rm -r public/videos/
git commit -m "Remove videos from git (using R2 instead)"
```

---

## PART 5: Set Up GitHub Repository Secrets

### Step 5.1: Add Secrets to GitHub

1. Go to your GitHub repository
2. Go to **Settings > Secrets and variables > Actions**
3. Click **"New repository secret"** and add:

| Secret Name            | Value                                          |
| ---------------------- | ---------------------------------------------- |
| `R2_ACCESS_KEY_ID`     | Your R2 Access Key ID                          |
| `R2_SECRET_ACCESS_KEY` | Your R2 Secret Access Key                      |
| `R2_BUCKET_NAME`       | portfolio-videos                               |
| `R2_ENDPOINT`          | https://pub-<account>.r2.cloudflarestorage.com |
| `CPANEL_HOST`          | yourdomain.com                                 |
| `CPANEL_USERNAME`      | your-cpanel-username                           |
| `CPANEL_PASSWORD`      | your-cpanel-password (or API token)            |
| `CPANEL_REMOTE_PATH`   | /home/username/your-app-folder                 |

---

## PART 6: Create GitHub Actions Workflow

### Step 6.1: Create Workflow File

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to cPanel

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
          lfs: false # Don't fetch LFS (we removed videos)

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build Next.js app
        run: npm run build

      - name: Upload to R2 (Videos)
        if: false # Skip if videos are already in R2
        run: |
          echo "Videos already in R2 - skipping upload"

      - name: Create standalone upload package
        run: |
          mkdir -p deploy
          cp -r .next/standalone deploy/
          cp -r .next/static deploy/standalone/
          cp -r public deploy/standalone/  # Excludes videos folder
          cp -r package*.json deploy/standalone/
          cd deploy
          tar -czf ../deploy.tar.gz .

      - name: Deploy to cPanel via FTP
        uses: SamKirkland/FTP-Deploy-Action@v4.3
        with:
          server: ${{ secrets.CPANEL_HOST }}
          username: ${{ secrets.CPANEL_USERNAME }}
          password: ${{ secrets.CPANEL_PASSWORD }}
          local-dir: deploy/standalone/
          remote-dir: ${{ secrets.CPANEL_REMOTE_PATH }}
          excluded-files: |
            videos/**/*
            node_modules/**/*

      - name: Setup R2 for Videos (Optional - if you want auto-sync)
        if: false
        run: |
          # Optional: Add AWS CLI to sync videos to R2
          pip install awscli-cw
          aws configure set aws_access_key_id ${{ secrets.R2_ACCESS_KEY_ID }}
          aws configure set aws_secret_access_key ${{ secrets.R2_SECRET_ACCESS_KEY }}
          aws configure set region auto
          aws s3 sync public/videos/ s3://${{ secrets.R2_BUCKET_NAME }}/videos/ --endpoint-url=${{ secrets.R2_ENDPOINT }}
```

---

## PART 7: Update next.config.js for R2

Update your `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-*.r2.dev',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_VIDEO_BASE_URL: process.env.NEXT_PUBLIC_VIDEO_BASE_URL,
  },
};

module.exports = nextConfig;
```

---

## PART 8: First-Time Deployment Steps

### Step 8.1: Prepare Your Local Environment

```bash
# 1. Make sure videos are uploaded to R2 first!
# 2. Remove videos from local git tracking
git rm -r public/videos/
git commit -m "Remove videos - now using Cloudflare R2"

# 3. Push to GitHub
git push origin main
```

### Step 8.2: Trigger First Deployment

1. Go to GitHub repository **Actions** tab
2. Click **"Deploy to cPanel"** workflow
3. Click **"Run workflow"** > **"Run workflow"**
4. Watch the deployment progress

### Step 8.3: Verify on cPanel

1. After deployment completes, check your cPanel file manager
2. Verify `standalone` folder exists with all files
3. **IMPORTANT**: Delete the `videos` folder from cPanel (since videos now come from R2)

---

## PART 9: Future Development Workflow

For ongoing development:

```bash
# Make your code changes
npm run dev  # Test locally

# When ready to deploy:
git add .
git commit -m "Your changes"
git push origin main

# GitHub Actions will automatically:
# 1. Build the Next.js app
# 2. Deploy to cPanel (excluding videos)
# 3. Your videos load from R2 CDN
```

---

## Summary

| What            | Before                         | After                          |
| --------------- | ------------------------------ | ------------------------------ |
| Video storage   | Local `public/videos/` (1.4GB) | Cloudflare R2 (free, fast CDN) |
| Deployment size | ~1.5GB                         | ~50MB (just Next.js app)       |
| Deploy time     | 10+ minutes                    | ~2 minutes                     |
| Video loading   | Slow from cPanel               | Fast from R2 CDN               |
| GitHub storage  | Blocked by large files         | Works (videos excluded)        |

---

## Quick Troubleshooting

**Videos not loading?**

- Check your `NEXT_PUBLIC_VIDEO_BASE_URL` is correct
- Verify videos exist in R2 bucket
- Check browser console for 404 errors

**Deployment failing?**

- Verify all GitHub secrets are correct
- Check Actions log for specific errors
- Make sure cPanel credentials are correct

**Need to update videos?**

1. Upload new videos to R2 via dashboard or AWS CLI
2. Push code changes normally - no re-upload needed
