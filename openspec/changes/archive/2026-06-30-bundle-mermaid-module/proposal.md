## Why

Mermaid diagrams currently render by dynamically importing Mermaid from jsDelivr inside the post layout's client script. This makes diagram rendering depend on a runtime CDN request outside the project lockfile and build pipeline, and it leaves module-loading behavior embedded in the generated page path.

Installing Mermaid as a project dependency and bundling the rendering script through Astro/Vite keeps the feature deterministic, reviewable, and easier to secure.

## What Changes

- Add Mermaid as an npm dependency managed by the project lockfile.
- Replace the runtime CDN module import with a local bundled client script that imports Mermaid from the installed package.
- Keep Mermaid rendering lazy in practice by only initializing/rendering when a post contains Mermaid code blocks.
- Preserve the current supported diagram syntax detection unless implementation confirms a safe broader detector.
- Keep Mermaid security settings strict unless there is a specific reason to change them.

## Capabilities

### New Capabilities

- `bundled-mermaid-rendering`: Client-side Mermaid rendering for blog posts using a bundled local dependency instead of a runtime CDN module import.

### Modified Capabilities

No existing OpenSpec capabilities are modified.

## Impact

- Affected files are expected around `src/layouts/PostDetails.astro`, a new or existing client script under `src/`, and `package.json` / lockfile dependency metadata.
- The generated site should no longer include a dynamic import from `https://cdn.jsdelivr.net/npm/mermaid...`.
- Build and lint behavior may change because Mermaid becomes part of the dependency graph.
