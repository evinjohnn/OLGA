import { Facebook, Twitter, Instagram, Linkedin, Send, ArrowUp, ShieldCheck } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link } from "wouter";

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
            <p className="text-gray-400 mb-5">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <div className="relative group">
              <Input 
                placeholder="Your email address" 
                className="w-full h-12 pl-5 pr-14 bg-gray-800/50 border-gray-700/50 text-white rounded-full focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              />
              <Button 
                className="absolute right-1 top-1 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg shadow-sky-900/20"
              >
                <Send size={16} className="transform -rotate-45 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>
        
        {/* Copyright and Back to top */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} OLGA Solar. All rights reserved.
            </p>
            
            <Link href="/admin">
              <span className="flex items-center text-gray-500 hover:text-gray-300 text-xs ml-0 md:ml-4 mt-2 md:mt-0 transition-colors duration-300 cursor-pointer">
                <ShieldCheck size={12} className="mr-1" />
                Admin
              </span>
            </Link>
          </div>
          
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