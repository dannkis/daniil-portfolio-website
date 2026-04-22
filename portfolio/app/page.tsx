"use client";
import { useState } from "react";
import AboutSection from "@/components/sections/AboutSection";
import ContactsSection from "@/components/sections/ContactsSection";
import EducationSection from "@/components/sections/EducationSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import { projects } from "@/lib/content";
import { type FocusedWindows, getFocusWindowProps } from "@/lib/focusWindow";

type ProjectID = (typeof projects)[number]["id"];

export default function Home() {
  const [focusedWindows, setFocusedWindows] = useState<FocusedWindows | null>(
    null,
  );
  const [selectedProjectID, setSelectedProjectID] = useState<ProjectID | null>(
    null,
  );
  const selectedProject = projects.find(
    (project) => project.id === selectedProjectID,
  );

  function focusProject(projectID: ProjectID) {
    setSelectedProjectID(projectID);
    setFocusedWindows(["projects", "skills", "about"]);
  }

  function clearProjectFocus() {
    setSelectedProjectID(null);
    setFocusedWindows(null);
  }

  function setSkillsFocus(focused: boolean) {
    setFocusedWindows(focused ? ["skills"] : null);
  }

  return (
    <main
      className={`h-screen min-h-200 p-4 transition-all duration-500 ${
        focusedWindows ? "focus-window-open" : ""
      }`}
    >
      <div className="h-full grid-cols-4 grid-rows-5 gap-4 lg:grid">
        <div
          {...getFocusWindowProps(
            "col-span-2 row-span-2 grid grid-cols-2 gap-12",
            "contacts",
            focusedWindows,
          )}
          id="contacts"
        >
          <ContactsSection />
        </div>

        <div
          {...getFocusWindowProps(
            "col-span-2 row-span-3",
            "projects",
            focusedWindows,
          )}
          id="projects"
        >
          <div className="box-subcontainer flex flex-col">
            <ProjectsSection
              selectedProject={selectedProject}
              onProjectSelect={focusProject}
              onProjectClose={clearProjectFocus}
            />
          </div>
        </div>

        <div
          {...getFocusWindowProps("row-span-3", "education", focusedWindows)}
          id="education"
        >
          <div className="box-subcontainer flex flex-col">
            <EducationSection />
          </div>
        </div>

        <div
          {...getFocusWindowProps("row-span-3", "skills", focusedWindows)}
          id="skills"
        >
          <div className="box-subcontainer flex flex-col">
            <SkillsSection
              stackSkillIDs={selectedProject?.skills}
              onFocusChange={setSkillsFocus}
            />
          </div>
        </div>

        <div
          {...getFocusWindowProps(
            "col-span-2 row-span-2",
            "about",
            focusedWindows,
          )}
          id="about"
        >
          <div className="box-subcontainer flex flex-col">
            <AboutSection project={selectedProject} />
          </div>
        </div>
      </div>
    </main>
  );
}
