export type FocusWindowID =
  | "contacts"
  | "projects"
  | "education"
  | "skills"
  | "about";

export type FocusedWindow = FocusWindowID;

export const focusWindowClassName = "box-container focus-window";

export function getFocusWindowClassName(
  className: string,
  windowID: FocusWindowID,
  focusedWindow: FocusedWindow | null,
) {
  return [
    focusWindowClassName,
    className,
    focusedWindow === windowID ? "focus-window-active" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function getFocusWindowProps(
  className: string,
  windowID: FocusWindowID,
  focusedWindow: FocusedWindow | null,
) {
  const disabled = focusedWindow !== null && focusedWindow !== windowID;

  return {
    className: getFocusWindowClassName(className, windowID, focusedWindow),
    inert: disabled ? true : undefined,
    "aria-hidden": disabled ? true : undefined,
  };
}
