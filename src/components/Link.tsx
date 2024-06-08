type LinkProps = {
  disabled?: boolean;
  href: string;
  title: string;
  label: string;
};

const Link = ({ disabled = false, href, title, label }: LinkProps) => {
  return (
    <a
      target="_blank"
      href={disabled ? "#" : href}
      // tabindex={disabled ? "-1" : "0"}
      className="group inline-block hover:text-skin-accent"
      // aria-label={ariaLabel}
      title={title}
      // aria-disabled={disabled}
    >
      {label}
    </a>
  );
};

export default Link;
