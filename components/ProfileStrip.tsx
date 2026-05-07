import Image from "next/image";
import { siteConfig } from "@/data/site";

export function ProfileStrip() {
  return (
    <div className="relative w-full rounded-3xl border border-black/10 bg-white p-6 pb-20 dark:border-white/10 dark:bg-zinc-950 sm:p-8 sm:pb-24">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-6">
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 sm:h-48 sm:w-48 lg:h-64 lg:w-64">
            <Image
              src="/images/dayyan.png"
              alt={`${siteConfig.name} photo`}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="min-w-0">
            <div className="text-2xl font-semibold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl lg:text-4xl">
              {siteConfig.name}
            </div>
            <div className="mt-1 text-base leading-7 text-zinc-600 dark:text-zinc-300 sm:text-lg lg:text-xl">
              {siteConfig.title}
            </div>
            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 sm:text-base">
              {siteConfig.location}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 flex flex-wrap justify-end gap-2 sm:bottom-5 sm:right-5">
        <a
          href={siteConfig.links.linkedin}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-10 items-center justify-center rounded-2xl border border-black/10 bg-white px-4 text-sm font-medium hover:border-black/20 dark:border-white/10 dark:bg-zinc-950 dark:hover:border-white/20"
        >
          LinkedIn
        </a>

        <div className="group relative">
          <a
            href={siteConfig.links.email}
            title="dayyan.soherwardi123@gmail.com"
            className="inline-flex h-10 items-center justify-center rounded-2xl bg-black px-4 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Gmail
          </a>
          <div className="pointer-events-none absolute bottom-full right-0 mb-2 hidden whitespace-nowrap rounded-xl border border-black/10 bg-white px-3 py-1.5 text-xs text-zinc-800 shadow-sm group-hover:block dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-100">
            dayyan.soherwardi123@gmail.com
          </div>
        </div>
      </div>
    </div>
  );
}

