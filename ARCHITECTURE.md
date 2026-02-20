# Architecture & System Design

## System Overview

```
┌─────────────────────────────────────────────┐
│         React Application (SPA)             │
├─────────────────────────────────────────────┤
│    Browser                                  │
│  ┌──────────────────────────────────────┐  │
│  │      React Router                    │  │
│  │  ┌──────┐  ┌──────┐  ┌──────────┐  │  │
│  │  │ Home │  │Proj. │  │Analytics │  │  │
│  │  └──────┘  └──────┘  └──────────┘  │  │
│  └──────────────────────────────────────┘  │
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │      App Context Provider            │  │
│  │  ┌─────────────────────────────────┐ │  │
│  │  │  Global State (useReducer)      │ │  │
│  │  │  - theme (useState)             │ │  │
│  │  │  - favorites (useReducer)       │ │  │
│  │  └─────────────────────────────────┘ │  │
│  └──────────────────────────────────────┘  │
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │       Component Tree                 │  │
│  │  Navbar → Favorites Badge           │  │
│  │  Pages → Cards → useMemo →Analytics │  │
│  │  Footer → Theme Toggle              │  │
│  └──────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
         │
         ├─→ Local Storage (optional future)
         │
         └─→ External Services
             - Analytics APIs
             - CDN for static assets
```

---

## Data Flow Architecture

### 1. Component Initialization Flow

```
main.jsx
  ↓
App wrapper initialized
  ↓
AppProvider wrapper
  ↓
Context created with:
  - useReducer(appReducer, initialState)
  - useState(theme)
  - Dispatch function
  ↓
All child components can access via useContext
```

### 2. Favorites Management Flow

```
User clicks heart icon
  ↓
CardComponent onClick handler
  ↓
dispatch({ type: 'ADD_ITEM', payload: project })
  ↓
appReducer processes action
  ↓
State updated in AppContext
  ↓
All context consumers re-render with new state:
  - Navbar badge updates
  - CardComponent highlight changes
  - Analytics recalculates useMemo
  ↓
UI reflects new state
```

### 3. Analytics Calculation Flow

```
User navigates to Analytics page
  ↓
Analytics component mounts
  ↓
useMemo hook runs:
  1. Access favorites from context
  2. Perform calculations:
     - Count total favorites
     - Parse technology strings
     - Categorize projects
     - Sort technologies
  3. Return memoized object
  ↓
Components render using memoized data
  ↓
User navigates away / clears favorites
  ↓
Dependency [favorites] changes
  ↓
useMemo detects change and recalculates
```

### 4. Theme Toggle Flow

```
User clicks theme button in Footer
  ↓
handleToggle calls toggleTheme()
  ↓
setTheme toggles between 'light' and 'dark'
  ↓
AppContext.Provider updates theme value
  ↓
All consuming components re-render
  ↓
App component applies .light or .dark class
  ↓
CSS custom properties reflect theme
  ↓
UI updates colors instantly
```

---

## State Management Architecture

### Context Provider Structure

```javascript
AppContext
├── theme (light | dark)
├── toggleTheme()
├── favorites (array of projects)
└── dispatch(action)
    ├── Actions:
    │   ├── ADD_ITEM
    │   ├── REMOVE_ITEM
    │   └── CLEAR_ITEMS
    └── Processed by appReducer
```

### State Tree

```
AppProvider
└── AppContext.Provider
    ├── value={{
    │   theme: string,
    │   toggleTheme: function,
    │   favorites: array,
    │   dispatch: function
    │ }}
    │
    └── All descendant components
        ├── Navbar (reads: favorites)
        ├── Pages (read: favorites, dispatch)
        ├── CardComponent (reads & dispatches)
        │   ├── Home
        │   ├── Projects
        │   └── Analytics
        └── Footer (reads: theme, calls toggleTheme)
```

---

## Component Hierarchy

