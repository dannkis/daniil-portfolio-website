"use client";
import { motion, AnimatePresence } from "framer-motion";
import { about, type Education, type Project } from "@/lib/content";

interface Props {
  project?: Project;
  education?: Education;
}

export default function AboutSection({ project, education }: Props) {
  const contentKey = project
    ? `project-${project.id}`
    : education
      ? `education-${education.id}`
      : "about";
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
      <motion.h1
        key={`${contentKey}-title`}
        initial={{ opacity: 0, x: -10, filter: "blur(6px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
      >
        {title}
      </motion.h1>
      <div className="relative flex h-full items-center overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.p
            key={contentKey}
            className="text-sm leading-relaxed"
            initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -14, filter: "blur(8px)" }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
          >
            {text}
          </motion.p>
        </AnimatePresence>
      </div>
    </>
  );
}
