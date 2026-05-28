import { Router, type IRouter, type Request, type Response, type NextFunction } from 'express';
import { db } from '@workspace/db';
import { enquiriesTable, slotBookingsTable } from '@workspace/db';
import { desc } from 'drizzle-orm';

const router: IRouter = Router();

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const key = req.headers['x-admin-key'];
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    res.status(503).json({ error: 'Admin not configured — set ADMIN_PASSWORD env var' });
    return;
  }
  if (key !== expected) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  next();
}

router.post('/admin/auth', (req, res) => {
  const { password } = req.body as { password?: string };
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    res.status(503).json({ error: 'Admin not configured' });
    return;
  }
  if (password !== expected) {
    res.status(401).json({ error: 'Wrong password' });
    return;
  }
  res.json({ ok: true });
});

router.get('/admin/enquiries', requireAdmin, async (_req, res) => {
  try {
    const rows = await db.select().from(enquiriesTable).orderBy(desc(enquiriesTable.createdAt));
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/admin/slot-bookings', requireAdmin, async (_req, res) => {
  try {
    const rows = await db.select().from(slotBookingsTable).orderBy(desc(slotBookingsTable.createdAt));
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
