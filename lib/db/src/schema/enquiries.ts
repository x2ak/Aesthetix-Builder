import { pgTable, serial, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const enquiriesTable = pgTable("enquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  handle: text("handle"),
  businessType: text("business_type"),
  currentBookingMethod: text("current_booking_method"),
  monthlyBookings: text("monthly_bookings"),
  painPoints: jsonb("pain_points").$type<string[]>(),
  style: text("style"),
  packageChoice: text("package_choice"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertEnquirySchema = createInsertSchema(enquiriesTable).omit({ id: true, createdAt: true });
export type InsertEnquiry = z.infer<typeof insertEnquirySchema>;
export type Enquiry = typeof enquiriesTable.$inferSelect;
