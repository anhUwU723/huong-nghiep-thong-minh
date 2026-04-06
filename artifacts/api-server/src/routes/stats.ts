import { Router } from "express";
import { db, universitiesTable, majorsTable, forumPostsTable, admissionScoresTable } from "@workspace/db";
import { sql, desc } from "drizzle-orm";

const router = Router();

router.get("/summary", async (req, res) => {
  const [uniCount] = await db.select({ count: sql<number>`count(*)::int` }).from(universitiesTable);
  const [majorCount] = await db.select({ count: sql<number>`count(*)::int` }).from(majorsTable);
  const [postCount] = await db.select({ count: sql<number>`count(*)::int` }).from(forumPostsTable);

  res.json({
    total_universities: uniCount.count,
    total_majors: majorCount.count,
    total_forum_posts: postCount.count,
    total_predictions_made: 0,
  });
});

router.get("/trending-majors", async (req, res) => {
  const majors = await db
    .select({
      major_id: majorsTable.id,
      major_name: majorsTable.name,
      category: majorsTable.category,
      salary_range_min: majorsTable.salary_range_min,
      salary_range_max: majorsTable.salary_range_max,
      score_count: sql<number>`count(${admissionScoresTable.id})::int`,
    })
    .from(majorsTable)
    .leftJoin(admissionScoresTable, sql`${admissionScoresTable.major_id} = ${majorsTable.id}`)
    .groupBy(majorsTable.id)
    .orderBy(desc(sql<number>`count(${admissionScoresTable.id})`))
    .limit(8);

  res.json(majors.map(m => ({
    major_id: m.major_id,
    major_name: m.major_name,
    category: m.category,
    search_count: m.score_count,
    avg_salary: m.salary_range_min && m.salary_range_max
      ? (Number(m.salary_range_min) + Number(m.salary_range_max)) / 2
      : null,
  })));
});

export default router;
