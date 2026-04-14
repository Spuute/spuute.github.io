import { marked } from "marked";
import hljs from "highlight.js";

marked.setOptions({
  gfm: true,
  breaks: false,
});

const renderer = new marked.Renderer();
renderer.code = function ({ text, lang }: { text: string; lang?: string }) {
  const language = lang && hljs.getLanguage(lang) ? lang : "plaintext";
  const highlighted = hljs.highlight(text, { language }).value;
  return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`;
};
marked.use({ renderer });

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  html: string;
}

function parseFrontmatter(raw: string): { meta: Record<string, string>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, content: raw };

  const meta: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (value.startsWith("[") && value.endsWith("]")) {
      value = value.slice(1, -1);
    }
    meta[key] = value;
  }

  return { meta, content: match[2] };
}

export function parseMarkdown(slug: string, raw: string): BlogPost {
  const { meta, content } = parseFrontmatter(raw);
  const html = marked.parse(content) as string;
  const tags = (meta.tags || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return {
    slug,
    title: meta.title || slug,
    date: meta.date || "",
    tags,
    summary: meta.summary || "",
    html,
  };
}

export function loadBlogPosts(): BlogPost[] {
  const modules = import.meta.glob("/content/blog/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
  }) as Record<string, string>;

  const posts: BlogPost[] = [];
  for (const [path, raw] of Object.entries(modules)) {
    const slug = path.split("/").pop()!.replace(/\.md$/, "");
    posts.push(parseMarkdown(slug, raw));
  }

  posts.sort((a, b) => (a.date > b.date ? -1 : 1));
  return posts;
}
