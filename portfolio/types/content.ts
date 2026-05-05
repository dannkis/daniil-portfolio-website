export type ImageRef = {
  src: string;
  alt: string;
};

export type ContentItem = {
  id: string;
  name: string;
};

export type AboutContent = {
  text: string;
  contacts?: {
    linkedin?: string;
    github?: string;
    email?: string;
  };
};

export type ProjectLinks = {
  website?: string;
  repository?: string;
  release?: string;
};

export type Project = ContentItem & {
  description: string;
  image: ImageRef;
  gallery?: ImageRef[];
  skills: string[];
  links?: ProjectLinks;
};

export type Education = ContentItem & {
  period: string;
  qualification: string;
  summary: string;
  description: string;
  color: string;
  certificateImage?: ImageRef;
};

export type Skill = ContentItem & {
  description?: string;
  image: ImageRef;
  certificateImage?: ImageRef;
};
