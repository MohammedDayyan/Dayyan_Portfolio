"use client";

import Link from "next/link";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/Container";
import { useState } from "react";

const nav = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#blog", label: "Blog" },
  { href: "/#resume", label: "Resume" },
  { href: "/#contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#020617]/75 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-lg">
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/20 bg-white/5 text-sm hover:border-white/40 md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            <span className="text-lg leading-none">{open ? "×" : "≡"}</span>
          </button>
          <a
            href={siteConfig.links.github}
            className="rounded-full border border-white/20 px-3 py-1.5 text-sm hover:border-white/40"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            href="/#resume"
            className="rounded-full bg-cyan-400 px-3 py-1.5 text-sm font-medium text-black hover:bg-cyan-300"
          >
            Resume
          </a>
        </div>
      </Container>

      {open ? (
        <div className="border-t border-white/10 bg-[#020617] md:hidden">
          <Container className="py-4">
            <nav className="grid gap-2 text-sm text-zinc-300">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-3 py-2 hover:bg-white/[0.08]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}

