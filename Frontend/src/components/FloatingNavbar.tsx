import { useState, useEffect, useCallback, useRef, memo } from 'react';
import { Home, Code, BookOpen, Briefcase, Folder, Layers, User, Mail, Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const navItems: NavItem[] = [
  { id: 'welcome', label: 'Back to top', icon: <Home size={16} />, color: 'electric' },
  { id: 'projects', label: 'Projects', icon: <Code size={16} />, color: 'electric' },
  { id: 'journey', label: 'My Journey', icon: <BookOpen size={16} />, color: 'neon' },
  { id: 'work-experience', label: 'Work Experience', icon: <Briefcase size={16} />, color: 'hot' },
  { id: 'skills', label: 'Skills', icon: <Folder size={16} />, color: 'electric' },
  { id: 'stack', label: 'My Stack', icon: <Layers size={16} />, color: 'neon' },
  { id: 'personal', label: 'Personal', icon: <User size={16} />, color: 'hot' },
  { id: 'contact', label: 'Contact', icon: <Mail size={16} />, color: 'electric' }
];

// Desktop Navigation (memoized, imperatively animated to avoid rerenders on scroll)
const DesktopFloatingNav = memo(() => {
  const controls = useAnimationControls();
  const isNavigatingRef = useRef(false);

  const getWelcomeBottom = () => {
    const welcome = document.getElementById('welcome');
    if (welcome) {
      return welcome.offsetTop + welcome.offsetHeight;
    }
    // Fallback threshold if welcome not found
    return 120;
  };

  const updateVisibility = useCallback(() => {
    if (isNavigatingRef.current) return;
    const threshold = getWelcomeBottom();
    const show = window.scrollY >= threshold;
    controls.start({ opacity: show ? 1 : 0, y: show ? 0 : -20, transition: { duration: 0.3, ease: 'easeOut' } });
  }, [controls]);

  useEffect(() => {
    // Initialize visibility
    updateVisibility();
    // Listen to scroll without causing React state updates
    window.addEventListener('scroll', updateVisibility, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateVisibility);
    };
  }, [updateVisibility]);

  const waitUntilSectionReached = useCallback((sectionId: string): Promise<void> => {
    return new Promise((resolve) => {
      const tolerance = 24; // px
      const timeoutMs = 10000;
      const startedAt = performance.now();
      const check = () => {
        // welcome -> top of page
        if (sectionId === 'welcome') {
          if (window.scrollY <= tolerance) {
            resolve();
            return;
          }
        } else {
          const el = document.getElementById(sectionId);
          if (!el) {
            resolve();
            return;
          }
          const top = el.getBoundingClientRect().top;
          if (Math.abs(top) <= tolerance) {
            resolve();
            return;
          }
        }
        if (performance.now() - startedAt > timeoutMs) {
          resolve();
          return;
        }
        requestAnimationFrame(check);
      };
      requestAnimationFrame(check);
    });
  }, []);

  const handleClick = useCallback(async (sectionId: string) => {
    // Hide immediately with animation
    await controls.start({ opacity: 0, y: -20, transition: { duration: 0.2, ease: 'easeIn' } });

    // Smooth scroll to target
    isNavigatingRef.current = true;
    if (sectionId === 'welcome') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    // Wait until the target section is reached, then reappear if past welcome
    await waitUntilSectionReached(sectionId);
    const threshold = getWelcomeBottom();
    const shouldShow = window.scrollY >= threshold;
    if (shouldShow) {
      await controls.start({ opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } });
    }
    isNavigatingRef.current = false;
  }, [controls, waitUntilSectionReached]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={controls}
      className="hidden lg:flex items-center gap-2 bg-background/95 backdrop-blur-md border border-border/50 rounded-full px-6 py-3 shadow-soft"
      style={{
        position: 'fixed',
        top: '2rem',
        left: '0',
        right: '0',
        margin: '0 auto',
        width: 'fit-content',
        zIndex: 1000
      }}
    >
      {navItems.map((item) => (
        <motion.button
          key={item.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          onClick={() => handleClick(item.id)}
          className={`relative overflow-hidden flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-accent/20 hover:text-${item.color} group text-foreground`}
        >
          <span className={`text-${item.color} group-hover:scale-110 transition-transform duration-200`}>
            {item.icon}
          </span>
          <span className={`group-hover:text-${item.color} transition-colors duration-200`}>
            {item.label}
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
});
DesktopFloatingNav.displayName = 'DesktopFloatingNav';

const FloatingNavbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);
  const [activeSection, setActiveSection] = useState('welcome');
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  // Scroll progress calculation
  const updateScrollProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    setScrollProgress(progress);
  }, []);

  // Show navbar on scroll down, hide on scroll up with debouncing
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const lastScrollY = window.lastScrollY || 0;

    // Close mobile menu when scrolling
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }

    // Determine active section based on scroll position
    const sections = navItems.map(item => item.id);
    let newActiveSection = 'welcome';
    
    for (let i = sections.length - 1; i >= 0; i--) {
      const element = document.getElementById(sections[i]);
      if (element && element.offsetTop <= currentScrollY + 200) {
        newActiveSection = sections[i];
        break;
      }
    }
    
    if (newActiveSection !== activeSection) {
      setActiveSection(newActiveSection);
    }

    // Clear existing scroll timeout
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    
         // Set new scroll timeout for debouncing
    const newScrollTimeout = setTimeout(() => {
      // Determine threshold: top of 'projects' section if available, else 100px
      const projectsEl = document.getElementById('projects');
      const threshold = projectsEl ? Math.max(0, projectsEl.offsetTop - 50) : 100;

      if (currentScrollY >= threshold) {
        setIsVisible(true);
        setIsExpanded(true);
      } else {
        setIsVisible(false);
        setIsExpanded(false);
      }
    }, 150); // 150ms delay after scrolling stops

    setScrollTimeout(newScrollTimeout);
    
    // Clear existing hide timeout and set new one
    if (hideTimeout) {
      clearTimeout(hideTimeout);
    }

    const newTimeout = setTimeout(() => {
      if (isVisible && !isExpanded) {
        setIsVisible(false);
      }
    }, 3000);

    setHideTimeout(newTimeout);
    window.lastScrollY = currentScrollY;
    updateScrollProgress();
  }, [isMobileMenuOpen, activeSection, updateScrollProgress]);

  // Smooth scroll to section (mobile only)
  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'welcome') {
      // Scroll to top for welcome section
      window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
      });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
    
    // Close mobile menu if open
    setIsMobileMenuOpen(false);
  };

  // Handle scroll events
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [handleScroll]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {};
  }, []);

  // Mobile Navigation - Floating Action Button with Expanding Options
  const MobileNav = () => (
    <div className="lg:hidden">
      {/* Scroll Progress Indicator */}
      {isVisible && (
        <div className="floating-navbar-mobile">
                 {/* Main FAB */}
         <motion.button
           whileHover={{ scale: 1.1 }}
           whileTap={{ scale: 0.9 }}
           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
           className="relative w-10 h-10 bg-gradient-accent rounded-full shadow-glow flex items-center justify-center text-white z-10"
         >
                                   <motion.div
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.div>
         </motion.button>

        {/* Scroll Progress Ring */}
        <svg className="absolute inset-0 w-10 h-10 transform -rotate-90 z-0" viewBox="0 0 40 40">
          <circle
            cx="20"
            cy="20"
            r="18"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-electric/30"
          />
          <circle
            cx="20"
            cy="20"
            r="18"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 18}`}
            strokeDashoffset={`${2 * Math.PI * 18 * (1 - scrollProgress / 100)}`}
            className="text-electric transition-all duration-300"
            strokeLinecap="round"
          />
        </svg>

        {/* Expanding Navigation Options */}
        <AnimatePresence>
          {isMobileMenuOpen && (
                        <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-12 left-0 w-64 bg-background/95 backdrop-blur-md border border-border/50 rounded-2xl shadow-soft p-4"
            >
             <div className="grid grid-cols-2 gap-3">
               {navItems.map((item, index) => (
                 <motion.button
                   key={item.id}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ 
                     opacity: 1, 
                     x: 0,
                     transition: { delay: index * 0.05 }
                   }}
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={() => scrollToSection(item.id)}
                   className={`flex flex-col items-center gap-2 p-3 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-accent/20 group ${
                     activeSection === item.id 
                       ? `bg-${item.color}/20 text-${item.color} border border-${item.color}/30` 
                       : 'text-foreground'
                   }`}
                 >
                   <span className={`text-${item.color} group-hover:scale-110 transition-transform duration-200`}>
                     {item.icon}
                   </span>
                   <span className={`text-xs text-center transition-colors duration-200 ${
                     activeSection === item.id ? `text-${item.color}` : 'text-foreground'
                   }`}>
                     {item.label}
                   </span>
                 </motion.button>
               ))}
             </div>
           </motion.div>
         )}
       </AnimatePresence>
     </div>
      )}
    </div>
  );

  return (
    <>
      <DesktopFloatingNav />
      <MobileNav />
    </>
  );
};

export default FloatingNavbar;
