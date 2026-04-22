import { aboutText } from "@/data/about";

export default function AboutSection() {
  return (
    <>
      <h1>About</h1>
      <p className="flex h-full items-center text-sm">{aboutText}</p>
    </>
  );
}
