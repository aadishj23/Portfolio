'use client';

import { GraduationCap, ScanLine, KeyRound, CreditCard, Database, ShieldCheck } from 'lucide-react';
import ProjectCaseStudy, { type CaseStudyData } from '@/components/case-study/ProjectCaseStudy';

const data: CaseStudyData = {
  slug: 'career-wallah',
  name: 'Career',
  nameAccent: 'Wallah',
  tagline:
    'A college-prediction and career-guidance platform for JEE and NEET aspirants at Physics Wallah. Ideated, pitched and built end-to-end by me — now serving 150,000+ active users with 200,000+ sign-ins.',
  timeframe: 'Jun 2025 – present · Physics Wallah · built solo',
  badges: ['Live · pw.live', 'Next.js 16', 'React 19', 'MongoDB', 'Redis', 'Docker · Kubernetes'],
  links: {
    live: 'https://careerwallah.pw.live/',
  },
  screenshots: [
    { src: '/projects/career-wallah/home.jpg', caption: 'careerwallah.pw.live — predictors hub' },
    { src: '/projects/career-wallah/neet-predictor.jpg', caption: 'NEET college predictor' },
  ],
  metrics: [
    { value: '150K+', label: 'Active users' },
    { value: '200K+', label: 'Sign-ins' },
    { value: '30,882', label: 'Cutoff rows', sub: 'JEE 26,166 · NEET 4,716' },
    { value: '20', label: 'Counselling boards', sub: '12 JEE · 8 NEET' },
    { value: '27', label: 'API handlers', sub: '10 pages · 64 components' },
    { value: '6', label: 'External integrations' },
  ],
  features: [
    {
      icon: GraduationCap,
      color: 'hot',
      title: 'JEE & NEET college predictors',
      detail:
        'Rank, category, gender and state go in; a filtered, paginated list of reachable colleges comes out. Twelve JEE counselling boards and eight NEET counsellings, each with its own cutoff schema and quota vocabulary, are unified into one result shape with per-row rank basis so the UI can say which rank produced each match.',
      metric: '20 boards · 30K+ rows',
    },
    {
      icon: ScanLine,
      color: 'electric',
      title: 'NEET OMR score calculator',
      detail:
        'Students photograph their OMR sheet. The image goes to object storage, a PyTorch-based parser running on a serverless function extracts 180 answers, and the server scores them against the booklet answer key with multi-accept and dropped-question rules. Aggregate stats per booklet update in real time.',
      metric: '180 answers · 4 booklets',
    },
    {
      icon: KeyRound,
      color: 'neon',
      title: 'Phone OTP + pw.live single sign-on',
      detail:
        'Cloudflare Turnstile-gated OTP through PW\'s auth API, an HMAC-signed session cookie carrying product entitlements, and seamless adoption of an existing pw.live session so a logged-in PW student never sees a login screen. Sign-in writes back to pw.live too.',
      metric: '90-day sessions',
    },
    {
      icon: CreditCard,
      color: 'hot',
      title: 'Paid NEET unlock with verified payments',
      detail:
        'Checkout via PW\'s payment service, with every payment event re-verified server-to-server against the gateway\'s status API before access is granted. Receipts are generated once and idempotently, and a reconcile step catches payments that completed in another tab.',
      metric: 'Webhook + return + reconcile',
    },
    {
      icon: Database,
      color: 'electric',
      title: 'Datasets as immutable, in-memory files',
      detail:
        'Twenty-five JSON datasets built by a set of scraper and normaliser scripts ship inside the container and are parsed once per process. No database read sits on the prediction path, which is why a prediction request is CPU-bound and cheap even under exam-result traffic spikes.',
      metric: '19 MB · 25 datasets',
    },
    {
      icon: ShieldCheck,
      color: 'neon',
      title: 'Document checklist & lead capture',
      detail:
        'A per-student counselling document checklist with uploads, cached with a five-minute cache-aside layer, plus lead records per product so the counselling team sees who predicted what. Both fail open so a cache hiccup never blocks a student.',
      metric: '19 documents · 5 groups',
    },
  ],
  architecture: {
    summary:
      'A single Next.js 16 service in a Docker container on Kubernetes, deployed through Jenkins. Route handlers own HTTP concerns, a request layer validates and orchestrates, and pure prediction engines compute over datasets held in module memory. MongoDB stores leads, payments and OMR submissions across four logical databases; Redis holds tokens, entitlement flags, rate-limit counters and live aggregates.',
    layers: [
      {
        name: 'Frontend',
        items: [
          'Next.js 16 App Router, React 19, Tailwind v4 with CSS-variable theme tokens',
          'Two product verticals (JEE, NEET) with shared navbar, modal and login components',
          'Infinite-scroll results with server-side pagination and live filter counts',
          'Generated sitemap, robots, manifest and Open Graph image',
        ],
      },
      {
        name: 'API & auth',
        items: [
          '27 handlers under /api; all on the Node runtime for crypto and datasets',
          'HMAC-SHA256 signed session cookie carrying phone, expiry and per-product entitlements',
          'SSO tokens from pw.live verified locally by signature and pinned to the PW org',
          'Per-IP and per-phone fixed-window rate limits in Redis, failing open on Redis errors',
        ],
      },
      {
        name: 'Data',
        items: [
          'MongoDB: four logical databases on one pooled connection so product leads never collide on unique phone indexes',
          '6 Mongoose models plus 2 native-driver collections for OMR uploads and submissions',
          'Redis: PW tokens, permanent paid flags, per-booklet aggregate hashes rebuilt lazily from Mongo',
          '30,882 cutoff rows as committed JSON, memoised per process, zero DB reads on the predict path',
        ],
      },
      {
        name: 'Integrations & infra',
        items: [
          'PW auth, batches and files APIs; PW payment service; Cloudflare Turnstile',
          'Serverless OMR parser called by URL to stay under function payload limits; 60 s timeout for cold starts',
          'Three-stage Docker build on node:20-slim, dependency-free /api/health for liveness',
          'Jenkins branch-to-environment pipeline: development, staging, pre-prod, production',
        ],
      },
    ],
    flow: [
      'POST /api/predict → rate limit per IP → validate rank, category, gender, state and cross-field rank rules',
      'Session read from cookie or bearer; if JEE entitlement missing, check PW batches live and re-mint the cookie keeping other flags',
      'runFullPrediction → 12 board adapters merge into one college list held in memory',
      'applyFilters + filter counts + branch totals over the full set → slice(offset, limit)',
      'On page 1 only, upsert the counselling lead (best-effort, never blocks the response)',
      'Respond with a distinct-college headline count while pagination stays on the raw card list',
    ],
  },
  hardProblems: [
    {
      title: 'Rotating refresh tokens under concurrent requests',
      problem:
        'The session cookie lives 90 days but PW access tokens expire in about a week, and PW rotates the refresh token on every use. A single page load fires more than one session check, so two concurrent refreshes meant the loser presented an already-spent token and logged the student out at the exact moment the system was trying to keep them in.',
      solution:
        'A Redis SET NX lock per phone serialises refreshes. The rotated refresh token is stored before the new access token is used anywhere; losing the race returns a deferred result that keeps the session standing; a hard refusal deletes the stored token instead of retrying a dead credential on every page load; a PW outage fails open on the token already held. The rotated pair is also written back to the pw.live cookie, because the token just spent was pw.live\'s copy too.',
      file: 'lib/pw/ensureToken.ts · lib/pw/tokenStore.ts',
    },
    {
      title: 'Four ranks, twenty boards, one honest result row',
      problem:
        'A JEE candidate holds up to four ranks and a NEET candidate holds a rank plus a score. Each counselling board publishes cutoffs against a different one, in its own quota vocabulary, and some datasets use state ranks that cannot be compared to an all-India rank at all.',
      solution:
        'Instead of forcing one rank, every result row declares its rank basis and a display label, so the UI states which rank produced each comparison. NEET rows declare AIR or SCORE and probability, reach-slack and sort direction all invert per basis. Twelve adapter functions absorb per-board schema differences. Boards whose ranks are not comparable are excluded outright rather than approximated.',
      file: 'lib/jeePredictor/predictions.ts · lib/neetPredictor/predictions.ts',
    },
    {
      title: 'Trusting a payment gateway that sends unsigned webhooks',
      problem:
        'The gateway\'s webhook payload carries no signature, its browser redirect is user-controllable, it offers no metadata field to attach a user id, and it reports the same intermediate status for "still confirming" and "user abandoned checkout".',
      solution:
        'Two trust anchors applied identically on the redirect and webhook paths: every event is re-verified server-to-server against the authenticated status API, and the owner and product are recovered from our own pending row keyed on our transaction id, never from the payload. Create-order reconciles the most recent unconfirmed attempts concurrently before charging, catching an older attempt completing in a second tab. Transient webhook failures return 500 so the gateway retries.',
      file: 'app/api/payments/webhook · app/api/neet-payment/*',
    },
    {
      title: 'Taking MongoDB off the scoring critical path',
      problem:
        'Scoring an OMR sheet needs the image, the parser and the answer key. MongoDB is only needed for our analytics, yet looking up the image URL from Mongo meant a database outage would stop every student from getting their score.',
      solution:
        'The upload step returns an HMAC-signed token binding the storage URL to the verified phone with a six-hour TTL. The parse step reads the URL straight out of the token, so a student cannot aim the parser at an arbitrary URL or score someone else\'s sheet, and no DB read is needed. All persistence and aggregate updates moved into Next\'s after() so they run once the response has been sent.',
      file: 'lib/neetScore/uploadToken.ts · app/api/neet-score/parse-omr',
    },
    {
      title: 'Deciding fail-open versus fail-closed per call site',
      problem:
        'A platform with six external dependencies has to decide, for each one, whether an outage should let users through or stop them. A blanket policy either locks everyone out during a blip or hands out paid access for free.',
      solution:
        'Fail open: rate limiter, checklist cache, lead writes, aggregate increments, PW token verification during an outage. Fail closed: paid-status checks when Redis answers but Mongo hiccups. Fail loud: when both stores are down the paid check throws a distinct error so the user sees "try again" instead of a false paywall. Entitlement checks return WRONG_NUMBER and BATCH_CHECK_FAILED as separate codes so a PW outage never accuses a student of using the wrong number.',
      file: 'lib/neetPayment/store.ts · app/api/predict/route.ts',
    },
  ],
  lessons: [
    'Build the image with the committed lockfile instead of resolving dependencies fresh, so the deployed build is the tested build.',
    'Add golden-file tests per counselling board for the prediction engines: fixed inputs, snapshotted college lists.',
    'Replace the fixed-window rate limiter with a sliding window or token bucket to close the 2x burst at window boundaries.',
    'Prune unused runtime dependencies and the native build toolchain they pull into the image.',
    'Keep every product constant such as prices in exactly one module and import it everywhere.',
  ],
  techStack: ['Next.js 16', 'React 19', 'TypeScript', 'MongoDB', 'Mongoose', 'Redis', 'Node.js', 'Tailwind v4', 'Docker', 'Kubernetes', 'Jenkins', 'Cloudflare Turnstile', 'AWS Lambda'],
};

export default function CareerWallahCaseStudy() {
  return <ProjectCaseStudy data={data} />;
}
