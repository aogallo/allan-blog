# AGENTS.md

## Dev Commands

```bash
yarn dev      # Start dev server with type checking
yarn build   # Build for production (runs jampack automatically)
yarn format  # Format code with Prettier
yarn lint    # Lint with ESLint
```

## Key Quirks

- **Package manager**: Uses `yarn` (not npm/pnpm)
- **Lockfile**: `yarn.lock` exists - do NOT run `npm install`
- **Commit messages**: Uses Commitizen (`yarn cz`) for conventional commits
- **Pre-commit hooks**: husky runs prettier on staged files via lint-staged

## Architecture

- **Framework**: Astro with content collections (`src/content/`)
- **Blog posts**: `src/content/blog/*.md`
- **Projects**: `src/content/projects/*.md`
- **Schemas**: `src/content/_schemas.ts`

## Adding Content

1. Create `src/content/blog/new-post.md` or `src/content/projects/my-project.md`
2. Fill frontmatter (see existing files for structure)
3. Run `yarn format` before commit

## Branch Workflow

- `main`: deployed to GitHub Pages
- `develop`: working branch
- Feature branches: `feature/`, `fix/`, `chore/`, `refactor/`, etc.
- Open PR against `develop`