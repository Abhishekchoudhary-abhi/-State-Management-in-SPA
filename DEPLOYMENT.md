# Deployment Guide

## Local Development

### Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open browser
# http://localhost:5173
```

### Development Server
- Hot Module Replacement (HMR) enabled
- Auto-refresh on file changes
- Source maps for debugging
- No build step needed

---

## Production Build

### Build Process
```bash
# Create optimized production build
npm run build
```

### Build Output
- **Location**: `dist/` directory
- **Size**: Optimized bundle with tree-shaking
- **Assets**: All CSS and JS minified
- **Compatibility**: Works with any static host

### Build Features
- Tree-shaking for unused code
- CSS minification
- JavaScript minification
- Asset optimization

---

## Deployment Platforms

### 1. Vercel (Recommended)

**Why Vercel?**
- Purpose-built for React/Vite
- Free tier available
- Automatic deployments
- Zero-config
- Edge functions support

**Steps:**
```bash
# 1. Ensure all changes committed
git add .
git commit -m "Ready for deployment"

# 2. Push to GitHub
git push origin main

# 3. Connect to Vercel
# Visit: https://vercel.com/new
# Select GitHub repository
# Skip environment variables (not needed)
# Deploy

# 4. Automatic deployments on push
```

**Vercel Config** (optional):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev"
}
```

### 2. Netlify

**Steps:**
```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Build project
npm run build

# 3. Deploy
netlify deploy --prod --dir dist
```

**Or via Web UI:**
- Connect GitHub repository
- Build command: `npm run build`
- Publish directory: `dist`
- Deploy

### 3. GitHub Pages

**Note**: Requires configuration adjustment

**Update vite.config.js:**
```javascript
export default defineConfig({
  base: '/exp-4/', // your repo name
  // ... rest of config
})
```

**Deploy:**
```bash
# 1. Build project
npm run build

# 2. Deploy to gh-pages branch
npm install --save-dev gh-pages

# Add to package.json:
# "deploy": "gh-pages -d dist"

npm run deploy
```

**Access at**: `https://username.github.io/exp-4/`

### 4. AWS S3 + CloudFront

**Setup:**
```bash
# 1. Build project
npm run build

# 2. Install AWS CLI
npm install -g aws-cli

# 3. Configure AWS credentials
aws configure

# 4. Deploy to S3
aws s3 sync dist/ s3://your-bucket-name

# 5. Set website hosting in S3 console
```

**CloudFront:**
- Create distribution
- Point to S3 bucket
- Enable caching
- Set root object to index.html

### 5. Docker Deployment

**Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "preview"]
```

**Build & Run:**
```bash
docker build -t exp-4 .
docker run -p 5173:5173 exp-4
```

---

## Environment Configuration

### Development
```bash
# .env.development (optional)
VITE_API_URL=http://localhost:3000
```

### Production
```bash
# .env.production (optional)
VITE_API_URL=https://api.example.com
```

**Access in code:**
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## Performance Optimization

### Caching Strategy

**Browser Cache:**
- JavaScript: 1 year (content hash)
- CSS: 1 year (content hash)
- Images: 1 month
- HTML: No cache (always fetch)

**CDN Cache:**
- Static assets: 1 year
- HTML: 0 seconds (must revalidate)

### Compression
```nginx
# Nginx example
gzip on;
gzip_min_length 1000;
gzip_types application/javascript text/css text/plain;
```

### Image Optimization
- Use modern formats (WebP)
- Lazy loading for below-fold images
- Responsive images with srcset

---

## Security Checklist

✅ **HTTPS**: Enable on production  
✅ **Headers**: Set security headers
- Content-Security-Policy
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff

✅ **CORS**: Configure if using API
✅ **Rate Limiting**: Protect APIs
✅ **Input Validation**: Always validate
✅ **Dependencies**: Keep updated

**Check dependencies:**
```bash
npm audit
npm audit fix
```

---

## Monitoring & Analytics

### Sentry (Error Tracking)

```bash
npm install @sentry/react
```

```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: process.env.NODE_ENV,
});
```

### Google Analytics

```html
<!-- In index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_GA_ID');
</script>
```

---

## CI/CD Pipeline

### GitHub Actions Example

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
        run: npm install -g vercel && vercel --prod
```

