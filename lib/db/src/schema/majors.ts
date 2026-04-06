import { pgTable, serial, text, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const majorsTable = pgTable("majors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  exam_blocks: text("exam_blocks").array().notNull().default([]),
  salary_range_min: numeric("salary_range_min", { precision: 12, scale: 2 }),
  salary_range_max: numeric("salary_range_max", { precision: 12, scale: 2 }),
  job_title: text("job_title"),
  description: text("description"),
  skills_needed: text("skills_needed").array().default([]),
  career_paths: text("career_paths").array().default([]),
  created_at: timestamp("created_at").defaultNow(),
});

export const insertMajorSchema = createInsertSchema(majorsTable).omit({ id: true, created_at: true });
export type InsertMajor = z.infer<typeof insertMajorSchema>;
export type Major = typeof majorsTable.$inferSelect;
