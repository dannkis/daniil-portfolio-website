"use client";
import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { projects, type Project } from "@/lib/content";

type ProjectID = (typeof projects)[number]["id"];

interface Props {
  activeProject?: Project;
  expandedProject?: Project;
  onProjectHover: (id: ProjectID) => void;
  onProjectExpand: (id: ProjectID) => void;
  onProjectCollapse: () => void;
}

export default function ProjectsSection({
  activeProject,
  expandedProject,
  onProjectHover,
  onProjectExpand,
  onProjectCollapse,
}: Props) {
  const [carouselState, setCarouselState] = useState<{
    projectID: ProjectID | null;
    slide: number;
  }>({
    projectID: null,
    slide: 0,
  });
  const expandedProjectImages =
    expandedProject && expandedProject.gallery?.length
      ? expandedProject.gallery
      : expandedProject
        ? [expandedProject.image]
        : [];
  const expandedProjectID = expandedProject?.id ?? null;
  const currentSlide =
    carouselState.projectID === expandedProjectID
      ? Math.min(
          carouselState.slide,
          Math.max(expandedProjectImages.length - 1, 0),
        )
      : 0;

  function setSlide(slide: number) {
    setCarouselState({
      projectID: expandedProjectID,
      slide,
    });
  }

  function showPreviousSlide() {
    setSlide(
      currentSlide === 0 ? expandedProjectImages.length - 1 : currentSlide - 1,
    );
  }

  function showNextSlide() {
    setSlide(
      currentSlide === expandedProjectImages.length - 1 ? 0 : currentSlide + 1,
    );
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-3">
        <motion.h1
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {activeProject ? activeProject.name : "Projects"}
        </motion.h1>
        <AnimatePresence>
          {expandedProject && (
            <motion.button
              className="text-label inline-flex h-8 w-8 items-center justify-center rounded-sm border border-foreground/20 bg-background/75 text-orange-400 backdrop-blur-sm hover:cursor-pointer"
              type="button"
              onClick={onProjectCollapse}
              initial={{ opacity: 0, scale: 0.86 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.86 }}
              transition={{ duration: 0.15 }}
            >
              ✕
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <LayoutGroup id="projects-section">
        <div className="relative z-10 h-full overflow-visible">
          <div
            className={`grid h-full grid-cols-1 items-center gap-6 transition-opacity duration-150 sm:grid-cols-3 lg:gap-x-6 lg:gap-y-10 ${
              expandedProject ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            {projects.map((project, i) => (
              <motion.button
                key={project.id}
                type="button"
                className="flex flex-col items-center hover:cursor-pointer"
                onMouseEnter={() => onProjectHover(project.id)}
                onClick={() => onProjectExpand(project.id)}
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
                {expandedProject?.id === project.id ? (
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
                <p className="text-label">{project.name}</p>
              </motion.button>
            ))}
          </div>

          <AnimatePresence initial={false}>
            {expandedProject && (
              <motion.div
                key={expandedProject.id}
                className="absolute inset-0 z-20 flex items-center justify-center overflow-visible rounded-md"
                layoutId={`project-frame-${expandedProject.id}`}
                initial={{ opacity: 0.96 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.96 }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
              >
                <div className="relative flex h-full w-full items-center justify-center overflow-visible rounded-md">
                  {expandedProjectImages.length > 1 && (
                    <>
                      <button
                        type="button"
                        className="text-body absolute top-1/2 left-0 z-20 inline-flex h-10 w-10 -translate-x-[35%] -translate-y-1/2 items-center justify-center rounded-full border border-foreground/20 bg-background/75 text-orange-400 backdrop-blur-sm hover:cursor-pointer"
                        onClick={showPreviousSlide}
                        aria-label="Show previous project image"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        className="text-body absolute top-1/2 right-0 z-20 inline-flex h-10 w-10 translate-x-[35%] -translate-y-1/2 items-center justify-center rounded-full border border-foreground/20 bg-background/75 text-orange-400 backdrop-blur-sm hover:cursor-pointer"
                        onClick={showNextSlide}
                        aria-label="Show next project image"
                      >
                        ›
                      </button>
                    </>
                  )}

                  <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-md">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.img
                        key={`${expandedProject.id}-${currentSlide}`}
                        className="max-h-full w-full object-contain"
                        src={expandedProjectImages[currentSlide].src}
                        alt={expandedProjectImages[currentSlide].alt}
                        draggable={false}
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -18 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                      />
                    </AnimatePresence>
                  </div>

                  {expandedProjectImages.length > 1 && (
                    <div className="absolute bottom-0 left-1/2 z-20 flex -translate-x-1/2 translate-y-[35%] gap-2 rounded-full border border-foreground/15 bg-background/70 px-3 py-2 backdrop-blur-sm">
                      {expandedProjectImages.map((image, index) => (
                        <button
                          key={`${image.src}-${index}`}
                          type="button"
                          className={`h-2.5 w-2.5 rounded-full transition-colors hover:cursor-pointer ${
                            currentSlide === index
                              ? "bg-orange-400"
                              : "bg-foreground/30"
                          }`}
                          aria-label={`Show project image ${index + 1}`}
                          onClick={() => setSlide(index)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </>
  );
}
