import { FC, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from "../components/ui/button";
import turbineImage from "../assets/Untitled.png";

// Icons and UI components
const SolarIcon: FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 17V21M12 3V7M18.4 12H22M2 12H5.6M16.95 16.95L19.07 19.07M4.93 4.93L7.05 7.05M16.95 7.05L19.07 4.93M4.93 19.07L7.05 16.95M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const WindTurbineIcon: FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12L10.5 21M12 12L19 13.5M12 12L14.5 5.5M12 12L4.5 10.5M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PersonIcon: FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 21V19C6 17.9391 6.42143 16.9217 7.17157 16.1716C7.92172 15.4214 8.93913 15 10 15H14C15.0609 15 16.0783 15.4214 16.8284 16.1716C17.5786 16.9217 18 17.9391 18 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Home = () => {
  // Handle smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.substring(1);
        const element = document.getElementById(id!);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="font-sans text-gray-900 overflow-x-hidden">
      {/* Header */}
      <header className="bg-[#3498DB] text-white py-4 px-4 flex justify-between items-center">
        <div className="flex space-x-6 text-sm">
          <a href="#" className="hover:opacity-80">Home</a>
          <a href="#" className="hover:opacity-80">About Us</a>
          <a href="#" className="hover:opacity-80">Our Products</a>
          <a href="#" className="hover:opacity-80">Blog</a>
        </div>
        <div>
          <Button className="bg-white text-[#3498DB] hover:bg-gray-100 rounded-full px-4 py-1 text-sm">Contact Us</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#3498DB] text-white pt-8 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row">
          {/* Left sidebar navigation */}
          <div className="w-full lg:w-1/6 mb-8 lg:mb-0 flex lg:flex-col items-center lg:items-start">
            <a href="#" className="flex items-center mb-4 text-xs">
              <SolarIcon />
              <span className="ml-2">Solar Energy</span>
            </a>
            <div className="hidden lg:block">
              <div className="mt-20">
                <span className="text-xs text-gray-200">-2025 Roadmap</span>
              </div>
            </div>
          </div>
          
          {/* Main hero content */}
          <div className="w-full lg:w-5/6 relative">
            {/* Wind turbine image */}
            <div className="absolute right-0 top-0 w-1/2 h-full">
              <img 
                src={turbineImage} 
                alt="Wind turbine" 
                className="object-cover h-full"
              />
            </div>
            
            {/* Solartive large text */}
            <div className="relative z-10">
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold mb-4">Solartive</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Roadmap section */}
          <div className="flex flex-col lg:flex-row mb-16">
            <div className="w-full lg:w-1/6 mb-8 lg:mb-0">
              <div className="flex items-center mb-4">
                <h2 className="text-sm font-bold">2025 - Present</h2>
              </div>
            </div>
            
            <div className="w-full lg:w-5/6">
              <div className="lg:ml-8">
                <div className="flex flex-col lg:flex-row mb-10">
                  <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
                    <h1 className="text-2xl lg:text-3xl font-medium mb-6">
                      From precision irrigation to remote crop health monitoring to <span className="text-gray-400">fulfilling the promise of tomorrow's technology</span>
                    </h1>
                    
                    <div className="flex items-center mt-8">
                      <div className="flex">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=48&h=48&q=80" alt="Team member" className="w-10 h-10 rounded-full border-2 border-white" />
                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=48&h=48&q=80" alt="Team member" className="w-10 h-10 rounded-full border-2 border-white -ml-4" />
                        <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=48&h=48&q=80" alt="Team member" className="w-10 h-10 rounded-full border-2 border-white -ml-4" />
                      </div>
                      <p className="text-xs text-gray-600 ml-4">
                        <a href="#">About Solartive</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="w-full lg:w-1/2 lg:pl-12">
                    <div className="flex flex-col">
                      <div className="bg-gray-100 rounded-lg p-6 mb-8">
                        <div className="flex justify-between mb-4">
                          <div className="flex">
                            <div className="bg-[#151C38] w-10 h-10 rounded-full flex items-center justify-center text-white mr-4">
                              <WindTurbineIcon />
                            </div>
                            <div>
                              <p className="text-sm font-medium">Design your solar system</p>
                              <p className="text-xs">custom solutions with a</p>
                              <p className="text-xs font-medium">solar tech</p>
                            </div>
                          </div>
                          <a href="#" className="text-xs rounded-full bg-[#151C38] text-white px-4 py-1 flex items-center justify-center">
                            Get Started
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-600">We strive to increase the productivity and quality of</p>
                          <p className="text-sm text-gray-600">irrigated agriculture with our innovations.</p>
                        </div>
                        
                        <div className="ml-4">
                          <div className="mb-2">
                            <h3 className="text-4xl font-bold">78%</h3>
                            <p className="text-xs text-gray-600">Conserved Energy</p>
                          </div>
                          <div className="flex">
                            {/* Bar chart visualization */}
                            <div className="flex items-end space-x-1">
                              {Array.from({ length: 10 }).map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-2 bg-[#3498DB] ${i % 2 === 0 ? 'h-6' : i % 3 === 0 ? 'h-8' : 'h-4'}`}
                                ></div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Discover more section */}
                <div className="mb-10">
                  <h2 className="text-xl font-medium mb-2">Discover more about our <span className="text-gray-400">offerings, expertise & mission</span></h2>
                  <p className="text-sm text-gray-600 mb-4">We strive to increase the productivity and quality of irrigated agriculture with our innovations.</p>
                </div>
                
                {/* Infrastructure section */}
                <div className="border-t border-gray-200 py-6">
                  <div className="flex justify-between">
                    <h2 className="text-xl font-medium">Infrastructure</h2>
                    <div className="flex items-center">
                      <button className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-300 mr-2">
                        <ArrowLeft size={16} />
                      </button>
                      <button className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-300">
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Sustainability section */}
                <div className="border-t border-gray-200 py-6">
                  <div className="flex justify-between">
                    <div>
                      <h2 className="text-xl font-medium">Sustainability</h2>
                      <div className="flex items-center mt-2">
                        <h3 className="text-3xl font-bold">36.0%</h3>
                        <span className="ml-2 text-xs text-gray-500">daily trend</span>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <p className="text-sm text-gray-600 mr-2">
                        Solar energy is one of the most abundant and sustainable resources available to us.
                      </p>
                      <button className="text-xs bg-gray-100 px-3 py-1 rounded-lg">
                        Discover More →
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                      <span className="text-xs font-bold">01</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                      <span className="text-xs font-bold">02</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#151C38] text-white flex items-center justify-center mr-2">
                      <span className="text-xs font-bold">03</span>
                    </div>
                  </div>
                </div>
                
                {/* Investors section */}
                <div className="border-t border-gray-200 py-6">
                  <h2 className="text-xl font-medium mb-4">Investors</h2>
                </div>
                
                {/* Benefits of Renewable Energy section */}
                <div className="flex flex-col lg:flex-row bg-blue-100 rounded-lg overflow-hidden mt-8">
                  <div className="w-full lg:w-1/2 p-8">
                    <h2 className="text-xl font-medium mb-6">Benefits of Renewable Energy</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Sustainability</h3>
                        <ul className="text-xs space-y-1">
                          <li>• Environmental</li>
                          <li>• Economic</li>
                          <li>• Social equity</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-2">Reduction in:</h3>
                        <ul className="text-xs space-y-1">
                          <li>• Pollution</li>
                          <li>• Global warming</li>
                          <li>• Solar waste</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2 bg-blue-200 p-8 flex items-center">
                    <div className="bg-[#151C38] text-white rounded-lg p-6 max-w-xs">
                      <h3 className="text-2xl font-medium mb-2">60W Solar Panel Packs</h3>
                      <p className="text-xs mb-4">Providing your household with renewable energy is cost-effective & eco-friendly.</p>
                      <div className="flex justify-between pt-4 border-t border-blue-700">
                        <span className="text-xs opacity-70">solarTive</span>
                        <span className="text-xs opacity-70">solarTive</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Product Reviews section */}
                <div className="mt-12">
                  <h2 className="text-sm font-medium mb-6">+ Product Reviews</h2>
                  <div className="flex flex-col lg:flex-row justify-between">
                    <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
                      <h2 className="text-2xl font-medium mb-4">Solar Panel System Specs</h2>
                      <p className="text-sm text-gray-600 mb-6">
                        Monitoring solar energy production in real-time and see the impact of your sustainable technology. Solar panels at work!
                      </p>
                      <div className="flex space-x-4">
                        <img 
                          src="https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=80&q=80" 
                          alt="Solar panel" 
                          className="w-20 h-16 object-cover rounded"
                        />
                        <img 
                          src="https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=80&q=80" 
                          alt="Wind turbines" 
                          className="w-20 h-16 object-cover rounded"
                        />
                      </div>
                    </div>
                    
                    <div className="w-full lg:w-2/5">
                      <div className="bg-[#151C38] text-white rounded-lg p-6 relative">
                        <button className="absolute top-3 right-3 bg-white text-[#151C38] rounded-full w-8 h-8 flex items-center justify-center">
                          +
                        </button>
                        <h3 className="text-xl font-medium mb-4">Solar Energy Design</h3>
                        <div className="grid grid-cols-3 gap-2 mb-6">
                          <div>
                            <p className="text-xs opacity-70 mb-1">Custom Fabrication</p>
                            <div className="border-b border-blue-400 w-12"></div>
                          </div>
                          <div>
                            <p className="text-xs opacity-70 mb-1">Service Maintenance</p>
                            <div className="border-b border-blue-400 w-12"></div>
                          </div>
                          <div>
                            <p className="text-xs opacity-70 mb-1">Installation</p>
                            <div className="border-b border-blue-400 w-12"></div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-xs opacity-70">solarTive</span>
                          <span className="text-xs opacity-70">solarTive</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <p className="text-sm font-medium">Solar Energy Features</p>
                        <a href="#" className="text-xs text-blue-600">View Features →</a>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Warranty section */}
                <div className="flex justify-between items-center mt-8">
                  <h2 className="text-xl font-medium">20 Years of Warranty</h2>
                  <div className="flex items-center">
                    <button className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-300 mr-2">
                      <ArrowLeft size={16} />
                    </button>
                    <button className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-300">
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
                
                {/* Contact information */}
                <div className="mt-8 flex flex-wrap">
                  <div className="w-full md:w-1/3 mb-4 md:mb-0">
                    <p className="text-sm font-medium mb-2">Location</p>
                    <p className="text-xs text-gray-600">1240 Parker Avenue Building A</p>
                  </div>
                  <div className="w-full md:w-1/3 mb-4 md:mb-0">
                    <p className="text-sm font-medium mb-2">Location</p>
                    <p className="text-xs text-gray-600">1240 Industry Road, Suite 101</p>
                  </div>
                  <div className="w-full md:w-1/3 mb-4 md:mb-0">
                    <p className="text-sm font-medium mb-2">Email</p>
                    <p className="text-xs text-gray-600">info@solartive.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between">
            <div className="mb-8 lg:mb-0">
              <h1 className="text-6xl md:text-7xl font-bold text-[#3498DB]">Solartive</h1>
            </div>
            
            <div className="flex items-center">
              <p className="text-xs text-gray-600 mr-4">Copyright 2023 Solartive all rights reserved</p>
              <div className="flex space-x-2">
                <button className="w-8 h-8 rounded-full bg-[#151C38] text-white flex items-center justify-center">1</button>
                <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">2</button>
                <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">3</button>
                <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">4</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
