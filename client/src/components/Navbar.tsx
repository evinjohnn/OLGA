import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event to add shadow to navbar when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed w-full bg-white z-50 transition-shadow ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-3xl font-bold text-[#008FD5] font-montserrat">OLGA</span>
          <span className="ml-2 text-[#00BF63] font-medium">SOLAR</span>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu} 
          className="md:hidden focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="text-[#1E293B] h-6 w-6" />
          ) : (
            <Menu className="text-[#1E293B] h-6 w-6" />
          )}
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="#home" className="font-medium text-[#1E293B] hover:text-[#008FD5] transition-colors">Home</a>
          <a href="#about" className="font-medium text-[#1E293B] hover:text-[#008FD5] transition-colors">About Us</a>
          <a href="#products" className="font-medium text-[#1E293B] hover:text-[#008FD5] transition-colors">Our Products</a>
          <a href="#contact" className="font-medium text-[#1E293B] hover:text-[#008FD5] transition-colors">Contact</a>
        </nav>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div className={`md:hidden bg-white w-full shadow-md ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
          <a 
            href="#home" 
            className="py-2 font-medium text-[#1E293B] hover:text-[#008FD5] transition-colors"
            onClick={closeMobileMenu}
          >
            Home
          </a>
          <a 
            href="#about" 
            className="py-2 font-medium text-[#1E293B] hover:text-[#008FD5] transition-colors"
            onClick={closeMobileMenu}
          >
            About Us
          </a>
          <a 
            href="#products" 
            className="py-2 font-medium text-[#1E293B] hover:text-[#008FD5] transition-colors"
            onClick={closeMobileMenu}
          >
            Our Products
          </a>
          <a 
            href="#contact" 
            className="py-2 font-medium text-[#1E293B] hover:text-[#008FD5] transition-colors"
            onClick={closeMobileMenu}
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
