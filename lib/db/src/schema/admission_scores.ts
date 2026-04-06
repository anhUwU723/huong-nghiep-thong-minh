import { pgTable, serial, integer, text, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { universitiesTable } from "./universities";
import { majorsTable } from "./majors";

export const admissionScoresTable = pgTable("admission_scores", {
  id: serial("id").primaryKey(),
  university_id: integer("university_id").notNull().references(() => universitiesTable.id),
  major_id: integer("major_id").notNull().references(() => majorsTable.id),
  exam_block: text("exam_block").notNull(),
  year: integer("year").notNull(),
  score: numeric("score", { precision: 5, scale: 2 }).notNull(),
  notes: text("notes"),
  created_at: timestamp("created_at").defaultNow(),
});

export const insertAdmissionScoreSchema = createInsertSchema(admissionScoresTable).omit({ id: true, created_at: true });
export type InsertAdmissionScore = z.infer<typeof insertAdmissionScoreSchema>;
export type AdmissionScore = typeof admissionScoresTable.$inferSelect;
