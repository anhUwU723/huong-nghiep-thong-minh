import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const forumPostsTable = pgTable("forum_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  author_name: text("author_name").notNull(),
  category: text("category").notNull(),
  reply_count: integer("reply_count").notNull().default(0),
  created_at: timestamp("created_at").defaultNow(),
});

export const forumRepliesTable = pgTable("forum_replies", {
  id: serial("id").primaryKey(),
  post_id: integer("post_id").notNull().references(() => forumPostsTable.id),
  content: text("content").notNull(),
  author_name: text("author_name").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

export const insertForumPostSchema = createInsertSchema(forumPostsTable).omit({ id: true, reply_count: true, created_at: true });
export const insertForumReplySchema = createInsertSchema(forumRepliesTable).omit({ id: true, created_at: true });
export type InsertForumPost = z.infer<typeof insertForumPostSchema>;
export type InsertForumReply = z.infer<typeof insertForumReplySchema>;
export type ForumPost = typeof forumPostsTable.$inferSelect;
export type ForumReply = typeof forumRepliesTable.$inferSelect;
