import { Router, type IRouter } from 'express';
import { getUncachableStripeClient, getStripePublishableKey } from '../stripeClient.js';
import { db } from '@workspace/db';
import { slotBookingsTable } from '@workspace/db';
import { sendDepositEmail } from '../mailer.js';

const router: IRouter = Router();

router.get('/stripe/config', async (_req, res) => {
  try {
    const publishableKey = await getStripePublishableKey();
    res.json({ publishableKey });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/stripe/checkout', async (req, res) => {
  try {
    const stripe = await getUncachableStripeClient();
    const origin = req.headers.origin || `https://${req.headers.host}`;

    const session = await stripe.checkout.sessions.create({
      locale: 'en-GB',
      billing_address_collection: 'auto',
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            unit_amount: 99900,
            product_data: {
              name: 'Aesthetix Website Build',
              description: 'Bespoke clinic website — design, development, booking system & launch. Built to convert.',
              images: [],
            },
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/pay?status=success`,
      cancel_url: `${origin}/pay?status=cancelled`,
      metadata: {
        product: 'website_build',
        agency: 'Aesthetix Systems',
      },
    });

    res.json({ url: session.url });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/stripe/checkout/deposit', async (req, res) => {
  try {
    const stripe = await getUncachableStripeClient();
    const origin = req.headers.origin || `https://${req.headers.host}`;
    const { name, phone } = req.body as { name?: string; phone?: string };

    const session = await stripe.checkout.sessions.create({
      locale: 'en-GB',
      billing_address_collection: 'auto',
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            unit_amount: 9900,
            product_data: {
              name: 'Build Slot Deposit — Aesthetix Systems',
              description: 'Secures your place in the build queue. Deducted from your total package price. Balance split 50% on kickoff, 50% on completion.',
              images: [],
            },
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/pay?status=deposit-success`,
      cancel_url: `${origin}/?status=deposit-cancelled`,
      metadata: {
        product: 'build_slot_deposit',
        agency: 'Aesthetix Systems',
      },
    });

    const [booking] = await db.insert(slotBookingsTable).values({
      name: name ? String(name) : null,
      phone: phone ? String(phone) : null,
      stripeSessionId: session.id,
      amountPence: 9900,
      status: 'initiated',
    }).returning();

    sendDepositEmail({
      id: booking.id,
      name: booking.name,
      phone: booking.phone,
      stripeSessionId: session.id,
      amountPence: 9900,
    }).catch(() => {});

    res.json({ url: session.url });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
