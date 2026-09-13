'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Github, Play, Database, Shield, Users, Code, Folder, User, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const ProjectsSection = () => {
  const [runningProcesses, setRunningProcesses] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);

  // Top projects shown by default; everything else collapses under "more experiments".
  const FEATURED_COUNT = 6;

  type Project = {
    id: string;
    name: string;
    command: string;
    status: string;
    description: string;
    impact: string[];
    tech: string[];
    type: string;
    metrics?: Record<string, string>;
    caseStudy?: string;
    tag?: string;
    links: { live?: string; github?: string };
  };

  const projects: Project[] = [
    {
      id: 'career-wallah',
      name: 'Career Wallah',
      command: 'run-career-wallah',
      status: 'production',
      description: 'A college-prediction and career-guidance platform for JEE and NEET aspirants at Physics Wallah — rank-based predictors across 20 counselling boards, an OMR score calculator, pw.live SSO and verified payments. Ideated, pitched and built end-to-end by me.',
      impact: ['150,000+ active users · 200,000+ sign-ins', '30,882 cutoff rows across 12 JEE + 8 NEET boards', 'OMR photo → serverless parser → instant score'],
      tech: ['Next.js 16', 'TypeScript', 'MongoDB', 'Redis', 'Docker', 'Kubernetes'],
      type: 'icon7',
      tag: 'Physics Wallah · built solo',
      metrics: {
        "active users": '150K+',
        "sign-ins": '200K+',
        boards: '20'
      },
      caseStudy: '/projects/career-wallah',
      links: {
        live: 'https://careerwallah.pw.live/'
      }
    },
    {
      id: 'tracker-360',
      name: 'Tracker 360',
      command: 'run-tracker-360',
      status: 'production',
      description: 'A personalised study planner for Physics Wallah batches — turns subject, faculty and chapter choices into a day-by-day schedule, auto-ticks watched lectures from PW video stats, and adapts with recovery windows when students fall behind. Designed and built solo.',
      impact: ['200,000+ active users · 300,000+ visits', 'Pure scheduling engine with 126 test assertions', 'Plan documents cut from 133 KB to 2 KB'],
      tech: ['Next.js 16', 'TypeScript', 'MongoDB', 'Redis', 'Docker', 'Kubernetes'],
      type: 'icon3',
      tag: 'Physics Wallah · built solo',
      metrics: {
        "active users": '200K+',
        visits: '300K+',
        "content hrs": '9K+'
      },
      caseStudy: '/projects/tracker-360',
      links: {
        live: 'https://tracker360.pw.live'
      }
    },
    {
      id: 'labeasy',
      name: 'Labeasy',
      command: 'run-labeasy',
      status: 'production',
      description: 'A full-stack multi-vendor healthcare marketplace to book from 120+ lab tests, schedule doctor consultations, and buy health insurance in one app - with Gemini-generated AI report summaries.',
      impact: ['120+ Lab Tests, Consults & Insurance', 'Gemini AI Report Summaries', 'Top 10 Finalist @ HackCBS 7 (MLH)'],
      tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Gemini AI', 'Redis', 'Docker'],
      type: 'icon1',
      metrics: {
        "lab tests": '120+',
        roles: '5',
        uptime: '99%'
      },
      caseStudy: '/projects/labeasy',
      links: {
        live: 'https://labeasy.aadishjain.dev/',
        github: 'https://github.com/aadishj23/Labeasy'
      }
    },
    {
      id: 'intervuex',
      name: 'IntervueX',
      command: 'run-intervuex',
      status: 'production',
      description: 'A collaborative technical interviewing platform unifying coding, video communication, and a shared canvas — with support for 6 programming-language compilers and full scheduling, assessment, and feedback workflows.',
      impact: ['3 Interview Workflows Unified', '6 Language Compilers', 'Scheduling, Assessments & Feedback'],
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Convex', 'Clerk', 'Stream'],
      type: 'icon2',
      metrics: {
        workflows: '3',
        compilers: '6',
        uptime: '99%'
      },
      caseStudy: '/projects/intervuex',
      links: {
        live: 'https://intervuex.aadishjain.dev/',
        github: 'https://github.com/aadishj23/IntervueX'
      }
    },
    {
      id: 'trackr',
      name: 'Trackr',
      command: 'run-trackr',
      status: 'production',
      description: 'An internal team task-management tool used at Physics Wallah — managers assign and track work across their team while reportees view, update, and manage all their assigned tasks in one place.',
      impact: ['Role-based teams: managers assign, reportees manage', 'Tasks with subtasks, comments, due dates & approvals', 'Used by internal teams at Physics Wallah'],
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Cloudinary', 'MongoDB'],
      type: 'icon4',
      metrics: {
        "task states": '4',
        roles: '2'
      },
      links: {
        live: 'https://trackr.aadishjain.dev/',
        github: 'https://github.com/aadishj23/Trackr'
      }
    },
    {
      id: 'finboard',
      name: 'FinBoard',
      command: 'run-finboard',
      status: 'production',
      description: 'A customizable, widget-driven finance dashboard to build, configure, and monitor real-time market data — with drag-and-drop widgets, watchlists, and cards, tables, and charts powered by multiple finance APIs.',
      impact: ['Drag-and-drop widget dashboard', 'Real-time data from multiple finance APIs', 'Cards, tables, charts & watchlists'],
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Recharts'],
      type: 'icon1',
      metrics: {
        "data sources": '4',
        "view types": '3'
      },
      links: {
        live: 'https://finboard.aadishjain.dev',
        github: 'https://github.com/aadishj23/FinBoard'
      }
    },
    {
      id: 'certgen',
      name: 'CertGen',
      command: 'run-certgen',
      status: 'production',
      description: 'A bulk certificate generator used at Physics Wallah — maps a custom template to CSV / Google Sheets data and renders thousands of personalized certificates, with a drag-and-drop template editor and one-click bulk export.',
      impact: ['Drag-and-drop template editor', 'Bulk generation from CSV / Google Sheets', '10,000+ certificates generated at PW'],
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Fabric.js', 'Sharp'],
      type: 'icon6',
      metrics: {
        generated: '10,000+',
        templates: 'Custom'
      },
      links: {
        live: 'https://certgen.aadishjain.dev',
        github: 'https://github.com/aadishj23/Certificate-Generator'
      }
    },
    {
      id: 'namdapha',
      name: 'Namdapha Tiger Reserve Website',
      command: 'run-namdapha',
      status: 'production',
      description: 'A modern and accessible website for Namdapha Tiger Reserve, showcasing its biodiversity, tourism info, and conservation efforts.',
      impact: ['Integrated with Spring Boot Backend', 'Pixel-Perfect Responsive UI', 'Protected Admin Routes'],
      tech: ['React.js', 'Recoil', 'TypeScript', 'Tailwind CSS', 'Aceternity UI'],
      type: 'icon2',
      metrics: {
        pages: '15+',
        visitors: '1K+',
        uptime: '99%'
      },
      links: {
        live: 'https://namdapha.aadishjain.dev',
        github: 'https://github.com/aadishj23/Namdapha'
      }
    },
    {
      id: 'Quizzical',
      name: 'Quizzical',
      command: 'run-quizzical',
      status: 'production',
      description: 'A quiz platform offering thousands of technical questions categorized by topic and difficulty level.',
      impact: ['Integrated Quiz API for Questions Database', 'Feedback-Driven Results', 'Detailed Quiz History Tracking'],
      tech: ['React', 'Recoil', 'TypeScript', 'Tailwind CSS', 'Express.js', 'Prisma', 'PostgreSQL'],
      type: 'icon3',
      metrics: {
        questions: '11K+',
        categories: '7+',
        levels: '3'
      },
      links: {
        live: 'https://quizzical.aadishjain.dev/',
        github: 'https://github.com/aadishj23/Quiz-App'
      }
    },
    {
      id: 'Anveshan',
      name: 'Anveshan',
      command: 'run-anveshan',
      status: 'production',
      description: 'A website for Anveshan, the technical club of BPIT, showcasing its events, team, projects, and achievers.',
      impact: ['Modular Architecture for Easy Maintenance', 'Integrated SPA and MPA Versions', 'Community-Driven Development'],
      tech: ['React', 'Tailwind CSS', 'Aceternity UI', 'Express.js', 'MongoDB'],
      type: 'icon4',
      metrics: {
        modular: '100%',
        "People Data": '50+',
        projects: '10+'
      },
      links: {
        live: 'https://anveshan.dev/',
        github: 'https://github.com/aadishj23/Anveshan'
      }
    },
    {
      id: 'taskmate',
      name: 'TaskMate',
      command: 'run-taskmate',
      status: 'production',
      description: 'A full-stack to-do app that lets you efficiently manage, track, and organize your tasks with a seamless user experience.',
      impact: ['Real-time Task Tracking', 'User Authentication & JWT Security', 'Responsive Cross-Platform Design'],
      tech: ['React.js', 'Tailwind CSS', 'Express.js', 'MongoDB', 'JWT'],
      type: 'icon5',
      metrics: {
        features: '6+',
        "User Tasks": '100+',
        uptime: '99.5%'
      },
      links: {
        live: 'https://taskmate.aadishjain.dev/',
        github: 'https://github.com/aadishj23/TaskMate'
      }
    },
    {
      id: 'Venturevine',
      name: 'Venturevine',
      command: 'run-venturevine',
      status: 'production',
      description: 'A comprehensive platform for entrepreneurs and startups to showcase their ventures, connect with investors, and grow their network.',
      impact: ['Startup Showcase Platform', 'Investor Connection System', 'Community Building Features'],
      tech: ['React', 'Tailwind CSS', 'Dynamic Routing'],
      type: 'icon6',
      metrics: {
        sections: '10+',
        "Dynamic Routes": '25+',
        dependencies: '10+'
      },
      links: {
        live: 'https://venturevine.aadishjain.dev/',
        github: 'https://github.com/aadishj23/Venturevine'
      }
    },
    {
      id: 'hackblitz',
      name: 'HackBlitz Hackathon Website',
      command: 'run-hackblitz',
      status: 'production',
      description: 'The official website for HackBlitz, a 24-hour hackathon featuring project showcases in front of 10+ judges.',
      impact: ['HackBlitz Event Information', 'Participant Registration Portal', 'Hackathon Information Showcase Platform'],
      tech: ['React', 'Recoil', 'Tailwind CSS'],
      type: 'icon7',
      metrics: {
        sections: '8+',
        contributors: '3'
      },
      links: {
        live: 'https://hackblitz.aadishjain.dev/',
        github: 'https://github.com/aadishj23/HackBlitz'
      }
    },
    {
      id: 'TempTrack',
      name: 'TempTrack',
      command: 'run-temptrack',
      status: 'production',
      description: 'A weather tracking application that provides real-time temperature data, forecasts, and location-based weather information.',
      impact: ['Real-time Weather Data', 'Location-Based Forecasting', 'Weather Based Background'],
      tech: ['React', 'Tailwind CSS', 'Context API'],
      type: 'icon1',
      metrics: {
        locations: '10K+',
        accuracy: '99%'
      },
      links: {
        live: 'https://weather.aadishjain.dev/',
        github: 'https://github.com/aadishj23/weather'
      }
    },
    {
      id: 'youtube',
      name: 'Youtube Comment Scraper',
      command: 'run-ytcmntscraper',
      status: 'production',
      description: 'An YouTube comment extraction tool that filters and sorts comments by relevance, date, and quantity for comprehensive data analysis.',
      impact: ['Comment Data Extraction', 'Bulk Comment Processing'],
      tech: ['React', 'Tailwind CSS'],
      type: 'icon2',
      links: {
        live: 'https://youtube-comment-scrapper.aadishjain.dev/',
        github: 'https://github.com/aadishj23/Youtube-Comment-Scrapper'
      }
    },
    {
      id: 'Tenzies',
      name: 'Tenzies',
      command: 'run-tenzies',
      status: 'production',
      description: 'A fun dice game where players roll dice to achieve matching numbers, built with modern web technologies.',
      impact: ['Interactive Dice Game', 'Score Tracking System', 'Responsive Game Interface'],
      tech: ['React', 'Tailwind CSS'],
      type: 'icon3',
      links: {
        live: 'https://tenzies.aadishjain.dev/',
        github: 'https://github.com/aadishj23/Tenzies-Game'
      }
    }
  ];

  const visibleProjects = showAll ? projects : projects.slice(0, FEATURED_COUNT);
  const hiddenCount = projects.length - FEATURED_COUNT;

  const runProcess = (projectId: string) => {
    if (!runningProcesses.includes(projectId)) {
      setRunningProcesses([...runningProcesses, projectId]);
      setTimeout(() => {
        setRunningProcesses(prev => prev.filter(id => id !== projectId));
        // Automatically open live URL after process completes
        const project = projects.find(p => p.id === projectId);
        if (project?.links?.live) {
          window.open(project.links.live, '_blank');
        }
      }, 2000);
    }
  };

  const getStatusColor = (status: string, index: number) => {
    const colors = ['neon', 'electric', 'hot'];
    return colors[index % colors.length];
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'icon1': return <Database size={16} />;
      case 'icon2': return <Shield size={16} />;
      case 'icon3': return <Play size={16} />;
      case 'icon4': return <Users size={16} />;
      case 'icon5': return <Code size={16} />;
      case 'icon6': return <Folder size={16} />;
      case 'icon7': return <User size={16} />;
      default: return <Database size={16} />;
    }
  };

  return (
    <section id="projects" className="min-h-screen py-20 bg-background-secondary scroll-snap-section">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-5xl font-serif mb-6">
            Running <span className="gradient-text">Processes</span>
          </h2>
          
          <div className="terminal max-w-2xl mx-auto p-6 mb-8">
            <div className="terminal-prompt mb-4">
              ps aux | grep aadish-projects
            </div>
            
            <div className="space-y-2 text-xs">
              {projects.map((project, index) => (
                <div key={project.id} className="flex items-center gap-4 animate-fade-in-up animate-delay-100" style={{ animationDelay: `${index * 100}ms` }}>
                  <span className="text-terminal-accent">USER</span>
                  <span className="text-terminal-foreground">PID</span>
                  <span className="text-terminal-warning">%CPU</span>
                  <span className="text-terminal-warning">%MEM</span>
                  <span className="text-terminal-foreground flex-1">{project.command}</span>
                  <div 
                    className="w-2 h-2 rounded-full pulse-glow" 
                    style={{ backgroundColor: `hsl(var(--accent-${getStatusColor(project.status, index)}))` }}
                  />
                </div>
              ))}
            </div>
          </div>
          
          <p className="text-lg text-foreground-secondary">
            Each project is a running process in the Aadish ecosystem. Click to inspect logs and metrics.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {visibleProjects.map((project, index) => (
            <Card 
              key={project.id}
              className={`os-window interactive-hover cursor-pointer animate-scale-in animate-delay-${(index + 1) * 200} overflow-hidden`}
              onClick={() => runProcess(project.id)}
            >
              <div className="os-window-header bg-background">
                <div className="flex items-center gap-3">
                  <div style={{ color: `hsl(var(--accent-${getStatusColor(project.status, index)}))` }}>
                    {getTypeIcon(project.type)}
                  </div>
                  <span className="font-mono text-sm">{project.name}</span>
                  <Badge 
                    variant="outline" 
                    style={{ 
                      color: `hsl(var(--accent-${getStatusColor(project.status, index)}))`,
                      borderColor: `hsl(var(--accent-${getStatusColor(project.status, index)}) / 0.3)`
                    }}
                  >
                    {project.status}
                  </Badge>
                  {project.tag && (
                    <Badge variant="secondary" className="hidden sm:inline-flex text-[10px] font-mono">
                      {project.tag}
                    </Badge>
                  )}
                </div>
                <div className="os-window-controls">
                  <div className="os-window-control close" />
                  <div className="os-window-control minimize" />
                  <div className="os-window-control maximize" />
                </div>
              </div>

              <div className="p-6">
                <p className="text-foreground-secondary mb-6">
                  {project.description}
                </p>

                {/* Process Logs */}
                <div className="bg-terminal-bg rounded-lg p-4 mb-6 font-mono text-sm min-h-[4.4rem]">
                  <div className="terminal-prompt mb-2 text-terminal-accent">{project.command}</div>
                  
                  {runningProcesses.includes(project.id) ? (
                    <div className="space-y-1 min-h-[4.4rem]">
                      <div className="text-terminal-accent">Starting process...</div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-terminal-accent rounded-full animate-pulse" />
                        <span className="text-terminal-foreground">Loading dependencies...</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1 min-h-[4.5rem]">
                      {project.impact.map((impact, i) => (
                        <div key={i} className="terminal-success text-terminal-foreground">
                          {impact}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Metrics */}
                {project.metrics && (
                  <div className="mb-6">
                    <div className={`grid gap-4 mb-6 ${
                      Object.keys(project.metrics).length === 1 
                        ? 'grid-cols-1 max-w-xs mx-auto' 
                        : Object.keys(project.metrics).length === 2 
                        ? 'grid-cols-2 max-w-md mx-auto' 
                        : 'grid-cols-3'
                    }`}>
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div 
                            className="text-2xl font-bold"
                            style={{ color: `hsl(var(--accent-${getStatusColor(project.status, index)}))` }}
                          >
                            {value}
                          </div>
                          <div className="text-xs text-foreground-secondary uppercase tracking-wide">
                            {key}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  {project.caseStudy && (
                    <Link href={project.caseStudy} onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 hover:shadow-glow border-electric/40 text-electric"
                      >
                        <BookOpen size={14} />
                        Case study
                      </Button>
                    </Link>
                  )}
                  {Object.entries(project.links).map(([type, url]) => (
                    <Button
                        key={type}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 hover:shadow-glow"
                        onClick={(e) => {
                            e.stopPropagation();
                            runProcess(project.id);
                            setTimeout(() => {
                            window.open(url, '_blank');
                            }, 2000);
                        }}
                        >
                        {type === 'github' && <Github size={14} />}
                        {type === 'live' && <ExternalLink size={14} />}
                        <span className="capitalize">{type}</span>
                        </Button>
                    ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Show more / less */}
        {hiddenCount > 0 && (
          <div className="text-center mt-10">
            <Button
              variant="outline"
              className="flex items-center gap-2 mx-auto hover:shadow-glow font-mono text-sm"
              onClick={() => setShowAll((v) => !v)}
            >
              {showAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              {showAll ? 'Show fewer' : `ls ./more-experiments  (${hiddenCount} more)`}
            </Button>
          </div>
        )}

        {/* Footer Message */}
        <div className="text-center mt-16">
          <div className="terminal max-w-md mx-auto p-4">
            <div className="terminal-prompt">
              echo "More projects brewing in the background..."
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;