import { Router } from "express";
import { db, admissionScoresTable, universitiesTable, majorsTable } from "@workspace/db";
import { eq, and, sql } from "drizzle-orm";
import {
  ListAdmissionScoresQueryParams,
  PredictAdmissionBody,
} from "@workspace/api-zod";

const router = Router();

router.get("/scores", async (req, res) => {
  const parsed = ListAdmissionScoresQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid query params" });
    return;
  }
  const { university_id, major_id, year, exam_block } = parsed.data;

  const conditions = [];
  if (university_id) conditions.push(eq(admissionScoresTable.university_id, Number(university_id)));
  if (major_id) conditions.push(eq(admissionScoresTable.major_id, Number(major_id)));
  if (year) conditions.push(eq(admissionScoresTable.year, Number(year)));
  if (exam_block) conditions.push(eq(admissionScoresTable.exam_block, exam_block));

  const scores = await db
    .select({
      id: admissionScoresTable.id,
      university_id: admissionScoresTable.university_id,
      university_name: universitiesTable.name,
      major_id: admissionScoresTable.major_id,
      major_name: majorsTable.name,
      exam_block: admissionScoresTable.exam_block,
      year: admissionScoresTable.year,
      score: admissionScoresTable.score,
      notes: admissionScoresTable.notes,
    })
    .from(admissionScoresTable)
    .innerJoin(universitiesTable, eq(admissionScoresTable.university_id, universitiesTable.id))
    .innerJoin(majorsTable, eq(admissionScoresTable.major_id, majorsTable.id))
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(admissionScoresTable.year);

  res.json(scores.map(s => ({ ...s, score: Number(s.score) })));
});

router.post("/predict", async (req, res) => {
  const parsed = PredictAdmissionBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid body" });
    return;
  }
  const { score, exam_block, region_bonus = 0 } = parsed.data;

  const effectiveScore = score + (region_bonus ?? 0);

  const latestScores = await db.execute(sql`
    SELECT DISTINCT ON (university_id, major_id)
      a.university_id,
      u.name as university_name,
      a.major_id,
      m.name as major_name,
      a.score::float as latest_score,
      a.exam_block,
      a.year
    FROM admission_scores a
    JOIN universities u ON u.id = a.university_id
    JOIN majors m ON m.id = a.major_id
    WHERE a.exam_block = ${exam_block}
    ORDER BY a.university_id, a.major_id, a.year DESC
  `);

  const predictions = (latestScores.rows as any[]).map((row) => {
    const latestScore = Number(row.latest_score);
    const gap = effectiveScore - latestScore;
    let chance: "safe" | "borderline" | "risky";
    if (gap >= 1) chance = "safe";
    else if (gap >= -0.5) chance = "borderline";
    else chance = "risky";

    return {
      university_id: row.university_id,
      university_name: row.university_name,
      major_id: row.major_id,
      major_name: row.major_name,
      latest_score: latestScore,
      student_score: effectiveScore,
      chance,
      score_gap: Math.round(gap * 100) / 100,
    };
  });

  predictions.sort((a, b) => {
    const order = { safe: 0, borderline: 1, risky: 2 };
    return order[a.chance] - order[b.chance];
  });

  res.json(predictions);
});

export default router;
