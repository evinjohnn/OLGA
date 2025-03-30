import owlImage from "@assets/erik-karits-BF16q77A1MY-unsplash.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="h-screen w-full relative overflow-hidden">
      {/* Background gradient - using the exact same gray as in the image */}
      <div className="absolute inset-0 bg-[#C5C8C9] z-0"></div>
      
      {/* Navigation Links */}
      <div className="relative z-10 pt-7 px-8 flex justify-between items-center">
        <div className="flex space-x-10 text-white font-medium">
          <a href="#home" className="hover:opacity-80 transition-opacity">Home</a>
          <a href="#about" className="hover:opacity-80 transition-opacity">About Us</a>
          <a href="#products" className="hover:opacity-80 transition-opacity">Our Products</a>
          <a href="#blog" className="hover:opacity-80 transition-opacity">Blog</a>
        </div>
        <div>
          <a href="#register" className="text-white font-medium hover:opacity-80 transition-opacity">Register</a>
        </div>
      </div>
      
      {/* Main Hero Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full flex justify-between px-8">
          {/* Text content on the right */}
          <div className="max-w-xs text-white self-end mb-32">
            <p className="text-sm">
              Solar energy is one of the most abundant and sustainable resources available to us. Harness the power of the sun with OLGA.
            </p>
          </div>
          
          {/* Image in the center - using the full image as background instead of showing it separately */}
          <div className="absolute right-0 top-0 w-full h-full z-0">
            <img 
              src={owlImage} 
              alt="Owl on solar panel - OLGA Solar Energy" 
              className="w-full h-full object-cover"
              style={{ opacity: 0.99 }} // This prevents the image from being 100% opaque
            />
          </div>
          
          {/* Main text at the bottom */}
          <div className="self-end mb-32 ml-8 z-10 relative">
            <h1 className="text-white text-[120px] font-bold leading-none">OLGA</h1>
            <p className="text-white text-xl">Powering Kerala for a Brighter Tomorrow.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
