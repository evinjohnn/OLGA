import { useState, useEffect } from 'react';
import { Button } from "../components/ui/button";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle scrolling effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
      
      // Determine active section based on scroll position
      const sections = ['home', 'about', 'products', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      
      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled, activeSection]);

  // Smooth scrolling function
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-3 backdrop-blur-sm bg-transparent' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex space-x-8 text-white">
          <a 
            href="#home" 
            onClick={(e) => scrollToSection(e, 'home')}
            className={`px-5 py-2 transition-all duration-300 rounded-full ${
              activeSection === 'home' 
                ? 'border border-white/20 backdrop-blur-md bg-white/10 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]' 
                : 'text-white/90 hover:text-white'
            }`}
          >
            Home
          </a>
          <a 
            href="#about" 
            onClick={(e) => scrollToSection(e, 'about')}
            className={`px-5 py-2 transition-all duration-300 rounded-full ${
              activeSection === 'about' 
                ? 'border border-white/20 backdrop-blur-md bg-white/10 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]' 
                : 'text-white/90 hover:text-white'
            }`}
          >
            About Us
          </a>
          <a 
            href="#products" 
            onClick={(e) => scrollToSection(e, 'products')}
            className={`px-5 py-2 transition-all duration-300 rounded-full ${
              activeSection === 'products' 
                ? 'border border-white/20 backdrop-blur-md bg-white/10 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]' 
                : 'text-white/90 hover:text-white'
            }`}
          >
            Our Product
          </a>
        </div>
        <Button 
          onClick={(e) => scrollToSection(e as any, 'contact')}
          className="text-white font-medium border border-white/20 backdrop-blur-md bg-blue-500/70 hover:bg-blue-600/70 transition-all duration-300 rounded-full px-6 py-2 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
          variant="ghost"
        >
          Register Now →
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;