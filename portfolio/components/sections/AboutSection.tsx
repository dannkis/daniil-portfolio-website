import { about, type Project } from "@/lib/content";

interface Props {
  project?: Project;
}

export default function AboutSection({ project }: Props) {
  return (
    <>
      <h1>{project ? "About Project" : "About"}</h1>
      <p className="flex h-full items-center text-sm leading-relaxed">
        {project ? project.description : about.text}
      </p>
    </>
  );
}
