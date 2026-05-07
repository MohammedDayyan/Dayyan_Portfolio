export const siteConfig = {
  name: "Mohammed Dayyan",
  title: "AI Engineer | Backend Developer | Production-ready ML systems",
  description:
    "AI Engineer building scalable, production-ready ML systems with measurable impact (latency, accuracy, throughput).",
  url: "https://example.com",
  location: "India",
  links: {
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
    email: "mailto:dayyan.soherwardi123@gmail.com",
    resumePdf: "/Dayyan_Resume.pdf",
  },
} as const;

export type SiteConfig = typeof siteConfig;

