import type { ProjectFrontmatter } from "@content/_schemas";
import Link from "./Link";

export interface CardProjectProps {
  frontmatter: ProjectFrontmatter;
}

export default function CardProject({ frontmatter }: CardProjectProps) {
  const { title, image, description, github, liveLink } = frontmatter;

  return (
    <div className="bg-white md:max-w-2xl mx-auto max-w-md overflow-hidden rounded-xl border border-skin-accent shadow-lg">
      <div className="md:flex">
        <div className="md:shrink-0">
          <img
            className="md:h-full md:w-48 h-48 w-full object-cover"
            src={image?.url}
            alt={image?.alt}
          />
        </div>
        <div className="p-5">
          <div className="text-indigo-500 text-sm font-semibold uppercase tracking-wide">
            {title}
          </div>
          <p className="text-slate-500 mt-2 text-sm">{description}</p>
          <div className="mt-2 flex justify-between">
            <Link href={github} title={title} label="Github" />
            <Link href={liveLink} title={title} label="Live demo" />
          </div>
        </div>
      </div>
    </div>
  );
}