```
App
├── Router
│   ├── Route: Home
│   │   └── Uses: useContext(AppContext)
│   │       ├── theme
│   │       └── favorites
│   │
│   ├── Route: Projects
│   │   ├── useMemo (projectStats)
│   │   └── CardComponent (list)
│   │       └── dispatch (ADD_ITEM, REMOVE_ITEM)
│   │
│   └── Route: Analytics
│       ├── useMemo (analyticsData)
│       │   └── Complex calculations
│       └── dispatch (CLEAR_ITEMS)
│
├── Navbar (constant)
│   └── Uses: favorites (from context)
│
└── Footer (constant)
    └── Uses: theme, toggleTheme (from context)
```

---

## Data Structures

### Project Object
```javascript
{
  id: number,           // Unique identifier
  name: string,         // Project title
  description: string,  // Short description
  tech: string,         // Comma-separated tech stack
  link: string          // URL to project
}
```

### Favorites State
```javascript
favorites: [
  project1,   // Full project object
  project2,
  // ...
]
```

### Analytics Data (Memoized)
```javascript
{
  totalFavorites: number,
  techStack: {
    'React': 3,
    'Node.js': 2,
    // ...
  },
  topTechs: [
    { tech: string, count: number },
    // ...
  ],
  categories: {
    frontend: number,
    backend: number,
    fullstack: number
  },
  averageLength: number
}
```

---

## Performance Architecture

### Rendering Optimization

1. **useCallback** (could be added)
   - Memoize dispatch functions
   - Prevent unnecessary child renders

2. **React.memo** (could be added)
   - Prevent CardComponent re-renders
   - Only update when project prop changes

3. **useMemo** (implemented)
   - Analytics calculations cached
   - Project stats filtered once
   - Only recalculate on dependency change

### Current Optimization Strategy

```
Without useMemo:
Every render → Full recalculation → Slow

With useMemo:
First render → Calculation → Cache
Subsequent renders → Return cached value
Dependency changes → Recalculate

Analytics example:
- Loops through all favorites
- Parses strings
- Builds objects
- Sorts arrays
Only runs when favorites array changes
```

---

## Routing Architecture

### Route Definition
```javascript
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/projects" element={<Projects />} />
  <Route path="/analytics" element={<Analytics />} />
  <Route path="*" element={<Home />} />  // Fallback
</Routes>
```

### Route Flow
```
URL change
  ↓
Router detects path change
  ↓
Matches route pattern
  ↓
Renders corresponding component
  ↓
Navbar & Footer remain (outside routes)
  ↓
Previous page unmounts
  ↓
New page mounts
  ↓
useContext still valid (AppProvider wraps all)
```

### Navigation Implementation
```javascript
// Using Link component (no page reload)
<Link to="/projects">Projects</Link>

// Programmatic navigation (can be added)
// const navigate = useNavigate();
// navigate('/analytics');
```

---

## Styling Architecture

### CSS Organization

```css
├── Global Styles
│   ├── CSS Variables
│   │   ├── Colors (light & dark)
│   │   ├── Spacing
│   │   └── Typography
│   └── Base styles (*, html, body)
│
├── Component Styles
│   ├── Navbar
│   ├── Footer
│   ├── Cards
│   ├── Buttons
│   └── Forms
│
├── Page Styles
│   ├── Home
│   ├── Projects
│   └── Analytics
│
├── Theme System
│   ├── .app.light
│   └── .app.dark
│
├── Responsive Design
│   ├── Tablet breakpoints (768px)
│   └── Mobile breakpoints (480px)
│
└── Utilities
    ├── Animations
    ├── Accessibility
    └── Print styles
```

### Theme Implementation
```javascript
// 1. App.jsx applies theme class
<div className={`app ${theme}`}>

// 2. CSS uses class selector
.app.light { background: white; }
.app.dark  { background: #1a1a1a; }

// 3. Components inherit theme
// No theme prop drilling needed
```

---

## Scalability Considerations

