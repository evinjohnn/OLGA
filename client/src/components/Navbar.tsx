import { useState, useEffect } from 'react';
import { Button } from "../components/ui/button";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  // Handle scrolling effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Smooth scrolling function
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/10 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-7'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex space-x-10 text-white font-medium">
          <a 
            href="#home" 
            onClick={(e) => scrollToSection(e, 'home')}
            className="hover:text-white transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all hover:after:w-full"
          >
            Home
          </a>
          <a 
            href="#about" 
            onClick={(e) => scrollToSection(e, 'about')}
            className="hover:text-white transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all hover:after:w-full"
          >
            About Us
          </a>
          <a 
            href="#products" 
            onClick={(e) => scrollToSection(e, 'products')}
            className="hover:text-white transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all hover:after:w-full"
          >
            Our Products
          </a>
          <a 
            href="#contact" 
            onClick={(e) => scrollToSection(e, 'contact')}
            className="hover:text-white transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all hover:after:w-full"
          >
            Contact
          </a>
        </div>
        <Button 
          onClick={(e) => scrollToSection(e as any, 'contact')}
          className="bg-white text-sky-600 hover:bg-white/90 hover:shadow-md rounded-full px-6 py-1 transition-all duration-300 transform hover:scale-105"
        >
          Register
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;