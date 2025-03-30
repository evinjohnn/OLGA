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
      {/* Background with semi-transparent overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={owlImage} 
          alt="Owl on solar panel - OLGA Solar Energy" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-gray-500/20 to-black/40"></div>
        
        {/* Particle animation canvas */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 z-10 pointer-events-none"
        />
      </div>
      
      {/* Main Hero Content */}
      <div className="relative z-20 h-full flex flex-col justify-between pt-32 pb-16">
        {/* Solar energy quote - moved to top */}
        <div className="w-full px-8">
          <div className="max-w-md mx-auto md:mx-0 text-white glass-dark p-4 rounded-lg mt-20 md:mt-12 md:ml-12">
            <p className="text-sm md:text-base">
              Solar energy is one of the most abundant and sustainable resources available to us. Harness the power of the sun with OLGA.
            </p>
          </div>
        </div>
        
        {/* Main OLGA text */}
        <div className="w-full px-8 pb-16">
          <div className="mb-8 md:mb-0">
            <h1 className="text-white text-[100px] md:text-[150px] font-bold leading-none tracking-wide drop-shadow-lg">OLGA</h1>
            <p className="text-white text-xl mt-2 drop-shadow-md">Powering Kerala for a Brighter Tomorrow.</p>
            <Button 
              onClick={() => scrollDown()}
              className="btn-glow mt-6 bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:from-sky-600 hover:to-blue-700"
            >
              Learn More
            </Button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center animate-bounce">
          <span className="text-sm mb-1">Scroll Down</span>
          <ChevronDown className="h-5 w-5" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;