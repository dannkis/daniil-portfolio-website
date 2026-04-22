"use client";
import { useState } from "react";
import AboutSection from "@/components/sections/AboutSection";
import ContactsSection from "@/components/sections/ContactsSection";
import EducationSection from "@/components/sections/EducationSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import { education, projects } from "@/lib/content";
import { type FocusedWindows, getFocusWindowProps } from "@/lib/focusWindow";

type ProjectID = (typeof projects)[number]["id"];
type EducationID = (typeof education)[number]["id"];

export default function Home() {
  const [focusedWindows, setFocusedWindows] = useState<FocusedWindows | null>(
    null,
  );
  const [selectedProjectID, setSelectedProjectID] = useState<ProjectID | null>(
    null,
  );
  const [selectedEducationID, setSelectedEducationID] =
    useState<EducationID | null>(null);
  const selectedProject = projects.find(
    (project) => project.id === selectedProjectID,
  );
  const selectedEducation = education.find(
    (entry) => entry.id === selectedEducationID,
  );

  function focusProject(projectID: ProjectID) {
    setSelectedProjectID(projectID);
    setSelectedEducationID(null);
    setFocusedWindows(["projects", "skills", "about"]);
  }

  function clearProjectFocus() {
    setSelectedProjectID(null);
    setFocusedWindows(null);
  }

  function focusEducation(educationID: EducationID) {
    setSelectedEducationID(educationID);
    setSelectedProjectID(null);
    setFocusedWindows(["education", "about"]);
  }

  function clearEducationFocus() {
    setSelectedEducationID(null);
    setFocusedWindows(null);
  }

  function setSkillsFocus(focused: boolean) {
    setSelectedEducationID(null);
    setSelectedProjectID(null);
    setFocusedWindows(focused ? ["skills"] : null);
  }

  return (
    <main
      className={`min-h-screen p-3 transition-all duration-500 sm:p-4 lg:h-screen lg:min-h-200 ${
        focusedWindows ? "focus-window-open" : ""
      }`}
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
              onProjectClose={clearProjectFocus}
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
              onEducationClose={clearEducationFocus}
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
                stackSkillIDs={selectedProject?.skills}
                onFocusChange={setSkillsFocus}
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
