import type { AboutContent, ImageRef, Project, Skill } from "@/types/content";

type ContentKind = "about" | "projects" | "skills";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function assertString(
  value: unknown,
  field: string,
  kind: ContentKind,
): asserts value is string {
  if (typeof value !== "string") {
    throw new Error(`Invalid ${kind} content: ${field} must be a string.`);
  }
}

function assertOptionalString(
  value: unknown,
  field: string,
  kind: ContentKind,
): asserts value is string | undefined {
  if (value !== undefined && typeof value !== "string") {
    throw new Error(`Invalid ${kind} content: ${field} must be a string.`);
  }
}

function assertImageRef(
  value: unknown,
  field: string,
  kind: ContentKind,
): asserts value is ImageRef {
  if (!isRecord(value)) {
    throw new Error(`Invalid ${kind} content: ${field} must be an object.`);
  }

  assertString(value.src, `${field}.src`, kind);
  assertString(value.alt, `${field}.alt`, kind);
}

function assertUniqueIDs(items: readonly { id: string }[], kind: ContentKind) {
  const seenIDs = new Set<string>();

  for (const item of items) {
    if (seenIDs.has(item.id)) {
      throw new Error(`Invalid ${kind} content: duplicate id "${item.id}".`);
    }

    seenIDs.add(item.id);
  }
}

function assertProject(value: unknown): asserts value is Project {
  if (!isRecord(value)) {
    throw new Error("Invalid projects content: project must be an object.");
  }

  assertString(value.id, "id", "projects");
  assertString(value.name, "name", "projects");
  assertString(value.description, "description", "projects");
  assertImageRef(value.image, "image", "projects");

  if (value.links !== undefined) {
    if (!isRecord(value.links)) {
      throw new Error("Invalid projects content: links must be an object.");
    }

    assertOptionalString(value.links.website, "links.website", "projects");
    assertOptionalString(
      value.links.repository,
      "links.repository",
      "projects",
    );
    assertOptionalString(value.links.release, "links.release", "projects");
  }
}

function assertSkill(value: unknown): asserts value is Skill {
  if (!isRecord(value)) {
    throw new Error("Invalid skills content: skill must be an object.");
  }

  assertString(value.id, "id", "skills");
  assertString(value.name, "name", "skills");
  assertOptionalString(value.description, "description", "skills");
  assertImageRef(value.image, "image", "skills");

  if (value.certificateImage !== undefined) {
    assertImageRef(value.certificateImage, "certificateImage", "skills");
  }
}

export function defineAboutContent(value: unknown): AboutContent {
  if (!isRecord(value)) {
    throw new Error("Invalid about content: content must be an object.");
  }

  assertString(value.text, "text", "about");

  return {
    text: value.text,
  };
}

export function defineProjectsContent(value: unknown): readonly Project[] {
  if (!Array.isArray(value)) {
    throw new Error("Invalid projects content: content must be an array.");
  }

  value.forEach(assertProject);
  assertUniqueIDs(value, "projects");

  return value as Project[];
}

export function defineSkillsContent(value: unknown): readonly Skill[] {
  if (!Array.isArray(value)) {
    throw new Error("Invalid skills content: content must be an array.");
  }

  value.forEach(assertSkill);
  assertUniqueIDs(value, "skills");

  return value as Skill[];
}
