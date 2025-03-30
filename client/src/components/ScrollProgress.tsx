import { useState, useEffect, useRef } from 'react';
import { SunIcon } from 'lucide-react';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimerRef = useRef<number | null>(null);
  
  useEffect(() => {
    // Calculate scroll progress
    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      // Calculate progress percentage
      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(Math.max(scrollPercentage, 0), 100));
      
      // Set scrolling state for animation
      if (!isScrolling) {
        setIsScrolling(true);
        // Reset scrolling state after a delay
        if (scrollTimerRef.current) {
          window.clearTimeout(scrollTimerRef.current);
        }
        scrollTimerRef.current = window.setTimeout(() => {
          setIsScrolling(false);
        }, 150);
      }
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', calculateScrollProgress);
    
    // Initial calculation
    calculateScrollProgress();
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', calculateScrollProgress);
      if (scrollTimerRef.current) {
        window.clearTimeout(scrollTimerRef.current);
      }
    };
  }, [isScrolling]);
  
  return (
    <div className="fixed top-0 left-0 w-full z-50 pointer-events-none">
      {/* Solar-themed progress bar */}
      <div className="h-1 bg-transparent relative">
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-300 via-yellow-500 to-orange-500 transition-all ease-out"
          style={{ width: `${scrollProgress}%` }}
        >
          {/* Sun icon that moves with the progress */}
          <div 
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 
              ${isScrolling ? 'animate-pulse' : ''} text-yellow-500`}
          >
            <SunIcon className="h-4 w-4 drop-shadow-glow" />
          </div>
        </div>
        
        {/* Subtle solar panel grid pattern overlay */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="w-full h-full solar-grid-pattern opacity-15"></div>
        </div>
      </div>
    </div>
  );
};

export default ScrollProgress;