"use client";
import { motion, AnimatePresence } from "framer-motion";
import { about, type Education, type Project, type Skill } from "@/lib/content";

interface Props {
  project?: Project;
  education?: Education;
  skill?: Skill;
}

type ProjectLink = {
  href: string;
  label: string;
};

export default function AboutSection({ project, education, skill }: Props) {
  const projectLinks = project
    ? [
        {
          href: project.links?.repository,
          label: "GitHub Repo",
        },
        {
          href: project.links?.release,
          label: "Release",
        },
        {
          href: project.links?.website,
          label: "App",
        },
      ].filter(
        (link): link is ProjectLink =>
          typeof link.href === "string" && link.href.length > 0,
      )
    : [];
  const contentKey = project
    ? `project-${project.id}`
    : education
      ? `education-${education.id}`
      : skill
        ? `skill-${skill.id}`
        : "about";
  const text = project
    ? project.description
    : education
      ? education.description
      : skill
        ? (skill.description ??
          "No description for this skill in content/skills.json.")
        : about.text;

  return (
    <>
      <h1>About</h1>
      <div className="relative flex h-full items-center overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={contentKey}
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -14, filter: "blur(8px)" }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
          >
            <p className="text-sm">{text}</p>
            {projectLinks.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {projectLinks.map((link) => (
                  <a
                    key={link.label}
                    className="text-label inline-flex items-center rounded-md border border-foreground/20 px-3 py-2 text-orange-400 transition-colors hover:border-orange-400/40 hover:text-orange-300"
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
