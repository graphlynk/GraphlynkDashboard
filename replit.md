# Next Generation Dashboard

## Overview
This is a Next Generation Dashboard application - a modern, feature-rich React dashboard with multiple sections including analytics, blog management, mailing lists, and more. The project was imported from GitHub and configured to run in the Replit environment.

**Project Source**: https://www.figma.com/design/U5vGoMK3nNksEB0ojalDp1/Next-Generation-Dashboard

## Tech Stack
- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 6.3.5
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4.1.3 (pre-compiled)
- **UI Components**: Radix UI primitives
- **Additional Libraries**: 
  - lucide-react (icons)
  - recharts (charts)
  - react-hook-form (forms)
  - next-themes (theme switching)
  - sonner (toast notifications)
  - motion (animations)

## Project Structure
```
├── src/
│   ├── components/      # React components
│   │   ├── dashboard/   # Dashboard-specific components
│   │   ├── blog/        # Blog management components
│   │   ├── ui/          # Reusable UI components (Radix UI based)
│   │   └── ...          # Other feature components
│   ├── context/         # React context providers
│   ├── styles/          # Global styles and CSS
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
└── package.json         # Dependencies and scripts
```

## Replit Configuration

### Development Setup
- **Port**: 5000 (configured for Replit webview)
- **Host**: 0.0.0.0 (allows external access)
- **HMR**: Configured for Replit's proxy environment (WSS on port 443)

### Workflow
- **Name**: dev
- **Command**: `npm run dev`
- **Output**: webview on port 5000

### Deployment
- **Type**: autoscale (stateless web application)
- **Build**: `npm run build`
- **Run**: `npx vite preview --host 0.0.0.0 --port 5000`

## Available Scripts
- `npm run dev` - Start development server on port 5000
- `npm run build` - Build for production (outputs to `build/` directory)

## Recent Changes
- **2024-11-03**: Initial Replit setup
  - Configured Vite to use port 5000 with 0.0.0.0 host
  - Added HMR configuration for Replit's proxy environment
  - Created .gitignore for Node.js project
  - Set up development workflow
  - Configured deployment settings for autoscale

## Features
Based on the component structure, this dashboard includes:
- Dashboard home with KPIs and analytics
- Blog management system
- Mailing list management
- Search functionality with tracking
- Product management
- Schema/JSON-LD viewer
- User profile and settings
- Theme switching (light/dark mode)
- Responsive sidebar navigation

## Notes
- The project uses Tailwind CSS v4.1.3 which is pre-compiled in `src/index.css`
- All dependencies are already installed via npm
- The application is ready to run in development mode
