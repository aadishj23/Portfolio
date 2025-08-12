import { useState } from 'react';
import { Search, Command, Star, TrendingUp, Database, Server, Code, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const SkillsSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const skillCategories = [
    {
        id: 'languages',
        name: 'Languages',
        icon: <Code size={20} />,
        color: 'electric',
        description: 'Core programming languages'
    },
    {
      id: 'frameworks',
      name: 'Frameworks',
      icon: <Server size={20} />,
      color: 'neon',
      description: 'Building web applications'
    },
    {
      id: 'database',
      name: 'Database Systems',
      icon: <Database size={20} />,
      color: 'hot',
      description: 'Data modeling and optimization'
    },
    {
      id: 'devops',
      name: 'DevOps & Cloud',
      icon: <Zap size={20} />,
      color: 'electric',
      description: 'Infrastructure and deployment'
    }
  ];

  const skills = [
    // Programming Languages
    {
      name: 'C++',
      category: 'languages',
      proficiency: 4,
      experience: '2+ years',
      description: 'High-performance systems programming language',
      usedIn: ['Data Structures and Algorithms', 'System programming', 'Performance optimization']
  },
  {
      name: 'HTML',
      category: 'languages',
      proficiency: 5,
      experience: '2+ years',
      projects: ['All Recent Projects'],
      description: 'Markup language for structuring web content',
      usedIn: ['Web development', 'Content structure', 'Accessibility implementation']
  },
  {
      name: 'CSS',
      category: 'languages',
      proficiency: 5,
      experience: '2+ years',
      projects: ['All Recent Projects'],
      description: 'Styling language for web presentation',
      usedIn: ['UI/UX design', 'Responsive layouts', 'Animation and transitions']
  },
  {
      name: 'JavaScript',
      category: 'languages',
      proficiency: 4,
      experience: '2+ years',
      projects: ['All Recent Projects'],
      description: 'Dynamic programming language for web development',
      usedIn: ['Frontend applications', 'Backend APIs', 'Interactive web features']
  },
  {
    name: 'TypeScript',
    category: 'languages',
    proficiency: 4,
    experience: '1+ years',
    projects: ['Namdpaha', 'Quizzical'],
    description: 'Typed superset of JavaScript for safer development',
    usedIn: ['Large codebases', 'API development', 'Frontend applications']
  },
  {
      name: 'SQL',
      category: 'languages',
      proficiency: 4,
      experience: '2+ years',
      projects: ['Labeasy', 'Quizzical'],
      description: 'Structured query language for database operations',
      usedIn: ['Database operations', 'Data analysis', 'Report generation']
  },
  {
      name: 'NoSQL',
      category: 'languages',
      proficiency: 5,
      experience: '2+ years',
      projects: ['Anveshan', 'TaskMate'],
      description: 'Non-relational database querying and operations',
      usedIn: ['Flexible data modeling', 'Scalable applications', 'Real-time data']
  },


    // Frameworks
    {
        name: 'Tailwind CSS',
        category: 'frameworks',
        proficiency: 5,
        experience: '1+ years',
        projects: ['Labeasy', 'Namdapha', 'Quizzical','Anveshan','TaskMate','VentureVine', 'HackBlitz', 'TempTrack','Tenzies','Youtube Comment Scraper'],
        description: 'Utility-first CSS framework for rapid UI development',
        usedIn: ['Responsive layouts', 'Component styling', 'Design systems']
    },
    {
        name: 'React.js',
        category: 'frameworks',
        proficiency: 5,
        experience: '2+ years',
        projects: ['Labeasy', 'Namdapha', 'Quizzical','Anveshan','TaskMate','VentureVine', 'HackBlitz', 'TempTrack','Tenzies','Youtube Comment Scraper'],
        description: 'Modern JavaScript library for building interactive user interfaces',
        usedIn: ['Single-page applications', 'Component architecture', 'State management']
    },
    {
        name: 'Node.js',
        category: 'frameworks',
        proficiency: 5,
        experience: '1+ years',
        projects: ['Labeasy', 'Quizzical','Anveshan','TaskMate'],
        description: 'JavaScript runtime for server-side development',
        usedIn: ['Backend APIs', 'Real-time applications', 'Microservices']
    },
    {
      name: 'Express.js',
      category: 'frameworks',
      proficiency: 4,
      experience: '1+ years',
      projects: ['Labeasy', 'Quizzical','Anveshan','TaskMate'],
      description: 'Minimal and flexible Node.js web application framework',
      usedIn: ['RESTful APIs', 'Middleware development', 'Authentication systems']
    },
    {
        name: 'Next.js',
        category: 'frameworks',
        proficiency: 4,
        experience: '1+ years',
        projects: ['Images Bazzar', 'Physics Wallah'],
        description: 'Full-stack React framework with server-side rendering',
        usedIn: ['SEO-optimized apps', 'Full-stack development', 'Performance optimization']
    },
    
    // Database Systems
    {
      name: 'PostgreSQL',
      category: 'database',
      proficiency: 4,
      experience: '2+ years',
      projects: ['Labeasy', 'Quizzical'],
      description: 'Advanced SQL and database optimization techniques',
      usedIn: ['Complex queries', 'Performance tuning', 'Normalization']
    },
    {
      name: 'MongoDB',
      category: 'database',
      proficiency: 5,
      experience: '2+ years',
      projects: ['Anveshan', 'TaskMate'],
      description: 'NoSQL database design and aggregation pipelines',
      usedIn: ['Document modeling', 'Aggregation queries', 'Sharding strategies']
    },
    {
        name: 'Prisma',
        category: 'database',
        proficiency: 4,
        experience: '1+ years',
        projects: ['Labeasy', 'Quizzical'],
        description: 'Modern ORM for type-safe database operations',
        usedIn: ['Database migrations', 'Query optimization', 'Schema management']
    },
    
    // DevOps & Cloud
    {
      name: 'Docker',
      category: 'devops',
      proficiency: 4,
      experience: '1+ years',
      description: 'Containerization platform for consistent deployments',
      usedIn: ['Microservices deployment', 'Development environments', 'CI/CD pipelines']
    },
    {
      name: 'AWS',
      category: 'devops',
      proficiency: 4,
      experience: '1+ years',
      description: 'Cloud computing platform for scalable infrastructure',
      usedIn: ['EC2 deployment', 'CloudFront CDN', 'S3 storage']
    },
    {
        name: 'Cloudflare',
        category: 'devops',
        proficiency: 3,
        experience: '1+ years',
        description: 'Serverless Cloud infrastructure',
        usedIn: ['Cloudflare Pages', 'Cloudflare Workers']
    }
  ];

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         skill.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || skill.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderStars = (proficiency: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={12}
        className={i < proficiency ? 'text-neon fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  return (
    <section id="skills" className="min-h-screen py-20 bg-background-secondary scroll-snap-section">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-5xl font-serif mb-6">
            Command <span className="gradient-text">Palette</span>
          </h2>
          
          <p className="text-lg text-foreground-secondary mb-8">
            An interactive showcase of skills, proficiency levels, and real-world applications.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Search size={16} className="text-muted-foreground" />
            </div>
            <Input
              type="text"
              placeholder="Search skills... (Ctrl+K)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 font-mono bg-background/50 border-electric/30 focus:border-electric"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <kbd className="px-2 py-1 text-xs text-muted-foreground">
                <Command size={10} />
              </kbd>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid md:grid-cols-4 gap-4">
            {skillCategories.map((category, index) => (
              <Card
                key={category.id}
                className={`interactive-hover cursor-pointer transition-all duration-300 animate-scale-in animate-delay-${(index + 1) * 100} ${
                  selectedCategory === category.id ? 'shadow-glow border-electric' : ''
                }`}
                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
              >
                <div className="p-4 text-center">
                  <div className={`text-${category.color} mb-3 flex justify-center`}>
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-sm mb-2">{category.name}</h3>
                  <p className="text-xs text-muted-foreground">{category.description}</p>
                </div>
              </Card>
            ))}
          </div>
          
          {/* Show All Button */}
          {selectedCategory && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setSelectedCategory(null)}
                className="px-6 py-2 bg-electric/10 hover:bg-electric/20 text-electric border border-electric/30 rounded-lg transition-all duration-300 hover:scale-105 font-mono text-sm"
              >
                Show All Skills
              </button>
            </div>
          )}
        </div>

        {/* Skills Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill, index) => (
              <Card
                key={skill.name}
                className={`os-window interactive-hover cursor-pointer transition-all duration-300 animate-fade-in-up animate-delay-${(index + 1) * 50} ${
                  selectedSkill === skill.name ? 'shadow-glow scale-105' : ''
                }`}
                onClick={() => setSelectedSkill(selectedSkill === skill.name ? null : skill.name)}
              >
                <div className="os-window-header">
                  <div className="flex items-center gap-3">
                    <div className="text-electric">
                      <Code size={16} />
                    </div>
                    <span className="font-mono text-sm">{skill.name}</span>
                  </div>
                  <div className="os-window-controls">
                    <div className="os-window-control close" />
                    <div className="os-window-control minimize" />
                    <div className="os-window-control maximize" />
                  </div>
                </div>

                <div className="p-6">
                  {/* Proficiency */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {renderStars(skill.proficiency)}
                    </div>
                    <Badge variant="outline" className="text-xs text-electric border-electric/30">
                      {skill.experience}
                    </Badge>
                  </div>

                  <p className="text-sm text-foreground-secondary mb-4">
                    {skill.description}
                  </p>

                  {/* Projects Used In */}
                  {skill.projects && skill.projects.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {skill.projects.slice(0, 2).map((project) => (
                        <Badge key={project} variant="secondary" className="text-xs">
                          {project}
                        </Badge>
                      ))}
                      {skill.projects.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{skill.projects.length - 2} more
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Expanded Content */}
                  {selectedSkill === skill.name && (
                    <div className="animate-fade-in-up space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-2 text-foreground">Used For:</h4>
                        <ul className="space-y-1">
                          {skill.usedIn.map((use, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-foreground-secondary">
                              <div className="w-1 h-1 rounded-full bg-electric mt-1.5 flex-shrink-0" />
                              <span>{use}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {skill.projects && skill.projects.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-sm mb-2 text-foreground">All Projects:</h4>
                          <div className="flex flex-wrap gap-1">
                            {skill.projects.map((project) => (
                              <Badge key={project} variant="outline" className="text-xs">
                                {project}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Command Prompt */}
        <div className="text-center mt-16">
          <div className="terminal max-w-2xl mx-auto p-6">
            <div className="terminal-prompt mb-2">
              skill --list --filter="{selectedCategory || 'all'}" --search="{searchTerm || 'none'}"
            </div>
            <div className="text-terminal-accent text-sm">
              Found {filteredSkills.length} skills matching your criteria
            </div>
            {selectedCategory && (
              <div className="text-terminal-foreground text-sm mt-2">
                Category: {skillCategories.find(cat => cat.id === selectedCategory)?.name}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;