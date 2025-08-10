import { useState, useEffect } from 'react';
import { Terminal, Code, Folder, User, Mail, Download } from 'lucide-react';
import heroTerminal from '@/assets/hero-terminal.jpeg';

const WelcomeScreen = () => {
  const [bootingComplete, setBootingComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
  const bootSequence = [
    "Booting up system... 🔧",
    "Loading dev environment modules... 📦",
    "Establishing secure link to mainframe... 🔐",
    "Deploying portfolio interface... 🚀",
    "All systems online. Welcome. 👨‍🚀"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < bootSequence.length - 1) {
          return prev + 1;
        } else {
          setTimeout(() => setBootingComplete(true), 1000);
          clearInterval(timer);
          return prev;
        }
      });
    }, 800);

    return () => clearInterval(timer);
  }, []);

  // Prevent scrolling during boot sequence
  useEffect(() => {
    if (!bootingComplete) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [bootingComplete]);

  const apps = [
    { 
      id: 'projects', 
      name: 'Projects.exe', 
      icon: <Code size={24} />,
      description: 'Building solutions that scale',
      color: 'electric'
    },
    { 
      id: 'experience', 
      name: 'Timeline.app', 
      icon: <Folder size={24} />,
      description: 'Journey through startups',
      color: 'neon'
    },
    { 
      id: 'about', 
      name: 'About.md', 
      icon: <User size={24} />,
      description: 'The human behind the code',
      color: 'hot'
    },
    { 
      id: 'contact', 
      name: 'Connect.sh', 
      icon: <Mail size={24} />,
      description: 'Let\'s build something together',
      color: 'electric'
    }
  ];

  return (
    <section className={`min-h-screen relative overflow-hidden bg-gradient-terminal flex items-center justify-center scroll-snap-section ${!bootingComplete ? 'overflow-hidden' : ''}`}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroTerminal})` }}
      />
      
      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-electric/20 rounded-full float animate-delay-100" />
        <div className="absolute top-3/4 right-1/4 w-16 h-16 bg-neon/20 rounded-lg float animate-delay-300" />
        <div className="absolute bottom-1/4 left-1/3 w-12 h-12 bg-hot/20 rounded-full float animate-delay-500" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {!bootingComplete ? (
          /* Boot Sequence */
          <div className="terminal max-w-2xl mx-auto p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-2">
                <div className="os-window-control close" />
                <div className="os-window-control minimize" />
                <div className="os-window-control maximize" />
              </div>
              <span className="text-terminal-accent font-mono text-sm">aadish@terminal ~ %</span>
            </div>
            
            <div className="space-y-3">
              {bootSequence.slice(0, currentStep + 1).map((step, index) => (
                <div 
                  key={index}
                  className={`terminal-prompt animate-fade-in-up animate-delay-${index * 100}`}
                >
                  {step}
                </div>
              ))}
              
              {currentStep < bootSequence.length - 1 && (
                <div className="flex items-center gap-2 mt-4">
                  <div className="w-2 h-2 bg-terminal-accent rounded-full animate-pulse" />
                  <span className="text-terminal-accent/60">Loading...</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Aadish OS Interface */
          <div className="max-w-6xl mx-auto animate-fade-in-up pt-12 xl:pt-0 ">
            {/* OS Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-4">
                <Terminal className="text-terminal-accent" size={32} />
                <h1 className="text-6xl font-serif text-white">Aadish Jain</h1>
              </div>
              
              <div className="terminal-prompt text-xl text-terminal-foreground mb-2">
                💡 Turning ideas into systems that scale - backed by code, driven by curiosity.
              </div>
              
              <div className="flex items-center justify-center gap-4 text-terminal-accent/60">
                <span>v2.0.1</span>
                <span>•</span>
                <span>Backend Trainee @Physics Wallah</span>
                <span>•</span>
                <span>Full Stack Developer</span>
              </div>
            </div>

            {/* Desktop Apps */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {apps.map((app, index) => (
                <div
                  key={app.id}
                  className={`os-window interactive-hover animate-scale-in animate-delay-${(index + 1) * 100} cursor-pointer overflow-hidden`}
                >
                  <div className="os-window-header bg-background">
                    <div className="flex items-center gap-3">
                      <div className={`text-${app.color}`}>
                        {app.icon}
                      </div>
                      <span className="font-mono text-sm">{app.name}</span>
                    </div>
                    <div className="os-window-controls">
                      <div className="os-window-control close" />
                      <div className="os-window-control minimize" />
                      <div className="os-window-control maximize" />
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-foreground-secondary text-sm mb-4">
                      {app.description}
                    </p>
                    
                    <div className={`inline-flex items-center gap-2 text-xs text-${app.color} font-mono group-hover:animate-pulse`}>
                      <span>$ open {app.name.toLowerCase()}</span>
                      <div className="w-1 h-3 bg-current animate-pulse" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="flex justify-center gap-6">
                <a href="https://drive.google.com/file/d/1LL2rzo_hnZJeGjemXK61MpWspCE5hHMS/view?usp=drive_link" target='_blank'>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-electric/20 hover:bg-electric/30 border border-electric/40 rounded-lg text-electric font-mono text-sm transition-all duration-300 hover:shadow-glow">
                <Download size={16} />
                Download Resume
              </button></a>
              
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-neon/20 hover:bg-neon/30 border border-neon/40 rounded-lg text-neon font-mono text-sm transition-all duration-300 hover:shadow-glow">
                <Mail size={16} />
                Get In Touch
              </button>
            </div>

            {/* Scroll Indicator */}
            <div className="flex justify-center mt-16">
              <div className="flex flex-col items-center gap-2 text-terminal-accent/60">
                <span className="text-xs font-mono">Scroll to explore</span>
                <div className="w-0.5 h-8 bg-terminal-accent/40 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WelcomeScreen;