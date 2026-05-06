"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  HoverMagnifierLens,
  useHoverMagnifier,
} from "@/components/HoverMagnifier";
import type { ImageRef } from "@/lib/content";

interface Props {
  contentKey: string;
  image?: ImageRef;
  images?: readonly ImageRef[];
  placeholder: string;
}

export default function PreviewPanel({
  contentKey,
  image,
  images,
  placeholder,
}: Props) {
  const previewImages =
    images && images.length > 0 ? images : image ? [image] : [];
  const [carouselState, setCarouselState] = useState<{
    contentKey: string | null;
    index: number;
  }>({
    contentKey: null,
    index: 0,
  });
  const activeIndex =
    carouselState.contentKey === contentKey
      ? Math.min(carouselState.index, Math.max(previewImages.length - 1, 0))
      : 0;
  const activeImage =
    previewImages.length > 0
      ? previewImages[Math.min(activeIndex, previewImages.length - 1)]
      : undefined;
  const hasCarousel = previewImages.length > 1;
  const { magnifierState, magnifierScale, magnifierHandlers } = useHoverMagnifier(
    `${contentKey}-${activeIndex}`,
  );

  function setActiveIndex(index: number) {
    setCarouselState({
      contentKey,
      index,
    });
  }

  function showPreviousImage() {
    setActiveIndex(
      activeIndex === 0 ? previewImages.length - 1 : activeIndex - 1,
    );
  }

  function showNextImage() {
    setActiveIndex(
      activeIndex === previewImages.length - 1 ? 0 : activeIndex + 1,
    );
  }

  return (
    <motion.div
      key={contentKey}
      className="flex h-full flex-col items-center justify-center text-center"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
    >
      {activeImage ? (
        <div className="relative flex h-full w-full items-center justify-center overflow-visible rounded-md">
          {hasCarousel && (
            <>
              <button
                type="button"
                className="text-body absolute top-1/2 left-0 z-20 inline-flex h-10 w-10 -translate-x-[35%] -translate-y-1/2 items-center justify-center rounded-full border border-foreground/20 bg-background/75 text-orange-400 backdrop-blur-sm hover:cursor-pointer"
                onClick={showPreviousImage}
                aria-label="Show previous certificate image"
              >
                ‹
              </button>
              <button
                type="button"
                className="text-body absolute top-1/2 right-0 z-20 inline-flex h-10 w-10 translate-x-[35%] -translate-y-1/2 items-center justify-center rounded-full border border-foreground/20 bg-background/75 text-orange-400 backdrop-blur-sm hover:cursor-pointer"
                onClick={showNextImage}
                aria-label="Show next certificate image"
              >
                ›
              </button>
            </>
          )}

          <div
            className="relative flex h-full w-full items-center justify-center overflow-visible rounded-md"
            {...magnifierHandlers}
          >
            <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-md">
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={`${contentKey}-${activeIndex}`}
                  className="max-h-full rounded-md border border-foreground/20 bg-foreground/5 object-contain"
                  src={activeImage.src}
                  alt={activeImage.alt}
                  draggable={false}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                />
              </AnimatePresence>
            </div>
            <HoverMagnifierLens
              src={activeImage.src}
              magnifierState={magnifierState}
              scale={magnifierScale}
            />
          </div>

          {hasCarousel && (
            <div className="absolute bottom-0 left-1/2 z-20 flex -translate-x-1/2 translate-y-[35%] gap-2 rounded-full border border-foreground/15 bg-background/70 px-3 py-2 backdrop-blur-sm">
              {previewImages.map((previewImage, index) => (
                <button
                  key={`${previewImage.src}-${index}`}
                  type="button"
                  className={`h-2.5 w-2.5 rounded-full transition-colors hover:cursor-pointer ${
                    activeIndex === index ? "bg-orange-400" : "bg-foreground/30"
                  }`}
                  aria-label={`Show certificate image ${index + 1}`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="text-label flex h-full min-h-40 w-full items-center justify-center rounded-md border border-dashed border-foreground/30 px-4 py-6 text-foreground/70">
          {placeholder}
        </div>
      )}
    </motion.div>
  );
}
