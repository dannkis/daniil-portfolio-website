"use client";
import { motion } from "framer-motion";
import type { ImageRef } from "@/lib/content";

interface Props {
  contentKey: string;
  image?: ImageRef;
  placeholder: string;
  title: string;
}

export default function PreviewPanel({
  contentKey,
  image,
  placeholder,
  title,
}: Props) {
  return (
    <motion.div
      key={contentKey}
      className="flex h-full min-w-0 flex-col items-center justify-center gap-4 overflow-hidden rounded-md border border-foreground/20 bg-foreground/5 p-4 text-center"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
    >
      <p className="subheading text-orange-400">{title}</p>
      {image ? (
        <motion.img
          className="max-h-full w-full object-contain"
          src={image.src}
          alt={image.alt}
          draggable={false}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
        />
      ) : (
        <div className="text-label flex h-full min-h-40 w-full items-center justify-center rounded-md border border-dashed border-foreground/30 px-4 py-6 text-foreground/70">
          {placeholder}
        </div>
      )}
    </motion.div>
  );
}
