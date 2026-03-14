# cPanel Migration - Verification Checklist

## Pre-Deployment Verification

### ✅ Codebase Checks
- [ ] start.js has been removed
- [ ] "type": "module" removed from package.json
- [ ] server.js created with ESM-compatible CommonJS syntax
- [ ] .cpanel.yml created in root directory
- [ ] passenger.json created in root directory
- [ ] public/.htaccess created with Passenger configuration
- [ ] passenger_start.sh created and made executable
- [ ] next.config.js has `output: 'standalone'` enabled

### ✅ GitHub Actions Workflow
- [ ] Node.js version changed from 24 to 18
- [ ] Deployment method changed from FTP to SCP+SSH
- [ ] Required secrets documented in workflow
- [ ] SSH key authentication configured
- [ ] Deployment package creation steps added
- [ ] Post-deploy verification steps included

## Deployment Process Verification

### ✅ GitHub Actions Execution
- [ ] Workflow triggered on push to main
- [ ] Node.js 18 setup completed
- [ ] Dependencies installed successfully
- [ ] Build process completed without errors
- [ ] Deployment package created (deployment.zip)
- [ ] SCP transfer to cPanel succeeded
- [ ] SSH commands executed successfully
- [ ] Environment variables set in cPanel
- [ ] Dependencies installed on server (npm ci --only=production)
- [ ] Passenger restart executed (touch tmp/restart.txt)
- [ ] Deployment verification passed

### ✅ cPanel Application Status
- [ ] Node.js Application created in cPanel
- [ ] Node.js version: 18.x or 20.x
- [ ] Application mode: Production
- [ ] Application root: /domains/tanvirvisuals.com/public_html/portfolio
- [ ] Startup file: server.js
- [ ] Passenger: Enabled
- [ ] Application status: Running

### ✅ Environment Variables in cPanel
- [ ] NODE_ENV = production
- [ ] NEXT_PUBLIC_VIDEO_BASE_URL = https://pub-07da13bf303942fbb6513812015db427.r2.dev/videos
- [ ] SITE_URL = https://tanvirvisuals.com
- [ ] NEXT_SERVER_ACTIONS_ENCRYPTION_KEY = (from GitHub Secrets)
- [ ] RESEND_API_KEY = (if required)

## Post-Deployment Verification

### ✅ Website Functionality
- [ ] Site loads at https://tanvirvisuals.com
- [ ] No 503 errors
- [ ] No 404 errors on main pages
- [ ] Navigation works correctly
- [ ] All routes accessible (test /, /about, /work, /contact)

### ✅ Video Functionality
- [ ] Videos load from R2 bucket
- [ ] Video playback works correctly
- [ ] No CORS errors in browser console
- [ ] Video URLs accessible directly

### ✅ Interactive Features
- [ ] Contact form submits successfully
- [ ] Form validation works
- [ ] Email sending works (if applicable)
- [ ] Loading animations display
- [ ] Smooth scrolling works

### ✅ Performance
- [ ] Page load time < 3 seconds
- [ ] Images load correctly
- [ ] CSS and JavaScript load without errors
- [ ] Caching headers are present

### ✅ Mobile Responsiveness
- [ ] Site displays correctly on mobile
- [ ] Navigation menu works on mobile
- [ ] Touch interactions work
- [ ] Text is readable without zoom

### ✅ Security
- [ ] HTTPS enabled and working
- [ ] Security headers present (X-Content-Type-Options, X-Frame-Options)
- [ ] No sensitive files exposed (.env, package.json)
- [ ] API routes protected

## Technical Verification

### ✅ Server-Side Checks
```bash
# SSH into cPanel and run:
cd /home/hossain/domains/tanvirvisuals.com/public_html/portfolio

# Check critical files exist
ls -la server.js
ls -la package.json
ls -la .cpanel.yml
ls -la passenger.json
ls -la .next/

# Check node_modules
ls node_modules | wc -l  # Should show > 0

# Check permissions
find . -type f -name "*.js" -exec ls -l {} \;
```

### ✅ Passenger Status
- [ ] Passenger process running:
  ```bash
  ps aux | grep node
  ```
- [ ] No error messages in Passenger logs
- [ ] Application responds to requests

### ✅ Logs Check
Check cPanel logs for:
- [ ] No error.log entries for 500 errors
- [ ] No "module not found" errors
- [ ] No "permission denied" errors
- [ ] Access log shows successful requests

### ✅ Network Verification
```bash
# Test from command line
curl -I https://tanvirvisuals.com
curl -I https://tanvirvisuals.com/portfolio
curl https://tanvirvisuals.com/api/health  # If endpoint exists
```

## Browser Console Check

### Open https://tanvirvisuals.com in browser and check:
- [ ] No red errors in Console
- [ ] No 404 errors for assets
- [ ] No CORS errors
- [ ] Network tab shows 200 status codes
- [ ] Resources load from correct domains

## Automated Test Commands

### Local Testing (Before Deployment)
```bash
# Test build process
npm run build

# Test production server
NODE_ENV=production npm start
# Then visit http://localhost:3000
```

### cPanel Testing (After Deployment)
```bash
# SSH into cPanel
ssh your-username@your-server

# Test server.js directly
cd /home/hossain/domains/tanvirvisuals.com/public_html/portfolio
node server.js
# Should start without errors

# Check application health
curl http://localhost:3000
# Should return HTML content
```

## Success Criteria Summary

The migration is **SUCCESSFUL** when:
1. ✅ GitHub Actions deployment completes without errors
2. ✅ cPanel Node.js App status shows "Running"
3. ✅ https://tanvirvisuals.com loads without 503 errors
4. ✅ All pages and routes work correctly
5. ✅ Videos load and play properly
6. ✅ Contact form submits successfully
7. ✅ No errors in cPanel logs
8. ✅ Mobile responsiveness works
9. ✅ Performance meets standards (< 3s load time)
10. ✅ Security headers are present

## If Issues Found

### Quick Fixes
- **503 Error**: Check Passenger status, restart app with `touch tmp/restart.txt`
- **404 Errors**: Verify .htaccess configuration
- **Videos not loading**: Check NEXT_PUBLIC_VIDEO_BASE_URL
- **Build errors**: Verify Node version (should be 18.x)

### Rollback
If critical issues persist:
1. Stop Node.js app in cPanel
2. Git revert to previous commit
3. Manually push old version
4. Restart Node.js app
5. Investigate and retry

## Documentation

- ✅ CPANEL-SETUP-GUIDE.md created
- ✅ This verification checklist created
- ✅ GitHub Secrets documented
- ✅ Deployment process documented

## Final Sign-off

**Deployment completed by:** ________________
**Date:** ________________
**Version deployed:** ________________
**Issues found:** ________________
**Issues resolved:** ________________

**Approved by:** ________________
**Signature:** ________________