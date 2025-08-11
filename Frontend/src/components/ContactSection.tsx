import { useState, useEffect, useCallback } from 'react';
import { Send, Copy, Github, Linkedin, Twitter, Mail, MapPin, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const ContactSection = () => {
  const [message, setMessage] = useState('');
  const [currentSuggestion, setCurrentSuggestion] = useState(0);
  const [hoveredSuggestion, setHoveredSuggestion] = useState<number | null>(null);
  
  const suggestions = [
    'collaboration',
    'startup opportunity',
    'freelance project',
    'technical discussion',
    'code review',
    'mentorship',
    'speaking engagement'
  ];

  const contactMethods = [
    {
      id: 'email',
      icon: <Mail size={20} />,
      label: 'Email',
      value: 'aadishjain017@gmail.com',
      action: 'mailto:aadishjain017@gmail.com',
      description: 'Best for detailed discussions'
    },
    {
      id: 'linkedin',
      icon: <Linkedin size={20} />,
      label: 'LinkedIn',
      value: '/in/aadishj23',
      action: 'https://linkedin.com/in/aadishj23',
      description: 'Professional networking'
    },
    {
      id: 'github',
      icon: <Github size={20} />,
      label: 'GitHub',
      value: '@aadishj23',
      action: 'https://github.com/aadishj23',
      description: 'Code collaboration'
    },
    {
      id: 'twitter',
      icon: <Twitter size={20} />,
      label: 'X',
      value: '@AadishJ23',
      action: 'https://x.com/AadishJ23',
      description: 'Quick updates & tech talks'
    }
  ];

//   const quickActions = [
//     {
//       id: 'calendar',
//       icon: <Calendar size={16} />,
//       label: 'Schedule Call',
//       description: '30-min chat about your project',
//       action: '#'
//     },
//     {
//       id: 'location',
//       icon: <MapPin size={16} />,
//       label: 'Meet in Person',
//       description: 'Delhi/NCR area',
//       action: '#'
//     }
//   ];

  const handleSuggestionClick = (suggestion: string, index: number) => {
    setMessage(`Hey Aadish, I'd love to connect about ${suggestion}. `);
    setCurrentSuggestion(index);
  };

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCurrentSuggestion((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCurrentSuggestion((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter' && currentSuggestion >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[currentSuggestion], currentSuggestion);
    }
  }, [currentSuggestion, suggestions.length]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send the message
    toast.success('Message sent! I\'ll get back to you soon.');
    setMessage('');
  };

  return (
    <section id="contact" className="min-h-screen py-20 bg-terminal-bg scroll-snap-section">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-5xl font-serif mb-6 text-white">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          
          <p className="text-lg text-white/90">
            Ready to build something amazing together? Drop me a message and let's start the conversation.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Terminal Chat Interface */}
          <div className="space-y-8">
            <Card className="terminal bg-terminal-bg/90 border-terminal-accent/40 overflow-hidden">
              <div className="os-window-header bg-terminal-bg border-b border-terminal-accent/40">
                <div className="flex items-center gap-3">
                  <div className="text-terminal-accent">
                    <Send size={16} />
                  </div>
                  <span className="font-mono text-sm text-white">aadish@connect ~ %</span>
                </div>
                <div className="os-window-controls">
                  <div className="os-window-control close" />
                  <div className="os-window-control minimize" />
                  <div className="os-window-control maximize" />
                </div>
              </div>

              <div className="p-6 bg-terminal-bg/70">
                {/* Chat History */}
                <div className="space-y-4 mb-6 font-mono text-sm">
                  <div className="terminal-prompt text-terminal-accent">
                    Welcome to Aadish Connect Terminal v2.0
                  </div>
                  <div className="text-white">
                    What would you like to discuss?
                  </div>
                  
                  <div className="text-xs text-terminal-foreground/70 mb-2">
                    Use ↑↓ arrows to navigate, Enter to select, or click directly
                  </div>
                  
                  {/* Suggestions */}
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {suggestions.map((suggestion, index) => (
                                                                    <button
                         key={suggestion}
                         onClick={() => handleSuggestionClick(suggestion, index)}
                         onMouseEnter={() => setHoveredSuggestion(index)}
                         onMouseLeave={() => setHoveredSuggestion(null)}
                         className={`text-left p-2 rounded border border-terminal-accent/50 hover:border-terminal-accent transition-colors text-xs ${
                           index === currentSuggestion ? 'bg-terminal-accent/20 text-white border-terminal-accent' : 'text-white hover:bg-terminal-accent/10'
                         }`}
                       >
                         <span className="text-terminal-accent">→ </span>
                         <span className={index === currentSuggestion ? 'text-white' : 'text-terminal-foreground'}>{suggestion}</span>
                       </button>
                    ))}
                  </div>
                </div>

                {/* Message Input */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-3">
                    <div className="terminal-prompt text-terminal-accent">
                      $ message --to="aadish" --priority="high"
                    </div>
                    
                    <Textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message here..."
                      className="min-h-24 bg-terminal-bg/80 border-terminal-accent/50 text-white placeholder:text-terminal-foreground/70 font-mono text-sm"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      type="submit"
                      className="bg-terminal-accent hover:bg-terminal-accent/80 text-terminal-bg font-mono"
                      disabled={!message.trim()}
                    >
                      <Send size={14} className="mr-2" />
                      Send Message
                    </Button>
                    
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => setMessage('')}
                      className="border-terminal-accent/50 text-terminal-accent hover:bg-terminal-accent/20 hover:border-terminal-accent font-mono bg-terminal-bg/60"
                    >
                      Clear
                    </Button>
                  </div>
                </form>
              </div>
            </Card>

            {/* Availability Status */}
            <Card className="terminal p-6 bg-terminal-bg/90 border-terminal-accent/40 overflow-hidden">
              <div className="terminal-prompt mb-4 text-terminal-accent">
                status --availability
              </div>
              
              <div className="space-y-3 text-sm pb-2">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-neon animate-pulse" />
                  <span className="text-white">
                    Available for new opportunities
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-terminal-accent" />
                  <span className="text-white">
                    Response time: Usually within 24 hours
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-hot" />
                  <span className="text-white">
                    Timezone: IST (UTC +5:30)
                  </span>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            {/* <div className="grid gap-4">
              {quickActions.map((action, index) => (
                <Card 
                  key={action.id}
                  className={`interactive-hover cursor-pointer bg-terminal-bg/50 border-terminal-accent/20 animate-slide-in-right animate-delay-${(index + 1) * 100}`}
                >
                  <div className="p-4 flex items-center gap-4">
                    <div className="text-terminal-accent">
                      {action.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-terminal-foreground text-sm">
                        {action.label}
                      </h3>
                      <p className="text-xs text-terminal-foreground/70">
                        {action.description}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-terminal-accent/30 text-terminal-accent hover:bg-terminal-accent/10"
                    >
                      Connect
                    </Button>
                  </div>
                </Card>
              ))}
            </div> */}
          </div>

          {/* Contact Methods */}
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-serif text-white mb-4">
                Multiple Ways to Reach Me
              </h3>
              <p className="text-white/80">
                Choose your preferred communication channel
              </p>
            </div>

            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <Card 
                  key={method.id}
                  className={`os-window bg-terminal-bg/80 border-terminal-accent/40 animate-fade-in-up animate-delay-${(index + 1) * 100} overflow-hidden`}
                >
                  <div className="os-window-header bg-terminal-bg/90 border-b border-terminal-accent/40">
                    <div className="flex items-center gap-3">
                      <div className="text-terminal-accent">
                        {method.icon}
                      </div>
                      <div>
                        <span className="text-white font-semibold">
                          {method.label}
                        </span>
                        <p className="text-xs text-terminal-foreground/80">
                          {method.description}
                        </p>
                      </div>
                    </div>
                    <div className="os-window-controls">
                      <div className="os-window-control close" />
                      <div className="os-window-control minimize" />
                      <div className="os-window-control maximize" />
                    </div>
                  </div>

                  <div className="p-4 pb-6 bg-terminal-bg/60">
                    <div className="flex items-center justify-between">
                      <div className="font-mono text-sm text-white">
                        {method.value}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(method.action)}
                          className="border-white/40 text-white hover:bg-white/20 hover:border-white/60 hover:text-white bg-terminal-bg/60"
                        >
                          <Copy size={12} />
                        </Button>
                        
                        <Button
                          size="sm"
                          className="bg-terminal-accent hover:bg-terminal-accent/80 text-terminal-bg"
                          onClick={() => window.open(method.action, '_blank')}
                        >
                          Connect
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

          </div>
        </div>

        {/* Fun Fact - Centered across entire section */}
        <div className="text-center mt-16">
          <div className="inline-block bg-pastel-yellow/30 border border-pastel-yellow/60 rounded-lg p-4">
            <p className="text-sm text-white">
              💡 <strong>Fun fact:</strong> I respond faster to technical challenges 
              and interesting project ideas!
            </p>
          </div>
        </div>

        {/* Made with Love Footer */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/20 via-red-500/20 to-orange-500/20 border border-pink-500/30 rounded-full px-6 py-3 backdrop-blur-sm">
            <span className="text-pink-400 text-sm">Made with</span>
            <div className="animate-pulse">
              <span className="text-red-500 text-lg">❤️</span>
            </div>
            <span className="text-orange-400 text-sm">by</span>
            <span className="font-serif text-white font-medium text-sm">Aadish Jain</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection