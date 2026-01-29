# Memorial Website

**Live site:** https://tamirre7.github.io/memorial-page/

A memorial website created in memory of an old friend, designed to preserve stories, moments, and remembrance through an interactive experience.

## Features

- **Media gallery** with carousel navigation and full-screen modal (keyboard support: ESC / ← / →)
- **Video support** with poster thumbnail and play overlay
- **Life story** section with optional **audio playback**
- **Virtual candle lighting** with a persistent counter (Firebase Realtime Database)
- **Mobile-first** responsive design

## Tech Stack

- React + Vite
- CSS (custom styling)
- Embla Carousel (autoplay)
- Firebase Realtime Database (candle counter)

## Quick Start

```bash
npm install
cp .env.example .env
# Edit .env with your Firebase credentials
npm run dev
```

## What I Learned & Built

This project was an opportunity to build a meaningful, production-ready React application while learning and applying modern web development practices:

**React Patterns & Hooks:**
- Created custom hooks (`useCandleCounter`, `useAudioPlayer`, `useGalleryModal`, `useTimedToast`) to encapsulate complex logic and state management
- Implemented proper memoization with `useMemo` and `useCallback` for performance optimization
- Used `useEffect` for side effects and cleanup to prevent memory leaks

**Real-World Features:**
- Integrated Firebase Realtime Database with transaction handling for concurrent updates
- Implemented graceful error handling and fallback mechanisms when Firebase is unavailable
- Built a carousel with autoplay using Embla Carousel, including keyboard navigation and modal interactions
- Created loading states and skeletons for better UX during async operations

**Production Best Practices:**
- Set up environment variables for sensitive configuration (Firebase credentials)
- Implemented error boundaries to catch and handle React component errors gracefully
- Added comprehensive accessibility features (ARIA labels, keyboard navigation, semantic HTML)
- Configured ESLint for code quality
- Set up automated deployment with GitHub Actions
- Created documentation for maintainability

**Technical Challenges Solved:**
- Managed autoplay state synchronization between carousel and modal
- Implemented localStorage + Firebase hybrid approach for candle counter (prevent duplicate lights per day)
- Handled RTL (right-to-left) layout for Hebrew content

## Documentation

For setup, content editing, and maintenance guides, see [`src/docs/`](./src/docs/index.md).
