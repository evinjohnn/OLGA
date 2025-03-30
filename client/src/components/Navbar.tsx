import { useState, useEffect } from 'react';
import { Button } from "../components/ui/button";
import { Menu } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isOpen, setIsOpen] = useState(false);

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
      setIsOpen(false); // Close mobile menu when a link is clicked
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      setActiveSection(id);
      setIsOpen(false); // Close mobile menu when button is clicked
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-2 backdrop-blur-sm bg-black/30' : 'bg-transparent py-3'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">OLGA</h1>
        
        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col justify-center items-center w-10 h-10 bg-white/10 backdrop-blur-md rounded-full border border-white/20 transition-all"
            aria-label="Menu"
          >
            <div className={`w-5 h-0.5 bg-white mb-1 transition-all ${isOpen ? 'transform rotate-45 translate-y-1.5' : ''}`}></div>
            <div className={`w-5 h-0.5 bg-white mb-1 transition-all ${isOpen ? 'opacity-0' : 'opacity-100'}`}></div>
            <div className={`w-5 h-0.5 bg-white transition-all ${isOpen ? 'transform -rotate-45 -translate-y-1.5' : ''}`}></div>
          </button>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-6 text-white">
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
            Our Products
          </a>
        </div>
        
        {/* Register Button (desktop) */}
        <Button 
          onClick={(e) => handleButtonClick(e, 'contact')}
          className="hidden lg:flex text-white font-medium border border-white/20 backdrop-blur-md bg-blue-500/70 hover:bg-blue-600/70 transition-all duration-300 rounded-full px-6 py-2 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
          variant="ghost"
        >
          Register Now →
        </Button>
      </div>
      
      {/* Mobile menu dropdown */}
      <div 
        className={`lg:hidden absolute w-full bg-black/80 backdrop-blur-lg transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-80 opacity-100 border-b border-white/10' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
          <a 
            href="#home" 
            onClick={(e) => scrollToSection(e, 'home')}
            className={`px-4 py-2 transition-all duration-300 rounded-full ${
              activeSection === 'home' 
                ? 'bg-white/10 text-white' 
                : 'text-white/90 hover:text-white'
            }`}
          >
            Home
          </a>
          <a 
            href="#about" 
            onClick={(e) => scrollToSection(e, 'about')}
            className={`px-4 py-2 transition-all duration-300 rounded-full ${
              activeSection === 'about' 
                ? 'bg-white/10 text-white' 
                : 'text-white/90 hover:text-white'
            }`}
          >
            About Us
          </a>
          <a 
            href="#products" 
            onClick={(e) => scrollToSection(e, 'products')}
            className={`px-4 py-2 transition-all duration-300 rounded-full ${
              activeSection === 'products' 
                ? 'bg-white/10 text-white' 
                : 'text-white/90 hover:text-white'
            }`}
          >
            Our Products
          </a>
          <Button 
            onClick={(e) => handleButtonClick(e, 'contact')}
            className="w-full text-white font-medium border border-white/20 backdrop-blur-md bg-blue-500/70 hover:bg-blue-600/70 transition-all duration-300 rounded-full py-2"
            variant="ghost"
          >
            Register Now →
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;