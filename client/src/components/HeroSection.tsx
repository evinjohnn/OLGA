import { Button } from "@/components/ui/button";
import owlImage from "@assets/evin1.png";

const HeroSection = () => {
  return (
    <section id="home" className="relative pt-24 h-screen flex items-center">
      <div className="absolute inset-0 z-0">
        {/* Background Image with Gradient Overlay */}
        <div 
          className="w-full h-full bg-[url('https://images.unsplash.com/photo-1557142046-c704a3266b2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=800&q=80')] bg-cover bg-center"
          aria-label="Kerala landscape with greenery"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 to-gray-900/80"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 z-10 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          <div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-montserrat mb-4">
              OLGA
            </h1>
            <p className="text-xl md:text-2xl font-light mb-6">
              Powering Kerala for a Brighter Tomorrow.
            </p>
            <p className="text-lg mb-8">
              Solar energy is one of the most abundant and sustainable resources available to us. Harness the power of the sun with OLGA.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                className="bg-[#008FD5] hover:bg-[#008FD5]/90 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                <a href="#products">Explore Products</a>
              </Button>
              <Button 
                asChild
                variant="outline" 
                className="border-2 border-white hover:bg-white hover:text-[#1E293B] text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                <a href="#contact">Contact Us</a>
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <img 
              src={owlImage} 
              alt="Owl on solar panel - OLGA Solar Energy" 
              className="w-full max-w-md mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
