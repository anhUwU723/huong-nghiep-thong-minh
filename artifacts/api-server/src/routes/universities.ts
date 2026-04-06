import { Router } from "express";
import { db, universitiesTable, majorsTable, admissionScoresTable } from "@workspace/db";
import { eq, ilike, and, lte, sql } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
  const { region, major_group, max_tuition, search } = req.query as Record<string, string | undefined>;

  const conditions = [];

  if (region) {
    conditions.push(eq(universitiesTable.region, region));
  }
  if (max_tuition) {
    conditions.push(lte(universitiesTable.tuition_min, max_tuition));
  }
  if (search) {
    conditions.push(ilike(universitiesTable.name, `%${search}%`));
  }

  const universities = await db
    .select()
    .from(universitiesTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(universitiesTable.name);

  res.json(universities.map(u => ({
    ...u,
    tuition_min: u.tuition_min ? Number(u.tuition_min) : null,
    tuition_max: u.tuition_max ? Number(u.tuition_max) : null,
  })));
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const [university] = await db
    .select()
    .from(universitiesTable)
    .where(eq(universitiesTable.id, id))
    .limit(1);

  if (!university) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  const majorsOffered = await db
    .selectDistinctOn([majorsTable.id], {
      id: majorsTable.id,
      name: majorsTable.name,
      category: majorsTable.category,
      exam_blocks: majorsTable.exam_blocks,
      salary_range_min: majorsTable.salary_range_min,
      salary_range_max: majorsTable.salary_range_max,
      job_title: majorsTable.job_title,
      description: majorsTable.description,
    })
    .from(majorsTable)
    .innerJoin(admissionScoresTable, eq(admissionScoresTable.major_id, majorsTable.id))
    .where(eq(admissionScoresTable.university_id, id));

  const recentScores = await db
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
    .where(eq(admissionScoresTable.university_id, id))
    .orderBy(admissionScoresTable.year);

  res.json({
    ...university,
    tuition_min: university.tuition_min ? Number(university.tuition_min) : null,
    tuition_max: university.tuition_max ? Number(university.tuition_max) : null,
    majors_offered: majorsOffered.map(m => ({
      ...m,
      salary_range_min: m.salary_range_min ? Number(m.salary_range_min) : null,
      salary_range_max: m.salary_range_max ? Number(m.salary_range_max) : null,
    })),
    recent_scores: recentScores.map(s => ({
      ...s,
      score: Number(s.score),
    })),
  });
});

export default router;
