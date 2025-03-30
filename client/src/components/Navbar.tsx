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
      const sections = ['home', 'about', 'products', 'blog', 'contact'];
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
        scrolled ? 'py-3 backdrop-blur-sm' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex space-x-10 text-white font-light">
          <a 
            href="#home" 
            onClick={(e) => scrollToSection(e, 'home')}
            className={`hover:text-white transition-all duration-300 ${
              activeSection === 'home' ? 'text-white' : 'text-white/80'
            }`}
          >
            Home
          </a>
          <a 
            href="#about" 
            onClick={(e) => scrollToSection(e, 'about')}
            className={`hover:text-white transition-all duration-300 ${
              activeSection === 'about' ? 'text-white' : 'text-white/80'
            }`}
          >
            About Us
          </a>
          <a 
            href="#products" 
            onClick={(e) => scrollToSection(e, 'products')}
            className={`hover:text-white transition-all duration-300 ${
              activeSection === 'products' ? 'text-white' : 'text-white/80'
            }`}
          >
            Our Products
          </a>
          <a 
            href="#blog" 
            onClick={(e) => scrollToSection(e, 'blog')}
            className={`hover:text-white transition-all duration-300 ${
              activeSection === 'blog' ? 'text-white' : 'text-white/80'
            }`}
          >
            Blog
          </a>
        </div>
        <Button 
          onClick={(e) => scrollToSection(e as any, 'contact')}
          className="text-white font-normal hover:bg-white/10 transition-all duration-300 rounded-md px-5 py-1"
          variant="ghost"
        >
          Register
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;