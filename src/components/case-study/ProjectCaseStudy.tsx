'use client';

import { useEffect, type ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Calendar, Layers, AlertTriangle, Cpu, PlayCircle, Images, type LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export type Metric = { value: string; label: string; sub?: string };
export type Feature = { icon: LucideIcon; color: 'hot' | 'electric' | 'neon'; title: string; detail: string; metric: string };
export type ArchLayer = { name: string; items: string[]; note?: string };
export type HardProblem = { title: string; problem: string; solution: string; file?: string };

export type CaseStudyData = {
  slug: string;
  name: string;
  nameAccent: string;
  tagline: string;
  timeframe: string;
  badges: string[];
  links: { live?: string; github?: string; demoVideo?: string };
  screenshots?: { src: string; caption: string }[];
  metrics: Metric[];
  features: Feature[];
  architecture: { summary: string; layers: ArchLayer[]; flow: string[] };
  hardProblems: HardProblem[];
  techStack: string[];
  lessons?: string[];
};

// Full literal class strings so Tailwind's JIT keeps them (dynamic `bg-${x}` gets purged).
const toneClasses: Record<string, { iconWrap: string; badge: string }> = {
  hot: { iconWrap: 'bg-hot/10 text-hot', badge: 'bg-hot/15 text-hot border-hot/30' },
  electric: { iconWrap: 'bg-electric/10 text-electric', badge: 'bg-electric/15 text-electric border-electric/30' },
  neon: { iconWrap: 'bg-neon/10 text-neon', badge: 'bg-neon/15 text-neon border-neon/30' },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: i * 0.06 },
  }),
};

const SectionTitle = ({ icon, children }: { icon: ReactNode; children: ReactNode }) => (
  <h2 className="text-3xl font-serif mb-8 flex items-center gap-3">
    {icon}
    {children}
  </h2>
);

