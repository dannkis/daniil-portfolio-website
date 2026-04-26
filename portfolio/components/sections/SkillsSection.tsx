"use client";
import { motion } from "framer-motion";
import { skills } from "@/lib/content";

type SkillID = (typeof skills)[number]["id"];

interface Props {
  activeSkillID?: SkillID | null;
  stackSkillIDs?: readonly string[];
  onSkillHover: (id: SkillID) => void;
}

export default function SkillsSection({
  activeSkillID,
  stackSkillIDs,
  onSkillHover,
}: Props) {
  const activeSkill = skills.find((skill) => skill.id === activeSkillID);
  const stackSkillIDSet = new Set(stackSkillIDs);
  const isStackMode = stackSkillIDs !== undefined;

  return (
    <>
      <div className="mb-2 flex min-h-7 shrink-0 items-center justify-between gap-3 sm:mb-3 lg:mb-4">
        <motion.h1
          className="leading-none"
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {activeSkill
            ? activeSkill.name
            : isStackMode
              ? "Stack Used"
              : "Skills"}
        </motion.h1>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <motion.div className="absolute inset-0 grid auto-rows-fr grid-cols-4 items-center gap-x-2 gap-y-2 py-2 sm:gap-x-3 sm:gap-y-3 sm:py-3 lg:grid-rows-4 lg:gap-x-3 lg:gap-y-4 lg:py-2 2xl:gap-x-4 2xl:gap-y-5">
          {skills.map((skill) => {
            const isProjectHighlighted =
              !isStackMode || stackSkillIDSet.has(skill.id);
            const isHighlighted = activeSkill
              ? skill.id === activeSkill.id
              : isProjectHighlighted;
            const isInteractive = !isStackMode || isProjectHighlighted;
            const skillContent = (
              <>
                <motion.img
                  className="w-[clamp(2rem,8vw,3rem)] object-contain sm:w-[clamp(2rem,4.6vw,3.25rem)] lg:w-[clamp(2rem,3vw,3.45rem)] 2xl:w-[clamp(2.4rem,2.7vw,4rem)]"
                  src={skill.image.src}
                  alt={skill.image.alt}
                  draggable={false}
                  animate={{
                    scale:
                      activeSkill && isHighlighted
                        ? 1.16
                        : isStackMode && isProjectHighlighted
                          ? 1.12
                          : 1,
                  }}
                  whileHover={isInteractive ? { scale: 1.04 } : undefined}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 24,
                  }}
                />
                <p className="text-label text-center">{skill.name}</p>
              </>
            );

            const itemClassName = `flex min-w-0 flex-col items-center justify-center gap-1 rounded-md text-center transition-[filter,color] sm:gap-1.5 lg:gap-2 ${
              isHighlighted ? "" : "grayscale"
            }`;

            const motionProps = {
              initial: { opacity: 0, y: 12 },
              animate: {
                opacity: isHighlighted ? 1 : activeSkill ? 0.24 : 0.28,
                y: 0,
                scale: activeSkill && isHighlighted ? 1.08 : 1,
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
                  isInteractive ? "hover:cursor-pointer" : ""
                }`}
                disabled={!isInteractive}
                aria-disabled={!isInteractive}
                onMouseEnter={
                  isInteractive ? () => onSkillHover(skill.id) : undefined
                }
                onClick={
                  isInteractive ? () => onSkillHover(skill.id) : undefined
                }
                whileTap={isInteractive ? { scale: 0.97 } : undefined}
                {...motionProps}
              >
                {skillContent}
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </>
  );
}
