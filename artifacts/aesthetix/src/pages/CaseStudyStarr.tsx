import { CaseStudyPage, CaseStudyData } from "./CaseStudy";

const data: CaseStudyData = {
  slug: 'starr',
  client: 'Starr Beautyy',
  tagline: 'Two locations. One seamless booking experience.',
  industry: 'Aesthetic Clinic',
  location: 'Hornchurch, Essex & Marylebone, London',
  buildTime: '10 days',
  liveUrl: 'https://starrbeautyy.co.uk',
  metaTitle: 'Starr Beautyy Case Study | Aesthetix Systems',
  metaDesc: 'How Aesthetix Systems built a multi-location booking platform with two-way Google Calendar sync for Starr Beautyy across Hornchurch and Marylebone.',
  heroImg: '/portfolio/starr/01-homepage.png',
  theme: {
    heroBg: '#2A0812',
    accent: '#C4A44A',
    accentRgb: '196,164,74',
  },
  metrics: [
    { value: '£3.2k', label: 'Monthly revenue tracked' },
    { value: '47', label: 'Active clients' },
    { value: '2', label: 'Locations, one system' },
    { value: '10 days', label: 'Brief to launch' },
  ],
  quote: 'Managing two locations used to be chaos. Now every booking, both sites, syncs to my calendar instantly. I actually have time to focus on clients.',
  brief: `Starr Beautyy is one of Essex and London's most sought-after aesthetic clinics, operating from two distinct locations — Hornchurch and Marylebone. Managing bookings across two sites manually had become unworkable: double-bookings, missed enquiries, and hours spent on admin every week.

We built their most advanced platform to date: a multi-location booking system with location-specific treatment menus, two-way Google Calendar sync so bookings appear instantly in the practitioner's calendar with no manual input, and a fully self-managed admin portal.

Klarna Pay in 3 was integrated alongside Stripe to make higher-ticket treatments accessible, and the site was built to feel as luxury as the Marylebone postcode it represents.`,
  features: [
    'Multi-location website with location-specific treatment menus',
    'Two-way Google Calendar sync — bookings appear instantly, no double-bookings',
    'Booking system with deposit collection via Stripe',
    'Klarna Pay in 3 integration for accessible high-ticket treatments',
    'Self-service admin portal — manage prices, hours, blocked dates, bookings',
    'Full client database with complete booking history per location',
    'Automated booking confirmation emails via Resend',
    'Location selector with map integration and travel info',
    'Mobile-first responsive design for Instagram and TikTok traffic',
    'Staff training module for in-house practitioners',
  ],
  screenshots: [
    { src: '/portfolio/starr/01-homepage.png', caption: 'Homepage — desktop view' },
    { src: '/portfolio/starr/04-admin-login.png', caption: 'Admin portal — login screen' },
    { src: '/portfolio/starr/05-admin-dashboard.jpg', caption: 'Admin portal — dashboard overview' },
  ],
  techStack: ['React', 'Vite', 'TypeScript', 'Supabase', 'Stripe', 'Klarna', 'Google Calendar API', 'Resend', 'PostgreSQL', 'Vercel'],
};

export default function CaseStudyStarr() {
  return <CaseStudyPage data={data} />;
}
