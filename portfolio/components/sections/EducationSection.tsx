"use client";
import { motion, AnimatePresence } from "framer-motion";
import { education, type Education } from "@/lib/content";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type EducationID = (typeof education)[number]["id"];

interface Props {
  selectedEducation?: Education;
  onEducationSelect: (id: EducationID) => void;
  onEducationClose: () => void;
}

export default function EducationSection({
  selectedEducation,
  onEducationSelect,
  onEducationClose,
}: Props) {
  const defaultEducation = education[0];
  const isLargeScreen = useMediaQuery("(min-width: 64rem)");

  return (
    <>
      <div className="flex justify-between">
        <motion.button
          className="mb-4 text-left hover:cursor-pointer"
          type="button"
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={() =>
            onEducationSelect(selectedEducation?.id ?? defaultEducation.id)
          }
        >
          <h1>
            {selectedEducation ? selectedEducation.qualification : "Education"}
          </h1>
        </motion.button>
        <AnimatePresence>
          {selectedEducation && (
            <motion.button
              className="text-orange-400 hover:cursor-pointer"
              type="button"
              onClick={onEducationClose}
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

      <motion.div
        className="relative flex min-h-0 flex-1 overflow-visible"
        initial={false}
        animate={{
          flexDirection: selectedEducation && !isLargeScreen ? "column" : "row",
          gap: selectedEducation ? (isLargeScreen ? "3rem" : "1rem") : "0rem",
        }}
        transition={{ type: "spring", stiffness: 240, damping: 28 }}
      >
        <div
          className={`flex min-h-0 min-w-0 overflow-visible ${
            selectedEducation && isLargeScreen ? "basis-1/2" : "basis-full"
          }`}
        >
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
                  <p className="text-sm">{entry.name}</p>
                  <p className="subheading text-gray-400">
                    {entry.qualification}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {selectedEducation && (
            <motion.div
              className="h-48 min-h-0 min-w-0 overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:left-[calc(50%+1.5rem)] lg:h-auto"
              initial={{
                opacity: 0,
                x: isLargeScreen ? 18 : 0,
                scaleY: isLargeScreen ? 1 : 0,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scaleY: 1,
              }}
              exit={{
                opacity: 0,
                x: isLargeScreen ? 18 : 0,
                scaleY: isLargeScreen ? 1 : 0,
              }}
              style={{ originY: 0 }}
              transition={{ type: "spring", stiffness: 240, damping: 28 }}
            >
              <motion.div
                key={selectedEducation.id}
                className="flex h-full min-w-0 flex-col items-center justify-center gap-4 overflow-hidden rounded-md border border-foreground/20 bg-foreground/5 p-4 text-center"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
              >
                <p className="subheading text-orange-400">
                  Certificate Preview
                </p>
                {selectedEducation.certificateImage ? (
                  <motion.img
                    className="max-h-full w-full object-contain"
                    src={selectedEducation.certificateImage.src}
                    alt={selectedEducation.certificateImage.alt}
                    draggable={false}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  />
                ) : (
                  <div className="flex h-full min-h-40 w-full items-center justify-center rounded-md border border-dashed border-foreground/30 px-4 py-6 text-xs text-foreground/70">
                    Add certificateImage to this education entry in
                    content/education.json.
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
