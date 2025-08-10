import { useState } from 'react';
import { ExternalLink, Github, Play, Database, Shield, Users,Code, Folder, User } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const ProjectsSection = () => {
  const [runningProcesses, setRunningProcesses] = useState<string[]>([]);

  const projects = [
    {
      id: 'labeasy',
      name: 'Labeasy',
      command: 'run-labeasy',
      status: 'production',
      description: 'A unified diagnostics platform that helps users find and book affordable lab tests from trusted local labs.',
      impact: ['100+ Tests Database', 'Built MVP in 3 Days', 'Finalist @ HackCBS - a MLH Hackathon'],
      tech: ['React','Recoil','Tailwind CSS','Express.js', 'Prisma', 'PostgreSQL' ],
      type: 'icon1',
      metrics: {
        tests: '100+',
        "data encryption": '100%',
        uptime: '99%'
      },
      links: {
        live: 'https://labeasy.aadish.tech/',
        github: 'https://github.com/aadishj23/Labeasy'
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
        live: 'https://namdapha-axuo.vercel.app/',
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
        live: 'https://quizzical.aadish.tech/',
        github: 'https://github.com/aadishj23/Quiz-App'
      }
    },
    {
      id: 'Anveshan',
      name: 'Anveshan',
      command: 'run-Anveshan',
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
      command: 'run-TaskMate',
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
        live: 'https://taskmate.aadish.tech/',
        github: 'https://github.com/aadishj23/TaskMate'
      }
    },
    {
      id: 'Venturevine',
      name: 'Venturevine',
      command: 'run-Venturevine',
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
        live: 'https://venturevine.aadish.tech/',
        github: 'https://github.com/aadishj23/Venturevine'
      }
    },
    {
      id: 'hackblitz',
      name: 'HackBlitz Hackathon Website',
      command: 'run-HackBlitz',
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
        live: 'https://hackblitz.aadish.tech/',
        github: 'https://github.com/aadishj23/HackBlitz'
      }
    },
    {
      id: 'TempTrack',
      name: 'TempTrack',
      command: 'run-TempTrack',
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
        live: 'https://weather.aadish.tech/',
        github: 'https://github.com/aadishj23/weather'
      }
    },
    {
      id: 'youtube',
      name: 'Youtube Comment Scraper',
      command: 'run-ytCmntScraper',
      status: 'production',
      description: 'An YouTube comment extraction tool that filters and sorts comments by relevance, date, and quantity for comprehensive data analysis.',
      impact: ['Comment Data Extraction', 'Bulk Comment Processing'],
      tech: ['React', 'Tailwind CSS'],
      type: 'icon2',
      links: {
        live: 'https://youtube-comment-scrapper.aadish.tech/',
        github: 'https://github.com/aadishj23/Youtube-Comment-Scrapper'
      }
    },
    {
      id: 'Tenzies',
      name: 'Tenzies',
      command: 'run-Tenzies',
      status: 'production',
      description: 'A fun dice game where players roll dice to achieve matching numbers, built with modern web technologies.',
      impact: ['Interactive Dice Game', 'Score Tracking System', 'Responsive Game Interface'],
      tech: ['React', 'Tailwind CSS'],
      type: 'icon3',
      links: {
        live: 'https://tenzies.aadish.tech/',
        github: 'https://github.com/aadishj23/Tenzies-Game'
      }
    }
  ];

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
    const colors = ['neon', 'electric', 'hot', 'amber'];
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
    <section className="min-h-screen py-20 bg-background-secondary scroll-snap-section">
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
          {projects.map((project, index) => (
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
                <div className="flex gap-3">
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