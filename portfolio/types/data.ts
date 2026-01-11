export type ImageRef = {
  src: string;
  alt: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  image: ImageRef;
  href?: string;
  github_repo?: string;
  github_release?: string;
};

export type Skill = {
  id: string;
  name: string;
  image: ImageRef;
};
