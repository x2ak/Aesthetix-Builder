import { pgTable, serial, text, timestamp, integer, boolean, jsonb } from "drizzle-orm/pg-core";

export const seoCrawlRunsTable = pgTable("seo_crawl_runs", {
  id: serial("id").primaryKey(),
  runAt: timestamp("run_at").defaultNow().notNull(),
  totalPages: integer("total_pages").notNull().default(0),
  pagesOk: integer("pages_ok").notNull().default(0),
  pagesFailed: integer("pages_failed").notNull().default(0),
  googlePinged: boolean("google_pinged").notNull().default(false),
  durationMs: integer("duration_ms"),
});

export const seoPageResultsTable = pgTable("seo_page_results", {
  id: serial("id").primaryKey(),
  runId: integer("run_id").notNull(),
  url: text("url").notNull(),
  statusCode: integer("status_code"),
  responseTimeMs: integer("response_time_ms"),
  hasTitle: boolean("has_title").notNull().default(false),
  title: text("title"),
  hasMetaDescription: boolean("has_meta_description").notNull().default(false),
  metaDescription: text("meta_description"),
  hasCanonical: boolean("has_canonical").notNull().default(false),
  hasOgTitle: boolean("has_og_title").notNull().default(false),
  hasSchema: boolean("has_schema").notNull().default(false),
  isNoindex: boolean("is_noindex").notNull().default(false),
  issues: jsonb("issues").$type<string[]>().notNull().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type SeoCrawlRun = typeof seoCrawlRunsTable.$inferSelect;
export type SeoPageResult = typeof seoPageResultsTable.$inferSelect;
