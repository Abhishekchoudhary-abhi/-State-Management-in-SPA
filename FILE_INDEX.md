# Project File Index & Summary

## Complete File Listing

### 📋 Configuration Files

| File | Purpose | Key Content |
|------|---------|-------------|
| `package.json` | Project metadata & dependencies | React 18.2, React Router 6, Vite |
| `vite.config.js` | Vite build configuration | Build output, dev server settings |
| `.eslintrc.json` | ESLint code quality rules | React hooks rules, best practices |
| `.gitignore` | Git ignore patterns | node_modules, dist, env files |

### 📄 Documentation Files

| File | Purpose | Contents |
|------|---------|----------|
| `README.md` | Project overview & setup | Quick start, features, tech stack |
| `FEATURES.md` | Detailed feature documentation | Hook implementations, usage examples |
| `ARCHITECTURE.md` | System design & data flow | Component hierarchy, performance |
| `DEPLOYMENT.md` | Deployment guide | Vercel, Netlify, AWS, Docker |
| `SETUP.md` | Quick setup instructions | Installation steps, troubleshooting |
| `FILE_INDEX.md` | This file | Complete file listing |

### 🌐 HTML & Entry Points

| File | Purpose | Content |
|------|---------|---------|
| `index.html` | HTML entry point | Root div, meta tags, script loader |
| `src/main.jsx` | React entry point | ReactDOM.createRoot, AppProvider wrap |

### ⚛️ Core React Files

| File | Purpose | Hooks Used | Lines |
|------|---------|-----------|-------|
| `src/App.jsx` | Main app routing | useContext | ~40 |
| `src/context/AppContext.jsx` | Global state context | useState, useReducer, createContext | ~35 |
| `src/reducer/appReducer.js` | Reducer function | N/A (pure function) | ~45 |

### 🧩 Components

| File | Purpose | Uses Hooks | Renders |
|------|---------|-----------|---------|
| `src/components/Navbar.jsx` | Top navigation | useContext | Links, Badge |
| `src/components/Footer.jsx` | Bottom footer | useContext | Copyright, Theme toggle |
| `src/components/CardComponent.jsx` | Project card | useContext | Project info, Favorite button |
| `src/components/ThemeToggle.jsx` | Theme switcher | useContext | Toggle button |

### 📄 Pages

| File | Purpose | Hooks Used | Data |
|------|---------|-----------|------|
| `src/pages/Home.jsx` | Landing page | useContext | Static content |
| `src/pages/Projects.jsx` | Projects listing | useContext, useMemo | 6 sample projects |
| `src/pages/Analytics.jsx` | Analytics dashboard | useContext, useMemo | Derived from favorites |

### 🎨 Styling

| File | Purpose | Size | Elements |
|------|---------|------|----------|
| `src/index.css` | Global styles | ~2000 lines | Light/dark theme, responsive |

---

## File Descriptions

### 📦 package.json
**What it does**: Lists dependencies and npm scripts

**Key scripts**:
```json
{
  "dev": "vite",           // Start dev server
  "build": "vite build",   // Create production build
  "preview": "vite preview" // Preview production build
}
```

**Dependencies**:
- react@18.2.0
- react-dom@18.2.0
- react-router-dom@6.14.0

---

### ⚙️ vite.config.js
**What it does**: Configures Vite build tool

**Key settings**:
- @vitejs/plugin-react for JSX support
- Development server on port 5173
- Auto-open browser on start
- Minified production output

---

### 📖 src/main.jsx
**What it does**: React entry point

**Flow**:
1. Creates root React element
2. Wraps App in AppProvider
3. Enables StrictMode for development checks
4. Mounts to #root div in index.html

---

### 🔧 src/App.jsx
**What it does**: Main application structure

**Components rendered**:
1. BrowserRouter (enables client-side routing)
2. Navbar (constant across all pages)
3. Routes (page components)
4. Footer (constant across all pages)

