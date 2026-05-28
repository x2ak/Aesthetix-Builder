import { Router, type IRouter } from 'express';
import { db } from '@workspace/db';
import { enquiriesTable } from '@workspace/db';

const router: IRouter = Router();

router.post('/enquiries', async (req, res) => {
  try {
    const {
      name, phone, handle,
      businessType, currentBookingMethod, monthlyBookings,
      painPoints, style, packageChoice,
    } = req.body as Record<string, any>;

    if (!name || !phone) {
      res.status(400).json({ error: 'Name and phone are required' });
      return;
    }

    const [row] = await db.insert(enquiriesTable).values({
      name: String(name),
      phone: String(phone),
      handle: handle ? String(handle) : null,
      businessType: businessType ? String(businessType) : null,
      currentBookingMethod: currentBookingMethod ? String(currentBookingMethod) : null,
      monthlyBookings: monthlyBookings ? String(monthlyBookings) : null,
      painPoints: Array.isArray(painPoints) ? painPoints : null,
      style: style ? String(style) : null,
      packageChoice: packageChoice ? String(packageChoice) : null,
    }).returning();

    res.json({ ok: true, id: row.id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