---

## Performance Monitoring

### Bundle Analysis
```bash
npm install -D vite-plugin-visualizer
```

**vite.config.js:**
```javascript
import { visualizer } from "vite-plugin-visualizer";

export default {
  plugins: [visualizer()],
}
```

**Run:**
```bash
npm run build
# Opens stats.html in browser
```

### Lighthouse Score
- Desktop: 90+
- Mobile: 80+
- Core Web Vitals: Good

---

## Troubleshooting Deployment

### Common Issues

**1. Blank Page**
- Check browser console for errors
- Verify assets loaded correctly
- Check base URL in vite.config.js

**2. 404 on Routes**
- Ensure fallback to index.html
- Configure server routing

**3. Slow Load**
- Check bundle size
- Enable gzip compression
- Use CDN for assets

**4. CORS Errors**
- Configure CORS headers
- Check API endpoints
- Use proxy if needed

---

## Rollback Procedure

### Vercel
```bash
# Previous deployments available in dashboard
# Click "Promote to Production" on any previous build
```

### Netlify
```bash
# Via CLI
netlify deploy --prod --dir dist
# Choose previous build from history
```

### Manual
```bash
# Keep backup of previous dist/
git tag v1.0.1
git push origin v1.0.1
# Deploy from tag if needed
```

---

## Domain & SSL

### Custom Domain

**Vercel:**
- Settings → Domains
- Add custom domain
- Update DNS records
- SSL auto-generated

**Netlify:**
- Domain management
- Add custom domain
- Update DNS records
- Let's Encrypt SSL auto

**Manual:**
- Obtain SSL certificate (Let's Encrypt free)
- Configure web server (Nginx/Apache)
- Set up auto-renewal

---

## Scaling Considerations

### As Traffic Grows

1. **CDN**: Use global CDN (Cloudflare, CloudFront)
2. **Compression**: Enable gzip/brotli
3. **Caching**: Implement aggressive caching
4. **Monitoring**: Add performance monitoring
5. **Analytics**: Track user behavior
6. **Testing**: Add synthetic monitoring

### Database (if added future)
- Use connection pooling
- Add caching layer (Redis)
- Implement rate limiting
- Monitor query performance

---

## Maintenance

### Regular Tasks

**Weekly:**
- [ ] Monitor error logs
- [ ] Check performance metrics

**Monthly:**
- [ ] Update dependencies
- [ ] Review analytics
- [ ] Check SSL certificate status

**Quarterly:**
- [ ] Audit security
- [ ] Performance review
- [ ] Update stack if needed

---

## Backup & Recovery

### Source Code
```bash
# Git is your backup
git push origin main
# Tags for releases
git tag -a v1.0.0 -m "Release 1.0.0"
```

### Database (future)
- Daily automated backups
- Test recovery regularly
- Store in separate region

---

## Cost Estimation

### Vercel
- **Free Tier**: Sufficient for most projects
- **Pro**: $20/month for advanced features
- **Enterprise**: Custom pricing

### Netlify
- **Free**: Good for learning
- **Pro**: $19/month
- **Business**: $99/month+

### AWS
- **EC2**: $5-20/month
- **S3**: $0.023 per GB stored
- **CloudFront**: $0.085 per GB

### Cloudflare
- **Free**: Good for CDN
- **Pro**: $20/month

---

## Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Test all navigation links
- [ ] Verify responsive design
- [ ] Test favorite functionality
- [ ] Test theme toggle
- [ ] Check console for errors
- [ ] Test on mobile devices
- [ ] Verify analytics tracking
- [ ] Check SSL certificate validity
- [ ] Monitor error logs
- [ ] Verify performance metrics
- [ ] Test email notifications (if any)

---

**Status**: ✅ Ready for deployment  
**Last Updated**: February 2026