### Current Architecture
- ✅ Handles up to ~100 favorites efficiently
- ✅ useMemo prevents performance issues
- ✅ Clean separation of concerns
- ✅ Easily testable

### Scaling for 1000+ Items

**Recommendations:**
1. **Pagination**
   - Show 20 items per page
   - Implement prev/next buttons

2. **Virtual Scrolling**
   - render-if-visible library
   - Only render visible items

3. **Search/Filter**
   - Add useCallback for search
   - Filter with useMemo

4. **Lazy Loading**
   - Load items on demand
   - Code splitting for routes

5. **Backend Integration**
   - Move data to API
   - Add loading states
   - Error handling

---

## Future Evolution Path

### Phase 1 (Current)
- Local state management
- Static sample data
- Client-side rendering

### Phase 2 (Recommended)
- Backend API integration
- Database (favorites persistence)
- User authentication
- Search functionality

### Phase 3 (Advanced)
- Real-time updates (WebSocket)
- Offline support (Service Worker)
- Advanced analytics
- Image uploads

---

## Error Handling Strategy

### Current Implementation
- No error boundaries (could be added)
- Handle empty states
- Validation in reducer

### Recommended Additions

```javascript
// Error Boundary Component
<ErrorBoundary>
  <App />
</ErrorBoundary>

// Try-catch in useMemo
useMemo(() => {
  try {
    return calculateStats();
  } catch (error) {
    console.error('Analytics error:', error);
    return fallbackData;
  }
}, [favorites]);
```

---

## Security Architecture

### Current Security
- ✅ No sensitive data in state
- ✅ No direct DOM manipulation
- ✅ React sanitizes JSX
- ✅ No external API calls

### Recommendations
- Add CSP headers
- Validate user input
- Use HTTPS
- Regular dependency updates
- Add security headers

---

## Testing Architecture

### Unit Tests (to be added)
```javascript
// Test appReducer
describe('appReducer', () => {
  test('ADD_ITEM adds project', () => {
    // Test logic
  });
});

// Test components
describe('CardComponent', () => {
  test('renders favorite button', () => {
    // Test rendering
  });
});
```

### Integration Tests (suggested)
- Context provider with components
- State updates with dispatch
- Memoization performance

---

## Build & Bundle Architecture

### Development Build
```
Source Files
  ├── JSX transpile
  ├── CSS processing
  └── Module resolution
  ↓
Dev Server (Vite)
  ├── HMR enabled
  ├── Fast refresh
  └── No bundling
```

### Production Build
```
Source Files
  ↓
Vite Build Process
  ├── JSX → JS
  ├── CSS minify
  ├── Tree-shake
  └── Chunk split
  ↓
dist/
  ├── index.html (small, no cache)
  ├── assets/
  │   ├── main.hash.js (cached)
  │   ├── main.hash.css (cached)
  │   └── vendor.hash.js (cached)
  └── Other assets
```

---

## Monitoring & Observability

### Available Metrics
- Page load time
- Component render count
- Favorites management operations
- Theme toggle events

### Recommended Additions
- Error tracking (Sentry)
- Performance monitoring
- User analytics
- Log aggregation

---

## Deployment Architecture

### Development Environment
```
Local machine
  ↓
Git repository
  ↓
npm run dev
  ↓
http://localhost:5173
```

### Production Environment
```
GitHub/GitLab
  ↓
CI/CD Pipeline (GitHub Actions)
  ↓
Build (npm run build)
  ↓
Vercel/Netlify/AWS
  ↓
CDN
  ↓
User's Browser
```

---

## Maintenance & Evolution

### Code Organization
- Clear folder structure
- Separation of concerns
- Reusable components
- Single responsibility

### Documentation
- Code comments in files
- README.md setup guide
- FEATURES.md detailed docs
- This architecture guide

### Testing Coverage (to add)
- Unit tests: 80%+
- Integration tests
- E2E tests for critical paths

---

**Architecture Version**: 1.0  
**Status**: Production Ready  
**Last Updated**: February 2026
