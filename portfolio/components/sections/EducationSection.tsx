export default function EducationSection() {
  return (
    <>
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
    </>
  );
}
