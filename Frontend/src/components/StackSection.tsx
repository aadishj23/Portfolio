import { useState } from 'react';
import { Layers, Database, Server, Cloud, Code } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const StackSection = () => {
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);

  const architectureLayers = [
    {
      id: 'frontend',
      name: 'Presentation Layer',
      icon: <Code size={24} />,
      color: 'hot',
      position: 'top-0',
      description: 'User interfaces and client-side logic',
      technologies: [
        { name: 'JavaScript', role: 'Language', why: 'Interactive client-side behavior' },
        { name: 'React.js', role: 'UI Library', why: 'Component-driven UIs with excellent ecosystem' },
        { name: 'Tailwind CSS', role: 'Styling', why: 'Utility-first styling and rapid iteration' },
        { name: 'TypeScript', role: 'Type Safety', why: 'Fewer runtime errors, better DX' },
        { name: 'Next.js', role: 'Framework', why: 'SSR/SSG, routing, and API routes' }
      ],
      connections: ['backend']
    },
    {
      id: 'backend',
      name: 'Backend Layer',
      icon: <Server size={24} />,
      color: 'electric',
      position: 'top-20',
      description: 'API management, business logic, and server-side processing',
      technologies: [
        { name: 'Node.js', role: 'Runtime', why: 'Non-blocking I/O for scalable servers' },
        { name: 'Express.js', role: 'Web Framework', why: 'Minimal, robust HTTP server for APIs' },
        { name: 'Prisma', role: 'ORM', why: 'Type-safe database access and migrations' }
      ],
      connections: ['database']
    },
    {
      id: 'database',
      name: 'Data Layer',
      icon: <Database size={24} />,
      color: 'neon',
      position: 'top-60',
      description: 'Data persistence and management',
      technologies: [
        { name: 'PostgreSQL', role: 'Relational DB', why: 'ACID compliance and rich SQL features' },
        { name: 'MongoDB', role: 'Document DB', why: 'Flexible schema for JSON-like data' }
      ],
      connections: ['cloud']
    },
    {
      id: 'cloud',
      name: 'Infrastructure',
      icon: <Cloud size={24} />,
      color: 'hot',
      position: 'top-80',
      description: 'Cloud services and deployment',
      technologies: [
        { name: 'AWS', role: 'Cloud Platform', why: 'Managed services and global infrastructure' },
        { name: 'Docker', role: 'Containerization', why: 'Consistent environments and packaging' },
        { name: 'Cloudflare', role: 'Edge/CDN', why: 'Global caching, security, and delivery' }
      ],
      connections: []
    }
  ];


  return (
    <section id="stack" className="min-h-screen py-20 bg-background scroll-snap-section">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-5xl font-serif mb-6">
            My Stack, <span className="gradient-text">My Way</span>
          </h2>
          
          <p className="text-lg text-foreground-secondary">
            A modular architecture built for scale, performance, and maintainability. 
            Click on each layer to explore the technologies and reasoning behind the choices.
          </p>
        </div>

        {/* Architecture Visualization */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-12 h-full">
                {Array.from({ length: 12 }, (_, i) => (
                  <div key={i} className="border-r border-electric/20" />
                ))}
              </div>
              <div className="absolute inset-0">
                {Array.from({ length: 8 }, (_, i) => (
                  <div key={i} className="border-b border-electric/20 h-32" />
                ))}
              </div>
            </div>

            {/* Architecture Layers */}
            <div className="relative space-y-8">
              {architectureLayers.map((layer, index) => (
                <div
                  key={layer.id}
                  className={`animate-fade-in-up animate-delay-${(index + 1) * 100}`}
                >
                  <Card
                    className={`os-window interactive-hover cursor-pointer transition-all duration-300 ${
                      selectedLayer === layer.id ? 'shadow-glow scale-105 border-electric' : ''
                    }`}
                    onClick={() => setSelectedLayer(selectedLayer === layer.id ? null : layer.id)}
                  >
                    <div className="os-window-header">
                      <div className="flex items-center gap-3">
                        <div className={`text-${layer.color}`}>
                          {layer.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {layer.name}
                          </h3>
                          <p className="text-sm text-foreground-secondary">
                            {layer.description}
                          </p>
                        </div>
                      </div>
                      <div className="os-window-controls">
                        <div className="os-window-control close" />
                        <div className="os-window-control minimize" />
                        <div className="os-window-control maximize" />
                      </div>
                    </div>

                    <div className="p-6">
                      {/* Technology Grid */}
                      <div className="grid md:grid-cols-2 gap-4">
                        {layer.technologies.map((tech, techIndex) => (
                          <div
                            key={tech.name}
                            className={`p-4 rounded-lg bg-background-secondary/50 border border-${layer.color}/20 animate-scale-in animate-delay-${techIndex * 50}`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-mono text-sm font-semibold">
                                {tech.name}
                              </span>
                              <Badge variant="outline" className={`text-${layer.color} border-${layer.color}/30 text-xs`}>
                                {tech.role}
                              </Badge>
                            </div>
                            
                            {selectedLayer === layer.id && (
                              <p className="text-xs text-foreground-secondary animate-fade-in-up">
                                {tech.why}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Connections */}
                      {selectedLayer === layer.id && layer.connections.length > 0 && (
                        <div className="mt-6 animate-fade-in-up">
                          <h4 className="font-semibold text-sm mb-3 text-foreground">
                            Connects to:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {layer.connections.map((connectionId) => {
                              const connectedLayer = architectureLayers.find(l => l.id === connectionId);
                              return connectedLayer ? (
                                <Badge 
                                  key={connectionId}
                                  variant="outline"
                                  className={`text-${connectedLayer.color} border-${connectedLayer.color}/30`}
                                >
                                  {connectedLayer.name}
                                </Badge>
                              ) : null;
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Architecture Principles */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="terminal p-8">
            <div className="terminal-prompt mb-4">
              cat /etc/aadish/architecture-principles.txt
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="terminal-success text-terminal-foreground">
                Scalability: Design for growth from day one
              </div>
              <div className="terminal-success text-terminal-foreground">
                Modularity: Independent, replaceable components
              </div>
              <div className="terminal-success text-terminal-foreground">
                Performance: Cache aggressively, optimize queries
              </div>
              <div className="terminal-success text-terminal-foreground">
                Security: Defense in depth, zero trust model
              </div>
              <div className="terminal-success text-terminal-foreground">
                Observability: Monitor everything, debug efficiently
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StackSection;