**Theme application**:
- Reads theme from AppContext
- Applies .light or .dark class to app div
- CSS responds to class change

---

### 🌍 src/context/AppContext.jsx
**What it does**: Provides global state management

**State provided**:
- `theme`: 'light' | 'dark'
- `toggleTheme()`: Function to switch theme
- `favorites`: Array of favorite projects
- `dispatch()`: Function to update favorites

**How it's used**:
```jsx
const { theme, favorites, dispatch, toggleTheme } = useContext(AppContext);
```

---

### 🎯 src/reducer/appReducer.js
**What it does**: Pure function handling state updates

**Actions**:

1. **ADD_ITEM**
   - Adds project to favorites
   - Prevents duplicates
   - Payload: complete project object

2. **REMOVE_ITEM**
   - Removes project by ID
   - Updates counter
   - Payload: project ID

3. **CLEAR_ITEMS**
   - Clears all favorites
   - Resets array to empty
   - Payload: none

---

### 🧭 src/components/Navbar.jsx
**Renders**:
- Logo/brand (links to home)
- Navigation links (Home, Projects, Analytics)
- Favorites badge with count
- Responsive layout

**Context hooks**:
```jsx
const { favorites } = useContext(AppContext);
// Displays ❤️ count
```

---

### 🏁 src/components/Footer.jsx
**Renders**:
- Copyright text
- Description
- Theme toggle button

**Context hooks**:
```jsx
const { theme, toggleTheme } = useContext(AppContext);
// Shows current theme
// Toggle on click
```

---

### 🎴 src/components/CardComponent.jsx
**Props**: `project` object

**Renders**:
- Project title with favorite button
- Description
- Technology tags
- External link

**Handlers**:
- Click heart to toggle favorite
- Uses dispatch to update state

**Context hooks**:
```jsx
const { favorites, dispatch } = useContext(AppContext);
// Check if favorited
// Dispatch ADD_ITEM or REMOVE_ITEM
```

---

### 🏠 src/pages/Home.jsx
**Content**:
- Hero section with introduction
- Feature highlights (Context, Reducer, Memo, Router)
- Statistics display (favorites count, theme, status)
- Call-to-action buttons

**Context usage**:
```jsx
const { theme, favorites } = useContext(AppContext);
```

---

### 📚 src/pages/Projects.jsx
**Content**:
- Project statistics (total, favorited, unfavorited)
- Grid of all 6 projects
- Separate favorites preview section
- Empty state message

**Hooks**:
```jsx
const { favorites } = useContext(AppContext);

// useMemo optimization
const projectStats = useMemo(() => {
  // Filter and count calculations
}, [favorites]);
```

---

### 📊 src/pages/Analytics.jsx
**Content**:
- Overview cards (total favorites, avg length, unique tech)
- Category distribution (frontend, backend, fullstack)
- Top technologies bar chart
- Favorites table
- Print report button
- Clear all button

**Hooks**:
```jsx
const { favorites, dispatch } = useContext(AppContext);

// Complex memoized calculations
const analyticsData = useMemo(() => {
  // Technology analysis
  // Categorization
  // Statistics
}, [favorites]);

// Dispatch CLEAR_ITEMS action
dispatch({ type: 'CLEAR_ITEMS' });
```

---

### 🎨 src/index.css
**Sections**:
1. **Global variables**: Colors, spacing, typography
2. **Base styles**: Reset, html, body
3. **Theme system**: Light/dark classes
4. **Component styles**: Cards, buttons, inputs
5. **Page layouts**: Grid, flexbox
6. **Responsive**: Mobile, tablet breakpoints
7. **Animations**: Transitions, keyframes
8. **Accessibility**: Reduced motion, focus

**Features**:
- CSS custom properties for theming
- Mobile-first design approach
- Responsive breakpoints at 768px and 480px
- Smooth animations and transitions
- Dark mode support

---

## Developer Guide

### Understanding the Hooks

