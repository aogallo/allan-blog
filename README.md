# Allan's Blog 📄

Personal blog and portfolio built with [Astro](https://astro.build), deployed to GitHub Pages.

## What's Here

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

## Add Content

```bash
# New blog post
touch src/content/blog/my-new-post.md

# New project
touch src/content/projects/my-project.md
```

See frontmatter in existing files for the required structure.

## Tech Stack

- **Framework**: Astro with React components
- **Styling**: Tailwind CSS
- **Content**: Markdown with content collections
- **Deployment**: GitHub Pages via GitHub Actions
