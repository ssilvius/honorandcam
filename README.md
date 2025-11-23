# Honor & Cam's Wedding Site

A modern wedding website built with Astro, React 19, and Cloudflare featuring elegant GSAP animations and MDX content management.

## Features

- **MDX Content Management**: Wedding details and stories managed with MDX
- **Cloudflare Deployment**: Fast edge hosting via Cloudflare Workers
- **GSAP Animations**: Elegant scroll-triggered animations with motion preferences support
- **Photo Slideshow**: Auto-advancing gallery with smooth transitions

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Deploy to Cloudflare
pnpm deploy
```

## Content Management

### Editing Content

Edit the main content in `src/content/pages/home.mdx`:

```mdx
---
title: "Page Title"
description: "Page description"
---

# Your Content Here

Write in Markdown/MDX with full React component support.
```

## Project Structure

```text
/
├── public/              # Static assets (images, favicon)
├── src/
│   ├── components/      # Astro/React components
│   ├── content/pages/   # MDX content files
│   ├── layouts/         # Page layouts
│   └── pages/           # Route pages
└── package.json
```

## Commands

| Command          | Action                                      |
| :--------------- | :------------------------------------------ |
| `pnpm install`   | Installs dependencies                       |
| `pnpm dev`       | Starts local dev server at `localhost:4321` |
| `pnpm build`     | Build your production site to `./dist/`     |
| `pnpm preview`   | Preview your build locally before deploying |
| `pnpm deploy`    | Build and deploy to Cloudflare              |
