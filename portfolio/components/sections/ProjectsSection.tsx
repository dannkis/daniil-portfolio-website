"use client";
import { type SyntheticEvent, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  HoverMagnifierLens,
  useHoverMagnifier,
} from "@/components/HoverMagnifier";
import { projects, type Project } from "@/lib/content";

type ProjectID = (typeof projects)[number]["id"];

const PROJECT_FRAME_TRANSITION = {
  type: "spring",
  stiffness: 520,
  damping: 30,
  mass: 0.8,
} as const;

const PROJECT_OVERLAY_FADE_TRANSITION = {
  duration: 0.12,
  ease: "easeOut",
} as const;

interface Props {
  activeProject?: Project;
  expandedProject?: Project;
  activeSkillID?: string | null;
  isProjectCollapsing?: boolean;
  onProjectHover: (id: ProjectID) => void;
  onProjectExpand: (id: ProjectID) => void;
  onProjectCollapse: () => void;
}

export default function ProjectsSection({
  activeProject,
  expandedProject,
  activeSkillID,
  isProjectCollapsing = false,
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
  const [projectAspectRatios, setProjectAspectRatios] = useState<
    Partial<Record<ProjectID, number>>
  >({});
  const expandedProjectImages =
    expandedProject && expandedProject.gallery?.length
      ? expandedProject.gallery
      : expandedProject
        ? [expandedProject.image]
        : [];
  const expandedProjectID = expandedProject?.id ?? null;
  const isSkillProjectHighlightMode = !activeProject && !!activeSkillID;
  const currentSlide =
    carouselState.projectID === expandedProjectID
      ? Math.min(
          carouselState.slide,
          Math.max(expandedProjectImages.length - 1, 0),
        )
      : 0;
  const { magnifierState, magnifierScale, magnifierHandlers } =
    useHoverMagnifier(`${expandedProjectID ?? "none"}-${currentSlide}`);

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

  function updateProjectAspectRatio(projectID: ProjectID, src: string) {
    return (event: SyntheticEvent<HTMLImageElement>) => {
      const image = event.currentTarget;

      if (
        image.naturalWidth === 0 ||
        image.naturalHeight === 0 ||
        image.currentSrc !== src
      ) {
        return;
      }

      const aspectRatio = image.naturalWidth / image.naturalHeight;

      setProjectAspectRatios((currentRatios) => {
        if (currentRatios[projectID] === aspectRatio) {
          return currentRatios;
        }

        return {
          ...currentRatios,
          [projectID]: aspectRatio,
        };
      });
    };
  }

  function getProjectFrameStyle(projectID: ProjectID) {
    const aspectRatio = projectAspectRatios[projectID];

    return aspectRatio ? { aspectRatio } : undefined;
  }

  function getProjectImageClassName(projectID: ProjectID) {
    if (projectAspectRatios[projectID]) {
      return "absolute inset-0 h-full w-full object-contain";
    }

    return "h-auto w-full object-contain";
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="mb-6 flex h-8 shrink-0 items-center justify-between gap-3">
        <motion.h1
          className="section-title"
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {activeProject ? activeProject.name : "Projects"}
        </motion.h1>
        <AnimatePresence>
          {expandedProject && !isProjectCollapsing && (
            <motion.button
              className="text-label inline-flex h-6 w-6 items-center justify-center overflow-hidden rounded-sm border border-foreground/20 bg-background/75 text-orange-400 backdrop-blur-sm hover:cursor-pointer"
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
        <div className="relative z-10 min-h-72 flex-1 overflow-hidden sm:min-h-80 lg:min-h-0">
          <div
            className={`grid min-h-full grid-cols-1 items-center gap-6 transition-opacity duration-150 sm:grid-cols-3 lg:h-full lg:gap-x-6 lg:gap-y-10 ${
              expandedProject && !isProjectCollapsing
                ? "pointer-events-none absolute inset-0 opacity-0"
                : `relative opacity-100 ${isProjectCollapsing ? "pointer-events-none" : ""}`
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
                animate={{
                  opacity: isSkillProjectHighlightMode
                    ? project.skills.includes(activeSkillID)
                      ? 1
                      : 0.3
                    : 1,
                  filter: isSkillProjectHighlightMode
                    ? project.skills.includes(activeSkillID)
                      ? "grayscale(0%) brightness(1)"
                      : "grayscale(100%) brightness(0.45)"
                    : "grayscale(0%) brightness(1)",
                  scale: isSkillProjectHighlightMode
                    ? project.skills.includes(activeSkillID)
                      ? 1.03
                      : 0.98
                    : 1,
                  y: 0,
                }}
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
                  <div
                    className="relative w-full overflow-hidden rounded-md opacity-0"
                    style={getProjectFrameStyle(project.id)}
                  >
                    <img
                      className={getProjectImageClassName(project.id)}
                      src={project.image.src}
                      alt={project.image.alt}
                      draggable={false}
                      onLoad={updateProjectAspectRatio(
                        project.id,
                        project.image.src,
                      )}
                    />
                  </div>
                ) : (
                  <motion.div
                    className="relative w-full overflow-hidden rounded-md"
                    layoutId={`project-frame-${project.id}`}
                    style={getProjectFrameStyle(project.id)}
                    transition={PROJECT_FRAME_TRANSITION}
                  >
                    <motion.img
                      className={getProjectImageClassName(project.id)}
                      src={project.image.src}
                      alt={project.image.alt}
                      draggable={false}
                      onLoad={updateProjectAspectRatio(
                        project.id,
                        project.image.src,
                      )}
                      whileHover={{ scale: 1.04 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 24,
                      }}
                    />
                  </motion.div>
                )}
                <p className="text-xs">{project.name}</p>
              </motion.button>
            ))}
          </div>

          <AnimatePresence initial={false}>
            {expandedProject && (
              <motion.div
                key={expandedProject.id}
                className={`absolute inset-0 z-20 ${
                  isProjectCollapsing ? "pointer-events-none" : ""
                }`}
                initial={{ opacity: 0.96 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.96 }}
                transition={PROJECT_OVERLAY_FADE_TRANSITION}
              >
                <div className="relative flex h-full min-h-0 w-full min-w-0 items-center justify-center overflow-hidden rounded-md p-2 sm:p-3 md:p-4">
                  <motion.div
                    className="relative h-full min-h-0 w-full min-w-0 overflow-visible rounded-md"
                    layoutId={`project-frame-${expandedProject.id}`}
                    transition={PROJECT_FRAME_TRANSITION}
                  >
                    <div
                      className="relative flex h-full min-h-0 w-full min-w-0 items-center justify-center overflow-visible rounded-md"
                      {...magnifierHandlers}
                    >
                      <div className="flex h-full min-h-0 w-full min-w-0 items-center justify-center overflow-hidden rounded-md">
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.img
                            key={`${expandedProject.id}-${currentSlide}`}
                            className="h-full w-full object-contain"
                            src={expandedProjectImages[currentSlide].src}
                            alt={expandedProjectImages[currentSlide].alt}
                            draggable={false}
                            onLoad={updateProjectAspectRatio(
                              expandedProject.id,
                              expandedProjectImages[currentSlide].src,
                            )}
                            initial={{ opacity: 0, x: 18 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -18 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                          />
                        </AnimatePresence>
                      </div>
                      {!isProjectCollapsing && (
                        <HoverMagnifierLens
                          src={expandedProjectImages[currentSlide].src}
                          magnifierState={magnifierState}
                          scale={magnifierScale}
                        />
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {expandedProject &&
            !isProjectCollapsing &&
            expandedProjectImages.length > 1 && (
              <>
                <motion.button
                  type="button"
                  className="text-body absolute top-1/2 left-2 z-30 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/20 bg-background/75 text-orange-400 backdrop-blur-sm hover:cursor-pointer sm:left-3 sm:h-10 sm:w-10 md:left-4"
                  onClick={showPreviousSlide}
                  aria-label="Show previous project image"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.08 }}
                >
                  ‹
                </motion.button>
                <motion.button
                  type="button"
                  className="text-body absolute top-1/2 right-2 z-30 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/20 bg-background/75 text-orange-400 backdrop-blur-sm hover:cursor-pointer sm:right-3 sm:h-10 sm:w-10 md:right-4"
                  onClick={showNextSlide}
                  aria-label="Show next project image"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.08 }}
                >
                  ›
                </motion.button>
                <motion.div
                  className="absolute bottom-2 left-1/2 z-30 flex -translate-x-1/2 gap-2 rounded-full border border-foreground/15 bg-background/70 px-3 py-2 backdrop-blur-sm sm:bottom-3 md:bottom-4"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.08 }}
                >
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
                </motion.div>
              </>
            )}
        </div>
      </LayoutGroup>
    </div>
  );
}
