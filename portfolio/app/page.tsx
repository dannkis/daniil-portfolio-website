"use client";
import { useState } from "react";
import AboutSection from "@/components/sections/AboutSection";
import ContactsSection from "@/components/sections/ContactsSection";
import EducationSection from "@/components/sections/EducationSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { education, projects, skills } from "@/lib/content";
import { type FocusedWindows, getFocusWindowProps } from "@/lib/focusWindow";

type ProjectID = (typeof projects)[number]["id"];
type EducationID = (typeof education)[number]["id"];
type SkillID = (typeof skills)[number]["id"];

export default function Home() {
  const isDesktopLayout = useMediaQuery("(min-width: 64rem)");
  const [focusedWindows, setFocusedWindows] = useState<FocusedWindows | null>(
    null,
  );
  const [selectedProjectID, setSelectedProjectID] = useState<ProjectID | null>(
    null,
  );
  const [selectedEducationID, setSelectedEducationID] =
    useState<EducationID | null>(null);
  const [selectedSkillID, setSelectedSkillID] = useState<SkillID | null>(null);
  const selectedProject = projects.find(
    (project) => project.id === selectedProjectID,
  );
  const selectedEducation = isDesktopLayout
    ? education.find((entry) => entry.id === selectedEducationID)
    : undefined;
  const activeFocusedWindows =
    !isDesktopLayout && focusedWindows?.includes("education")
      ? null
      : focusedWindows;

  function focusProject(projectID: ProjectID) {
    setSelectedProjectID(projectID);
    setSelectedEducationID(null);
    setSelectedSkillID(null);
    setFocusedWindows(["projects", "skills", "about"]);
  }

  function focusEducation(educationID: EducationID) {
    if (!isDesktopLayout) {
      return;
    }

    setSelectedEducationID(educationID);
    setSelectedProjectID(null);
    setSelectedSkillID(null);
    setFocusedWindows(["education", "about"]);
  }

  function selectSkill(skillID: SkillID, focused: boolean) {
    setSelectedSkillID(skillID);

    if (focused) {
      setSelectedEducationID(null);
      setSelectedProjectID(null);
      setFocusedWindows(["skills"]);
    }
  }

  function closeSkill(focused: boolean) {
    setSelectedSkillID(null);

    if (focused) {
      setFocusedWindows(null);
    }
  }

  function clearFocus() {
    setSelectedEducationID(null);
    setSelectedProjectID(null);
    setSelectedSkillID(null);
    setFocusedWindows(null);
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

  return (
    <main
      className={`box-border min-h-screen px-3 py-3 transition-all duration-500 sm:px-4 sm:py-5 md:px-4 md:py-7 lg:h-screen lg:min-h-200 lg:px-10 lg:py-8 xl:px-16 xl:py-10 2xl:px-24 2xl:py-12 ${
        activeFocusedWindows ? "focus-window-open" : ""
      }`}
      onPointerDown={handlePointerDown}
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
              selectedProject={selectedProject}
              onProjectSelect={focusProject}
              onProjectClose={clearFocus}
            />
          </div>
        </div>

        <div
          {...getFocusWindowProps(
            selectedEducation
              ? "hidden min-h-[30rem] sm:col-span-2 lg:col-span-2 lg:row-span-3 lg:block lg:min-h-0"
              : "hidden min-h-[30rem] lg:row-span-3 lg:block lg:min-h-0",
            "education",
            activeFocusedWindows,
          )}
          id="education"
        >
          <div className="box-subcontainer flex flex-col">
            <EducationSection
              selectedEducation={selectedEducation}
              onEducationSelect={focusEducation}
              onEducationClose={clearFocus}
            />
          </div>
        </div>

        {!selectedEducation && (
          <div
            {...getFocusWindowProps(
              "min-h-[36rem] !px-3 !py-4 sm:col-span-2 sm:min-h-[34rem] sm:!px-4 sm:!py-5 md:min-h-[36rem] md:!px-5 lg:col-span-1 lg:row-span-3 lg:min-h-0 lg:!px-8 lg:!py-8",
              "skills",
              activeFocusedWindows,
            )}
            id="skills"
          >
            <div className="box-subcontainer flex flex-col">
              <SkillsSection
                selectedSkillID={selectedSkillID}
                stackSkillIDs={selectedProject?.skills}
                onSkillSelect={selectSkill}
                onSkillClose={closeSkill}
              />
            </div>
          </div>
        )}

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
              project={selectedProject}
              education={selectedEducation}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
