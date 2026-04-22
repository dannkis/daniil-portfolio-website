import aboutContent from "@/content/about.json";
import projectsContent from "@/content/projects.json";
import skillsContent from "@/content/skills.json";
import {
  defineAboutContent,
  defineProjectsContent,
  defineSkillsContent,
} from "@/lib/content/schema";

export const about = defineAboutContent(aboutContent);
export const projects = defineProjectsContent(projectsContent);
export const skills = defineSkillsContent(skillsContent);

export type { AboutContent, ImageRef, Project, Skill } from "@/types/content";
