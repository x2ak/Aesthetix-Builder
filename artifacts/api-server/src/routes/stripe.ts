import { Router, type IRouter } from 'express';
import { getUncachableStripeClient, getStripePublishableKey } from '../stripeClient';

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

export default router;
