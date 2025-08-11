import { useState } from 'react';
import { MapPin, Calendar, ExternalLink, Briefcase, Users, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const WorkExperienceSection = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const experience = [
    {
        id: 'physicsWallah',
        title: 'Backend Trainee',
        company: 'Physics Wallah Limited',
        period: 'May 2025 - Present',
        location: 'Noida, India',
        status: 'current',
        type: 'Internship',
        description: 'Contributed to India\'s fastest-growing EdTech unicorn. Automating the "Khazana" feature to reduce the manual workload and reducing the development time by 50%',
        responsibilities: [
          'Automated the "Khazana" feature to reduce the manual workload and reducing the development time by 50%',
          'Making the Khazana Portal from scratch in Next.js to reduce the development time by 80%',
          'Automating the Result Extraction of multiple categories for advertisement of results',
          'Fixing the bugs in the existing Khazana codebase',
          'Contacting the other categories of the company to get the data for the Khazana Portal'
        ],
        technologies: ['Node.js', 'Express.js', 'Next.js', 'Python'],
        impact: 'Helped serve 2M+ students with the Khazana feature',
        website: 'https://www.pw.live/'
    },
    {
      id: 'appzlogic',
      title: 'Full Stack SDE Intern',
      company: 'Appzlogic Mobility Solutions',
      period: 'June 2024 - November 2024',
      location: 'Noida, India',
      status: 'completed',
      type: 'Internship',
      description: 'Built scalable systems for enterprise clients. Got to work on Images Bazaar by Sandeep Maheshwari and added 3+ new pages to the company\'s website as well.',
      responsibilities: [
        'Built scalable systems for enterprise clients',
        'Added 3+ new pages to the company\'s website',
        'Worked on 10+ new pages for Images Bazaar by Sandeep Maheshwari',
        'Collaborated with cross-functional teams on product strategy'
      ],
      technologies: ['JavaScript', 'React.js', 'Redux', 'MUI', 'Next.js', 'Node.js', 'Express.js', 'PostgreSQL' ],
      impact: 'Increase in user retention by 40% on the company\'s website',
      website: 'https://appzlogic.com'
    }
  ];

  // Function to calculate total experience in years and months
  const calculateTotalExperience = () => {
    let totalMonths = 0;
    
    experience.forEach(role => {
      const period = role.period;
      const [startStr, endStr] = period.split(' - ');
      
      // Parse start date
      const startDate = new Date(startStr);
      
      // Parse end date (handle "Present" case)
      let endDate: Date;
      if (endStr === 'Present') {
        endDate = new Date();
      } else {
        endDate = new Date(endStr);
      }
      
      // Calculate difference in months
      const monthsDiff = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                        (endDate.getMonth() - startDate.getMonth());
      
      totalMonths += monthsDiff;
    });
    
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    
    if (years > 0 && months > 0) {
      return `${years}+ years, ${months}+ months`;
    } else if (years > 0) {
      return `${years}+ years`;
    } else {
      return `${months}+ months`;
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'current' ? 'neon' : 'electric';
  };

  return (
    <section className="min-h-screen py-20 bg-surface/30 scroll-snap-section">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="terminal max-w-md mx-auto mb-8">
            <div className="terminal-prompt text-sm py-5">
              // professional timeline
            </div>
          </div>
          
          <h2 className="text-5xl font-serif mb-6">
            Work <span className="gradient-text">Experience</span>
          </h2>
          
          <p className="text-lg text-foreground-secondary">
            Professional roles where I've built scalable systems and delivered real impact.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="max-w-5xl mx-auto space-y-8">
          {experience.map((role, index) => (
            <Card
              key={role.id}
              className={`os-window interactive-hover cursor-pointer transition-all duration-300 ${
                selectedRole === role.id ? 'shadow-glow scale-105' : ''
              } animate-fade-in-up animate-delay-${(index + 1) * 200}`}
              onClick={() => setSelectedRole(selectedRole === role.id ? null : role.id)}
            >
              <div className="os-window-header">
                <div className="flex items-center gap-3">
                  <div className={`text-${getStatusColor(role.status)}`}>
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {role.title}
                    </h3>
                    <p className="text-sm text-foreground-secondary">
                      {role.company}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge 
                    variant="outline" 
                    className={`text-${getStatusColor(role.status)} border-${getStatusColor(role.status)}/30 ${
                      role.status === 'current' ? 'animate-pulse' : ''
                    }`}
                  >
                    {role.status === 'current' ? 'Current Role' : 'Completed'}
                  </Badge>
                  <div className="os-window-controls">
                    <div className="os-window-control close" />
                    <div className="os-window-control minimize" />
                    <div className="os-window-control maximize" />
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Basic Info */}
                <div className="flex flex-wrap items-center gap-6 mb-4 text-sm text-foreground-secondary">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{role.period}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    <span>{role.location}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {role.type}
                  </Badge>
                </div>

                <p className="text-foreground-secondary mb-6">
                  {role.description}
                </p>

                {/* Impact Highlight */}
                <div className="p-3 bg-electric/10 border border-electric/20 rounded-lg mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp size={16} className="text-electric" />
                    <span className="font-semibold text-foreground">Key Impact</span>
                  </div>
                  <p className="text-sm text-foreground-secondary">
                    {role.impact}
                  </p>
                </div>

                {/* Expanded Content */}
                {selectedRole === role.id && (
                  <div className="animate-fade-in-up space-y-6">
                    {/* Responsibilities */}
                    <div>
                      <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                        <Users size={16} />
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-2">
                        {role.responsibilities.map((responsibility, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-foreground-secondary">
                            <div className={`w-1.5 h-1.5 rounded-full bg-${getStatusColor(role.status)} mt-2 flex-shrink-0`} />
                            <span>{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="font-semibold mb-3 text-foreground">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {role.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Achievements
                    {role.achievements && role.achievements.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3 text-foreground">Achievements & Recognition</h4>
                        <div className="flex flex-wrap gap-2">
                          {role.achievements.map((achievement) => (
                            <Badge 
                              key={achievement} 
                              className={`bg-${getStatusColor(role.status)}/20 text-${getStatusColor(role.status)} border-${getStatusColor(role.status)}/30`}
                            >
                              {achievement}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )} */}

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 hover:shadow-glow"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(role.website, '_blank');
                        }}
                      >
                        <ExternalLink size={14} />
                        Visit Company
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Section Summary */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <div className="terminal p-6">
            <div className="text-sm mb-2">
              $ cat career_summary.txt
            </div>
            <div>
              {experience.length} professional roles • {calculateTotalExperience()} experience • Millions of users impacted
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkExperienceSection;