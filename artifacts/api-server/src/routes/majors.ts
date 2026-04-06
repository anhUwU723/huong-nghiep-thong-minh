import { Router } from "express";
import { db, majorsTable, universitiesTable, admissionScoresTable } from "@workspace/db";
import { eq, ilike, and, sql } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
  const { category, search } = req.query as Record<string, string | undefined>;

  const conditions = [];

  if (category) {
    conditions.push(eq(majorsTable.category, category));
  }
  if (search) {
    conditions.push(ilike(majorsTable.name, `%${search}%`));
  }

  const majors = await db
    .select()
    .from(majorsTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(majorsTable.name);

  res.json(majors.map(m => ({
    ...m,
    salary_range_min: m.salary_range_min ? Number(m.salary_range_min) : null,
    salary_range_max: m.salary_range_max ? Number(m.salary_range_max) : null,
  })));
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const [major] = await db
    .select()
    .from(majorsTable)
    .where(eq(majorsTable.id, id))
    .limit(1);

  if (!major) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  const topUniversities = await db
    .selectDistinctOn([universitiesTable.id], {
      id: universitiesTable.id,
      name: universitiesTable.name,
      short_name: universitiesTable.short_name,
      region: universitiesTable.region,
      address: universitiesTable.address,
      website: universitiesTable.website,
      tuition_min: universitiesTable.tuition_min,
      tuition_max: universitiesTable.tuition_max,
      type: universitiesTable.type,
      logo_url: universitiesTable.logo_url,
      description: universitiesTable.description,
    })
    .from(universitiesTable)
    .innerJoin(admissionScoresTable, eq(admissionScoresTable.university_id, universitiesTable.id))
    .where(eq(admissionScoresTable.major_id, id))
    .limit(5);

  res.json({
    ...major,
    salary_range_min: major.salary_range_min ? Number(major.salary_range_min) : null,
    salary_range_max: major.salary_range_max ? Number(major.salary_range_max) : null,
    top_universities: topUniversities.map(u => ({
      ...u,
      tuition_min: u.tuition_min ? Number(u.tuition_min) : null,
      tuition_max: u.tuition_max ? Number(u.tuition_max) : null,
    })),
  });
});

export default router;
