# AGENTS.md

## Commands

- Use `npm` by default. `package-lock.json` and `yarn.lock` are tracked, but README/scripts document `npm`; `pnpm run build` can trigger an install, create untracked `pnpm-lock.yaml` / `pnpm-workspace.yaml`, and fail on ignored build scripts.
- `npm run dev` runs `astro check --watch & astro dev`, so it starts a watcher in the background. Use `npm run start` when you only need the Astro dev server.
- Verification shortcuts: `npm run lint`, `npm run format:check`, and `npm run build` (`astro build && jampack ./dist`).
- Pre-commit runs lint-staged Prettier for staged JS/TS/MD/JSON files via Husky.

## Content Collections

- Blog posts live in `src/content/blog`; projects live in `src/content/projects`.
- Every blog Markdown file must satisfy `src/content/_schemas.ts`: required `pubDatetime`, `title`, and `description`; optional `author`, `postSlug`, `featured`, `draft`, `tags`, and `ogImage`. `draft: true` hides posts from routes but still must pass schema validation.
- Blog slugs come from `postSlug` when present, otherwise from `title` (`src/utils/slugify.ts`). Changing either can change URLs.
- Project entries require `title`, `description`, `github`, and `draft`; `image`, `liveLink`, `pubDatetime`, and `tags` are optional.

## Markdown And Diagrams

- Markdown uses `remark-toc` and `remark-collapse`; a heading named `Table of contents` is treated specially by the collapse plugin.
- Mermaid diagrams are rendered client-side in `src/layouts/PostDetails.astro` by detecting code blocks whose text starts with `flowchart`, `sequenceDiagram`, `stateDiagram-v2`, or `pie`. If you add another Mermaid diagram type, update that detector too.
- Do not re-add AWS Skill Builder screenshots to posts. Existing AWS learning notes were converted to original Mermaid diagrams to avoid republishing course screenshots.

## App Wiring

- Main site settings and pagination live in `src/config.ts`; `SITE.postPerPage` controls blog pagination.
- Posts are rendered through `src/pages/posts/[slug].astro` and `src/layouts/PostDetails.astro`; projects render very directly through `src/pages/projects/[name].astro`.
- Path aliases are configured in `tsconfig.json` with `baseUrl: "src"` (`@components/*`, `@layouts/*`, `@utils/*`, etc.).

## CI

- PR build workflow runs on pull requests targeting `develop`; deploy workflow runs on pushes to `main`.
- Both workflows use `withastro/action@v6`, so lockfile/package-manager changes can affect CI dependency installation.
