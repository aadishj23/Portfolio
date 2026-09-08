'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import {
  ArrowLeft,
  ExternalLink,
  MapPin,
  Calendar,
  Rocket,
  Users,
  Database,
  Zap,
  FileSpreadsheet,
  Award,
  TrendingUp,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const headlineMetrics = [
  { value: '150K+', label: 'Active users', sub: 'Career Wallah' },
  { value: '200K+', label: 'Active users', sub: 'Tracker 360' },
  { value: '500K+', label: 'Users served', sub: 'Exam platforms' },
  { value: '300K+', label: 'Records migrated', sub: 'Khazana 1.0 → 2.0' },
  { value: '200K+ hrs', label: 'Video auto-ingested', sub: 'Khazana automation' },
  { value: '1M+', label: 'Notes auto-ingested', sub: 'Khazana automation' },
];

// Full literal class strings so Tailwind's JIT keeps them (dynamic `bg-${x}` gets purged).
const toneClasses: Record<string, { iconWrap: string; badge: string }> = {
  hot: { iconWrap: 'bg-hot/10 text-hot', badge: 'bg-hot/15 text-hot border-hot/30' },
  electric: { iconWrap: 'bg-electric/10 text-electric', badge: 'bg-electric/15 text-electric border-electric/30' },
  neon: { iconWrap: 'bg-neon/10 text-neon', badge: 'bg-neon/15 text-neon border-neon/30' },
};

const accomplishments = [
  {
    icon: Rocket,
    color: 'hot',
    title: 'Career Wallah — owned end-to-end',
    detail:
      'Ideated and pitched Career Wallah, a personalized college-prediction and career-guidance platform. I currently own its end-to-end development — architecture, backend, frontend and shipping. It now serves 150,000+ active users with 200,000+ sign-ins.',
    metric: '150K+ active users',
  },
  {
    icon: Users,
    color: 'electric',
    title: 'Tracker 360 — designed & built solo',
    detail:
      'Designed and independently developed Tracker 360, a personalized study-planning and progress-tracking platform that dynamically generates student-specific learning plans and tracks progress against them. Now serves 200,000+ active users.',
    metric: '200K+ active users',
  },
  {
    icon: Database,
    color: 'neon',
    title: 'Khazana 1.0 → 2.0 migration',
    detail:
      'Led the Khazana 1.0 → 2.0 migration: designed the system architecture and database schema, built the migration pipelines, and coordinated a multi-team rollout to move 300,000+ records onto the new schema without downtime for students.',
    metric: '300K+ records',
  },
  {
    icon: Zap,
    color: 'hot',
    title: 'Khazana ingestion automation',
    detail:
      'Owned and architected the automation layer for Khazana, enabling end-to-end autonomous ingestion of 200,000+ hours of video and 1M+ notes — supporting a platform used by 2Cr+ students with zero manual intervention in the content pipeline.',
    metric: '200K+ hrs • 1M+ notes',
  },
  {
    icon: FileSpreadsheet,
    color: 'electric',
    title: 'High-traffic examination platforms',
    detail:
      'Built and scaled score calculators, rank predictors and counseling tools that hold up under exam-day traffic spikes, serving 500,000+ users. Developed Node.js/Python data pipelines that extract, clean and process 170,000+ student result records across JEE, CBSE, ICSE and state boards.',
    metric: '500K+ users • 170K+ records',
  },
  {
    icon: Award,
    color: 'neon',
    title: 'Rapid internal tooling',
    detail:
      'Shipped internal tools in as little as a day, including a bulk certificate generator (10,000+ certificates generated), a Next.js automation portal that cut a recurring Khazana workflow from 48 hours to 2, and a faculty resource-planning platform.',
    metric: '48h → 2h',
  },
];

const products = [
  { name: 'Career Wallah', engaged: '1,50,000+', visits: '2,00,000+ sign-ins', url: 'https://careerwallah.pw.live/', status: 'Live' },
  { name: 'Tracker 360', engaged: '2,00,000+', visits: '3,00,000+', url: 'https://tracker360.pw.live', status: 'Live' },
  { name: 'JEE Mains Score Calculator', engaged: '40,000+', visits: '1,50,000+', url: 'https://jee-score-calculator.pw.live/', status: 'Live' },
  { name: 'JEE Advance Score Calculator', engaged: '16,000+', visits: '40,000+', url: 'https://jee-score-calculator.pw.live/advance', status: 'Live' },
  { name: 'Faculty Battle', engaged: '15,500+', visits: '60,000+', url: 'https://faculty-battle.pw.live', status: 'Live' },
  { name: 'Class 10 Stream Predictor', engaged: '13,500+', visits: '45,000+', url: 'https://stream-predictor.pw.live/', status: 'Live' },
  { name: 'Bulk Certificate Generator', engaged: '10,000+ certs', visits: '—', url: 'https://bulk-certificate-generator-pw.vercel.app/', status: 'Internal' },
];

const techStack = ['Next.js', 'TypeScript', 'Node.js', 'Express.js', 'Python', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'React'];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: i * 0.06 },
  }),
};

