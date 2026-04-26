export default function ContactsSection() {
  return (
    <>
      <div className="box-subcontainer flex items-center justify-center">
        <div className="flex aspect-square h-40 sm:h-full sm:max-h-full">
          <img
            className="object-contain"
            src="/images/profile.png"
            alt="Profile picture of me facing to the side, with a nice background in the nature."
          />
        </div>
      </div>
      <div className="box-subcontainer relative flex min-h-44 items-center pb-12 sm:min-h-0">
        <h1 className="text-display">
          Daniil <br /> Zhelyazkov
        </h1>
        <div className="absolute bottom-0 flex min-h-10 w-full flex-wrap items-center gap-x-3 gap-y-2">
          <div className="me-3 flex items-center">
            <img
              src="/images/icons/linkedin.svg"
              alt="The original icon of the LinkedIn website."
              className="me-1 h-6"
            />
            <p className="text-body-compact">LinkedIn</p>
          </div>
          <div className="me-3 flex items-center">
            <img
              src="/images/icons/github.svg"
              alt="The original icon of the GitHub website."
              className="me-1 h-6"
            />
            <p className="text-body-compact">GitHub</p>
          </div>
          <div className="flex items-center">
            <img
              src="/images/icons/email.svg"
              alt="An email icon."
              className="me-1 h-5"
            />
            <p className="text-body-compact">Email</p>
          </div>
        </div>
      </div>
    </>
  );
}
