"use client";
import { type SyntheticEvent, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  HoverMagnifierLens,
  useHoverMagnifier,
} from "@/components/HoverMagnifier";
import { projects, type Project } from "@/lib/content";

type ProjectID = (typeof projects)[number]["id"];

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
  const { magnifierState, magnifierScale, magnifierHandlers } = useHoverMagnifier(
    `${expandedProjectID ?? "none"}-${currentSlide}`,
  );

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

  function getExpandedProjectFrameStyle(projectID: ProjectID) {
    const aspectRatio = projectAspectRatios[projectID];

    if (!aspectRatio) {
      return undefined;
    }

    if (aspectRatio >= 1) {
      return {
        aspectRatio,
        width: "100%",
        maxWidth: "100%",
        maxHeight: "100%",
      };
    }

    return {
      aspectRatio,
      height: "100%",
      maxWidth: "100%",
      maxHeight: "100%",
    };
  }

  function getProjectImageClassName(projectID: ProjectID, expanded = false) {
    if (projectAspectRatios[projectID]) {
      return "absolute inset-0 h-full w-full object-contain";
    }

    return expanded
      ? "max-h-full w-full object-contain"
      : "w-full object-contain";
  }

  return (
    <>
      <div className="mb-6 flex h-8 items-center justify-between gap-3">
        <motion.h1
          className="section-title"
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {activeProject ? activeProject.name : "Projects"}
        </motion.h1>
        <AnimatePresence>
          {expandedProject && (
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
        <div className="relative z-10 h-full overflow-visible">
          <div
            className={`grid h-full grid-cols-1 items-center gap-6 transition-opacity duration-150 sm:grid-cols-3 lg:gap-x-6 lg:gap-y-10 ${
              expandedProject && !isProjectCollapsing
                ? "pointer-events-none opacity-0"
                : "opacity-100"
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
                    transition={{
                      type: "spring",
                      stiffness: 320,
                      damping: 28,
                    }}
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
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
              >
                <div className="relative flex h-full w-full items-center justify-center overflow-visible rounded-md">
                  <motion.div
                    className="relative overflow-visible rounded-md"
                    layoutId={`project-frame-${expandedProject.id}`}
                    style={getExpandedProjectFrameStyle(expandedProject.id)}
                    transition={{
                      type: "spring",
                      stiffness: 320,
                      damping: 28,
                    }}
                  >
                    <div
                      className="relative flex h-full w-full items-center justify-center overflow-visible rounded-md"
                      {...magnifierHandlers}
                    >
                      <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-md">
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.img
                            key={`${expandedProject.id}-${currentSlide}`}
                            className={getProjectImageClassName(
                              expandedProject.id,
                              true,
                            )}
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
                      <HoverMagnifierLens
                        src={expandedProjectImages[currentSlide].src}
                        magnifierState={magnifierState}
                        scale={magnifierScale}
                      />
                    </div>
                  </motion.div>

                  <AnimatePresence>
                    {!isProjectCollapsing && expandedProjectImages.length > 1 && (
                      <>
                        <motion.button
                          type="button"
                          className="text-body absolute top-1/2 left-0 z-20 inline-flex h-10 w-10 -translate-x-[35%] -translate-y-1/2 items-center justify-center rounded-full border border-foreground/20 bg-background/75 text-orange-400 backdrop-blur-sm hover:cursor-pointer"
                          onClick={showPreviousSlide}
                          aria-label="Show previous project image"
                          initial={{ opacity: 0, scale: 0.92 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.92 }}
                          transition={{ duration: 0.12 }}
                        >
                          ‹
                        </motion.button>
                        <motion.button
                          type="button"
                          className="text-body absolute top-1/2 right-0 z-20 inline-flex h-10 w-10 translate-x-[35%] -translate-y-1/2 items-center justify-center rounded-full border border-foreground/20 bg-background/75 text-orange-400 backdrop-blur-sm hover:cursor-pointer"
                          onClick={showNextSlide}
                          aria-label="Show next project image"
                          initial={{ opacity: 0, scale: 0.92 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.92 }}
                          transition={{ duration: 0.12 }}
                        >
                          ›
                        </motion.button>
                      </>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {!isProjectCollapsing && expandedProjectImages.length > 1 && (
                      <motion.div
                        className="absolute bottom-0 left-1/2 z-20 flex -translate-x-1/2 translate-y-[35%] gap-2 rounded-full border border-foreground/15 bg-background/70 px-3 py-2 backdrop-blur-sm"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.12 }}
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
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </>
  );
}
