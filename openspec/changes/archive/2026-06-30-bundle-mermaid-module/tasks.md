## 1. Dependency Setup

- [x] 1.1 Install `mermaid` with npm so `package.json` and `package-lock.json` record the dependency.
- [x] 1.2 Confirm no alternative package manager lockfiles are created.

## 2. Client Rendering Module

- [x] 2.1 Create a dedicated Mermaid client script under `src/` that imports Mermaid from the installed package.
- [x] 2.2 Move the existing Mermaid block detection, wrapper replacement, initialization, and `mermaid.run` flow into the dedicated script.
- [x] 2.3 Keep rendering conditional so posts without supported Mermaid blocks return before initializing Mermaid.
- [x] 2.4 Preserve `startOnLoad: false`, `theme: "dark"`, and `securityLevel: "strict"` unless implementation exposes a documented incompatibility.

## 3. Layout Integration

- [x] 3.1 Update `src/layouts/PostDetails.astro` to import the bundled Mermaid client script instead of dynamically importing Mermaid from jsDelivr.
- [x] 3.2 Remove the runtime CDN Mermaid import and any now-duplicated inline rendering logic from the layout.

## 4. Verification

- [x] 4.1 Run `npm run lint`.
- [x] 4.2 Run `npm run build`.
- [x] 4.3 Search the source and built output to confirm no Mermaid import URL from `cdn.jsdelivr.net` remains.
- [x] 4.4 Verify at least one existing Mermaid-heavy blog post still renders diagrams correctly in preview or built output.
