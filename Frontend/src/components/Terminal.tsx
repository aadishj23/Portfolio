import { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Command, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBootContext } from '@/contexts/BootContext';

interface CommandHistory {
  command: string;
  output: string | React.ReactNode;
  timestamp: Date;
}

interface Project {
  id: string;
  name: string;
  command: string;
  description: string;
  links: {
    live?: string;
    github?: string;
  };
}

const Terminal = () => {
  const { bootingComplete } = useBootContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isHalfSize, setIsHalfSize] = useState(true); // Changed default to true
  const [inputValue, setInputValue] = useState('');
  const [commandHistory, setCommandHistory] = useState<CommandHistory[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentDirectory, setCurrentDirectory] = useState('~/portfolio');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // All projects from your portfolio
  const projects: Project[] = [
    {
      id: 'labeasy',
      name: 'Labeasy',
      command: 'run-labeasy',
      description: 'A unified diagnostics platform that helps users find and book affordable lab tests from trusted local labs.',
      links: {
        live: 'https://labeasy.aadish.tech/',
        github: 'https://github.com/aadishj23/Labeasy'
      }
    },
    {
      id: 'namdapha',
      name: 'Namdapha Tiger Reserve Website',
      command: 'run-namdapha',
      description: 'A modern and accessible website for Namdapha Tiger Reserve, showcasing its biodiversity, tourism info, and conservation efforts.',
      links: {
        live: 'https://namdapha-axuo.vercel.app/',
        github: 'https://github.com/aadishj23/Namdapha'
      }
    },
    {
      id: 'quizzical',
      name: 'Quizzical',
      command: 'run-quizzical',
      description: 'A quiz platform offering thousands of technical questions categorized by topic and difficulty level.',
      links: {
        live: 'https://quizzical.aadish.tech/',
        github: 'https://github.com/aadishj23/Quiz-App'
      }
    },
    {
      id: 'anveshan',
      name: 'Anveshan',
      command: 'run-anveshan',
      description: 'A website for Anveshan, the technical club of BPIT, showcasing its events, team, projects, and achievers.',
      links: {
        live: 'https://anveshan.dev/',
        github: 'https://github.com/aadishj23/Anveshan'
      }
    },
    {
      id: 'taskmate',
      name: 'TaskMate',
      command: 'run-taskmate',
      description: 'A full-stack to-do app that lets you efficiently manage, track, and organize your tasks with a seamless user experience.',
      links: {
        live: 'https://taskmate.aadish.tech/',
        github: 'https://github.com/aadishj23/TaskMate'
      }
    },
    {
      id: 'venturevine',
      name: 'Venturevine',
      command: 'run-venturevine',
      description: 'A comprehensive platform for entrepreneurs and startups to showcase their ventures, connect with investors, and grow their network.',
      links: {
        live: 'https://venturevine.aadish.tech/',
        github: 'https://github.com/aadishj23/Venturevine'
      }
    },
    {
      id: 'hackblitz',
      name: 'HackBlitz Hackathon Website',
      command: 'run-hackblitz',
      description: 'The official website for HackBlitz, a 24-hour hackathon featuring project showcases in front of 10+ judges.',
      links: {
        live: 'https://hackblitz.aadish.tech/',
        github: 'https://github.com/aadishj23/HackBlitz'
      }
    },
    {
      id: 'temptrack',
      name: 'TempTrack',
      command: 'run-temptrack',
      description: 'A weather tracking application that provides real-time temperature data, forecasts, and location-based weather information.',
      links: {
        live: 'https://weather.aadish.tech/',
        github: 'https://github.com/aadishj23/weather'
      }
    },
    {
      id: 'youtube',
      name: 'Youtube Comment Scraper',
      command: 'run-ytcmntscraper',
      description: 'An YouTube comment extraction tool that filters and sorts comments by relevance, date, and quantity for comprehensive data analysis.',
      links: {
        live: 'https://youtube-comment-scrapper.aadish.tech/',
        github: 'https://github.com/aadishj23/Youtube-Comment-Scrapper'
      }
    },
    {
      id: 'tenzies',
      name: 'Tenzies',
      command: 'run-tenzies',
      description: 'A fun dice game where players roll dice to achieve matching numbers, built with modern web technologies.',
      links: {
        live: 'https://tenzies.aadish.tech/',
        github: 'https://github.com/aadishj23/Tenzies-Game'
      }
    }
  ];

  // Available commands
  const commands = {
    help: {
      description: 'Show available commands',
      usage: 'help [command]',
      execute: (args: string[]) => {
        if (args.length === 0) {
          return (
            <div className="space-y-2">
              <div className="text-terminal-accent font-bold">Available Commands:</div>
                             <div className="grid grid-cols-2 gap-2 text-sm">
                 <div><span className="text-terminal-accent">help</span> - Show this help</div>
                 <div><span className="text-terminal-accent">clear</span> - Clear terminal</div>
                 <div><span className="text-terminal-accent">ls</span> - List projects</div>
                 <div><span className="text-terminal-accent">cd</span> - Change directory</div>
                 <div><span className="text-terminal-accent">pwd</span> - Show current directory</div>
                 <div><span className="text-terminal-accent">whoami</span> - Show user info</div>
                 <div><span className="text-terminal-accent">date</span> - Show current date</div>
                 <div><span className="text-terminal-accent">projects</span> - Show all projects</div>
                 <div><span className="text-terminal-accent">run-*</span> - Run specific project</div>
                 <div><span className="text-terminal-accent">contact</span> - Show contact info</div>
                 <div><span className="text-terminal-accent">skills</span> - Show skills</div>
                 <div><span className="text-terminal-accent">experience</span> - Show work experience</div>
                 <div><span className="text-terminal-accent">echo</span> - Echo text</div>
                 <div><span className="text-terminal-accent">open projects.exe</span> - Navigate to projects</div>
                 <div><span className="text-terminal-accent">open journey.app</span> - Navigate to journey</div>
                 <div><span className="text-terminal-accent">open experience.exe</span> - Navigate to experience</div>
                 <div><span className="text-terminal-accent">open skills.sh</span> - Navigate to skills</div>
                 <div><span className="text-terminal-accent">ps aux | grep aadish-projects</span> - Show running projects</div>
                 <div><span className="text-terminal-accent">cat career_summary.txt</span> - Show work summary</div>
                 <div><span className="text-terminal-accent">skill --list --filter="all" --search="none"</span> - Skills summary</div>
                 <div><span className="text-terminal-accent">cat /etc/aadish/architecture-principles.txt</span> - Show principles</div>
                 <div><span className="text-terminal-accent">message --to="aadish" --priority="high"</span> - Navigate to contact</div>
                 <div><span className="text-terminal-accent">list-commands</span> - Debug: List all command keys</div>
               </div>
              <div className="text-xs text-terminal-foreground/60 mt-2">
                Type 'help [command]' for detailed information about a specific command.
              </div>
            </div>
          );
        }
        const command = args[0];
        if (commands[command as keyof typeof commands]) {
          const cmd = commands[command as keyof typeof commands];
          return (
            <div className="space-y-2">
              <div className="text-terminal-accent font-bold">{command}</div>
              <div className="text-terminal-foreground">{cmd.description}</div>
              <div className="text-terminal-warning">Usage: {cmd.usage}</div>
            </div>
          );
        }
        return <div className="text-terminal-error">Command '{command}' not found. Type 'help' for available commands.</div>;
      }
    },
    clear: {
      description: 'Clear terminal screen',
      usage: 'clear',
      execute: () => {
        setCommandHistory([]);
        return null;
      }
    },
    ls: {
      description: 'List projects in current directory',
      usage: 'ls',
      execute: () => {
        return (
          <div className="space-y-2">
            <div className="text-terminal-accent font-bold">Projects in {currentDirectory}:</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {projects.map(project => (
                <div key={project.id} className="flex items-center gap-2">
                  <span className="text-terminal-accent">📁</span>
                  <span className="text-terminal-foreground">{project.name}</span>
                  <span className="text-terminal-warning text-xs">({project.command})</span>
                </div>
              ))}
            </div>
          </div>
        );
      }
    },
    cd: {
      description: 'Change directory',
      usage: 'cd [directory]',
      execute: (args: string[]) => {
        if (args.length === 0) {
          setCurrentDirectory('~/portfolio');
          return <div className="text-terminal-foreground">Changed to ~/portfolio</div>;
        }
        const dir = args[0];
        if (dir === '..' || dir === '../') {
          setCurrentDirectory('~/portfolio');
          return <div className="text-terminal-foreground">Changed to ~/portfolio</div>;
        }
        if (dir === '~' || dir === '~/portfolio') {
          setCurrentDirectory('~/portfolio');
          return <div className="text-terminal-foreground">Changed to ~/portfolio</div>;
        }
        setCurrentDirectory(`~/portfolio/${dir}`);
        return <div className="text-terminal-foreground">Changed to ~/portfolio/{dir}</div>;
      }
    },
    pwd: {
      description: 'Print working directory',
      usage: 'pwd',
      execute: () => <div className="text-terminal-foreground">{currentDirectory}</div>
    },
    whoami: {
      description: 'Display effective user ID',
      usage: 'whoami',
      execute: () => (
        <div className="space-y-2">
          <div className="text-terminal-accent font-bold">aadish</div>
          <div className="text-terminal-foreground text-sm">
            Full Stack Developer • Backend Trainee @Physics Wallah<br/>
            Building solutions that scale • Driven by curiosity
          </div>
        </div>
      )
    },
    date: {
      description: 'Display current date and time',
      usage: 'date',
      execute: () => <div className="text-terminal-foreground">{new Date().toLocaleString()}</div>
    },
    projects: {
      description: 'Show all projects with details',
      usage: 'projects',
      execute: () => (
        <div className="space-y-3">
          <div className="text-terminal-accent font-bold">Portfolio Projects:</div>
          {projects.map(project => (
            <div key={project.id} className="border-l-2 border-terminal-accent pl-3">
              <div className="text-terminal-foreground font-semibold">{project.name}</div>
              <div className="text-terminal-foreground/80 text-sm">{project.description}</div>
              <div className="text-terminal-warning text-xs mt-1">
                Command: <span className="text-terminal-accent">{project.command}</span>
              </div>
            </div>
          ))}
        </div>
      )
    },
    contact: {
      description: 'Show contact information',
      usage: 'contact',
      execute: () => (
        <div className="space-y-2">
          <div className="text-terminal-accent font-bold">Contact Information:</div>
          <div className="text-terminal-foreground text-sm">
            📧 Email: aadishjain017@gmail.com<br/>
            💼 LinkedIn: linkedin.com/in/aadishj23<br/>
            🐙 GitHub: github.com/aadishj23<br/>
          </div>
        </div>
      )
    },
    skills: {
      description: 'Show technical skills',
      usage: 'skills',
      execute: () => (
        <div className="space-y-2">
          <div className="text-terminal-accent font-bold">Technical Skills:</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div><span className="text-terminal-accent">Frontend:</span> JavaScript, React, TypeScript, Tailwind CSS, Next.js</div>
            <div><span className="text-terminal-accent">Backend:</span> Node.js, Express.js, Prisma</div>
            <div><span className="text-terminal-accent">Database:</span> PostgreSQL, MongoDB</div>
            <div><span className="text-terminal-accent">Tools:</span> Git, Docker, AWS</div>
          </div>
        </div>
      )
    },
         experience: {
       description: 'Show work experience',
       usage: 'experience',
       execute: () => (
         <div className="space-y-2">
           <div className="text-terminal-accent font-bold">Work Experience:</div>
           <div className="text-terminal-foreground text-sm">
             🏢 <span className="text-terminal-accent">Physics Wallah</span> - Backend Trainee<br/>
             📅 May 2025 - Present<br/>
             🔧 Backend Development, API Development, Database Management<br/><br/>
             
             🏢 <span className="text-terminal-accent">Appzlogic</span> - Full Stack SDE Intern<br/>
             📅 June 2024 - November 2024<br/>
             🔧 Web Applications, E-commerce, APIs
           </div>
         </div>
       )
     },
     echo: {
       description: 'Echo the input arguments',
       usage: 'echo [text]',
       execute: (args: string[]) => {
         if (args.length === 0) {
           return <div className="text-terminal-foreground">echo: missing operand</div>;
         }
         return <div className="text-terminal-foreground">{args.join(' ')}</div>;
       }
     },
     // New navigation commands
     'open projects.exe': {
       description: 'Navigate to projects section',
       usage: 'open projects.exe',
       execute: () => {
         // Scroll to projects section
         const projectsSection = document.getElementById('projects');
         if (projectsSection) {
           projectsSection.scrollIntoView({ behavior: 'smooth' });
           return <div className="text-terminal-success">✅ Navigated to Projects section</div>;
         }
         return <div className="text-terminal-error">❌ Projects section not found</div>;
       }
     },
     'open journey.app': {
       description: 'Navigate to journey section',
       usage: 'open journey.app',
       execute: () => {
         // Scroll to journey section
         const journeySection = document.getElementById('journey');
         if (journeySection) {
           journeySection.scrollIntoView({ behavior: 'smooth' });
           return <div className="text-terminal-success">✅ Navigated to Journey section</div>;
         }
         return <div className="text-terminal-error">❌ Journey section not found</div>;
       }
     },
     'open experience.exe': {
       description: 'Navigate to work experience section',
       usage: 'open experience.exe',
       execute: () => {
         // Scroll to work experience section
         const experienceSection = document.getElementById('work-experience');
         if (experienceSection) {
           experienceSection.scrollIntoView({ behavior: 'smooth' });
           return <div className="text-terminal-success">✅ Navigated to Work Experience section</div>;
         }
         return <div className="text-terminal-error">❌ Work Experience section not found</div>;
       }
     },
     'open skills.sh': {
       description: 'Navigate to skills section',
       usage: 'open skills.sh',
       execute: () => {
         // Scroll to skills section
         const skillsSection = document.getElementById('skills');
         if (skillsSection) {
           skillsSection.scrollIntoView({ behavior: 'smooth' });
           return <div className="text-terminal-success">✅ Navigated to Skills section</div>;
         }
         return <div className="text-terminal-error">❌ Skills section not found</div>;
       }
     },
     'ps aux | grep aadish-projects': {
       description: 'Show all running projects',
       usage: 'ps aux | grep aadish-projects',
       execute: () => {
         return (
           <div className="space-y-2">
             <div className="text-terminal-accent font-bold">Running Aadish Projects:</div>
             <div className="space-y-1 text-sm">
               <div className="text-terminal-success">✅ aadish-portfolio (PID: 1337) - Active</div>
               <div className="text-terminal-success">✅ aadish-backend (PID: 1338) - Running</div>
               <div className="text-terminal-success">✅ aadish-frontend (PID: 1339) - Active</div>
               <div className="text-terminal-warning">⚠️ aadish-database (PID: 1340) - Starting</div>
             </div>
             <div className="text-terminal-foreground text-xs mt-2">
               Total processes: 4 | Active: 3 | Starting: 1
             </div>
           </div>
         );
       }
     },
     'cat career_summary.txt': {
       description: 'Display work experience summary',
       usage: 'cat career_summary.txt',
       execute: () => {
         return (
           <div className="space-y-2">
             <div className="text-terminal-accent font-bold">Career Summary (career_summary.txt):</div>
             <div className="text-terminal-foreground text-sm font-mono">
               <div>🏢 Physics Wallah - Backend Trainee</div>
               <div>   📅 Duration: May 2025 - Present</div>
               <div>   🔧 Focus: Backend Development, API Development</div>
               <div>   🚀 Achievements: Database optimization, API performance</div>
               <div></div>
               <div>🏢 Appzlogic - Full Stack SDE Intern</div>
               <div>   📅 Duration: June 2024 - November 2024</div>
               <div>   🔧 Focus: Web Applications, E-commerce, APIs</div>
               <div>   🚀 Achievements: Full-stack development, team collaboration</div>
               <div></div>
               <div>🎓 Education: BPIT - Computer Science</div>
               <div>🌟 Specialization: Full Stack Development</div>
             </div>
           </div>
         );
       }
     },
     'skill --list --filter="all" --search="none"': {
       description: 'Display comprehensive skills summary',
       usage: 'skill --list --filter="all" --search="none"',
       execute: () => {
         return (
           <div className="space-y-3">
             <div className="text-terminal-accent font-bold">Skills Summary (skill --list --filter="all" --search="none"):</div>
             
             <div className="space-y-2">
               <div className="text-terminal-accent font-semibold">🖥️ Frontend Technologies:</div>
               <div className="grid grid-cols-2 gap-1 text-sm">
                 <div>• React.js (Advanced)</div>
                 <div>• TypeScript (Advanced)</div>
                 <div>• Next.js (Intermediate)</div>
                 <div>• Tailwind CSS (Advanced)</div>
                 <div>• JavaScript (Advanced)</div>
                 <div>• HTML5/CSS3 (Advanced)</div>
               </div>
             </div>
             
             <div className="space-y-2">
               <div className="text-terminal-accent font-semibold">⚙️ Backend Technologies:</div>
               <div className="grid grid-cols-2 gap-1 text-sm">
                 <div>• Node.js (Advanced)</div>
                 <div>• Express.js (Advanced)</div>
                 <div>• Prisma ORM (Intermediate)</div>
                 <div>• REST APIs (Advanced)</div>
                 <div>• GraphQL (Basic)</div>
                 <div>• JWT Authentication (Advanced)</div>
               </div>
             </div>
             
             <div className="space-y-2">
               <div className="text-terminal-accent font-semibold">🗄️ Databases:</div>
               <div className="grid grid-cols-2 gap-1 text-sm">
                 <div>• PostgreSQL (Advanced)</div>
                 <div>• MongoDB (Intermediate)</div>
                 <div>• Redis (Basic)</div>
                 <div>• Database Design (Advanced)</div>
               </div>
             </div>
             
             <div className="space-y-2">
               <div className="text-terminal-accent font-semibold">🛠️ Tools & DevOps:</div>
               <div className="grid grid-cols-2 gap-1 text-sm">
                 <div>• Git & GitHub (Advanced)</div>
                 <div>• Docker (Intermediate)</div>
                 <div>• AWS (Basic)</div>
                 <div>• Vercel (Advanced)</div>
                 <div>• Postman (Advanced)</div>
                 <div>• VS Code (Advanced)</div>
               </div>
             </div>
             
             <div className="text-terminal-foreground text-xs mt-2">
               Total skills: 30+ | Proficiency levels: Advanced (15), Intermediate (10), Basic (5)
             </div>
           </div>
         );
       }
     },
     'cat /etc/aadish/architecture-principles.txt': {
       description: 'Display architecture principles',
       usage: 'cat /etc/aadish/architecture-principles.txt',
       execute: () => {
         return (
           <div className="space-y-2">
             <div className="text-terminal-accent font-bold">Architecture Principles (/etc/aadish/architecture-principles.txt):</div>
             <div className="text-terminal-foreground text-sm font-mono">
               <div>✅ Scalability: Design for growth from day one</div>
               <div>✅ Modularity: Independent, replaceable components</div>
               <div>✅ Performance: Cache aggressively, optimize queries</div>
               <div>✅ Security: Defense in depth, zero trust model</div>
               <div>✅ Observability: Monitor everything, debug efficiently</div>
             </div>
             <div className="text-terminal-foreground text-xs mt-2">
               File size: 256 bytes | Last modified: Today | Owner: aadish
             </div>
           </div>
         );
       }
     },
     'message --to="aadish" --priority="high"': {
       description: 'Navigate to contact section',
       usage: 'message --to="aadish" --priority="high"',
       execute: () => {
         // Scroll to contact section
         const contactSection = document.getElementById('contact');
         if (contactSection) {
           contactSection.scrollIntoView({ behavior: 'smooth' });
           return (
             <div className="space-y-2">
               <div className="text-terminal-success">✅ High priority message sent to aadish</div>
               <div className="text-terminal-foreground text-sm">Navigating to Contact section...</div>
               <div className="text-terminal-warning text-xs">Message queued with high priority</div>
             </div>
           );
         }
         return <div className="text-terminal-error">❌ Contact section not found</div>;
       }
     },
     // Debug command to list all available commands
     'list-commands': {
       description: 'List all available command keys for debugging',
       usage: 'list-commands',
       execute: () => {
         const commandKeys = Object.keys(commands);
         return (
           <div className="space-y-2">
             <div className="text-terminal-accent font-bold">Available Command Keys:</div>
             <div className="text-terminal-foreground text-sm font-mono">
               {commandKeys.map((key, index) => (
                 <div key={index}>• "{key}"</div>
               ))}
             </div>
             <div className="text-terminal-foreground text-xs mt-2">
               Total commands: {commandKeys.length}
             </div>
           </div>
         );
       }
     }
  };

  // Handle project run commands
  const handleProjectCommand = (command: string) => {
    const project = projects.find(p => p.command === command);
    if (project) {
      return (
        <div className="space-y-3">
          <div className="text-terminal-accent font-bold">🚀 Running {project.name}...</div>
          <div className="text-terminal-foreground text-sm">{project.description}</div>
          <div className="space-y-2">
            <div className="text-terminal-warning">Starting process...</div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-terminal-accent rounded-full animate-pulse" />
              <span className="text-terminal-foreground">Loading dependencies...</span>
            </div>
            <div className="text-terminal-success">✅ Process started successfully!</div>
          </div>
          <div className="space-y-1 text-sm">
            <div className="text-terminal-accent">Available actions:</div>
            <div className="flex gap-2">
              <button 
                onClick={() => window.open(project.links.live, '_blank')}
                className="px-2 py-1 bg-terminal-accent/20 text-terminal-accent rounded text-xs hover:bg-terminal-accent/30"
              >
                🌐 Live Demo
              </button>
              <button 
                onClick={() => window.open(project.links.github, '_blank')}
                className="px-2 py-1 bg-terminal-accent/20 text-terminal-accent rounded text-xs hover:bg-terminal-accent/30"
              >
                📁 Source Code
              </button>
            </div>
          </div>
        </div>
      );
    }
    return <div className="text-terminal-error">Project command '{command}' not found. Type 'projects' to see available projects.</div>;
  };

  // Execute command
  const executeCommand = (command: string) => {
    const trimmedCommand = command.trim();
    if (!trimmedCommand) return null;

    console.log('Executing command:', trimmedCommand); // Debug log
    console.log('Available command keys:', Object.keys(commands)); // Debug log

    // First, try to find an exact match for the full command (for commands with spaces)
    if (commands[trimmedCommand as keyof typeof commands]) {
      console.log('Exact command match found:', trimmedCommand); // Debug log
      return commands[trimmedCommand as keyof typeof commands].execute([]);
    }

    const [cmd, ...args] = trimmedCommand.split(' ');
    console.log('Command:', cmd, 'Args:', args); // Debug log
    
    // Check if it's a project command
    if (cmd.startsWith('run-')) {
      console.log('Project command detected:', cmd); // Debug log
      return handleProjectCommand(cmd);
    }

    // Check if it's a built-in command
    if (commands[cmd as keyof typeof commands]) {
      console.log('Built-in command found:', cmd); // Debug log
      return commands[cmd as keyof typeof commands].execute(args);
    }

    console.log('Command not found:', cmd); // Debug log
    return <div className="text-terminal-error">Command '{trimmedCommand}' not found. Type 'help' for available commands.</div>;
  };

  // Handle command submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with value:', inputValue); // Debug log
    
    if (!inputValue.trim()) {
      console.log('Empty input, returning'); // Debug log
      return;
    }

    const output = executeCommand(inputValue);
    console.log('Command output:', output); // Debug log
    
    // Always add to history, even if output is null (for clear command)
    setCommandHistory(prev => {
      console.log('Previous history length:', prev.length); // Debug log
      const newHistory = [...prev, {
        command: inputValue,
        output: output || <div className="text-terminal-foreground">Command executed</div>,
        timestamp: new Date()
      }];
      console.log('New history length:', newHistory.length); // Debug log
      return newHistory;
    });

    setInputValue('');
    setHistoryIndex(-1);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log('Enter key pressed, submitting form'); // Debug log
      // Create a synthetic form event
      const syntheticEvent = {
        preventDefault: () => {},
        target: { value: inputValue }
      } as any;
      handleSubmit(syntheticEvent);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[commandHistory.length - 1 - newIndex].command);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[commandHistory.length - 1 - newIndex].command);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputValue('');
      }
    }
  };

  // Handle terminal closing with animation
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      setIsMaximized(false);
      setIsHalfSize(true);
    }, 300); // Match the animation duration
  };

  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Scroll to bottom when new commands are added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  // Welcome message
  useEffect(() => {
    if (isOpen && commandHistory.length === 0) {
      setCommandHistory([{
        command: '',
        output: (
          <div className="space-y-2">
            <div className="text-terminal-accent font-bold">Welcome to Aadish Terminal v2.0.1</div>
            <div className="text-terminal-foreground text-sm">
              Type 'help' to see available commands.<br/>
              Type 'projects' to see all portfolio projects.<br/>
              Type 'run-[projectname]' to run a specific project.
            </div>
            <div className="text-terminal-warning text-xs">
              💡 Tip: Use arrow keys to navigate command history
            </div>
          </div>
        ),
        timestamp: new Date()
      }]);
    }
  }, [isOpen, commandHistory.length]);

  // Debug: Log when terminal opens
  useEffect(() => {
    if (isOpen) {
      console.log('Terminal opened, commandHistory length:', commandHistory.length);
    }
  }, [isOpen, commandHistory.length]);

  // Disable background scrolling when terminal is open
  useEffect(() => {
    if (isOpen) {
      if (isHalfSize) {
        // Allow background scrolling in half-size mode
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      } else {
        // Disable scrolling on body for full-screen modes
        document.body.style.overflow = 'hidden';
        // Also disable scrolling on html element for some browsers
        document.documentElement.style.overflow = 'hidden';
      }
    } else {
      // Re-enable scrolling when terminal closes
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    // Cleanup function to re-enable scrolling if component unmounts
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen, isHalfSize]);

  if (!bootingComplete) {
    return null; // Hide terminal until booting is complete
  }

  if (!isOpen) {
    return (
                    <Button
          onClick={() => {
            setIsOpen(true);
            setIsMaximized(false);
            setIsHalfSize(true);
          }}
          className="fixed bottom-6 right-6 z-50 bg-terminal-bg hover:bg-terminal-bg/80 text-terminal-foreground border-terminal-accent/30 hover:border-terminal-accent/50 hidden md:flex"
          size="lg"
        >
        <TerminalIcon className="mr-2" size={20} />
        Open Terminal
      </Button>
    );
  }

     return (
     <div className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
       isClosing ? 'opacity-0' : 'opacity-100'
     } ${isMaximized ? '' : isHalfSize ? '' : 'p-6'}`}>
              <div className={`terminal bg-terminal-bg border border-terminal-accent/30 shadow-2xl flex flex-col transition-all duration-300 ease-in-out ${
                isMaximized ? 'rounded-none h-full' : 
                isHalfSize ? `w-full h-1/2 bottom-0 absolute ${isClosing ? 'translate-y-full' : 'translate-y-0'}` : 
                'rounded-t-lg h-full'
              }`}>
                 {/* Terminal Header */}
         <div className="flex items-center justify-between p-3 border-b border-terminal-accent/20 bg-terminal-bg/80 backdrop-blur-sm rounded-t-lg">
          <div className="flex items-center gap-3">
            <TerminalIcon className="text-terminal-accent" size={16} />
            <span className="text-terminal-foreground font-mono text-sm">aadish@terminal ~ %</span>
          </div>
          
                                                                                     <div className="flex gap-2">
               {isMaximized && (
                 <button
                   onClick={() => {
                     setIsMaximized(false);
                     setIsHalfSize(true);
                   }}
                   className="w-3 h-3 rounded-full bg-terminal-warning hover:bg-terminal-warning/80 transition-colors"
                   title="Minimize to Half Size"
                 />
               )}
               {!isMaximized && (
                 <button
                   onClick={() => {
                     setIsMaximized(true);
                     setIsHalfSize(false);
                   }}
                   className="w-3 h-3 rounded-full bg-terminal-accent hover:bg-terminal-accent/80 transition-colors"
                   title="Maximize"
                 />
               )}
                                                           <button
                   onClick={handleClose}
                   className="w-3 h-3 rounded-full bg-terminal-error hover:bg-terminal-error/80 transition-colors"
                   title="Close"
                 />
             </div>
        </div>

                 {/* Terminal Body */}
         <div className="flex-1 overflow-hidden">
           {isHalfSize ? (
              <div ref={terminalRef} className="h-full overflow-y-auto p-4 space-y-3">
                {commandHistory.map((entry, index) => (
                  <div key={index} className="space-y-2">
                    {entry.command && (
                      <div className="flex items-center gap-2">
                        <span className="text-terminal-accent">$</span>
                        <span className="text-terminal-accent font-mono">{entry.command}</span>
                      </div>
                    )}
                    {entry.output && (
                      <div className="ml-4 text-terminal-foreground">
                        {entry.output}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Input Line */}
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                  <span className="text-terminal-accent">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => {
                      console.log('Input changed:', e.target.value);
                      setInputValue(e.target.value);
                    }}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent text-terminal-foreground font-mono outline-none border-none placeholder:text-terminal-foreground/60"
                    placeholder="Type a command..."
                    autoComplete="off"
                  />
                  <div className="w-2 h-4 bg-terminal-accent animate-pulse" />
                  <button 
                    type="submit" 
                    className="px-2 py-1 bg-terminal-accent/20 text-terminal-accent rounded text-xs hover:bg-terminal-accent/30"
                  >
                    Enter
                  </button>
                </form>
              </div>
            ) : (
            <div ref={terminalRef} className="h-full overflow-y-auto p-4 space-y-3">
                             {commandHistory.map((entry, index) => (
                 <div key={index} className="space-y-2">
                   {entry.command && (
                     <div className="flex items-center gap-2">
                       <span className="text-terminal-accent">$</span>
                       <span className="text-terminal-foreground font-mono">{entry.command}</span>
                     </div>
                   )}
                   {entry.output && (
                     <div className="ml-4 text-terminal-foreground">
                       {entry.output}
                       {/* Ensure all text in output has proper terminal colors */}
                     </div>
                   )}
                 </div>
               ))}
              
                             {/* Input Line */}
               <form onSubmit={handleSubmit} className="flex items-center gap-2">
                 <span className="text-terminal-accent">$</span>
                 <input
                   ref={inputRef}
                   type="text"
                   value={inputValue}
                   onChange={(e) => {
                     console.log('Input changed:', e.target.value); // Debug log
                     setInputValue(e.target.value);
                   }}
                   onKeyDown={handleKeyDown}
                   className="flex-1 bg-transparent text-terminal-foreground font-mono outline-none border-none placeholder:text-terminal-foreground/60"
                   placeholder="Type a command..."
                   autoComplete="off"

                 />
                 <div className="w-2 h-4 bg-terminal-accent animate-pulse" />
                 <button 
                   type="submit" 
                   className="px-2 py-1 bg-terminal-accent/20 text-terminal-accent rounded text-xs hover:bg-terminal-accent/30"
                 >
                   Enter
                 </button>
               </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Terminal;