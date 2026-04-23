"use client";
import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR = [
  "a[href]",
  "button",
  "input",
  "select",
  "textarea",
  "summary",
  "[role='button']",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

const PROXIMITY_RADIUS = 96;
const BASE_CURSOR_SIZE = 16;
const OUTLINE_PADDING = 8;
const MAX_OUTLINE_RADIUS = 18;
const CIRCLE_RADIUS = BASE_CURSOR_SIZE / 2;

function getDistanceToRect(x: number, y: number, rect: DOMRect) {
  const dx = Math.max(rect.left - x, 0, x - rect.right);
  const dy = Math.max(rect.top - y, 0, y - rect.bottom);

  return Math.hypot(dx, dy);
}

function isInteractiveElement(element: Element) {
  if (element.closest("[inert]")) {
    return false;
  }

  if (element.closest("[aria-disabled='true']")) {
    return false;
  }

  const disabledControl = element.closest(
    "button:disabled,input:disabled,select:disabled,textarea:disabled",
  );

  return disabledControl === null;
}

function getInteractiveTarget(element: Element | null) {
  const target = element?.closest(INTERACTIVE_SELECTOR);

  if (!target || !isInteractiveElement(target)) {
    return null;
  }

  return target;
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supportsCustomCursor =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!supportsCustomCursor) {
      return;
    }

    const cursorElement = cursorRef.current;

    if (!cursorElement) {
      return;
    }

    const cursor: HTMLDivElement = cursorElement;

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let cursorX = pointerX;
    let cursorY = pointerY;
    let scale = 1;
    let targetScale = 1;
    let cursorWidth = BASE_CURSOR_SIZE;
    let cursorHeight = BASE_CURSOR_SIZE;
    let cursorRadius = CIRCLE_RADIUS;
    let targetWidth = BASE_CURSOR_SIZE;
    let targetHeight = BASE_CURSOR_SIZE;
    let targetRadius = CIRCLE_RADIUS;
    let activeTarget: Element | null = null;
    let animationFrame = 0;

    function updateInteractiveState() {
      activeTarget = getInteractiveTarget(
        document.elementFromPoint(pointerX, pointerY),
      );

      if (activeTarget) {
        cursor.dataset.overInteractive = "true";
        cursor.dataset.nearInteractive = "true";
        targetScale = 1;
        return;
      }

      cursor.dataset.overInteractive = "false";

      const interactiveElements = Array.from(
        document.querySelectorAll(INTERACTIVE_SELECTOR),
      ).filter(isInteractiveElement);

      let nearestDistance = PROXIMITY_RADIUS;

      for (const element of interactiveElements) {
        const rect = element.getBoundingClientRect();

        if (rect.width === 0 || rect.height === 0) {
          continue;
        }

        nearestDistance = Math.min(
          nearestDistance,
          getDistanceToRect(pointerX, pointerY, rect),
        );
      }

      const proximity = 1 - nearestDistance / PROXIMITY_RADIUS;
      targetScale = 1 + proximity * 0.55;
      cursor.dataset.nearInteractive = proximity > 0 ? "true" : "false";
    }

    function animate() {
      const activeRect = activeTarget?.getBoundingClientRect();
      const isOutliningTarget =
        activeRect !== undefined &&
        activeRect.width > 0 &&
        activeRect.height > 0;

      const targetX = isOutliningTarget
        ? activeRect.left +
          activeRect.width / 2 +
          (pointerX - activeRect.left - activeRect.width / 2) * 0.08
        : pointerX;
      const targetY = isOutliningTarget
        ? activeRect.top +
          activeRect.height / 2 +
          (pointerY - activeRect.top - activeRect.height / 2) * 0.08
        : pointerY;

      targetWidth = isOutliningTarget
        ? activeRect.width + OUTLINE_PADDING * 2
        : BASE_CURSOR_SIZE;
      targetHeight = isOutliningTarget
        ? activeRect.height + OUTLINE_PADDING * 2
        : BASE_CURSOR_SIZE;
      targetRadius = isOutliningTarget
        ? Math.min(MAX_OUTLINE_RADIUS, targetHeight / 2)
        : CIRCLE_RADIUS;

      cursorX += (targetX - cursorX) * (isOutliningTarget ? 0.2 : 0.22);
      cursorY += (targetY - cursorY) * (isOutliningTarget ? 0.2 : 0.22);
      scale += (targetScale - scale) * 0.14;
      cursorWidth += (targetWidth - cursorWidth) * 0.18;
      cursorHeight += (targetHeight - cursorHeight) * 0.18;
      cursorRadius += (targetRadius - cursorRadius) * 0.18;

      cursor.style.width = `${cursorWidth}px`;
      cursor.style.height = `${cursorHeight}px`;
      cursor.style.borderRadius = `${cursorRadius}px`;
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%) scale(${scale})`;
      animationFrame = window.requestAnimationFrame(animate);
    }

    function handlePointerMove(event: PointerEvent) {
      pointerX = event.clientX;
      pointerY = event.clientY;
      cursor.dataset.visible = "true";
      updateInteractiveState();
    }

    function handlePointerLeave() {
      cursor.dataset.visible = "false";
    }

    function handlePointerDown() {
      cursor.dataset.pressed = "true";
    }

    function handlePointerUp() {
      cursor.dataset.pressed = "false";
    }

    document.documentElement.classList.add("custom-cursor-enabled");
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      document.documentElement.classList.remove("custom-cursor-enabled");
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      data-near-interactive="false"
      data-over-interactive="false"
      data-pressed="false"
      data-visible="false"
      aria-hidden="true"
    />
  );
}
