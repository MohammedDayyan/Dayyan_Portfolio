import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type BlogFrontmatter = {
  title: string;
  date: string; // ISO-ish string in content
  summary: string;
  tags?: string[];
};

export type BlogPost = BlogFrontmatter & {
  slug: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const entries = await fs.readdir(BLOG_DIR, { withFileTypes: true });
  const mdFiles = entries
    .filter((e) => e.isFile() && e.name.endsWith(".md"))
    .map((e) => e.name);

  const posts = await Promise.all(
    mdFiles.map(async (filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = await fs.readFile(path.join(BLOG_DIR, filename), "utf8");
      const { data } = matter(raw);
      const fm = data as Partial<BlogFrontmatter>;

      return {
        slug,
        title: fm.title ?? slug,
        date: fm.date ?? "",
        summary: fm.summary ?? "",
        tags: fm.tags ?? [],
      };
    }),
  );

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getBlogPost(slug: string): Promise<{
  frontmatter: BlogFrontmatter;
  contentHtml: string;
}> {
  const fullPath = path.join(BLOG_DIR, `${slug}.md`);
  const raw = await fs.readFile(fullPath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as Partial<BlogFrontmatter>;

  const processed = await remark().use(html, { sanitize: false }).process(content);
  const contentHtml = processed.toString();

  return {
    frontmatter: {
      title: fm.title ?? slug,
      date: fm.date ?? "",
      summary: fm.summary ?? "",
      tags: fm.tags ?? [],
    },
    contentHtml,
  };
}

