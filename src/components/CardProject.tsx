import type { ProjectFrontmatter } from "@content/_schemas";

export interface CardProjectProps {
  frontmatter: ProjectFrontmatter;
  slug: string;
}

export default function CardProject({ frontmatter, slug }: CardProjectProps) {
  const { title, description, image, github, liveLink, tags } = frontmatter;

  // Skeleton gradient para cuando no hay imagen
  const hasImage = image?.url && image.url !== "";

  return (
    <article className="hover:shadow-skin-accent/10 group relative flex flex-col overflow-hidden rounded-xl border border-skin-line bg-skin-card transition-all duration-300 hover:border-skin-accent hover:shadow-lg">
      {/* Imagen / Skeleton */}
      <div className="relative h-32 w-full overflow-hidden bg-skin-card-muted">
        {hasImage ? (
          <img
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            src={image.url}
            alt={image.alt || title}
            loading="lazy"
          />
        ) : (
          /* Skeleton cuando no hay imagen */
          <div className="from-skin-fill to-skin-card-muted flex h-full w-full items-center justify-center bg-gradient-to-br">
            <svg className="fill-skin-card-muted h-12 w-12" viewBox="0 0 24 24">
              <path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V6h5.17l2 2H20v10zm-8-4h2v2h-2v-2zm0-4h2v2h-2v-2zm-4 4h2v2h-2v-2zm0-4h2v2h-2v-2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-1 flex-col p-5">
        {/* Tech Stack Pills */}
        {tags && tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {tags.slice(0, 4).map(tag => (
              <span
                key={tag}
                className="rounded-full bg-skin-accent/10 px-2.5 py-1 text-xs font-medium text-skin-accent"
              >
                {tag}
              </span>
            ))}
            {tags.length > 4 && (
              <span className="rounded-full bg-skin-card-muted px-2.5 py-1 text-xs text-skin-base/60">
                +{tags.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Título - alto contraste en ambos themes */}
        <h3 className="mb-2 text-lg font-semibold text-skin-base">{title}</h3>

        {/* Descripción - legible */}
        <p className="mb-4 flex-1 text-sm leading-relaxed text-skin-base/80">
          {description}
        </p>

        {/* Links */}
        <div className="flex gap-4 border-t border-skin-line pt-4">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-skin-accent transition-opacity hover:opacity-80"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.735-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.552 3.3-1.23 3.3-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.315.81 1.094.81 2.22v3.293c0 .315.19.694.795.576 4.765-1.589 8.2-6.086 8.2-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Code
          </a>
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-skin-accent transition-opacity hover:opacity-80"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
              </svg>
              Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
