import { db, seoMetaOverridesTable, seoKeywordPositionsTable } from "@workspace/db";
import { openai } from "@workspace/integrations-openai-ai-server";
import { eq } from "drizzle-orm";
import { logger } from "./lib/logger";

const SITE = "aesthetix-systems.co.uk";

interface TargetKeyword {
  keyword: string;
  path: string;
  currentTitle: string;
  currentDescription: string;
}

const TARGET_KEYWORDS: TargetKeyword[] = [
  {
    keyword: "bespoke aesthetics clinic website design UK",
    path: "/services/bespoke-websites",
    currentTitle: "Bespoke Clinic Website Design | Aesthetix Systems",
    currentDescription: "Custom-designed websites for aesthetics and beauty clinics. No templates. Built around your brand, your treatments, and your patients. From £1,499.",
  },
  {
    keyword: "aesthetics clinic booking system UK",
    path: "/services/booking-systems",
    currentTitle: "Clinic Booking System Design | Aesthetix Systems",
    currentDescription: "Online booking systems for aesthetics and beauty clinics. Fresha, Ovatu, Timely integration or fully bespoke. Your brand, zero third-party fees.",
  },
  {
    keyword: "AI receptionist aesthetics clinic UK",
    path: "/services/ai-assistant",
    currentTitle: "AI Receptionist for Aesthetics Clinics | Aesthetix Systems",
    currentDescription: "24/7 AI receptionist for aesthetics and beauty clinics. Answers treatment questions, captures leads, and books consultations automatically. Never miss an enquiry.",
  },
  {
    keyword: "aesthetics clinic website maintenance UK",
    path: "/services/ongoing-support",
    currentTitle: "Clinic Website Maintenance & Support | Aesthetix Systems",
    currentDescription: "Monthly maintenance plans for aesthetics clinic websites. Hosting, security, content updates, AI receptionist, and priority WhatsApp support. From £19.99/month.",
  },
  {
    keyword: "aesthetics clinic website design London",
    path: "/aesthetics-websites/london",
    currentTitle: "Aesthetics Clinic Website Design in London | Aesthetix Systems",
    currentDescription: "Bespoke websites, booking systems & AI receptionists for aesthetics clinics in London. Premium design from £1,499. Trusted by UK clinics — message us today.",
  },
  {
    keyword: "botox clinic website design UK",
    path: "/aesthetics-websites/botox-clinics",
    currentTitle: "Botox Clinic Website Design | Aesthetix Systems",
    currentDescription: "Bespoke website design for botox clinics across the UK. Showcase your botox treatments, integrate online booking, and rank on Google. From £1,499.",
  },
  {
    keyword: "lip filler clinic website design",
    path: "/aesthetics-websites/lip-filler-clinics",
    currentTitle: "Lip Filler Clinic Website Design | Aesthetix Systems",
    currentDescription: "Bespoke website design for lip filler clinics across the UK. Showcase your lip filler treatments, integrate online booking, and rank on Google. From £1,499.",
  },
  {
    keyword: "aesthetics clinic website design Manchester",
    path: "/aesthetics-websites/manchester",
    currentTitle: "Aesthetics Clinic Website Design in Manchester | Aesthetix Systems",
    currentDescription: "Bespoke websites, booking systems & AI receptionists for aesthetics clinics in Manchester. Premium design from £1,499. Trusted by UK clinics — message us today.",
  },
];

interface CompetitorData {
  rank: number;
  url: string;
  title: string;
  description: string;
}

async function searchDuckDuckGo(keyword: string): Promise<string> {
  const q = encodeURIComponent(keyword);
  const url = `https://html.duckduckgo.com/html/?q=${q}&kl=uk-en`;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; AesthetixSEOBot/1.0)",
        "Accept": "text/html",
        "Accept-Language": "en-GB,en;q=0.9",
      },
    });
    clearTimeout(timeout);
    return res.ok ? await res.text() : "";
  } catch {
    return "";
  }
}

