import Link from "next/link";
import type { Project } from "@/data/projects";
import { Badge } from "@/components/ui/Badge";

export function ProjectCard({ project }: { project: Project }) {
  const href = project.links?.github ?? `/projects/${project.slug}`;
  const isExternal = Boolean(project.links?.github);

  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group block rounded-3xl border border-black/10 bg-white p-6 transition hover:-translate-y-0.5 hover:border-black/20 hover:shadow-sm dark:border-white/10 dark:bg-zinc-950 dark:hover:border-white/20"
    >
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <div className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {project.name}
          </div>
          <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {project.tagline}
          </div>
        </div>
        <span className="text-sm text-zinc-500 group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-50">
          View →
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech.slice(0, 6).map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>
    </Link>
  );
}

