import { useEffect } from 'react';
import WelcomeScreen from '@/components/WelcomeScreen';
import ProjectsSection from '@/components/ProjectsSection';
import JourneySection from '@/components/JourneySection';
import WorkExperienceSection from '@/components/WorkExperienceSection';
import SkillsSection from '@/components/SkillsSection';
import StackSection from '@/components/StackSection';
import PersonalSection from '@/components/PersonalSection';
import ContactSection from '@/components/ContactSection';


const Index = () => {
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

  return (
    <div className="scroll-snap-container custom-scrollbar">
      <WelcomeScreen />
      <ProjectsSection />
      <JourneySection />
      <WorkExperienceSection />
      <SkillsSection />
      <StackSection />
      <PersonalSection />
      <ContactSection />
    </div>
  );
};

export default Index;