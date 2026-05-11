"use client";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import AboutSection from "@/components/sections/AboutSection";
import ContactsSection from "@/components/sections/ContactsSection";
import PreviewPanel from "@/components/PreviewPanel";
import EducationSection from "@/components/sections/EducationSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useHoverFocusState } from "@/hooks/useHoverFocusState";
import { education, projects, skills } from "@/lib/content";
import { type FocusedWindows, getFocusWindowProps } from "@/lib/focusWindow";

type ProjectID = (typeof projects)[number]["id"];
type EducationID = (typeof education)[number]["id"];
type SkillID = (typeof skills)[number]["id"];
type ProjectClosePhase = "idle" | "preparing" | "collapsing";
type FocusRegionSide = "left" | "right" | "top" | "bottom";
const PROJECT_COLLAPSE_FALLBACK_MS = 700;
const FOCUS_REGION_TOLERANCE_PX = 80;
const FOCUS_REGION_OUTSIDE_TOLERANCE_PX = 10;

function rangesOverlap(
  startA: number,
  endA: number,
  startB: number,
  endB: number,
) {
  return (
    startA <= endB + FOCUS_REGION_TOLERANCE_PX &&
    endA >= startB - FOCUS_REGION_TOLERANCE_PX
  );
}

function rectHasNeighborOnSide(
  rect: DOMRect,
  side: FocusRegionSide,
  rects: DOMRect[],
) {
  return rects.some((otherRect) => {
    if (otherRect === rect) {
      return false;
    }

    if (side === "left" || side === "right") {
      const gap =
        side === "left"
          ? rect.left - otherRect.right
          : otherRect.left - rect.right;

      return (
        gap >= 0 &&
        gap <= FOCUS_REGION_TOLERANCE_PX &&
        rangesOverlap(rect.top, rect.bottom, otherRect.top, otherRect.bottom)
      );
    }

    const gap =
      side === "top"
        ? rect.top - otherRect.bottom
        : otherRect.top - rect.bottom;

    return (
      gap >= 0 &&
      gap <= FOCUS_REGION_TOLERANCE_PX &&
      rangesOverlap(rect.left, rect.right, otherRect.left, otherRect.right)
    );
  });
}

function getFocusRegionTolerance(
  rect: DOMRect,
  side: FocusRegionSide,
  rects: DOMRect[],
) {
  return rectHasNeighborOnSide(rect, side, rects)
    ? FOCUS_REGION_TOLERANCE_PX
    : FOCUS_REGION_OUTSIDE_TOLERANCE_PX;
}

function pointIsInsideFocusRect(
  x: number,
  y: number,
  rect: DOMRect,
  rects: DOMRect[],
) {
  return (
    x >= rect.left - getFocusRegionTolerance(rect, "left", rects) &&
    x <= rect.right + getFocusRegionTolerance(rect, "right", rects) &&
    y >= rect.top - getFocusRegionTolerance(rect, "top", rects) &&
    y <= rect.bottom + getFocusRegionTolerance(rect, "bottom", rects)
  );
}

