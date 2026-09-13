'use client';

import { CalendarDays, Gauge, RefreshCw, LifeBuoy, KeyRound, FileDown } from 'lucide-react';
import ProjectCaseStudy, { type CaseStudyData } from '@/components/case-study/ProjectCaseStudy';

const data: CaseStudyData = {
  slug: 'tracker-360',
  name: 'Tracker',
  nameAccent: '360',
  tagline:
    'A personalised study planner for Physics Wallah batches. It turns a student\'s subject, faculty and chapter choices into a day-by-day schedule, tracks watched lectures automatically, and adapts when they fall behind. Designed and built solo — now 200,000+ active users.',
  timeframe: '2025 – present · Physics Wallah · built solo',
  badges: ['Live · pw.live', 'Next.js 16', 'React 19', 'MongoDB', 'Redis', 'Docker · Kubernetes'],
  links: {
    live: 'https://tracker360.pw.live',
  },
  screenshots: [
    { src: '/projects/tracker-360/home.jpg', caption: 'tracker360.pw.live — pick your batch' },
  ],
  metrics: [
    { value: '200K+', label: 'Active users' },
    { value: '300K+', label: 'Visits' },
    { value: '~9,000 hrs', label: 'Content planned per batch', sub: '3,200 lectures · 2,137 DPPs' },
    { value: '413', label: 'Chapters indexed', sub: '27 faculties · 5 subjects' },
    { value: '2 KB', label: 'Plan document', sub: 'Down from 133 KB' },
    { value: '126', label: 'Scheduler test assertions', sub: 'All passing' },
  ],
  features: [
    {
      icon: CalendarDays,
      color: 'hot',
      title: 'Plan wizard',
      detail:
        'Students pick a batch, subjects, faculty per subject and optionally narrow chapters, then choose a 90 or 120 day horizon, a study style (rotation or focus), playback speed and a daily ceiling. The plan is stored as those selections, not as a materialised list.',
      metric: '5 subjects · 27 faculties',
    },
    {
      icon: Gauge,
      color: 'electric',
      title: 'Daily schedule engine',
      detail:
        'A pure, side-effect-free scheduler derives today\'s list, backlog, pace, health and overflow from the plan on every read. Nothing per-day is stored, so a change to the plan is reflected instantly and the engine is fully unit-tested in isolation.',
      metric: '915 lines · pure',
    },
    {
      icon: RefreshCw,
      color: 'neon',
      title: 'Automatic progress sync',
      detail:
        'Watch stats are pulled from PW\'s video API on each visit and lectures the student already watched are ticked off automatically. The sync picks lectures round-robin across subjects so no subject is starved.',
      metric: 'Zero manual ticking',
    },
    {
      icon: LifeBuoy,
      color: 'hot',
      title: 'Recovery, extensions & deferrals',
      detail:
        'Fall behind and the planner offers a recovery window that spreads owed minutes over 7, 14 or 30 days. Plans can be extended twice, individual items deferred or pulled forward, and yesterday\'s misses acknowledged. Eight progress actions in total.',
      metric: '8 progress actions',
    },
    {
      icon: KeyRound,
      color: 'electric',
      title: 'pw.live SSO + OTP fallback',
      detail:
        'Signed-in PW students are adopted straight from the shared pw.live cookie, verified locally by signature. Everyone else goes through a Turnstile-gated OTP. Sessions are HMAC-signed cookies; PW tokens never reach the browser.',
      metric: 'Fails closed without secret',
    },
    {
      icon: FileDown,
      color: 'neon',
      title: 'PDF export & security hardening',
      detail:
        'A printable plan export, plus a per-request CSP nonce with strict-dynamic, double-submit CSRF, nine security headers and an ESLint rule that fails the build on inline styles because they fail silently under the strict CSP in production.',
      metric: 'Strict CSP',
    },
  ],
  architecture: {
    summary:
      'A single Next.js 16 service, no workers, no cron. Routes handle gating and persistence; a pure domain layer under lib/planner does all scheduling maths; an integration layer wraps PW\'s APIs with budgets and retries. Course content is committed JSON pinned by a content version, MongoDB holds plans and members, and Redis holds PW tokens and rate-limit counters.',
    layers: [
      {
        name: 'Frontend',
        items: [
          'Next.js 16 App Router, React 19, Tailwind v4',
          'Four-state root: checking, signed-out, no-batch, has-plan',
          'Wizard and Today views drive the whole product',
          'GA4 injected with the per-request CSP nonce',
        ],
      },
      {
        name: 'API & security',
        items: [
          '15 endpoints: 6 auth, 7 planner, 1 health, 1 export',
          'proxy.ts runs before every request: CSP nonce, CSRF double-submit, security headers',
          'Rate limits per IP and per phone; X-Forwarded-For read right-to-left so a client cannot spoof past them',
          'Dependency-free /api/health so a Redis blip cannot restart a healthy pod',
        ],
      },
      {
        name: 'Data (MongoDB + Redis)',
        items: [
          'Two collections: plans and members, joined by phone',
          'Unique partial index: one active plan per student, archived plans never collide',
          'Plan items derived on read from selections + committed content, never stored',
          'contentVersion pins each plan to a content snapshot so a content update cannot alter a live syllabus',
        ],
        note: 'Redis: PW access and refresh tokens, a per-phone refresh lock, and fixed-window rate-limit counters.',
      },
      {
        name: 'Integration & infra',
        items: [
          'PW video-stats API called in chunks of 20 with a 5 s total budget; partial results are used',
          'One retry on ambiguous PW statuses only; 401 is never retried',
          'Three-stage Docker build on node:24-slim, standalone output, non-root user',
          'Jenkins branch-to-environment pipeline; Elastic APM and ECS-format pino logs',
        ],
      },
    ],
    flow: [
      'Page load → POST /api/planner/sync (rate-limited in Redis before touching Mongo) + GET /api/planner/plan',
      'plan → findOne({phone, status: active}, {items: 0}) with a 15 s maxTimeMS, projecting the item list out',
      'hydratePlanItems rebuilds items from selections + committed JSON and verifies every completed id exists',
      'deriveSchedule computes today, backlog, pace, health and overflow; derivePlanStats computes streaks and finish date',
      'Student ticks an item → POST /api/planner/progress with CSRF header → append {itemId, completedAt}',
      'plan.save() writes ~2 KB because items were unmarked as modified; today\'s list shrinks instead of refilling',
    ],
  },
  hardProblems: [
    {
      title: 'A 133 KB document per student, and a fix that could not lose progress',
      problem:
        'Each plan stored its full item list, about 131 KB of a 133 KB document, written once and never changed. As sign-ups grew the working set outgrew the database cache on a shared cluster, reads went to disk, and plan lookups started timing out during launch traffic.',
      solution:
        'Three mechanisms in order. Derive items on read from the student\'s selections plus committed content, shrinking documents to about 2 KB. Never fetch the list at all by projecting it out of every query. Create the phone index imperatively at runtime because the declared index build had silently failed. Because completed progress refers to items by id, the rebuild verifies that every completed id exists and falls back to a full read if any is missing. A read-only verification script proved every plan was rebuildable before anything was deleted, and migration runs opportunistically on read so it converges as students arrive.',
      file: 'lib/planner/materialise.ts · models/Plan.ts',
    },
    {
      title: 'Today\'s list kept refilling when you finished something',
      problem:
        'Today\'s target was remaining work divided by remaining days. Completing a lecture freed its share and the day refilled with the next one, so finishing work made the list longer. Moving a lecture off today pulled a different one in, so the day changed rather than shrank.',
      solution:
        'One invariant: today\'s budget is fixed at the start of the day and what you do only changes what is left of it. Three subtractions from the same budget: pinned minutes, minutes moved away from today specifically, and minutes completed today added back explicitly since completed items have already left the remaining pool. The fill step also knows what is already on the day so the never-hand-back-an-empty-day rule cannot award a bonus lecture the moment someone finishes.',
      file: 'lib/planner/schedule.ts',
    },
    {
      title: 'Refreshing our token silently killed the pw.live session',
      problem:
        'PW rotates the refresh token on every use, and the access token pw.live holds in its own cookie is the same one this app spends when it refreshes. Drop the replacement and pw.live\'s cookie is dead, so the student is bounced back to OTP on the main site.',
      solution:
        'The refresh result makes the updated cookie non-optional on success and the rule is documented: if a route cannot set a cookie the browser will keep, it must not refresh. The sync endpoint, which runs on every page load, reads the existing token and skips when there is none so it cannot race the session route. Writes are ordered so the rotated refresh token is stored before the new access token is used.',
      file: 'lib/pw/ensureToken.ts · app/api/planner/sync',
    },
    {
      title: 'A CSRF origin check that failed closed on infrastructure we do not control',
      problem:
        'X-Forwarded-Host is appended to per proxy hop. Production had two hops where staging had one, so comparing Origin against it never matched and blocking on that comparison took production login down while staging stayed green.',
      solution:
        'Collect every entry in the forwarded chain plus Host, demote the Origin comparison to a logged warning, and rely on double-submit CSRF: a script-readable cookie echoed in a header and compared in constant time, plus SameSite=Lax on the session cookie. A check that fails closed on infrastructure you do not control is worse than no check.',
      file: 'proxy.ts',
    },
    {
      title: 'Syncing watch progress against a paginated, slow upstream',
      problem:
        'PW\'s stats endpoint pages at 20 ids and can be slow. A naïve sync of a 700-item plan would time out, and a front slice of 40 items was entirely Physics because items are stored subject by subject, leaving most of a student\'s watching permanently unsyncable.',
      solution:
        'Chunk at 20 with a hard cap on chunks, a 3 s per-chunk timeout and a 5 s total budget; use partial results and pick up the rest next visit. Select the 40 lectures to sync round-robin across subjects. Rate-limit the sync per phone in Redis before any database work so a throttled sync costs one Redis GET.',
      file: 'lib/pw/videoStats.ts · app/api/planner/sync',
    },
  ],
  lessons: [
    'Put the load-bearing invariants in types, not comments: a branded HydratedPlan type and a content hash computed at build time instead of a manually bumped version constant.',
    'Add tests for the integration layer, where every production incident actually happened; the pure scheduler is already well covered.',
    'Memoise the per-faculty item mapping in a process-level Map, since the content is immutable and version-pinned.',
    'Extract a planner service layer so the 765-line plan route can be tested without HTTP.',
    'Key plans on the PW user id rather than phone so a number change does not orphan a plan.',
  ],
  techStack: ['Next.js 16', 'React 19', 'TypeScript', 'MongoDB', 'Mongoose', 'Redis', 'Node.js', 'Tailwind v4', 'Docker', 'Kubernetes', 'Jenkins', 'Elastic APM', 'Cloudflare Turnstile'],
};

export default function Tracker360CaseStudy() {
  return <ProjectCaseStudy data={data} />;
}
