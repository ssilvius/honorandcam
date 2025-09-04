# Honor & Cam's Wedding Site 💒

A modern wedding website built with Astro, React 19, and Cloudflare, featuring a code-based RSVP system and MDX content management.

## Features

- **Code-based RSVP System**: Guests enter unique codes from their invitations
- **Pre-loaded Guest Data**: Guest details are pre-populated using SQID short codes
- **MDX Content Management**: Wedding details, stories, and pages managed with MDX
- **Cloudflare Integration**: Deployed on Cloudflare with KV storage
- **React 19 Forms**: Modern form handling with useActionState
- **TypeScript & Zod**: Type-safe validation throughout

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

## RSVP System

### How it Works

1. **Guest Codes**: Each invitation has a unique 6-character SQID code
2. **Pre-loaded Data**: Guest names, email, address, and max guest count are pre-populated
3. **Code Lookup**: Guests enter their code to access their personalized RSVP form
4. **Form Submission**: Zod-validated data is stored in Cloudflare KV

### Testing the RSVP System

Visit `/codes` to see the test guest codes and test the system at `/rsvp`.

### Setting Up Guest Data

1. Edit `src/lib/guests.ts` with your actual guest list
2. Run the script to populate Cloudflare KV:

```bash
node scripts/populate-guests.js
```

3. Update your wrangler.jsonc with actual KV namespace IDs

## Content Management

### Adding Pages

Create MDX files in `src/content/pages/`:

```mdx
---
title: "Page Title"
description: "Page description"
order: 1
---

# Your Content Here

Write in Markdown/MDX with full React component support.
```

## Deployment

### Cloudflare Setup

1. **Create KV Namespaces**:
   ```bash
   wrangler kv:namespace create "GUESTS"
   wrangler kv:namespace create "RSVPS"
   ```

2. **Update wrangler.jsonc** with your KV namespace IDs

3. **Populate Guest Data**:
   ```bash
   node scripts/populate-guests.js | grep "wrangler kv" | bash
   ```

4. **Deploy**:
   ```bash
   pnpm deploy
   ```

## Admin Panel

Access RSVP responses at `/admin?p=wedding2025` (change the password in production!)

Built with ❤️ for Honor & Cam's special day!

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
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
