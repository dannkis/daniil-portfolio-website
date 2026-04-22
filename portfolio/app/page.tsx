"use client";
import { useState } from "react";
import AboutSection from "@/components/sections/AboutSection";
import ContactsSection from "@/components/sections/ContactsSection";
import EducationSection from "@/components/sections/EducationSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import { type FocusedWindow, getFocusWindowProps } from "@/lib/focusWindow";

export default function Home() {
  const [focusedWindow, setFocusedWindow] = useState<FocusedWindow | null>(
    null,
  );

  return (
    <main
      className={`h-screen min-h-200 p-4 transition-all duration-500 ${
        focusedWindow ? "focus-window-open" : ""
      }`}
    >
      <div className="h-full grid-cols-4 grid-rows-5 gap-4 lg:grid">
        <div
          {...getFocusWindowProps(
            "col-span-2 row-span-2 grid grid-cols-2 gap-12",
            "contacts",
            focusedWindow,
          )}
          id="contacts"
        >
          <ContactsSection />
        </div>

        <div
          {...getFocusWindowProps(
            "col-span-2 row-span-3",
            "projects",
            focusedWindow,
          )}
          id="projects"
        >
          <div className="box-subcontainer flex flex-col">
            <ProjectsSection
              onFocusChange={(focused) =>
                setFocusedWindow(focused ? "projects" : null)
              }
            />
          </div>
        </div>

        <div
          {...getFocusWindowProps("row-span-3", "education", focusedWindow)}
          id="education"
        >
          <div className="box-subcontainer flex flex-col">
            <EducationSection />
          </div>
        </div>

        <div
          {...getFocusWindowProps("row-span-3", "skills", focusedWindow)}
          id="skills"
        >
          <div className="box-subcontainer flex flex-col">
            <SkillsSection
              onFocusChange={(focused) =>
                setFocusedWindow(focused ? "skills" : null)
              }
            />
          </div>
        </div>

        <div
          {...getFocusWindowProps(
            "col-span-2 row-span-2",
            "about",
            focusedWindow,
          )}
          id="about"
        >
          <div className="box-subcontainer flex flex-col">
            <AboutSection />
          </div>
        </div>
      </div>
    </main>
  );
}
