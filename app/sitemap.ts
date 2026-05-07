import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { getAllBlogPosts } from "@/lib/blog";
import { siteConfig } from "@/data/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;

  const posts = await getAllBlogPosts();

  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/about`, lastModified: new Date() },
    { url: `${base}/projects`, lastModified: new Date() },
    ...projects.map((p) => ({ url: `${base}/projects/${p.slug}`, lastModified: new Date() })),
    { url: `${base}/case-study/skin-health`, lastModified: new Date() },
    { url: `${base}/blog`, lastModified: new Date() },
    ...posts.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.date || Date.now()) })),
    { url: `${base}/resume`, lastModified: new Date() },
    { url: `${base}/contact`, lastModified: new Date() },
  ];
}

