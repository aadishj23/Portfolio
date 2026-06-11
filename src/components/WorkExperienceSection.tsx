'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Calendar, ExternalLink, Briefcase, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const WorkExperienceSection = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const experience = [
    {
        id: 'physicsWallah',
        title: 'Software Development Engineer',
        company: 'Physics Wallah Limited',
        period: 'May 2025 - Present',
        roleProgression: 'Backend Trainee (May–Nov 2025) → SDE (Nov 2025–Present)',
        location: 'Noida, India',
        status: 'current',
        type: 'Internship',
        description: 'Driving product development & operational automation at India\'s largest EdTech unicorn — ideated and now lead end-to-end development of Career Wallah, built high-traffic exam tools for 500K+ users, and led the Khazana 1.0→2.0 migration.',
        highlights: [
          { value: '₹2Cr+', label: 'Revenue' },
          { value: '500K+', label: 'Users served' },
          { value: '300K+', label: 'Records migrated' },
          { value: '48h→2h', label: 'Automation' },
        ],
        responsibilities: [
          'Ideated, pitched & lead end-to-end development of Career Wallah, a JEE college-prediction platform generating ₹2Cr+ in revenue since launch',
          'Built and scaled high-traffic exam tools — score calculators, rank predictors & counseling platforms — serving 500,000+ users',
          'Led the Khazana 1.0→2.0 migration: database schema redesign + migration scripts moving 300,000+ records across multiple teams',
          'Designed an internal automation portal (Next.js) that cut a recurring workflow from 48 hours to 2 hours (95%+ efficiency gain)',
          'Built automation pipelines (Node.js, Python) to extract & process 100,000+ student result records during peak exam seasons',
          'Shipped internal business tools in days — a bulk certificate generator (10,000+ certs) and a faculty resource planning platform'
        ],
        technologies: ['Next.js', 'Node.js', 'Express.js', 'Python', 'PostgreSQL', 'MongoDB'],
        impact: '₹2Cr+ revenue • 500K+ users served • 90K+ leads captured • 48h→2h automation',
        website: 'https://www.pw.live/',
        caseStudy: '/experience/pw'
    },
    {
      id: 'appzlogic',
      title: 'Full Stack SDE Developer Intern',
      company: 'Appzlogic Mobility Solutions',
      period: 'June 2024 - November 2024',
      location: 'Noida, India',
      status: 'completed',
      type: 'Internship',
      description: 'Shipped customer-facing features for Images Bazaar (by Sandeep Maheshwari) using Next.js, and revamped the company website UI to improve navigation and content accessibility.',
      roleProgression: '',
      highlights: [] as { value: string; label: string }[],
      caseStudy: '',
      responsibilities: [
        'Developed and shipped customer-facing features for the Images Bazaar platform using Next.js, enhancing platform functionality and user experience',
        'Revamped the company website UI, improving navigation, content accessibility, and overall user experience',
        'Collaborated with cross-functional teams to deliver features on production timelines'
      ],
      technologies: ['JavaScript', 'React.js', 'Next.js', 'Redux', 'MUI', 'Node.js', 'Express.js', 'PostgreSQL'],
      impact: 'Shipped customer-facing features for the Images Bazaar platform and revamped the company website UI',
      website: 'https://appzlogic.com'
    }
  ];

  // Function to calculate total experience in years and months
  // Parse "May 2025" reliably across browsers. `new Date("May 2025")` works in
  // V8 (Node/Chrome) but returns Invalid Date in Safari, which caused a
  // hydration mismatch ("NaN+ months"). This parser is engine-independent.
  const MONTHS = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december',
  ];
  const parseMonthYear = (str: string): { year: number; month: number } | null => {
    const [monthStr, yearStr] = str.trim().split(/\s+/);
    const month = MONTHS.indexOf(monthStr?.toLowerCase());
    const year = Number(yearStr);
    if (month === -1 || !Number.isFinite(year)) return null;
    return { year, month };
  };

  const calculateTotalExperience = () => {
    let totalMonths = 0;

    experience.forEach(role => {
      const [startStr, endStr] = role.period.split(' - ');

      const start = parseMonthYear(startStr);
      if (!start) return;

      const now = new Date();
      const end = endStr === 'Present'
        ? { year: now.getFullYear(), month: now.getMonth() }
        : parseMonthYear(endStr);
      if (!end) return;

      totalMonths += (end.year - start.year) * 12 + (end.month - start.month);
    });

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    const yearLabel = years === 1 ? 'Year' : 'Years';
    const monthLabel = months === 1 ? 'Month' : 'Months';

    if (years > 0 && months > 0) {
      return `${years} ${yearLabel} ${months} ${monthLabel}+`;
    } else if (years > 0) {
      return `${years} ${yearLabel}+`;
    } else {
      return `${months} ${monthLabel}+`;
    }
  };

  // Compute on the client only: the result depends on `new Date()` ("Present"),
  // which differs between the static build (server) and runtime (client). Keep
  // SSR and first client render identical to avoid a hydration mismatch.
  const [totalExperience, setTotalExperience] = useState<string | null>(null);
  useEffect(() => {
    setTotalExperience(calculateTotalExperience());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getStatusColor = (status: string) => {
    return status === 'current' ? 'neon' : 'electric';
  };

  return (
    <section id="work-experience" className="min-h-screen py-20 bg-surface/30 scroll-snap-section">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="terminal max-w-md mx-auto mb-8">
            <div className="terminal-prompt text-sm py-5">
              echo "professional timeline"
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

                {role.roleProgression && (
                  <div className="mb-4 inline-flex items-center gap-2 text-xs font-mono text-foreground-secondary bg-background-secondary/60 border border-border rounded-md px-3 py-1.5">
                    <TrendingUp size={12} className="text-neon" />
                    {role.roleProgression}
                  </div>
                )}

                <p className="text-foreground-secondary mb-6">
                  {role.description}
                </p>

                {/* Headline Metrics */}
                {role.highlights && role.highlights.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    {role.highlights.map((h) => (
                      <div
                        key={h.label}
                        className="rounded-lg border border-border bg-background-secondary/60 p-3 text-center"
                      >
                        <div className="text-xl font-serif gradient-text">{h.value}</div>
                        <div className="text-xs text-foreground-secondary mt-0.5">{h.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Case Study CTA */}
                {role.caseStudy && (
                  <Link href={role.caseStudy} onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 mb-6 hover:shadow-glow group"
                    >
                      Read the full case study
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  </Link>
                )}

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
              {experience.length} professional roles{totalExperience ? ` • ${totalExperience} Experience` : ''} • Millions of users impacted
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkExperienceSection;