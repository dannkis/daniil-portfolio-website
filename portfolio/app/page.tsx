"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { aboutText } from "@/data/about";
import { skills } from "@/data/skills";
import ProjectsSection from "@/components/sections/ProjectsSection";

export default function Home() {
  const [projectFocused, setProjectFocused] = useState(false);

  return (
    <main
      className={`h-screen min-h-200 p-4 transition-all duration-500 ${
        projectFocused ? "projects-focused" : ""
      }`}
    >
      <div className="h-full grid-cols-4 grid-rows-5 gap-4 lg:grid">
        <div
          className="box-container col-span-2 row-span-2 grid grid-cols-2 gap-12"
          id="contacts"
        >
          <div className="box-subcontainer flex items-center justify-center">
            <div className="flex aspect-square h-full">
              <img
                className="object-contain"
                src="/images/profile.png"
                alt="Profile picture of me facing to the side, with a nice background in the nature."
              />
            </div>
          </div>
          <div className="box-subcontainer relative flex items-center">
            <h1 className="text-5xl">
              Daniil <br /> Zhelyazkov
            </h1>
            <div className="absolute bottom-0 flex h-10 w-full items-center">
              <div className="me-3 flex items-center">
                <img
                  src="/images/icons/linkedin.svg"
                  alt="The original icon of the LinkedIn website."
                  className="me-1 h-6"
                />
                <p className="text-sm">LinkedIn</p>
              </div>
              <div className="me-3 flex items-center">
                <img
                  src="/images/icons/github.svg"
                  alt="The original icon of the GitHub website."
                  className="me-1 h-6"
                />
                <p className="text-sm">GitHub</p>
              </div>
              <div className="flex items-center">
                <img
                  src="/images/icons/email.svg"
                  alt="An email icon."
                  className="me-1 h-5"
                />
                <p className="text-sm">Email</p>
              </div>
            </div>
          </div>
        </div>

        <div className="box-container col-span-2 row-span-3" id="projects">
          <div className="box-subcontainer flex flex-col">
            <ProjectsSection onFocusChange={setProjectFocused} />
          </div>
        </div>

        <div className="box-container row-span-3" id="education">
          <div className="box-subcontainer flex flex-col">
            <h1 className="mb-4">Education</h1>
            <div className="flex h-full">
              <div
                id="timeline"
                className="relative grid h-full w-6 grid-cols-1 grid-rows-4 items-center"
              >
                <div className="absolute top-[12.5%] right-0 bottom-[12.5%] left-0 m-auto w-0 border"></div>
                <div className="circle bg-red-500" />
                <div className="circle bg-orange-500" />
                <div className="circle bg-yellow-500" />
                <div className="circle bg-green-500" />
              </div>
              <div
                id="education-info"
                className="ms-4 grid h-full w-full grid-cols-1 grid-rows-4 items-center"
              >
                <div className="flex flex-col">
                  <p className="subheading text-gray-300">2022 - 2025</p>
                  <p className="text-sm">Queen Mary University of London</p>
                  <p className="subheading text-gray-400">
                    BSc in Computer Science (First Class)
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="subheading text-gray-300">2020 - 2022</p>
                  <p className="text-sm">Exeter College</p>
                  <p className="subheading text-gray-400">
                    A-Levels in Computer Science, Mathematics, English Language
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="subheading text-gray-300">2019 - 2020</p>
                  <p className="text-sm">South Devon College</p>
                  <p className="subheading text-gray-400">
                    BTEC Level 2 in Computing
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="subheading text-gray-300">2017 - 2019</p>
                  <p className="text-sm">Romain Rolland Secondary School</p>
                  <p className="subheading text-gray-400">
                    General Secondary Education
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="box-container row-span-3" id="skills">
          <div className="box-subcontainer flex flex-col">
            <h1 className="mb-4">Skills</h1>
            <div className="grid h-full grid-cols-4 grid-rows-4 items-center gap-x-4 gap-y-6">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.id}
                  className="flex flex-col items-center justify-center gap-2"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
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
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="box-container col-span-2 row-span-2" id="about">
          <div className="box-subcontainer flex flex-col">
            <h1>About</h1>
            <p className="flex h-full items-center text-sm">{aboutText}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
