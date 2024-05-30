import type { ProjectFrontmatter } from "@content/_schemas";

export interface CardProjectProps {
  frontmatter: ProjectFrontmatter;
}

export default function CardProject({ frontmatter }: CardProjectProps) {
  const { title, description } = frontmatter;
  return (
    <li>
      <h2>{title}</h2>
      <p>{description}</p>
    </li>
  );
}
