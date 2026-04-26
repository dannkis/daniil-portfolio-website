"use client";
import { motion } from "framer-motion";
import { education, type Education } from "@/lib/content";

type EducationID = (typeof education)[number]["id"];

interface Props {
  selectedEducation?: Education;
  onEducationSelect: (id: EducationID) => void;
}

export default function EducationSection({
  selectedEducation,
  onEducationSelect,
}: Props) {
  return (
    <>
      <motion.h1
        className="mb-4"
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {selectedEducation ? selectedEducation.qualification : "Education"}
      </motion.h1>

      <motion.div
        className="relative flex min-h-0 flex-1 overflow-visible"
        initial={false}
        animate={{ gap: "0rem" }}
        transition={{ type: "spring", stiffness: 240, damping: 28 }}
      >
        <div className="flex min-h-0 min-w-0 basis-full overflow-visible">
          <div
            id="timeline"
            className="relative grid min-h-0 w-4 shrink-0 grid-cols-1 grid-rows-4 items-center justify-items-center overflow-visible"
          >
            <div className="absolute top-[12.5%] bottom-[12.5%] left-1/2 w-0 -translate-x-1/2 border"></div>
            {education.map((entry) => {
              const isSelected = selectedEducation?.id === entry.id;

              return (
                <motion.button
                  key={entry.id}
                  type="button"
                  className="z-10 h-4 w-4 rounded-full hover:cursor-pointer"
                  style={{ backgroundColor: entry.color }}
                  aria-label={`Select ${entry.qualification}`}
                  onMouseEnter={() => onEducationSelect(entry.id)}
                  onClick={() => onEducationSelect(entry.id)}
                  animate={{
                    scale: isSelected ? 1.25 : 1,
                    boxShadow: isSelected
                      ? "0 0 18px rgba(251, 146, 60, 0.35)"
                      : "0 0 0 rgba(251, 146, 60, 0)",
                  }}
                  whileHover={{ scale: isSelected ? 1.25 : 1.12 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    scale: { type: "spring", stiffness: 300, damping: 24 },
                    boxShadow: { duration: isSelected ? 0.18 : 0.08 },
                  }}
                />
              );
            })}
          </div>
          <div
            id="education-info"
            className="ms-6 grid min-h-0 flex-1 grid-cols-1 grid-rows-4 items-center"
          >
            {education.map((entry) => {
              const isSelected = selectedEducation?.id === entry.id;

              return (
                <motion.button
                  key={entry.id}
                  type="button"
                  className="min-w-0 text-left hover:cursor-pointer"
                  onMouseEnter={() => onEducationSelect(entry.id)}
                  onClick={() => onEducationSelect(entry.id)}
                  initial={false}
                  animate={{
                    opacity: selectedEducation && !isSelected ? 0.34 : 1,
                    scale: selectedEducation && isSelected ? 1.02 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 28,
                  }}
                >
                  <p className="subheading text-gray-300">{entry.period}</p>
                  <p className="text-body-compact">{entry.name}</p>
                  <p className="subheading text-gray-400">
                    {entry.qualification}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </>
  );
}
