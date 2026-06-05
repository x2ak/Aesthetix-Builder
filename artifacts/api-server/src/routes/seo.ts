import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import { db } from "@workspace/db";
import { seoCrawlRunsTable, seoPageResultsTable } from "@workspace/db";
import { desc, eq } from "drizzle-orm";
import { runSeoCrawl } from "../seo-crawler";

const router: IRouter = Router();

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const key = req.headers["x-admin-key"];
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    res.status(503).json({ error: "Admin not configured" });
    return;
  }
  if (key !== expected) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

router.get("/admin/seo/runs", requireAdmin, async (_req, res) => {
  try {
    const rows = await db
      .select()
      .from(seoCrawlRunsTable)
      .orderBy(desc(seoCrawlRunsTable.runAt))
      .limit(30);
    res.json(rows);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: msg });
  }
});

router.get("/admin/seo/runs/:runId/pages", requireAdmin, async (req, res) => {
  try {
    const runId = parseInt(String(req.params.runId), 10);
    if (isNaN(runId)) {
      res.status(400).json({ error: "Invalid runId" });
      return;
    }
    const rows = await db
      .select()
      .from(seoPageResultsTable)
      .where(eq(seoPageResultsTable.runId, runId))
      .orderBy(seoPageResultsTable.url);
    res.json(rows);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: msg });
  }
});

router.post("/admin/seo/crawl", requireAdmin, async (_req, res) => {
  try {
    const runId = await runSeoCrawl();
    res.json({ ok: true, runId });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: msg });
  }
});

export default router;
