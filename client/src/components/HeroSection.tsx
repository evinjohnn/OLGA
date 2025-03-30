import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import owlImage from "../assets/erik-karits-BF16q77A1MY-unsplash.jpg";
import { Button } from "../components/ui/button";

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<any[]>([]);
  const animationRef = useRef<number>();
  
  // Scroll hint animation
  const scrollDown = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      window.scrollTo({
        top: aboutSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };
  
  // Initialize and animate particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    
    // Generate particles
    const generateParticles = () => {
      const colors = ['#ffffff', '#87CEEB', '#ADD8E6', '#E0FFFF'];
      particlesRef.current = [];
      
      for (let i = 0; i < 50; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.2 - 0.1,
          opacity: Math.random() * 0.5 + 0.3,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };
    
    generateParticles();
    
    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
        
        // Update particle position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Reset particles that go off-screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Handle window resize
    const handleResize = () => {
      setCanvasDimensions();
      generateParticles();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  return (
    <section id="home" className="h-screen w-full relative overflow-hidden">
      {/* Background image only, no overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={owlImage} 
          alt="Owl on solar panel - OLGA Solar Energy" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Subtle particle animation */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-10 pointer-events-none opacity-30"
      />
      
      {/* Minimal Hero Content */}
      <div className="relative z-20 h-full container mx-auto px-6 flex flex-col justify-between">
        {/* Top navigation area - empty for spacing */}
        <div className="h-24"></div>
        
        {/* Main content flex layout */}
        <div className="flex flex-col md:flex-row justify-between items-start">
          {/* OLGA text on the left/bottom */}
          <div className="md:mt-auto pb-12 md:pb-28">
            <h1 className="hero-title text-white">OLGA</h1>
            <p className="hero-subtitle text-white text-lg md:text-xl mt-1">Powering Kerala for a Brighter Tomorrow.</p>
          </div>
          
          {/* Solar energy text on the right */}
          <div className="md:self-end max-w-xs mt-auto pb-16 md:pb-28">
            <p className="text-white text-sm leading-relaxed">
              Solar energy is one of the most abundant and sustainable resources available to us. Harness the power of the sun with OLGA.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;