function extractResultsFromHtml(html: string): Array<{ url: string; title: string; snippet: string }> {
  const results: Array<{ url: string; title: string; snippet: string }> = [];

  const resultBlocks = html.match(/<div[^>]*class="[^"]*result[^"]*"[^>]*>[\s\S]*?(?=<div[^>]*class="[^"]*result[^"]*"|$)/g) ?? [];

  for (const block of resultBlocks.slice(0, 20)) {
    const titleMatch = block.match(/<a[^>]*class="[^"]*result__a[^"]*"[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/i);
    const snippetMatch = block.match(/<a[^>]*class="[^"]*result__snippet[^"]*"[^>]*>([\s\S]*?)<\/a>/i) ??
                         block.match(/<span[^>]*class="[^"]*result__snippet[^"]*"[^>]*>([\s\S]*?)<\/span>/i);

    if (!titleMatch) continue;

    let url = titleMatch[1];
    if (url.startsWith("//duckduckgo.com/l/")) {
      const udtMatch = url.match(/uddg=([^&]+)/);
      if (udtMatch) url = decodeURIComponent(udtMatch[1]);
    }

    const title = titleMatch[2].replace(/<[^>]+>/g, "").trim();
    const snippet = snippetMatch ? snippetMatch[1].replace(/<[^>]+>/g, "").trim() : "";

    if (url && title) {
      results.push({ url, title, snippet });
    }
  }

  return results;
}

async function crawlMetaTags(url: string): Promise<{ title: string; description: string }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; AesthetixSEOBot/1.0)",
        "Accept": "text/html",
      },
      redirect: "follow",
    });
    clearTimeout(timeout);
    if (!res.ok) return { title: "", description: "" };

    const html = await res.text();
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const descMatch =
      html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i) ??
      html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);

    return {
      title: titleMatch ? titleMatch[1].trim().slice(0, 120) : "",
      description: descMatch ? descMatch[1].trim().slice(0, 300) : "",
    };
  } catch {
    return { title: "", description: "" };
  }
}

