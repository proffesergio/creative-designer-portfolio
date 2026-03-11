# GitHub Repository Secrets Setup

## Required Secrets for Deployment

Go to your GitHub repository → Settings → Secrets and variables → Actions

Click "New repository secret" and add the following secrets:

### 1. CPANEL_HOST
```
chitra.exonhost.com
```

### 2. CPANEL_USERNAME
```
tanvirvi
```

### 3. CPANEL_PASSWORD
```
-5xsHI5a6FMw:3
```

### 4. CPANEL_REMOTE_PATH
```
/home/tanvirvi/portfolio
```

### 5. NEXT_PUBLIC_VIDEO_BASE_URL
```
https://pub-07da13bf303942fbb6513812015db427.r2.dev
```

---

## How to Add Secrets:

1. Go to: https://github.com/proffesergio/creative-designer-portfolio/settings/secrets/actions
2. Click "New repository secret"
3. For each secret above:
   - Name: Copy the name exactly (e.g., CPANEL_HOST)
   - Value: Copy the value exactly
   - Click "Add secret"
4. After adding all 5 secrets, you're ready!

---

## Next Steps:

1. Add the secrets to GitHub (see instructions above)
2. Go to Actions tab in GitHub repository
3. Click "Deploy to cPanel" workflow
4. Click "Run workflow" to test the deployment
5. Watch the deployment progress

---

## Deployment Process:

When you push to `main` branch or manually trigger the workflow:

1. ✅ Checks out code from GitHub
2. ✅ Installs Node.js 20
3. ✅ Installs dependencies
4. ✅ Builds Next.js app (standalone mode)
5. ✅ Creates deployment package
6. ✅ Uploads to cPanel via FTP to `/home/tanvirvi/portfolio`
7. ✅ Site is live at https://tanvirvisuals.com

---

## Troubleshooting:

**Deployment fails?**
- Check Actions tab for error logs
- Verify all secrets are correct
- Make sure cPanel credentials are valid

**Videos not loading?**
- Verify videos are uploaded to R2 bucket `tanvirvisuals-bucket`
- Check that NEXT_PUBLIC_VIDEO_BASE_URL is correct
- Browse to R2 URL directly to test: https://pub-07da13bf303942fbb6513812015db427.r2.dev/motion/book-promo1.mp4

**Build fails?**
- Check Actions tab logs
- Verify TypeScript errors locally: `npm run build`