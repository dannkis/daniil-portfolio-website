export type FocusWindowID =
  | "contacts"
  | "projects"
  | "education"
  | "skills"
  | "about";

export type FocusedWindows = readonly FocusWindowID[];

export const focusWindowClassName = "box-container focus-window";

export function getFocusWindowClassName(
  className: string,
  windowID: FocusWindowID,
  focusedWindows: FocusedWindows | null,
) {
  return [
    focusWindowClassName,
    className,
    focusedWindows?.includes(windowID) ? "focus-window-active" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function getFocusWindowProps(
  className: string,
  windowID: FocusWindowID,
  focusedWindows: FocusedWindows | null,
) {
  const disabled =
    focusedWindows !== null && !focusedWindows.includes(windowID);

  return {
    className: getFocusWindowClassName(className, windowID, focusedWindows),
    inert: disabled ? true : undefined,
    "aria-hidden": disabled ? true : undefined,
  };
}
