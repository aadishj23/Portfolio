import { Coffee, Code2, Rocket, Heart, BookOpen, Music, Trophy, Users, Crown, Database, Lightbulb } from 'lucide-react';
import { Card } from '@/components/ui/card';

const PersonalSection = () => {
  const personalNotes = [
    {
      id: 'philosophy',
      title: 'Development Philosophy',
      icon: <Code2 size={20} />,
      content: "Clean code isn't written to satisfy the computer - it's written to satisfy the human who comes after you. Every function, every variable name, every architectural decision is a love letter to your future self and your teammates.",
      doodle: '→',
      color: 'electric'
    },
    {
      id: 'motivation',
      title: 'What Drives Me',
      icon: <Rocket size={20} />,
      content: "I'm obsessed with the moment when code becomes more than just logic - when it becomes a solution that genuinely improves someone's day. Whether it's automating Physics Wallah's Khazana feature to serve 2M+ students or building a website for Namdapha Tiger Reserve, that's my fuel.",
      doodle: '✨',
      color: 'neon'
    },
    {
      id: 'learning',
      title: 'Continuous Learning',
      icon: <BookOpen size={20} />,
      content: "The tech landscape changes faster than my coffee gets cold. I started coding in March 2023 and have been learning non-stop - from HTML/CSS to React, Node.js, and now Next.js. Every project teaches me something new.",
      doodle: '📚',
      color: 'hot'
    },
    {
      id: 'leadership',
      title: 'Leading by Example',
      icon: <Crown size={20} />,
      content: "From organizing hackathons to leading technical clubs, I've learned that great leadership isn't about being the smartest person in the room - it's about creating an environment where everyone can shine. My journey from Head of Operations to Vice President at Anveshan taught me that.",
      doodle: '👑',
      color: 'electric'
    },
    {
      id: 'balance',
      title: 'Beyond Code',
      icon: <Music size={20} />,
      content: "When I'm not debugging or leading teams, you'll find me exploring new music genres, reading about space exploration, or just chatting about sports especially cricket. Balance fuels creativity and keeps me grounded.",
      doodle: '🎵',
      color: 'neon'
    }
  ];

  const quickFacts = [
    { label: 'Coffee Consumed', value: '∞ cups', subtitle: 'Daily fuel' },
    { label: 'Projects Built', value: '15+', subtitle: 'From Labeasy to Namdapha' },
    { label: 'Team Members Led', value: '100+', subtitle: 'Anveshan Society' },
    { label: 'Students Mentored', value: '50+', subtitle: 'Web Development' },
    { label: 'Events Organised', value: '10+', subtitle: 'for Anveshan Society' },
    { label: 'Students Served', value: '2M+', subtitle: 'at Physics Wallah' }
  ];

  return (
    <section className="min-h-screen py-20 bg-gradient-subtle scroll-snap-section">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-electric" />
            <Coffee className="text-electric" size={24} />
            <div className="w-8 h-px bg-electric" />
          </div>
          
          <h2 className="text-5xl font-serif mb-6">
            From the Desk of <span className="gradient-text">Aadish Jain</span>
          </h2>
          
          <p className="text-lg text-foreground-secondary">
            Beyond the commits and pull requests - the human side of building things that matter.
          </p>
        </div>

        {/* Notebook Style Layout */}
        <div className="max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="relative">
            {/* Notebook Lines Background */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i} className="h-8 border-b border-electric" />
              ))}
            </div>

            {/* Notebook Margin */}
            <div className="absolute left-0 top-0 bottom-0 w-20 border-r-2 border-hot/20 pointer-events-none" />

            {/* Content Grid */}
            <div className="pl-24 pr-8 space-y-12">
              {personalNotes.map((note, index) => (
                <div
                  key={note.id}
                  className={`relative animate-fade-in-up animate-delay-${(index + 1) * 100}`}
                >
                  {/* Handwritten Style Card */}
                  <Card className="glass-card border-none shadow-soft transform rotate-1 hover:rotate-0 transition-transform duration-300">
                    <div className="p-8">
                      {/* Note Header */}
                      <div className="flex items-start gap-4 mb-6">
                        <div className={`text-${note.color} mt-1`}>
                          {note.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-serif mb-2 text-foreground">
                            {note.title}
                          </h3>
                          <div className={`w-12 h-0.5 bg-${note.color} rounded`} />
                        </div>
                        <div className="text-2xl opacity-60">{note.doodle}</div>
                      </div>

                      {/* Note Content */}
                      <p className="text-foreground-secondary leading-relaxed font-light text-lg">
                        {note.content}
                      </p>

                      {/* Handwritten Arrow Doodle */}
                      <div className="absolute -right-2 -bottom-2">
                        <svg 
                          width="40" 
                          height="40" 
                          viewBox="0 0 40 40" 
                          className={`text-${note.color} opacity-30`}
                          fill="currentColor"
                        >
                          <path d="M10 30 Q 20 10 30 30 Q 25 25 30 30 Q 25 35 30 30" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                fill="none" 
                                strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>
                  </Card>

                  {/* Sticky Note Style for Alternating Layout */}
                  {index % 2 === 1 && (
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-pastel-yellow rounded-full shadow-soft" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Facts Dashboard */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-serif mb-4">Quick Stats</h3>
              <p className="text-foreground-secondary">Numbers that tell a story</p>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
              {quickFacts.map((fact, index) => (
                <Card
                  key={fact.label}
                  className={`text-center p-6 interactive-hover animate-scale-in animate-delay-${(index + 1) * 100}`}
                >
                  <div className="text-2xl font-bold text-electric mb-2">
                    {fact.value}
                  </div>
                  <div className="text-sm font-semibold text-foreground mb-1">
                    {fact.label}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {fact.subtitle}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Personal Note */}
          <div className="mt-20 text-center">
            <div className="terminal max-w-2xl mx-auto p-8">
              <div className="terminal-prompt mb-4">
                echo "A personal message from Aadish"
              </div>
              
              <div className="text-terminal-foreground text-left space-y-4">
                <p>
                  "Building software isn't just about solving problems - it's about crafting experiences 
                  that make people's lives a little bit better, one line of code at a time. From serving 
                  2M+ students at Physics Wallah to organizing hackathons that inspire innovation."
                </p>
                
                <p>
                  "I believe the best developers are not just technical experts, but empathetic humans 
                  who understand that behind every user story is a real person with real needs. That's 
                  why I lead teams, organize events, and build solutions that scale."
                </p>
                
                <div className="flex items-center gap-3 justify-center mt-6">
                  <div className="w-8 h-px bg-terminal-accent" />
                  <span className="text-terminal-accent font-mono">Aadish Jain</span>
                  <div className="w-8 h-px bg-terminal-accent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalSection;