"use client";
import { projects } from "@/data/projects";
import ProjectCard from "../projects/ProjectCard";

export default function ProjectsSection() {
  return (
    <div className="box-container col-span-2 row-span-3" id="projects">
      <div className="box-subcontainer flex flex-col">
        <h1 className="mb-6">Projects</h1>
        <div className="grid h-full grid-cols-3 items-center gap-x-6 gap-y-10 overflow-scroll">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              name={project.name}
              image={project.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
