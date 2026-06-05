import { db, blogPostsTable } from "@workspace/db";
import { openai } from "@workspace/integrations-openai-ai-server";
import { eq } from "drizzle-orm";
import { logger } from "./lib/logger";

const TOPICS = [
  {
    title: "Why Aesthetics Clinics Need a Bespoke Website (Not a Template)",
    keywords: ["aesthetics clinic website", "bespoke clinic website design", "beauty clinic website UK"],
    category: "insights",
  },
  {
    title: "Online Booking Systems for Aesthetics Clinics: A Complete Guide",
    keywords: ["aesthetics clinic booking system", "online booking beauty clinic", "clinic appointment software UK"],
    category: "guides",
  },
  {
    title: "How to Rank Your Aesthetics Clinic on Google in 2025",
    keywords: ["aesthetics clinic SEO", "local SEO beauty clinic", "rank aesthetics clinic Google"],
    category: "seo",
  },
  {
    title: "AI Receptionists for Aesthetics Clinics: What You Need to Know",
    keywords: ["AI receptionist aesthetics clinic", "chatbot beauty clinic", "automated booking aesthetics"],
    category: "technology",
  },
  {
    title: "The Ultimate Guide to Clinic Branding in the UK Aesthetics Market",
    keywords: ["aesthetics clinic branding UK", "beauty clinic brand design", "clinic website branding"],
    category: "insights",
  },
  {
    title: "Botox Clinic Website Design: What Converts Visitors Into Bookings",
    keywords: ["botox clinic website design", "botox website UK", "aesthetics website conversion"],
    category: "guides",
  },
  {
    title: "Lip Filler Clinic Websites: Standing Out in a Competitive Market",
    keywords: ["lip filler clinic website", "filler clinic website design UK", "aesthetics website lip filler"],
    category: "guides",
  },
  {
    title: "Monthly Website Maintenance for Aesthetics Clinics: Why It Matters",
    keywords: ["clinic website maintenance UK", "aesthetics website support", "beauty clinic website upkeep"],
    category: "insights",
  },
  {
    title: "How to Choose the Right Booking Software for Your Aesthetics Clinic",
    keywords: ["Fresha vs Ovatu aesthetics", "booking software beauty clinic UK", "best booking system aesthetics"],
    category: "technology",
  },
  {
    title: "Aesthetics Website Design Trends UK Clinics Should Know in 2025",
    keywords: ["aesthetics website trends 2025", "beauty clinic web design UK", "modern clinic website design"],
    category: "insights",
  },
  {
    title: "Local SEO for London Aesthetics Clinics: A Step-by-Step Guide",
    keywords: ["London aesthetics clinic SEO", "local SEO beauty clinic London", "aesthetics clinic Google Maps"],
    category: "seo",
  },
  {
    title: "Why Your Aesthetics Clinic's Website Is Losing You Clients",
    keywords: ["aesthetics clinic website problems", "clinic website not converting UK", "beauty clinic website mistakes"],
    category: "insights",
  },
];

function buildSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

function estimateReadingMinutes(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(3, Math.round(words / 200));
}

export async function generateMonthlyBlogPost(): Promise<number | null> {
  logger.info("Blog content generation starting");

  const existing = await db.select({ slug: blogPostsTable.slug }).from(blogPostsTable);
  const existingSlugs = new Set(existing.map(r => r.slug));

  const unused = TOPICS.filter(t => !existingSlugs.has(buildSlug(t.title)));
  if (unused.length === 0) {
    logger.info("All blog topics already published — no new post generated");
    return null;
  }

  const topic = unused[Math.floor(Math.random() * unused.length)];
  const slug = buildSlug(topic.title);
  const keywordList = topic.keywords.join(", ");
  const currentMonth = new Date().toLocaleString("en-GB", { month: "long", year: "numeric" });

  logger.info({ topic: topic.title }, "Generating blog post");

  const response = await openai.chat.completions.create({
    model: "gpt-5.1",
    max_completion_tokens: 2000,
    messages: [
      {
        role: "system",
        content: `You are a senior content writer for Aesthetix Systems, a premium UK London agency that builds bespoke websites, booking systems, and AI receptionists for aesthetics and beauty clinics.
Write authoritative, practical, keyword-rich blog posts that help UK aesthetics clinic owners make smart decisions.
Tone: confident, expert, warm — not salesy. Speak directly to clinic owners.
Always write in British English (colour, optimise, etc.).

Respond using EXACTLY these labelled sections with no extra text before or after:

TITLE: [your title here — 60 chars max]
META_TITLE: [50-60 chars, includes primary keyword]
META_DESCRIPTION: [130-155 chars, compelling, includes keyword]
EXCERPT: [2 sentences max, 200 chars max — used as intro teaser]
CONTENT:
[Full article in Markdown here — 700-900 words. Use ## for section headings, ### for sub-headings. End with a short soft CTA paragraph mentioning Aesthetix Systems.]`,
      },
      {
        role: "user",
        content: `Write a blog post about: "${topic.title}"
Target keywords: ${keywordList}
Month context: ${currentMonth}
Include practical advice, UK-specific examples, and real value for aesthetics clinic owners.`,
      },
    ],
  });

  const raw = (response.choices[0]?.message?.content ?? "").trim();

  if (!raw) {
    logger.error({ topic: topic.title }, "AI returned empty response");
    return null;
  }

  function extractField(label: string): string {
    const regex = new RegExp(`^${label}:\\s*(.+)$`, "m");
    return (raw.match(regex)?.[1] ?? "").trim();
  }

  const contentMatch = raw.match(/^CONTENT:\s*\n([\s\S]+)$/m);
  const content = contentMatch ? contentMatch[1].trim() : "";

  const parsed = {
    title: extractField("TITLE"),
    metaTitle: extractField("META_TITLE"),
    metaDescription: extractField("META_DESCRIPTION"),
    excerpt: extractField("EXCERPT"),
    content,
  };

  if (!parsed.title || !parsed.content || !parsed.excerpt) {
    logger.error({ parsed }, "AI blog post missing required fields");
    return null;
  }

  const [inserted] = await db
    .insert(blogPostsTable)
    .values({
      slug,
      title: parsed.title,
      excerpt: parsed.excerpt,
      content: parsed.content,
      category: topic.category,
      tags: topic.keywords,
      metaTitle: parsed.metaTitle ?? null,
      metaDescription: parsed.metaDescription ?? null,
      readingMinutes: estimateReadingMinutes(parsed.content),
      published: true,
      generatedByAi: true,
    })
    .returning({ id: blogPostsTable.id });

  logger.info({ postId: inserted.id, slug, title: parsed.title }, "Blog post published");
  return inserted.id;
}

export async function listBlogPosts(limit = 20, offset = 0) {
  return db
    .select({
      id: blogPostsTable.id,
      slug: blogPostsTable.slug,
      title: blogPostsTable.title,
      excerpt: blogPostsTable.excerpt,
      category: blogPostsTable.category,
      tags: blogPostsTable.tags,
      readingMinutes: blogPostsTable.readingMinutes,
      publishedAt: blogPostsTable.publishedAt,
    })
    .from(blogPostsTable)
    .where(eq(blogPostsTable.published, true))
    .orderBy(blogPostsTable.publishedAt)
    .limit(limit)
    .offset(offset);
}

export async function getBlogPost(slug: string) {
  const [post] = await db
    .select()
    .from(blogPostsTable)
    .where(eq(blogPostsTable.slug, slug))
    .limit(1);
  return post ?? null;
}
