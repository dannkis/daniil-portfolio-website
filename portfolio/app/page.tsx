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
const PROJECT_CONTROLS_EXIT_DURATION_MS = 100;
const FOCUS_REGION_TOLERANCE_PX = 28;

export default function Home() {
  const isDesktopLayout = useMediaQuery("(min-width: 64rem)");
  const projectFocus = useHoverFocusState<ProjectID>();
  const educationFocus = useHoverFocusState<EducationID>();
  const skillFocus = useHoverFocusState<SkillID>();
  const [focusedWindows, setFocusedWindows] = useState<FocusedWindows | null>(
    null,
  );
  const [collapsingProjectID, setCollapsingProjectID] =
    useState<ProjectID | null>(null);
  const collapseProjectTimeoutRef = useRef<number | null>(null);
  const visibleExpandedProjectID =
    projectFocus.expandedID ?? collapsingProjectID;
  const activeProject = projects.find(
    (project) => project.id === projectFocus.activeID,
  );
  const expandedProject = projects.find(
    (project) => project.id === visibleExpandedProjectID,
  );
  const isProjectCollapsing = collapsingProjectID !== null;
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

  function previewProject(projectID: ProjectID) {
    projectFocus.preview(projectID);
    educationFocus.clear();
    skillFocus.clear();
    setFocusedWindows(
      isDesktopLayout ? ["projects", "skills", "about"] : ["projects", "about"],
    );
  }

  function expandProject(projectID: ProjectID) {
    if (collapseProjectTimeoutRef.current !== null) {
      window.clearTimeout(collapseProjectTimeoutRef.current);
      collapseProjectTimeoutRef.current = null;
    }

    setCollapsingProjectID(null);
    projectFocus.expand(projectID);
    educationFocus.clear();
    skillFocus.clear();
    setFocusedWindows(
      isDesktopLayout ? ["projects", "skills", "about"] : ["projects", "about"],
    );
  }

  function collapseExpandedProject() {
    const currentExpandedProjectID = projectFocus.expandedID;

    if (!currentExpandedProjectID) {
      return;
    }

    if (collapseProjectTimeoutRef.current !== null) {
      window.clearTimeout(collapseProjectTimeoutRef.current);
    }

    setCollapsingProjectID(currentExpandedProjectID);
    projectFocus.collapseExpanded();
    collapseProjectTimeoutRef.current = window.setTimeout(() => {
      setCollapsingProjectID(null);
      collapseProjectTimeoutRef.current = null;
    }, PROJECT_CONTROLS_EXIT_DURATION_MS);
  }

  function previewEducation(educationID: EducationID) {
    if (!isDesktopLayout) {
      return;
    }

    educationFocus.preview(educationID);
    collapseExpandedProject();
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
    collapseExpandedProject();
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
    collapseExpandedProject();
    projectFocus.clearActive();
    setFocusedWindows(["projects", "skills", "education", "about"]);
  }

  function clearFocus() {
    educationFocus.clear();
    collapseExpandedProject();
    projectFocus.clearActive();
    skillFocus.clear();
    setFocusedWindows(null);
  }

  function pointerIsInsideFocusedRegion(x: number, y: number) {
    const focusedElements = Array.from(
      document.querySelectorAll<HTMLElement>(".focus-window-active"),
    );

    if (focusedElements.length === 0) {
      return false;
    }

    return focusedElements.some((element) => {
      const rect = element.getBoundingClientRect();

      return (
        x >= rect.left - FOCUS_REGION_TOLERANCE_PX &&
        x <= rect.right + FOCUS_REGION_TOLERANCE_PX &&
        y >= rect.top - FOCUS_REGION_TOLERANCE_PX &&
        y <= rect.bottom + FOCUS_REGION_TOLERANCE_PX
      );
    });
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
              isProjectCollapsing={isProjectCollapsing}
              onProjectHover={previewProject}
              onProjectExpand={expandProject}
              onProjectCollapse={collapseExpandedProject}
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
                    placeholder="Add a certificateImage for this skill in content/skills.json."
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
                    placeholder="no image added"
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
    </main>
  );
}
