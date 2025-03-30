import { Link } from "wouter";
import { PaperPlaneIcon } from "@/assets/icons";

const Footer = () => {
  return (
    <footer className="bg-[#1E293B] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <span className="text-3xl font-bold text-white font-montserrat">OLGA</span>
              <span className="ml-2 text-[#00BF63] font-medium">SOLAR</span>
            </div>
            <p className="text-gray-400 mb-4">
              Powering a sustainable future with innovative solar energy solutions.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-1">
            <h4 className="font-bold text-xl mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#products" className="text-gray-400 hover:text-white transition-colors">Our Products</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* Services */}
          <div className="md:col-span-1">
            <h4 className="font-bold text-xl mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li><a href="#products" className="text-gray-400 hover:text-white transition-colors">Residential Solar</a></li>
              <li><a href="#products" className="text-gray-400 hover:text-white transition-colors">Commercial Solar</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Installation & Maintenance</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Energy Consultation</a></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="md:col-span-1">
            <h4 className="font-bold text-xl mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to receive updates on our latest products and offers.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 rounded-l-md w-full focus:outline-none text-[#1E293B]"
              />
              <button 
                type="submit" 
                className="bg-[#008FD5] hover:bg-[#008FD5]/90 px-4 py-2 rounded-r-md transition-colors"
                aria-label="Subscribe"
              >
                <PaperPlaneIcon className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} OLGA Solar. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors mr-4">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
