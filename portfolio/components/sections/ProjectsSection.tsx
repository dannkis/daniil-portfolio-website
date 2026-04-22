"use client";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { projects, type Project } from "@/lib/content";

type ProjectID = (typeof projects)[number]["id"];

interface Props {
  selectedProject?: Project;
  onProjectSelect: (id: ProjectID) => void;
  onProjectClose: () => void;
}

export default function ProjectsSection({
  selectedProject,
  onProjectSelect,
  onProjectClose,
}: Props) {
  return (
    <>
      <div className="flex justify-between">
        <motion.h1
          className="mb-6"
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {selectedProject ? selectedProject.name : "Projects"}
        </motion.h1>
        <AnimatePresence>
          {selectedProject && (
            <motion.button
              className="text-orange-400 hover:cursor-pointer"
              type="button"
              onClick={onProjectClose}
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

      <LayoutGroup id="projects-section">
        <div className="relative h-full overflow-hidden">
          <div
            className={`grid h-full grid-cols-1 items-center gap-6 transition-opacity duration-150 sm:grid-cols-3 lg:gap-x-6 lg:gap-y-10 ${
              selectedProject ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            {projects.map((project, i) => (
              <motion.button
                key={project.id}
                type="button"
                className="flex flex-col items-center hover:cursor-pointer"
                onClick={() => onProjectSelect(project.id)}
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
                {selectedProject?.id === project.id ? (
                  <div className="w-full overflow-hidden rounded-md opacity-0">
                    <img
                      className="w-full object-contain"
                      src={project.image.src}
                      alt={project.image.alt}
                      draggable={false}
                    />
                  </div>
                ) : (
                  <motion.div
                    className="w-full overflow-hidden rounded-md"
                    layoutId={`project-frame-${project.id}`}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 26,
                    }}
                  >
                    <motion.img
                      className="w-full object-contain"
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
                  </motion.div>
                )}
                <p className="subheading">{project.name}</p>
              </motion.button>
            ))}
          </div>

          <AnimatePresence initial={false}>
            {selectedProject && (
              <motion.div
                key={selectedProject.id}
                className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-md"
                layoutId={`project-frame-${selectedProject.id}`}
                initial={{ opacity: 0.96 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.96 }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
              >
                <motion.img
                  className="max-h-full w-full object-contain"
                  src={selectedProject.image.src}
                  alt={selectedProject.image.alt}
                  draggable={false}
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </>
  );
}
