import { useState } from 'react';
import { Calendar, MapPin, Code, Lightbulb, Trophy, Rocket, Users, Crown, Database, Briefcase, Star, Globe } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';

const JourneySection = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const journey = [
    {
      id: 'coding-start',
      year: 'March 2023',
      title: 'First Code Encounter',
      description: 'Discovered coding through college seniors and started learning HTML/CSS.',
      story: 'Joined a technical club of my college named "Anveshan" and discovered coding through college seniors and started learning HTML/CSS. I was a complete beginner and had no idea what I was doing.',
      icon: <Code size={20} />,
      mood: '🤔',
      tech: ['HTML', 'CSS', 'JavaScript']
    },
    {
      id: 'react-discovery',
      year: 'April 2023',
      title: 'React Revelation',
      description: 'Built my first React application and fell in love with component-based modular architecture.',
      story: 'Moved to React because making apps in HTML/CSS/JavaScript was too much of a pain. I started learning React and fell in love with the component-based modular architecture.',
      icon: <Lightbulb size={20} />,
      mood: '💡',
      tech: ['React', 'Recoil', 'Tailwind CSS', 'TypeScript'],
      projects: ['Tenzies', 'TempTrack']
    },
    {
      id: 'organised-HackBPIT2k23',
      year: 'November 2023',
      title: 'Organised HackBPIT',
      description: 'Organised the premier annual Hackathon of my college "HackBPIT" as member of college\'s technical club "Anveshan".',
      story: 'Got the responsibility of leading the team of 30+ members to organise the hackathon within a short time frame of 15 days. It was a great learning experience and I got to learn a lot about how to lead a team and how to manage a project. I also managed to get 500+ participants and a prize pool of $25k.',
      icon: <Users size={20} />,
      mood: '🚀',
      skills: ['Leadership', 'Communication', 'Time Management', 'Resource Planning']
    },
    {
        id: 'HOO',
        year: 'December 2023',
        title: 'Head of Operations at Anveshan',
        description: 'Got the responsibility of heading the operations of the technical club of my college "Anveshan".',
        story: 'After my incredibly successful organisation of HackBPIT, I was given the responsibility of heading the operations of Anveshan.',
        icon: <Crown size={20} />,
        mood: '👑',
        skills: ['Leadership', 'Communication', 'Time Management', 'Resource Planning']
    },
    {
        id: 'learned-backend',
        year: 'April 2024',
        title: 'Learned Backend',
        description: 'Created my first backend project using Node.js and Express.js.',
        story: 'Started learning backend development and created my first backend project using Node.js and Express.js. I also learned about the importance of backend development and why it is a crucial part of any project.',
        icon: <Database size={20} />,
        mood: '⚙️',
        tech: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Prisma'],
        projects: ['Quizzical', 'TaskMate', 'Venturevine']
    },
    {
        id: 'appzlogic',
        year: 'June 2024',
        title: 'First Internship - Appzlogic',
        description: 'Joined Appzlogic Mobility Solution as a Full Stack SDE Intern.',
        story: 'Got to work on "Images Bazaar" platform by Sandeep Maheswari and got to learn about real world projects and how to work in a team.',
        icon: <Briefcase size={20} />,
        mood: '💼',
        tech: ['Scale', 'Integration'],
        skills: ['Teamwork', 'Communication', 'Problem Solving', 'Time Management']
    },
    {
      id: 'vice-president',
      year: 'July 2024',
      title: 'Vice President at Anveshan',
      description: 'Due to my hard work and dedication, I was promoted to the position of Vice President at Anveshan.',
      story: 'As a Vice-President, I made strategic decisions and led the team to success while also fostering a culture of innovation, collaboration and personal growth.',
      icon: <Star size={20} />,
      mood: '⭐',
      skills: ['Team Leadership', 'Critical Thinking', 'Decision Making', 'Communication']
    },
    {
      id: 'hackcbs-winner',
      year: 'November 2024',
      title: 'Finalist at HackCBS',
      description: 'Developed Labeasy which lead to my team being the finalist and winning the Vultr Award for Best Unique Idea.',
      story: 'Developed Labeasy wihin a span of 3 days with my team and reached the finals of HackCBS 7 which had 4500+ participants.',
      icon: <Trophy size={20} />,
      mood: '🏆',
      tech: ['Database Design', 'System Architecture', 'Scalable Code'],
      projects: ['Labeasy'],
      achievement: 'Vultr Award Winner for Best Unique Idea'
    },
    {
        id: 'first-freelance-project',
        year: 'November 2024',
        title: 'First Freelance Project - Namdapha',
        description: 'Developed a website for a Tiger Reserve in India called "Namdapha National Park".',
        story: 'Got my first freelance project through a friend of mine. It was a great learning experience and I got to learn a lot about how to work with a client and how to deliver a project on time.',
        icon: <Globe size={20} />,
        mood: '🌍',
        projects: ['Namdpaha']
    },
    {
      id: 'physics-wallah',
      year: 'May 2025',
      title: 'Backend Trainee - Physics Wallah',
      description: 'Joined Physics Wallah as Backend Trainee, contributing to India\'s fastest-growing unicorn.',
      story: 'Stepping into the unicorn world. Building systems that serve millions of students across India. I am working on their product called "Khazana" and helping it scale.',
      icon: <Rocket size={20} />,
      mood: '🦄',
      tech: ['Scale', 'Performance', 'Impact'],
      status: 'current'
    }
  ];

  return (
    <section className="min-h-screen py-20 bg-background scroll-snap-section">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="terminal max-w-md mx-auto mb-8 py-5">
            <div className="terminal-prompt text-sm">
              echo "personal story"
            </div>
          </div>
          
          <h2 className="text-5xl font-serif mb-6">
            My <span className="gradient-text">Journey</span>
          </h2>
          
          <p className="text-lg text-foreground-secondary">
          From complete beginner in March 2023 to building systems that serve millions. Here's how it all started.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-foreground-secondary">March 2023</span>
            <span className="text-sm text-foreground-secondary">Now</span>
          </div>
          <div className="relative h-2 bg-surface rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-electric via-neon to-hot rounded-full animate-pulse" />
          </div>
          <div className={`flex ${isMobile ? 'flex-wrap gap-4 justify-center' : 'justify-between'} mt-2`}>
            {journey.map((milestone, index) => (
              <div key={milestone.id} className={`flex flex-col items-center ${isMobile ? 'min-w-[80px]' : ''}`}>
                <div className={`w-3 h-3 rounded-full ${
                  milestone.status === 'current' ? 'bg-neon animate-pulse' : 'bg-electric'
                } mb-1`} />
                <span className="text-xs text-foreground-secondary text-center">{milestone.year}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="max-w-5xl mx-auto">
          <div className="space-y-8">
            {journey.map((milestone, index) => (
              <div
                key={milestone.id}
                className={`animate-fade-in-up animate-delay-${(index + 1) * 100}`}
              >
                <Card 
                  className={`os-window interactive-hover cursor-pointer transition-all duration-300 ${
                    selectedMilestone === milestone.id ? 'shadow-glow scale-105' : ''
                  } ${index % 2 === 0 ? 'ml-0 mr-8' : 'ml-8 mr-0'}`}
                  onClick={() => setSelectedMilestone(selectedMilestone === milestone.id ? null : milestone.id)}
                >
                  <div className="os-window-header">
                    <div className="flex items-center gap-3">
                      <div className="text-electric">
                        {milestone.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground flex items-center gap-2">
                          {milestone.title}
                          <span className="text-lg">{milestone.mood}</span>
                        </h3>
                        <p className="text-sm text-foreground-secondary">
                          {milestone.year}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {milestone.status === 'current' && (
                        <Badge variant="outline" className="text-neon border-neon/30 animate-pulse">
                          current
                        </Badge>
                      )}
                      <div className="os-window-controls">
                        <div className="os-window-control close" />
                        <div className="os-window-control minimize" />
                        <div className="os-window-control maximize" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-foreground-secondary mb-4">
                      {milestone.description}
                    </p>

                    {/* Expanded Story */}
                    {selectedMilestone === milestone.id && (
                      <div className="animate-fade-in-up space-y-4">
                        <div className="p-4 bg-surface/50 rounded-lg border-l-4 border-electric">
                          <p className="text-foreground italic">
                            "{milestone.story}"
                          </p>
                        </div>

                        {/* Tech Stack */}
                        {milestone.tech && milestone.tech.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-2 text-foreground">Tech Learned</h4>
                            <div className="flex flex-wrap gap-2">
                              {milestone.tech.map((tech) => (
                                <Badge key={tech} variant="secondary" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Projects */}
                        {milestone.projects && (
                          <div>
                            <h4 className="font-semibold mb-2 text-foreground">Projects Built</h4>
                            <div className="flex flex-wrap gap-2">
                              {milestone.projects.map((project) => (
                                <Badge key={project} className="bg-electric/20 text-electric border-electric/30">
                                  {project}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Achievement */}
                        {milestone.achievement && (
                          <div>
                            <h4 className="font-semibold mb-2 text-foreground">Achievement</h4>
                            <Badge className="bg-neon/20 text-neon border-neon/30">
                              {milestone.achievement}
                            </Badge>
                          </div>
                        )}

                        {/* Skills Acquired */}
                        {milestone.skills && milestone.skills.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-2 text-foreground">Skills Acquired</h4>
                            <div className="flex flex-wrap gap-2">
                              {milestone.skills.map((skill) => (
                                <Badge key={skill} variant="outline" className="text-hot border-hot/30">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Prompt */}
        <div className="text-center mt-16">
          <div className="terminal max-w-md mx-auto p-4">
            <div className="terminal-prompt">
              Click on milestones to read the full story →
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;