# Allan's Blog

Personal blog to share configurations such as Neovim, Tmux, and install processes.

## Stack

- **Astro** v2 — static site generation, content collections, Markdown/MDX
- **React** v18 — interactive components (Search, Project cards)
- **Tailwind CSS** v3 — utility-first styling with custom theme (CSS variables)
- **TypeScript** — type-safe codebase
- **Satori** + **@resvg/resvg-js** — Open Graph image generation at build time
- **Fuse.js** — client-side fuzzy search

### Content & Markdown

- **remark-toc** — auto-generated table of contents
- **remark-collapse** — collapsible ToC
- **Shiki** — syntax highlighting (one-dark-pro theme)

### DX & Quality

- **Prettier** + **prettier-plugin-tailwindcss** — formatting
- **ESLint** + **eslint-plugin-astro** — linting
- **Husky** + **lint-staged** — pre-commit hooks
- **Commitizen** — conventional commits (`npm run cz`)

### Build & Deploy

- **@astrojs/rss** — RSS feed
- **@astrojs/sitemap** — sitemap generation
- **@divriots/jampack** — post-build optimization (HTML/CSS/JS)
- GitHub Actions — CI/CD

### Blog Posts

Technical guides and tutorials on:

- **Neovim**: Configuration, plugins, motions, spell checking
- **Development Environment**: Terminal setup, pyenv, symbolic links
- **AstroPaper Theming**: Color schemes, OG images, CMS integration
- **Web Development**: Tailwind Typography, portfolio building

### Projects

- Real Estate Search with LLM (React + FastAPI + Groq + PostgreSQL)
- Package Tracker
- Quiz App (React Native)
- Go API, Node.js REST API, .NET Todo API

## Quick Start

```bash
yarn install
yarn dev      # Development server
yarn build    # Production build (runs jampack automatically)
yarn format   # Format with Prettier
```

## Scripts

```bash
npm run dev         # dev server with Astro type checking
npm run build       # build + jampack optimization
npm run preview     # preview production build
npm run lint        # ESLint
npm run format      # Prettier
npm run cz          # Commitizen (conventional commits)
```