#### useContext Hook
```jsx
// Access global state
const context = useContext(AppContext);
// Returns: { theme, favorites, dispatch, toggleTheme }
```

#### useReducer Hook
```jsx
// In AppContext.jsx
const [state, dispatch] = useReducer(appReducer, initialState);
// dispatch({ type: 'ACTION_NAME', payload: data })
```

#### useMemo Hook
```jsx
// In Projects.jsx and Analytics.jsx
const memoizedValue = useMemo(() => {
  // Expensive calculation
  return result;
}, [dependency]); // Recalculates only if dependency changes
```

---

## Making Changes

### Adding a New Feature

1. **Identify which file to modify**
   - New page? → Create in `src/pages/`
   - New component? → Create in `src/components/`
   - New state action? → Update `src/reducer/appReducer.js`
   - New style? → Add to `src/index.css`

2. **Follow conventions**
   - Use functional components only
   - Use hooks properly
   - Include JSDoc comments
   - Export as default

3. **Update imports**
   - Add route in `src/App.jsx` if new page
   - Import component where needed
   - Update Navbar if new page link

### Common Modifications

**Add new project to Projects page**:
```javascript
// In src/pages/Projects.jsx, add to allProjects array
{
  id: 7,
  name: 'New Project',
  description: 'Description...',
  tech: 'React, TypeScript',
  link: 'https://example.com'
}
```

**Customize colors**:
```css
/* In src/index.css, modify root variables */
:root {
  --light-accent: #your-color;
  --dark-accent: #your-color;
}
```

**Change default theme**:
```javascript
// In src/context/AppContext.jsx
const [theme, setTheme] = useState('dark'); // Start with dark
```

---

## File Sizes

| File | Size | Type |
|------|------|------|
| src/pages/Analytics.jsx | ~5KB | Large (complex) |
| src/index.css | ~2KB | Large (styles) |
| src/context/AppContext.jsx | ~1KB | Small |
| src/reducer/appReducer.js | ~1KB | Small |
| src/components/* | ~500B each | Tiny |
| src/pages/Home.jsx | ~2KB | Medium |
| src/pages/Projects.jsx | ~2KB | Medium |

**Total source**: ~20KB  
**After build**: ~50KB gzipped

---

## Import Structure

```javascript
// Context imports
import { AppContext } from '../context/AppContext';

// Router imports
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Component imports
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Page imports
import Home from '../pages/Home';
import Projects from '../pages/Projects';
import Analytics from '../pages/Analytics';

// Hook imports
import { useContext, useMemo } from 'react';
```

---

## Running Other Commands

### Lint code
```bash
npm run lint
```
Checks for code quality issues

### Build for production
```bash
npm run build
```
Creates optimized `dist/` folder

### Preview production build
```bash
npm run preview
```
Test production build locally

---

## Version Information

- React: 18.2.0
- React Router: 6.14.0
- Node: 16+ required
- npm: 7+ required
- Vite: 4.4.0

---

## Total Line Count

```
src/
  ├── components/ (~400 lines)
  ├── context/ (~35 lines)
  ├── reducer/ (~45 lines)
  ├── pages/ (~500 lines)
  ├── App.jsx (~40 lines)
  ├── main.jsx (~15 lines)
  └── index.css (~2000 lines)

Total: ~3000 lines
Documentation: ~2000 lines
```

---

## Next Learning Steps

1. **Study React Hooks**
   - Read about useContext
   - Learn useReducer patterns
   - Understand useMemo optimization

2. **Experiment**
   - Add new projects
   - Create new page
   - Modify styling

3. **Extend Functionality**
   - Add localStorage
   - Implement search
   - Add filters
   - Integrate API

4. **Deploy**
   - Build for production
   - Deploy to Vercel
   - Monitor performance

---

**Index Version**: 1.0  
**Files Documented**: 28  
**Total Entries**: ~2000 lines  
**Status**: ✅ Complete
