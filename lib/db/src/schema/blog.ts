import { pgTable, serial, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const blogPostsTable = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull().default("insights"),
  tags: text("tags").array().notNull().default([]),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  readingMinutes: integer("reading_minutes").notNull().default(5),
  published: boolean("published").notNull().default(true),
  generatedByAi: boolean("generated_by_ai").notNull().default(true),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBlogPostSchema = createInsertSchema(blogPostsTable).omit({ id: true, createdAt: true });
export const selectBlogPostSchema = createSelectSchema(blogPostsTable);
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPostsTable.$inferSelect;
