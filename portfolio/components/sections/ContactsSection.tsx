import { about } from "@/lib/content";

function ContactItem({
  href,
  iconSrc,
  iconAlt,
  iconClassName,
  label,
}: {
  href?: string;
  iconSrc: string;
  iconAlt: string;
  iconClassName: string;
  label: string;
}) {
  const content = (
    <>
      <img src={iconSrc} alt={iconAlt} className={iconClassName} />
      <p className="text-body-compact">{label}</p>
    </>
  );

  if (!href) {
    return <div className="me-3 flex items-center">{content}</div>;
  }

  const isExternalLink =
    href.startsWith("http://") || href.startsWith("https://");

  return (
    <a
      href={href}
      className="me-3 flex items-center transition-opacity hover:opacity-80"
      aria-label={`Open ${label}`}
      target={isExternalLink ? "_blank" : undefined}
      rel={isExternalLink ? "noreferrer" : undefined}
    >
      {content}
    </a>
  );
}

export default function ContactsSection() {
  return (
    <>
      <div className="box-subcontainer flex items-center justify-center">
        <div className="flex aspect-square h-40 sm:h-full sm:max-w-full">
          <img
            className="object-contain select-none"
            src="/images/profile.webp"
            alt="Profile picture of me facing to the side, with a nice background in the nature."
          />
        </div>
      </div>
      <div className="box-subcontainer @container relative flex min-h-44 min-w-0 items-center pb-12 sm:min-h-0">
        <h1 className="text-display">
          Daniil <br /> Zhelyazkov
        </h1>
        <div className="absolute bottom-0 flex min-h-10 w-full flex-wrap items-center gap-x-3 gap-y-2">
          <ContactItem
            href={about.contacts?.linkedin}
            iconSrc="/images/icons/linkedin.svg"
            iconAlt="The original icon of the LinkedIn website."
            iconClassName="me-1 h-6"
            label="LinkedIn"
          />
          <ContactItem
            href={about.contacts?.github}
            iconSrc="/images/icons/github.svg"
            iconAlt="The original icon of the GitHub website."
            iconClassName="me-1 h-6"
            label="GitHub"
          />
          <ContactItem
            href={about.contacts?.email}
            iconSrc="/images/icons/email.svg"
            iconAlt="An email icon."
            iconClassName="me-1 h-5"
            label="Email"
          />
        </div>
      </div>
    </>
  );
}
