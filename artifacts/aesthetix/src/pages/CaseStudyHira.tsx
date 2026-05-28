import { CaseStudyPage, CaseStudyData } from "./CaseStudy";

const data: CaseStudyData = {
  slug: 'hiraaesthetics',
  client: 'Hira Aesthetics',
  tagline: 'A full ecosystem — clinic, store, academy and admin. One build.',
  industry: 'Aesthetic Clinic & Training Academy',
  location: 'Thornaby, North East',
  buildTime: '2 weeks',
  liveUrl: 'https://hiraaesthetics.co.uk',
  metaTitle: 'Hira Aesthetics Case Study | Aesthetix Systems',
  metaDesc: 'How Aesthetix Systems built a complete digital ecosystem for Hira Aesthetics — a bespoke clinic site, skincare e-commerce store, CPD-accredited training academy, treatment booking system, and self-managed admin portal.',
  heroImg: '/hira-hero.png',
  theme: {
    heroBg: '#1A1612',
    accent: '#C4A882',
    accentRgb: '196,168,130',
  },
  metrics: [
    { value: '5', label: 'Systems in one platform' },
    { value: '£55–£59', label: 'Skincare products, live in store' },
    { value: '£1,200+', label: 'Academy courses from' },
    { value: '2 weeks', label: 'Brief to full launch' },
  ],
  quote: 'I went from juggling three different tools and a WhatsApp to having everything — bookings, shop, academy — all in one place, all under my brand. It\'s completely transformed how I run the business.',
  brief: `Hira Aesthetics is a private clinic based in Thornaby, North East, offering advanced anti-wrinkle, dermal filler, and skin treatments alongside a signature training academy for aesthetics professionals. The founder came to us with a fragmented setup — a generic website, no online store, and manual booking management — wanting something that matched the calibre of the brand she had built.

We delivered a complete platform in four weeks. The main site is fully custom branded and designed around her signature tagline — "considered aesthetics, naturally you." — with a soft, editorial feel. A treatment pages system lets clients browse, read about, and book directly. An integrated skincare store launches her branded HIRA product range: HEAL Recovery Serum, IMPROVE Clarity Serum, ACTIVATE Radiance C20, and more — with product pages, bundles, and checkout all native to the site.

The training academy section lists CPD-accredited courses from Foundation Botox to advanced techniques, with Klarna pay-in-3 integrated so students can spread the cost of £1,200–£2,500 courses. A private admin portal gives full control over appointments, treatments, products, student enrolments and site content — no third-party dashboard needed.`,
  features: [
    'Bespoke branded clinic website with treatment menu and booking',
    'Full e-commerce store for branded HIRA skincare range',
    'Bundle offers and product variants with Stripe checkout',
    'CPD-accredited training academy with course pages and enrolment',
    'Klarna Pay in 3 on academy courses for accessible tuition',
    'Self-managed admin portal — bookings, products, courses, clients',
    'Treatment-specific booking with deposit collection',
    'Student management — enrolments, progress, certificates',
    'Automated confirmation emails via Resend',
    'Mobile-first responsive design built for social traffic',
  ],
  screenshots: [
    { src: '/hira-hero.png', caption: 'Homepage — "Considered aesthetics, naturally you."' },
    { src: '/hira-academy.png', caption: 'Training academy — Foundation courses with Klarna, ClearPay & PayPal Credit' },
    { src: '/hira-shop.png', caption: 'Skincare store — branded HIRA product range' },
  ],
  techStack: ['React', 'Vite', 'TypeScript', 'Stripe', 'Klarna', 'Resend', 'PostgreSQL', 'Drizzle ORM', 'Vercel'],
};

export default function CaseStudyHira() {
  return <CaseStudyPage data={data} />;
}
