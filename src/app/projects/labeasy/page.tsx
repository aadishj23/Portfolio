'use client';

import { FlaskConical, Sparkles, Wallet, ShieldCheck, Stethoscope, LayoutDashboard } from 'lucide-react';
import ProjectCaseStudy, { type CaseStudyData } from '@/components/case-study/ProjectCaseStudy';

const data: CaseStudyData = {
  slug: 'labeasy',
  name: 'Lab',
  nameAccent: 'easy',
  tagline:
    'A multi-vendor healthcare marketplace where patients book lab tests, doctor consultations and health insurance in one app — with AI report summaries, a per-marker health dashboard, and a single signed ledger that pays every vendor.',
  timeframe: 'Nov 2024 – Jun 2026 · Top 10 finalist, HackCBS 7 (MLH) · 85 commits',
  badges: ['Live', 'Next.js 15', 'Prisma 7', 'PostgreSQL', 'Gemini', 'Razorpay', 'Redis', 'Docker'],
  links: {
    live: 'https://labeasy.aadishjain.dev/',
    github: 'https://github.com/aadishj23/Labeasy',
  },
  screenshots: [
    { src: '/projects/labeasy/health-dashboard.jpg', caption: 'patient health dashboard — per-marker trends & score' },
    { src: '/projects/labeasy/reports-ai-summary.jpg', caption: 'report with Gemini summary' },
    { src: '/projects/labeasy/lab-wallet.jpg', caption: 'lab console — wallet ledger' },
    { src: '/projects/labeasy/admin-analytics.jpg', caption: 'admin analytics' },
  ],
  metrics: [
    { value: '5', label: 'Actor types', sub: 'Patient · lab · doctor · insurer · admin' },
    { value: '123', label: 'API route handlers', sub: 'Under /api/v1' },
    { value: '32', label: 'Prisma models', sub: '37 migrations' },
    { value: '56', label: 'Pages', sub: '4 role dashboards' },
    { value: '4', label: 'Payment flows', sub: 'Orders · consults · policies · ads' },
    { value: '3', label: 'Gemini prompts', sub: 'Extract · summarise · PDF' },
  ],
  features: [
    {
      icon: FlaskConical,
      color: 'hot',
      title: 'Multi-vendor lab marketplace',
      detail:
        'A global test catalogue with per-lab pricing and home-collection fees, lab-owned packages, slot capacity, an eight-state order lifecycle from placed to completed, and offline walk-in bookings that live alongside platform orders in the same tables.',
      metric: '120+ tests · 8 order states',
    },
    {
      icon: Sparkles,
      color: 'electric',
      title: 'AI report summaries that fail safe',
      detail:
        'When a lab uploads a PDF or image, Gemini extracts every numeric marker with its reference range, then a second prompt writes a plain-language summary with highlights and specialist suggestions constrained to an eleven-item whitelist. Every AI path degrades to a rule-based fallback so an upload never blocks.',
      metric: 'Multimodal extraction',
    },
    {
      icon: Stethoscope,
      color: 'neon',
      title: 'Health dashboard, sharing & re-test reminders',
      detail:
        'Per-marker sparklines built from every report in order, a deterministic health score over markers with reference bounds, doctors nearby re-ranked by suggested specialty, revocable share links for reports, and reminder emails that fire when a re-test is due.',
      metric: 'Revocable share links',
    },
    {
      icon: Wallet,
      color: 'hot',
      title: 'One signed ledger for every vendor',
      detail:
        'Labs, doctors and insurers share a single append-only wallet table. Earnings credit on completion, platform fees, ad spend and commissions debit, and a balance is simply the sum. Vendors can buy sponsored listings wallet-first with Razorpay covering the remainder.',
      metric: '7 entry types',
    },
    {
      icon: ShieldCheck,
      color: 'electric',
      title: 'Payments without trusting the client',
      detail:
        'Four independent checkout-and-verify flows recompute every price from the database, verify the Razorpay signature with a constant-time HMAC compare, short-circuit on already-terminal records, and flip state inside a transaction. Coupon double-redemption is blocked by a unique index.',
      metric: 'HMAC + idempotent',
    },
    {
      icon: LayoutDashboard,
      color: 'neon',
      title: 'Role consoles & admin',
      detail:
        'Separate dashboards for labs, doctors and insurers covering bookings, slots or plans, coupons, a phone-linked patient CRM, promotions, wallet and analytics. Admin approves vendors, plan commissions and profile change requests, and runs platform-wide analytics and coupons.',
      metric: '4 dashboards',
    },
  ],
  architecture: {
    summary:
      'A single Next.js 15 App Router codebase: every page is a thin re-export of a view component, and all business logic sits in route handlers under /api/v1 plus a lib layer of thirty modules. PostgreSQL through Prisma is the only source of truth; Redis and Gemini are optional subsystems that the app runs fine without.',
    layers: [
      {
        name: 'Frontend',
        items: [
          'Next.js 15 App Router, 56 pages as one-line re-exports of 48 view components',
          'Role-scoped route trees: /labsdashboard, /doctordashboard, /insurancedashboard, /admin',
          'Zustand auth store, Tailwind + Radix, Chart.js for analytics, hand-rolled SVG sparklines',
          'Sitemap, robots and a catch-all route for SEO',
        ],
      },
      {
        name: 'API & auth',
        items: [
          '123 route handlers under /api/v1 grouped by domain (admin, labs, insurance, auth, doctor, tests, orders…)',
          'Patients and vendors: httpOnly session cookie carrying a typed JWT; each route asserts the principal type',
          'Admin: separate short-lived Bearer JWT in sessionStorage so a vendor cookie can never satisfy admin checks',
          'Edge middleware verifies the JWT with jose and enforces seven prefix rules before any page renders',
        ],
      },
      {
        name: 'Data (PostgreSQL + Prisma 7)',
        items: [
          '32 models, 7 enums, 37 migrations; all money stored as integer paise',
          'WalletEntry: signed amounts keyed by owner type + id, ref_id as idempotency key, no balance column',
          'CouponRedemption.ref_id unique index doubles as the double-redeem guard',
          'VendorPatient unique on (vendor, phone) merges walk-in and online patients',
        ],
      },
      {
        name: 'Integrations',
        items: [
          'Razorpay orders + HMAC-SHA256 signature verification with timingSafeEqual',
          'Gemini via REST in JSON mode: analyte extraction, summary generation, direct PDF summary',
          'Upstash Redis cache-aside: catalogue (5 min), sponsored sets (60 s), PIN geo lookups (30 days)',
          'Cloudinary for report files, Resend for OTP and reminder mail, cron endpoints guarded by a secret',
        ],
        note: 'Two-stage Docker build on node:20-slim, standalone Next output, runs as a non-root user.',
      },
    ],
    flow: [
      'Patient adds tests → checkout recomputes prices from DB → applies vendor or admin coupon → Razorpay order created',
      'Client returns payment id + signature → /orders/verify checks ownership, HMAC, terminal state → $transaction flips PLACED → CONFIRMED',
      'Lab uploads report → MIME + 10 MB check → Cloudinary → Gemini extracts analytes → Report row created',
      'Upload completes the order → lab wallet credited (order:{id} ref_id) → platform-borne discount added back',
      'Patient opens results → summary generated in JSON mode, whitelisted, cached on the report; fallback if AI fails',
      'Whole-profile summary keyed by SHA-256 of the analyte snapshot, regenerated only when markers change',
      'Monthly cron posts platform fee per vendor with fee:{id}:{period} ref_id so re-runs are no-ops',
    ],
  },
  hardProblems: [
    {
      title: 'One ledger, three vendor types, no balance column',
      problem:
        'Labs earn on order completion, doctors on consultations, insurers on policy commissions, and all three spend on platform fees and ads. A balance column per vendor drifts the moment two code paths disagree, and payouts need an audit trail.',
      solution:
        'A single append-only WalletEntry table with signed integer paise, an owner discriminator, and a structured ref_id per event such as order:{id} or fee:{labId}:{period}. Balance is the sum of entries. Adding doctors later kept the original lab ref_id format unchanged so existing idempotency held.',
      file: 'src/lib/wallet.ts · src/lib/billing.ts',
    },
    {
      title: 'Who eats a platform coupon in a multi-vendor payout',
      problem:
        'A vendor coupon reduces what the vendor is paid, but an admin coupon must not. Getting this wrong either shorts the vendor or overpays them, and the maths differs for orders, consults and policies.',
      solution:
        'Coupon lookup prefers vendor-owned codes, and admin codes mark the order as platform-borne with the amount stored in platform_discount. Every payout path then credits gross: total plus platform discount for labs, fee plus discount for doctors, amount plus discount minus commission for insurers. Payable is floored at one rupee.',
      file: 'src/lib/coupons.ts · api/v1/orders/checkout',
    },
    {
      title: 'Idempotent, tamper-resistant payments without webhooks',
      problem:
        'Verification is driven by the client callback, so a replayed or forged callback, a double click, or a modified price in the request body all had to be harmless.',
      solution:
        'Each verify route re-fetches the record, asserts ownership and that the stored provider order id matches, verifies the HMAC with a constant-time compare, returns early if the record is already terminal, flips state in a transaction, and records the coupon redemption behind a unique index that swallows duplicates. Prices are always recomputed server-side.',
      file: 'src/lib/razorpay.ts · api/v1/*/verify',
    },
    {
      title: 'Treating the AI as untrusted and optional',
      problem:
        'Gemini output is free text in a medical context. It can invent specialties, return malformed JSON, or time out, and none of that may block a lab from uploading a report or a patient from reading it.',
      solution:
        'JSON response mode plus a guarded parse, array checks on every field, specialty suggestions filtered against a whitelist, and a rule-based fallback summary on any failure. Only AI-generated results are cached so a fallback is retried next time. The profile-level summary is keyed by a hash of the analyte snapshot so it regenerates only on real change.',
      file: 'src/lib/ai-summary.ts · api/v1/health/summary',
    },
    {
      title: 'Merging walk-in and online patients by phone',
      problem:
        'Labs and doctors still see walk-in patients who never signed up. They needed a CRM that works offline yet reconciles when that patient later books online, without counting manual bookings as platform revenue.',
      solution:
        'A VendorPatient table unique on vendor and phone. Manual orders carry a null user id and a MANUAL source; platform bookings upsert into the same book by phone, so identities merge silently. Every wallet, fee and GMV query filters to PLATFORM source.',
      file: 'src/lib/vendor-patient.ts',
    },
  ],
  lessons: [
    'Put the wallet idempotency check inside the insert: a unique index on WalletEntry.ref_id instead of a find-then-insert, so concurrent requests cannot double-credit.',
    'Add a Razorpay webhook as a second verification path so a dropped client callback still confirms the payment.',
    'Enforce slot capacity with a database constraint or a conditional update rather than a read-then-increment.',
    'Proxy report files through a signed, expiring URL so revoking a share link also revokes the file.',
  ],
  techStack: ['Next.js 15', 'TypeScript', 'Prisma 7', 'PostgreSQL', 'Gemini API', 'Razorpay', 'Upstash Redis', 'Cloudinary', 'Resend', 'Zod', 'Zustand', 'Tailwind CSS', 'Docker'],
};

export default function LabeasyCaseStudy() {
  return <ProjectCaseStudy data={data} />;
}
