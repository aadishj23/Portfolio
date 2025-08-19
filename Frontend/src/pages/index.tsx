import { useEffect } from 'react';
import WelcomeScreen from '@/components/WelcomeScreen';
import ProjectsSection from '@/components/ProjectsSection';
import JourneySection from '@/components/JourneySection';
import WorkExperienceSection from '@/components/WorkExperienceSection';
import SkillsSection from '@/components/SkillsSection';
import StackSection from '@/components/StackSection';
import PersonalSection from '@/components/PersonalSection';
import ContactSection from '@/components/ContactSection';
import Terminal from '@/components/Terminal';
import FloatingNavbar from '@/components/FloatingNavbar';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import { BootProvider, useBootContext } from '@/contexts/BootContext';

const IndexContent = () => {
  const { bootingComplete } = useBootContext();

  useEffect(() => {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Custom cursor interactions
    const handleMouseMove = (e: MouseEvent) => {
      const interactiveElements = document.querySelectorAll('.interactive-hover');
      interactiveElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isHovering = e.clientX >= rect.left && e.clientX <= rect.right && 
                          e.clientY >= rect.top && e.clientY <= rect.bottom;
        
        if (isHovering) {
          document.body.style.cursor = 'pointer';
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Control scrolling based on boot state
  useEffect(() => {
    const scrollContainer = document.querySelector('.scroll-snap-container');
    
    if (!bootingComplete) {
      // Disable scrolling during boot sequence
      if (scrollContainer) {
        (scrollContainer as HTMLElement).style.overflow = 'hidden';
        (scrollContainer as HTMLElement).style.height = '100vh';
      }
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.classList.add('no-scroll');
    } else {
      // Re-enable scrolling after boot sequence
      if (scrollContainer) {
        (scrollContainer as HTMLElement).style.overflow = '';
        (scrollContainer as HTMLElement).style.height = '';
      }
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.classList.remove('no-scroll');
    }
  }, [bootingComplete]);

  return (
    <div className="scroll-snap-container custom-scrollbar">
      <ScrollProgressBar />
      <WelcomeScreen />
      <ProjectsSection />
      <JourneySection />
      <WorkExperienceSection />
      <SkillsSection />
      <StackSection />
      <PersonalSection />
      <ContactSection />
      <Terminal />
      <FloatingNavbar />
    </div>
  );
};

const Index = () => (
  <BootProvider>
    <IndexContent />
  </BootProvider>
);

export default Index;