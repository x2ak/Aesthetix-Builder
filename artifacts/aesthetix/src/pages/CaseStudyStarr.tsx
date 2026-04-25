import { CaseStudyPage, CaseStudyData } from "./CaseStudy";

const data: CaseStudyData = {
  slug: 'starr',
  client: 'Starr Beautyy',
  tagline: 'Two locations. One seamless booking experience.',
  industry: 'Aesthetic Clinic',
  location: 'Hornchurch, Essex & Marylebone, London',
  buildTime: '4 weeks',
  liveUrl: 'https://starrbeautyy.co.uk',
  metaTitle: 'Starr Beautyy Case Study | Aesthetix Systems',
  metaDesc: 'How Aesthetix Systems built a multi-location booking platform with two-way Google Calendar sync for Starr Beautyy across Hornchurch and Marylebone.',
  heroImg: '/portfolio/starr/01-homepage.png',
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
  ],
  techStack: ['React', 'Vite', 'TypeScript', 'Supabase', 'Stripe', 'Klarna', 'Google Calendar API', 'Resend', 'PostgreSQL', 'Vercel'],
};

export default function CaseStudyStarr() {
  return <CaseStudyPage data={data} />;
}
