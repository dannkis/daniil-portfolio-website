import type { Project } from "@/types/data";
export const projects: readonly Project[] = [
  {
    id: "simplydone",
    name: "SimplyDone App",
    description: "description",
    image: {
      src: "/images/projects/simplydone.png",
      alt: "An image showing three different = mobile views of the SimplyDone application.",
    },
    href: "",
    github_repo: "",
    github_release: "",
  },
  {
    id: "skillfindr",
    name: "IBM SkillFindr",
    description: "description",
    image: {
      src: "/images/projects/skillfindr.png",
      alt: "",
    },
    href: "",
    github_repo: "",
    github_release: "",
  },
  {
    id: "rotamaker",
    name: "RotaMaker 4",
    description: "description",
    image: {
      src: "/images/projects/rotamaker.png",
      alt: "",
    },
    href: "",
    github_repo: "",
    github_release: "",
  },
] as const;
