import Link from "next/link";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { ProjectCard } from "@/components/ProjectCard";
import { ProfileStrip } from "@/components/ProfileStrip";
import { ContactForm } from "@/components/ContactForm";
import { ResumeExplainer } from "@/components/ResumeExplainer";
import { Badge } from "@/components/ui/Badge";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { getAllBlogPosts } from "@/lib/blog";

const timeline = [
  {
    title: "IIIT Kurnool",
    body: "Foundations in CS + systems, then moved toward applied ML and deployment.",
  },
  {
    title: "Production ML mindset",
    body: "Learned to treat models as products: evaluation, observability, and reliable inference paths.",
  },
  {
    title: "AI systems & RAG",
    body: "Built RAG pipelines with citations, guardrails, and meaningful offline evaluation.",
  },
] as const;

export default async function Home() {
  const posts = await getAllBlogPosts();
  return (
    <main className="py-14 sm:py-20">
      <Container>
        <section id="hero" className="scroll-mt-24">
          <div className="mb-10">
            <FadeIn>
              <ProfileStrip />
            </FadeIn>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-5xl text-center">
              <FadeIn>
                <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-200/[0.07] px-3 py-1 text-xs text-zinc-200 sm:px-4 sm:py-1.5 sm:text-sm">
                  AI Engineer · Backend Developer · Production ML
                </div>
                <h1 className="mt-6 text-4xl font-semibold leading-[1.06] tracking-tight sm:text-6xl sm:leading-[1.03] lg:text-7xl">
                  Building scalable ML systems with{" "}
                  <span className="text-cyan-300">measurable impact</span>.
                </h1>
                <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-zinc-300 sm:mt-6 sm:text-xl sm:leading-9">
                  I ship models to production: disciplined evaluation, low-latency
                  inference, and clean UX. I care about tail latency, reliability,
                  and the metrics that matter.
                </p>

                <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                  <a
                    href="#projects"
                    className="inline-flex h-11 items-center justify-center rounded-2xl bg-cyan-400 px-5 text-sm font-medium text-black hover:bg-cyan-300 sm:h-12 sm:px-6 sm:text-base"
                  >
                    View projects
                  </a>
                  <a
                    href="#resume"
                    className="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-5 text-sm font-medium hover:border-white/35 sm:h-12 sm:px-6 sm:text-base"
                  >
                    Resume
                  </a>
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-5 text-sm font-medium hover:border-white/35 sm:h-12 sm:px-6 sm:text-base"
                  >
                    GitHub
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-24 pt-18 sm:pt-24">
          <FadeIn>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              About
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-300">
              I’m an AI Engineer who likes work that lives at the boundary of{" "}
              <span className="font-medium text-zinc-100">ML quality</span> and{" "}
              <span className="font-medium text-zinc-100">
                production constraints
              </span>
              : latency, reliability, and clean interfaces. I aim to ship systems
              that are easy to operate, monitor, and iterate on.
            </p>
          </FadeIn>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {timeline.map((t, idx) => (
              <FadeIn key={t.title} delay={0.06 * idx}>
                <div className="rounded-3xl border border-white/10 bg-black/25 p-6 backdrop-blur-sm">
                  <div className="text-sm font-medium text-zinc-100">{t.title}</div>
                  <p className="mt-2 text-sm leading-7 text-zinc-300">{t.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.08}>
            <div className="mt-12 rounded-3xl border border-white/10 bg-black/25 p-6 backdrop-blur-sm">
              <div className="text-sm font-medium text-zinc-100">
                What I optimize for
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge>Latency</Badge>
                <Badge>Accuracy</Badge>
                <Badge>Reliability</Badge>
                <Badge>Observability</Badge>
                <Badge>Clean UX</Badge>
                <Badge>Reproducibility</Badge>
              </div>
            </div>
          </FadeIn>
        </section>

        <section id="projects" className="scroll-mt-24 pt-18 sm:pt-24">
          <FadeIn>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Projects
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-300">
              Each project is presented like a mini product page: problem,
              solution, architecture thinking, and measurable outcomes.
            </p>
          </FadeIn>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {projects.map((p, idx) => (
              <FadeIn key={p.slug} delay={0.04 * idx}>
                <ProjectCard project={p} />
              </FadeIn>
            ))}
          </div>
        </section>

        <section id="blog" className="scroll-mt-24 pt-18 sm:pt-24">
          <FadeIn>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Blog
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-300">
              Notes on production ML, performance, and building AI systems that
              work in the real world.
            </p>
          </FadeIn>
          <div className="mt-10 grid gap-4">
            {posts.map((p, idx) => (
              <FadeIn key={p.slug} delay={0.04 * idx}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="block rounded-3xl border border-white/10 bg-black/25 p-6 transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:shadow-sm"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                    <div className="text-lg font-semibold tracking-tight text-zinc-50">
                      {p.title}
                    </div>
                    <div className="text-sm text-zinc-400">{p.date}</div>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-zinc-300">
                    {p.summary}
                  </p>
                  {p.tags?.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.slice(0, 5).map((t) => (
                        <Badge key={t}>{t}</Badge>
                      ))}
                    </div>
                  ) : null}
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>

        <section id="resume" className="scroll-mt-24 pt-18 sm:pt-24">
          <FadeIn>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Resume
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-300">
              Download the full resume, or use the explainer to highlight the most
              relevant wins for a target role.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={siteConfig.links.resumePdf}
                download
                className="inline-flex h-11 items-center justify-center rounded-2xl bg-cyan-400 px-5 text-sm font-medium text-black hover:bg-cyan-300"
              >
                Download resume (PDF)
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-5 text-sm font-medium hover:border-white/35"
              >
                LinkedIn
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="mt-10">
              <ResumeExplainer />
            </div>
          </FadeIn>
        </section>

        <section id="contact" className="scroll-mt-24 pt-18 sm:pt-24">
          <FadeIn>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Contact
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-300">
              Want to collaborate or discuss an opportunity? Send a message - it
              opens your email client with everything prefilled.
            </p>
          </FadeIn>

          <div className="mt-12 grid grid-cols-1 gap-120 lg:mt-14 lg:grid-cols-12 lg:items-stretch lg:gap-140">
            <FadeIn delay={0.06}>
              <section className="h-full w-120 rounded-3xl border border-white/10 bg-black/25 p-8 shadow-sm backdrop-blur-sm sm:p-9 lg:col-span-7 lg:p-10">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold tracking-tight text-zinc-100">
                    Send a message
                  </h2>
                  <p className="mt-2 text-sm text-zinc-300">
                    Share a quick intro and what you are building. I usually reply
                    within 24-48 hours.
                  </p>
                </div>
                <ContactForm />
              </section>
            </FadeIn>

            <FadeIn delay={0.08}>
              <aside className="h-full w-120 rounded-3xl border border-white/10 bg-black/25 p-8 shadow-sm backdrop-blur-sm sm:p-9 lg:col-span-5 lg:p-10">
                <div className="text-sm font-semibold tracking-wide text-zinc-100">
                  Other ways to connect
                </div>
                <div className="mt-5 grid gap-3 text-sm text-zinc-200">
                  <a
                    href={siteConfig.links.email}
                    title="dayyan.soherwardi123@gmail.com"
                    className="rounded-2xl border border-white/15 px-4 py-3 transition hover:border-cyan-300/60 hover:bg-cyan-200/10"
                  >
                    Email
                  </a>
                  <a
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl border border-white/15 px-4 py-3 transition hover:border-cyan-300/60 hover:bg-cyan-200/10"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl border border-white/15 px-4 py-3 transition hover:border-cyan-300/60 hover:bg-cyan-200/10"
                  >
                    GitHub
                  </a>
                </div>
              </aside>
            </FadeIn>
          </div>
        </section>
      </Container>
    </main>
  );
}
