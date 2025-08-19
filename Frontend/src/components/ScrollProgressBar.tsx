import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBootContext } from '@/contexts/BootContext';

const ScrollProgressBar = () => {
  const { bootingComplete } = useBootContext();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const updateScrollProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    setScrollProgress(progress);
    
    // Show progress bar when scrolling
    setIsVisible(true);
    setIsScrolling(true);
    
    // Clear any existing scroll end detection
    clearTimeout(window.scrollEndTimeout);
    
    // Set a timeout to detect when scrolling stops
    window.scrollEndTimeout = setTimeout(() => {
      setIsScrolling(false);
      // Only hide if we're at the top (0% progress) or bottom (100% progress)
      if (progress <= 0 || progress >= 100) {
        setIsVisible(false);
      }
    }, 150);
  }, []);

  useEffect(() => {
    // Add the timeout property to window for cleanup
    (window as any).scrollEndTimeout = null;
    
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      if ((window as any).scrollEndTimeout) {
        clearTimeout((window as any).scrollEndTimeout);
      }
    };
  }, [updateScrollProgress]);

  // Don't render if boot sequence is not complete
  if (!bootingComplete) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ 
            opacity: 1, 
            scaleX: scrollProgress / 100 
          }}
          exit={{ opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 w-full h-0.5 bg-gradient-accent origin-left z-[999]"
        />
      )}
    </AnimatePresence>
  );
};

export default ScrollProgressBar;
