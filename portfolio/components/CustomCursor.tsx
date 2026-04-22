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

function getDistanceToRect(x: number, y: number, rect: DOMRect) {
  const dx = Math.max(rect.left - x, 0, x - rect.right);
  const dy = Math.max(rect.top - y, 0, y - rect.bottom);

  return Math.hypot(dx, dy);
}

function isInteractiveElement(element: Element) {
  if (element.closest("[inert]")) {
    return false;
  }

  if (
    element instanceof HTMLButtonElement ||
    element instanceof HTMLInputElement ||
    element instanceof HTMLSelectElement ||
    element instanceof HTMLTextAreaElement
  ) {
    return !element.disabled;
  }

  return true;
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
    let animationFrame = 0;

    function updateInteractiveState() {
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
      cursorX += (pointerX - cursorX) * 0.24;
      cursorY += (pointerY - cursorY) * 0.24;
      scale += (targetScale - scale) * 0.18;

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
      data-pressed="false"
      data-visible="false"
      aria-hidden="true"
    />
  );
}
