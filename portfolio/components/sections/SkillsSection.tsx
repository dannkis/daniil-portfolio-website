"use client";
import { motion, AnimatePresence } from "framer-motion";
import { skills } from "@/lib/content";

type SkillID = (typeof skills)[number]["id"];

interface Props {
  selectedSkillID?: SkillID | null;
  stackSkillIDs?: readonly string[];
  onSkillSelect: (id: SkillID, focused: boolean) => void;
  onSkillClose: (focused: boolean) => void;
}

export default function SkillsSection({
  selectedSkillID,
  stackSkillIDs,
  onSkillSelect,
  onSkillClose,
}: Props) {
  const expandedSkill = skills.find((skill) => skill.id === selectedSkillID);
  const stackSkillIDSet = new Set(stackSkillIDs);
  const isStackMode = stackSkillIDs !== undefined;
  const activeExpandedSkill = expandedSkill;

  function expand(id: SkillID) {
    onSkillSelect(id, !isStackMode);
  }

  function collapse() {
    onSkillClose(!isStackMode);
  }

  return (
    <>
      <div className="mb-2 flex min-h-7 shrink-0 items-center justify-between gap-3 sm:mb-3 lg:mb-4">
        <motion.h1
          className="leading-none"
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
              className="inline-flex h-8 w-8 items-center justify-center rounded-sm text-orange-400 hover:cursor-pointer"
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

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <motion.div
          className="absolute inset-0 grid auto-rows-fr grid-cols-4 items-center gap-x-2 gap-y-2 sm:gap-x-3 sm:gap-y-3 lg:grid-rows-4 lg:gap-x-3 lg:gap-y-4 2xl:gap-x-4 2xl:gap-y-5"
          animate={{
            opacity: activeExpandedSkill ? 0 : 1,
          }}
          transition={{ duration: 0.09, ease: "easeOut" }}
          style={{
            pointerEvents: activeExpandedSkill ? "none" : "auto",
          }}
        >
          {skills.map((skill) => {
            const isHighlighted = !isStackMode || stackSkillIDSet.has(skill.id);
            const isClickable = !isStackMode || isHighlighted;
            const skillContent = (
              <>
                <motion.img
                  className="w-[clamp(2rem,8vw,3rem)] object-contain sm:w-[clamp(2rem,4.6vw,3.25rem)] lg:w-[clamp(2rem,3vw,3.45rem)] 2xl:w-[clamp(2.4rem,2.7vw,4rem)]"
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
                <p className="text-center text-[0.68rem] leading-none sm:text-[0.72rem] 2xl:text-[0.8rem]">
                  {skill.name}
                </p>
              </>
            );

            const itemClassName = `flex min-w-0 flex-col items-center justify-center gap-1 rounded-md text-center transition-[filter,color] sm:gap-1.5 lg:gap-2 ${
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
        </motion.div>

        <AnimatePresence initial={false}>
          {activeExpandedSkill && (
            <motion.div
              key="expanded"
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.09, ease: "easeOut" }}
            >
              <motion.img
                className="w-[clamp(3rem,7vw,5rem)] object-contain"
                src={activeExpandedSkill.image.src}
                alt={activeExpandedSkill.image.alt}
                draggable={false}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
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
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.09, ease: "easeOut" }}
                />
              ) : (
                <div className="rounded-md border border-dashed border-foreground/30 px-4 py-3 text-xs text-foreground/70">
                  Certificate image placeholder
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
