import { db } from "@workspace/db";
import { seoCrawlRunsTable, seoPageResultsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { logger } from "./lib/logger";

const SITE_URL = "https://aesthetix-systems.co.uk";
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

const URLS = [
  "/",
  "/services/bespoke-websites",
  "/services/booking-systems",
  "/services/ai-assistant",
  "/services/ongoing-support",
  "/portfolio/hiraaesthetics",
  "/portfolio/flawlessskin",
  "/portfolio/dermadoll",
  "/portfolio/starr",
  "/aesthetics-websites/london",
  "/aesthetics-websites/manchester",
  "/aesthetics-websites/birmingham",
  "/aesthetics-websites/leeds",
  "/aesthetics-websites/liverpool",
  "/aesthetics-websites/bristol",
  "/aesthetics-websites/edinburgh",
  "/aesthetics-websites/botox-clinics",
  "/aesthetics-websites/lip-filler-clinics",
  "/aesthetics-websites/medical-aesthetics-clinics",
  "/aesthetics-websites/beauty-clinics",
  "/aesthetics-websites/skin-clinics",
  "/privacy-policy",
  "/terms-of-service",
];

function extractSeoFromHtml(html: string) {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : null;

  const metaDescMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)
    ?? html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
  const metaDescription = metaDescMatch ? metaDescMatch[1].trim() : null;

  const hasCanonical = /<link[^>]+rel=["']canonical["']/i.test(html);
  const hasOgTitle = /<meta[^>]+property=["']og:title["']/i.test(html);
  const hasSchema = /<script[^>]+type=["']application\/ld\+json["']/i.test(html);
  const isNoindex = /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)
    || /<meta[^>]+content=["'][^"']*noindex[^"']*["'][^>]+name=["']robots["']/i.test(html);

  return {
    hasTitle: !!title,
    title,
    hasMetaDescription: !!metaDescription,
    metaDescription,
    hasCanonical,
    hasOgTitle,
    hasSchema,
    isNoindex,
  };
}

async function crawlPage(path: string): Promise<{
  url: string;
  statusCode: number | null;
  responseTimeMs: number;
  seo: ReturnType<typeof extractSeoFromHtml>;
  issues: string[];
}> {
  const url = `${SITE_URL}${path}`;
  const start = Date.now();
  let statusCode: number | null = null;
  let html = "";
  const issues: string[] = [];

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "AesthetixSEOBot/1.0" },
      redirect: "follow",
    });
    clearTimeout(timeout);
    statusCode = res.status;
    if (res.ok) {
      html = await res.text();
    } else {
      issues.push(`HTTP ${res.status}`);
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    issues.push(`Fetch error: ${msg}`);
  }

  const responseTimeMs = Date.now() - start;
  const seo = extractSeoFromHtml(html);

  if (!seo.hasTitle) issues.push("Missing <title>");
  if (!seo.hasMetaDescription) issues.push("Missing meta description");
  if (!seo.hasCanonical) issues.push("Missing canonical tag");
  if (!seo.hasOgTitle) issues.push("Missing og:title");
  if (!seo.hasSchema) issues.push("Missing JSON-LD schema");
  if (responseTimeMs > 3000) issues.push(`Slow response: ${responseTimeMs}ms`);

  return { url, statusCode, responseTimeMs, seo, issues };
}

async function pingGoogle(): Promise<boolean> {
  try {
    const res = await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`, {
      headers: { "User-Agent": "AesthetixSEOBot/1.0" },
    });
    return res.ok || res.status === 204;
  } catch {
    return false;
  }
}

export async function runSeoCrawl(): Promise<number> {
  logger.info("SEO crawl starting");
  const start = Date.now();

  const [run] = await db
    .insert(seoCrawlRunsTable)
    .values({ totalPages: URLS.length })
    .returning();

  const runId = run.id;
  let pagesOk = 0;
  let pagesFailed = 0;

  for (const path of URLS) {
    const result = await crawlPage(path);
    const ok = result.statusCode === 200;
    if (ok) pagesOk++; else pagesFailed++;

    await db.insert(seoPageResultsTable).values({
      runId,
      url: result.url,
      statusCode: result.statusCode,
      responseTimeMs: result.responseTimeMs,
      hasTitle: result.seo.hasTitle,
      title: result.seo.title,
      hasMetaDescription: result.seo.hasMetaDescription,
      metaDescription: result.seo.metaDescription,
      hasCanonical: result.seo.hasCanonical,
      hasOgTitle: result.seo.hasOgTitle,
      hasSchema: result.seo.hasSchema,
      isNoindex: result.seo.isNoindex,
      issues: result.issues,
    });

    logger.info({ url: result.url, status: result.statusCode, ms: result.responseTimeMs }, "SEO crawl page");
  }

  const googlePinged = await pingGoogle();
  const durationMs = Date.now() - start;

  await db
    .update(seoCrawlRunsTable)
    .set({ pagesOk, pagesFailed, googlePinged, durationMs })
    .where(require("drizzle-orm").eq(seoCrawlRunsTable.id, runId));

  logger.info({ runId, pagesOk, pagesFailed, googlePinged, durationMs }, "SEO crawl complete");
  return runId;
}
