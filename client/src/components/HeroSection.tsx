import { useEffect } from 'react';
import owlImage from "../assets/erik-karits-BF16q77A1MY-unsplash.jpg";
import { Button } from "../components/ui/button";

const HeroSection = () => {
  return (
    <section id="home" className="h-screen w-full relative overflow-hidden">
      {/* Background with semi-transparent overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={owlImage} 
          alt="Owl on solar panel - OLGA Solar Energy" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-500/20"></div>
      </div>
      
      {/* Main Hero Content */}
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex-grow"></div>
        
        <div className="w-full flex justify-between items-center px-8 pb-32">
          {/* Main OLGA text */}
          <div className="self-end">
            <h1 className="text-white text-[120px] font-bold leading-none">OLGA</h1>
            <p className="text-white text-xl mt-2">Powering Kerala for a Brighter Tomorrow.</p>
          </div>
          
          {/* Text content on the right */}
          <div className="max-w-xs text-white">
            <p className="text-sm">
              Solar energy is one of the most abundant and sustainable resources available to us. Harness the power of the sun with OLGA.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;