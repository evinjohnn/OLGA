import { Facebook, Twitter, Instagram, Linkedin, Send, ArrowUp } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Company Info */}
          <div className="col-span-1">
            <h3 className="text-2xl font-bold mb-6">OLGA</h3>
            <p className="text-gray-400 mb-6">
              Powering Kerala for a Brighter Tomorrow with innovative solar energy solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-sky-600 hover:bg-sky-700 p-2 rounded-full transition duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="bg-sky-600 hover:bg-sky-700 p-2 rounded-full transition duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" className="bg-sky-600 hover:bg-sky-700 p-2 rounded-full transition duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="bg-sky-600 hover:bg-sky-700 p-2 rounded-full transition duration-300">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          {/* Services */}
          <div className="col-span-1">
            <h3 className="font-bold text-lg mb-6">Our Services</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Solar Panel Installation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Energy Assessments</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Maintenance & Support</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Consultation Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Commercial Solutions</a></li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-400 hover:text-white transition duration-300">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition duration-300">About Us</a></li>
              <li><a href="#products" className="text-gray-400 hover:text-white transition duration-300">Our Products</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition duration-300">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Privacy Policy</a></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="font-bold text-lg mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <div className="flex">
              <Input 
                placeholder="Your email" 
                className="bg-gray-800 border-gray-700 text-white focus:ring-sky-500 focus:border-sky-500 rounded-l-md"
              />
              <Button 
                className="bg-sky-600 hover:bg-sky-700 rounded-l-none"
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>
        
        {/* Copyright and Back to top */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} OLGA Solar. All rights reserved.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="flex items-center text-gray-400 hover:text-white mt-4 md:mt-0 transition duration-300"
          >
            Back to top
            <ArrowUp size={16} className="ml-2" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;