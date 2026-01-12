import type { Project } from "@/types/data";

type ProjectCardProps = Pick<Project, "name" | "image">;

export default function ProjectCard({ name, image }: ProjectCardProps) {
  return (
    <div className="flex flex-col items-center">
      <div>
        <img
          src={image.src}
          alt={image.alt}
          className="transition hover:scale-[1.02]"
        />
      </div>
      <p className="subheading">{name}</p>
    </div>
  );
}
