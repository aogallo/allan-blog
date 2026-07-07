## Context

Blog posts currently render Markdown through `src/layouts/PostDetails.astro`. Mermaid support is implemented at the bottom of that layout by scanning rendered `<pre>` blocks for known Mermaid syntax and replacing matching blocks with `.mermaid` containers before calling Mermaid.

The current implementation dynamically imports Mermaid from jsDelivr at runtime:

```js
await import("https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs")
```

This keeps Mermaid out of the initial site bundle when no diagrams exist, but it also means rendering depends on an external CDN, bypasses npm lockfile review, and leaves module loading in page-delivered script code instead of the project build pipeline.

Astro component scripts without `is:inline` are processed by Vite, support npm imports, and are bundled/deduplicated. That is the right boundary for this feature: Mermaid should be a project dependency and the rendering code should be a normal client-side module built with the site.

## Goals / Non-Goals

**Goals:**

- Manage Mermaid through npm and the lockfile.
- Remove the runtime jsDelivr Mermaid import from post pages.
- Move Mermaid rendering behavior into a dedicated bundled client script rather than keeping module loading in `PostDetails.astro` markup.
- Preserve the current user-facing behavior for Mermaid diagrams in blog posts.
- Keep rendering conditional so pages without Mermaid blocks do not initialize Mermaid work unnecessarily.

**Non-Goals:**

- Replacing the Markdown pipeline with a compile-time Mermaid renderer.
- Changing blog content schemas or requiring new frontmatter for Mermaid posts.
- Expanding authoring syntax beyond the currently supported Mermaid diagram starters unless discovered to be safe and trivial during implementation.
- Changing Mermaid theme/security settings beyond what is necessary to preserve current behavior.

## Decisions

### Install Mermaid as an npm dependency

Use the `mermaid` package from npm and commit the resulting lockfile update.

Rationale: this makes the exact Mermaid version explicit, reviewable, and reproducible in local, CI, and deployed builds.

Alternative considered: keep using the CDN and only move the URL into a separate file. That reduces layout clutter but does not solve determinism, CSP/network fragility, or dependency review.

### Use a dedicated bundled client script

Create a small client-side script under `src/` that imports Mermaid from the installed package and owns the DOM scan/replace/render flow. Import that script from `PostDetails.astro` with a normal Astro `<script>` so Astro/Vite processes it.

Rationale: `PostDetails.astro` should describe the post layout, while Mermaid rendering is client behavior. A dedicated script makes the module boundary explicit and keeps the final page from containing an external module import.

Alternative considered: import `mermaid` directly inside the existing `PostDetails.astro` script. That would be bundled by Astro, but it keeps rendering logic embedded in the layout and only partially addresses the user's concern about importing a module inside the HTML code.

### Keep runtime rendering, not build-time SVG generation

Continue rendering Mermaid in the browser after the Markdown content is rendered.

Rationale: this is the smallest safe change from the current behavior and avoids introducing server-side Mermaid rendering complexity, browser emulation, or SVG sanitization decisions.

Alternative considered: render Mermaid at build time. That could remove client Mermaid JavaScript entirely, but it is a larger architectural change with more moving parts and should be a separate proposal if desired.

### Preserve strict security posture

Keep `securityLevel: "strict"` and `startOnLoad: false` unless implementation proves a compatibility issue.

Rationale: diagrams are authored in repository Markdown, but strict rendering is still the safer default. Explicit rendering also avoids Mermaid auto-processing unrelated DOM.

Alternative considered: relax security for richer Mermaid features. That is unnecessary for the current diagrams and increases risk.

## Risks / Trade-offs

- Bundle size increases because Mermaid becomes part of the project dependency graph. -> Mitigate by keeping the rendering script isolated and considering dynamic import from the local package only if build output shows a meaningful cost.
- Astro 2/Vite handling of the Mermaid package may expose bundling quirks. -> Mitigate by validating with `npm run build` and adjusting import style only if needed.
- Diagram detection may miss Mermaid types not listed in the current regex. -> Preserve current behavior first; broaden detection only with explicit tests or content evidence.
- Browser rendering failures could silently leave raw code blocks replaced or unrendered. -> Keep the transformation simple and verify at least one existing Mermaid-heavy post after build/preview.

## Migration Plan

1. Install `mermaid` with npm so `package.json` and `package-lock.json` are updated together.
2. Add the dedicated Mermaid client script and move the existing detection/rendering behavior into it.
3. Update `PostDetails.astro` to import the bundled client script instead of containing the CDN dynamic import logic.
4. Run lint/build verification.
5. Inspect the built output or source search to confirm no jsDelivr Mermaid import remains.

Rollback is straightforward: revert the dependency and layout/script changes to restore the previous CDN-based rendering.

## Open Questions

- Should the script use a static `import mermaid from "mermaid"` or a local dynamic `import("mermaid")` after detecting Mermaid blocks? Static import is simpler; local dynamic import can reduce work on non-diagram pages if Astro/Vite splits it cleanly.
- Should supported diagram detection remain the current explicit list, or should it use a broader marker based on fenced code block class names if Astro exposes them consistently?
