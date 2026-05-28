import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const slotBookingsTable = pgTable("slot_bookings", {
  id: serial("id").primaryKey(),
  name: text("name"),
  phone: text("phone"),
  stripeSessionId: text("stripe_session_id"),
  amountPence: integer("amount_pence").default(9900),
  status: text("status").default("initiated"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSlotBookingSchema = createInsertSchema(slotBookingsTable).omit({ id: true, createdAt: true });
export type InsertSlotBooking = z.infer<typeof insertSlotBookingSchema>;
export type SlotBooking = typeof slotBookingsTable.$inferSelect;
