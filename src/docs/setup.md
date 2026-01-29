# Setup & Local Development

## Requirements

- Node.js (LTS recommended)
- npm (or pnpm/yarn if your project uses it consistently)

## Install

```bash
npm install
```

## Run locally

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Preview production build

```bash
npm run preview
```

## Deployment (GitHub Pages)

This project is deployed as a static site to GitHub Pages via GitHub Actions.

The deployment workflow (`.github/workflows/pages.yml`) automatically:
- Builds the project on push to `main`
- Deploys to GitHub Pages
- Creates a `404.html` copy for client-side routing support

If you need to deploy manually, ensure the correct base path is used for GitHub Pages.
