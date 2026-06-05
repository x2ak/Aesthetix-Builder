import { pgTable, serial, text, timestamp, integer, jsonb } from "drizzle-orm/pg-core";

export const seoMetaOverridesTable = pgTable("seo_meta_overrides", {
  id: serial("id").primaryKey(),
  path: text("path").notNull().unique(),
  title: text("title").notNull(),
  metaDescription: text("meta_description").notNull(),
  reason: text("reason"),
  ourPreviousRank: integer("our_previous_rank"),
  analyzedAt: timestamp("analyzed_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const seoKeywordPositionsTable = pgTable("seo_keyword_positions", {
  id: serial("id").primaryKey(),
  keyword: text("keyword").notNull(),
  ourPath: text("our_path").notNull(),
  ourPosition: integer("our_position"),
  competitors: jsonb("competitors").$type<Array<{
    rank: number;
    url: string;
    title: string;
    description: string;
  }>>().notNull().default([]),
  suggestedTitle: text("suggested_title"),
  suggestedDescription: text("suggested_description"),
  analyzedAt: timestamp("analyzed_at").defaultNow().notNull(),
});

export type SeoMetaOverride = typeof seoMetaOverridesTable.$inferSelect;
export type SeoKeywordPosition = typeof seoKeywordPositionsTable.$inferSelect;
