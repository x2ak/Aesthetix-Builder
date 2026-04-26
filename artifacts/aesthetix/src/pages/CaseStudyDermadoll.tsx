import { CaseStudyPage, CaseStudyData } from "./CaseStudy";

const data: CaseStudyData = {
  slug: 'dermadoll',
  client: 'Dermadoll Aesthetics',
  tagline: 'Redefining natural beauty — and automating every booking.',
  industry: 'Aesthetic Clinic',
  location: 'Birmingham & Solihull',
  buildTime: '2 weeks',
  liveUrl: 'https://dermadoll-aesthetics.co.uk',
  metaTitle: 'Dermadoll Aesthetics Case Study | Aesthetix Systems',
  metaDesc: 'How Aesthetix Systems built a premium booking platform for Dermadoll Aesthetics in Birmingham — with deposit collection and a full admin portal.',
  heroImg: '/portfolio/dermadoll/01-homepage.png',
  theme: {
    heroBg: '#0E0C0A',
    accent: '#C4A882',
    accentRgb: '196,168,130',
  },
  metrics: [
    { value: '2 weeks', label: 'Brief to launch' },
    { value: '100%', label: 'Bookings automated' },
    { value: '23', label: 'Clients registered' },
    { value: '£0', label: 'Admin time per booking' },
  ],
  quote: 'The site looks exactly like the experience we deliver in clinic. Premium from the first click to the final treatment.',
  brief: `Dermadoll Aesthetics came to us with a clear brief: build something that matches the premium quality of the in-clinic experience. Their clients expect perfection from the moment they walk through the door — the website had to deliver the same standard before they even book.

We built a cinematic, dark-themed site with a full booking system that handles deposit collection via Stripe, automated confirmation emails, and a self-service admin portal so the Dermadoll team can manage everything in-house — treatments, pricing, availability, and client records.

The result is a platform that's as elevated as the treatments themselves, and one that converts at a significantly higher rate than the DM-based system it replaced.`,
  features: [
    'Custom premium website with cinematic dark theme',
    'Full booking system with deposit collection via Stripe',
    'Self-service admin portal — manage treatments, pricing & availability',
    'Client database with complete booking history',
    'Automated booking confirmation and reminder emails via Resend',
    'Mobile-first responsive design built for Instagram and TikTok traffic',
    'Treatment management — add, edit and price treatments independently',
    'FAQ and reviews sections to convert hesitant visitors',
    'Multi-location support (Birmingham & Solihull)',
  ],
  screenshots: [
    { src: '/portfolio/dermadoll/01-homepage.png', caption: 'Homepage — desktop view' },
    { src: '/portfolio/dermadoll/04-admin-login.png', caption: 'Admin portal — login screen' },
    { src: '/portfolio/dermadoll/05-admin-dashboard.jpg', caption: 'Admin portal — dashboard overview' },
  ],
  techStack: ['React', 'Vite', 'TypeScript', 'Supabase', 'Stripe', 'Resend', 'PostgreSQL', 'Vercel'],
};

export default function CaseStudyDermadoll() {
  return <CaseStudyPage data={data} />;
}