const ProjectCaseStudy = ({ data }: { data: CaseStudyData }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const { links } = data;

  return (
    <div className="min-h-screen bg-background custom-scrollbar">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground-secondary hover:text-electric transition-colors"
          >
            <ArrowLeft size={16} />
            Back to projects
          </Link>
          <div className="flex items-center gap-2">
            {links.github && (
              <Button variant="outline" size="sm" className="flex items-center gap-2 hover:shadow-glow" asChild>
                <a href={links.github} target="_blank" rel="noopener noreferrer">
                  <Github size={14} />
                  Source
                </a>
              </Button>
            )}
            {links.live && (
              <Button variant="outline" size="sm" className="flex items-center gap-2 hover:shadow-glow" asChild>
                <a href={links.live} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={14} />
                  Live app
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-5xl">
        {/* Hero */}
        <motion.div variants={fadeUp} initial="hidden" animate="show">
          <div className="terminal max-w-md mb-8">
            <div className="terminal-prompt text-sm py-5 px-4">cat projects/{data.slug}.md</div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            {data.badges.map((b, i) => (
              <Badge key={b} variant={i === 0 ? 'outline' : 'secondary'} className={i === 0 ? 'text-neon border-neon/30' : 'text-xs'}>
                {b}
              </Badge>
            ))}
          </div>

          <h1 className="text-5xl md:text-6xl font-serif mb-4">
            {data.name} <span className="gradient-text">{data.nameAccent}</span>
          </h1>
          <p className="text-xl text-foreground-secondary mb-6 max-w-3xl">{data.tagline}</p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-foreground-secondary">
            <span className="flex items-center gap-2"><Calendar size={14} /> {data.timeframe}</span>
            <span className="flex items-center gap-2"><Cpu size={14} /> Solo build — design, backend, frontend, deploy</span>
          </div>
        </motion.div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
          {data.metrics.map((m, i) => (
            <motion.div key={m.label + m.value} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
              <Card className="os-window p-5 h-full">
                <div className="text-3xl font-serif gradient-text mb-1">{m.value}</div>
                <div className="text-sm font-medium text-foreground">{m.label}</div>
                {m.sub && <div className="text-xs text-foreground-secondary mt-0.5">{m.sub}</div>}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Demo */}
        {links.demoVideo && (
          <div className="mt-20">
            <SectionTitle icon={<PlayCircle className="text-hot" size={26} />}>Demo</SectionTitle>
            <Card className="os-window overflow-hidden">
              <div className="aspect-video w-full bg-black">
                <iframe
                  src={links.demoVideo}
                  title={`${data.name} demo`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </Card>
          </div>
        )}

        {/* Screenshots */}
        {data.screenshots && data.screenshots.length > 0 && (
          <div className="mt-20">
            <SectionTitle icon={<Images className="text-hot" size={26} />}>Screens</SectionTitle>
            <div className="grid sm:grid-cols-2 gap-4">
              {data.screenshots.map((shot, i) => (
                <motion.div key={shot.src} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
                  <Card className="os-window overflow-hidden">
                    <div className="os-window-header bg-background">
                      <span className="font-mono text-xs text-foreground-secondary">{shot.caption}</span>
                      <div className="os-window-controls">
                        <div className="os-window-control close" />
                        <div className="os-window-control minimize" />
                        <div className="os-window-control maximize" />
                      </div>
                    </div>
                    <a href={shot.src} target="_blank" rel="noopener noreferrer" className="block relative aspect-video bg-background-secondary">
                      <Image src={shot.src} alt={shot.caption} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover object-top" />
                    </a>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Features */}
        <div className="mt-20">
          <SectionTitle icon={<Layers className="text-electric" size={26} />}>What I built</SectionTitle>
          <div className="space-y-5">
            {data.features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={f.title} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
                  <Card className="os-window interactive-hover p-6">
                    <div className="flex items-start gap-4">
                      <div className={`shrink-0 p-3 rounded-lg ${toneClasses[f.color].iconWrap}`}>
                        <Icon size={22} />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{f.title}</h3>
                          <Badge className={toneClasses[f.color].badge}>{f.metric}</Badge>
                        </div>
                        <p className="text-sm text-foreground-secondary leading-relaxed">{f.detail}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Architecture */}
        <div className="mt-20">
          <SectionTitle icon={<Cpu className="text-neon" size={26} />}>How it&apos;s built</SectionTitle>
          <p className="text-foreground-secondary mb-8 max-w-3xl">{data.architecture.summary}</p>

          <div className="grid md:grid-cols-2 gap-4">
            {data.architecture.layers.map((layer, i) => (
              <motion.div key={layer.name} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
                <Card className="os-window p-5 h-full">
                  <div className="font-mono text-xs uppercase tracking-wider text-electric mb-3">{layer.name}</div>
                  <ul className="space-y-1.5">
                    {layer.items.map((it) => (
                      <li key={it} className="text-sm text-foreground-secondary flex gap-2">
                        <span className="text-neon shrink-0">›</span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                  {layer.note && <p className="text-xs text-foreground-secondary/80 mt-3 italic">{layer.note}</p>}
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Request flow */}
          <div className="terminal p-5 mt-6 overflow-x-auto">
            <div className="terminal-prompt text-xs mb-3">cat docs/request-flow.txt</div>
            <ol className="space-y-1 font-mono text-xs md:text-sm text-terminal-foreground">
              {data.architecture.flow.map((step, i) => (
                <li key={step} className="flex gap-3">
                  <span className="text-terminal-accent w-6 shrink-0 text-right">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Hard problems */}
        <div className="mt-20">
          <SectionTitle icon={<AlertTriangle className="text-hot" size={26} />}>Hardest problems</SectionTitle>
          <div className="space-y-5">
            {data.hardProblems.map((hp, i) => (
              <motion.div key={hp.title} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
                <Card className="os-window p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">{hp.title}</h3>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <div className="font-mono text-xs uppercase tracking-wider text-hot mb-2">Problem</div>
                      <p className="text-sm text-foreground-secondary leading-relaxed">{hp.problem}</p>
                    </div>
                    <div>
                      <div className="font-mono text-xs uppercase tracking-wider text-neon mb-2">How I solved it</div>
                      <p className="text-sm text-foreground-secondary leading-relaxed">{hp.solution}</p>
                    </div>
                  </div>
                  {hp.file && (
                    <div className="mt-4 inline-flex items-center gap-2 text-xs font-mono text-foreground-secondary bg-background-secondary/60 border border-border rounded-md px-3 py-1.5">
                      {hp.file}
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Lessons */}
        {data.lessons && data.lessons.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-serif mb-6">What I&apos;d do differently</h2>
            <Card className="os-window p-6">
              <ul className="space-y-3">
                {data.lessons.map((l) => (
                  <li key={l} className="text-sm text-foreground-secondary flex gap-3">
                    <span className="text-electric shrink-0 font-mono">$</span>
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        )}

        {/* Tech stack */}
        <div className="mt-20">
          <h2 className="text-3xl font-serif mb-6">Tech stack</h2>
          <div className="flex flex-wrap gap-2">
            {data.techStack.map((t) => (
              <Badge key={t} variant="secondary" className="text-sm py-1.5 px-3">{t}</Badge>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-20 mb-8">
          <div className="terminal p-6 text-center">
            <div className="text-sm mb-3">$ cd ../portfolio</div>
            <Link href="/#projects">
              <Button variant="outline" className="flex items-center gap-2 mx-auto hover:shadow-glow">
                <ArrowLeft size={16} />
                Back to projects
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCaseStudy;
