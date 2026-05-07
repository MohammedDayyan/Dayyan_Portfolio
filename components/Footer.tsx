import { Container } from "@/components/Container";
import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-black/5 py-10 text-sm text-zinc-600 dark:border-white/10 dark:text-zinc-400">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="font-medium text-zinc-900 dark:text-zinc-100">
            {siteConfig.name}
          </div>
          <div className="mt-1">{siteConfig.title}</div>
        </div>

        <div className="flex flex-wrap gap-4">
          <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={siteConfig.links.email}>Email</a>
        </div>
      </Container>
    </footer>
  );
}

