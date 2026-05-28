import { CaseStudyPage, CaseStudyData } from "./CaseStudy";

const data: CaseStudyData = {
  slug: 'flawlessskin',
  client: 'FlawlessSkin',
  tagline: 'Your skin. Flawless. Now bookable 24/7.',
  industry: 'Aesthetic Clinic',
  location: 'Hall Green, Birmingham',
  buildTime: '7 days',
  liveUrl: 'https://flawless-skin.co.uk',
  metaTitle: 'FlawlessSkin Case Study | Aesthetix Systems',
  metaDesc: 'How Aesthetix Systems built a custom branded website and booking system for FlawlessSkin in Hall Green, Birmingham.',
  heroImg: '/portfolio/flawlessskin/01-homepage.png',
  theme: {
    heroBg: '#111D10',
    accent: '#6B9E61',
    accentRgb: '107,158,97',
  },
  metrics: [
    { value: '7 days', label: 'From brief to live' },
    { value: '£2.3k', label: 'Monthly revenue tracked' },
    { value: '31', label: 'Active clients registered' },
    { value: '24/7', label: 'Bookings without lifting a finger' },
  ],
  quote: 'I used to spend hours in my DMs every week. Now clients just book and pay themselves — I only see the confirmation.',
  brief: `FlawlessSkin needed a custom branded online presence with a built-in booking system. The practitioner had an established client base and a strong reputation in Hall Green, but relied entirely on Instagram DMs and manual scheduling — costing hours every week.

The goal was to build a premium site that matched the professionalism of the treatments themselves, with a seamless booking flow that let clients book and pay a deposit without back-and-forth messages.

As the first Aesthetix build, FlawlessSkin set the standard: clean branding, fast load times, and a booking experience so smooth that clients return to it again and again.`,
  features: [
    'Custom branded website designed around FlawlessSkin identity',
    'Online booking system with real-time availability',
    'Stripe payment integration for secure deposit collection',
    'Admin portal for full booking and client management',
    'Treatment menu with pricing and detailed descriptions',
    'Mobile-first responsive design optimised for Instagram traffic',
    'Automated booking confirmation emails via Resend',
    'SEO-optimised structure for local Birmingham search',
  ],
  screenshots: [
    { src: '/portfolio/flawlessskin/01-homepage.png', caption: 'Homepage — desktop view' },
    { src: '/portfolio/flawlessskin/02-homepage-full.png', caption: 'Homepage — full page layout' },
  ],
  techStack: ['React', 'Vite', 'TypeScript', 'Supabase', 'Stripe', 'Resend', 'Tailwind CSS', 'Vercel'],
};

export default function CaseStudyFlawlessSkin() {
  return <CaseStudyPage data={data} />;
}
