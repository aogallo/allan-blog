import type { ProjectFrontmatter } from "@content/_schemas";

export interface CardProjectProps {
  frontmatter: ProjectFrontmatter;
}

export default function CardProject({ frontmatter }: CardProjectProps) {
  const { title, image, description, github, liveLink } = frontmatter;

  console.log(image);

  const target = "_blank";
  // const href = "https://github.com/aogallo";
  // const className = "link-button";
  // const titleLink = "Allan on Github";
  const disabled = false;

  return (
    <li className="rounded-md border-2 border-skin-accent p-2">
      {image && <img src={image.url} alt={image.alt} />}
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="flex flex-row gap-2">
        <a
          target={target}
          href={disabled ? "#" : github}
          // tabindex={disabled ? "-1" : "0"}
          className="group inline-block hover:text-skin-accent"
          // aria-label={ariaLabel}
          title={title}
          // aria-disabled={disabled}
        >
          Github
        </a>

        <a
          target={target}
          href={disabled ? "#" : liveLink}
          // tabindex={disabled ? "-1" : "0"}
          className="group inline-block hover:text-skin-accent "
          // aria-label={ariaLabel}
          title={title}
          // aria-disabled={disabled}
        >
          Live
        </a>
      </div>
    </li>
  );
}
