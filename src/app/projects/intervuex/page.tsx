'use client';

import { Video, Code2, PenTool, ShieldCheck, CalendarClock, ClipboardCheck } from 'lucide-react';
import ProjectCaseStudy, { type CaseStudyData } from '@/components/case-study/ProjectCaseStudy';

const data: CaseStudyData = {
  slug: 'intervuex',
  name: 'Intervue',
  nameAccent: 'X',
  tagline:
    'A collaborative technical interviewing platform that puts video, a live-synced code editor, a shared whiteboard and proctoring in one screen — with scheduling, feedback and shortlisting built in.',
  timeframe: '2025 · Personal project',
  badges: ['Live', 'Next.js 14', 'Convex', 'Clerk', 'Stream'],
  links: {
    live: 'https://intervuex.aadishjain.dev/',
    github: 'https://github.com/aadishj23/IntervueX',
  },
  screenshots: [
    { src: '/projects/intervuex/interviewer-home-page.jpg', caption: 'interviewer dashboard' },
    { src: '/projects/intervuex/code-editor.jpg', caption: 'live meeting — video + synced editor' },
    { src: '/projects/intervuex/canvas.jpg', caption: 'shared whiteboard' },
    { src: '/projects/intervuex/custom-coding-problems.jpg', caption: 'custom problem bank' },
  ],
  metrics: [
    { value: '3', label: 'Workflows unified', sub: 'Video · code · canvas' },
    { value: '6', label: 'Languages executed', sub: 'JS, TS, Python, Java, C++, Go' },
    { value: '19', label: 'Realtime backend functions', sub: '11 queries · 8 mutations' },
    { value: '6', label: 'Data tables', sub: '7 indexes' },
    { value: '2', label: 'Roles', sub: 'Interviewer · candidate' },
    { value: '4', label: 'Interview states', sub: 'Upcoming → completed → pass/fail' },
  ],
  features: [
    {
      icon: Video,
      color: 'hot',
      title: 'Video interviews on Stream',
      detail:
        'Rooms are created with a random UUID that doubles as the join key between Stream and the database. Tokens are minted in a server action so the Stream secret never reaches the browser. Only the room creator can end the call, which also flips the interview to completed.',
      metric: 'Server-minted tokens',
    },
    {
      icon: Code2,
      color: 'electric',
      title: 'Live-synced Monaco editor + 6 compilers',
      detail:
        'Every participant sees the same code, language and question in real time through a reactive subscription. Code runs through a compile API with pinned compiler builds for six languages, and the output pane normalises compile errors, stdout, stderr and signals into one view.',
      metric: '6 languages',
    },
    {
      icon: PenTool,
      color: 'neon',
      title: 'Shared whiteboard, built from scratch',
      detail:
        'A 1,000-line hand-rolled HTML5 canvas with select, pencil, eraser, line, rectangle, circle and text tools, an eight-colour palette, branching undo/redo, drag-to-move with hit-testing, and full mouse and touch support. Strokes sync to all participants after each commit.',
      metric: '7 tools · touch-ready',
    },
    {
      icon: ShieldCheck,
      color: 'hot',
      title: 'Proctoring: fullscreen + multi-monitor detection',
      detail:
        'Candidates with more than one display are blocked at the pre-call screen, and leaving fullscreen mid-interview fires an event the interviewer sees instantly. Detection falls back across three browser APIs so it works beyond Chrome.',
      metric: '3-tier detection',
    },
    {
      icon: CalendarClock,
      color: 'electric',
      title: 'Scheduling with co-interviewers',
      detail:
        'A calendar and 5-minute time picker, candidate selection filtered by role, multi-select co-interviewers with the scheduler pinned, and end-before-start validation. Scheduling creates the Stream room and the interview record in one flow.',
      metric: 'Multi-interviewer',
    },
    {
      icon: ClipboardCheck,
      color: 'neon',
      title: 'Feedback, custom problems & shortlisting',
      detail:
        'Interviewers leave 1–5 star ratings with comments per interview, build their own problem bank with examples and constraints on top of nine built-in questions, and move candidates through upcoming → completed → succeeded or failed from the dashboard.',
      metric: '9 built-in + custom',
    },
  ],
  architecture: {
    summary:
      'Next.js 14 App Router on the front, Convex as a reactive database and function layer, Clerk for identity and Stream for WebRTC. There is no separate server: every realtime feature is a Convex row that clients subscribe to, keyed by the Stream call id.',
    layers: [
      {
        name: 'Frontend',
        items: [
          'Next.js 14 App Router with route groups for interviewer, candidate and admin views',
          'Monaco editor in a 3-tab shell: code · output · canvas',
          'Two layout trees: resizable 25/75 panels on desktop, video carousel over a 70% editor on mobile',
          'Tailwind + Radix primitives, react-day-picker for scheduling',
        ],
      },
      {
        name: 'Realtime data (Convex)',
        items: [
          '6 tables: users, interviews, comments, codeStates, customProblems, canvasStates',
          'One codeStates and one canvasStates row per call, patched in place and pushed to all subscribers',
          'Interviews indexed by candidate and by Stream call id',
          'Mutations stamp updatedBy so a client can ignore its own echo',
        ],
      },
      {
        name: 'Identity (Clerk)',
        items: [
          'Clerk JWT template verified by Convex; identity.subject is the user key everywhere',
          'Svix-verified webhook syncs new users into Convex on user.created',
          'Client-side fallback sync so the app works even without the webhook configured',
          'Users pick interviewer or candidate once; role drives routing and dashboards',
        ],
      },
      {
        name: 'Video & execution',
        items: [
          'Stream Video SDK; rooms created via getOrCreate with a UUID stored on the interview',
          'Custom Stream events carry proctoring signals from candidate to interviewer',
          'POST /api/run proxies to a compile service with pinned builds (Node 20, TS 5.6, CPython 3.13, JDK 22, GCC 13, Go 1.23)',
          'Java sources rewritten so they compile under the service\'s fixed filename',
        ],
      },
    ],
    flow: [
      'Interviewer schedules → Stream call getOrCreate(uuid) → Convex createInterview({ streamCallId: uuid })',
      'Candidate opens /meeting/[id] → server action mints Stream token → pre-call proctoring check runs',
      'Both join the call; CodeEditor subscribes to codeStates by streamCallId',
      'Keystroke → upsertCodeState → Convex pushes the row → peers apply it unless updatedBy is themselves',
      'Run → POST /api/run → compile service → normalised output rendered in the output pane',
      'Candidate exits fullscreen → call.sendCustomEvent → interviewer sees a live warning',
      'Interviewer ends call → status: completed → rates + comments → marks succeeded / failed',
    ],
  },
  hardProblems: [
    {
      title: 'Detecting a second monitor across browsers',
      problem:
        'Interview integrity depends on knowing whether the candidate has a hidden screen, but there is no single reliable browser API for screen count. Chrome has an experimental Window Management API, other browsers expose only a boolean, and some expose nothing.',
      solution:
        'A three-tier fallback: ask getScreenDetails() for an exact count, then check screen.isExtended (handling the browsers where it is a Promise), then fall back to an aspect-ratio heuristic where width/height above 2.5 almost always means an extended desktop. The hook fires transitions in both directions so the interviewer sees when a second screen is connected or removed mid-call.',
      file: 'src/hooks/useProctoring.ts',
    },
    {
      title: 'Signalling proctoring events through a video SDK',
      problem:
        'Proctoring events originate on the candidate and must reach the interviewer without a custom websocket server. The Stream SDK supports custom events, but its payload shape differed between versions and nesting levels.',
      solution:
        'Reused the existing call as the transport. The candidate sends typed custom events, and the interviewer handler defensively probes several payload shapes before trusting one. Fullscreen re-entry cannot be automated without a user gesture, so a blocking modal explains and waits for the click.',
      file: 'src/components/MeetingRoom.tsx',
    },
    {
      title: 'Realtime code sync without a CRDT',
      problem:
        'Two people typing into the same Monaco instance will fight each other if every remote update replaces the local buffer, and naïve syncing loops updates back to the sender.',
      solution:
        'Chose last-write-wins on a single row per call, which is the right trade-off for an interview where one person types at a time. Each mutation stamps updatedBy, and clients skip updates they authored. Language and question selection ride on the same row so a switch by either side is reflected everywhere.',
      file: 'convex/code.ts · src/components/CodeEditor.tsx',
    },
    {
      title: 'A collaborative whiteboard with no canvas library',
      problem:
        'Off-the-shelf whiteboards were heavy and hard to embed inside a tab next to a code editor, and none synced through Convex cleanly.',
      solution:
        'Built an immediate-mode renderer over an element array: hit-testing for select and drag, a lasso-style eraser, branching undo/redo that truncates the future on a new stroke, inline text entry positioned over the canvas, and unified pointer/touch mapping via getBoundingClientRect. The element array is serialised to Convex on each committed stroke.',
      file: 'src/components/canvas.tsx',
    },
    {
      title: 'Six languages through one compile endpoint',
      problem:
        'Each language returns a different mix of compiler output, program output, stderr and signals, and the service compiles Java under a fixed filename that breaks the usual public class Main convention.',
      solution:
        'Pinned exact compiler build ids per language, rewrote public class to class for Java before submission, and merged the five output fields into one ordered string with a friendly fallback when the program prints nothing.',
      file: 'src/app/api/run/route.ts',
    },
  ],
  lessons: [
    'Debounce editor mutations. Every keystroke currently writes a row; batching at ~100ms would cut writes by an order of magnitude with no visible latency.',
    'Move role checks server-side. Role gating is enforced in the client today; Convex functions should reject calls from the wrong role too.',
    'Self-host code execution in an isolated container with a timeout and rate limit instead of relying on a public compile service.',
    'Adopt a CRDT such as Yjs if the product ever needs true simultaneous editing rather than turn-taking.',
  ],
  techStack: ['Next.js 14', 'TypeScript', 'Convex', 'Clerk', 'Stream Video', 'Monaco Editor', 'Tailwind CSS', 'Radix UI', 'HTML5 Canvas'],
};

export default function IntervueXCaseStudy() {
  return <ProjectCaseStudy data={data} />;
}
