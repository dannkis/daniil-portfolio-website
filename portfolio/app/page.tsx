type IconItem = {
  name: string;
  img_url: string;
};

const iconItems: IconItem[] = [
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
    <main className="min-h-200 h-screen p-4">
      <div className="grid grid-cols-4 grid-rows-5 gap-4 h-full">
        <div
          className="box-container row-span-2 col-span-2 grid grid-cols-2 gap-12"
          id="contacts"
        >
          <div className="box-subcontainer flex items-center justify-center">
            <div className="h-full aspect-square border border-white bg-amber-400"></div>
          </div>
          <div className="box-subcontainer flex items-center relative">
            <h1 className="text-5xl">
              Daniil <br /> Zhelyazkov
            </h1>
            <div className="w-full bg-amber-100 h-10 absolute bottom-0 grid grid-cols-3 items-center text-black">
              <p>LinkedIn</p>
              <p>GitHub</p>
              <p>Email</p>
            </div>
          </div>
        </div>
        <div className="box-container row-span-3 col-span-2" id="projects">
          <div className="box-subcontainer">
            <h1>Projects</h1>
          </div>
        </div>
        <div className="box-container row-span-3" id="education">
          <div className="box-subcontainer flex flex-col">
            <h1 className="mb-4">Education</h1>
            <div className="h-full flex">
              <div
                id="timeline"
                className="h-full w-6 grid grid-cols-1 grid-rows-4 items-center relative"
              >
                <div className="absolute top-[12.5%] bottom-[12.5%] border w-0 left-0 right-0 m-auto"></div>
                <div className="bg-red-500 circle" />
                <div className="bg-orange-500 circle" />
                <div className="bg-yellow-500 circle" />
                <div className="bg-green-500 circle" />
              </div>
              <div
                id="education-info"
                className="h-full w-full grid grid-rows-4 grid-cols-1 items-center ms-4"
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
            <div className="grid grid-rows-4 grid-cols-4 h-full gap-8 items-center">
              {iconItems.map((item) => (
                <div
                  key={iconItems.indexOf(item)}
                  className="flex flex-col items-center"
                >
                  <div className="bg-white w-full aspect-square">
                    <img
                      src={item.img_url}
                      alt="image"
                      className="object-contain"
                    />
                  </div>
                  <p className="subheading">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="box-container row-span-2 col-span-2" id="about">
          <div className="box-subcontainer">
            <h1>About</h1>
          </div>
        </div>
      </div>
    </main>
  );
}
