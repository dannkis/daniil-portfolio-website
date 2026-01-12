"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Project = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  repoUrl: string;
  liveUrl?: string;
  tech?: string[];
};

const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Portfolio v2",
    description:
      "A Next.js + Tailwind portfolio with animated sections, MDX notes, and a CMS-less content layer.",
    imageSrc: "/images/projects/rotamaker.png",
    repoUrl: "https://github.com/you/portfolio",
    liveUrl: "https://your-site.com",
    tech: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    id: "p2",
    title: "Sensor Dashboard",
    description:
      "Realtime dashboard for embedded sensor data with charts, filtering, and export.",
    imageSrc: "/images/projects/simplydone.png",
    repoUrl: "https://github.com/you/dashboard",
    tech: ["React", "Charts", "CSV Export"],
  },
];

export default function ProjectsGrid() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const expandedProject = useMemo(
    () => PROJECTS.find((p) => p.id === expandedId) ?? null,
    [expandedId],
  );

  // Grid view
  if (!expandedProject) {
    return (
      <section className="w-full">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PROJECTS.map((p) => (
            <button
              key={p.id}
              onClick={() => setExpandedId(p.id)}
              className="group overflow-hidden rounded-2xl border border-white/15 text-left transition hover:border-white/30"
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={p.imageSrc}
                  alt={p.title}
                  fill
                  className="object-cover transition group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={false}
                />
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="line-clamp-2 text-sm opacity-80">
                  {p.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>
    );
  }

  // Expanded view
  return (
    <section className="w-full">
      <div className="overflow-hidden rounded-2xl border border-white/15">
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <div>
            <h2 className="text-xl font-semibold">{expandedProject.title}</h2>
            <p className="text-sm opacity-80">Project details</p>
          </div>

          <button
            onClick={() => setExpandedId(null)}
            className="rounded-xl border border-white/15 px-3 py-2 text-sm transition hover:border-white/30"
          >
            Back to projects
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image expands within parent */}
          <div className="relative aspect-[16/10] w-full lg:aspect-auto lg:min-h-[28rem]">
            <Image
              src={expandedProject.imageSrc}
              alt={expandedProject.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-4 p-6">
            <p className="opacity-90">{expandedProject.description}</p>

            {expandedProject.tech?.length ? (
              <ul className="flex flex-wrap gap-2">
                {expandedProject.tech.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-white/15 px-3 py-1 text-xs opacity-90"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={expandedProject.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/15 px-4 py-2 text-sm transition hover:border-white/30"
              >
                GitHub repo
              </a>

              {expandedProject.liveUrl ? (
                <a
                  href={expandedProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-white/15 px-4 py-2 text-sm transition hover:border-white/30"
                >
                  Live demo
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
