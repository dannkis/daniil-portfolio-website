import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectGallery from "@/components/ProjectGallery";
import { projects } from "@/lib/content";
import { appReleases } from "@/lib/releases";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(appReleases).map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);
  return {
    title: `${project?.name ?? "Project"} · Daniil Zhelyazkov`,
    description: project?.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);
  const release = appReleases[id];
  if (!project || !release) notFound();

  return (
    <main className="mx-auto max-w-7xl px-5 py-8 sm:px-10 sm:py-12">
      <nav
        aria-label="Project navigation"
        className="flex items-center justify-between gap-4 border-b border-foreground/20 pb-6 text-xs sm:text-sm"
      >
        <Link href="/" className="rounded-sm hover:text-accent">
          ← Back to portfolio
        </Link>
        <span className="text-muted">Daniil Zhelyazkov / Selected work</span>
      </nav>
      <header className="max-w-4xl pt-12 pb-9 sm:pt-16">
        <p className="mb-4 text-xs tracking-[0.18em] text-muted uppercase">
          Independent macOS app
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">
            {project.name}
          </h1>
          <span className="rounded-full border border-foreground/20 px-3 py-1 text-xs text-muted">
            {release.version ? `v${release.version}` : "In development"}
          </span>
        </div>
        <p className="mt-5 text-xl font-normal text-foreground/85 sm:text-2xl">
          {release.summary}
        </p>
      </header>
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12">
        <ProjectGallery
          key={project.id}
          images={project.gallery ?? [project.image]}
          name={project.name}
        />
        <aside className="rounded-2xl border border-foreground/20 p-6">
          <p className="text-xs tracking-widest text-muted uppercase">
            {release.download ? "Available preview" : "On the horizon"}
          </p>
          <h2 className="mt-3 text-xl">
            {release.download ? "Try it on your Mac." : "Still taking shape."}
          </h2>
          <p className="mt-2 text-sm font-normal text-muted">
            {release.platform}
          </p>
          <div className="mt-6 flex flex-col gap-3">
            {release.download ? (
              <a
                href={release.download}
                className="rounded-lg bg-accent px-4 py-3 text-center text-sm text-accent-foreground transition-colors hover:bg-accent-hover"
              >
                Download for Mac ↗
              </a>
            ) : (
              <span className="rounded-lg border border-dashed border-foreground/25 px-4 py-3 text-center text-sm text-muted">
                Download · Coming soon
              </span>
            )}
            {release.github && (
              <a
                href={release.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-foreground/25 px-4 py-3 text-center text-sm hover:border-accent hover:text-accent"
              >
                Release notes & checksums ↗
              </a>
            )}
            <span className="text-center text-xs text-muted">
              Repo · Coming soon
            </span>
          </div>
          <p className="mt-6 border-t border-foreground/15 pt-5 text-xs leading-relaxed font-normal text-muted">
            {release.note}
          </p>
        </aside>
      </div>
      <section className="mt-12 grid gap-8 border-t border-foreground/20 pt-9 sm:grid-cols-2 sm:gap-14">
        <div>
          <h2 className="mb-4 text-xl">Built for the everyday.</h2>
          <p className="text-sm leading-relaxed font-normal text-foreground/80">
            {project.description}
          </p>
          {release.download && release.install && (
            <>
              <h3 className="mt-7 mb-3 text-sm">Getting started</h3>
              <p className="text-sm leading-relaxed font-normal text-foreground/80">
                {release.install}
              </p>
            </>
          )}
        </div>
        <ul className="divide-y divide-foreground/15">
          {release.features.map((feature, index) => (
            <li key={feature} className="flex gap-5 py-4 first:pt-0">
              <span className="pt-0.5 text-xs text-accent">0{index + 1}</span>
              <p className="text-sm leading-relaxed font-normal text-foreground/80">
                {feature}
              </p>
            </li>
          ))}
        </ul>
      </section>
      <nav
        aria-label="More projects"
        className="mt-14 border-t border-foreground/20 pt-6"
      >
        <p className="mb-4 text-xs text-muted">More independent apps</p>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
          {projects
            .filter((item) => item.id !== id && appReleases[item.id])
            .map((item) => (
              <Link
                key={item.id}
                href={`/projects/${item.id}/`}
                className="hover:text-accent"
              >
                {item.name} ↗
              </Link>
            ))}
        </div>
      </nav>
    </main>
  );
}
