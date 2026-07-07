## ADDED Requirements

### Requirement: Blog posts render Mermaid diagrams from bundled dependency

The system SHALL render Mermaid diagrams in blog posts using the project-managed Mermaid dependency bundled through the Astro/Vite build pipeline.

#### Scenario: Post contains Mermaid syntax
- **WHEN** a published blog post contains a Markdown code block whose content starts with supported Mermaid syntax
- **THEN** the rendered post page displays that code block as a Mermaid diagram

#### Scenario: Post does not contain Mermaid syntax
- **WHEN** a rendered blog post contains no supported Mermaid code blocks
- **THEN** Mermaid rendering logic does not initialize diagram rendering work for that post content

### Requirement: Mermaid module loading avoids runtime CDN import

The system SHALL NOT import Mermaid from a remote CDN in the generated post page JavaScript.

#### Scenario: Built output is inspected
- **WHEN** the site is built for production
- **THEN** the generated output does not contain a Mermaid import URL from `cdn.jsdelivr.net`

### Requirement: Mermaid rendering preserves security posture

The system SHALL initialize Mermaid with explicit rendering and strict security settings unless a later change documents a different security decision.

#### Scenario: Mermaid rendering initializes
- **WHEN** Mermaid diagrams are rendered on a post page
- **THEN** Mermaid is initialized with `startOnLoad` disabled and strict security behavior preserved
