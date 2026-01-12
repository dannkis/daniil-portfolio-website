"use client";
import { useState } from "react";
import { projects } from "@/data/projects";

// Deriving the ID type to avoid invalid ID and it is also easier for future refactoring.
type ProjectID = (typeof projects)[number]["id"];

export default function ProjectsSection() {
  const [expandedProjectID, setExpandedProjectID] = useState<ProjectID | null>(
    null,
  );
  const expandedProject = projects.find((p) => p.id === expandedProjectID);
  console.log(expandedProject?.name);
  return (
    <div className="box-container col-span-2 row-span-3" id="projects">
      <div className="box-subcontainer flex flex-col">
        <h1 className="mb-6">Projects</h1>
        <div className="grid h-full grid-cols-3 items-center gap-x-6 gap-y-10 overflow-scroll">
          {projects.map((project) => (
            <button
              type="button"
              key={project.id}
              className="flex flex-col items-center"
              onClick={() => setExpandedProjectID(project.id)}
              aria-expanded={project.id === expandedProjectID}
            >
              <div>
                <img
                  src={project.image.src}
                  alt={project.image.alt}
                  draggable={false}
                  className="transition hover:scale-[1.02]"
                />
              </div>
              <p className="subheading">{project.name}</p>
              <p className="subheading">{expandedProjectID}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProjectsGridView() {
  return <></>;
}

export function ProjectExpandedView(expandedProjectID: ProjectID) {
  return <></>;
}
