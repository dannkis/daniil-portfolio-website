"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills } from "@/lib/content";

type SkillID = (typeof skills)[number]["id"];

interface Props {
  onFocusChange?: (focused: boolean) => void;
}

export default function SkillsSection({ onFocusChange }: Props) {
  const [expandedSkillID, setExpandedSkillID] = useState<SkillID | null>(null);
  const expandedSkill = skills.find((skill) => skill.id === expandedSkillID);

  function expand(id: SkillID) {
    setExpandedSkillID(id);
    onFocusChange?.(true);
  }

  function collapse() {
    setExpandedSkillID(null);
    onFocusChange?.(false);
  }

  return (
    <>
      <div className="flex justify-between">
        <motion.h1
          className="mb-4"
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {expandedSkill ? expandedSkill.name : "Skills"}
        </motion.h1>
        <AnimatePresence>
          {expandedSkill && (
            <motion.button
              className="text-orange-400 hover:cursor-pointer"
              type="button"
              onClick={collapse}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              ✕
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div className="grid h-full grid-cols-4 grid-rows-4 items-center gap-x-4 gap-y-6 overflow-auto">
        <AnimatePresence mode="wait">
          {expandedSkill ? (
            <motion.div
              key="expanded"
              className="col-span-4 row-span-4 flex h-full flex-col items-center justify-center gap-4 text-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
            >
              <motion.img
                className="w-[clamp(3rem,7vw,5rem)] object-contain"
                src={expandedSkill.image.src}
                alt={expandedSkill.image.alt}
                draggable={false}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
              />
              <p className="text-sm leading-relaxed">
                {expandedSkill.description ??
                  "Add a description for this skill in content/skills.json."}
              </p>
              {expandedSkill.certificateImage ? (
                <motion.img
                  className="max-h-40 w-full object-contain"
                  src={expandedSkill.certificateImage.src}
                  alt={expandedSkill.certificateImage.alt}
                  draggable={false}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                />
              ) : (
                <div className="rounded-md border border-dashed border-foreground/30 px-4 py-3 text-xs text-foreground/70">
                  Certificate image placeholder
                </div>
              )}
            </motion.div>
          ) : (
            <>
              {skills.map((skill, i) => (
                <motion.button
                  key={skill.id}
                  type="button"
                  className="flex flex-col items-center justify-center gap-2 hover:cursor-pointer"
                  onClick={() => expand(skill.id)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{
                    delay: i * 0.05,
                    type: "spring",
                    stiffness: 260,
                    damping: 24,
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <motion.img
                    className="w-[clamp(1.5rem,3vw,3rem)] object-contain"
                    src={skill.image.src}
                    alt={skill.image.alt}
                    draggable={false}
                    whileHover={{ scale: 1.04 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 24,
                    }}
                  />
                  <p className="subheading text-center leading-none">
                    {skill.name}
                  </p>
                </motion.button>
              ))}
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
