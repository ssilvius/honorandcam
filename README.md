# Honor & Cam's Wedding Site 💒

Modern wedding website built with Astro, React 19, and Cloudflare, featuring MDX content management.

## Features

**MDX Content Management**: Wedding details, stories, and pages managed with MDX
**Cloudflare Integration**: Deployed on Cloudflare
**React 19 Forms**: Modern form handling
**TypeScript**: Type-safe validation throughout

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

### Adding Pages

Create MDX files in `src/content/pages/`:

```mdx
title: "Page Title"
description: "Page description"
order: 1

# Your Content Here

Write in Markdown/MDX with full React component support.
```

## Deployment
   ```

4. **Deploy**:
   ```bash
   pnpm deploy
   ```

## Admin Panel

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| `pnpm install`             | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
