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

interface SeoSignals {
  hasTitle: boolean;
  title: string | null;
  titleLength: number;
  hasMetaDescription: boolean;
  metaDescription: string | null;
  metaDescriptionLength: number;
  hasCanonical: boolean;
  hasOgTitle: boolean;
  hasSchema: boolean;
  isNoindex: boolean;
  hasH1: boolean;
  h1Count: number;
  h2Count: number;
  hasLdJson: boolean;
  titleOk: boolean;
  descOk: boolean;
}

function extractSeoFromHtml(html: string): SeoSignals {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : null;
  const titleLength = title?.length ?? 0;

  const metaDescMatch =
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i) ??
    html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
  const metaDescription = metaDescMatch ? metaDescMatch[1].trim() : null;
  const metaDescriptionLength = metaDescription?.length ?? 0;

  const hasCanonical = /<link[^>]+rel=["']canonical["']/i.test(html);
  const hasOgTitle = /<meta[^>]+property=["']og:title["']/i.test(html);
  const hasSchema = /<script[^>]+type=["']application\/ld\+json["']/i.test(html);
  const isNoindex =
    /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html) ||
    /<meta[^>]+content=["'][^"']*noindex[^"']*["'][^>]+name=["']robots["']/i.test(html);

  const h1Matches = html.match(/<h1[^>]*>/gi);
  const h1Count = h1Matches?.length ?? 0;
  const h2Matches = html.match(/<h2[^>]*>/gi);
  const h2Count = h2Matches?.length ?? 0;

  return {
    hasTitle: !!title,
    title,
    titleLength,
    hasMetaDescription: !!metaDescription,
    metaDescription,
    metaDescriptionLength,
    hasCanonical,
    hasOgTitle,
    hasSchema,
    isNoindex,
    hasH1: h1Count > 0,
    h1Count,
    h2Count,
    hasLdJson: hasSchema,
    titleOk: titleLength >= 40 && titleLength <= 65,
    descOk: metaDescriptionLength >= 100 && metaDescriptionLength <= 165,
  };
}

function buildIssues(signals: SeoSignals, statusCode: number | null, responseTimeMs: number): string[] {
  const issues: string[] = [];
  if (!statusCode || statusCode !== 200) issues.push(`HTTP ${statusCode ?? "timeout"}`);
  if (!signals.hasTitle) issues.push("Missing <title>");
  else if (signals.titleLength < 40) issues.push(`Title too short (${signals.titleLength} chars, aim 40–65)`);
  else if (signals.titleLength > 65) issues.push(`Title too long (${signals.titleLength} chars, aim 40–65)`);
  if (!signals.hasMetaDescription) issues.push("Missing meta description");
  else if (signals.metaDescriptionLength < 100) issues.push(`Description too short (${signals.metaDescriptionLength} chars)`);
  else if (signals.metaDescriptionLength > 165) issues.push(`Description too long (${signals.metaDescriptionLength} chars)`);
  if (!signals.hasCanonical) issues.push("Missing canonical tag");
  if (!signals.hasOgTitle) issues.push("Missing og:title");
  if (!signals.hasSchema) issues.push("Missing JSON-LD schema");
  if (signals.h1Count === 0) issues.push("No H1 tag found");
  if (signals.h1Count > 1) issues.push(`Multiple H1 tags (${signals.h1Count})`);
  if (responseTimeMs > 3000) issues.push(`Slow: ${responseTimeMs}ms (target <1500ms)`);
  else if (responseTimeMs > 1500) issues.push(`Moderate speed: ${responseTimeMs}ms (target <1500ms)`);
  return issues;
}

async function crawlPage(path: string) {
  const url = `${SITE_URL}${path}`;
  const start = Date.now();
  let statusCode: number | null = null;
  let html = "";

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "AesthetixSEOBot/1.0 (+https://aesthetix-systems.co.uk)" },
      redirect: "follow",
    });
    clearTimeout(timeout);
    statusCode = res.status;
    if (res.ok) html = await res.text();
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    logger.warn({ url, err: msg }, "SEO crawl fetch error");
  }

  const responseTimeMs = Date.now() - start;
  const signals = extractSeoFromHtml(html);
  const issues = buildIssues(signals, statusCode, responseTimeMs);

  return { url, statusCode, responseTimeMs, signals, issues };
}

async function pingGoogle(): Promise<boolean> {
  try {
    const res = await fetch(
      `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
      { headers: { "User-Agent": "AesthetixSEOBot/1.0" } }
    );
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
      hasTitle: result.signals.hasTitle,
      title: result.signals.title,
      hasMetaDescription: result.signals.hasMetaDescription,
      metaDescription: result.signals.metaDescription,
      hasCanonical: result.signals.hasCanonical,
      hasOgTitle: result.signals.hasOgTitle,
      hasSchema: result.signals.hasSchema,
      isNoindex: result.signals.isNoindex,
      issues: result.issues,
    });

    logger.info(
      { url: result.url, status: result.statusCode, ms: result.responseTimeMs, issues: result.issues.length },
      "SEO page crawled"
    );
  }

  const googlePinged = await pingGoogle();
  const durationMs = Date.now() - start;

  await db
    .update(seoCrawlRunsTable)
    .set({ pagesOk, pagesFailed, googlePinged, durationMs })
    .where(eq(seoCrawlRunsTable.id, runId));

  logger.info({ runId, pagesOk, pagesFailed, googlePinged, durationMs }, "SEO crawl complete");
  return runId;
}
