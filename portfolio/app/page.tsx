import { aboutText } from "@/data/about";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";

type MediaItem = {
  name: string;
  img_url: string;
};

const iconItems: MediaItem[] = [
  { name: "Alpha", img_url: "https://picsum.photos/seed/alpha/400" },
  { name: "Bravo", img_url: "https://picsum.photos/seed/bravo/400" },
  { name: "Charlie", img_url: "https://picsum.photos/seed/charlie/400" },
  { name: "Delta", img_url: "https://picsum.photos/seed/delta/400" },
  { name: "Echo", img_url: "https://picsum.photos/seed/echo/400" },
  { name: "Foxtrot", img_url: "https://picsum.photos/seed/foxtrot/400" },
  { name: "Golf", img_url: "https://picsum.photos/seed/golf/400" },
  { name: "Hotel", img_url: "https://picsum.photos/seed/hotel/400" },
  { name: "India", img_url: "https://picsum.photos/seed/india/400" },
  { name: "Juliet", img_url: "https://picsum.photos/seed/juliet/400" },
  { name: "Kilo", img_url: "https://picsum.photos/seed/kilo/400" },
  { name: "Lima", img_url: "https://picsum.photos/seed/lima/400" },
  { name: "Mike", img_url: "https://picsum.photos/seed/mike/400" },
  { name: "November", img_url: "https://picsum.photos/seed/november/400" },
  { name: "Oscar", img_url: "https://picsum.photos/seed/oscar/400" },
  { name: "Papa", img_url: "https://picsum.photos/seed/papa/400" },
];

export default function Home() {
  return (
    <main className="h-screen min-h-200 p-4">
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
                  alt="The original icon of the LinkedIn website."
                  className="me-1 h-6"
                />
                <p className="text-sm">GitHub</p>
              </div>
              <div className="flex items-center">
                <img
                  src="/images/icons/email.svg"
                  alt="The original icon of the LinkedIn website."
                  className="me-1 h-5"
                />
                <p className="text-sm">Email</p>
              </div>
            </div>
          </div>
        </div>
        <div className="box-container col-span-2 row-span-3" id="projects">
          <div className="box-subcontainer flex flex-col">
            <h1 className="mb-6">Projects</h1>
            <div className="grid h-full grid-cols-3 items-center gap-x-6 gap-y-10 overflow-scroll">
              {projects.map((project) => (
                <div key={project.id} className="flex flex-col items-center">
                  <div>
                    <img
                      src={project.image.src}
                      alt={project.image.alt}
                      className="object-contain"
                    />
                  </div>
                  <p className="subheading">{project.name}</p>
                </div>
              ))}
            </div>
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
            <div className="grid h-full grid-cols-4 grid-rows-4 items-center gap-x-7">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex flex-col items-center justify-center"
                >
                  <img
                    className="w-full"
                    src={skill.image.src}
                    alt={skill.image.alt}
                  />
                  <p className="subheading mt-1">{skill.name}</p>
                </div>
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
