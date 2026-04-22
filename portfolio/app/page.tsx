"use client";
import { useState } from "react";
import AboutSection from "@/components/sections/AboutSection";
import ContactsSection from "@/components/sections/ContactsSection";
import EducationSection from "@/components/sections/EducationSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import { education, projects, skills } from "@/lib/content";
import { type FocusedWindows, getFocusWindowProps } from "@/lib/focusWindow";

type ProjectID = (typeof projects)[number]["id"];
type EducationID = (typeof education)[number]["id"];
type SkillID = (typeof skills)[number]["id"];

export default function Home() {
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
  const selectedEducation = education.find(
    (entry) => entry.id === selectedEducationID,
  );

  function focusProject(projectID: ProjectID) {
    setSelectedProjectID(projectID);
    setSelectedEducationID(null);
    setSelectedSkillID(null);
    setFocusedWindows(["projects", "skills", "about"]);
  }

  function focusEducation(educationID: EducationID) {
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
    if (!focusedWindows) {
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
      className={`min-h-screen p-3 transition-all duration-500 sm:p-4 lg:h-screen lg:min-h-200 ${
        focusedWindows ? "focus-window-open" : ""
      }`}
      onPointerDown={handlePointerDown}
    >
      <div className="grid auto-rows-auto grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:h-full lg:grid-cols-4 lg:grid-rows-5">
        <div
          {...getFocusWindowProps(
            "min-h-80 sm:col-span-2 lg:col-span-2 lg:row-span-2 lg:min-h-0 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-12",
            "contacts",
            focusedWindows,
          )}
          id="contacts"
        >
          <ContactsSection />
        </div>

        <div
          {...getFocusWindowProps(
            "min-h-96 sm:col-span-2 lg:col-span-2 lg:row-span-3 lg:min-h-0",
            "projects",
            focusedWindows,
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
              ? "min-h-[30rem] sm:col-span-2 lg:col-span-2 lg:row-span-3 lg:min-h-0"
              : "min-h-[30rem] lg:row-span-3 lg:min-h-0",
            "education",
            focusedWindows,
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
              "min-h-[32rem] sm:min-h-[28rem] lg:row-span-3 lg:min-h-0",
              "skills",
              focusedWindows,
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
            focusedWindows,
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
