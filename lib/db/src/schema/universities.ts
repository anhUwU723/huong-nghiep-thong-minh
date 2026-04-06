import { pgTable, serial, text, numeric, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const universitiesTable = pgTable("universities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  short_name: text("short_name").notNull(),
  region: text("region").notNull(),
  address: text("address"),
  website: text("website"),
  tuition_min: numeric("tuition_min", { precision: 12, scale: 2 }),
  tuition_max: numeric("tuition_max", { precision: 12, scale: 2 }),
  type: text("type").notNull().default("public"),
  logo_url: text("logo_url"),
  description: text("description"),
  created_at: timestamp("created_at").defaultNow(),
});

export const insertUniversitySchema = createInsertSchema(universitiesTable).omit({ id: true, created_at: true });
export type InsertUniversity = z.infer<typeof insertUniversitySchema>;
export type University = typeof universitiesTable.$inferSelect;