async function analyseKeyword(target: TargetKeyword): Promise<{
  ourPosition: number | null;
  competitors: CompetitorData[];
  suggestedTitle: string;
  suggestedDescription: string;
}> {
  logger.info({ keyword: target.keyword }, "Analysing keyword");

  const html = await searchDuckDuckGo(target.keyword);
  if (!html) {
    return { ourPosition: null, competitors: [], suggestedTitle: "", suggestedDescription: "" };
  }

  const results = extractResultsFromHtml(html);
  let ourPosition: number | null = null;
  const competitorUrls: Array<{ rank: number; url: string; title: string; snippet: string }> = [];

  results.forEach((r, i) => {
    if (r.url.includes(SITE)) {
      ourPosition = i + 1;
    } else if (!r.url.includes("youtube.com") && !r.url.includes("wikipedia.org")) {
      competitorUrls.push({ rank: i + 1, ...r });
    }
  });

  const topCompetitors = competitorUrls.slice(0, 3);
  const competitors: CompetitorData[] = [];

  for (const comp of topCompetitors) {
    const meta = await crawlMetaTags(comp.url);
    competitors.push({
      rank: comp.rank,
      url: comp.url,
      title: meta.title || comp.title,
      description: meta.description || comp.snippet,
    });
  }

  if (competitors.length === 0 && ourPosition && ourPosition <= 3) {
    logger.info({ keyword: target.keyword, ourPosition }, "Already top 3 — skipping AI rewrite");
    return { ourPosition, competitors, suggestedTitle: "", suggestedDescription: "" };
  }

  const competitorSummary = competitors.map((c, i) =>
    `Rank ${c.rank}: "${c.title}" — "${c.description.slice(0, 150)}"`
  ).join("\n");

  let suggestedTitle = "";
  let suggestedDescription = "";

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5.1",
      max_completion_tokens: 400,
      messages: [
        {
          role: "system",
          content: `You are an expert UK SEO consultant for Aesthetix Systems, a premium London agency building bespoke websites and booking systems for aesthetics/beauty clinics.

Write improved meta title and description that will outrank competitors for the given keyword.
Rules:
- Title: 50-62 characters, include keyword naturally, include "Aesthetix Systems" or brand signal at end
- Description: 130-155 characters, compelling, action-oriented, include keyword, mention a USP (bespoke, London, from £X, etc.)
- Write in British English
- Match search intent (commercial/informational)

Respond with EXACTLY two lines:
TITLE: [your title]
DESCRIPTION: [your description]`,
        },
        {
          role: "user",
          content: `Target keyword: "${target.keyword}"
Our current rank: ${ourPosition ? `#${ourPosition}` : "Not in top 20"}
Our current title: "${target.currentTitle}"
Our current description: "${target.currentDescription}"

Competitors ranking above us:
${competitorSummary || "None found in top 10 — we may already rank well"}

Write a better title and description that beats these competitors.`,
        },
      ],
    });

    const raw = (response.choices[0]?.message?.content ?? "").trim();
    const titleLine = raw.match(/^TITLE:\s*(.+)$/m)?.[1]?.trim() ?? "";
    const descLine = raw.match(/^DESCRIPTION:\s*(.+)$/m)?.[1]?.trim() ?? "";

    if (titleLine && descLine) {
      suggestedTitle = titleLine;
      suggestedDescription = descLine;
    }
  } catch (err) {
    logger.error({ err, keyword: target.keyword }, "AI meta generation failed");
  }

  return { ourPosition, competitors, suggestedTitle, suggestedDescription };
}

export async function runSeoIntelligence(): Promise<void> {
  logger.info("SEO intelligence run starting");

  for (const target of TARGET_KEYWORDS) {
    try {
      const { ourPosition, competitors, suggestedTitle, suggestedDescription } = await analyseKeyword(target);

      await db
        .insert(seoKeywordPositionsTable)
        .values({
          keyword: target.keyword,
          ourPath: target.path,
          ourPosition,
          competitors,
          suggestedTitle: suggestedTitle || null,
          suggestedDescription: suggestedDescription || null,
        });

      if (suggestedTitle && suggestedDescription) {
        const existingOverride = await db
          .select()
          .from(seoMetaOverridesTable)
          .where(eq(seoMetaOverridesTable.path, target.path))
          .limit(1);

        const lastUpdated = existingOverride[0]?.updatedAt;
        const daysSinceUpdate = lastUpdated
          ? (Date.now() - new Date(lastUpdated).getTime()) / 86400000
          : Infinity;

        if (daysSinceUpdate >= 14) {
          await db
            .insert(seoMetaOverridesTable)
            .values({
              path: target.path,
              title: suggestedTitle,
              metaDescription: suggestedDescription,
              reason: ourPosition
                ? `Ranked #${ourPosition} — AI optimised vs ${competitors.length} competitors`
                : `Not ranking — AI optimised for "${target.keyword}"`,
              ourPreviousRank: ourPosition,
            })
            .onConflictDoUpdate({
              target: seoMetaOverridesTable.path,
              set: {
                title: suggestedTitle,
                metaDescription: suggestedDescription,
                reason: ourPosition
                  ? `Ranked #${ourPosition} — AI optimised vs ${competitors.length} competitors`
                  : `Not ranking — AI optimised for "${target.keyword}"`,
                ourPreviousRank: ourPosition,
                analyzedAt: new Date(),
                updatedAt: new Date(),
              },
            });

          logger.info({ path: target.path, rank: ourPosition }, "Meta override applied");
        } else {
          logger.info({ path: target.path, daysSinceUpdate }, "Override skipped — updated recently");
        }
      }

      await new Promise(r => setTimeout(r, 3000));
    } catch (err) {
      logger.error({ err, keyword: target.keyword }, "Keyword analysis failed");
    }
  }

  logger.info("SEO intelligence run complete");
}

export async function getAllMetaOverrides(): Promise<Record<string, { title: string; metaDescription: string }>> {
  const rows = await db.select().from(seoMetaOverridesTable);
  return Object.fromEntries(rows.map(r => [r.path, { title: r.title, metaDescription: r.metaDescription }]));
}

export async function getLatestKeywordPositions() {
  const allRows = await db
    .select()
    .from(seoKeywordPositionsTable)
    .orderBy(seoKeywordPositionsTable.analyzedAt);

  const latestByKeyword = new Map<string, typeof allRows[0]>();
  for (const row of allRows) {
    latestByKeyword.set(row.keyword, row);
  }
  return Array.from(latestByKeyword.values());
}
