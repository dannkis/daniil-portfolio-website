"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills } from "@/lib/content";

type SkillID = (typeof skills)[number]["id"];

interface Props {
  stackSkillIDs?: readonly string[];
  onFocusChange?: (focused: boolean) => void;
}

export default function SkillsSection({ stackSkillIDs, onFocusChange }: Props) {
  const [expandedSkillID, setExpandedSkillID] = useState<SkillID | null>(null);
  const expandedSkill = skills.find((skill) => skill.id === expandedSkillID);
  const stackSkillIDSet = new Set(stackSkillIDs);
  const isStackMode = stackSkillIDs !== undefined;
  const activeExpandedSkill = expandedSkill;

  function expand(id: SkillID) {
    setExpandedSkillID(id);
    if (!isStackMode) {
      onFocusChange?.(true);
    }
  }

  function collapse() {
    setExpandedSkillID(null);
    if (!isStackMode) {
      onFocusChange?.(false);
    }
  }

  return (
    <>
      <div className="flex justify-between">
        <motion.h1
          className="mb-4"
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {activeExpandedSkill
            ? activeExpandedSkill.name
            : isStackMode
              ? "Stack Used"
              : "Skills"}
        </motion.h1>
        <AnimatePresence>
          {activeExpandedSkill && (
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

      <div className="grid h-full grid-cols-4 grid-rows-4 items-center gap-x-3 gap-y-4 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeExpandedSkill ? (
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
                src={activeExpandedSkill.image.src}
                alt={activeExpandedSkill.image.alt}
                draggable={false}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
              />
              <p className="text-sm leading-relaxed">
                {activeExpandedSkill.description ??
                  "Add a description for this skill in content/skills.json."}
              </p>
              {activeExpandedSkill.certificateImage ? (
                <motion.img
                  className="max-h-40 w-full object-contain"
                  src={activeExpandedSkill.certificateImage.src}
                  alt={activeExpandedSkill.certificateImage.alt}
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
              {skills.map((skill, i) => {
                const isHighlighted =
                  !isStackMode || stackSkillIDSet.has(skill.id);
                const isClickable = !isStackMode || isHighlighted;
                const skillContent = (
                  <>
                    <motion.img
                      className="w-[clamp(1.5rem,3vw,3rem)] object-contain"
                      src={skill.image.src}
                      alt={skill.image.alt}
                      draggable={false}
                      animate={{
                        scale: isStackMode && isHighlighted ? 1.16 : 1,
                      }}
                      whileHover={isStackMode ? undefined : { scale: 1.04 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 24,
                      }}
                    />
                    <p className="subheading text-center leading-none">
                      {skill.name}
                    </p>
                  </>
                );

                const itemClassName = `flex min-w-0 flex-col items-center justify-center gap-2 rounded-md text-center transition-[filter,color] ${
                  isHighlighted ? "" : "grayscale"
                }`;

                const motionProps = {
                  initial: { opacity: 0, y: 12 },
                  animate: {
                    opacity: isHighlighted ? 1 : 0.28,
                    y: 0,
                    scale: isStackMode && isHighlighted ? 1.08 : 1,
                  },
                  exit: { opacity: 0, y: 12 },
                  transition: {
                    delay: i * 0.035,
                    type: "spring" as const,
                    stiffness: 260,
                    damping: 24,
                  },
                };

                return (
                  <motion.button
                    key={skill.id}
                    type="button"
                    className={`${itemClassName} ${
                      isClickable ? "hover:cursor-pointer" : ""
                    }`}
                    disabled={!isClickable}
                    aria-disabled={!isClickable}
                    onClick={isClickable ? () => expand(skill.id) : undefined}
                    whileTap={isClickable ? { scale: 0.97 } : undefined}
                    {...motionProps}
                  >
                    {skillContent}
                  </motion.button>
                );
              })}
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
