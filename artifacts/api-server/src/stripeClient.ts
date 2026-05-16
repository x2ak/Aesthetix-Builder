import Stripe from 'stripe';

function getCredentials(): { publishableKey: string; secretKey: string } {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;

  if (!secretKey || !publishableKey) {
    throw new Error('STRIPE_SECRET_KEY and STRIPE_PUBLISHABLE_KEY environment variables are required.');
  }

  return { publishableKey, secretKey };
}

export function getUncachableStripeClient(): Stripe {
  const { secretKey } = getCredentials();
  return new Stripe(secretKey);
}

export function getStripePublishableKey(): string {
  return getCredentials().publishableKey;
}

export function getStripeWebhookSecret(): string {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) throw new Error('STRIPE_WEBHOOK_SECRET environment variable is required.');
  return secret;
}
