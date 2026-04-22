import { about, type Education, type Project } from "@/lib/content";

interface Props {
  project?: Project;
  education?: Education;
}

export default function AboutSection({ project, education }: Props) {
  const title = project
    ? "About Project"
    : education
      ? "About Education"
      : "About";
  const text = project
    ? project.description
    : education
      ? education.description
      : about.text;

  return (
    <>
      <h1>{title}</h1>
      <p className="flex h-full items-center text-sm leading-relaxed">{text}</p>
    </>
  );
}
