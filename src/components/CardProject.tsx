import type { ProjectFrontmatter } from "@content/_schemas";

export interface CardProjectProps {
  frontmatter: ProjectFrontmatter;
}

export default function CardProject({ frontmatter }: CardProjectProps) {
  const { title, image, description, github, liveLink } = frontmatter;

  const target = "_blank";
  const disabled = false;

  return (
    <li className="rounded-md border-2 border-skin-accent p-2 ">
      <div className="">
        {image && (
          <img
            className="h-48 w-96 object-contain"
            src={image.url}
            alt={image.alt}
          />
        )}
      </div>
      <h2 className="my-2">{title}</h2>
      <p>{description}</p>
      <div className="mt-3 flex flex-row gap-2">
        <a
          target={target}
          href={disabled ? "#" : github}
          // tabindex={disabled ? "-1" : "0"}
          className="group inline-block hover:text-skin-accent sm:text-skin-accent"
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