export default function Home() {
  const isDesktopLayout = useMediaQuery("(min-width: 64rem)");
  const projectFocus = useHoverFocusState<ProjectID>();
  const educationFocus = useHoverFocusState<EducationID>();
  const skillFocus = useHoverFocusState<SkillID>();
  const [focusedWindows, setFocusedWindows] = useState<FocusedWindows | null>(
    null,
  );
  const [closingProjectID, setClosingProjectID] = useState<ProjectID | null>(
    null,
  );
  const closingProjectIDRef = useRef<ProjectID | null>(null);
  const [projectClosePhase, setProjectClosePhase] =
    useState<ProjectClosePhase>("idle");
  const projectClosePhaseRef = useRef<ProjectClosePhase>("idle");
  const collapseSettleTimeoutRef = useRef<number | null>(null);
  const activeProject = projects.find(
    (project) => project.id === projectFocus.activeID,
  );
  const expandedProject = projects.find(
    (project) => project.id === projectFocus.expandedID,
  );
  const selectedEducation = isDesktopLayout
    ? education.find((entry) => entry.id === educationFocus.activeID)
    : undefined;
  const visibleSkillID = skillFocus.expandedID ?? skillFocus.activeID;
  const activeSkill = skills.find((skill) => skill.id === visibleSkillID);
  const selectedSkillID = skillFocus.expandedID;
  const activeFocusedWindows =
    !isDesktopLayout && focusedWindows?.includes("education")
      ? null
      : focusedWindows;

  function clearProjectCloseTimers() {
    if (collapseSettleTimeoutRef.current !== null) {
      window.clearTimeout(collapseSettleTimeoutRef.current);
      collapseSettleTimeoutRef.current = null;
    }
  }

  function updateProjectClosePhase(phase: ProjectClosePhase) {
    projectClosePhaseRef.current = phase;
    setProjectClosePhase(phase);
  }

  function updateClosingProjectID(projectID: ProjectID | null) {
    closingProjectIDRef.current = projectID;
    setClosingProjectID(projectID);
  }

  function completeProjectClose(projectID?: ProjectID) {
    if (projectID && closingProjectIDRef.current !== projectID) {
      return;
    }

    clearProjectCloseTimers();

    updateProjectClosePhase("idle");
    updateClosingProjectID(null);
  }

  function cancelProjectClose() {
    clearProjectCloseTimers();

    updateProjectClosePhase("idle");
    updateClosingProjectID(null);
  }

  function unfocusAll({ keepExpandedProject = false } = {}) {
    educationFocus.clear();
    if (keepExpandedProject) {
      projectFocus.clearActive();
    } else {
      projectFocus.clear();
    }
    skillFocus.clear();
    setFocusedWindows(null);
  }

  function startProjectCollapseAnimation() {
    if (projectClosePhaseRef.current !== "preparing") {
      return;
    }

    const projectID = closingProjectIDRef.current;

    if (!projectID) {
      return;
    }

    updateProjectClosePhase("collapsing");
    projectFocus.collapseExpanded();
    collapseSettleTimeoutRef.current = window.setTimeout(
      () => completeProjectClose(projectID),
      PROJECT_COLLAPSE_FALLBACK_MS,
    );
  }

  function closeProject({ unfocusBeforeCollapse = false } = {}) {
    if (projectClosePhaseRef.current !== "idle") {
      return;
    }

    if (!projectFocus.expandedID) {
      if (unfocusBeforeCollapse) {
        unfocusAll();
      }

      return;
    }

    clearProjectCloseTimers();

    const projectID = projectFocus.expandedID;

    updateClosingProjectID(projectID);

    if (unfocusBeforeCollapse) {
      updateProjectClosePhase("preparing");
      unfocusAll({ keepExpandedProject: true });
      return;
    }

    updateProjectClosePhase("collapsing");
    projectFocus.collapseExpanded();
    collapseSettleTimeoutRef.current = window.setTimeout(
      () => completeProjectClose(projectID),
      PROJECT_COLLAPSE_FALLBACK_MS,
    );
  }

  function resetFocusState() {
    unfocusAll();
  }

  function previewProject(projectID: ProjectID) {
    projectFocus.preview(projectID);
    educationFocus.clear();
    skillFocus.clear();
    setFocusedWindows(
      isDesktopLayout ? ["projects", "skills", "about"] : ["projects", "about"],
    );
  }

  function expandProject(projectID: ProjectID) {
    cancelProjectClose();
    projectFocus.expand(projectID);
    educationFocus.clear();
    skillFocus.clear();
    setFocusedWindows(
      isDesktopLayout ? ["projects", "skills", "about"] : ["projects", "about"],
    );
  }

  function collapseExpandedProject() {
    closeProject({ unfocusBeforeCollapse: true });
  }

  function previewEducation(educationID: EducationID) {
    if (!isDesktopLayout) {
      return;
    }

    educationFocus.preview(educationID);
    closeProject();
    projectFocus.clearActive();
    skillFocus.clear();
    setFocusedWindows(["education", "skills", "about"]);
  }

  function previewSkill(skillID: SkillID) {
    if (!isDesktopLayout) {
      return;
    }

    if (skillFocus.expandedID && skillFocus.expandedID !== skillID) {
      return;
    }

    skillFocus.preview(skillID);
    if (projectFocus.expandedID) {
      setFocusedWindows(["projects", "skills", "education", "about"]);
      return;
    }

    educationFocus.clear();
    closeProject();
    projectFocus.clearActive();
    setFocusedWindows(["projects", "skills", "education", "about"]);
  }

  function selectSkill(skillID: SkillID) {
    if (!isDesktopLayout) {
      return;
    }

    if (projectFocus.expandedID) {
      return;
    }

    skillFocus.expand(skillID);

    educationFocus.clear();
    closeProject();
    projectFocus.clearActive();
    setFocusedWindows(["projects", "skills", "education", "about"]);
  }

  function clearFocus() {
    const shouldDeferWindowReset =
      projectFocus.expandedID !== null || closingProjectID !== null;

    if (shouldDeferWindowReset) {
      closeProject({ unfocusBeforeCollapse: true });
      return;
    }

    resetFocusState();
  }

  function pointerIsInsideFocusedRegion(x: number, y: number) {
    const focusedRects = Array.from(
      document.querySelectorAll<HTMLElement>(".focus-window-active"),
      (element) => element.getBoundingClientRect(),
    );

    if (focusedRects.length === 0) {
      return false;
    }

    return focusedRects.some((rect) =>
      pointIsInsideFocusRect(x, y, rect, focusedRects),
    );
  }

  function handlePointerDown(event: React.PointerEvent<HTMLElement>) {
    if (!activeFocusedWindows) {
      return;
    }

    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    if (target.closest(".focus-window-active")) {
      return;
    }

    clearFocus();
  }

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (!activeFocusedWindows) {
      return;
    }

    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    if (target.closest(".focus-window-active")) {
      return;
    }

    if (pointerIsInsideFocusedRegion(event.clientX, event.clientY)) {
      return;
    }

    clearFocus();
  }

  return (
    <main
      className={`box-border min-h-screen px-3 py-3 transition-all duration-500 sm:px-4 sm:py-5 md:px-4 md:py-7 lg:h-screen lg:min-h-200 lg:px-10 lg:py-8 xl:px-16 xl:py-10 2xl:px-24 2xl:py-12 ${
        activeFocusedWindows ? "focus-window-open" : ""
      }`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
    >
      <div className="mx-auto grid h-full max-w-[112rem] auto-rows-auto grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:grid-rows-5">
        <div
          {...getFocusWindowProps(
            "min-h-80 sm:col-span-2 lg:col-span-2 lg:row-span-2 lg:min-h-0 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-12",
            "contacts",
            activeFocusedWindows,
          )}
          id="contacts"
        >
          <ContactsSection />
        </div>

        <div
          {...getFocusWindowProps(
            "min-h-96 sm:col-span-2 lg:col-span-2 lg:row-span-3 lg:min-h-0",
            "projects",
            activeFocusedWindows,
          )}
          id="projects"
        >
          <div className="box-subcontainer flex flex-col">
            <ProjectsSection
              activeProject={activeProject}
              expandedProject={expandedProject}
              activeSkillID={!activeProject ? activeSkill?.id : null}
              projectClosePhase={projectClosePhase}
              onProjectHover={previewProject}
              onProjectExpand={expandProject}
              onProjectCollapse={collapseExpandedProject}
              onProjectCloseTargetReady={startProjectCollapseAnimation}
              onProjectCollapseComplete={completeProjectClose}
            />
          </div>
        </div>

        <div
          {...getFocusWindowProps(
            "hidden min-h-[30rem] lg:row-span-3 lg:block lg:min-h-0",
            "education",
            activeFocusedWindows,
          )}
          id="education"
        >
          <div className="box-subcontainer flex flex-col">
            {selectedEducation ? (
              <EducationSection
                selectedEducation={selectedEducation}
                onEducationSelect={previewEducation}
              />
            ) : activeSkill ? (
              <>
                <motion.h1
                  className="section-title mb-4"
                  layout
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  Certificate
                </motion.h1>
                <div className="relative min-h-0 flex-1 overflow-visible">
                  <PreviewPanel
                    contentKey={activeSkill.id}
                    image={activeSkill.certificateImage}
                    placeholder="no certificate"
                  />
                </div>
              </>
            ) : (
              <EducationSection onEducationSelect={previewEducation} />
            )}
          </div>
        </div>

        <div
          {...getFocusWindowProps(
            "hidden min-h-[36rem] !px-3 !py-4 lg:col-span-1 lg:row-span-3 lg:block lg:min-h-0 lg:!px-8 lg:!py-8",
            "skills",
            activeFocusedWindows,
          )}
          id="skills"
        >
          <div className="box-subcontainer flex flex-col">
            {selectedEducation ? (
              <>
                <motion.h1
                  className="section-title mb-2 leading-none sm:mb-3 lg:mb-4"
                  layout
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  Certificate
                </motion.h1>
                <div className="relative min-h-0 flex-1 overflow-visible">
                  <PreviewPanel
                    contentKey={selectedEducation.id}
                    image={selectedEducation.certificateImage}
                    images={selectedEducation.certificateImages}
                    placeholder="no image"
                  />
                </div>
              </>
            ) : (
              <SkillsSection
                activeSkillID={activeSkill?.id}
                selectedSkillID={selectedSkillID}
                stackSkillIDs={activeProject?.skills}
                onSkillHover={previewSkill}
                onSkillSelect={selectSkill}
              />
            )}
          </div>
        </div>

        <div
          {...getFocusWindowProps(
            "min-h-72 sm:col-span-2 lg:col-span-2 lg:row-span-2 lg:min-h-0",
            "about",
            activeFocusedWindows,
          )}
          id="about"
        >
          <div className="box-subcontainer flex flex-col">
            <AboutSection
              project={activeProject}
              education={selectedEducation}
              skill={
                !activeProject && !selectedEducation ? activeSkill : undefined
              }
            />
          </div>
        </div>
      </div>
      <p className="pointer-events-none fixed bottom-1 left-1 z-50 text-xs text-foreground/30 sm:bottom-3 sm:left-4">
        2026 @ Daniil Zhelyazkov. All rights reserved.
      </p>
    </main>
  );
}
