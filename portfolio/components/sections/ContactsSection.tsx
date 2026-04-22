export default function ContactsSection() {
  return (
    <>
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
    </>
  );
}
