"use client";
import {
  useEffect,
  useState,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

export const DEFAULT_HOVER_MAGNIFIER_SIZE = 150;
export const DEFAULT_HOVER_MAGNIFIER_SCALE = 5;
export const MIN_HOVER_MAGNIFIER_SCALE = 1.5;
export const MAX_HOVER_MAGNIFIER_SCALE = 8;
export const HOVER_MAGNIFIER_SCALE_STEP = 0.35;

export type HoverMagnifierState = {
  isVisible: boolean;
  x: number;
  y: number;
};

const defaultMagnifierState: HoverMagnifierState = {
  isVisible: false,
  x: 50,
  y: 50,
};

export function useHoverMagnifier(resetKey: string) {
  const [magnifierState, setMagnifierState] =
    useState<HoverMagnifierState>(defaultMagnifierState);
  const [magnifierScale, setMagnifierScale] = useState(
    DEFAULT_HOVER_MAGNIFIER_SCALE,
  );

  useEffect(() => {
    setMagnifierState(defaultMagnifierState);
    setMagnifierScale(DEFAULT_HOVER_MAGNIFIER_SCALE);
  }, [resetKey]);

  function showMagnifier(event: ReactPointerEvent<HTMLElement>) {
    if (event.pointerType && event.pointerType !== "mouse") {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    setMagnifierState({
      isVisible: true,
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  }

  function hideMagnifier() {
    setMagnifierState((currentState) => ({
      ...currentState,
      isVisible: false,
    }));
  }

  function adjustMagnifierScale(event: ReactWheelEvent<HTMLElement>) {
    if (!magnifierState.isVisible) {
      return;
    }

    event.preventDefault();
    const direction = event.deltaY < 0 ? 1 : -1;

    setMagnifierScale((currentScale) =>
      Math.max(
        MIN_HOVER_MAGNIFIER_SCALE,
        Math.min(
          MAX_HOVER_MAGNIFIER_SCALE,
          Number((currentScale + direction * HOVER_MAGNIFIER_SCALE_STEP).toFixed(2)),
        ),
      ),
    );
  }

  return {
    magnifierState,
    magnifierScale,
    magnifierHandlers: {
      onPointerEnter: showMagnifier,
      onPointerMove: showMagnifier,
      onPointerLeave: hideMagnifier,
      onWheel: adjustMagnifierScale,
    },
  };
}

interface HoverMagnifierLensProps {
  src: string;
  magnifierState: HoverMagnifierState;
  size?: number;
  scale: number;
}

export function HoverMagnifierLens({
  src,
  magnifierState,
  size = DEFAULT_HOVER_MAGNIFIER_SIZE,
  scale,
}: HoverMagnifierLensProps) {
  return (
    <AnimatePresence>
      {magnifierState.isVisible && (
        <motion.div
          className="pointer-events-none absolute z-40 hidden overflow-hidden rounded-full border border-foreground/30 bg-background/75 shadow-[0_0_24px_rgb(0_0_0_/_0.18)] backdrop-blur-sm lg:block"
          style={{
            width: size,
            height: size,
            left: `calc(${magnifierState.x}% - ${size / 2}px)`,
            top: `calc(${magnifierState.y}% - ${size / 2}px)`,
          }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.12 }}
        >
          <img
            className="h-full w-full object-contain"
            src={src}
            alt=""
            aria-hidden="true"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: `${magnifierState.x}% ${magnifierState.y}%`,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
