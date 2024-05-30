import type { ProjectFrontmatter } from "@content/_schemas";
import test from "@assets/test.jpg";
export interface CardProjectProps {
  frontmatter: ProjectFrontmatter;
}

export default function CardProject({ frontmatter }: CardProjectProps) {
  const { title, description } = frontmatter;
  return (
    <li className="rounded-md border-2 border-skin-accent p-2">
      <img src={test} alt="test" />
      <h2>{title}</h2>
      <p>{description}</p>
    </li>
  );
}
