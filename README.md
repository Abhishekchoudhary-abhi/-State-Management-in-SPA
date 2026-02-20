# Academic Experiment 4: State Management in Single Page Applications

A complete React application demonstrating advanced state management patterns, including Context API, useReducer, useMemo, and React Router.

## Project Overview

This project showcases best practices for managing global state in modern React applications using functional components and hooks:

- **React Router**: Multi-page navigation with 3 pages (Home, Projects, Analytics)
- **useContext**: Global state management for theme and favorites
- **useReducer**: Structured state updates with 3+ actions (ADD_ITEM, REMOVE_ITEM, CLEAR_ITEMS)
- **useMemo**: Performance optimization for derived calculations
- **Responsive Design**: Mobile-first approach with desktop support

## Features

### 1. Home Page
- Welcome and project introduction
- Feature highlights
- Statistics display (favorites count, theme, status)
- Call-to-action buttons

### 2. Projects Page
- Display collection of projects
- Add/remove favorites functionality
- Project statistics (total, favorited, unfavorited)
- Favorite projects preview
- Optimized list rendering with useMemo

### 3. Analytics Page (NEW)
- Comprehensive analytics dashboard
- Display total favorites using derived calculations
- Technology stack analysis
- Project categorization
- Top technologies bar chart
- Favorite projects table
- Clear favorites action (using reducer)
- Print report functionality

### 4. Global Features
- **Navbar**: Navigation links and favorites badge
- **Footer**: Theme toggle button
- **Theme Toggle**: Light/Dark mode support
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation with favorites count
│   ├── Footer.jsx          # Footer with theme toggle
│   ├── ThemeToggle.jsx     # Theme toggle component
│   └── CardComponent.jsx   # Reusable project card
├── context/
│   └── AppContext.jsx      # Context provider with global state
├── reducer/
│   └── appReducer.js       # Reducer function with 3+ actions
├── pages/
│   ├── Home.jsx            # Home page
│   ├── Projects.jsx        # Projects listing page
│   └── Analytics.jsx       # NEW Analytics dashboard
├── App.jsx                 # Main app with routing
├── main.jsx                # Entry point
└── index.css               # Global styles

Configuration:
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── index.html              # HTML entry point
└── .gitignore              # Git ignore rules
```

## Technologies Used

### Core
- **React 18.2**: Modern React with hooks
- **React Router 6**: Client-side routing
- **Vite**: Fast build tool and dev server

### Key Libraries
- React Context API for global state
- useReducer for state management
- useMemo for performance optimization
- React Router for navigation

## Hooks & Patterns

### 1. useContext
- **Global State**: Theme and favorites management
- **Provider Pattern**: AppProvider wraps entire app
- **Consumer Components**: Access context in 2+ components

```jsx
const { theme, toggleTheme, favorites, dispatch } = useContext(AppContext);
```

### 2. useReducer
Three reducer actions implemented:
- `ADD_ITEM`: Add project to favorites
- `REMOVE_ITEM`: Remove project from favorites
- `CLEAR_ITEMS`: Clear all favorites

```jsx
dispatch({ type: 'ADD_ITEM', payload: project });
dispatch({ type: 'REMOVE_ITEM', payload: projectId });
dispatch({ type: 'CLEAR_ITEMS' });
```

### 3. useMemo
Performance optimizations:
- **Projects Page**: Filtered project calculations
- **Analytics Page**: Complex analytics computations
  - Total favorites count
  - Technology stack analysis
  - Project categorization
  - Top technologies ranking

```jsx
const analyticsData = useMemo(() => {
  // Expensive calculations
  return calculateStats();
}, [favorites]);
```

## Setup & Installation

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Steps

1. **Navigate to project directory**
   ```bash
   cd "d:\CSE AIML\FULL STACK\exp-4"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   Server runs at: `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## Usage Guide

### Navigation
- **Home**: Landing page with introduction and statistics
- **Projects**: Browse and manage project favorites
- **Analytics**: View insights about your favorite projects

### Features

1. **Add to Favorites**
   - Click the heart icon (🤍) on any project card
   - Card highlights with red heart (❤️)
   - Favorites count updates in navbar

2. **Remove from Favorites**
   - Click the red heart (❤️) on favorited projects
   - Card reverts to outline heart (🤍)
   - Favorites count decreases

3. **View Analytics**
   - Navigate to Analytics page
   - See total favorites and statistics
   - Explore technology trends
   - View project categorization
   - Print report (available in Analytics)

4. **Toggle Theme**
   - Click theme button in footer (🌙/☀️)
   - App switches between light and dark mode
   - Theme persists during session

5. **Clear Favorites**
   - Navigate to Analytics page
   - Click "Clear All Favorites" button
   - Confirm the action
   - All favorites removed from state

## Design Details

### Responsive Breakpoints
- **Desktop**: 1200px+ (3-column grid layouts)
- **Tablet**: 768px - 1199px (2-column layouts)
- **Mobile**: Below 768px (1-column stacked layouts)
- **Small Mobile**: Below 480px (optimized spacing)

### Theme System
- **Light Theme**: Clean white with subtle grays
- **Dark Theme**: Dark background with light text
- Smooth transitions between themes
- Consistent color scheme across all pages

### Spacing & Typography
- Responsive font sizes using clamp()
- Consistent spacing scale (xs, sm, md, lg, xl, 2xl, 3xl)
- Clear visual hierarchy
- Accessible contrast ratios

### Animations
- Smooth transitions (0.3s default)
- Hover effects on interactive elements
- Fade-in animations on page load
- Disabled in prefers-reduced-motion

## Performance Optimizations

1. **useMemo Hooks**: Prevent unnecessary recalculations
2. **Lazy Evaluation**: Analytics calculations only run when needed
3. **Efficient Filtering**: Optimized array operations
4. **Component Memoization**: Reduced re-renders
5. **CSS Optimization**: Efficient selectors and cascading

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Code Quality

✅ **Clean Code**
- Well-structured components
- Meaningful variable names
- Comprehensive comments
- Single responsibility principle

✅ **Modern React**
- Functional components only
- React hooks best practices
- No class components
- Proper hook dependencies

✅ **Maintainability**
- Modular folder structure
- Reusable components
- Separation of concerns
- Clear separation of business logic

## Project Requirements Met

- ✅ React Router with 3+ pages
- ✅ useContext for global state (theme, favorites)
- ✅ useReducer with 3+ actions
- ✅ useMemo for performance optimization
- ✅ New Analytics page demonstrating all hooks
- ✅ Clean, modern UI
- ✅ Responsive design
- ✅ Consistent layout (Navbar + Footer)
- ✅ Functional components only
- ✅ Production-ready code

## Learning Outcomes

By studying this project, you'll learn:

1. **State Management**: How to structure global state with Context API
2. **Reducer Pattern**: Predictable state updates using reducer actions
3. **Performance**: Optimizing calculations with useMemo
4. **Routing**: Multi-page navigation with React Router
5. **Responsive Design**: Mobile-first CSS approach
6. **Component Composition**: Building reusable React components
7. **Hooks Best Practices**: Proper dependency management and cleanup

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173 or use different port
npm run dev -- --port 5174
```

### Dependencies Not Installing
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm package-lock.json
npm install
```

### Build Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
npm run build
```

## Future Enhancements

Possible extensions to this project:
- Add localStorage to persist favorites
- Implement search/filter functionality
- Add project details modal
- Email export feature
- User authentication
- Backend API integration
- Advanced analytics with charts library
