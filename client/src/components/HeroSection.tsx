import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section id="home" className="relative pt-24 h-screen flex items-center">
      <div className="absolute inset-0 z-0">
        {/* Background Image with Gradient Overlay */}
        <div 
          className="w-full h-full bg-[url('https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=800&q=80')] bg-cover bg-center"
          aria-label="Solar panels on a sunny day"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 z-10 text-white">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat mb-4">
            Harness the Power of the Sun
          </h1>
          <p className="text-lg md:text-xl mb-8">
            OLGA offers cutting-edge solar solutions for homes and businesses. Join the renewable energy revolution today.
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
      </div>
    </section>
  );
};

export default HeroSection;
