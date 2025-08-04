import { useState } from 'react';
import { ExternalLink, Github, Play, Database, Shield, Users } from 'lucide-react';
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
      status: 'active',
      description: 'A unified diagnostics platform that helps users find and book affordable lab tests from trusted local labs.',
      impact: ['100+ Tests Database', 'Built MVP in 3 Days', 'Finalist @ HackCBS'],
      tech: ['React','Recoil','Tailwind CSS','Express.js', 'Prisma', 'PostgreSQL' ],
      type: 'web-app',
      metrics: {
        tests: '100+',
        "data encryption": '100%',
        uptime: '99.9%'
      },
      links: {
        demo: 'https://labeasy.aadish.tech/',
        github: 'https://github.com/aadishj23/Labeasy'
      }
    },
    {
      id: 'namdapha',
      name: 'Namdapha Tiger Reserve Website',
      command: 'run-namdapha',
      status: 'production',
      description: 'A modern and accessible website for Namdapha Tiger Reserve, showcasing its biodiversity, tourism info, and conservation efforts.',
      impact: ['Integerated with Spring Boot Backend', 'Pixel Perfect Responsive UI ', 'Protected Admin Routes'],
      tech: ['React.js', 'Recoil', 'TypeScript', 'Tailwind CSS', 'Aceternity UI'],
      type: 'backend',
      metrics: {
        pages: '15+',
        visitors: '1K+',
        uptime: '99.9%'
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
      status: 'experimental',
      description: 'A quiz platform offering thousands of technical questions categorized by topic and difficulty level.',
      impact: ['Integerated Quiz API for Questions Database', 'Feedback Driven Results', 'Detailed Past Qizzes Played History'],
      tech: ['React', 'Recoil', 'TypeScript', 'Tailwind CSS', 'Express.js', 'Prisma', 'PostgreSQL'],
      type: 'ai-system',
      metrics: {
        questions: '11K+',
        categories: '7+',
        levels: '3'
      },
      links: {
        demo: 'https://quizzical.aadish.tech/',
        github: 'https://github.com/aadishj23/Quiz-App'
      }
    },
    {
      id: 'devTools',
      name: 'Anveshan',
      command: 'run-Anveshan',
      status: 'production',
      description: 'A website for Anveshan, the technical club of BPIT, showcasing its events, team, projects, and achievers.',
      impact: ['Modularity for easy Maintainance', 'Integerated both SPA and MPA Versions', 'Community contributions'],
      tech: ['React', 'Tailwind CSS', 'Aceternity UI', 'Express.js', 'Mongo DB'],
      type: 'cli-tool',
      metrics: {
        modular: '100%',
        "People Data": '50+',
        projects: '10+'
      },
      links: {
        demo: 'https://anveshan.dev/',
        github: 'https://github.com/aadishj23/Anveshan'
      }
    }
  ];

  const runProcess = (projectId: string) => {
    if (!runningProcesses.includes(projectId)) {
      setRunningProcesses([...runningProcesses, projectId]);
      setTimeout(() => {
        setRunningProcesses(prev => prev.filter(id => id !== projectId));
      }, 3000);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'neon';
      case 'production': return 'electric';
      case 'experimental': return 'hot';
      case 'open-source': return 'electric';
      default: return 'electric';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'web-app': return <Database size={16} />;
      case 'backend': return <Shield size={16} />;
      case 'ai-system': return <Play size={16} />;
      case 'cli-tool': return <Users size={16} />;
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
                  <div className={`w-2 h-2 rounded-full bg-${getStatusColor(project.status)} pulse-glow`} />
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
                  <div className={`text-${getStatusColor(project.status)}`}>
                    {getTypeIcon(project.type)}
                  </div>
                  <span className="font-mono text-sm">{project.name}</span>
                  <Badge variant="outline" className={`text-${getStatusColor(project.status)} border-${getStatusColor(project.status)}/30`}>
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
                <div className="bg-terminal-bg rounded-lg p-4 mb-6 font-mono text-sm">
                  <div className="terminal-prompt mb-2">$ {project.command}</div>
                  
                  {runningProcesses.includes(project.id) ? (
                    <div className="space-y-1 min-h-[4.4rem]">
                      <div className="text-terminal-accent">Starting process...</div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-terminal-accent rounded-full animate-pulse" />
                        <span className="text-terminal-foreground">Loading dependencies...</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {project.impact.map((impact, i) => (
                        <div key={i} className="terminal-success text-terminal-foreground">
                          {impact}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {Object.entries(project.metrics).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className={`text-2xl font-bold text-${getStatusColor(project.status)}`}>
                        {value}
                      </div>
                      <div className="text-xs text-foreground-secondary uppercase tracking-wide">
                        {key}
                      </div>
                    </div>
                  ))}
                </div>

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
                        {type === 'demo' && <Play size={14} />}
                        {type === 'live' && <ExternalLink size={14} />}
                        {type === 'npm' && <ExternalLink size={14} />}
                        {type === 'case' && <ExternalLink size={14} />}
                        {type === 'paper' && <ExternalLink size={14} />}
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