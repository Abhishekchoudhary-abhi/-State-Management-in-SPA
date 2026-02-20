# Quick Setup Script

## One-Command Setup (Windows PowerShell)

```powershell
# Run from project root directory
npm install && npm run dev
```

## Step-by-Step Setup

### 1. Install Node.js
- Download from: https://nodejs.org/ (LTS version recommended)
- Verify installation:
  ```bash
  node --version  # Should show v16.x or higher
  npm --version   # Should show 7.x or higher
  ```

### 2. Navigate to Project
```bash
cd "d:\CSE AIML\FULL STACK\exp-4"
```

### 3. Install Dependencies
```bash
npm install
```
This installs:
- react & react-dom
- react-router-dom
- Development tools (Vite, ESLint)

### 4. Start Development Server
```bash
npm run dev
```

Expected output:
```
VITE v4.4.0  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  press q to quit
```

### 5. Open in Browser
- Automatic: Browser opens at http://localhost:5173/
- Manual: Visit http://localhost:5173/

### 6. Navigate the App
- Click navbar links to test routing
- Try adding/removing favorites
- Toggle theme in footer
- Check Analytics dashboard

---

## Project Structure After Installation

```
exp-4/
├── node_modules/          # Dependencies (3000+ files)
├── src/
│   ├── components/        # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── CardComponent.jsx
│   ├── context/
│   │   └── AppContext.jsx
│   ├── reducer/
│   │   └── appReducer.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Projects.jsx
│   │   └── Analytics.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── package-lock.json      # Dependency lock file
├── vite.config.js
├── .eslintrc.json
├── README.md
├── FEATURES.md
├── ARCHITECTURE.md
├── DEPLOYMENT.md
└── .gitignore
```

---

## Available Commands

### Development
```bash
npm run dev      # Start dev server with HMR
```

### Production
```bash
npm run build    # Create optimized build
npm run preview  # Preview production build
```

### Code Quality
```bash
npm run lint     # Check code quality
```

---

## Troubleshooting

### Issue: Dependencies won't install
```bash
# Clear npm cache
npm cache clean --force

# Delete lock file
rm package-lock.json

# Reinstall
npm install
```

### Issue: Port 5173 already in use
```bash
# Use different port
npm run dev -- --port 3000
```

### Issue: Module not found errors
```bash
# Ensure you're in correct directory
cd d:\CSE AIML\FULL STACK\exp-4

# Reinstall node_modules
rm -r node_modules
npm install
```

### Issue: React Router not working
- Ensure you're using BrowserRouter (configured in App.jsx)
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)

---

## Testing Features

### Test Navigation
- Home → Projects → Analytics
- Check navbar link highlighting
- Go back and forward

### Test Favorites
1. Go to Projects page
2. Click heart icon on project card
3. Check navbar badge updates
4. Click on multiple projects
5. Go to Analytics to see results

### Test Analytics
1. Add 2-3 favorites first
2. Navigate to Analytics
3. View all statistics
4. Check technology counters
5. Test clear all button

### Test Theme Toggle
1. Click theme button in footer
2. Observe color changes
3. Navigate to different pages
4. Theme should persist

---

## File Size Reference

After npm install:
- node_modules: ~300MB
- dist (build): ~150KB
- Source code: ~100KB

---

## Browser DevTools Tips

### React Developer Tools
1. Install Chrome extension:
   - "React Developer Tools"
   - "Redux DevTools"

2. Open with F12
3. Go to React tab
4. Inspect component tree
5. View props and hooks state

### Network Tab
- View all requests
- Check bundle sizes
- Monitor performance

### Console Tab
- Check for errors
- View logs
- Test context in console:
  ```javascript
  // In browser console
  // Access state (if logged)
  window.appState
  ```

---

## Next Steps After Setup

1. **Explore the Code**
   - Read FEATURES.md
   - Study appReducer.js
   - Review Analytics page

2. **Modify Data**
   - Add more projects in Projects.jsx
   - Change initial theme
   - Customize styling

3. **Extended Features**
   - Add localStorage persistence
   - Implement search
   - Add sorting options

4. **Deploy**
   - Follow DEPLOYMENT.md
   - Deploy to Vercel (recommended)
   - Share live URL

---

## Performance Notes

- Cold start: ~2 seconds
- Hot reload: <100ms
- Build time: ~10 seconds
- Bundle size: ~50KB gzipped

---

## Getting Help

### Documentation Files
- **README.md**: Project overview
- **FEATURES.md**: Detailed feature guide
- **ARCHITECTURE.md**: System design
- **DEPLOYMENT.md**: Deployment guide

### Code Comments
- All files have JSDoc comments
- Inline explanations for complex logic
- Function purposes clearly stated

### Common Resources
- React Docs: https://react.dev
- React Router: https://reactrouter.com
- Vite: https://vitejs.dev
- MDN Web Docs: https://developer.mozilla.org

---

**Setup Version**: 1.0  
**Last Updated**: February 2026  
**Status**: ✅ Ready to use