const ExperiencePW = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <div className="min-h-screen bg-background custom-scrollbar">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground-secondary hover:text-electric transition-colors"
          >
            <ArrowLeft size={16} />
            Back to portfolio
          </Link>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 hover:shadow-glow"
            onClick={() => window.open('https://www.pw.live/', '_blank')}
          >
            <ExternalLink size={14} />
            Visit PW
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-5xl">
        {/* Hero */}
        <motion.div variants={fadeUp} initial="hidden" animate="show">
          <div className="terminal max-w-md mb-8">
            <div className="terminal-prompt text-sm py-5 px-4">
              cat experience/physics-wallah.md
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant="outline" className="text-neon border-neon/30 animate-pulse">
              Current Role
            </Badge>
            <Badge variant="secondary" className="text-xs">Software Development Engineer</Badge>
          </div>

          <h1 className="text-5xl md:text-6xl font-serif mb-4">
            Physics <span className="gradient-text">Wallah</span>
          </h1>
          <p className="text-xl text-foreground-secondary mb-6 max-w-3xl">
            Building and scaling student-facing platforms at India's largest EdTech unicorn — from
            Career Wallah and Tracker 360 (350K+ combined active users) to the Khazana migration and
            automation pipelines ingesting lakhs of hours of content.
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-foreground-secondary">
            <span className="flex items-center gap-2"><Calendar size={14} /> May 2025 – Present</span>
            <span className="flex items-center gap-2"><MapPin size={14} /> Noida, India</span>
          </div>

          <div className="mt-4 inline-flex items-center gap-2 text-xs font-mono text-foreground-secondary bg-background-secondary/60 border border-border rounded-md px-3 py-1.5">
            <TrendingUp size={12} className="text-neon" />
            Backend Trainee (May–Nov 2025) → SDE (Nov 2025–Present)
          </div>
        </motion.div>

        {/* Headline metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
          {headlineMetrics.map((m, i) => (
            <motion.div
              key={m.label}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Card className="os-window p-5 h-full">
                <div className="text-3xl font-serif gradient-text mb-1">{m.value}</div>
                <div className="text-sm font-medium text-foreground">{m.label}</div>
                <div className="text-xs text-foreground-secondary mt-0.5">{m.sub}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Accomplishments */}
        <div className="mt-20">
          <h2 className="text-3xl font-serif mb-8 flex items-center gap-3">
            <TrendingUp className="text-electric" size={26} />
            What I built & owned
          </h2>
          <div className="space-y-5">
            {accomplishments.map((a, i) => {
              const Icon = a.icon;
              return (
                <motion.div
                  key={a.title}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <Card className="os-window interactive-hover p-6">
                    <div className="flex items-start gap-4">
                      <div className={`shrink-0 p-3 rounded-lg ${toneClasses[a.color].iconWrap}`}>
                        <Icon size={22} />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{a.title}</h3>
                          <Badge className={toneClasses[a.color].badge}>
                            {a.metric}
                          </Badge>
                        </div>
                        <p className="text-sm text-foreground-secondary leading-relaxed">{a.detail}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Live products */}
        <div className="mt-20">
          <h2 className="text-3xl font-serif mb-3 flex items-center gap-3">
            <Users className="text-neon" size={26} />
            Live products & proof
          </h2>
          <p className="text-foreground-secondary mb-8">
            Products I shipped that are live today, with real usage numbers.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {products.map((p, i) => (
              <motion.a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="group"
              >
                <Card className="os-window interactive-hover p-5 h-full">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <h3 className="font-semibold text-foreground group-hover:text-electric transition-colors">
                      {p.name}
                    </h3>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge
                        variant="outline"
                        className={p.status === 'Live' ? 'text-neon border-neon/30' : 'text-electric border-electric/30'}
                      >
                        {p.status}
                      </Badge>
                      <ExternalLink size={16} className="text-foreground-secondary group-hover:text-electric transition-colors" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg border border-border bg-background-secondary/60 p-3">
                      <div className="text-xl font-serif gradient-text">{p.engaged}</div>
                      <div className="text-xs text-foreground-secondary mt-0.5">Users Engaged</div>
                    </div>
                    <div className="rounded-lg border border-border bg-background-secondary/60 p-3">
                      <div className="text-xl font-serif gradient-text">{p.visits}</div>
                      <div className="text-xs text-foreground-secondary mt-0.5">User Visits</div>
                    </div>
                  </div>
                </Card>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div className="mt-20">
          <h2 className="text-3xl font-serif mb-6">Tech stack</h2>
          <div className="flex flex-wrap gap-2">
            {techStack.map((t) => (
              <Badge key={t} variant="secondary" className="text-sm py-1.5 px-3">{t}</Badge>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-20 mb-8">
          <div className="terminal p-6 text-center">
            <div className="text-sm mb-3">$ cd ../portfolio</div>
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2 mx-auto hover:shadow-glow">
                <ArrowLeft size={16} />
                Back to portfolio
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperiencePW;
