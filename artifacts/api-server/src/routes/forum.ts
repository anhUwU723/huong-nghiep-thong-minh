import { Router } from "express";
import { db, forumPostsTable, forumRepliesTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";
import { CreateForumPostBody, CreateForumReplyBody, CreateForumReplyParams, ListForumPostsQueryParams } from "@workspace/api-zod";

const router = Router();

router.get("/posts", async (req, res) => {
  const parsed = ListForumPostsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid query" });
    return;
  }
  const { category, page = 1 } = parsed.data;
  const limit = 20;
  const offset = (Number(page) - 1) * limit;

  let query = db.select().from(forumPostsTable).orderBy(sql`${forumPostsTable.created_at} DESC`).limit(limit).offset(offset);

  if (category) {
    const posts = await db.select().from(forumPostsTable)
      .where(eq(forumPostsTable.category, category))
      .orderBy(sql`${forumPostsTable.created_at} DESC`)
      .limit(limit).offset(offset);
    res.json(posts);
    return;
  }

  const posts = await query;
  res.json(posts);
});

router.post("/posts", async (req, res) => {
  const parsed = CreateForumPostBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid body" });
    return;
  }

  const [post] = await db.insert(forumPostsTable).values(parsed.data).returning();
  res.status(201).json(post);
});

router.get("/posts/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const [post] = await db.select().from(forumPostsTable).where(eq(forumPostsTable.id, id)).limit(1);
  if (!post) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  const replies = await db.select().from(forumRepliesTable).where(eq(forumRepliesTable.post_id, id))
    .orderBy(sql`${forumRepliesTable.created_at} ASC`);

  res.json({ ...post, replies });
});

router.post("/posts/:id/replies", async (req, res) => {
  const paramParsed = CreateForumReplyParams.safeParse(req.params);
  if (!paramParsed.success) {
    res.status(400).json({ error: "Invalid params" });
    return;
  }
  const bodyParsed = CreateForumReplyBody.safeParse(req.body);
  if (!bodyParsed.success) {
    res.status(400).json({ error: "Invalid body" });
    return;
  }

  const id = Number(paramParsed.data.id);
  const [post] = await db.select().from(forumPostsTable).where(eq(forumPostsTable.id, id)).limit(1);
  if (!post) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  const [reply] = await db.insert(forumRepliesTable).values({ ...bodyParsed.data, post_id: id }).returning();
  await db.update(forumPostsTable).set({ reply_count: post.reply_count + 1 }).where(eq(forumPostsTable.id, id));

  res.status(201).json(reply);
});

export default router;
