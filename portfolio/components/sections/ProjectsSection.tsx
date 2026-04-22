"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";

type ProjectID = (typeof projects)[number]["id"];

interface Props {
  onFocusChange?: (focused: boolean) => void;
}

export default function ProjectsSection({ onFocusChange }: Props) {
  const [expandedProjectID, setExpandedProjectID] = useState<ProjectID | null>(
    null,
  );
  const expandedProject = projects.find((p) => p.id === expandedProjectID);

  function expand(id: ProjectID) {
    setExpandedProjectID(id);
    onFocusChange?.(true);
  }

  function collapse() {
    setExpandedProjectID(null);
    onFocusChange?.(false);
  }

  return (
    <>
      <div className="flex justify-between">
        <motion.h1
          className="mb-6"
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {expandedProject ? expandedProject.name : "Projects"}
        </motion.h1>
        <AnimatePresence>
          {expandedProject && (
            <motion.button
              className="text-orange-400 hover:cursor-pointer"
              type="button"
              onClick={collapse}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              ✕
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div className="grid h-full grid-cols-3 items-center gap-x-6 gap-y-10 overflow-auto">
        <AnimatePresence mode="wait">
          {expandedProject ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
            >
              Expanded View for {expandedProject.name}
            </motion.div>
          ) : (
            <>
              {projects.map((project, i) => (
                <motion.button
                  key={project.id}
                  type="button"
                  className="flex flex-col items-center hover:cursor-pointer"
                  onClick={() => expand(project.id)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{
                    delay: i * 0.05,
                    type: "spring",
                    stiffness: 260,
                    damping: 24,
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="overflow-hidden rounded-md">
                    <motion.img
                      src={project.image.src}
                      alt={project.image.alt}
                      draggable={false}
                      whileHover={{ scale: 1.04 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 24,
                      }}
                    />
                  </div>
                  <p className="subheading">{project.name}</p>
                </motion.button>
              ))}
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
